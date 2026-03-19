import type { Metadata } from "next";
import NetflixDualSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "How to Get Dual Subtitles on Netflix (Step-by-Step)",
  description: "Learn how to set up Netflix dual subtitles in under 2 minutes. Follow our step-by-step guide to watch Netflix with two languages and accelerate your learning.",
  keywords: "netflix dual subtitles, dual subtitles netflix, netflix two subtitles, netflix language learning subtitles, watch netflix two languages, netflix subtitle extension",
  alternates: { canonical: "/blog/netflix-dual-subtitles" },
  openGraph: { title: "How to Get Dual Subtitles on Netflix (Step-by-Step)", description: "Learn how to set up Netflix dual subtitles in under 2 minutes. Follow our step-by-step guide to watch Netflix with two languages.", type: "article", url: "/blog/netflix-dual-subtitles" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Get Dual Subtitles on Netflix (Step-by-Step)", "description": "Learn how to set up Netflix dual subtitles in under 2 minutes. Follow our step-by-step guide to watch Netflix with two languages and accelerate your learning.", "author": { "@type": "Organization", "name": "FunLingo Team" }, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Are dual subtitles free on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Netflix does not offer dual subtitles natively. However, free Chrome extensions like FunLingo let you add dual subtitles to Netflix at no extra cost beyond your Netflix subscription." } }, { "@type": "Question", "name": "Do all Netflix shows support dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitles work on any Netflix title that has subtitles available in your chosen languages. Most popular shows and movies have subtitles in 10 or more languages, so coverage is excellent." } }, { "@type": "Question", "name": "Can I use dual subtitles on Netflix mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitle extensions only work in the Chrome desktop browser. The Netflix mobile app does not support Chrome extensions. You need to watch Netflix through your desktop browser to use dual subtitles." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NetflixDualSubtitlesContent />
    </>
  );
}
