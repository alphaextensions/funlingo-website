"use client";

import * as React from "react";
import { type ArtTheme, isArtTheme } from "@/lib/path/art";

// Flat illustrations for episode themes, drawn on a 320×180 (16:9) tile in the brand
// palette. They are decorative: the episode title next to them carries the meaning.

const WHITE = "#FFFFFF";
const CREAM = "#FFF4EA";
const DEEP = "#3B0A4F";
const PINK = "#FF8FCB";
const PEACH = "#FFB86B";
const PLUM = "#7A1773";
const MAGENTA = "#E0319E";

const BACKDROPS: Record<ArtTheme | "default", [string, string]> = {
  greetings: ["#BC22D6", "#E0319E"],
  food: ["#9A1C8E", "#E0319E"],
  directions: ["#7C3AED", "#E0319E"],
  shopping: ["#E0319E", "#FB923C"],
  family: ["#BC22D6", "#7C3AED"],
  work: ["#7C3AED", "#BC22D6"],
  time: ["#9A1C8E", "#7C3AED"],
  health: ["#E0319E", "#BC22D6"],
  default: ["#BC22D6", "#E0319E"],
};

const sparkle = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r}Z`;

const heart = (cx: number, cy: number, s: number) =>
  `M${cx} ${cy + s * 0.9} C${cx - s * 1.2} ${cy + s * 0.1} ${cx - s * 0.9} ${cy - s * 0.9} ${cx} ${cy - s * 0.3} C${cx + s * 0.9} ${cy - s * 0.9} ${cx + s * 1.2} ${cy + s * 0.1} ${cx} ${cy + s * 0.9}Z`;

const label = { fontFamily: "Poppins, sans-serif", fontWeight: 800 } as const;

function Greetings() {
  return (
    <>
      <rect x={56} y={46} width={118} height={56} rx={22} fill={WHITE} />
      <path d="M84 100 L76 122 L106 100Z" fill={WHITE} />
      <text x={115} y={83} textAnchor="middle" fontSize={24} fill={DEEP} style={label}>
        ¡Hola!
      </text>
      <rect x={150} y={96} width={112} height={50} rx={20} fill={PEACH} />
      <path d="M236 144 L248 162 L220 144Z" fill={PEACH} />
      <text x={206} y={128} textAnchor="middle" fontSize={22} fill={DEEP} style={label}>
        Hi!
      </text>
      <path d={sparkle(270, 52, 10)} fill={WHITE} opacity={0.9} />
      <path d={sparkle(40, 142, 8)} fill={WHITE} opacity={0.8} />
    </>
  );
}

function Food() {
  return (
    <>
      <ellipse cx={160} cy={142} rx={80} ry={12} fill={CREAM} opacity={0.9} />
      <path d="M212 88 Q242 88 242 106 Q242 124 212 122" stroke={WHITE} strokeWidth={9} fill="none" />
      <path d="M108 78 H212 V112 Q212 140 182 140 H138 Q108 140 108 112Z" fill={WHITE} />
      <ellipse cx={160} cy={78} rx={52} ry={9} fill="#6B3A2A" />
      <path d={heart(160, 78, 7)} fill={CREAM} />
      {[136, 160, 184].map((x) => (
        <path
          key={x}
          d={`M${x} 64 q-8 -11 0 -21 q8 -10 0 -21`}
          stroke={WHITE}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          opacity={0.8}
        />
      ))}
      <path d={sparkle(262, 46, 9)} fill={WHITE} opacity={0.85} />
    </>
  );
}

function Directions() {
  return (
    <>
      <path
        d="M30 150 C90 150 90 92 150 100 S232 140 262 82"
        stroke={WHITE}
        strokeWidth={5}
        strokeDasharray="2 12"
        strokeLinecap="round"
        fill="none"
        opacity={0.85}
      />
      <circle cx={30} cy={150} r={7} fill={CREAM} />
      <rect x={96} y={36} width={6} height={74} rx={3} fill={CREAM} />
      <path d="M102 40 H152 L164 51 L152 62 H102Z" fill={WHITE} />
      <text x={130} y={56} textAnchor="middle" fontSize={12} fill={DEEP} style={label}>
        metro
      </text>
      <path d="M96 68 H50 L38 79 L50 90 H96Z" fill={PEACH} />
      <text x={68} y={84} textAnchor="middle" fontSize={12} fill={DEEP} style={label}>
        café
      </text>
      <path d="M262 92 C246 74 238 64 238 52 A24 24 0 1 1 286 52 C286 64 278 74 262 92Z" fill={CREAM} />
      <circle cx={262} cy={52} r={9} fill={MAGENTA} />
    </>
  );
}

function Shopping() {
  return (
    <>
      <path d="M144 72 V60 Q144 40 168 40 Q192 40 192 60 V72" stroke={WHITE} strokeWidth={7} fill="none" />
      <rect x={120} y={70} width={96} height={86} rx={10} fill={WHITE} />
      <path d={heart(168, 112, 12)} fill={MAGENTA} />
      <path d="M58 88 L82 74 Q92 84 102 74 L126 88 L117 106 L108 101 V146 H76 V101 L67 106Z" fill={PLUM} />
      <g transform="rotate(14 244 110)">
        <rect x={222} y={94} width={48} height={30} rx={6} fill={CREAM} />
        <circle cx={231} cy={109} r={3.5} fill={DEEP} />
        <text x={253} y={114} textAnchor="middle" fontSize={13} fill={DEEP} style={label}>
          $50
        </text>
      </g>
      <path d={sparkle(54, 46, 8)} fill={WHITE} opacity={0.85} />
    </>
  );
}

function Family() {
  return (
    <>
      {/* Ground runs past the tile so wide banners have it edge to edge. */}
      <rect x={-600} y={154} width={1520} height={26} fill={WHITE} opacity={0.12} />
      <path d="M140 84 L205 34 L270 84Z" fill={PEACH} />
      <rect x={150} y={80} width={110} height={76} fill={CREAM} />
      <rect x={196} y={112} width={22} height={44} rx={3} fill="#9A1C8E" />
      <rect x={164} y={94} width={22} height={20} rx={3} fill="#BC22D6" opacity={0.55} />
      <rect x={230} y={94} width={20} height={20} rx={3} fill="#BC22D6" opacity={0.55} />
      <rect x={52} y={98} width={28} height={56} rx={12} fill={WHITE} />
      <circle cx={66} cy={84} r={12} fill="#F1C7A5" />
      <rect x={90} y={96} width={30} height={58} rx={13} fill={PINK} />
      <circle cx={105} cy={81} r={13} fill="#B97B54" />
      <rect x={76} y={126} width={20} height={28} rx={9} fill={PEACH} />
      <circle cx={86} cy={115} r={9} fill="#E0AC84" />
    </>
  );
}

function Work() {
  return (
    <>
      <rect x={96} y={50} width={128} height={82} rx={8} fill={DEEP} />
      <rect x={104} y={58} width={112} height={66} rx={4} fill="#2A0A3A" />
      <rect x={114} y={70} width={60} height={7} rx={3.5} fill={PINK} />
      <rect x={114} y={85} width={88} height={7} rx={3.5} fill={WHITE} opacity={0.7} />
      <rect x={114} y={100} width={70} height={7} rx={3.5} fill={WHITE} opacity={0.5} />
      <path d="M82 132 H238 L226 146 H94Z" fill={CREAM} />
      <path d="M236 64 V80 Q258 92 280 80 V64Z" fill={DEEP} opacity={0.9} />
      <path d="M258 40 L296 56 L258 72 L220 56Z" fill={DEEP} />
      <path d="M296 56 V80" stroke={PEACH} strokeWidth={3} />
      <circle cx={296} cy={83} r={4.5} fill={PEACH} />
      <path d={sparkle(52, 52, 9)} fill={WHITE} opacity={0.85} />
    </>
  );
}

function Time() {
  // Half past three, as in the episode's first scene.
  const hour = (105 * Math.PI) / 180;
  return (
    <>
      <circle cx={116} cy={92} r={54} fill={CREAM} />
      <circle cx={116} cy={92} r={54} stroke={WHITE} strokeWidth={6} fill="none" />
      {[0, 90, 180, 270].map((deg) => (
        <rect key={deg} x={114} y={44} width={4} height={10} rx={2} fill={DEEP} transform={`rotate(${deg} 116 92)`} />
      ))}
      <line
        x1={116}
        y1={92}
        x2={116 + 28 * Math.sin(hour)}
        y2={92 - 28 * Math.cos(hour)}
        stroke={DEEP}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line x1={116} y1={92} x2={116} y2={130} stroke={DEEP} strokeWidth={4} strokeLinecap="round" />
      <circle cx={116} cy={92} r={5} fill={MAGENTA} />
      <rect x={196} y={52} width={86} height={90} rx={10} fill={WHITE} />
      <path d="M196 62 A10 10 0 0 1 206 52 H272 A10 10 0 0 1 282 62 V78 H196Z" fill={MAGENTA} />
      <rect x={214} y={44} width={6} height={16} rx={3} fill={DEEP} />
      <rect x={258} y={44} width={6} height={16} rx={3} fill={DEEP} />
      <text x={239} y={72} textAnchor="middle" fontSize={13} fill={WHITE} style={label}>
        SÁB
      </text>
      <text x={239} y={122} textAnchor="middle" fontSize={34} fill={DEEP} style={label}>
        14
      </text>
    </>
  );
}

function Health() {
  return (
    <>
      <circle cx={112} cy={90} r={52} fill={WHITE} />
      <rect x={98} y={62} width={28} height={56} rx={6} fill={MAGENTA} />
      <rect x={84} y={76} width={56} height={28} rx={6} fill={MAGENTA} />
      <g transform="rotate(-30 222 92)">
        <rect x={186} y={78} width={72} height={28} rx={14} fill={CREAM} />
        <path d="M222 78 H244 A14 14 0 0 1 244 106 H222Z" fill={PEACH} />
      </g>
      <path d={heart(252, 144, 12)} fill={WHITE} opacity={0.9} />
      <path d={sparkle(270, 40, 9)} fill={WHITE} opacity={0.85} />
    </>
  );
}

function Fallback() {
  return (
    <>
      <circle cx={160} cy={90} r={46} fill={WHITE} opacity={0.95} />
      <path d="M148 68 L180 90 L148 112Z" fill={MAGENTA} />
    </>
  );
}

const SCENES: Record<ArtTheme, () => React.JSX.Element> = {
  greetings: Greetings,
  food: Food,
  directions: Directions,
  shopping: Shopping,
  family: Family,
  work: Work,
  time: Time,
  health: Health,
};

/**
 * `aspect` is the box's width ÷ height. Wider boxes get a wider backdrop with the drawing
 * kept centred, so banners and full-width rows don't crop the scene.
 */
export function ThemeArt({
  theme,
  className,
  rounded = 20,
  aspect = 16 / 9,
}: {
  theme: string;
  className?: string;
  rounded?: number;
  aspect?: number;
}) {
  const id = React.useId().replace(/:/g, "");
  const width = Math.max(320, Math.round(180 * aspect));
  const shift = (width - 320) / 2;
  const known = isArtTheme(theme);
  const [from, to] = BACKDROPS[known ? theme : "default"];
  const Scene = known ? SCENES[theme] : Fallback;
  return (
    <svg
      viewBox={`0 0 ${width} 180`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ borderRadius: rounded, display: "block" }}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width={width} height={180} fill={`url(#bg-${id})`} />
      <circle cx={width - 34} cy={18} r={62} fill={WHITE} opacity={0.08} />
      <circle cx={24} cy={176} r={52} fill={WHITE} opacity={0.08} />
      <g transform={`translate(${shift} 0)`}>
        <Scene />
      </g>
    </svg>
  );
}
