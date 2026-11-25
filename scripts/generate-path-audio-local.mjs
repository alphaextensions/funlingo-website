// Generate local pronunciation clips for the learning path (content/courses/*/course.json)
// using macOS `say`, then convert them to MP3 with ffmpeg.
//
//   node scripts/generate-path-audio-local.mjs
//
// Env knobs:
//   FORCE          (optional) set to 1 to re-generate clips that already exist
//   SPEECH_RATE    (optional) default 150
//
// Output goes to public/audio/path/<key>.mp3, where <key> matches audioKey() in
// sections/home/gameData.ts and the speech locale matches lib/path/langs.ts.
// Clips cover every word term, dialogue line and subtitle cue in the target language.

import { access, mkdir, mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COURSES_DIR = path.join(ROOT, "content/courses");
const OUT_DIR = path.join(ROOT, "public/audio/path");

const FORCE = process.env.FORCE === "1";
const SPEECH_RATE = process.env.SPEECH_RATE || "150";

// Keep in step with SPEECH_LOCALES in lib/path/langs.ts.
const SPEECH_LOCALES = { en: "en-US", es: "es-MX", fr: "fr-FR", de: "de-DE", it: "it-IT", ja: "ja-JP", ko: "ko-KR" };

const VOICE_BY_BCP = {
  "es-MX": "Paulina",
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

function targetTexts(course) {
  const texts = Object.values(course.words).map((w) => w.term);
  for (const season of course.seasons) {
    for (const episode of season.episodes) {
      for (const scene of episode.scenes) {
        const open = scene.coldOpen;
        if (open.kind === "dialogue") texts.push(...open.lines.map((l) => l.target));
        else texts.push(...open.clip.cues.map((c) => c.target));
      }
    }
  }
  return texts;
}

async function main() {
  const dirs = (await readdir(COURSES_DIR, { withFileTypes: true })).filter((d) => d.isDirectory());
  const seen = new Set();
  const clips = [];

  for (const dir of dirs) {
    const course = JSON.parse(await readFile(path.join(COURSES_DIR, dir.name, "course.json"), "utf8"));
    const bcp = SPEECH_LOCALES[course.target];
    if (!bcp) throw new Error(`No speech locale configured for ${course.target}`);
    for (const text of targetTexts(course)) {
      const key = audioKey(bcp, text);
      if (seen.has(key)) continue;
      seen.add(key);
      clips.push({ text, bcp, key });
    }
  }

  await mkdir(OUT_DIR, { recursive: true });
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "funlingo-path-audio-"));
  let made = 0;
  let skipped = 0;

  try {
    console.log(`Generating ${clips.length} local clips with macOS say -> public/audio/path/\n`);
    for (const { text, bcp, key } of clips) {
      const voice = VOICE_BY_BCP[bcp];
      if (!voice) throw new Error(`No local voice configured for ${bcp}`);
      const out = path.join(OUT_DIR, `${key}.mp3`);
      if (!FORCE && (await fileExists(out))) {
        skipped++;
        continue;
      }
      const aiff = path.join(tmpDir, `${key}.aiff`);
      // "…" marks a slot to fill ("me llamo…"); read it as a plain pause.
      await run("say", ["-v", voice, "-r", SPEECH_RATE, "-o", aiff, "--", text.replace(/…/g, "")]);
      await run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", aiff, "-ar", "44100", "-ac", "1", "-b:a", "96k", out]);
      console.log(`  made  ${key}.mp3  (${text}, ${voice})`);
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
