import type { Metadata } from "next";
import LanguageReactorVsTrancyContent from "./content";

export const metadata: Metadata = {
  title: "Language Reactor vs Trancy: Which Is Better in 2026? | FunLingo",
  description: "Detailed comparison of Language Reactor vs Trancy in 2026. We compare pricing, features, platform support, dual subtitles, vocabulary tools, and AI grammar to help you choose the best language learning extension.",
  keywords: "language reactor vs trancy, language reactor review, trancy review, language reactor alternative, trancy alternative, dual subtitle extension comparison, language learning chrome extension 2026",
  alternates: {
    canonical: "/blog/language-reactor-vs-trancy",
  },
  openGraph: {
    title: "Language Reactor vs Trancy: Which Is Better in 2026?",
    description: "Detailed comparison of Language Reactor vs Trancy in 2026. We compare pricing, features, platform support, dual subtitles, vocabulary tools, and AI grammar to help you choose the best language learning extension.",
    type: "article",
    url: "/blog/language-reactor-vs-trancy",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Language Reactor vs Trancy: Which Is Better in 2026?",
  "description": "Detailed comparison of Language Reactor vs Trancy in 2026. We compare pricing, features, platform support, dual subtitles, vocabulary tools, and AI grammar to help you choose the best language learning extension.",
  "author": { "@type": "Organization", "name": "FunLingo Team" },
  "datePublished": "2026-03-20",
  "dateModified": "2026-03-20",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is Language Reactor free?", "acceptedAnswer": { "@type": "Answer", "text": "Language Reactor offers a limited free tier that includes basic dual subtitles on YouTube and Netflix. However, advanced features like vocabulary export, machine translations, and phonetic transcription require the Pro plan at $6 per month." } },
    { "@type": "Question", "name": "Does Trancy work on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Trancy supports Netflix along with YouTube, Disney+, and several other streaming platforms. However, full Netflix support with all features like sentence-by-sentence mode and AI grammar analysis requires the paid plan at $8 per month." } },
    { "@type": "Question", "name": "What is the best free alternative to Language Reactor and Trancy?", "acceptedAnswer": { "@type": "Answer", "text": "FunLingo is the best free alternative. It provides dual subtitles, word-level translation popups, pronunciation audio, AI-powered explanations, and a vocabulary saver across Netflix, YouTube, and Prime Video — all completely free with no account required." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LanguageReactorVsTrancyContent />
    </>
  );
}
