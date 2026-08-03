// Generate local pronunciation clips for the "Guess the meaning" game using
// macOS `say`, then convert them to MP3 with ffmpeg.
//
//   node scripts/generate-game-audio-local.mjs
//
// Env knobs:
//   FORCE          (optional) set to 1 to re-generate clips that already exist
//   SPEECH_RATE    (optional) default 150
//
// Output goes to public/audio/game/<key>.mp3, where <key> matches audioKey() in
// sections/home/gameData.ts.

import { access, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "sections/home/gameData.ts");
const OUT_DIR = path.join(ROOT, "public/audio/game");

const FORCE = process.env.FORCE === "1";
const SPEECH_RATE = process.env.SPEECH_RATE || "150";

const VOICE_BY_BCP = {
  "es-ES": "Mónica",
  "fr-FR": "Thomas",
  "it-IT": "Alice",
  "de-DE": "Anna",
  "ko-KR": "Yuna",
  "ja-JP": "Kyoko",
  "en-US": "Samantha",
};

function audioKey(bcp, word) {
  const s = `${bcp}|${word}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited ${code}${stderr ? `\n${stderr}` : ""}`));
    });
  });
}

async function main() {
  const src = await readFile(DATA_FILE, "utf8");
  const re = /"word":\s*"([^"]+)",\s*"bcp":\s*"([^"]+)"/g;
  const seen = new Set();
  const words = [];
  let m;

  while ((m = re.exec(src)) !== null) {
    const [, word, bcp] = m;
    const key = audioKey(bcp, word);
    if (seen.has(key)) continue;
    seen.add(key);
    words.push({ word, bcp, key });
  }

  if (!words.length) {
    console.error("No words found in gameData.ts.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "funlingo-game-audio-"));

  let made = 0;
  let skipped = 0;

  try {
    console.log(`Generating ${words.length} local clips with macOS say -> public/audio/game/\n`);

    for (const { word, bcp, key } of words) {
      const voice = VOICE_BY_BCP[bcp];
      if (!voice) throw new Error(`No local voice configured for ${bcp}`);

      const out = path.join(OUT_DIR, `${key}.mp3`);
      if (!FORCE && (await fileExists(out))) {
        console.log(`  skip  ${key}.mp3  (${word})`);
        skipped++;
        continue;
      }

      const aiff = path.join(tmpDir, `${key}.aiff`);
      await run("say", ["-v", voice, "-r", SPEECH_RATE, "-o", aiff, "--", word]);
      await run("ffmpeg", [
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        aiff,
        "-ar",
        "44100",
        "-ac",
        "1",
        "-b:a",
        "96k",
        out,
      ]);

      console.log(`  made  ${key}.mp3  (${word}, ${voice})`);
      made++;
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }

  console.log(`\nDone. ${made} generated, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
