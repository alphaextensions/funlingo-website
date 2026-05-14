import type { Metadata } from "next";
import LearnSpanishWatchingTvContent from "./content";

export const metadata: Metadata = {
  title: "Learn Spanish Watching TV (2026): The Practical Guide That Actually Works",
  description: "Want to learn Spanish by watching TV? This is the practical playbook: which shows to start with, how to use dual subtitles effectively, a 15-minute daily routine, and the beginner mistakes to skip.",
  keywords: "learn spanish watching tv, learn spanish by watching tv, learn spanish netflix, best spanish shows for learners, spanish dual subtitles, spanish through tv shows, spanish language tv learning",
  alternates: { canonical: "/blog/learn-spanish-watching-tv" },
  openGraph: {
    title: "Learn Spanish Watching TV (2026): The Practical Guide That Actually Works",
    description: "Which Spanish shows to watch, how to set up dual subtitles, a 15-minute daily routine, and the beginner mistakes to avoid.",
    type: "article",
    url: "/blog/learn-spanish-watching-tv",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Learn Spanish Watching TV (2026): The Practical Guide That Actually Works",
  "description": "A practical playbook for learning Spanish through TV: best shows by level, dual subtitle setup, daily routine, and common mistakes.",
  "author": { "@type": "Organization", "name": "Funlingo Team" },
  "datePublished": "2026-05-13",
  "dateModified": "2026-05-13",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can you really learn Spanish just by watching TV?", "acceptedAnswer": { "@type": "Answer", "text": "You can build comprehension and vocabulary very effectively, but TV alone won't get you to fluent speaking. Watching with dual subtitles trains your ear, exposes you to natural speech, and grows your passive vocabulary. To speak fluently, you also need active output — speaking practice, writing, or AI conversation tools. The best results come from pairing 15–30 minutes of daily TV with short bursts of active practice." } },
    { "@type": "Question", "name": "What's the best Spanish TV show for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "Extra en Español is the classic beginner show — it was made specifically for learners and uses slow, clear Spanish. After that, Destinos and shorter content like Dreaming Spanish videos work well. Once you're at low-intermediate level, real shows like La Casa de las Flores (Mexico) and Las Chicas del Cable (Spain) are dramatic enough to be interesting but slow-paced enough to follow with dual subtitles." } },
    { "@type": "Question", "name": "How long does it take to learn Spanish from TV?", "acceptedAnswer": { "@type": "Answer", "text": "With consistent daily watching (15–30 minutes) plus dual subtitles and word lookups, most learners notice meaningful comprehension gains within 4–8 weeks. Reaching low-intermediate fluency typically takes 6–12 months of consistent practice combined with some active study. The timeline depends heavily on how active you are with vocabulary saving and review — passive watching alone is much slower." } },
    { "@type": "Question", "name": "Should I watch with Spanish or English subtitles first?", "acceptedAnswer": { "@type": "Answer", "text": "Use both at the same time — that's what dual subtitles are for. The Spanish track on top, your native language underneath. This lets you follow the plot while training your ear and eye on the target language simultaneously. Watching with only English subtitles is just watching TV. Watching with only Spanish subtitles is fine once you're already intermediate-level." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LearnSpanishWatchingTvContent />
    </>
  );
}
