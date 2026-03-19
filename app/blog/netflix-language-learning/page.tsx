import type { Metadata } from "next";
import NetflixLanguageLearningContent from "./content";

export const metadata: Metadata = {
  title: "Netflix Language Learning: The Complete Guide for 2026",
  description: "Learn how to use Netflix for language learning in 2026. Covers dual subtitles, best shows by language, daily routines, and tools like FunLingo to accelerate fluency.",
  keywords: "netflix language learning, learn language with netflix, netflix dual subtitles, best netflix shows for language learning, netflix language learning tools, learn spanish netflix, learn french netflix, learn korean netflix",
  alternates: { canonical: "/blog/netflix-language-learning" },
  openGraph: { title: "Netflix Language Learning: The Complete Guide for 2026", description: "Learn how to use Netflix for language learning in 2026. Covers dual subtitles, best shows by language, daily routines, and tools to accelerate fluency.", type: "article", url: "/blog/netflix-language-learning" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Netflix Language Learning: The Complete Guide for 2026", "description": "Learn how to use Netflix for language learning in 2026. Covers dual subtitles, best shows by language, daily routines, and tools to accelerate fluency.", "author": { "@type": "Organization", "name": "FunLingo Team" }, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can you really learn a language from Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Netflix is an effective language learning tool when used strategically. Research on comprehensible input shows that consuming native media with subtitles builds vocabulary, listening skills, and natural grammar intuition. Netflix provides thousands of hours of authentic content across dozens of languages, making it one of the best immersion resources available." } }, { "@type": "Question", "name": "What's the best Netflix show for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "For beginners, shows with simple dialogue and everyday situations work best. For Spanish, try Extra (a sitcom designed for learners). For French, try Lupin (clear Parisian French). For Korean, try My Love from the Star (slower-paced romantic drama). For Japanese, try Terrace House (natural conversational Japanese). Choose shows you genuinely enjoy to stay motivated." } }, { "@type": "Question", "name": "Do you need subtitles on or off when learning a language on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on your level. Beginners should use dual subtitles (target language plus native language) to build comprehension. Intermediate learners benefit from target-language-only subtitles. Advanced learners can try watching without subtitles. The dual subtitle method with a tool like FunLingo is the most effective approach for most learners." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NetflixLanguageLearningContent />
    </>
  );
}
