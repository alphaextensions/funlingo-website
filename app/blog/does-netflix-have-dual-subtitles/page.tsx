import type { Metadata } from "next";
import DoesNetflixHaveDualSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "Does Netflix Have Dual Subtitles? (2026 Quick Answer)",
  description: "Short answer: no, Netflix doesn't support dual subtitles natively. Here's the full explanation, plus how to add them for free in 30 seconds with a Chrome extension.",
  keywords: "does netflix have dual subtitles, netflix dual subtitles, can netflix show two subtitles, netflix two language subtitles, dual subtitles netflix free, netflix subtitle feature",
  alternates: { canonical: "/blog/does-netflix-have-dual-subtitles" },
  openGraph: {
    title: "Does Netflix Have Dual Subtitles? (2026 Quick Answer)",
    description: "Short answer: no, Netflix doesn't support dual subtitles natively. Here's the full explanation, plus how to add them for free in 30 seconds.",
    type: "article",
    url: "/blog/does-netflix-have-dual-subtitles",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Does Netflix Have Dual Subtitles? (2026 Quick Answer)",
  "description": "Short answer: no, Netflix doesn't support dual subtitles natively. Here's how to add them for free in 30 seconds with a Chrome extension.",
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
    { "@type": "Question", "name": "Does Netflix have dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "No, Netflix does not have a built-in dual subtitle feature. The native Netflix player only allows one subtitle language at a time. To get two subtitle languages on screen simultaneously, you need a free Chrome extension like Funlingo, which overlays a second subtitle line on top of the player. Setup takes about 30 seconds." } },
    { "@type": "Question", "name": "Can I add dual subtitles to Netflix for free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Funlingo is a free Chrome extension that adds dual subtitles to Netflix at no cost beyond your existing Netflix subscription. There is no premium tier and no account required. The extension works on any Netflix title that has subtitles available in your chosen languages." } },
    { "@type": "Question", "name": "Do dual subtitles work on the Netflix mobile app?", "acceptedAnswer": { "@type": "Answer", "text": "No. Dual subtitle extensions are Chrome browser add-ons and only run on desktop. The Netflix mobile app, smart TV apps, and game console apps do not support browser extensions. To watch on a TV with dual subtitles, cast Chrome from your laptop using a Chromecast or HDMI cable." } },
    { "@type": "Question", "name": "Does Netflix plan to add dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "As of 2026, Netflix has not announced any plans to add native dual subtitle support. Language learners have requested the feature for years, but it remains a third-party extension use case. Funlingo and similar extensions fill the gap reliably and free of charge." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DoesNetflixHaveDualSubtitlesContent />
    </>
  );
}
