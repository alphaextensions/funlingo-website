import type { Metadata } from "next";
import EnglishVietnameseDictionaryContent from "./content";

export const metadata: Metadata = {
  title: "Best English-Vietnamese Dictionary Apps & Sites (2026)",
  description: "Compare the best English-Vietnamese dictionary apps and websites for 2026. Includes VDICT, Tra Tu, Laban Dictionary, Google Translate, and more with features, pros/cons, and which is best for learners.",
  keywords: "eng viet dict, english vietnamese dictionary, vietnamese dictionary app, best english vietnamese dictionary, vdict, tra tu, laban dictionary, vietnamese translation app, learn vietnamese english, funlingo vietnamese subtitles",
  alternates: { canonical: "/blog/english-vietnamese-dictionary" },
  openGraph: { title: "Best English-Vietnamese Dictionary Apps & Sites (2026)", description: "Compare the best English-Vietnamese dictionaries — apps, websites, and learning tools.", type: "article", url: "/blog/english-vietnamese-dictionary" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Best English-Vietnamese Dictionary Apps & Sites (2026)", "description": "Compare the best English-Vietnamese dictionaries for 2026.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is the best English-Vietnamese dictionary app?", "acceptedAnswer": { "@type": "Answer", "text": "For comprehensive definitions, VDICT and Laban Dictionary are the top choices. For quick translations, Google Translate works well. For learning Vietnamese through real content, Funlingo provides free dual subtitles on YouTube and Netflix so you can see Vietnamese and English side by side." } }, { "@type": "Question", "name": "Is Vietnamese hard to learn for English speakers?", "acceptedAnswer": { "@type": "Answer", "text": "Vietnamese has a steep initial learning curve due to its tonal system (6 tones) and unfamiliar sounds. However, Vietnamese grammar is simpler than many Asian languages — no conjugation, no grammatical gender, and no plurals. With consistent exposure through media and a good dictionary, beginners can make fast progress." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EnglishVietnameseDictionaryContent />
    </>
  );
}
