import type { Metadata } from "next";
import ChromeExtensionContent from "./content";
import { en } from "@/app/i18n/pages/chromeExtension";
import { chromeExtensionFaqSchema } from "@/app/i18n/pages/chromeExtension/schema";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/chrome-extension",
  locale: "en",
  ...en.meta,
  keywords:
    "funlingo chrome extension, ai translator extension, dual subtitles chrome extension, dual subtitles netflix, dual subtitles youtube, ai translation extension, free language learning extension, bilingual subtitles, learn languages watching videos",
});

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Funlingo",
  "headline": "Free Chrome Extension for Dual Subtitles & AI Translation",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Chrome",
  "url": "https://getfunlingo.com/chrome-extension",
  "description":
    "Funlingo is a free Chrome extension that adds dual subtitles and AI-powered translation to Netflix, YouTube, Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Tubi, bilibili, Udemy, and Coursera in 100+ languages.",
  "featureList":
    "Dual subtitles, AI translation, AI word definitions, Vocabulary builder, 100+ languages, 10 streaming and learning platforms, 100% free",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free, no paywall",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "12",
    "bestRating": "5",
    "worstRating": "1",
  },
};

export default function ChromeExtensionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chromeExtensionFaqSchema(en)) }}
      />
      <ChromeExtensionContent s={en} />
    </>
  );
}
