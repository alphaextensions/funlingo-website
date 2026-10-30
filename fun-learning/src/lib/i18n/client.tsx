"use client";

/**
 * Client-side UI-text access — Wave 14.
 *
 * The root layout (a server component) resolves the viewer's chrome locale
 * and hands a SMALL, pre-resolved slice of the catalog to <I18nProvider>.
 * Client components read it via `useT()`. No catalog module is imported
 * here, so the 12 locale files never enter the client bundle — only the
 * viewer's own strings travel, inside the RSC payload.
 *
 * Outside a provider (unit tests, Storybook-style renders) `useT()` falls
 * back to returning the raw key, so nothing throws.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";

type Slice = Readonly<Record<string, string>>;
type Params = Record<string, string | number>;

interface I18nValue {
  /** Raw chrome locale (e.g. "mr") — may be outside the 12 catalog locales. */
  locale: string;
  /** The viewer's saved nativeLang, or null if they never set one. */
  nativeLang: string | null;
  slice: Slice;
}

const I18nContext = createContext<I18nValue>({ locale: "en", nativeLang: null, slice: {} });

export function I18nProvider({
  locale,
  nativeLang,
  slice,
  children,
}: {
  locale: string;
  nativeLang: string | null;
  slice: Slice;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, nativeLang, slice }), [locale, nativeLang, slice]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function interpolate(template: string, params?: Params): string {
  if (!params) return template;
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, name: string) => {
    const v = params[name];
    return v === undefined || v === null ? match : String(v);
  });
}

/** `const t = useT(); t("deck.navNext")` — bound to the viewer's native locale. */
export function useT(): (key: string, params?: Params) => string {
  const { slice } = useContext(I18nContext);
  return useMemo(
    () => (key: string, params?: Params) => interpolate(slice[key] ?? key, params),
    [slice],
  );
}

/** The raw chrome locale code (e.g. "hi"), for `lang` attributes on chrome text. */
export function useLocale(): string {
  return useContext(I18nContext).locale;
}

/**
 * The viewer's saved native language, or null when unset / signed out.
 * Use this (not `navigator.language`) wherever the server needs "translate
 * into the learner's language" — the browser locale is often English even
 * for a Hindi-native learner.
 */
export function useNativeLang(): string | null {
  return useContext(I18nContext).nativeLang;
}
