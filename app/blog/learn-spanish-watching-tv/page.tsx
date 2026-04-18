import type { Metadata } from "next";
import LearnSpanishWatchingTvContent from "./content";

export const metadata: Metadata = {
  title: "Learn Spanish Watching TV: Best Shows, Tools & Daily Routine (2026)",
  description: "Learn Spanish by watching TV shows on Netflix, Amazon Prime, and YouTube. Best Spanish shows by level, how to use dual subtitles, a 15-minute daily routine, and common beginner mistakes.",
  keywords: "learn spanish watching tv, learn spanish tv shows, spanish shows to learn spanish, learn spanish netflix, learn spanish amazon prime, dual subtitles spanish",
  alternates: { canonical: "/blog/learn-spanish-watching-tv" },
  openGraph: { title: "Learn Spanish Watching TV: Best Shows, Tools & Daily Routine (2026)", description: "Learn Spanish by watching TV shows on Netflix, Amazon Prime, and YouTube. Best Spanish shows by level, how to use dual subtitles, a 15-minute daily routine, and common beginner mistakes.", type: "article", url: "/blog/learn-spanish-watching-tv" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Learn Spanish Watching TV: Best Shows, Tools & Daily Routine (2026)", "description": "Learn Spanish by watching TV shows on Netflix, Amazon Prime, and YouTube. Best Spanish shows by level, how to use dual subtitles, a 15-minute daily routine, and common beginner mistakes.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-04-18", "dateModified": "2026-04-18", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can you really learn Spanish just by watching TV?", "acceptedAnswer": { "@type": "Answer", "text": "Watching TV alone won't make you fluent, but it's one of the most effective ways to build listening comprehension, vocabulary, and natural pronunciation. Combined with dual subtitles and active learning techniques, TV can be a core part of your study routine." } }, { "@type": "Question", "name": "What are the best Spanish shows for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "For beginners, try animated shows like Pocoyo or short-form content with simple dialogue. Netflix's Extra en Español is specifically designed for learners. As you progress, try Destinos, then move to shows like Money Heist or Elite." } }, { "@type": "Question", "name": "How many hours of TV should I watch to learn Spanish?", "acceptedAnswer": { "@type": "Answer", "text": "Quality matters more than quantity. Aim for 15-30 minutes daily with dual subtitles and active note-taking rather than hours of passive watching. Consistency over several months produces better results than occasional binge sessions." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LearnSpanishWatchingTvContent />
    </>
  );
}
