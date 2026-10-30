// Post-build step for the static export (`output: "export"`).
//
// The root layout renders a single <html lang="en">, so the exported locale
// pages ship with lang="en" and no dir — meaning crawlers see the wrong
// language and RTL locales (ar/he/fa) briefly render LTR before HtmlLangSetter
// runs on the client. Here we rewrite the <html> tag in each locale's HTML to
// the correct lang + dir. The same goes for the few blog posts written in
// another language (app/i18n/page-lang.json).
//
// Both copies of each page are rewritten: out/ (the static export) and
// .next/server/app/ (what Vercel actually serves). Patching only out/ left
// production on lang="en".
//
// Fails the build if any expected page wasn't found or rewritten, so this
// can't silently stop working again.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const RTL = new Set(["ar", "he", "fa"]);
const CODES = [
  "ar", "bg", "ca", "zh-CN", "zh-TW", "hr", "cs", "da", "nl", "en-GB", "fr",
  "de", "el", "he", "hi", "hu", "id", "it", "ja", "ko", "no", "fa", "pl",
  "pt-BR", "pt-PT", "ro", "ru", "sk", "es", "sv", "th", "tr", "uk", "vi",
];
const PAGE_LANG = JSON.parse(readFileSync("app/i18n/page-lang.json", "utf8"));

// [page path without leading slash, lang]
const PAGES = [
  ...CODES.map((code) => [code, code]),
  ...Object.entries(PAGE_LANG).map(([path, lang]) => [path.slice(1), lang]),
];
const ROOTS = ["out", ".next/server/app"].filter((root) => existsSync(root));

const problems = [];
let fixed = 0;
for (const root of ROOTS) {
  for (const [page, lang] of PAGES) {
    const file = `${root}/${page}.html`;
    if (!existsSync(file)) {
      problems.push(`missing ${file}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const dir = RTL.has(lang) ? "rtl" : "ltr";
    const tag = `<html lang="${lang}" dir="${dir}"`;
    if (html.includes(tag)) {
      fixed++;
      continue;
    }
    const next = html.replace(/<html lang="en"/, tag);
    if (next === html) {
      problems.push(`no <html lang="en"> in ${file}`);
      continue;
    }
    writeFileSync(file, next);
    fixed++;
  }
}

console.log(`[postbuild-locale-html] set lang/dir on ${fixed} page(s) in ${ROOTS.join(", ")}`);
if (ROOTS.length === 0 || problems.length > 0) {
  console.error(`[postbuild-locale-html] failed:\n  ${problems.join("\n  ") || "no build output found"}`);
  process.exit(1);
}
