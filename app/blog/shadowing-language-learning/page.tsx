import type { Metadata } from "next";
import ShadowingLanguageLearningContent from "./content";

export const metadata: Metadata = {
  title: "What Is Shadowing in Language Learning? (+ AI Tools) | Funlingo",
  description: "Learn the shadowing technique for language learning: the science behind it, step-by-step guide, best content sources, and how AI tools like Funlingo supercharge your practice.",
  keywords: "shadowing ai, shadowing language learning, language shadowing technique, shadowing method, learn language by repeating, shadowing practice",
  alternates: {
    canonical: "/blog/shadowing-language-learning",
  },
  openGraph: {
    title: "What Is Shadowing in Language Learning? (+ AI Tools)",
    description: "Learn the shadowing technique for language learning: the science behind it, step-by-step guide, best content sources, and how AI tools like Funlingo supercharge your practice.",
    type: "article",
    url: "/blog/shadowing-language-learning",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is Shadowing in Language Learning? (+ AI Tools)",
  "description": "Learn the shadowing technique for language learning: the science behind it, step-by-step guide, best content sources, and how AI tools like Funlingo supercharge your practice.",
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
    { "@type": "Question", "name": "How long should I shadow each day?", "acceptedAnswer": { "@type": "Answer", "text": "Start with 10-15 minutes per day. Consistency matters more than duration. As you build stamina, you can increase to 20-30 minutes. Avoid sessions longer than 45 minutes as mental fatigue reduces effectiveness." } },
    { "@type": "Question", "name": "Is shadowing good for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "Shadowing works at any level, but absolute beginners should start with slower, simpler content like children's shows or graded podcasts. Having dual subtitles (via a tool like Funlingo) makes shadowing accessible even for beginners since you can read along while you speak." } },
    { "@type": "Question", "name": "What languages work best with shadowing?", "acceptedAnswer": { "@type": "Answer", "text": "Shadowing works for every language, but it is especially effective for tonal languages (Mandarin, Vietnamese, Thai) and languages with complex pronunciation (French, Portuguese, Arabic) because it trains your ear and mouth simultaneously." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ShadowingLanguageLearningContent />
    </>
  );
}
