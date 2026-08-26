import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "eJOY Alternatives: 6 Best Free & Paid Options (2026)",
  description: "Looking for an eJOY English alternative? Compare the 6 best free and paid dual-subtitle tools for learning languages on Netflix, YouTube, and Prime Video in 2026.",
  keywords: "eJOY alternatives, eJOY English alternative, dual subtitles, language learning extension, Netflix language learning, YouTube dual subtitles, free language learning tools",
  alternates: {
    canonical: "/blog/ejoy-alternatives",
  },
  openGraph: {
    title: "eJOY Alternatives: 6 Best Free & Paid Options (2026)",
    description: "Looking for an eJOY English alternative? Compare the 6 best free and paid dual-subtitle tools for learning languages on Netflix, YouTube, and Prime Video in 2026.",
    type: "article",
    url: "/blog/ejoy-alternatives",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's the best free alternative to eJOY?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and Amazon Prime Video, with a multi-translation selector, pronunciation audio, AI grammar explanations, and vocabulary saving with export — all completely free, with no quota or paid tier gating the core features. Unlike eJOY, which is built for learning English, Funlingo supports 100+ target languages." } },
    { "@type": "Question", "name": "Can I use eJOY to learn Spanish, Japanese, or Korean?", "acceptedAnswer": { "@type": "Answer", "text": "eJOY English is built specifically for learning English, so it is not the right tool if your target language is Spanish, Japanese, Korean, or another non-English language. Funlingo supports 100+ languages, making it a better choice for learners studying any language." } },
    { "@type": "Question", "name": "Does eJOY work on Amazon Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "No. eJOY supports dual subtitles on Netflix and YouTube, but not Amazon Prime Video. If you watch content on Prime Video, Funlingo is the only tool on this list that supports all three major streaming platforms — Netflix, YouTube, and Prime Video — for free." } },
    { "@type": "Question", "name": "How much does eJOY premium cost in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "At the time of writing, eJOY premium costs around $4.99 per month and unlocks advanced vocabulary review, gamified practice, and additional look-up features. Pricing can change, so always confirm the current plans on eJOY's own site before subscribing." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "eJOY Alternatives: 6 Best Free & Paid Options (2026)",
  "description": "Looking for an eJOY English alternative? Compare the 6 best free and paid dual-subtitle tools for learning languages on Netflix, YouTube, and Prime Video in 2026.",
  "author": { "@type": "Organization", "name": "Funlingo" },
  "datePublished": "2026-08-15",
  "dateModified": "2026-08-15",
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
