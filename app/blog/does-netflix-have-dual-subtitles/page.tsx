import type { Metadata } from "next";
import DoesNetflixHaveDualSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "Does Netflix Have Dual Subtitles? (2026 Answer + Free Fix)",
  description: "Netflix does not have a built-in dual subtitle feature. But you can add dual subtitles for free in 30 seconds with a Chrome extension. Here's how.",
  keywords: "does netflix have dual subtitles, netflix dual subtitles, netflix two subtitles, dual subtitles on netflix, netflix language learning subtitles",
  alternates: { canonical: "/blog/does-netflix-have-dual-subtitles" },
  openGraph: { title: "Does Netflix Have Dual Subtitles? (2026 Answer + Free Fix)", description: "Netflix does not have a built-in dual subtitle feature. But you can add dual subtitles for free in 30 seconds with a Chrome extension. Here's how.", type: "article", url: "/blog/does-netflix-have-dual-subtitles" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Does Netflix Have Dual Subtitles? (2026 Answer + Free Fix)", "description": "Netflix does not have a built-in dual subtitle feature. But you can add dual subtitles for free in 30 seconds with a Chrome extension. Here's how.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-04-18", "dateModified": "2026-04-18", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Does Netflix support dual subtitles natively?", "acceptedAnswer": { "@type": "Answer", "text": "No. Netflix only allows one subtitle language at a time. To display two subtitle languages simultaneously, you need a free Chrome extension like Funlingo." } }, { "@type": "Question", "name": "How do I get dual subtitles on Netflix for free?", "acceptedAnswer": { "@type": "Answer", "text": "Install the free Funlingo Chrome extension, open Netflix in Chrome, play any show or movie, and toggle on dual subtitles. The entire setup takes about 30 seconds." } }, { "@type": "Question", "name": "Do dual subtitles work on the Netflix app?", "acceptedAnswer": { "@type": "Answer", "text": "No. Dual subtitle extensions only work in the Chrome desktop browser. The Netflix mobile app, smart TV apps, and tablet apps do not support browser extensions." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DoesNetflixHaveDualSubtitlesContent />
    </>
  );
}
