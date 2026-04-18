import type { Metadata } from "next";
import LanguageReactorAlternativesContent from "./content";

export const metadata: Metadata = {
  title: "7 Best Language Reactor Alternatives (2026) — Free & Paid Options",
  description: "Language Reactor not meeting your needs? Compare 7 alternatives including Funlingo (free, supports Prime Video), Trancy, Immersive Translate, eJOY, Substital, and more. Full feature comparison.",
  keywords: "language reactor alternative, language reactor alternatives, language reactor free alternative, language learning netflix extension, best language reactor replacement 2026",
  alternates: {
    canonical: "/blog/language-reactor-alternatives",
  },
  openGraph: {
    title: "7 Best Language Reactor Alternatives (2026) — Free & Paid Options",
    description: "Language Reactor not meeting your needs? Compare 7 alternatives including Funlingo (free, supports Prime Video), Trancy, Immersive Translate, eJOY, Substital, and more. Full feature comparison.",
    type: "article",
    url: "/blog/language-reactor-alternatives",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Language Reactor Alternatives for Language Learning (2026)",
  "description": "Language Reactor not meeting your needs? Compare 7 alternatives including Funlingo (free, supports Prime Video), Trancy, Immersive Translate, eJOY, Substital, and more. Full feature comparison.",
  "author": { "@type": "Organization", "name": "Funlingo Team" },
  "datePublished": "2026-04-18",
  "dateModified": "2026-04-18",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's the best free alternative to Language Reactor?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and Amazon Prime Video, with word-level translations, pronunciation audio, AI grammar explanations, and vocabulary saving — all completely free. Language Reactor's free tier limits you to basic dual subtitles without vocabulary saving or advanced features." } },
    { "@type": "Question", "name": "Does Language Reactor work on Amazon Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "No. Language Reactor only supports Netflix and YouTube. If you watch content on Amazon Prime Video, Funlingo is the only free extension that supports all three major streaming platforms." } },
    { "@type": "Question", "name": "Is Language Reactor still free in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Language Reactor offers a limited free tier that includes basic dual subtitles. However, features like phrase saving, human-reviewed translations, and advanced playback controls require Language Reactor Pro at $7.99/month." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LanguageReactorAlternativesContent />
    </>
  );
}
