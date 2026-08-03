import * as React from "react";

/** Minimal flag glyphs used by the hero language picker and the guess game. */
export function FlagSvg({ code, w = 26, h = 19 }: { code: string; w?: number; h?: number }) {
  const wrap = (kids: React.ReactNode) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 26 19"
      style={{ borderRadius: 3, boxShadow: "0 1px 2px rgba(0,0,0,.25)", display: "block" }}
    >
      {kids}
    </svg>
  );
  switch (code) {
    case "fr":
      return wrap([
        <rect key="1" x={0} y={0} width={9} height={19} fill="#002654" />,
        <rect key="2" x={9} y={0} width={8} height={19} fill="#fff" />,
        <rect key="3" x={17} y={0} width={9} height={19} fill="#CE1126" />,
      ]);
    case "it":
      return wrap([
        <rect key="1" x={0} y={0} width={9} height={19} fill="#009246" />,
        <rect key="2" x={9} y={0} width={8} height={19} fill="#fff" />,
        <rect key="3" x={17} y={0} width={9} height={19} fill="#CE2B37" />,
      ]);
    case "es":
      return wrap([
        <rect key="1" x={0} y={0} width={26} height={5} fill="#AA151B" />,
        <rect key="2" x={0} y={5} width={26} height={9} fill="#F1BF00" />,
        <rect key="3" x={0} y={14} width={26} height={5} fill="#AA151B" />,
      ]);
    case "de":
      return wrap([
        <rect key="1" x={0} y={0} width={26} height={6.3} fill="#000" />,
        <rect key="2" x={0} y={6.3} width={26} height={6.4} fill="#DD0000" />,
        <rect key="3" x={0} y={12.7} width={26} height={6.3} fill="#FFCE00" />,
      ]);
    case "ja":
      return wrap([
        <rect key="1" x={0} y={0} width={26} height={19} fill="#fff" />,
        <circle key="2" cx={13} cy={9.5} r={5} fill="#BC002D" />,
      ]);
    case "ko":
      return wrap([
        <rect key="1" x={0} y={0} width={26} height={19} fill="#fff" />,
        <circle key="2" cx={13} cy={9.5} r={4.2} fill="#0047A0" />,
        <path
          key="3"
          d="M13 5.3a2.1 2.1 0 010 4.2 2.1 2.1 0 000 4.2 4.2 4.2 0 000-8.4z"
          fill="#CD2E3A"
        />,
      ]);
    case "en":
      return wrap([
        <rect key="0" x={0} y={0} width={26} height={19} fill="#012169" />,
        <path key="1" d="M0 0L26 19M26 0L0 19" stroke="#fff" strokeWidth={3.4} />,
        <path key="2" d="M0 0L26 19M26 0L0 19" stroke="#C8102E" strokeWidth={1.5} />,
        <rect key="3" x={10.3} y={0} width={5.4} height={19} fill="#fff" />,
        <rect key="4" x={0} y={6.8} width={26} height={5.4} fill="#fff" />,
        <rect key="5" x={11.4} y={0} width={3.2} height={19} fill="#C8102E" />,
        <rect key="6" x={0} y={7.9} width={26} height={3.2} fill="#C8102E" />,
      ]);
    default:
      return wrap(null);
  }
}
