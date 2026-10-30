/**
 * Listen-button voice preference — Wave 17 port of the extension's
 * learn.js settings drawer "Voice" (`funLearningPrefs.voicePref`, default
 * "auto").
 *
 * The extension stores ONE voice name for everything; picking a Spanish
 * voice then made Japanese words come out in a Spanish accent. We key the
 * choice by primary language instead: `{ es: "Google español", ja: "Kyoko" }`.
 * A missing key (or "auto") means "best available", scored exactly as before.
 *
 * Source of truth is `Prefs.json.voicePrefs` on the server; the Settings page
 * mirrors it into localStorage so SlangAudioButton (rendered everywhere) can
 * read it synchronously without a network round-trip.
 */

export const VOICE_PREFS_KEY = "fl_voice_prefs";
export const VOICE_AUTO = "auto";

export type VoicePrefs = Record<string, string>;

export function primaryLang(code: string | null | undefined): string {
  return String(code ?? "").toLowerCase().split(/[-_]/)[0] ?? "";
}

/** Keep only well-formed entries: 2–3 letter key, non-empty name ≤ 200 chars. */
export function sanitizeVoicePrefs(input: unknown): VoicePrefs {
  const out: VoicePrefs = {};
  if (!input || typeof input !== "object") return out;
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!/^[a-z]{2,3}$/.test(k)) continue;
    if (typeof v !== "string") continue;
    const name = v.trim();
    if (!name || name.length > 200 || name === VOICE_AUTO) continue;
    out[k] = name;
  }
  return out;
}

export function readVoicePrefs(): VoicePrefs {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(VOICE_PREFS_KEY);
    return raw ? sanitizeVoicePrefs(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

export function writeVoicePrefs(prefs: VoicePrefs): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(VOICE_PREFS_KEY, JSON.stringify(sanitizeVoicePrefs(prefs)));
  } catch {
    /* private mode / quota — the listen button just falls back to auto */
  }
}

/**
 * The learner's chosen voice for `lang`, if it's installed in THIS browser
 * and actually speaks that language. Otherwise null → caller auto-picks.
 */
export function preferredVoice(
  voices: SpeechSynthesisVoice[],
  lang: string,
  prefs: VoicePrefs = readVoicePrefs(),
): SpeechSynthesisVoice | null {
  const p = primaryLang(lang);
  const name = prefs[p];
  if (!name) return null;
  return (
    voices.find((v) => v.name === name && primaryLang(v.lang) === p) ?? null
  );
}
