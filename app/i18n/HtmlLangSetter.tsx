"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LOCALE_CODES, getLocaleMeta, DEFAULT_LOCALE } from "./config";
import PAGE_LANG from "./page-lang.json";

/**
 * Static export renders a single root <html lang="en">. This keeps the
 * document's lang and dir in sync with the active locale on the client by
 * reading the URL prefix — important for RTL locales (ar/he/fa). Blog posts
 * written in another language take theirs from page-lang.json.
 */
export default function HtmlLangSetter() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    const pageLang = (PAGE_LANG as Record<string, string>)[pathname.replace(/\/$/, "")];
    if (pageLang) {
      document.documentElement.lang = pageLang;
      document.documentElement.dir = "ltr";
      return;
    }
    const seg = pathname.split("/").filter(Boolean)[0];
    const locale = seg && LOCALE_CODES.includes(seg) ? seg : DEFAULT_LOCALE;
    const meta = getLocaleMeta(locale);
    document.documentElement.lang = meta.hreflang;
    document.documentElement.dir = meta.dir;
  }, [pathname]);
  return null;
}
