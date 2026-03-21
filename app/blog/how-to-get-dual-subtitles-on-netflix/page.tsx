import type { Metadata } from "next";
import HowToGetDualSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "How to Get Dual Subtitles on Netflix (2026 Guide)",
  description: "Want dual subtitles on Netflix? Learn how to display two languages at once with Funlingo's free Chrome extension. Step-by-step setup in under 30 seconds.",
  keywords: "dual subtitles netflix, two subtitles netflix, netflix two languages subtitles, how to get dual subtitles, netflix language learning, netflix dual subtitle extension",
  alternates: { canonical: "/blog/how-to-get-dual-subtitles-on-netflix" },
  openGraph: { title: "How to Get Dual Subtitles on Netflix (2026 Guide)", description: "Want dual subtitles on Netflix? Learn how to display two languages at once with Funlingo's free Chrome extension.", type: "article", url: "/blog/how-to-get-dual-subtitles-on-netflix" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Get Dual Subtitles on Netflix (2026 Guide)", "description": "Want dual subtitles on Netflix? Learn how to display two languages at once with Funlingo's free Chrome extension.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-14", "dateModified": "2026-03-14", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Can Netflix show two subtitles at once?", "acceptedAnswer": { "@type": "Answer", "text": "Netflix does not natively support dual subtitles. However, you can use a free Chrome extension like Funlingo to display two subtitle languages simultaneously." } }, { "@type": "Question", "name": "Is Funlingo free for Netflix dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Funlingo is completely free. There is no premium tier or trial period. All features, including dual subtitles on Netflix, are available at no cost." } }, { "@type": "Question", "name": "Does this work on the Netflix app?", "acceptedAnswer": { "@type": "Answer", "text": "No, dual subtitle extensions only work when watching Netflix through the Chrome browser on a desktop or laptop computer. They do not work on the Netflix mobile or TV app." } }, { "@type": "Question", "name": "Which languages does Funlingo support on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Funlingo supports all subtitle languages that Netflix provides. You can pair any two available languages as your dual subtitles." } }, { "@type": "Question", "name": "Will dual subtitles slow down my Netflix streaming?", "acceptedAnswer": { "@type": "Answer", "text": "No. Funlingo is lightweight and does not affect video playback performance or streaming quality." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToGetDualSubtitlesContent />
    </>
  );
}
