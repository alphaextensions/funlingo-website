/**
 * Wave 18 — onboarding copy.
 *
 * Two sources:
 *  1. `ext-strings.json` — the extension's OWN translated onboarding strings
 *     (22 locales) extracted from its `dist/i18n.js` by
 *     `scripts/extract-onboarding-strings.mjs`. Same words a learner already
 *     saw in the extension's first-run modal.
 *  2. `WEB_EN` — web-only lines with no extension equivalent. English only for
 *     now; the Wave 14 lane owns `src/lib/i18n/catalog` and can absorb these
 *     (list mirrored in AGENT-PLAYBOOK "Wave 18 onboarding").
 */

import extStrings from "./ext-strings.json";

export type ExtKey =
  | "onboarding.welcomeSubtext"
  | "onboarding.stepOf"
  | "onboarding.goBack"
  | "onboarding.languageSetup"
  | "onboarding.nativeLanguage"
  | "onboarding.learningLanguage"
  | "onboarding.nextStep"
  | "onboarding.learningPreferences"
  | "onboarding.proficiencyLevel"
  | "onboarding.recommended"
  | "onboarding.save"
  | "proficiency.beginner"
  | "proficiency.intermediate"
  | "proficiency.advanced"
  | "fta.heading"
  | "fta.step2";

/** Web-only English strings (no extension translation exists). */
export const WEB_EN = {
  dialogLabel: "Welcome to Funlingo",
  skip: "Skip for now",
  searchLanguage: "Search language…",
  noMatch: "No languages match",
  saveError: "Couldn't save. Try again.",
  saving: "Saving…",
  allSetSub: "Fun Learning is ready for your {learning}. Here's where to start:",
  allSetStep1: "Paste a YouTube link in Library to study it line by line",
  allSetStep3: "Tap any word to see what it means and save it",
  allSetCta: "Start learning",
} as const;
export type WebKey = keyof typeof WEB_EN;

type Table = Record<string, Partial<Record<ExtKey, string>>>;
const TABLE = extStrings as Table;

/** Web language code → extension locale key (mirrors the extension's own map). */
export function extLocaleFor(code: string | null | undefined): string {
  if (!code) return "en";
  const c = code.trim();
  const lower = c.toLowerCase().replace(/_/g, "-");
  if (lower === "zh-tw" || lower === "zh-hant" || lower === "zh-hk") return "zh_TW";
  if (lower.startsWith("zh")) return "zh_CN";
  if (lower === "pt-pt") return "pt_PT";
  if (lower.startsWith("pt")) return "pt_BR";
  const primary = lower.split("-")[0];
  return primary in TABLE ? primary : "en";
}

function fill(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Translated extension string, English fallback. */
export function tx(locale: string, key: ExtKey, vars?: Record<string, string | number>): string {
  const loc = extLocaleFor(locale);
  const s = TABLE[loc]?.[key] ?? TABLE.en?.[key] ?? key;
  return fill(s, vars);
}

/** Web-only string (English until the catalog lane translates it). */
export function tw(key: WebKey, vars?: Record<string, string | number>): string {
  return fill(WEB_EN[key], vars);
}

/** Locales the extension ships onboarding translations for. */
export const EXT_LOCALES = Object.keys(TABLE);
