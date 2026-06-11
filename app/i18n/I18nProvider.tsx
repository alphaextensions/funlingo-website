"use client";

import * as React from "react";
import { en, type Dictionary } from "./dictionaries/en";
import { DEFAULT_LOCALE, getLocaleMeta, type Dir } from "./config";

interface I18nValue {
  locale: string;
  dir: Dir;
  dict: Dictionary;
}

// Default context = English, so components used at the root ("/") work without
// a provider and render identically to before i18n was added.
const I18nContext = React.createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  dir: "ltr",
  dict: en as Dictionary,
});

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: string;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = React.useMemo<I18nValue>(
    () => ({ locale, dir: getLocaleMeta(locale).dir, dict }),
    [locale, dict]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return React.useContext(I18nContext);
}

/**
 * Translation hook. Returns `t(path)` for dot-paths into the dictionary
 * (e.g. t("hero.ctaPrimary")), plus the active locale and text direction.
 * Falls back to the English string, then the key itself, if not found.
 */
export function useT() {
  const { dict, locale, dir } = useI18n();
  const t = React.useCallback(
    (path: string): string => {
      const lookup = (obj: unknown): string | undefined => {
        let cur: unknown = obj;
        for (const part of path.split(".")) {
          if (cur && typeof cur === "object" && part in (cur as object)) {
            cur = (cur as Record<string, unknown>)[part];
          } else {
            return undefined;
          }
        }
        return typeof cur === "string" ? cur : undefined;
      };
      return lookup(dict) ?? lookup(en) ?? path;
    },
    [dict]
  );
  return { t, locale, dir };
}
