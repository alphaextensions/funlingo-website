"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import {
  ALL_LOCALES,
  LOCALE_CODES,
  localizedHref,
  DEFAULT_LOCALE,
} from "./config";
import { useI18n } from "./I18nProvider";

/**
 * Locale dropdown. Strips any current locale prefix from the path and
 * re-applies the chosen locale, so the user stays on the same page in their
 * new language. English (default) maps back to the un-prefixed root URLs.
 */
export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { locale } = useI18n();

  const basePath = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length && LOCALE_CODES.includes(segments[0])) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }
    return pathname;
  }, [pathname]);

  // Only the home page is localized for now. For non-English locales we route
  // to the locale home to avoid 404s on pages that aren't translated yet;
  // English (default) pages all exist, so we preserve the current path there.
  const targetHref = (code: string) =>
    code === DEFAULT_LOCALE ? basePath : localizedHref("/", code);

  return (
    <label
      className={`relative inline-flex items-center gap-1.5 ${className}`}
      aria-label="Select language"
    >
      <Globe className="w-4 h-4 text-textbody pointer-events-none" />
      <select
        value={locale}
        onChange={(e) => router.push(targetHref(e.target.value))}
        className="appearance-none bg-transparent text-textbody hover:text-textwhite text-sm font-medium pr-4 py-1 cursor-pointer focus:outline-none transition-colors"
      >
        {ALL_LOCALES.map((l) => (
          <option key={l.code} value={l.code} className="bg-[#0a0a0a] text-white">
            {l.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
