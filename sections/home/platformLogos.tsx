import * as React from "react";

// Real platform logos, rendered inside a per-brand tile (matching the design's
// platform wall). Assets live in /public/platforms. Wordmark logos (Prime Video,
// Apple TV) get a wider tile; light logos (Disney+ Hotstar) sit on a dark tile.
type LogoCfg = { src: string; bg: string; pad: number; wide?: boolean };

const LOGOS: Record<string, LogoCfg> = {
  Netflix: { src: "/platforms/netflix.png", bg: "#141414", pad: 7 },
  YouTube: { src: "/platforms/youtube.png", bg: "#ffffff", pad: 5 },
  "Prime Video": { src: "/platforms/primevideo.svg", bg: "#ffffff", pad: 7, wide: true },
  "Disney+ Hotstar": { src: "/platforms/disneyhotstar.png", bg: "#0C1B4A", pad: 5 },
  "Apple TV": { src: "/platforms/appletv.svg", bg: "#ffffff", pad: 7, wide: true },
  Crunchyroll: { src: "/platforms/crunchyroll.png", bg: "#ffffff", pad: 5 },
  Udemy: { src: "/platforms/udemy.png", bg: "#ffffff", pad: 6 },
  Coursera: { src: "/platforms/coursera.png", bg: "#ffffff", pad: 5 },
};

export const PLATFORMS = Object.keys(LOGOS);

const TILE = 34;

export function PlatformLogo({ name }: { name: string }) {
  const cfg = LOGOS[name];
  if (!cfg) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: TILE,
        width: cfg.wide ? "auto" : TILE,
        minWidth: cfg.wide ? TILE : undefined,
        padding: cfg.pad,
        borderRadius: 9,
        background: cfg.bg,
        boxShadow: "0 1px 3px rgba(0,0,0,.18)",
        flexShrink: 0,
      }}
    >
      <img
        src={cfg.src}
        alt={`${name} logo`}
        loading="lazy"
        style={{
          height: "100%",
          width: cfg.wide ? "auto" : "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </span>
  );
}
