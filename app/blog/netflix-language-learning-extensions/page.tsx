import type { Metadata } from "next";
import NetflixLanguageLearningExtensionsContent from "./content";

export const metadata: Metadata = {
  title: "5 Best Netflix Language Learning Extensions (2026) — Free & Paid Compared",
  description: "Which Netflix language learning extension is actually worth it? We tested all 5 — Funlingo (free), Language Reactor ($7.99/mo), Trancy ($9.90/mo), Immersive Translate, and eJOY. Full comparison with features, pricing, and verdict.",
  keywords: "netflix language learning extension, netflix dual subtitles extension, learn language netflix chrome, language reactor alternative, best netflix language tool 2026",
  alternates: {
    canonical: "/blog/netflix-language-learning-extensions",
  },
  openGraph: {
    title: "5 Best Netflix Language Learning Extensions (2026) — Free & Paid Compared",
    description: "Which Netflix language learning extension is actually worth it? We tested all 5 — Funlingo (free), Language Reactor ($7.99/mo), Trancy ($9.90/mo), Immersive Translate, and eJOY. Full comparison with features, pricing, and verdict.",
    type: "article",
    url: "/blog/netflix-language-learning-extensions",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Netflix Language Learning Extensions (2026): 5 Tools Tested & Compared",
  "description": "Which Netflix language learning extension is actually worth it? We tested all 5 — Funlingo (free), Language Reactor ($7.99/mo), Trancy ($9.90/mo), Immersive Translate, and eJOY. Full comparison with features, pricing, and verdict.",
  "author": { "@type": "Organization", "name": "Funlingo Team" },
  "datePublished": "2026-03-19",
  "dateModified": "2026-03-19",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the best free Netflix language learning extension?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo is the best free option. It offers dual subtitles, word-level translation popups, pronunciation audio, and a vocabulary saver — all at no cost. Most competitors lock these features behind paid plans." } },
    { "@type": "Question", "name": "Do these extensions work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "No. All five extensions reviewed here are Chrome extensions designed for desktop browsers. Netflix's mobile app does not support browser extensions. For mobile learning, you would need a dedicated app." } },
    { "@type": "Question", "name": "Can I use multiple extensions at once?", "acceptedAnswer": { "@type": "Answer", "text": "Technically yes, but it is not recommended. Running two subtitle-overlay extensions simultaneously can cause conflicts, overlapping subtitles, and performance issues. Pick one that best fits your workflow and disable the others while watching." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NetflixLanguageLearningExtensionsContent />
    </>
  );
}
