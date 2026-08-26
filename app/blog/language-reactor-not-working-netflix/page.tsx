import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "Language Reactor Not Working on Netflix? Fixes + the Best Free Alternative (2026)",
  description: "Language Reactor stopped showing dual subtitles on Netflix? Work through the common fixes in order, then see why Funlingo is the best free alternative.",
  keywords: "language reactor not working, language reactor netflix, language reactor dual subtitles fix, language reactor alternative, netflix dual subtitles not showing, free language reactor alternative",
  alternates: {
    canonical: "/blog/language-reactor-not-working-netflix",
  },
  openGraph: {
    title: "Language Reactor Not Working on Netflix? Fixes + the Best Free Alternative (2026)",
    description: "Language Reactor stopped showing dual subtitles on Netflix? Work through the common fixes in order, then see why Funlingo is the best free alternative.",
    type: "article",
    url: "/blog/language-reactor-not-working-netflix",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Why did Language Reactor stop working on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Most often the extension is out of date after Netflix updated its player, or your browser is serving a stale cached version of the player. Update Language Reactor in chrome://extensions, then hard-refresh the Netflix tab with Ctrl/Cmd+Shift+R and restart your browser. Clearing Netflix's cache and cookies resolves most of the remaining cases." } },
    { "@type": "Question", "name": "How do I fix dual subtitles not showing on Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Work through the fixes in order: update the extension, hard-refresh and restart the browser, clear cache and cookies, disable conflicting subtitle or ad-block extensions, confirm the title actually offers your target-language subtitle track, re-login to Pro if you use it, and as a last resort remove and reinstall the extension. Change one thing at a time so you know which fix worked." } },
    { "@type": "Question", "name": "Could another extension be conflicting with Language Reactor?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Other subtitle tools, translation add-ons, or ad-blockers can overlap the Netflix player and stop dual subtitles or word-clicking from working. Temporarily disable your other extensions, confirm Language Reactor works again, then re-enable them one by one to find the one that clashes." } },
    { "@type": "Question", "name": "Is there a free alternative to Language Reactor for Netflix?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Funlingo is a free Chrome extension that adds dual subtitles to Netflix, and it works on YouTube and Amazon Prime Video too. Unlike Language Reactor's Pro plan at around $7.99/mo, Funlingo has no paid tier gating its core features and no monthly quota. It includes click-to-translate, per-word pronunciation, AI grammar notes, and save-to-vocabulary across 100+ languages." } },
    { "@type": "Question", "name": "Does Funlingo work on Amazon Prime Video too?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — this is one of the biggest differences. Language Reactor supports Netflix and YouTube only, while Funlingo adds dual subtitles to Netflix, YouTube, and Amazon Prime Video, keeping the same click-to-translate and save-to-vocab workflow across all three platforms." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Language Reactor Not Working on Netflix? Fixes + the Best Free Alternative (2026)",
  "description": "Language Reactor stopped showing dual subtitles on Netflix? Work through the common fixes in order, then see why Funlingo is the best free alternative.",
  "author": { "@type": "Organization", "name": "Funlingo" },
  "datePublished": "2026-08-16",
  "dateModified": "2026-08-16",
  "image": "https://getfunlingo.com/og-image.jpg"
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostContent />
    </>
  );
}
