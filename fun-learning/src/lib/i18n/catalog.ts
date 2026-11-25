/**
 * UI-text catalog for Fun Learning web — Wave 14.
 *
 * Resolves a `t(key, lang, params?)` call against a per-locale catalog, with
 * a safe fallback chain and `{param}` interpolation. The 12 locales we ship
 * are the chrome locales a learner can pick as their *native* language:
 *
 *   en  hi  es  ja  zh  ar  fr  de  pt  ko  it  tr
 *
 * UI-chrome strings (nav labels, buttons, counters) key off the viewer's
 * `nativeLang` — a Hindi-native learner studying Japanese sees Hindi chrome
 * around Japanese content. Content (topic blurbs, slang phrases, lesson
 * scenes) is per-learning-lang and lives elsewhere.
 *
 * Direction (RTL) is a layout concern — see `./rtl.ts`. The catalog only
 * carries text.
 *
 * Design notes
 *   • Fallback chain: requested lang → `en` → the raw key. Never throws.
 *   • Interpolation: `"{n} phrases"` + `{n: 12}` → `"12 phrases"`. Missing
 *     params are left as the literal `"{name}"` so the omission is loud.
 *   • Keys use the Funlingo extension's `area.purpose` convention; the EN
 *     catalog (`./catalog/en.ts`) is the source of truth.
 *   • This module is SERVER-ONLY in practice: it statically imports all 12
 *     locales. Client components never import it — they get a per-viewer
 *     slice (`clientSlice()`) through <I18nProvider> (see ./client.tsx).
 */

import { en } from "./catalog/en";
import { hi } from "./catalog/hi";
import { es } from "./catalog/es";
import { ja } from "./catalog/ja";
import { zh } from "./catalog/zh";
import { ar } from "./catalog/ar";
import { fr } from "./catalog/fr";
import { de } from "./catalog/de";
import { pt } from "./catalog/pt";
import { ko } from "./catalog/ko";
import { it } from "./catalog/it";
import { tr } from "./catalog/tr";

export type Catalog = Readonly<Record<string, string>>;

/**
 * All locale catalogs we ship. The key is the BCP-47 primary tag we accept
 * from `nativeLang`; the value is the frozen catalog object.
 *
 * Non-null assertions on `en` because the EN catalog literally defines the
 * contract — if en.ts is empty we have bigger problems than fallback.
 */
export const CATALOGS: Readonly<Record<string, Catalog>> = Object.freeze({
  en,
  hi,
  es,
  ja,
  zh,
  ar,
  fr,
  de,
  pt,
  ko,
  it,
  tr,
});

export const SUPPORTED_LOCALES = Object.freeze(Object.keys(CATALOGS));

/**
 * Normalize an arbitrary code (`"hi-IN"`, `"PT_br"`, `"zh-Hans"`) to one of
 * our supported locale codes. Unknown codes fall through to `"en"`.
 *
 * The mapping is intentionally small and explicit: a learner's nativeLang
 * is typed in from the LangPills, which already uses our short codes.
 * This function is here as a defence against future `uiLocale` drift.
 */
export function normalizeLocale(input: string | null | undefined): string {
  if (!input) return "en";
  const trimmed = String(input).trim();
  if (!trimmed) return "en";
  const primary = trimmed.toLowerCase().split(/[-_]/)[0] ?? "";
  // Script variants collapse to the primary tag.
  if (primary === "pt") return "pt";
  if (primary === "zh") return "zh";
  if (primary in CATALOGS) return primary;
  return "en";
}

/**
 * Interpolate `{name}` placeholders in a template. A missing param is kept
 * as its literal placeholder so a bug is visible instead of silent.
 */
function interpolate(
  template: string,
  params: Record<string, string | number> | undefined,
): string {
  if (!params) return template;
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, name) => {
    const v = params[name];
    if (v === undefined || v === null) return match;
    return String(v);
  });
}

/**
 * Resolve a translation key to a localised string.
 *
 *   t("tinyLessons.phrasesPlural", "hi", { n: 12 })  →  "12 वाक्यांश"
 *   t("deck.navNext", "ar")                     →  "التالي"
 *   t("some.unknown.key", "en")                 →  "some.unknown.key"
 *
 * Fallback chain: requested lang → "en" → raw key. Never throws, never
 * returns an empty string unless the catalog deliberately has one.
 */
export function t(
  key: string,
  lang: string | null | undefined,
  params?: Record<string, string | number>,
): string {
  const locale = normalizeLocale(lang);
  const localeCat = CATALOGS[locale];
  const enCat = CATALOGS.en!;

  const value =
    (localeCat && localeCat[key]) ?? enCat[key] ?? key;
  return interpolate(value, params);
}

/**
 * Build a `t()` bound to one locale. Server components call this once per
 * request; client components can accept the pre-bound function as a prop.
 */
export function bindT(lang: string | null | undefined) {
  const locale = normalizeLocale(lang);
  return (key: string, params?: Record<string, string | number>): string =>
    t(key, locale, params);
}

