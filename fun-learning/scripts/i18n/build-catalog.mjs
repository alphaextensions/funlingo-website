#!/usr/bin/env node
/**
 * Regenerates src/lib/i18n/catalog/<lang>.ts for the 11 non-English locales.
 *
 *   node scripts/i18n/build-catalog.mjs          # regenerate
 *   node scripts/i18n/build-catalog.mjs --check  # exit 1 if files would change
 *
 * EN (src/lib/i18n/catalog/en.ts) is hand-edited and is the source of truth
 * for the KEY SET. Each non-EN value comes from, in priority order:
 *   1. BRAND        — product names, identical in every locale
 *   2. [ext]        — the Funlingo extension's own shipped translation
 *                     (scripts/i18n/ext-snapshot.json, via EXT_MAP)
 *   3. gen/<lang>.json — LLM translation, tagged "TODO: native review"
 * A key with none of the three is reported as missing (and the unit test
 * `wave14-i18n.test.ts` fails on key-set mismatch).
 *
 * To add a key: add it to en.ts, add its translation to all 11 gen/*.json
 * files (or map it in EXT_MAP if the extension already has it), rerun.
 * To fix a translation after native review: edit gen/<lang>.json, rerun.
 * Placeholders ({n}, {title}…) are verified against EN — mismatch aborts.
 * Keys present in a gen/*.json but NOT in en.ts are reported as stale.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const HERE = path.join(ROOT, "scripts/i18n");
const OUT = path.join(ROOT, "src/lib/i18n/catalog");
const CHECK = process.argv.includes("--check");

const ext = JSON.parse(fs.readFileSync(path.join(HERE, "ext-snapshot.json"), "utf8"));
// Team-written strings from the extension's dev source that aren't in the
// shipped 1.3.2 bundle (only some locales). Tagged "[ext-dev]".
const extDev = JSON.parse(fs.readFileSync(path.join(HERE, "ext-dev-snapshot.json"), "utf8"));
const DEV_MAP = {
  "quiz.correct": "learn.correct",
  "quiz.correctAnswer": "learn.correctAnswer",
  "quiz.skip": "learn.skip",
};

// ourKey -> extension key (same English meaning, verified value-for-value).
const EXT_MAP = {
  "learn.heroSub": "learn.heroSub",
  // learn.welcomeTitle is NOT mapped to the extension value: the extension
  // translates the "Fun Learning" brand (es "Aprendizaje Divertido", etc.), but
  // the brand stays English everywhere (Jay 2026-10-28). Value comes from
  // gen/<lang>.json with the brand kept in Latin script.
  // learn.welcomeBody is NOT mapped to the extension value: Wave 19 rewrote it
  // with {replay}/{quiz}/{lessons}/{slang} placeholders so no English feature
  // names are stranded in a localized sentence. Translations live in gen/*.json.
  "learn.greeting": "learn.greeting",
  "learn.ctaExplore": "learn.ctaExplore",
  "learn.ctaDiscover": "learn.ctaDiscover",
  "learn.ctaContinue": "learn.ctaContinue",
  "learn.ctaPractice": "learn.ctaPractice",
  "learn.ctaBrowse": "learn.ctaBrowse",
  "learn.replayTitle": "learn.continueTitle",
  "learn.replayBody": "learn.continueDesc",
  "learn.quizTitle": "learn.practiceTitle",
  "learn.quizBody": "learn.practiceDesc",
  "learn.lessonsTitle": "learn.situationsTitle",
  "learn.lessonsBody": "learn.situationsDesc",
  "learn.slangTitle": "learn.slangsTitle",
  "learn.slangBody": "learn.slangsDesc",
  "learn.libraryTitle": "learn.savedTitle",
  "learn.libraryBody": "learn.savedDesc",
  "learn.footer": "learn.footer",
  "learn.saveToUnlock": "learn.saveToUnlock",
  "nav.langLabelNative": "learn.langNative",
  "nav.langLabelLearning": "learn.langLearning",
  "nav.langAriaNative": "onboarding.nativeLanguage",
  "nav.langAriaLearning": "onboarding.learningLanguage",
  "nav.settings": "learn.settings",
  "tinyLessons.eyebrow": "learn.eyebrowSituations",
  "tinyLessons.title": "learn.situationsTitle",
  "tinyLessons.lede": "learn.situationsViewDesc",
  "deck.slangTitle": "learn.slangsTitle",
  "deck.lessonsTitle": "learn.situationsTitle",
  "quiz.eyebrow": "learn.practiceTitle",
  "talkLesson.diffBeginner": "proficiency.beginner",
  "talkLesson.diffIntermediate": "proficiency.intermediate",
  "talkLesson.diffAdvanced": "proficiency.advanced",
  "words.tabMy": "savedWord.myWordsTitle",
  "words.filterSaved": "savedWord.savedBadge",
  "slang.eyebrow": "learn.eyebrowSlang",
  "slang.lede": "learn.slangsViewDesc",
};

// Extension strings we deliberately DON'T reuse because they're factually
// wrong for the web app. The corrected value comes from gen/<lang>.json.
const EXT_SKIP = {
  // ext hi says the example stays "in English" (अंग्रेज़ी में) — false for
  // anyone learning a language other than English.
  hi: ["slang.lede"],
};

// Product names — identical in every locale (the extension marks them translate="no").
const BRAND = {
  "learn.heroTitleLine1": "Fun",
  "learn.heroTitleLine2": "Learning",
  "nav.railLearn": "Fun Learning",
};

const EXT_CODE = { hi: "hi", es: "es", ja: "ja", zh: "zh_CN", ar: "ar", fr: "fr", de: "de", pt: "pt_BR", ko: "ko", it: "it", tr: "tr" };

// --- read EN keys + values (en.ts is a flat object literal) ---------------
const enSrc = fs.readFileSync(path.join(OUT, "en.ts"), "utf8");
const enVals = {};
// Key charset allows hyphens after the first segment so content keys can be
// keyed on the catalog's stable slugs verbatim (e.g. talkContent.airport.check-in.title,
// library.cat.society-culture).
for (const m of enSrc.matchAll(/^\s*"([a-zA-Z0-9]+\.[a-zA-Z0-9.-]+)":\s*\n?\s*"((?:[^"\\]|\\.)*)"/gm)) {
  enVals[m[1]] = JSON.parse(`"${m[2]}"`);
}
const enKeys = Object.keys(enVals);
const ph = (s) => [...s.matchAll(/\{[a-zA-Z0-9_]+\}/g)].map((m) => m[0]).sort().join(",");

const report = {};
let changed = 0;
for (const [lang, extCode] of Object.entries(EXT_CODE)) {
  const gen = JSON.parse(fs.readFileSync(path.join(HERE, "gen", `${lang}.json`), "utf8"));
  const extCat = ext[extCode] ?? {};
  const devCat = extDev[extCode] ?? {};
  const skip = EXT_SKIP[lang] ?? [];
  const lines = [];
  const counts = { brand: 0, ext: 0, extDev: 0, generated: 0, missing: [] };
  for (const k of enKeys) {
    let v, tag;
    if (k in BRAND) { v = BRAND[k]; tag = "brand"; counts.brand++; }
    else if (EXT_MAP[k] && extCat[EXT_MAP[k]] && !skip.includes(k)) { v = extCat[EXT_MAP[k]]; tag = "[ext]"; counts.ext++; }
    else if (DEV_MAP[k] && devCat[DEV_MAP[k]]) { v = devCat[DEV_MAP[k]]; tag = "[ext-dev]"; counts.extDev++; }
    else if (gen[k]) { v = gen[k]; tag = "TODO: native review"; counts.generated++; }
    else { counts.missing.push(k); continue; }
    if (ph(enVals[k]) !== ph(v)) {
      console.error(`ABORT ${lang} ${k}: placeholders ${ph(v) || "(none)"} != EN ${ph(enVals[k]) || "(none)"}`);
      process.exit(1);
    }
    lines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v)}, // ${tag}`);
  }
  const body = `/**
 * ${lang} — UI-text catalog. GENERATED by scripts/i18n/build-catalog.mjs —
 * edit scripts/i18n/gen/${lang}.json (or en.ts for new keys) and rerun.
 * Each line is tagged with its source:
 *   brand                — product name, identical in every locale
 *   [ext]                — verbatim from the Funlingo extension 1.3.2 catalog
 *   [ext-dev]            — verbatim from the extension's dev source (team-written, unshipped)
 *   TODO: native review  — LLM translation, needs a native-speaker pass
 * Missing keys fall back to English at runtime (see ../catalog.ts).
 */

export const ${lang}: Readonly<Record<string, string>> = {
${lines.join("\n")}
};
`;
  const stale = Object.keys(gen).filter((k) => !(k in enVals));
  if (stale.length) console.warn(`${lang}: stale gen keys not in en.ts (ignored): ${stale.join(" ")}`);
  const file = path.join(OUT, `${lang}.ts`);
  const prev = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (prev !== body) {
    changed++;
    if (!CHECK) fs.writeFileSync(file, body);
  }
  report[lang] = { brand: counts.brand, ext: counts.ext, extDev: counts.extDev, generated: counts.generated, missing: counts.missing };
}

console.log(`EN keys: ${enKeys.length}`);
for (const [l, r] of Object.entries(report)) {
  console.log(`${l}: ${r.ext} from extension, ${r.extDev} from extension dev source, ${r.generated} generated, ${r.brand} brand${r.missing.length ? `, MISSING ${r.missing.join(" ")}` : ""}`);
}
if (CHECK && changed) {
  console.error(`${changed} locale file(s) are stale — run node scripts/i18n/build-catalog.mjs`);
  process.exit(1);
}
