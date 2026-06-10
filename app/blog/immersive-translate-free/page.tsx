import type { Metadata } from "next";
import ImmersiveTranslateFreeContent from "./content";

export const metadata: Metadata = {
  title: "Immersive Translate Free: What You Get Without Paying (2026)",
  description: "Is Immersive Translate free? Here is exactly what the free tier includes, what Pro unlocks and its price, plus the best completely-free alternative for video subtitles.",
  keywords: "immersive translate free, immersive translate pro free, free immersive translate alternative, immersive translate price, immersive translate pro cost, free dual subtitles, free video translation, immersive translate alternative",
  alternates: { canonical: "/blog/immersive-translate-free" },
  openGraph: { title: "Immersive Translate Free: What You Get Without Paying (2026)", description: "Is Immersive Translate free? Here is exactly what the free tier includes, what Pro unlocks and its price, plus the best completely-free alternative for video subtitles.", type: "article", url: "/blog/immersive-translate-free" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Immersive Translate Free: What You Get Without Paying (2026)", "description": "Is Immersive Translate free? Here is exactly what the free tier includes, what Pro unlocks and its price, plus the best completely-free alternative for video subtitles.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-06-10", "dateModified": "2026-06-10", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Is Immersive Translate free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Immersive Translate has a genuinely useful free tier. You can translate web pages with bilingual side-by-side text, use free machine translation engines like Google, Microsoft, and DeepL (free quota), and translate documents and subtitles within monthly limits. The free plan is enough for casual reading and light video use, but it caps how much you can translate with premium AI engines each month." } }, { "@type": "Question", "name": "What does Immersive Translate Pro cost?", "acceptedAnswer": { "@type": "Answer", "text": "Immersive Translate Pro is priced at roughly $9.99 per month, with discounts for annual and lifetime plans. Pro raises or removes monthly quotas and unlocks premium AI translation engines such as DeepL Pro, OpenAI, Claude, and Gemini, faster processing, and higher document and subtitle limits. Exact pricing and promotions change over time, so check the official site for current numbers." } }, { "@type": "Question", "name": "Can I use Immersive Translate Pro for free?", "acceptedAnswer": { "@type": "Answer", "text": "You can get most of the value of Immersive Translate without paying by staying within the free tier: use the free translation engines, plug in your own AI API key where supported, and reserve premium quota for content that needs it. We do not recommend trying to bypass paywalls, share cracked licenses, or use unofficial mods, which violate the terms of service and carry security and account risks. The honest path is to use the free tier well or choose a free alternative." } }, { "@type": "Question", "name": "What is the best free Immersive Translate alternative?", "acceptedAnswer": { "@type": "Answer", "text": "For video and subtitle translation specifically, Funlingo is the best completely-free alternative. It is a free Chrome extension that adds dual subtitles and AI translation to Netflix, YouTube, Amazon Prime Video, and more across 100+ languages, with click-to-translate on any word and no monthly quota. For general web-page translation, free machine engines like Google Translate and the free tier of Immersive Translate itself remain solid." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ImmersiveTranslateFreeContent />
    </>
  );
}
