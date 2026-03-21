import type { Metadata } from "next";
import ImmersiveTranslateAlternativesContent from "./content";

export const metadata: Metadata = {
  title: "Immersive Translate: What It Is & Best Alternatives",
  description: "Learn what Immersive Translate is, its features and limitations, and discover the best free alternatives including Funlingo, Google Translate, DeepL, Trancy, and Language Reactor.",
  keywords: "immersive translate, immersive translate alternative, bilingual translation extension, dual subtitle extension, immersive translate free, immersive translate netflix",
  alternates: {
    canonical: "/blog/immersive-translate-alternatives",
  },
  openGraph: {
    title: "Immersive Translate: What It Is & Best Alternatives",
    description: "Learn what Immersive Translate is, its features and limitations, and discover the best free alternatives including Funlingo, Google Translate, DeepL, Trancy, and Language Reactor.",
    type: "article",
    url: "/blog/immersive-translate-alternatives",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Immersive Translate: What It Is & Best Alternatives",
  "description": "Learn what Immersive Translate is, its features and limitations, and discover the best free alternatives including Funlingo, Google Translate, DeepL, Trancy, and Language Reactor.",
  "author": { "@type": "Organization", "name": "Funlingo Team" },
  "datePublished": "2026-03-20",
  "dateModified": "2026-03-20",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is Immersive Translate free?", "acceptedAnswer": { "@type": "Answer", "text": "Immersive Translate offers a free tier with basic features and limited translations per month. However, advanced features like PDF translation, subtitle translation on streaming platforms, and higher usage limits require a Pro subscription starting at around $9.99 per month. For a completely free alternative for video subtitle translation, Funlingo offers unlimited dual subtitles on YouTube at no cost." } },
    { "@type": "Question", "name": "Does Immersive Translate work on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Immersive Translate has added Netflix subtitle translation in its Pro plan, but the feature can be inconsistent and requires a paid subscription. For Netflix dual subtitles, dedicated extensions like Funlingo or Language Reactor tend to offer more reliable subtitle overlay experiences." } },
    { "@type": "Question", "name": "What's the best free alternative to Immersive Translate?", "acceptedAnswer": { "@type": "Answer", "text": "The best free alternative depends on your use case. For dual subtitles on YouTube videos, Funlingo is the top choice — it is completely free with no usage limits. For web page translation, Google Translate extension is the most accessible free option. For language learners who want both web and video features, a combination of Funlingo for video and Google Translate for web pages covers most needs at zero cost." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ImmersiveTranslateAlternativesContent />
    </>
  );
}
