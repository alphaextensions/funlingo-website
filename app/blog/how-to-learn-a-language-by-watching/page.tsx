import type { Metadata } from "next";
import LearnByWatchingContent from "./content";

export const metadata: Metadata = {
  title: "How to Learn a Language by Watching (Step-by-Step Guide)",
  description: "Learn how to effectively learn a language by watching using structured methods, contextual learning, and subtitle strategies that actually improve retention.",
  keywords: "learn language by watching, language learning Netflix, dual subtitles, active watching, language immersion, Funlingo",
  alternates: { canonical: "/blog/how-to-learn-a-language-by-watching" },
  openGraph: { title: "How to Learn a Language by Watching (Step-by-Step Guide)", description: "Learn how to effectively learn a language by watching using structured methods.", type: "article", url: "/blog/how-to-learn-a-language-by-watching" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Learn a Language by Watching (Without Wasting Your Time)", "description": "Learn how to effectively learn a language by watching using structured methods, contextual learning, and subtitle strategies that actually improve retention.", "author": { "@type": "Person", "name": "Funlingo Team" }, "datePublished": "2026-02-21", "dateModified": "2026-02-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <LearnByWatchingContent />
    </>
  );
}
