import type { Metadata } from "next";
import ChromeExtensionContent from "./content";

export const metadata: Metadata = {
  title: "Funlingo Chrome Extension — Free Dual Subtitles & AI Translation",
  description:
    "Free Funlingo Chrome extension: dual subtitles & AI translation on Netflix, YouTube, Prime & more in 100+ languages. Add to Chrome and learn while you watch.",
  keywords:
    "funlingo chrome extension, ai translator extension, dual subtitles chrome extension, dual subtitles netflix, dual subtitles youtube, ai translation extension, free language learning extension, bilingual subtitles, learn languages watching videos",
  alternates: {
    canonical: "/chrome-extension",
  },
  openGraph: {
    title: "Funlingo Chrome Extension — Free Dual Subtitles & AI Translation",
    description:
      "Free Funlingo Chrome extension: dual subtitles & AI translation on Netflix, YouTube, Prime & more in 100+ languages. Add to Chrome and learn while you watch.",
    url: "/chrome-extension",
  },
  twitter: {
    title: "Funlingo Chrome Extension — Free Dual Subtitles & AI Translation",
    description:
      "Free Funlingo Chrome extension: dual subtitles & AI translation on Netflix, YouTube, Prime & more in 100+ languages. Add to Chrome and learn while you watch.",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Funlingo",
  "headline": "Free Chrome Extension for Dual Subtitles & AI Translation",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Chrome",
  "url": "https://getfunlingo.com/chrome-extension",
  "description":
    "Funlingo is a free Chrome extension that adds dual subtitles and AI-powered translation to Netflix, YouTube, Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy, and Coursera in 100+ languages.",
  "featureList":
    "Dual subtitles, AI translation, AI word definitions, Vocabulary builder, 100+ languages, 8 streaming and learning platforms, 100% free",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free forever, no paywall",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.92",
    "ratingCount": "12",
    "bestRating": "5",
    "worstRating": "1",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the Funlingo Chrome extension free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Funlingo Chrome extension is 100% free with no hidden costs, premium tiers, or paywalls. You get dual subtitles, AI translation, AI word definitions, and the vocabulary builder at no charge. Just add it to Chrome from the Chrome Web Store and start using every feature immediately, no account required.",
      },
    },
    {
      "@type": "Question",
      "name": "What platforms does the Funlingo extension work on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Funlingo works on 8 platforms: Netflix, YouTube, Amazon Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy, and Coursera. Dual subtitles and AI translation integrate directly into each video player, so you can learn languages while watching movies, shows, anime, and online courses.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I install the Funlingo Chrome extension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open the Funlingo listing on the Chrome Web Store, click Add to Chrome, then confirm by clicking Add extension. Pin Funlingo to your toolbar, open any supported platform like Netflix or YouTube, and the dual subtitles will appear automatically. The whole process takes under a minute.",
      },
    },
    {
      "@type": "Question",
      "name": "Does the Funlingo extension support my language?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Almost certainly. Funlingo supports 100+ languages for subtitle translation, including Spanish, French, Japanese, Korean, Mandarin, German, Portuguese, Italian, Arabic, Hindi, and many more. You can set your target language and your native language independently for true dual-subtitle learning.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Funlingo a safe Chrome extension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Funlingo is published on the official Chrome Web Store, where it is reviewed by Google, and is rated 4.92 out of 5 stars. It runs locally in your browser to display subtitles and does not require you to create an account to start learning.",
      },
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ChromeExtensionContent />
    </>
  );
}
