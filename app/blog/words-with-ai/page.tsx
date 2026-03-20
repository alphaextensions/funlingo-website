import type { Metadata } from "next";
import WordsWithAiContent from "./content";

export const metadata: Metadata = {
  title: "Words That Have 'AI' in Them — Complete List & Meanings",
  description: "Explore a comprehensive list of English words containing 'ai' — from common words like rain and train to unusual ones. Includes pronunciation tips, meanings, and example sentences.",
  keywords: "words that has ai, words with ai, ai words list, English words containing ai, ai letter pattern, vocabulary building",
  alternates: {
    canonical: "/blog/words-with-ai",
  },
  openGraph: {
    title: "Words That Have 'AI' in Them — Complete List & Meanings",
    description: "Explore a comprehensive list of English words containing 'ai' — from common words like rain and train to unusual ones. Includes pronunciation tips, meanings, and example sentences.",
    type: "article",
    url: "/blog/words-with-ai",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Words That Have 'AI' in Them — Complete List & Meanings",
  "description": "Explore a comprehensive list of English words containing 'ai' — from common words like rain and train to unusual ones. Includes pronunciation tips, meanings, and example sentences.",
  "author": { "@type": "Organization", "name": "FunLingo Team" },
  "datePublished": "2026-03-20",
  "dateModified": "2026-03-20",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How many English words contain 'ai'?", "acceptedAnswer": { "@type": "Answer", "text": "There are over 2,500 English words that contain the letter combination 'ai'. This includes common everyday words like rain, train, and wait, as well as more advanced vocabulary like abstain, portrait, and maintain. The 'ai' pattern is one of the most frequently occurring vowel digraphs in the English language." } },
    { "@type": "Question", "name": "What is the longest word with 'ai'?", "acceptedAnswer": { "@type": "Answer", "text": "Some of the longest common English words containing 'ai' include 'entertainment' (13 letters), 'straightforward' (15 letters), and 'unattainable' (12 letters). Technical and scientific terms can be even longer, such as 'unsustainability'." } },
    { "@type": "Question", "name": "Is 'ai' always pronounced the same way?", "acceptedAnswer": { "@type": "Answer", "text": "No, 'ai' is not always pronounced the same way in English. The most common pronunciation is the long 'a' sound as in rain (/eɪ/). However, it can also sound like a short 'e' as in 'said', a short 'i' as in 'captain', or even 'air' as in 'fair'. Context and word origin determine the pronunciation." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WordsWithAiContent />
    </>
  );
}
