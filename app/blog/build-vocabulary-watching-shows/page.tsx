import type { Metadata } from "next";
import VocabularyBuildingContent from "./content";

export const metadata: Metadata = {
  title: "How to Build Vocabulary While Watching Shows & Movies",
  description: "Discover 5 proven strategies to build vocabulary while watching movies and TV shows. Learn how contextual vocabulary learning, spaced repetition, and active listening transform screen time into real language growth.",
  keywords: "vocabulary building while watching, build vocabulary watching shows, learn vocabulary from movies, contextual vocabulary learning, save words while watching, vocabulary builder chrome extension",
  alternates: { canonical: "/blog/build-vocabulary-watching-shows" },
  openGraph: { title: "How to Build Vocabulary While Watching Shows & Movies", description: "Discover 5 proven strategies to build vocabulary while watching movies and TV shows.", type: "article", url: "/blog/build-vocabulary-watching-shows" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Build Vocabulary While Watching: 5 Proven Strategies That Actually Work", "description": "Discover 5 proven strategies to build vocabulary while watching movies and TV shows.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-14", "dateModified": "2026-03-14", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can you really build vocabulary by watching TV shows and movies?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Research on comprehensible input shows that learners acquire vocabulary effectively when they encounter new words in meaningful, understandable contexts." } }, { "@type": "Question", "name": "How many new words can I learn from watching one episode?", "acceptedAnswer": { "@type": "Answer", "text": "Most learners can realistically absorb 5 to 15 new words per episode when using active vocabulary-building strategies." } }, { "@type": "Question", "name": "Should I use subtitles in my native language or my target language?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitles are the most effective option. Seeing both languages simultaneously lets you understand meaning from context while training your reading skills." } }, { "@type": "Question", "name": "What is the best Chrome extension for building vocabulary while watching?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo is a vocabulary builder Chrome extension designed specifically for language learners who watch videos." } }, { "@type": "Question", "name": "How does spaced repetition help with vocabulary from shows?", "acceptedAnswer": { "@type": "Answer", "text": "Spaced repetition shows you saved words at increasing intervals over time, strengthening long-term retention." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VocabularyBuildingContent />
    </>
  );
}
