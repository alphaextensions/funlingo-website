import type { Metadata } from "next";
import VocabularyBuildingWatchingContent from "./content";

export const metadata: Metadata = {
  title: "How to Build Vocabulary While Watching Shows (A Science-Backed Method)",
  description: "Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching — backed by language science.",
  keywords: "vocabulary building watching shows, learn vocabulary watching tv, build vocabulary netflix, vocabulary retention method, spaced repetition vocabulary, word saving while watching, science backed vocabulary learning",
  alternates: { canonical: "/blog/vocabulary-building-watching-shows" },
  openGraph: { title: "How to Build Vocabulary While Watching Shows (A Science-Backed Method)", description: "Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching.", type: "article", url: "/blog/vocabulary-building-watching-shows" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Build Vocabulary While Watching Shows (A Science-Backed Method)", "description": "Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-14", "dateModified": "2026-03-14", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "How many words can I learn per episode using this method?", "acceptedAnswer": { "@type": "Answer", "text": "Using the 4-step method with dual subtitles and active word saving, most learners can effectively acquire 5 to 15 new words per episode, with long-term retention rates above 80% when combined with spaced repetition." } }, { "@type": "Question", "name": "Is watching shows better than flashcards for vocabulary?", "acceptedAnswer": { "@type": "Answer", "text": "Watching shows provides contextual learning that flashcards cannot. Research shows words learned in context are retained longer and recalled more easily. The ideal approach combines both: learn words from shows and reinforce them with spaced repetition flashcards." } }, { "@type": "Question", "name": "What is the science behind learning vocabulary from TV?", "acceptedAnswer": { "@type": "Answer", "text": "Three key principles support this approach: comprehensible input theory (Krashen), dual coding theory (Paivio), and the spacing effect. Together they show that encountering words in meaningful audiovisual contexts with spaced review leads to durable vocabulary acquisition." } }, { "@type": "Question", "name": "Do I need dual subtitles for this method to work?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitles significantly enhance the method by providing instant comprehension without breaking your flow. While you can learn vocabulary with single subtitles, dual subtitles make the process faster and more enjoyable, especially for beginners and intermediate learners." } }, { "@type": "Question", "name": "How does Funlingo's word-saving feature work?", "acceptedAnswer": { "@type": "Answer", "text": "While watching with Funlingo dual subtitles, you can click any word in the subtitles to see its translation and save it to your personal vocabulary list. Saved words can then be reviewed with spaced repetition to ensure long-term retention." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VocabularyBuildingWatchingContent />
    </>
  );
}
