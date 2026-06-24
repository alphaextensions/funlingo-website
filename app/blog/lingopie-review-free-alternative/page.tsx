import type { Metadata } from "next";
import LingopieReviewContent from "./content";

export const metadata: Metadata = {
  title: "Is Lingopie Worth It? Free Lingopie Alternative for 2026",
  description: "Lingopie review and cost breakdown — plus a 100% free alternative. Funlingo adds dual subtitles to Netflix, YouTube & Prime Video with no subscription.",
  keywords: "lingopie review, is lingopie worth it, lingopie cost, lingopie price, lingopie free, free lingopie alternative, lingopie alternative, lingopie vs funlingo, lingopie dual subtitles, learn language watching tv",
  alternates: { canonical: "/blog/lingopie-review-free-alternative" },
  openGraph: { title: "Is Lingopie Worth It? Free Lingopie Alternative for 2026", description: "Lingopie review and cost breakdown — plus a 100% free alternative. Funlingo adds dual subtitles to Netflix, YouTube & Prime Video with no subscription.", type: "article", url: "/blog/lingopie-review-free-alternative", images: ["/blog-images/lingopie-review-free-alternative-hero.jpg"] },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Is Lingopie Worth It? Free Lingopie Alternative for 2026", "description": "Lingopie review and cost breakdown — plus a 100% free alternative. Funlingo adds dual subtitles to Netflix, YouTube & Prime Video with no subscription.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-06-25", "dateModified": "2026-06-25", "image": "https://getfunlingo.com/blog-images/lingopie-review-free-alternative-hero.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Is Lingopie worth it?", "acceptedAnswer": { "@type": "Answer", "text": "Lingopie is worth it if you want an all-in-one, guided platform — a curated catalog of foreign-language TV and movies with interactive subtitles, flashcards, and review games already built in, and you do not mind paying a subscription. It is less worth it if your real goal is to add dual subtitles to shows you already watch on Netflix or YouTube, since you can do that for free with a browser extension like Funlingo." } }, { "@type": "Question", "name": "Is Lingopie free?", "acceptedAnswer": { "@type": "Answer", "text": "No. Lingopie offers a 7-day free trial, but after that it is a paid subscription with no permanent free tier, and the trial auto-renews into a paid plan unless you cancel before it ends. If you want a tool that is free for good, a Chrome extension like Funlingo adds dual subtitles and click-to-translate at no cost." } }, { "@type": "Question", "name": "How much does Lingopie cost?", "acceptedAnswer": { "@type": "Answer", "text": "As of 2026, Lingopie costs roughly $12 per month, about $67 to $72 per year (around $6 per month), or about $199 to $200 for a one-time lifetime plan in the US, after a 7-day free trial. Prices vary by region and Lingopie runs frequent promotions, so confirm the current figure on the official pricing page before subscribing." } }, { "@type": "Question", "name": "What is the best free Lingopie alternative?", "acceptedAnswer": { "@type": "Answer", "text": "For learning by watching, Funlingo is the best completely-free alternative. It is a free Chrome extension that adds dual subtitles and AI translation to Netflix, YouTube, and Amazon Prime Video across 100+ languages, with click-to-translate on any word and no monthly quota or subscription. Unlike Lingopie, you are not limited to a single catalog — you learn from whatever you already watch." } }, { "@type": "Question", "name": "Does Lingopie work on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Since April 2026, Lingopie's Chrome extension adds dual subtitles and click-to-translate to Netflix. However, it requires a paid Lingopie subscription, currently works on Netflix only, supports just a few languages, and only on native-original (non-dubbed) titles. If you want free dual subtitles across Netflix, YouTube, and Prime Video in 100+ languages, Funlingo is purpose-built for that." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LingopieReviewContent />
    </>
  );
}
