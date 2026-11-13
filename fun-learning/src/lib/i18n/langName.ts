/**
 * langName — a language's endonym (its own name), for showing inside the UI
 * instead of a raw code. Used wherever a sentence names the learner's language:
 * previously these interpolated `lang.toUpperCase()`, so a learner saw "ES"
 * where a language name belongs — inconsistent with the top-bar pill ("Español")
 * and reading like an unfinished placeholder (PM review 2026-10-29).
 *
 * Endonyms (not native-language exonyms) keep this a pure, locale-independent
 * helper that works identically on the server and client, and they match what
 * the language pickers already display.
 */

const ENDONYM: Record<string, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  tr: "Türkçe",
  ar: "العربية",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
  hi: "हिन्दी",
  mr: "मराठी",
  gu: "ગુજરાતી",
  th: "ไทย",
  ur: "اردو",
  he: "עברית",
};

/** The language's own name, e.g. "es" → "Español". Falls back to the
 *  uppercased primary subtag for anything we don't have a name for. */
export function langName(code: string | null | undefined): string {
  const primary = String(code ?? "").toLowerCase().split(/[-_]/)[0] ?? "";
  return ENDONYM[primary] ?? primary.toUpperCase();
}
