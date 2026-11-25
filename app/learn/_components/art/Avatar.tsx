"use client";

import * as React from "react";
import { avatarLook } from "@/lib/path/art";

// A small illustrated face for a dialogue speaker. Decorative: the name is printed next to it.
export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const look = avatarLook(name);
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden focusable="false" className="shrink-0">
      <defs>
        <clipPath id={`clip-${id}`}>
          <circle cx={32} cy={32} r={32} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${id})`}>
        <rect width={64} height={64} fill={look.backdrop} />
        {look.style === "long" && <path d="M17 30 Q17 12 32 12 Q47 12 47 30 V50 H17Z" fill={look.hair} />}
        <path d="M8 66 Q32 38 56 66Z" fill="#FFFFFF" opacity={0.92} />
        <rect x={27} y={38} width={10} height={9} rx={3} fill={look.skin} />
        <circle cx={32} cy={30} r={13} fill={look.skin} />
        {look.style === "short" && <path d="M19 29 Q18 14 32 14 Q46 14 45 29 Q41 21 32 21 Q23 21 19 29Z" fill={look.hair} />}
        {look.style === "long" && <path d="M19 29 Q19 15 32 15 Q45 15 45 29 Q38 20 32 20 Q25 20 19 29Z" fill={look.hair} />}
        {look.style === "bun" && (
          <>
            <circle cx={32} cy={13} r={6} fill={look.hair} />
            <path d="M19 29 Q18 15 32 15 Q46 15 45 29 Q41 21 32 21 Q23 21 19 29Z" fill={look.hair} />
          </>
        )}
        {look.style === "curly" &&
          [
            [21, 24],
            [26, 18],
            [32, 16],
            [38, 18],
            [43, 24],
          ].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r={6} fill={look.hair} />)}
        <circle cx={27} cy={31} r={1.7} fill="#2B1B17" />
        <circle cx={37} cy={31} r={1.7} fill="#2B1B17" />
        <path d="M27 36 Q32 40 37 36" stroke="#2B1B17" strokeWidth={1.7} strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
