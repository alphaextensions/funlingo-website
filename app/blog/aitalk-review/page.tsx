import type { Metadata } from "next";
import AitalkReviewContent from "./content";

export const metadata: Metadata = {
  title: "AiTalk Review — AI Language Practice Tool (2026)",
  description: "Is AiTalk worth it for language practice? Full review of AiTalk's AI conversation features, pricing, pros and cons, and how it compares to alternatives like Funlingo, ChatGPT, and Speak.",
  keywords: "aitalk, aitalk review, aitalk language learning, ai language practice tool, aitalk vs chatgpt, trancy aitalk, ai conversation practice, language learning ai tool 2026, funlingo vs aitalk, ai speaking practice",
  alternates: { canonical: "/blog/aitalk-review" },
  openGraph: { title: "AiTalk Review — AI Language Practice Tool (2026)", description: "Full review of AiTalk for AI language practice — features, pricing, and alternatives.", type: "article", url: "/blog/aitalk-review" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "AiTalk Review — AI Language Practice Tool (2026)", "description": "Full review of AiTalk for AI language practice.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is AiTalk?", "acceptedAnswer": { "@type": "Answer", "text": "AiTalk is an AI-powered language practice feature within Trancy that allows users to have spoken conversations with an AI tutor. It provides real-time feedback on pronunciation and grammar while simulating real-world conversation scenarios." } }, { "@type": "Question", "name": "Is AiTalk free?", "acceptedAnswer": { "@type": "Answer", "text": "AiTalk offers limited free conversations, but full access requires a Trancy Pro subscription starting at $11.99/month. For free language learning through real content, Funlingo offers unlimited dual subtitles on Netflix, YouTube, and Prime Video at no cost." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AitalkReviewContent />
    </>
  );
}
