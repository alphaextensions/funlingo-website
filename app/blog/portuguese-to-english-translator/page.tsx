import type { Metadata } from "next";
import PortugueseToEnglishTranslatorContent from "./content";

export const metadata: Metadata = {
  title: "Portuguese to English Translator — Best Tools 2026",
  description: "Find the most accurate Portuguese to English translator for 2026. Compare Google Translate, DeepL, ChatGPT, and more. Includes Brazilian vs European Portuguese tips and how to learn Portuguese with dual subtitles.",
  keywords: "tradutor do inglês para português, portuguese to english translator, best portuguese translator, google translate portuguese, deepl portuguese, brazilian portuguese translation, portuguese translation tools 2026, funlingo portuguese, learn portuguese with subtitles",
  alternates: { canonical: "/blog/portuguese-to-english-translator" },
  openGraph: { title: "Portuguese to English Translator — Best Tools 2026", description: "Compare the best Portuguese to English translators for 2026 with accuracy tests and pricing.", type: "article", url: "/blog/portuguese-to-english-translator" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Portuguese to English Translator — Best Tools 2026", "description": "Compare the best Portuguese to English translators for 2026.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is the most accurate Portuguese to English translator?", "acceptedAnswer": { "@type": "Answer", "text": "DeepL is widely considered the most accurate for European Portuguese, while Google Translate handles Brazilian Portuguese well. For learning Portuguese through content, Funlingo provides free dual subtitles on Netflix and YouTube." } }, { "@type": "Question", "name": "Is Brazilian Portuguese different from European Portuguese?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, they differ in pronunciation, vocabulary, grammar, and spelling. Brazilian Portuguese is more widely spoken (215 million vs 10 million speakers). Most translation tools handle both varieties, though accuracy may vary." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PortugueseToEnglishTranslatorContent />
    </>
  );
}
