"use client";

import * as React from "react";

type Theme = "dark" | "light";

/**
 * Sun/moon theme toggle. Reads/writes `data-theme` on <html> and persists the
 * choice to localStorage('funlingo-theme'). The initial paint theme is applied
 * by the inline script in the root layout, so this only syncs React state and
 * handles clicks. CSS variables (--bg, --text, …) do the actual theming.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("funlingo-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`w-[42px] h-[42px] rounded-full border flex items-center justify-center cursor-pointer shrink-0 ${className}`}
      style={{ borderColor: "var(--border)", background: "var(--chip)", color: "var(--text)" }}
    >
      {/* Render nothing meaningful until mounted to avoid a hydration flash,
          but keep the button box so layout doesn't shift. */}
      {mounted && isDark && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
          </g>
        </svg>
      )}
      {mounted && !isDark && (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M20 14.5A8 8 0 119.5 4 6.5 6.5 0 0020 14.5z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
