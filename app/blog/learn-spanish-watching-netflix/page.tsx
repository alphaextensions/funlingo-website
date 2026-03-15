import type { Metadata } from "next";
import LearnSpanishNetflixContent from "./content";

export const metadata: Metadata = {
  title: "How to Learn Spanish Watching Netflix (Your Complete 2026 Guide)",
  description: "Discover the best Netflix shows by level, a proven dual subtitle method, and a free 15-minute daily routine to learn Spanish. Start tonight.",
  keywords: "learn spanish netflix, learn spanish watching netflix, best netflix shows spanish, spanish dual subtitles, netflix spanish learning, spanish language learning netflix",
  alternates: { canonical: "/blog/learn-spanish-watching-netflix" },
  openGraph: { title: "How to Learn Spanish Watching Netflix (Your Complete 2026 Guide)", description: "Discover the best Netflix shows by level, a proven dual subtitle method, and a free 15-minute daily routine to learn Spanish.", type: "article", url: "/blog/learn-spanish-watching-netflix" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Learn Spanish Watching Netflix (Your Complete 2026 Guide)", "description": "Discover the best Netflix shows by level, a proven dual subtitle method, and a free 15-minute daily routine to learn Spanish.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-14", "dateModified": "2026-03-14", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can I really learn Spanish by watching Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Watching Netflix with dual subtitles provides comprehensible input, which research shows is one of the most effective ways to acquire a language. It builds listening skills, vocabulary, and cultural understanding simultaneously." } }, { "@type": "Question", "name": "What are the best Netflix shows for learning Spanish?", "acceptedAnswer": { "@type": "Answer", "text": "For beginners, try animated shows or Extra en Español. Intermediate learners benefit from La Casa de Papel, Elite, or Club de Cuervos. Advanced learners can tackle Narcos, Vis a Vis, or El Marginal." } }, { "@type": "Question", "name": "Should I watch with Spanish or English subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Neither alone is ideal. Use dual subtitles to see both Spanish and English simultaneously. This way you train your reading and listening in Spanish while maintaining full comprehension through the English translation." } }, { "@type": "Question", "name": "How many hours of Netflix do I need to learn Spanish?", "acceptedAnswer": { "@type": "Answer", "text": "Consistency matters more than hours. Watching 15 to 30 minutes daily with active learning strategies like dual subtitles and vocabulary saving is more effective than occasional binge sessions." } }, { "@type": "Question", "name": "What is the difference between Spain Spanish and Latin American Spanish on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Spain Spanish (Castilian) and Latin American Spanish differ in pronunciation, vocabulary, and some grammar. Netflix labels these separately. Choose based on your goals, but both are mutually intelligible." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LearnSpanishNetflixContent />
    </>
  );
}
