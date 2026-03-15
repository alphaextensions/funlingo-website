import type { Metadata } from "next";
import BestDualSubtitleExtensionContent from "./content";

export const metadata: Metadata = {
  title: "7 Best Dual Subtitle Extensions for Language Learning (2026)",
  description: "Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video — including one that's completely free.",
  keywords: "best dual subtitle extension, dual subtitle chrome extension, language learning subtitles, dual subtitles netflix, dual subtitles youtube, language reactor alternative, free dual subtitle extension",
  alternates: { canonical: "/blog/best-dual-subtitle-extension" },
  openGraph: { title: "7 Best Dual Subtitle Extensions for Language Learning (2026)", description: "Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video.", type: "article", url: "/blog/best-dual-subtitle-extension" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "7 Best Dual Subtitle Extensions for Language Learning (2026)", "description": "Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-14", "dateModified": "2026-03-14", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is the best free dual subtitle extension?", "acceptedAnswer": { "@type": "Answer", "text": "FunLingo is the best free dual subtitle extension. It supports Netflix, YouTube, and Prime Video with no premium paywall or feature restrictions." } }, { "@type": "Question", "name": "Do dual subtitle extensions work on all streaming platforms?", "acceptedAnswer": { "@type": "Answer", "text": "Most dual subtitle extensions support Netflix and YouTube. FunLingo also supports Amazon Prime Video, making it one of the most versatile options available." } }, { "@type": "Question", "name": "Are dual subtitle extensions safe to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, reputable dual subtitle extensions like FunLingo are safe. Always install extensions from the official Chrome Web Store and check reviews before installing." } }, { "@type": "Question", "name": "Can I use dual subtitles on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitle extensions are currently Chrome-only and work on desktop browsers. Mobile streaming apps do not support Chrome extensions." } }, { "@type": "Question", "name": "What is the difference between dual subtitles and closed captions?", "acceptedAnswer": { "@type": "Answer", "text": "Closed captions show text in one language. Dual subtitles display two languages simultaneously, letting you read the translation alongside the original dialogue." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BestDualSubtitleExtensionContent />
    </>
  );
}
