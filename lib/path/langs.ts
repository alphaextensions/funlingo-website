// Display names and speech locales for course languages. Spanish defaults to a
// Latin-American voice because the course content is neutral Latin-American.

export const LANG_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
  pt: "Portuguese",
};

const SPEECH_LOCALES: Record<string, string> = {
  en: "en-US",
  es: "es-MX",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
  hi: "hi-IN",
  pt: "pt-BR",
};

export const langName = (code: string) => LANG_NAMES[code] ?? code;
export const speechLocale = (code: string) => SPEECH_LOCALES[code] ?? code;
