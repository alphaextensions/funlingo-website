import type { Metadata } from "next";
import ReadingMode2Content from "./content";

export const metadata: Metadata = {
  title: "Reading Mode -- Learn Languages While You Watch with Bilingual Captions",
  description: "Turn your watch time into a language lesson. Funlingo's Reading Mode displays synchronized bilingual captions with hover synonyms & examples for contextual learning.",
  keywords: "Reading Mode, bilingual captions, dual subtitles, learn languages while watching, AI language learning, contextual learning",
  alternates: { canonical: "/blog/how-to-learn-languages-with-reading-mode" },
  openGraph: { title: "Reading Mode -- Learn Languages While You Watch with Bilingual Captions", description: "Turn your watch time into a language lesson with bilingual captions.", type: "article", url: "/blog/how-to-learn-languages-with-reading-mode" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Reading Mode -- Learn Languages While You Watch", "description": "Turn your watch time into a language lesson with Funlingo's Reading Mode.", "author": { "@type": "Person", "name": "Aastha Pandey", "url": "https://www.linkedin.com/in/aastha-p/" }, "datePublished": "2026-02-16", "dateModified": "2026-02-16", "image": "https://getfunlingo.com/blog-images/image.png", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://getfunlingo.com/blog/how-to-learn-languages-with-reading-mode" } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Will Reading Mode work on any video?", "acceptedAnswer": { "@type": "Answer", "text": "It works on most video players that provide subtitles (YouTube, many Vimeo embeds). Some streaming platforms restrict overlays; in those cases Reading Mode will show compatibility tips." } }, { "@type": "Question", "name": "Is my data private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes -- captions are rendered locally where possible; hover lookups are minimized and anonymized consistent with our privacy policy." } }, { "@type": "Question", "name": "Can I export saved words?", "acceptedAnswer": { "@type": "Answer", "text": "You can export your vocabulary list (CSV/Anki format) from the app's vocabulary page for review in other tools." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReadingMode2Content />
    </>
  );
}
