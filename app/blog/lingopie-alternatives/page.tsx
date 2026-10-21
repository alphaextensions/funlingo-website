import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "Lingopie Alternatives 2026: Best Free & Cheaper Options (Extension Reviewed)",
  description: "Looking for a Lingopie alternative in 2026? Compare 6 free and cheaper options — including Funlingo's free dual subtitles on Netflix, YouTube & Prime — and see the limits of Lingopie's new Netflix extension.",
  keywords: "Lingopie alternatives, Lingopie alternative free, Lingopie Chrome extension, learn languages Netflix, dual subtitles, cheaper than Lingopie",
  alternates: {
    canonical: "/blog/lingopie-alternatives",
  },
  openGraph: {
    title: "Lingopie Alternatives 2026: Best Free & Cheaper Options (Extension Reviewed)",
    description: "Looking for a Lingopie alternative in 2026? Compare 6 free and cheaper options — including Funlingo's free dual subtitles on Netflix, YouTube & Prime — and see the limits of Lingopie's new Netflix extension.",
    type: "article",
    url: "/blog/lingopie-alternatives",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's the best free alternative to Lingopie?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and Amazon Prime Video with click-to-translate, per-word pronunciation, AI grammar help, and a vocabulary saver — all completely free, in 100+ languages, with no subscription. Lingopie is a paid platform with no free tier." } },
    { "@type": "Question", "name": "How much does Lingopie cost in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "At the time of writing, Lingopie costs around $12 per month, with a cheaper rate on the annual plan. Pricing can change, so confirm the current numbers on Lingopie's site. There is no permanently free tier." } },
    { "@type": "Question", "name": "What are the limits of Lingopie's Netflix Chrome extension?", "acceptedAnswer": { "@type": "Answer", "text": "Lingopie's April 2026 Chrome extension works on Netflix only (not YouTube), supports just four languages (Spanish, French, Italian, and German), and only activates on content originally produced in that language — dubbed shows are excluded. It also still requires a paid Lingopie subscription." } },
    { "@type": "Question", "name": "Does any Lingopie alternative work on Amazon Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Funlingo is the only tool in this comparison that supports dual subtitles on Amazon Prime Video, alongside Netflix and YouTube. Language Reactor, Trancy, Migaku, and eJOY do not currently support Prime Video." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Lingopie Alternatives 2026: Best Free & Cheaper Options (Extension Reviewed)",
  "description": "Looking for a Lingopie alternative in 2026? Compare 6 free and cheaper options — including Funlingo's free dual subtitles on Netflix, YouTube & Prime — and see the limits of Lingopie's new Netflix extension.",
  "author": { "@type": "Organization", "name": "Funlingo" },
  "datePublished": "2026-08-09",
  "dateModified": "2026-08-09",
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
