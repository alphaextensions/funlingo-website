// i18n configuration — single source of truth for supported locales.
//
// The site is a static export (no middleware), so every locale page is
// pre-generated via generateStaticParams. English ("en") is served at the
// root ("/", "/blog/…") and is NOT prefixed, to preserve the live site's
// existing URLs and SEO. All other locales live under "/[locale]/…".

export type Dir = "ltr" | "rtl";

export interface LocaleMeta {
  /** URL/code used in the path prefix and hreflang. */
  code: string;
  /** English name. */
  name: string;
  /** Endonym shown in the language switcher. */
  nativeName: string;
  /** BCP-47 hreflang value. */
  hreflang: string;
  dir: Dir;
}

export const DEFAULT_LOCALE = "en";

// English (United States) is the default, served at the root.
export const DEFAULT_LOCALE_META: LocaleMeta = {
  code: "en",
  name: "English (United States)",
  nativeName: "English (US)",
  hreflang: "en-US",
  dir: "ltr",
};

// Prefixed locales (everything except the root English).
export const LOCALES: LocaleMeta[] = [
  { code: "ar", name: "Arabic", nativeName: "العربية", hreflang: "ar", dir: "rtl" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", hreflang: "bg", dir: "ltr" },
  { code: "ca", name: "Catalan", nativeName: "Català", hreflang: "ca", dir: "ltr" },
  { code: "zh-CN", name: "Chinese (China)", nativeName: "简体中文", hreflang: "zh-CN", dir: "ltr" },
  { code: "zh-TW", name: "Chinese (Taiwan)", nativeName: "繁體中文", hreflang: "zh-TW", dir: "ltr" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", hreflang: "hr", dir: "ltr" },
  { code: "cs", name: "Czech", nativeName: "Čeština", hreflang: "cs", dir: "ltr" },
  { code: "da", name: "Danish", nativeName: "Dansk", hreflang: "da", dir: "ltr" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", hreflang: "nl", dir: "ltr" },
  { code: "en-GB", name: "English (United Kingdom)", nativeName: "English (UK)", hreflang: "en-GB", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", hreflang: "fr", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", hreflang: "de", dir: "ltr" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", hreflang: "el", dir: "ltr" },
  { code: "he", name: "Hebrew", nativeName: "עברית", hreflang: "he", dir: "rtl" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", hreflang: "hi", dir: "ltr" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", hreflang: "hu", dir: "ltr" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", hreflang: "id", dir: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", hreflang: "it", dir: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", hreflang: "ja", dir: "ltr" },
  { code: "ko", name: "Korean", nativeName: "한국어", hreflang: "ko", dir: "ltr" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", hreflang: "no", dir: "ltr" },
  { code: "fa", name: "Persian", nativeName: "فارسی", hreflang: "fa", dir: "rtl" },
  { code: "pl", name: "Polish", nativeName: "Polski", hreflang: "pl", dir: "ltr" },
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", hreflang: "pt-BR", dir: "ltr" },
  { code: "pt-PT", name: "Portuguese (Portugal)", nativeName: "Português (Portugal)", hreflang: "pt-PT", dir: "ltr" },
  { code: "ro", name: "Romanian", nativeName: "Română", hreflang: "ro", dir: "ltr" },
  { code: "ru", name: "Russian", nativeName: "Русский", hreflang: "ru", dir: "ltr" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", hreflang: "sk", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", hreflang: "es", dir: "ltr" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", hreflang: "sv", dir: "ltr" },
  { code: "th", name: "Thai", nativeName: "ไทย", hreflang: "th", dir: "ltr" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", hreflang: "tr", dir: "ltr" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", hreflang: "uk", dir: "ltr" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", hreflang: "vi", dir: "ltr" },
];

/** All locales including the root default. */
export const ALL_LOCALES: LocaleMeta[] = [DEFAULT_LOCALE_META, ...LOCALES];

export const LOCALE_CODES: string[] = LOCALES.map((l) => l.code);

export function getLocaleMeta(code: string): LocaleMeta {
  return (
    ALL_LOCALES.find((l) => l.code === code) ?? DEFAULT_LOCALE_META
  );
}

export function isRtl(code: string): boolean {
  return getLocaleMeta(code).dir === "rtl";
}

/** Build a localized href. English (default) is un-prefixed. */
export function localizedHref(path: string, locale: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/**
 * Map of hreflang -> URL for a given path, including x-default (English).
 * Used for `alternates.languages` in page metadata. Values are relative and
 * resolved against `metadataBase` by Next.js.
 */
export function alternateLanguages(path = "/"): Record<string, string> {
  const langs: Record<string, string> = {};
  langs["x-default"] = localizedHref(path, DEFAULT_LOCALE);
  langs[DEFAULT_LOCALE_META.hreflang] = localizedHref(path, DEFAULT_LOCALE);
  for (const l of LOCALES) {
    langs[l.hreflang] = localizedHref(path, l.code);
  }
  return langs;
}
