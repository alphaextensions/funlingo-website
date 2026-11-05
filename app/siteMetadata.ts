import type { Metadata } from "next";

// Site-wide metadata defaults, shared by both root layouts: app/(en)/layout.tsx
// (English, un-prefixed) and app/[locale]/layout.tsx (/fr, /nl/netflix …).
export const siteMetadata: Metadata = {
  metadataBase: new URL("https://getfunlingo.com"),
  title: {
    default: "Funlingo - Free Dual Subtitles for Language Learning",
    template: "%s | Funlingo",
  },
  description: "Free dual subtitle Chrome extension for Netflix, YouTube, Prime, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy & Coursera. AI-powered bilingual subtitles, vocabulary building, and instant translations.",
  // Pages that set their own openGraph or twitter replace these blocks
  // entirely (Next doesn't merge them), so each of those repeats the image.
  openGraph: {
    siteName: "Funlingo",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
    creator: "Funlingo",
  },
};
