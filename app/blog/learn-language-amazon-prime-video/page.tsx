import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "How to Learn a Language on Amazon Prime Video with Dual Subtitles (2026)",
  description: "Prime Video has a huge foreign-language library but no native dual subtitles. Learn how Funlingo — one of the few free tools that supports Prime Video — adds dual subtitles and click-to-translate for immersion.",
  keywords: "amazon prime video language learning, prime video dual subtitles, learn language prime video, dual subtitles extension, funlingo prime video",
  alternates: {
    canonical: "/blog/learn-language-amazon-prime-video",
  },
  openGraph: {
    title: "How to Learn a Language on Amazon Prime Video with Dual Subtitles (2026)",
    description: "Prime Video has a huge foreign-language library but no native dual subtitles. Learn how Funlingo — one of the few free tools that supports Prime Video — adds dual subtitles and click-to-translate for immersion.",
    type: "article",
    url: "/blog/learn-language-amazon-prime-video",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Does Amazon Prime Video have dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "No. Prime Video lets you pick one subtitle language at a time but has no built-in dual-subtitle mode. To read the original language and your own language together, you need a browser extension like Funlingo that adds dual subtitles to the player. It is free, with no monthly quota." } },
    { "@type": "Question", "name": "Does Language Reactor work on Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "No. Language Reactor supports Netflix and YouTube only and does not run on Prime Video; its Pro plan is around $7.99/mo. Trancy ($9.90/mo, Netflix/YouTube/Disney+), eJOY ($4.99/mo, English-only), and Immersive Translate ($9.99/mo, web/PDF focus) also do not support Prime Video. Funlingo is one of the few that does, and it is free." } },
    { "@type": "Question", "name": "How do I turn on dual subtitles on Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "Install the free Funlingo Chrome extension, open a Prime Video title that has subtitles in your target language, set your learning language, and enable dual subtitles from the Funlingo controls. You can then click any word for an instant translation, pronunciation, and grammar note." } },
    { "@type": "Question", "name": "Is Funlingo free to use on Prime Video?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Funlingo is a free Chrome extension with no paid tier gating its core features and no monthly quota. Dual subtitles, click-to-translate, per-word pronunciation, AI grammar explanations, and save-to-vocabulary all work on Prime Video, Netflix, and YouTube across 100+ languages." } },
    { "@type": "Question", "name": "What should I watch on Prime Video to learn a language?", "acceptedAnswer": { "@type": "Answer", "text": "Availability varies by region, but Amazon Originals are a reliable starting point thanks to clean subtitle tracks. Match content to your level: animation and light comedy for beginners, character drama for intermediate learners, and thrillers or documentaries for advanced listening practice." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Learn a Language on Amazon Prime Video with Dual Subtitles (2026)",
  "description": "Prime Video has a huge foreign-language library but no native dual subtitles. Learn how Funlingo — one of the few free tools that supports Prime Video — adds dual subtitles and click-to-translate for immersion.",
  "author": { "@type": "Organization", "name": "Funlingo" },
  "datePublished": "2026-08-12",
  "dateModified": "2026-08-12",
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
