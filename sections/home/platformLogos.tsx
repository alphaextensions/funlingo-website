import * as React from "react";

const svgProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  style: { display: "block", borderRadius: 9, flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,.18)" } as React.CSSProperties,
};

function Tile({ bg, children }: { bg: string; children?: React.ReactNode }) {
  return (
    <svg {...svgProps}>
      <rect x={0} y={0} width={32} height={32} rx={9} fill={bg} />
      {children}
    </svg>
  );
}

function Letters({ tx, fill, size = 15 }: { tx: string; fill: string; size?: number }) {
  return (
    <text
      x={16}
      y={17}
      fill={fill}
      fontFamily="'Poppins',sans-serif"
      fontWeight={800}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {tx}
    </text>
  );
}

export const PLATFORMS = [
  "Netflix",
  "YouTube",
  "Prime Video",
  "Disney+ Hotstar",
  "Apple TV",
  "Crunchyroll",
  "Udemy",
  "Coursera",
];

export function PlatformLogo({ name }: { name: string }) {
  switch (name) {
    case "Netflix":
      return (
        <Tile bg="#0A0A0A">
          <rect x={9} y={7} width={4} height={18} fill="#E50914" />
          <rect x={19} y={7} width={4} height={18} fill="#E50914" />
          <polygon points="9,7 13,7 23,25 19,25" fill="#E50914" />
        </Tile>
      );
    case "YouTube":
      return (
        <Tile bg="#FFFFFF">
          <rect x={5} y={9} width={22} height={14} rx={4.5} fill="#FF0000" />
          <polygon points="14,12.5 14,19.5 20.5,16" fill="#fff" />
        </Tile>
      );
    case "Prime Video":
      return (
        <Tile bg="#1399FF">
          <polygon points="12.5,10.5 12.5,18.5 19.5,14.5" fill="#fff" />
          <path d="M7.5 22 Q16 27 24.5 22" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" />
        </Tile>
      );
    case "Disney+ Hotstar":
      return (
        <Tile bg="#0C1B5D">
          <Letters tx="D+" fill="#fff" size={13} />
        </Tile>
      );
    case "Apple TV":
      return (
        <Tile bg="#1C1C1E">
          <g transform="translate(5,5)" fill="#fff">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </g>
        </Tile>
      );
    case "Crunchyroll":
      return (
        <Tile bg="#FFFFFF">
          <circle cx={16} cy={16} r={9} stroke="#F47521" strokeWidth={3} fill="none" />
          <circle cx={10} cy={21} r={3.2} fill="#F47521" />
        </Tile>
      );
    case "Udemy":
      return (
        <Tile bg="#A435F0">
          <Letters tx="U" fill="#fff" size={16} />
        </Tile>
      );
    case "Coursera":
      return (
        <Tile bg="#0056D2">
          <Letters tx="C" fill="#fff" size={16} />
        </Tile>
      );
    default:
      return <Tile bg="#888" />;
  }
}
