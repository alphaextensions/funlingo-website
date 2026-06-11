import type { Metadata } from "next";
import LearnJapaneseWithCrunchyrollContent from "./content";

export const metadata: Metadata = {
  title: "Learn Japanese on Crunchyroll: Free Dual Subtitles Guide",
  description: "Learn Japanese with anime using free dual subtitles and click-to-translate on Crunchyroll. Turn every episode into a lesson — try Funlingo free.",
  keywords: "crunchyroll dual subtitles, crunchyroll japanese subtitles, best anime to learn japanese on crunchyroll, learn japanese with anime, best slice of life anime to learn japanese",
  alternates: { canonical: "/blog/learn-japanese-with-crunchyroll" },
  openGraph: { title: "Learn Japanese on Crunchyroll: Free Dual Subtitles Guide", description: "Learn Japanese with anime using free dual subtitles and click-to-translate on Crunchyroll. Turn every episode into a lesson — try Funlingo free.", type: "article", url: "/blog/learn-japanese-with-crunchyroll" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Learn Japanese on Crunchyroll: Free Dual Subtitles Guide", "description": "Learn Japanese with anime using free dual subtitles and click-to-translate on Crunchyroll. Turn every episode into a lesson — try Funlingo free.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-06-11", "dateModified": "2026-06-11", "image": "https://getfunlingo.com/blog-images/learn-japanese-with-crunchyroll-hero.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Does Crunchyroll have Japanese subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Crunchyroll streams anime in original Japanese audio, but its built-in subtitle menu is geared toward translated languages like English rather than native Japanese captions. For most titles you will not find an official Japanese-subtitle track in the player. To study with Japanese text you add a free tool like Funlingo, which overlays a Japanese subtitle line alongside your own language so you can read both at once while you watch." } }, { "@type": "Question", "name": "Can you get dual subtitles on Crunchyroll?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Crunchyroll does not offer dual subtitles natively, but the free Funlingo Chrome extension adds them. It shows the Japanese line and an English (or other-language) line at the same time directly on the Crunchyroll player, and lets you click any word in the subtitles for an instant definition, reading, and meaning in context. There is no paid tier for the core dual-subtitle experience." } }, { "@type": "Question", "name": "What is the best anime to learn Japanese?", "acceptedAnswer": { "@type": "Answer", "text": "The best anime to learn Japanese are slice-of-life and everyday-setting shows where characters speak in natural, modern, conversational Japanese. Beginner-friendly picks include slice-of-life and school comedies with clear, slow speech; intermediate learners can move to romance and workplace stories; advanced learners can handle action, fantasy, and shows with dense vocabulary. Choose titles you genuinely enjoy and rewatch, since repetition is what makes the vocabulary stick." } }, { "@type": "Question", "name": "Is anime good for learning Japanese?", "acceptedAnswer": { "@type": "Answer", "text": "Anime is an excellent supplement for learning Japanese because it delivers large amounts of native audio with emotion, context, and visuals that make meaning easy to infer. It is best paired with a structured base in grammar and kanji, and with dual subtitles plus click-to-translate so you actually absorb the words rather than just reading a translation. Used that way, every episode becomes listening practice and vocabulary input at the same time." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LearnJapaneseWithCrunchyrollContent />
    </>
  );
}
