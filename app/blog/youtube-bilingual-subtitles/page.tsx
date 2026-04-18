import type { Metadata } from "next";
import YoutubeBilingualSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "YouTube Bilingual Subtitles: Watch Videos in Two Languages",
  description: "Learn how to get bilingual subtitles on YouTube. Watch videos with two languages displayed at once and turn YouTube into a free language learning tool.",
  keywords: "youtube bilingual subtitles, youtube two language subtitles, youtube dual subtitles, bilingual captions youtube, youtube language learning subtitles, watch youtube two languages",
  alternates: { canonical: "/blog/youtube-bilingual-subtitles" },
  openGraph: { title: "YouTube Bilingual Subtitles: Watch Videos in Two Languages", description: "Learn how to get bilingual subtitles on YouTube. Watch videos with two languages displayed at once.", type: "article", url: "/blog/youtube-bilingual-subtitles" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "YouTube Bilingual Subtitles: Watch Videos in Two Languages", "description": "Learn how to get bilingual subtitles on YouTube. Watch videos with two languages displayed at once and turn YouTube into a free language learning tool.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Does YouTube have built-in bilingual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "No. YouTube only displays one subtitle track at a time. To get bilingual subtitles on YouTube, you need a browser extension like Funlingo that overlays a second subtitle track on the video player." } }, { "@type": "Question", "name": "What languages are supported for YouTube bilingual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo supports all languages that YouTube offers subtitles for, including auto-generated and manually uploaded captions. This covers over 100 languages." } }, { "@type": "Question", "name": "Can I customize the appearance of bilingual subtitles on YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. With Funlingo, you can adjust font size, subtitle position, and opacity for both subtitle tracks. You can also choose which language appears on top and which appears on the bottom." } }] };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", "name": "How to Get Bilingual Subtitles on YouTube", "description": "Watch any YouTube video with two languages displayed simultaneously using a free browser extension.", "totalTime": "PT2M", "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" }, "tool": [{ "@type": "HowToTool", "name": "Chrome browser" }, { "@type": "HowToTool", "name": "Funlingo Chrome extension" }], "step": [{ "@type": "HowToStep", "name": "Install the Funlingo Extension", "text": "Go to the Chrome Web Store and install the free Funlingo extension." }, { "@type": "HowToStep", "name": "Open a YouTube Video", "text": "Navigate to any YouTube video that has subtitles available in your target languages." }, { "@type": "HowToStep", "name": "Enable Bilingual Subtitles", "text": "Click the Funlingo icon and toggle on dual subtitles. Select your native and target languages." }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <YoutubeBilingualSubtitlesContent />
    </>
  );
}
