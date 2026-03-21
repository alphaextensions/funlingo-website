import type { Metadata } from "next";
import PhraseTranslatorContent from "./content";

export const metadata: Metadata = {
  title: "Phrase Translator — Best Tools for Idioms & Expressions (2026)",
  description: "Regular translators butcher idioms and phrases. Find the best phrase translators that understand context, slang, and expressions. Compare 8 tools for accurate phrase translation.",
  keywords: "phrase translator, translate phrases, idiom translator, expression translator, phrase translation tool, translate idioms accurately, contextual phrase translation, slang translator, funlingo phrase translation, best phrase translator 2026",
  alternates: { canonical: "/blog/phrase-translator" },
  openGraph: { title: "Phrase Translator — Best Tools for Idioms & Expressions (2026)", description: "Best phrase translators that understand idioms, slang, and context.", type: "article", url: "/blog/phrase-translator" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Phrase Translator — Best Tools for Idioms & Expressions (2026)", "description": "Best phrase translators that understand idioms, slang, and context.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Why do regular translators fail at translating phrases?", "acceptedAnswer": { "@type": "Answer", "text": "Regular translators often translate word-by-word, which breaks idioms and expressions. 'It's raining cats and dogs' would be literally translated instead of conveying 'heavy rain.' Phrase-aware translators use context and cultural knowledge to provide accurate meaning-based translations." } }, { "@type": "Question", "name": "What is the best tool for translating idioms?", "acceptedAnswer": { "@type": "Answer", "text": "ChatGPT and Claude are currently the best at translating idioms because they understand context and cultural meaning. DeepL also handles many idioms well for European languages. For learning phrases in context while watching shows, Funlingo's dual subtitles help you see how native speakers actually use expressions." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PhraseTranslatorContent />
    </>
  );
}
