/**
 * Wave 6 /learn content helpers.
 *
 * Reads straight from the Funlingo-authored JSON catalogs in
 * `data/seed/situations*.json` and `data/seed/slangs.json`. The DB-backed
 * Pack / PackItem rows only persist `text` + `translation`, but the JSON
 * carries richer fields (romanization, example, era, usage) that the Tiny
 * Lessons flashcards and the Slang Hang cards need.
 *
 * All content here is Funlingo-authored → safe to render on the client per
 * LEGAL.md (not third-party captions). Nothing we touch here hits Prisma.
 */

import situationsJson from "../../../data/seed/situations.json";
import situations2Json from "../../../data/seed/situations-2.json";
import slangsJson from "../../../data/seed/slangs.json";

export interface PhraseCard {
  phrase: string;
  romanization?: string;
  meaning: string;
  usage?: string;
  literal?: string | null;
}

export interface SituationBundle {
  slug: string;
  title: string;
  titleEn?: string;
  icon: string;
  locale: string;
  lang: string;
  phrases: PhraseCard[];
}

export interface SlangCard {
  phrase: string;
  romanization?: string;
  meaning: string;
  example?: string;
  register?: string;
  category?: string;
  era?: string;
}

export interface SlangBundle {
  locale: string;
  lang: string;
  localeLabel: string;
  expressions: SlangCard[];
}

interface SeedSituation {
  title: string;
  titleEn?: string;
  icon?: string;
  phrases: PhraseCard[];
}

const SITUATIONS = situationsJson as unknown as Record<string, Record<string, SeedSituation>>;
const SITUATIONS2 = situations2Json as unknown as Record<string, Record<string, SeedSituation>>;
const SLANGS = slangsJson as unknown as Record<string, { expressions: SlangCard[] }>;

/** Map locale code → short ISO 639-1 lang used by the viewer and the DB. */
function localeToLang(locale: string): string {
  const lc = locale.toLowerCase();
  if (lc.startsWith("en")) return "en";
  if (lc.startsWith("es")) return "es";
  if (lc.startsWith("pt")) return "pt";
  if (lc === "zh-cn" || lc === "zh-tw") return "zh";
  return lc.split("-")[0] ?? lc;
}

/** Fallback emoji for situations when the source JSON doesn't carry one. */
const SITUATION_ICON_FALLBACK: Record<string, string> = {
  restaurant: "🍽️",
  airport: "✈️",
  taxi: "🚕",
  hotel: "🏨",
  shopping: "🛍️",
  doctor: "🩺",
  dating: "💕",
  interview: "💼",
};

/** For each ISO-639-1 lang we support, pick a representative locale key
 *  from the situations JSON. "en" → "en" (not en-US/en-GB) because the base
 *  en bundle exists in situations.json. "es" → "es" (same). */
function pickSituationLocale(lang: string): string | null {
  const lc = lang.toLowerCase();
  if (lc === "en") return "en";
  if (lc === "es") return "es";
  if (lc === "pt") return "pt";
  if (lc === "zh") return "zh-CN";
  // Direct hits in situations-2 for ja/ko/hi/it/tr.
  if (lc === "ja") return "ja";
  if (lc === "ko") return "ko";
  if (lc === "hi") return "hi";
  if (lc === "it") return "it";
  if (lc === "tr") return "tr";
  // Latin partners that exist in situations.json.
  if (lc === "fr") return "fr";
  if (lc === "de") return "de";
  // No bundle for this lang.
  return null;
}

function readSituationsForLocale(locale: string): Record<string, SeedSituation> | null {
  // Try locale-specific first, then language-only fallback.
  if (SITUATIONS[locale]) return SITUATIONS[locale];
  if (SITUATIONS2[locale]) return SITUATIONS2[locale];
  const lang = locale.split("-")[0];
  if (lang && SITUATIONS[lang]) return SITUATIONS[lang];
  if (lang && SITUATIONS2[lang]) return SITUATIONS2[lang];
  return null;
}

/** Return every situation bundle for the user's active learning lang. */
export function listSituations(lang: string): SituationBundle[] {
  const locale = pickSituationLocale(lang);
  if (!locale) return [];
  const bundle = readSituationsForLocale(locale);
  if (!bundle) return [];
  const out: SituationBundle[] = [];
  for (const [slug, s] of Object.entries(bundle)) {
    if (!s || !Array.isArray(s.phrases) || s.phrases.length === 0) continue;
    out.push({
      slug,
      title: s.title,
      titleEn: s.titleEn,
      icon: s.icon ?? SITUATION_ICON_FALLBACK[slug] ?? "💬",
      locale,
      lang: localeToLang(locale),
      phrases: s.phrases,
    });
  }
  return out;
}

/** Return a single situation bundle, or null if unknown. */
export function getSituation(lang: string, slug: string): SituationBundle | null {
  const list = listSituations(lang);
  return list.find((s) => s.slug === slug) ?? null;
}

const SLANG_LOCALE_LABEL: Record<string, string> = {
  ar: "Arabic",
  de: "German",
  en: "English",
  "en-GB": "British English",
  "en-US": "American English",
  es: "Spanish",
  "es-ES": "Spanish (Spain)",
  "es-LA": "Spanish (Latin America)",
  fr: "French",
  hi: "Hindi",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  "pt-BR": "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  tr: "Turkish",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
};

/** Pick the best slang bundle locale for a given lang code. Prefer the
 *  bare-lang bundle when the catalog has one; otherwise fall back to the
 *  default regional locale. */
function pickSlangLocale(lang: string): string | null {
  const lc = lang.toLowerCase();
  if (SLANGS[lc]) return lc; // e.g. "ar", "fr", "de", "hi", "ja" …
  if (lc === "en") return SLANGS["en-US"] ? "en-US" : "en-GB";
  if (lc === "es") return SLANGS["es-ES"] ? "es-ES" : "es-LA";
  if (lc === "pt") return SLANGS["pt-BR"] ? "pt-BR" : "pt-PT";
  if (lc === "zh") return SLANGS["zh-CN"] ? "zh-CN" : "zh-TW";
  // Case where the lang already looks like a locale (e.g. "en-US").
  if (SLANGS[lang]) return lang;
  return null;
}

/** Return every slang expression for the user's active learning lang. */
export function listSlangs(lang: string): SlangBundle | null {
  const locale = pickSlangLocale(lang);
  if (!locale) return null;
  const bundle = SLANGS[locale];
  if (!bundle || !Array.isArray(bundle.expressions) || bundle.expressions.length === 0) {
    return null;
  }
  return {
    locale,
    lang: localeToLang(locale),
    localeLabel: SLANG_LOCALE_LABEL[locale] ?? locale,
    expressions: bundle.expressions,
  };
}
