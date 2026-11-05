/**
 * Map a short learning-language code (`"es"`, `"ja"`) to the BCP-47 tag the
 * browser's SpeechRecognition API expects for that language's default
 * locale (`"es-ES"`, `"ja-JP"`).
 *
 * Covers the 21 locales we support in Fun Learning v1. Anything unknown
 * falls through to `"en-US"` so the mic still works instead of silently
 * failing.
 */

const BCP47_DEFAULTS: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  ru: "ru-RU",
  nl: "nl-NL",
  pl: "pl-PL",
  sv: "sv-SE",
  tr: "tr-TR",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
  th: "th-TH",
  vi: "vi-VN",
  id: "id-ID",
  hi: "hi-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  ar: "ar-SA",
  he: "he-IL",
  fa: "fa-IR",
  ur: "ur-PK",
};

const DEFAULT_FALLBACK = "en-US";

export function normalizeToBCP47(code: string | null | undefined): string {
  if (!code) return DEFAULT_FALLBACK;
  const trimmed = code.trim();
  if (!trimmed) return DEFAULT_FALLBACK;
  // Already a tag like "pt-BR" → trust it (region/case normalised).
  if (/[-_]/.test(trimmed)) {
    const [primary, region] = trimmed.split(/[-_]/);
    if (primary && region) {
      return `${primary.toLowerCase()}-${region.toUpperCase()}`;
    }
  }
  const primary = trimmed.toLowerCase();
  return BCP47_DEFAULTS[primary] ?? DEFAULT_FALLBACK;
}
