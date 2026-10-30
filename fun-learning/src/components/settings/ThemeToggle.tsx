"use client";

/**
 * Theme toggle — System / Light / Dark.
 *
 * The theme infrastructure already exists: a pre-paint bootstrap in
 * app/layout.tsx reads `localStorage.theme` and sets `<html data-theme>`, and
 * tokens.css styles `[data-theme="light"|"dark"]` plus the OS fallback. This is
 * just the visible control the Settings copy used to say was "a follow-up".
 *
 *   - "system" → remove the override, follow prefers-color-scheme (default).
 *   - "light" / "dark" → pin it, persisted in localStorage so it survives
 *     reloads and is applied before first paint next time.
 *
 * Writes `document.documentElement.dataset.theme` synchronously so the switch
 * is instant, with no flash.
 */

import { useEffect, useState } from "react";
import { fx } from "@/lib/feedback";
import { SegmentedToggle } from "@/components/SegmentedToggle";
import { useT } from "@/lib/i18n/client";

type Theme = "system" | "light" | "dark";

function readTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const t = window.localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function applyTheme(next: Theme): void {
  try {
    if (next === "system") {
      delete document.documentElement.dataset.theme;
      window.localStorage.removeItem("theme");
    } else {
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("theme", next);
    }
  } catch {
    /* private mode / quota — the in-memory dataset change still applies */
  }
}

export function ThemeToggle() {
  const t = useT();
  // Start from "system" so SSR and the first client render agree (the real
  // value is read in an effect to avoid a hydration mismatch); the pre-paint
  // bootstrap has already applied the correct theme to <html> regardless.
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    setTheme(readTheme());
  }, []);

  return (
    <SegmentedToggle<Theme>
      value={theme}
      onChange={(next) => {
        fx.tap();
        setTheme(next);
        applyTheme(next);
      }}
      ariaLabel={t("settings.themeAria")}
      options={[
        { value: "system", label: t("settings.themeSystem") },
        { value: "light", label: t("settings.themeLight") },
        { value: "dark", label: t("settings.themeDark") },
      ]}
    />
  );
}
