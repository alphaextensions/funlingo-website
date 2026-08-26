import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "7 Best Trancy Alternatives (2026): Free & Paid Dual-Subtitle Tools",
  description: "Compare the 7 best Trancy alternatives for 2026. See how free and paid dual-subtitle tools stack up on price, platforms, pronunciation, and AI — and why Funlingo is the top free pick.",
  keywords: "Trancy alternatives, best Trancy alternative, dual subtitle extension, free dual subtitles, Netflix language learning, Prime Video subtitles, Trancy vs Funlingo",
  alternates: {
    canonical: "/blog/trancy-alternatives",
  },
  openGraph: {
    title: "7 Best Trancy Alternatives (2026): Free & Paid Dual-Subtitle Tools",
    description: "Compare the 7 best Trancy alternatives for 2026. See how free and paid dual-subtitle tools stack up on price, platforms, pronunciation, and AI — and why Funlingo is the top free pick.",
    type: "article",
    url: "/blog/trancy-alternatives",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's the best free alternative to Trancy?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and Amazon Prime Video, with a multi-translation selector, pronunciation audio, AI grammar explanations, and vocabulary saving with export — all completely free, with no quota or paid tier gating the core features. Trancy's best features require a Pro plan at about $9.90/month." } },
    { "@type": "Question", "name": "Does Trancy work on Amazon Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "No. Trancy supports Netflix, YouTube, and Disney+, but not Amazon Prime Video. If you watch content on Prime Video, Funlingo is the only tool on this list that supports all three major streaming platforms — Netflix, YouTube, and Prime Video — for free." } },
    { "@type": "Question", "name": "How much does Trancy Pro cost in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "At the time of writing, Trancy Pro costs about $9.90 per month and unlocks features such as unlimited AI grammar breakdowns, AiTalk speaking practice, and advanced flashcards. Pricing can change, so always confirm the current plans on Trancy's own site before subscribing." } },
    { "@type": "Question", "name": "Is there a Trancy alternative with AI speaking practice?", "acceptedAnswer": { "@type": "Answer", "text": "Trancy's AiTalk is one of its headline features. If AI speaking practice matters most to you, read our AiTalk review. For everyday video learning — dual subtitles, word lookup, pronunciation, and AI grammar help — Funlingo covers the core for free across more platforms." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "7 Best Trancy Alternatives (2026): Free & Paid Dual-Subtitle Tools",
  "description": "Compare the 7 best Trancy alternatives for 2026. See how free and paid dual-subtitle tools stack up on price, platforms, pronunciation, and AI — and why Funlingo is the top free pick.",
  "author": { "@type": "Organization", "name": "Funlingo" },
  "datePublished": "2026-08-10",
  "dateModified": "2026-08-10",
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
