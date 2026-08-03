// Generate human-sounding pronunciation clips for the "Guess the meaning" game
// using a neural TTS provider, one MP3 per unique word.
//
//   # ElevenLabs (most expressive)
//   ELEVENLABS_API_KEY=... npm run gen:game-audio
//
//   # OpenAI
//   PROVIDER=openai OPENAI_API_KEY=sk-... npm run gen:game-audio
//
// Provider is auto-detected: ElevenLabs if ELEVENLABS_API_KEY is set, else OpenAI.
// Override with PROVIDER=elevenlabs|openai.
//
// Env knobs:
//   PROVIDER            elevenlabs | openai   (auto-detected from which key is set)
//   FORCE               set to 1 to re-generate clips that already exist
//   ElevenLabs:
//     ELEVENLABS_API_KEY  (required for this provider)
//     ELEVEN_VOICE_ID     (optional) a specific voice id; otherwise auto-picked
//     ELEVEN_MODEL        (optional) default "eleven_multilingual_v2"
//   OpenAI:
//     OPENAI_API_KEY      (required for this provider)
//     TTS_MODEL           (optional) default "gpt-4o-mini-tts"
//     TTS_VOICE           (optional) default "coral"
//
// The word list is read straight from sections/home/gameData.ts (single source
// of truth). Output goes to public/audio/game/<key>.mp3, where <key> matches
// audioKey() in gameData.ts so the player finds the right file.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "sections/home/gameData.ts");
const OUT_DIR = path.join(ROOT, "public/audio/game");

const PROVIDER = (process.env.PROVIDER || (process.env.ELEVENLABS_API_KEY ? "elevenlabs" : "openai")).toLowerCase();
const FORCE = process.env.FORCE === "1";

// OpenAI knobs
const OPENAI_MODEL = process.env.TTS_MODEL || "gpt-4o-mini-tts";
const OPENAI_VOICE = process.env.TTS_VOICE || "coral";

// ElevenLabs knobs
const ELEVEN_MODEL = process.env.ELEVEN_MODEL || "eleven_multilingual_v2";
const ELEVEN_OUTPUT = "mp3_44100_128";

// Must stay identical to audioKey() in sections/home/gameData.ts.
function audioKey(bcp, word) {
  const s = `${bcp}|${word}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

// Language name per BCP-47 locale, used to nudge a native accent (OpenAI).
const LANG_NAME = {
  "es-ES": "Spanish",
  "fr-FR": "French",
  "it-IT": "Italian",
  "de-DE": "German",
  "ko-KR": "Korean",
  "ja-JP": "Japanese",
  "en-US": "English",
};

function instructionsFor(bcp) {
  const name = LANG_NAME[bcp] || "the target language";
  return [
    `Pronounce this ${name} word once, clearly and naturally.`,
    `Use the easy warmth and tiny pitch movement of a friendly native ${name} speaker helping a beginner.`,
    "Keep it calm and human, slightly slower than conversation, with no spelling, translation, extra words, or robotic announcer style.",
  ].join(" ");
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// ---------- OpenAI provider ----------
async function openaiSynth(word, bcp) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY for PROVIDER=openai.");
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      voice: OPENAI_VOICE,
      input: word,
      instructions: instructionsFor(bcp),
      response_format: "mp3",
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

// ---------- ElevenLabs provider ----------
// Long-standing premade voices (available to all accounts, no voices_read
// permission needed). "Rachel" is a warm, clear default that works well with
// the multilingual model.
const ELEVEN_DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel

async function pickElevenVoice(apiKey) {
  if (process.env.ELEVEN_VOICE_ID) return process.env.ELEVEN_VOICE_ID;
  // Try to auto-pick a warm voice; if the key can't list voices, fall back to
  // the premade default (TTS still works without voices_read).
  try {
    const res = await fetch("https://api.elevenlabs.io/v1/voices", { headers: { "xi-api-key": apiKey } });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const voices = data.voices || [];
    if (!voices.length) throw new Error("empty");
    const prefer = ["rachel", "sarah", "aria", "matilda", "charlotte", "lily", "alice", "jessica", "bella"];
    const chosen = voices.find((v) => prefer.includes((v.name || "").toLowerCase())) || voices[0];
    console.log(`Using ElevenLabs voice "${chosen.name}" (${chosen.voice_id})`);
    return chosen.voice_id;
  } catch {
    console.log(`Can't list voices with this key — using premade default voice (${ELEVEN_DEFAULT_VOICE_ID}). Set ELEVEN_VOICE_ID to override.`);
    return ELEVEN_DEFAULT_VOICE_ID;
  }
}

function makeElevenSynth(voiceId, apiKey) {
  return async function elevenSynth(word) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${ELEVEN_OUTPUT}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text: word,
        model_id: ELEVEN_MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
      }),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`);
    return Buffer.from(await res.arrayBuffer());
  };
}

async function buildSynth() {
  if (PROVIDER === "elevenlabs") {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) throw new Error("Missing ELEVENLABS_API_KEY for PROVIDER=elevenlabs.");
    const voiceId = await pickElevenVoice(apiKey);
    return { synth: makeElevenSynth(voiceId, apiKey), label: `elevenlabs / ${ELEVEN_MODEL}` };
  }
  if (PROVIDER === "openai") {
    return { synth: openaiSynth, label: `openai / ${OPENAI_MODEL} / voice "${OPENAI_VOICE}"` };
  }
  throw new Error(`Unknown PROVIDER "${PROVIDER}". Use elevenlabs or openai.`);
}

async function main() {
  const { synth, label } = await buildSynth();

  const src = await readFile(DATA_FILE, "utf8");
  // Every round lists "word" immediately followed by "bcp".
  const re = /"word":\s*"([^"]+)",\s*"bcp":\s*"([^"]+)"/g;
  const seen = new Set();
  const words = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, word, bcp] = m;
    const k = audioKey(bcp, word);
    if (seen.has(k)) continue;
    seen.add(k);
    words.push({ word, bcp, key: k });
  }

  if (!words.length) {
    console.error("No words found in gameData.ts — the file format may have changed.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Generating ${words.length} clips with ${label} → public/audio/game/\n`);

  let made = 0;
  let skipped = 0;
  for (const { word, bcp, key: clipKey } of words) {
    const out = path.join(OUT_DIR, `${clipKey}.mp3`);
    if (!FORCE && (await fileExists(out))) {
      console.log(`  skip  ${clipKey}.mp3  (${word})`);
      skipped++;
      continue;
    }

    let buf;
    try {
      buf = await synth(word, bcp);
    } catch (err) {
      console.error(`\nFailed on "${word}" (${bcp}): ${err.message}`);
      process.exit(1);
    }
    await writeFile(out, buf);
    console.log(`  ✓     ${clipKey}.mp3  (${word})  ${(buf.length / 1024).toFixed(1)} KB`);
    made++;
  }

  console.log(`\nDone. ${made} generated, ${skipped} skipped. Commit public/audio/game/*.mp3.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
