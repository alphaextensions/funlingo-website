import type { Metadata } from "next";
import ReadingModeContent from "./content";

export const metadata: Metadata = {
  title: "Reading Mode — Read Captions Side-by-Side While You Watch",
  description: "Turn your watch time into a language lesson. Funlingo's Reading Mode shows synchronized bilingual captions (native + learning language) with instant synonyms & examples.",
  keywords: "Reading Mode, bilingual reading, AI language learning, contextual learning, dual subtitles, caption reading mode",
  alternates: { canonical: "/blog/reading-mode-bilingual-captions" },
  openGraph: { title: "Reading Mode — Read Captions Side-by-Side While You Watch", description: "Turn your watch time into a language lesson. Funlingo's Reading Mode shows synchronized bilingual captions with instant synonyms & examples.", type: "article", url: "/blog/reading-mode-bilingual-captions" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Reading Mode — Read Captions Side-by-Side While You Watch", "description": "Turn your watch time into a language lesson with Funlingo Reading Mode — synchronized bilingual captions, instant synonyms and examples.", "author": { "@type": "Person", "name": "Rushab Kasat", "url": "https://www.linkedin.com/company/getfunlingo/" }, "datePublished": "2026-02-05", "dateModified": "2026-02-05", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ReadingModeContent />
    </>
  );
}
