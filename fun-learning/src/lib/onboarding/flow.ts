/**
 * Wave 18 — `/welcome` first-run onboarding: pure logic shared by the server
 * gate, the client flow and the tests. No React, no Next, no Prisma here.
 *
 * Mirrors the extension's landing onboarding (see
 * docs/wave18-onboarding-parity.md): 2 steps (Language Setup, Learning
 * Preferences) then a "You're all set!" card.
 */

export const WELCOME_COOKIE = "fl_welcome";
export const NATIVE_COOKIE = "fl_native";
export const LEARNING_COOKIE = "fl_learning";
export const LEVEL_COOKIE = "fl_level";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Steps counted by "Step N of M" — the all-set card is not a numbered step. */
export const TOTAL_STEPS = 2;

export type OnboardingStatus = "done" | "skipped";
export function isOnboardingStatus(v: unknown): v is OnboardingStatus {
  return v === "done" || v === "skipped";
}

/** The extension's three proficiency pills. Default: intermediate (Recommended). */
export type Proficiency = "beginner" | "intermediate" | "advanced";
export const PROFICIENCIES: Proficiency[] = ["beginner", "intermediate", "advanced"];
export const DEFAULT_PROFICIENCY: Proficiency = "intermediate";

/**
 * `User.level` is CEFR (A1..C2). SPEC §3 tops its onboarding scale at B2, so:
 * Beginner → A1, Intermediate → B1, Advanced → B2.
 */
const TO_CEFR: Record<Proficiency, string> = { beginner: "A1", intermediate: "B1", advanced: "B2" };
export function proficiencyToCefr(p: Proficiency): string {
  return TO_CEFR[p];
}
export function cefrToProficiency(level: string | null | undefined): Proficiency {
  if (!level) return DEFAULT_PROFICIENCY;
  const l = level.trim().toUpperCase();
  if (l === "A1" || l === "A2") return "beginner";
  if (l === "B1") return "intermediate";
  if (l === "B2" || l === "C1" || l === "C2") return "advanced";
  return DEFAULT_PROFICIENCY;
}
export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export function isCefr(v: unknown): v is (typeof CEFR_LEVELS)[number] {
  return typeof v === "string" && (CEFR_LEVELS as readonly string[]).includes(v);
}

export interface GateInput {
  /** Value of the fl_welcome cookie, if any. */
  welcomeCookie: string | null | undefined;
  signedIn: boolean;
  /** Signed-out: an fl_native / fl_learning cookie exists (LangPills already used). */
  hasLangCookies: boolean;
  /** Signed-in: Prefs.json.onboarding. */
  prefsOnboarding: unknown;
  /** Signed-in: User.nativeLang already saved (configured before Wave 18). */
  userHasNativeLang: boolean;
}

/**
 * Should `/` send this visitor to `/welcome`? Same rule as the extension's
 * `funlingo_onboarding_complete || hasConfiguredLanguages → don't show`.
 */
export function shouldShowWelcome(i: GateInput): boolean {
  if (isOnboardingStatus(i.welcomeCookie)) return false;
  if (i.signedIn) {
    if (isOnboardingStatus(i.prefsOnboarding)) return false;
    return !i.userHasNativeLang;
  }
  return !i.hasLangCookies;
}

export interface LangOption {
  value: string;
  label: string;
}

/** Extension search rule: autonym, code or English name, case-insensitive. */
export function filterLanguages(
  options: LangOption[],
  query: string,
  englishName: (code: string) => string = (c) => c,
): LangOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return options;
  return options.filter(
    (o) =>
      o.label.toLowerCase().includes(q) ||
      o.value.toLowerCase().includes(q) ||
      englishName(o.value).toLowerCase().includes(q),
  );
}

/** First Accept-Language entry that is one of `allowed` (extension: navigator.languages). */
export function pickFromAcceptLanguage(
  header: string | null | undefined,
  allowed: string[],
  fallback = "en",
): string {
  if (!header) return fallback;
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((t) => t.tag && !Number.isNaN(t.q))
    .sort((a, b) => b.q - a.q);
  for (const { tag } of tags) {
    const primary = tag.split(/[-_]/)[0];
    if (allowed.includes(primary)) return primary;
  }
  return fallback;
}

/** Web language lists — kept identical to TopNav's pills (test-pinned). */
// Native/interface languages = exactly the locales we ship a UI catalog for
// (src/lib/i18n/catalog). Earlier this listed mr/gu (no catalog → silent English
// fallback) and omitted pt/it/tr/zh (which DO have full, native-QA'd catalogs),
// so four finished locales were unreachable and two offered ones were broken
// (PM review 2026-10-29). mr/gu remain selectable as LEARNING languages below.
export const NATIVE_OPTIONS: LangOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "tr", label: "Türkçe" },
  { value: "ar", label: "العربية" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "zh", label: "中文" },
];
export const LEARNING_OPTIONS: LangOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "hi", label: "हिन्दी" },
  { value: "mr", label: "मराठी" },
  { value: "gu", label: "ગુજરાતી" },
  { value: "ar", label: "العربية" },
  { value: "zh", label: "中文" },
  { value: "th", label: "ไทย" },
];

/** Sorted by autonym, like the extension's dropdown. */
export function sortedByLabel(options: LangOption[]): LangOption[] {
  return [...options].sort((a, b) => a.label.localeCompare(b.label));
}
