"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ALL_LOCALES,
  LOCALE_CODES,
  localizedHref,
  DEFAULT_LOCALE,
} from "./config";
import { useI18n } from "./I18nProvider";
import { useT } from "./I18nProvider";
import { track } from "@/app/_components/track";

/**
 * Themed language dropdown matching the 2026 design: a pill button showing the
 * current locale's short code, opening a panel of native names with a check on
 * the active one. Routing mirrors LanguageSwitcher — English maps back to the
 * un-prefixed path; other locales route to their localized home.
 */
export default function LanguageMenu() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { locale } = useI18n();
  const { t } = useT();
  const [open, setOpen] = React.useState(false);

  const basePath = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length && LOCALE_CODES.includes(segments[0])) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }
    return pathname;
  }, [pathname]);

  const targetHref = (code: string) =>
    code === DEFAULT_LOCALE ? basePath : localizedHref("/", code);

  const curShort = (locale.split("-")[0] || "en").toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose language"
        aria-expanded={open}
        className="flex items-center gap-[7px] h-[42px] px-[13px] rounded-full border cursor-pointer text-[13px] font-extrabold"
        style={{
          borderColor: "var(--border)",
          background: "var(--chip)",
          color: "var(--text)",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        <span>{curShort}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          style={{ opacity: 0.6 }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120]"
          />
          <div
            className="absolute top-[52px] right-0 z-[130] w-[268px] max-h-[62vh] overflow-y-auto rounded-[18px] p-[10px]"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 60px -18px rgba(80,10,80,.6)",
            }}
          >
            <div
              className="text-[12px] font-extrabold tracking-[0.04em] uppercase px-3 pt-2 pb-[10px]"
              style={{ color: "var(--text-dim2)" }}
            >
              {t("switcher.choose")}
            </div>
            {ALL_LOCALES.map((l) => {
              const current = l.code === locale;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setOpen(false);
                    track("locale_change", { locale: l.code });
                    router.push(targetHref(l.code));
                  }}
                  className="w-full flex items-center gap-[10px] justify-between px-3 py-[11px] rounded-[11px] border-0 cursor-pointer text-start text-[15px]"
                  style={{
                    background: current ? "var(--pink-soft)" : "transparent",
                    color: "var(--text)",
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: current ? 800 : 600,
                  }}
                >
                  <span>{l.nativeName}</span>
                  {current && (
                    <span style={{ color: "var(--pink)", display: "flex" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
