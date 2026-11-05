// Post-build check for the static export (`output: "export"`).
//
// Every page's <html lang> and dir are set at build time by its root layout:
// app/(en) for English, app/[locale] for /fr, /nl/netflix …, and one group
// per language for blog posts written in another (app/i18n/page-lang.json).
// This used to be patched into the HTML after the build, which never reached
// what Vercel serves. Now it only checks, and fails the build if any page
// says the wrong language, so this can't silently stop working again.

import { readFileSync, existsSync } from "node:fs";

// Locale code -> [hreflang, dir], read from the config the layouts use.
const LOCALES = [
  ...readFileSync("app/i18n/config.ts", "utf8").matchAll(
    /code: "([^"]+)",[^}]*?hreflang: "([^"]+)", dir: "(ltr|rtl)"/g,
  ),
].map((m) => [m[1], m[2], m[3]]);
const PAGE_LANG = JSON.parse(readFileSync("app/i18n/page-lang.json", "utf8"));
// Platform slugs, read from the TypeScript list the routes are built from.
const PLATFORMS = [
  ...readFileSync("sections/platform/platformLinks.ts", "utf8").matchAll(/slug: "([^"]+)"/g),
].map((m) => m[1]);
if (LOCALES.length < 30 || PLATFORMS.length === 0) {
  console.error("[check-html-lang] couldn't read the locale or platform list");
  process.exit(1);
}

// [page path without leading slash, lang, dir]
const PAGES = [
  ["index", "en", "ltr"],
  ...PLATFORMS.map((slug) => [slug, "en", "ltr"]),
  ...LOCALES.flatMap(([code, lang, dir]) => [
    [code, lang, dir],
    ...PLATFORMS.map((slug) => [`${code}/${slug}`, lang, dir]),
  ]),
  ...Object.entries(PAGE_LANG).map(([path, lang]) => [path.slice(1), lang, "ltr"]),
];

const problems = [];
for (const [page, lang, dir] of PAGES) {
  const file = `out/${page}.html`;
  if (!existsSync(file)) {
    problems.push(`missing ${file}`);
    continue;
  }
  const tag = readFileSync(file, "utf8").match(/<html[^>]*>/)?.[0] ?? "";
  if (!tag.includes(`lang="${lang}"`) || !tag.includes(`dir="${dir}"`)) {
    problems.push(`${file}: expected lang="${lang}" dir="${dir}", got ${tag}`);
  }
}

if (problems.length > 0) {
  console.error(`[check-html-lang] ${problems.length} page(s) with the wrong language:\n  ${problems.slice(0, 20).join("\n  ")}`);
  process.exit(1);
}
console.log(`[check-html-lang] ${PAGES.length} pages have the right <html lang> and dir`);
