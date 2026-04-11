import type { Metadata } from "next";
import LearnFrenchNetflixContent from "./content";

export const metadata: Metadata = {
  title: "How to Learn French by Watching Netflix & YouTube (2026 Guide)",
  description: "The complete guide to learning French with Netflix and YouTube. Best French shows by level, the dual subtitle method, a free daily routine, and proven strategies that actually work.",
  keywords: "learn french netflix, learn french watching netflix, best french shows netflix, french dual subtitles, learn french youtube, french language learning netflix, learn french free, french shows for beginners, french listening practice",
  alternates: { canonical: "/blog/learn-french-watching-netflix" },
  openGraph: { title: "How to Learn French by Watching Netflix & YouTube (2026 Guide)", description: "The complete guide to learning French with Netflix and YouTube. Best shows by level, dual subtitle method, and a free daily routine.", type: "article", url: "/blog/learn-french-watching-netflix" },
  twitter: { title: "How to Learn French by Watching Netflix & YouTube (2026 Guide)", description: "The complete guide to learning French with Netflix and YouTube. Best shows by level, dual subtitle method, and a free daily routine." },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Learn French by Watching Netflix & YouTube (2026 Guide)", "description": "The complete guide to learning French with Netflix and YouTube. Best French shows by level, the dual subtitle method, and a free daily routine.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-04-10", "dateModified": "2026-04-10", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can I learn French just by watching Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Watching Netflix with dual subtitles provides massive comprehensible input, which research shows is the primary driver of language acquisition. Combined with vocabulary review and speaking practice, it is one of the most effective methods available." } }, { "@type": "Question", "name": "What are the best Netflix shows for learning French?", "acceptedAnswer": { "@type": "Answer", "text": "For beginners, try Extra French or French animated shows. Intermediate learners benefit from Lupin, Call My Agent, and The Hook Up Plan. Advanced learners should watch Marseille, The Bureau, or French standup specials." } }, { "@type": "Question", "name": "Should I use French or English subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Use dual subtitles showing both French and English simultaneously. This lets you train your ear to French pronunciation while reading the French text and confirming meaning through the English translation, all at the same time." } }, { "@type": "Question", "name": "How long does it take to learn French from Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "With 30 minutes of daily dual-subtitle watching plus vocabulary review, most learners notice significant comprehension improvement within 8 to 12 weeks. Conversational ability typically develops after 4 to 6 months when combined with speaking practice." } }, { "@type": "Question", "name": "What free tools do I need to learn French with Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "You need a dual subtitle browser extension like Funlingo, which is free and works on both Netflix and YouTube. It overlays French and English subtitles simultaneously and lets you click any word for an instant definition." } }, { "@type": "Question", "name": "Is YouTube or Netflix better for learning French?", "acceptedAnswer": { "@type": "Answer", "text": "Both are valuable. Netflix offers scripted content with clearer audio and professional subtitles. YouTube offers unscripted, natural French with regional accents and slang. The ideal approach uses both platforms." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LearnFrenchNetflixContent />
    </>
  );
}