/**
 * Pick a subset of keys from a locale (and English fallbacks for anything
 * missing). Use when passing a small catalog slice to a client component
 * so the Hydration payload stays tiny.
 *
 *   const slice = pickCatalog("hi", ["deck.navPrev", "deck.navNext"]);
 *   <DeckClient t={slice} />
 */
export function pickCatalog(
  lang: string | null | undefined,
  keys: readonly string[],
): Readonly<Record<string, string>> {
  const locale = normalizeLocale(lang);
  const localeCat = CATALOGS[locale];
  const enCat = CATALOGS.en!;
  const out: Record<string, string> = {};
  for (const k of keys) {
    out[k] = (localeCat && localeCat[k]) ?? enCat[k] ?? k;
  }
  return Object.freeze(out);
}

/**
 * Key prefixes rendered by CLIENT components (IconRail, LangPills,
 * FlashcardDeck, QuickQuizRunner, WordsExplorer, ShelfTabs, LessonChat).
 * Only these travel to the browser — server-rendered chrome (page titles,
 * ledes, metadata) never leaves the server. If you add `useT()` to a new
 * client component, add its key prefix here or it will render raw keys.
 */
export const CLIENT_KEY_PREFIXES: readonly string[] = Object.freeze([
  "nav.",
  "deck.",
  "quiz.",
  "talkLesson.",
  "words.filter",
  "words.search",
  "words.count",
  "words.empty",
  "words.action",
  "words.row",
  "words.hearAria",
  // Wave 19 — /words explorer (client) reads these too.
  "words.allPlatforms",
  "words.platform",
  "words.sort",
  "words.seen",
  "words.savedOn",
  "words.removed",
  "words.deleteSelected",
  "words.select",
  "words.export",
  "words.alsoMeans",
  "words.knownHint",
  "read.tab",
  "read.empty",
  "read.ariaShelves",
  "read.signInToSee",
  "read.unknownAuthor",
  // Lead-QA P1 — ReviewRunner (client) reads review.* via the root global
  // provider. The /review server page uses getT and doesn't need these, but
  // the prefix is coarse; review.* is a small handful of short keys so the
  // <25 KB global-slice guard stays green.
  "review.",
]);

/**
 * Wave 19 — big SINGLE-PAGE client surfaces. Each ships ONLY to its own route
 * through a nested <I18nProvider> built with `pageClientSlice()`, so the ~185
 * watch keys, the long settings copy, etc. never bloat the global slice every
 * other page carries (guarded by the <25 KB test).
 *   watch.*                 → /watch
 *   settings.* + feedback.* → /settings
 *   onboarding.*            → /welcome
 *   sentences.*             → /sentences
 */
export const WATCH_KEY_PREFIXES: readonly string[] = Object.freeze(["watch."]);
export const SETTINGS_KEY_PREFIXES: readonly string[] = Object.freeze(["settings.", "feedback."]);
export const ONBOARDING_KEY_PREFIXES: readonly string[] = Object.freeze(["onboarding."]);
export const SENTENCES_KEY_PREFIXES: readonly string[] = Object.freeze(["sentences."]);
// Lead-QA P1 — the /library default "YouTube" discovery tab's client
// sub-components (YouTubePaste, ChannelRecommendations, LibraryEmptyActions)
// read library.* via a page-scoped <I18nProvider slice={pageClientSlice(...)}>
// so the ~95 library.* keys never bloat the global slice other pages carry.
export const LIBRARY_KEY_PREFIXES: readonly string[] = Object.freeze(["library."]);
// Lead-QA P1 (drills) — the /review drill components (GradeRow + Flashcard,
// Dictation, GuessMeaning, Shadowing, Speaking) read reviewDrill.* via a
// page-scoped <I18nProvider slice={pageClientSlice(REVIEW_DRILL_KEY_PREFIXES)}>
// wrapping ReviewRunner. These ~90 keys stay OUT of the global slice so the
// Hindi global client slice stays under the <25 KB guard; the page slice still
// carries the global chrome (review.*, quiz.*, nav.*) ReviewRunner itself uses.
export const REVIEW_DRILL_KEY_PREFIXES: readonly string[] = Object.freeze(["reviewDrill."]);

function sliceForPrefixes(
  lang: string | null | undefined,
  prefixes: readonly string[],
): Readonly<Record<string, string>> {
  const keys = Object.keys(CATALOGS.en!).filter((k) => prefixes.some((p) => k.startsWith(p)));
  return pickCatalog(lang, keys);
}

/** The resolved global client slice for one locale (EN-filled for any gaps). */
export function clientSlice(lang: string | null | undefined): Readonly<Record<string, string>> {
  return sliceForPrefixes(lang, CLIENT_KEY_PREFIXES);
}

/** Global client slice PLUS a page's own extra key prefixes (for a nested provider). */
export function pageClientSlice(
  lang: string | null | undefined,
  extraPrefixes: readonly string[],
): Readonly<Record<string, string>> {
  return sliceForPrefixes(lang, [...CLIENT_KEY_PREFIXES, ...extraPrefixes]);
}

/** Global client slice PLUS the Watch-route keys, for the /watch provider. */
export function watchClientSlice(
  lang: string | null | undefined,
): Readonly<Record<string, string>> {
  return pageClientSlice(lang, WATCH_KEY_PREFIXES);
}
