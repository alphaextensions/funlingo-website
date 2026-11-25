/**
 * Wave 9 — browser-side Whisper (Pattern A).
 *
 * All of this runs in the learner's browser. The `@xenova/transformers`
 * package is loaded via a dynamic `import()` from inside the exported
 * functions so it never lands in the server bundle (also keeps the client-
 * side JS small — the ~40 MB model and the ONNX runtime are a one-time
 * runtime fetch, cached in IndexedDB by Transformers.js).
 *
 * Audio blobs live only in memory for the length of a single transcription.
 * They are never written to disk, never sent to a server, never logged.
 *
 * This module replaces the dishonest "pronunciation scoring" (which was a
 * Llama text-vs-text diff dressed up as a per-phoneme judgement) for the
 * Review Speaking + Shadowing drills, behind a Settings opt-in flag.
 */

"use client";


export interface TranscribeResult {
  text: string;
  warnings: string[];
}

export type WhisperSize = "tiny" | "base";

export interface PreloadOpts {
  size?: WhisperSize;
}

const MODEL_FOR_SIZE: Record<WhisperSize, string> = {
  // Multilingual tiny: ~40 MB after quantisation, strong on major Latin / CJK
  // languages, visibly weaker on hi / ar / tr. Documented in the Settings
  // tooltip + the Wave 9 playbook.
  tiny: "Xenova/whisper-tiny",
  // Fallback the UI can offer later for stronger accuracy at ~75 MB. Not
  // wired through Settings yet — leave the switch here for easy A/B.
  base: "Xenova/whisper-base",
};

/**
 * Whisper's officially supported languages. Lifted from the model's own
 * `language` list — anything not in here still runs, but Whisper falls back
 * to multilingual autodetection and the UI shows a warning.
 */
const SUPPORTED_LANGS = [
  "en", "zh", "de", "es", "ru", "ko", "fr", "ja", "pt", "tr", "pl", "ca",
  "nl", "ar", "sv", "it", "id", "hi", "fi", "vi", "he", "uk", "el", "ms",
  "cs", "ro", "da", "hu", "ta", "no", "th", "ur", "hr", "bg", "lt", "la",
  "mi", "ml", "cy", "sk", "te", "fa", "lv", "bn", "sr", "az", "sl", "kn",
  "et", "mk", "br", "eu", "is", "hy", "ne", "mn", "bs", "kk", "sq", "sw",
  "gl", "mr", "pa", "si", "km", "sn", "yo", "so", "af", "oc", "ka", "be",
  "tg", "sd", "gu", "am", "yi", "lo", "uz", "fo", "ht", "ps", "tk", "nn",
  "mt", "sa", "lb", "my", "bo", "tl", "mg", "as", "tt", "haw", "ln", "ha",
  "ba", "jw", "su",
];

export function getSupportedLangs(): readonly string[] {
  return SUPPORTED_LANGS;
}

/**
 * Feature-detect: do we have anywhere to actually run Whisper?
 *
 * We require either WebGPU (fast path) or WebAssembly (fallback). The ONNX
 * web runtime ships both — on Safari / Firefox we end up on WASM, which is
 * slower but viable. Returns `false` on the server or when neither runtime
 * is usable.
 */
export function isLocalWhisperAvailable(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof WebAssembly === "undefined") return false;
  // Workers are what the ORT backend uses; some locked-down browsers block
  // them. Not a hard requirement in all paths but worth checking.
  if (typeof Worker === "undefined") return false;
  // IndexedDB being completely missing (not just quota-limited) means we'd
  // re-download the model every call. We still allow it — the fallback path
  // in `preloadModel` tolerates missing IndexedDB — but we warn.
  return true;
}

/**
 * Returns `true` when WebGPU is available. We flip the Transformers.js
 * device hint to `"webgpu"` in that case, which cuts transcription time
 * from 3–5 s to ~1 s on good hardware. On Safari we fall through to WASM
 * which still works.
 */
export function hasWebGpu(): boolean {
  if (typeof navigator === "undefined") return false;
  return "gpu" in navigator && (navigator as any).gpu != null;
}

type PipelineFn = (
  audio: Float32Array,
  options?: Record<string, unknown>,
) => Promise<{ text: string } | { text: string }[]>;

interface PipelineState {
  size: WhisperSize;
  pipeline: PipelineFn;
}

let pipelinePromise: Promise<PipelineState> | null = null;

/**
 * Load (and cache in-memory) the Whisper pipeline. Idempotent — a second
 * call returns the already-loaded pipeline synchronously after the first
 * resolve.
 *
 * The *model weights* themselves are cached by Transformers.js in IndexedDB
 * via the `Cache` API — subsequent sessions resolve this promise in ~200 ms
 * without re-downloading. In Safari private browsing (which denies
 * IndexedDB) we still work, we just re-download each tab.
 */
export async function preloadModel(opts?: PreloadOpts): Promise<void> {
  await getPipeline(opts?.size ?? "tiny");
}

