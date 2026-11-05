#!/usr/bin/env node
/**
 * Wave 18 — pull the extension's own translated onboarding strings out of its
 * built `dist/i18n.js` and write `src/lib/onboarding/ext-strings.json`.
 *
 *   node scripts/extract-onboarding-strings.mjs <path/to/extension/dist/i18n.js>
 *
 * The bundle is minified: each locale is a `<loc>:{"key":"value",...}` object
 * literal, and supplement dicts for the same locale appear later in the file.
 * A key is attributed to the nearest preceding locale marker; later
 * occurrences win (that's the merge order the extension uses at runtime).
 * The file is parsed as text — never executed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const KEYS = [
  "onboarding.welcomeSubtext",
  "onboarding.stepOf",
  "onboarding.goBack",
  "onboarding.languageSetup",
  "onboarding.nativeLanguage",
  "onboarding.learningLanguage",
  "onboarding.nextStep",
  "onboarding.learningPreferences",
  "onboarding.proficiencyLevel",
  "onboarding.recommended",
  "onboarding.save",
  "proficiency.beginner",
  "proficiency.intermediate",
  "proficiency.advanced",
  "fta.heading",
  "fta.step2",
];
const LOCS = ["en", "tr", "pt_BR", "pt_PT", "ko", "vi", "ja", "zh_CN", "zh_TW", "hi", "es", "fr", "de", "ar", "it", "ru", "nl", "sv", "ro", "uk", "gu", "mr"];

const src = process.argv[2];
if (!src) {
  console.error("usage: extract-onboarding-strings.mjs <dist/i18n.js>");
  process.exit(1);
}
const s = readFileSync(src, "utf8");
const markerRe = new RegExp(`[,{]"?(${LOCS.join("|")})"?:\\{"`, "g");
const markers = [...s.matchAll(markerRe)].map((m) => [m.index, m[1]]);
const locAt = (pos) => {
  let best = null;
  for (const [i, l] of markers) {
    if (i < pos) best = l;
    else break;
  }
  return best;
};
const decode = (raw) =>
  JSON.parse(
    '"' + raw.replace(/\\x([0-9a-fA-F]{2})/g, "\\u00$1").replace(/\\'/g, "'") + '"',
  );

const out = Object.fromEntries(LOCS.map((l) => [l, {}]));
const keyRe = /"((?:fta|onboarding|proficiency)\.[A-Za-z0-9]+)":"((?:[^"\\]|\\.)*)"/g;
for (const m of s.matchAll(keyRe)) {
  if (!KEYS.includes(m[1])) continue;
  const l = locAt(m.index);
  if (l) out[l][m[1]] = decode(m[2]);
}
for (const l of LOCS) {
  out[l] = Object.fromEntries(KEYS.filter((k) => k in out[l]).map((k) => [k, out[l][k]]));
}
const dest = resolve(process.cwd(), "src/lib/onboarding/ext-strings.json");
writeFileSync(dest, JSON.stringify(out, null, 1) + "\n");
console.log(Object.fromEntries(LOCS.map((l) => [l, Object.keys(out[l]).length])));
