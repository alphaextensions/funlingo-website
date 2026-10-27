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
// Words a typed letter can match: the native name plus the English one, without
// accents, so "G" finds Deutsch (German) and "E" finds Español.
const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const SEARCH_WORDS = ALL_LOCALES.map((l) =>
  norm(`${l.nativeName} ${l.name}`).split(/[\s()]+/).filter(Boolean),
);

export default function LanguageMenu({ buttonClassName = "" }: { buttonClassName?: string }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { locale } = useI18n();
  const { t } = useT();
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // With the menu open: typing a letter jumps to the first language whose
  // native or English name starts with it, and the same letter again cycles
  // (H → Hindi → Hungarian). Arrows move, Enter picks (the focused button's
  // own click), Esc closes.
  React.useEffect(() => {
    if (!open) return;
    const items = () =>
      Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-lang]") ?? []);
    const go = (i: number) => {
      const b = items()[i];
      const list = listRef.current;
      if (!b || !list) return;
      b.focus({ preventScroll: true });
      list.scrollTop = b.offsetTop - list.clientHeight / 2 + b.offsetHeight / 2;
    };
    const current = ALL_LOCALES.findIndex((l) => l.code === locale);
    go(Math.max(0, current));

    let lastKey = "";
    let lastIdx = -1;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const all = items();
      const at = all.indexOf(document.activeElement as HTMLButtonElement);
      if (e.key === "ArrowDown") { e.preventDefault(); go(Math.min(all.length - 1, at + 1)); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); go(Math.max(0, at - 1)); return; }
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return; }
      if (e.key.length !== 1 || !/\S/.test(e.key)) return;
      const k = norm(e.key);
      const hits = SEARCH_WORDS.flatMap((words, i) => (words.some((w) => w.startsWith(k)) ? [i] : []));
      if (!hits.length) return;
      e.preventDefault();
      lastIdx = k === lastKey ? hits[(hits.indexOf(lastIdx) + 1) % hits.length] : hits[0];
      lastKey = k;
      go(lastIdx);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, locale]);

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
        ref={toggleRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose language"
        aria-expanded={open}
        className={`flex items-center gap-[7px] h-[42px] px-[13px] rounded-full border cursor-pointer text-[13px] font-extrabold ${buttonClassName}`}
        style={{
          borderColor: "var(--border)",
          background: "var(--chip)",
          color: "var(--text)",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {/* The standard translate symbol (文/A) */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
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
            ref={listRef}
            data-langmenu
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
                  data-lang={l.code}
                  onClick={() => {
                    setOpen(false);
                    track("locale_change", { locale: l.code });
                    router.push(targetHref(l.code));
                  }}
                  className="fnl-langitem w-full flex items-center gap-[10px] justify-between px-3 py-[11px] rounded-[11px] border-0 cursor-pointer text-start text-[15px]"
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
