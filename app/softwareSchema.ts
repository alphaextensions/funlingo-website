// SoftwareApplication structured data for the home page. The English home uses
// it as is; each translated home gets the same app facts with its own
// description, language and URL.
import { localizedHref } from "./i18n/config";

export const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Funlingo",
  "headline": "Free Dual Subtitle Extension for Language Learning",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Chrome, Edge, Brave",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free version available"
  },
  "description": "A free dual subtitle Chrome extension that helps users learn languages by watching videos on Netflix, YouTube, Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy, and Coursera with simultaneous bilingual subtitles. Supports 100+ languages with AI-powered translations.",
  "featureList": "Dual subtitles, AI dictionary, Netflix support, YouTube support, Prime Video support, Disney+ Hotstar support, Apple TV support, Crunchyroll support, Tubi support, bilibili support, Udemy support, Coursera support, Vocabulary builder, 100+ languages, Language learning tools",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "12",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export function localizedSchema(locale: string, description: string) {
  return {
    ...schemaData,
    description,
    inLanguage: locale,
    url: `https://getfunlingo.com${localizedHref("/", locale)}`,
  };
}
