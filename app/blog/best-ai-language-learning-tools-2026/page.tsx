import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "Best AI Language Learning Apps 2026 — Why FunLingo Wins for Passive Learning",
  description: "Compare the top AI language learning tools and discover how FunLingo turns your streaming time into fast, context-rich learning with in-player dual subtitles.",
  keywords: "best AI language learning app, AI language learning, learn languages faster using AI, dual subtitles, word lookup",
  alternates: {
    canonical: "/blog/best-ai-language-learning-tools-2026",
  },
  openGraph: {
    title: "Best AI Language Learning Apps 2026 — Why FunLingo Wins for Passive Learning",
    description: "Compare the top AI language learning tools and discover how FunLingo turns your streaming time into fast, context-rich learning with in-player dual subtitles.",
    type: "article",
    url: "/blog/best-ai-language-learning-tools-2026",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is FunLingo different from other subtitle tools?", "acceptedAnswer": { "@type": "Answer", "text": "FunLingo focuses on in-player dual subtitles plus instant word-level multi-translation lookup, pronunciation playback, and save-to-vocab — designed for passive learning while watching content." } },
    { "@type": "Question", "name": "Can I choose how many translations I see per word?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — FunLingo's UI lets you select 1, 2, 3, or \"All\" translations for deeper comprehension, reducing the need to search elsewhere." } },
    { "@type": "Question", "name": "Which platforms does FunLingo work with?", "acceptedAnswer": { "@type": "Answer", "text": "FunLingo supports YouTube, Netflix, Prime Video and aims to expand to more platforms." } },
    { "@type": "Question", "name": "Is FunLingo free?", "acceptedAnswer": { "@type": "Answer", "text": "The extension distributes a free tier / no-cost option." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best AI Language Learning Tools (2026): Learn faster with AI & real content",
  "description": "Compare the top AI language learning tools and discover how FunLingo turns your streaming time into fast, context-rich learning with in-player dual subtitles.",
  "author": { "@type": "Organization", "name": "FunLingo" },
  "datePublished": "2024-03-01",
  "dateModified": "2024-03-01",
  "image": "https://getfunlingo.com/og-image.jpg"
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostContent />
    </>
  );
}
