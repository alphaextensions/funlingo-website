import type { Metadata } from "next";
import NetflixDualSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "How to Get Dual Subtitles on Netflix — Free Setup in 30 Seconds (2026)",
  description: "Netflix doesn't support dual subtitles natively — but you can add them for free in 30 seconds with a Chrome extension. Step-by-step guide with troubleshooting tips and the best extensions compared.",
  keywords: "netflix dual subtitles, dual subtitles netflix, netflix two subtitles, netflix language learning subtitles, watch netflix two languages, netflix subtitle extension, does netflix have dual subtitles, netflix dual subtitles chrome extension",
  alternates: { canonical: "/blog/netflix-dual-subtitles" },
  openGraph: { title: "How to Get Dual Subtitles on Netflix — Free Setup in 30 Seconds (2026)", description: "Netflix doesn't support dual subtitles natively — but you can add them for free in 30 seconds with a Chrome extension. Step-by-step guide with troubleshooting tips and the best extensions compared.", type: "article", url: "/blog/netflix-dual-subtitles" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Get Dual Subtitles on Netflix (Free, 30-Second Setup)", "description": "Netflix doesn't support dual subtitles natively — but you can add them for free in 30 seconds with a Chrome extension. Step-by-step guide with troubleshooting tips and the best extensions compared.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", "name": "How to Get Dual Subtitles on Netflix", "description": "Set up dual subtitles on Netflix in under 30 seconds using the free Funlingo Chrome extension.", "totalTime": "PT2M", "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" }, "tool": [{ "@type": "HowToTool", "name": "Chrome browser" }, { "@type": "HowToTool", "name": "Funlingo Chrome extension" }], "step": [{ "@type": "HowToStep", "name": "Install the Funlingo Extension", "text": "Open Chrome and go to the Funlingo Chrome Web Store page. Click Add to Chrome and confirm the installation.", "url": "https://getfunlingo.com/blog/netflix-dual-subtitles#step-1" }, { "@type": "HowToStep", "name": "Open Netflix in Chrome", "text": "Navigate to netflix.com in your Chrome browser and sign in to your account.", "url": "https://getfunlingo.com/blog/netflix-dual-subtitles#step-2" }, { "@type": "HowToStep", "name": "Pick a Show or Movie", "text": "Choose a Netflix title that has subtitles available in your target language and start playing it.", "url": "https://getfunlingo.com/blog/netflix-dual-subtitles#step-3" }, { "@type": "HowToStep", "name": "Enable Dual Subtitles", "text": "Click the Funlingo icon in your Chrome toolbar or the Netflix player controls. Toggle on dual subtitles.", "url": "https://getfunlingo.com/blog/netflix-dual-subtitles#step-4" }, { "@type": "HowToStep", "name": "Configure Your Languages", "text": "Select your target language and native language in the Funlingo settings panel. Both subtitle tracks will now appear on screen.", "url": "https://getfunlingo.com/blog/netflix-dual-subtitles#step-5" }] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Are dual subtitles free on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Netflix does not offer dual subtitles natively. However, free Chrome extensions like Funlingo let you add dual subtitles to Netflix at no extra cost beyond your Netflix subscription." } }, { "@type": "Question", "name": "Do all Netflix shows support dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitles work on any Netflix title that has subtitles available in your chosen languages. Most popular shows and movies have subtitles in 10 or more languages, so coverage is excellent." } }, { "@type": "Question", "name": "Can I use dual subtitles on Netflix mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitle extensions only work in the Chrome desktop browser. The Netflix mobile app does not support Chrome extensions. You need to watch Netflix through your desktop browser to use dual subtitles." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NetflixDualSubtitlesContent />
    </>
  );
}
