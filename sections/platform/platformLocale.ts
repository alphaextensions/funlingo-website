import TX from "./plat-tx.json";
import { PLATFORM_LABELS, LANG_NAMES, platformBySlug, fillName, type Platform } from "./platforms";

// A platform page's copy in one site language. Server only: the page passes
// the result to PlatformContent, so the browser gets one language, not all 33.
//
// Same rules as the design (Funlingo For.dc.html): English, including en-GB,
// uses each platform's own copy from platforms.ts. Other languages use the
// shared strings in plat-tx.json (steps, features and FAQs are generic, with
// {name} filled in) plus 7 strings per platform. Show titles and platform
// names are never translated.

export type PlatformLabels = Record<keyof typeof PLATFORM_LABELS, string>;

export type LocalizedPlatform = {
  p: Platform;
  /** Labels with {name} still in them (filled per platform in the page). */
  L: PlatformLabels;
  /** Language code -> name in the page's language, for pills and tabs. */
  langNames: Record<string, string>;
};

type Tx = { keys: string[]; order: string[]; T: Record<string, { s: string[]; p: string[][] }> };
const tx = TX as Tx;

const LABEL_KEYS: Record<keyof typeof PLATFORM_LABELS, string> = {
  forX: "for_x", freeLine: "free_line", setupEye: "setup_eye", setupH: "setup_h",
  featEye: "feat_eye", featH: "feat_h", showsEye: "shows_eye", catalogNote: "catalog_note",
  gameEye: "game_eye", gameH: "game_h", revEye: "rev_eye", revH: "rev_h", faqH: "faq_h",
  guidesH: "guides_h", allGuides: "all_guides", othersH: "others_h", ctaH: "cta_h", ctaS: "cta_s",
};

const LEVEL_KEYS: Record<string, string> = {
  "Beginner": "lvl_b", "Beginner+": "lvl_bp", "Intermediate": "lvl_i",
  "Advanced": "lvl_a", "All levels": "lvl_all", "Beginner → Advanced": "lvl_ba",
};

/** Site locales with translated platform copy (all but English). */
export const PLATFORM_TX_LOCALES = Object.keys(tx.T);

function strings(locale: string): Record<string, string> | null {
  const b = tx.T[locale];
  if (!b) return null;
  return Object.fromEntries(tx.keys.map((k, i) => [k, b.s[i]]));
}

function languageNames(locale: string, codes: string[]): Record<string, string> {
  if (locale.startsWith("en")) return Object.fromEntries(codes.map((c) => [c, LANG_NAMES[c] ?? c]));
  const dn = new Intl.DisplayNames([locale], { type: "language" });
  return Object.fromEntries(
    codes.map((c) => {
      const n = dn.of(c);
      return [c, n ? n.charAt(0).toUpperCase() + n.slice(1) : (LANG_NAMES[c] ?? c)];
    }),
  );
}

export function localizePlatform(slug: string, locale: string): LocalizedPlatform {
  const en = platformBySlug(slug);
  const codes = Array.from(new Set([...Object.keys(LANG_NAMES), ...Object.keys(en.shows)]));
  const langNames = languageNames(locale, codes);
  const S = strings(locale);
  if (!S) return { p: en, L: { ...PLATFORM_LABELS }, langNames };

  const tp = tx.T[locale].p[tx.order.indexOf(slug)];
  const fill = (s: string) => fillName(s, en.name);
  const L = Object.fromEntries(
    Object.entries(LABEL_KEYS).map(([k, key]) => [k, S[key]]),
  ) as PlatformLabels;

  // The title template holds {name} wherever the language puts it.
  const h1 = slug === "crunchyroll" ? S.h1_ja : slug === "bilibili" ? S.h1_zh : S.h1;
  const at = h1.indexOf("{name}");

  const p: Platform = {
    ...en,
    title: fill(S.title),
    desc: fill(S.desc),
    h1a: h1.slice(0, at),
    h1b: en.name,
    h1c: h1.slice(at + "{name}".length),
    sub: tp[0],
    intro: tp[1],
    steps: [["st1t", "st1b"], ["st2t", "st2b"], ["st3t", "st3b"]].map(([t, b]) => [fill(S[t]), fill(S[b])]),
    features: [["f1t", "f1b"], ["f2t", "f2b"], ["f3t", "f3b"], ["f4t", "f4b"]].map(([t, b]) => [fill(S[t]), fill(S[b])]),
    showsH: fill(S.shows_h),
    shows: Object.fromEntries(
      Object.entries(en.shows).map(([lang, list]) => [
        lang,
        list.map((s) => ({ ...s, level: S[LEVEL_KEYS[s.level]] ?? s.level, note: S[s.d] ?? s.note })),
      ]),
    ),
    special: { eyebrow: fill(S.tip_eye), h: tp[2], items: [[tp[3], tp[4]], [tp[5], tp[6]]] },
    faqs: [["q1", "a1"], ["q2", "a2"], ["q3", "a3"], ["q4", "a4"]].map(([q, a]) => [fill(S[q]), fill(S[a])]),
  };
  return { p, L, langNames };
}
