"use client";

import * as React from "react";

// Chrome Web Store listing. Any anchor pointing here automatically fires the
// global `install_click` GA event (see app/analytics.tsx).
export const STORE_URL =
  "https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj";

/** The little multi-color Google "G" dot used on every install CTA. */
export function GoogleGlyph({ size = 17 }: { size?: number }) {
  const inset = Math.round(size * 0.29);
  const dot = Math.round(size * 0.38);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "conic-gradient(from -90deg,#EA4335 0deg 120deg,#FBBC05 120deg 240deg,#34A853 240deg 360deg)",
        position: "relative",
        display: "inline-block",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset,
          borderRadius: "50%",
          background: "#fff",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: dot,
          borderRadius: "50%",
          background: "#4285F4",
        }}
      />
    </span>
  );
}

type Variant = "gradient" | "white" | "navPill";

/** Gradient "Add to Chrome" install button with the Google glyph. */
export function ChromeCTA({
  label,
  variant = "gradient",
  glyphSize = 20,
  className = "",
  style = {},
}: {
  label: string;
  variant?: Variant;
  glyphSize?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 11,
    fontFamily: "'Poppins',sans-serif",
    whiteSpace: "nowrap",
  };
  const variants: Record<Variant, React.CSSProperties> = {
    gradient: {
      padding: "17px 30px",
      borderRadius: 16,
      background: "var(--grad)",
      color: "#fff",
      fontSize: 17,
      fontWeight: 800,
      boxShadow: "0 16px 34px -12px rgba(200,31,212,.75)",
    },
    white: {
      padding: "18px 34px",
      borderRadius: 16,
      background: "#fff",
      color: "#1B0F26",
      fontSize: 18,
      fontWeight: 800,
      boxShadow: "0 18px 40px -14px rgba(0,0,0,.4)",
    },
    navPill: {
      gap: 9,
      padding: "12px 20px",
      borderRadius: 999,
      background: "var(--grad)",
      color: "#fff",
      fontSize: 14,
      fontWeight: 700,
      boxShadow: "0 10px 24px -10px rgba(200,31,212,.7)",
    },
  };
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ ...base, ...variants[variant], ...style }}
    >
      <GoogleGlyph size={glyphSize} />
      {label}
    </a>
  );
}
