import {
  Poppins,
  Noto_Sans_Devanagari,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_Arabic,
  Noto_Sans_Thai,
} from "next/font/google";

// Scripted stack — Poppins first, with per-script fallbacks exposed through
// --font-ui. The authoritative scripted stack lives in src/styles/tokens.css
// (--font), which lists --font-ui first and falls back to the script fonts.

export const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-devanagari",
});

export const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-jp",
});

export const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-kr",
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-arabic",
});

export const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-thai",
});

export const fontClasses = [
  poppins.variable,
  notoDevanagari.variable,
  notoJP.variable,
  notoKR.variable,
  notoArabic.variable,
  notoThai.variable,
].join(" ");

// --font-ui wiring: tokens.css uses var(--font-ui, 'Poppins'). We set it to the
// Poppins font variable so tokens pick the next/font optimized family.
export const fontRootStyle: Record<string, string> = {
  "--font-ui": poppins.style.fontFamily,
};
