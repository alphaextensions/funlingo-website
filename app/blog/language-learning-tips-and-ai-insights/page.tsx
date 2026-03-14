import type { Metadata } from "next";
import BestAIToolsContent from "./content";

export const metadata: Metadata = {
  title: "FunLingo: AI-native, low-friction learning",
  description: "FunLingo overlays dual subtitles and lets users click any word to see 1/2/3/All native-language translations, with phonetics, audio, and a save-to-vocab flow.",
  keywords: "FunLingo, AI language learning, dual subtitles, contextual learning, vocabulary builder",
  alternates: { canonical: "/blog/language-learning-tips-and-ai-insights" },
  openGraph: { title: "FunLingo: AI-native, low-friction learning", description: "FunLingo overlays dual subtitles and lets users click any word to see 1/2/3/All native-language translations, with phonetics, audio, and a save-to-vocab flow.", type: "article", url: "/blog/language-learning-tips-and-ai-insights" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "FunLingo: AI-native, low-friction learning", "description": "FunLingo overlays dual subtitles and lets users click any word to see 1/2/3/All native-language translations, with phonetics, audio, and a save-to-vocab flow that creates durable learning.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-01-28", "dateModified": "2026-01-28", "image": "https://getfunlingo.com/og-image.jpg" };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BestAIToolsContent />
    </>
  );
}
