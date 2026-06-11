// Post-build step for the static export (`output: "export"`).
//
// The root layout renders a single <html lang="en">, so the statically exported
// locale pages ship with lang="en" and no dir — meaning crawlers see the wrong
// language and RTL locales (ar/he/fa) briefly render LTR before HtmlLangSetter
// runs on the client. Here we rewrite the <html> tag in each locale's exported
// HTML to the correct lang + dir, eliminating the flash and fixing crawler lang.
//
// Defensive by design: never throws, so a missing file can't fail the build.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const RTL = new Set(["ar", "he", "fa"]);
const CODES = [
  "ar", "bg", "ca", "zh-CN", "zh-TW", "hr", "cs", "da", "nl", "en-GB", "fr",
  "de", "el", "he", "hi", "hu", "id", "it", "ja", "ko", "no", "fa", "pl",
  "pt-BR", "pt-PT", "ro", "ru", "sk", "es", "sv", "th", "tr", "uk", "vi",
];

let fixed = 0;
for (const code of CODES) {
  const file = `out/${code}.html`;
  try {
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    const dir = RTL.has(code) ? "rtl" : "ltr";
    const next = html.replace(
      /<html lang="en"/,
      `<html lang="${code}" dir="${dir}"`
    );
    if (next !== html) {
      writeFileSync(file, next);
      fixed++;
    }
  } catch (err) {
    console.warn(`[postbuild-locale-html] skipped ${file}: ${err.message}`);
  }
}
console.log(`[postbuild-locale-html] set lang/dir on ${fixed} locale page(s)`);