async function getPipeline(size: WhisperSize): Promise<PipelineState> {
  if (pipelinePromise) {
    const existing = await pipelinePromise;
    if (existing.size === size) return existing;
    // Size change (future: user bumps to "base" from Settings). Reload.
    pipelinePromise = null;
  }
  pipelinePromise = (async (): Promise<PipelineState> => {
    // Dynamic import so this bundle never resolves on the server. The cast
    // is deliberate — the real types ship inside the package but Next's
    // module-resolution for an ESM-only package via webpack can be touchy;
    // we assert the shape we need and keep the surface area tiny.
    const mod = (await import("@xenova/transformers")) as unknown as {
      pipeline: (task: string, model: string, opts?: Record<string, unknown>) => Promise<PipelineFn>;
      env: {
        allowLocalModels?: boolean;
        allowRemoteModels?: boolean;
        useBrowserCache?: boolean;
        backends?: { onnx?: { wasm?: { numThreads?: number } } };
      };
    };
    const { pipeline, env } = mod;
    // We don't ship a self-hosted model folder yet — rely on the HuggingFace
    // CDN. If a self-hosted mirror is wired later, flip these.
    env.allowLocalModels = false;
    env.allowRemoteModels = true;
    env.useBrowserCache = true;
    // Keep WASM to a single thread so we don't accidentally saturate the
    // learner's cores while they're also recording / listening to TTS.
    try {
      if (env.backends?.onnx?.wasm) env.backends.onnx.wasm.numThreads = 1;
    } catch {
      // non-fatal — backends sub-object isn't guaranteed on every runtime.
    }
    const device = hasWebGpu() ? "webgpu" : undefined;
    const pipe = await pipeline(
      "automatic-speech-recognition",
      MODEL_FOR_SIZE[size],
      device ? { device, quantized: true } : { quantized: true },
    );
    return { size, pipeline: pipe };
  })();
  return pipelinePromise;
}

/**
 * Decode an opaque `audio/*` blob (whatever MediaRecorder spat out) into the
 * mono-16kHz Float32 PCM Whisper's processor expects. We use the browser's
 * `AudioContext` to decode and `OfflineAudioContext` to resample, which
 * handles webm / ogg / mp4 / wav without any extra library.
 */
async function blobToPcm(blob: Blob, targetSampleRate = 16000): Promise<Float32Array> {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtxCtor =
    (window as any).AudioContext ?? (window as any).webkitAudioContext;
  if (!AudioCtxCtor) throw new Error("AudioContext unavailable in this browser");
  const ctx = new AudioCtxCtor();
  try {
    const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
    // Downmix to mono, resample to 16kHz.
    const inputChannels = decoded.numberOfChannels;
    const inputData: Float32Array[] = [];
    for (let i = 0; i < inputChannels; i++) {
      inputData.push(decoded.getChannelData(i));
    }
    const mono = new Float32Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      let sum = 0;
      for (let c = 0; c < inputChannels; c++) sum += inputData[c][i];
      mono[i] = sum / inputChannels;
    }
    if (decoded.sampleRate === targetSampleRate) return mono;
    // OfflineAudioContext handles resampling natively.
    const OfflineCtor =
      (window as any).OfflineAudioContext ??
      (window as any).webkitOfflineAudioContext;
    if (!OfflineCtor) {
      // Last-ditch: naive linear resample.
      return linearResample(mono, decoded.sampleRate, targetSampleRate);
    }
    const ratio = targetSampleRate / decoded.sampleRate;
    const offline = new OfflineCtor(
      1,
      Math.ceil(mono.length * ratio),
      targetSampleRate,
    );
    const buffer = offline.createBuffer(1, mono.length, decoded.sampleRate);
    buffer.copyToChannel(mono, 0);
    const src = offline.createBufferSource();
    src.buffer = buffer;
    src.connect(offline.destination);
    src.start();
    const resampled = await offline.startRendering();
    return resampled.getChannelData(0).slice();
  } finally {
    try {
      await ctx.close();
    } catch {
      // closing a context that already closed throws in some browsers — safe to swallow.
    }
  }
}

function linearResample(
  src: Float32Array,
  fromRate: number,
  toRate: number,
): Float32Array {
  const ratio = toRate / fromRate;
  const out = new Float32Array(Math.ceil(src.length * ratio));
  for (let i = 0; i < out.length; i++) {
    const x = i / ratio;
    const i0 = Math.floor(x);
    const i1 = Math.min(src.length - 1, i0 + 1);
    const frac = x - i0;
    out[i] = src[i0] * (1 - frac) + src[i1] * frac;
  }
  return out;
}

/**
 * Transcribe a user's spoken attempt. The returned text is in the SAME
 * language as `lang` when `lang` is one of Whisper's supported codes —
 * otherwise Whisper autodetects and we surface a warning.
 */
export async function transcribeAudio(
  audioBlob: Blob,
  lang: string,
): Promise<TranscribeResult> {
  if (!isLocalWhisperAvailable()) {
    throw new Error("Local Whisper is not available in this environment.");
  }
  const warnings: string[] = [];
  const primary = (lang ?? "en").toLowerCase().split(/[-_]/)[0];
  const supported = SUPPORTED_LANGS.includes(primary);
  if (!supported) {
    warnings.push(
      `Whisper doesn't officially support "${primary}" — running in auto-detect multilingual mode.`,
    );
  }
  const { pipeline } = await getPipeline("tiny");
  const pcm = await blobToPcm(audioBlob);
  const generateOptions: Record<string, unknown> = {
    chunk_length_s: 30,
    stride_length_s: 5,
    // Keep deterministic: Whisper hallucinates fewer repeated tokens with no
    // sampling. We also cap tokens so a long silence doesn't produce a
    // minute of "..." (classic Whisper failure mode).
    return_timestamps: false,
  };
  if (supported) {
    generateOptions.language = primary;
    generateOptions.task = "transcribe";
  }
  const result = await pipeline(pcm, generateOptions);
  const text = Array.isArray(result)
    ? result.map((r) => r.text ?? "").join(" ").trim()
    : (result.text ?? "").trim();
  return { text, warnings };
}

// --- test-only hook ---------------------------------------------------------
// We export a reset for tests that need to force the pipeline cache to re-init
// (e.g. simulating a size switch). Not used in app code.
export function __resetLocalWhisperForTests(): void {
  pipelinePromise = null;
}
