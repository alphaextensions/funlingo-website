import type { Metadata } from "next";
import LearnKoreanYouTubeContent from "./content";

export const metadata: Metadata = {
  title: "How to Learn Korean by Watching YouTube: A Complete 2026 Guide",
  description: "Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools to turn every video into a lesson.",
  keywords: "learn korean youtube, learn korean watching youtube, korean youtube channels, korean language learning, dual subtitles korean, korean subtitles youtube, learn korean free",
  alternates: { canonical: "/blog/learn-korean-watching-youtube" },
  openGraph: { title: "How to Learn Korean by Watching YouTube: A Complete 2026 Guide", description: "Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools.", type: "article", url: "/blog/learn-korean-watching-youtube" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Learn Korean by Watching YouTube: A Complete 2026 Guide", "description": "Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-14", "dateModified": "2026-03-14", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can I learn Korean just by watching YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "YouTube is an excellent supplementary tool for Korean learning. While it should not be your only resource, consistent daily watching with active learning strategies can dramatically improve listening, vocabulary, and cultural understanding." } }, { "@type": "Question", "name": "How long does it take to learn Korean from YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "With a consistent 15-minute daily routine using dual subtitles and active vocabulary building, most learners notice significant improvement in listening comprehension within 2 to 3 months." } }, { "@type": "Question", "name": "What are the best Korean YouTube channels for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "For beginners, channels like Talk To Me In Korean, Korean Unnie, and GO! Billy Korean offer structured lessons. For immersion, start with Korean cooking channels and vlogs that use simple, everyday language." } }, { "@type": "Question", "name": "Do I need to learn Hangul before watching Korean YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "Learning Hangul first is recommended and takes only a few hours. It allows you to read Korean subtitles, which significantly accelerates learning. You can still benefit from watching with romanized subtitles, but Hangul is faster." } }, { "@type": "Question", "name": "How do I get Korean dual subtitles on YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "Install the free FunLingo Chrome extension. It adds dual subtitles to YouTube, displaying Korean and your native language simultaneously on any video that has Korean subtitles or captions." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LearnKoreanYouTubeContent />
    </>
  );
}
