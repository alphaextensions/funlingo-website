import type { Metadata } from "next";
import BestSubtitleDownloadSitesContent from "./content";

export const metadata: Metadata = {
  title: "Best Subtitle Download Sites — Top 15 for Any Language",
  description: "Discover the 15 best subtitle download sites for movies, TV shows, and YouTube videos. Compare OpenSubtitles, Subscene, YIFY, and more — with safety tips, supported formats, and a no-download alternative for language learners.",
  keywords: "subtitles download, subtitle download sites, download subtitles, best subtitle sites, opensubtitles, subscene, yify subtitles, srt download, subtitle files, dual subtitles, language learning subtitles",
  alternates: { canonical: "/blog/best-subtitle-download-sites" },
  openGraph: { title: "Best Subtitle Download Sites — Top 15 for Any Language", description: "Compare the top 15 subtitle download sites: formats, languages, pros & cons, safety tips, and a modern alternative that needs no downloads.", type: "article", url: "/blog/best-subtitle-download-sites" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Best Subtitle Download Sites — Top 15 for Any Language", "description": "Compare the top 15 subtitle download sites: formats, languages, pros & cons, safety tips, and a modern alternative that needs no downloads.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-20", "dateModified": "2026-03-20", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Are subtitle download sites legal?", "acceptedAnswer": { "@type": "Answer", "text": "Downloading subtitles for content you legally own or have access to is generally considered legal in most jurisdictions. Subtitle files are text transcriptions, not the copyrighted video content itself. However, distributing subtitles for pirated content can be a legal gray area. Stick to subtitles for content you have legitimately purchased or subscribed to." } }, { "@type": "Question", "name": "What is the safest subtitle download site?", "acceptedAnswer": { "@type": "Answer", "text": "OpenSubtitles.org is widely regarded as the safest and most reputable subtitle download site. It has a large community, moderated uploads, and an official API. Podnapisi.net is another safe option with a clean interface and minimal ads. Always use an ad blocker and avoid clicking pop-ups on any subtitle site." } }, { "@type": "Question", "name": "What subtitle format is best?", "acceptedAnswer": { "@type": "Answer", "text": "SRT (.srt) is the most universally compatible subtitle format and works with virtually every media player, video editor, and platform. WebVTT (.vtt) is best for web-based video players. ASS/SSA is preferred when you need advanced styling like custom fonts and colors. For most users, SRT is the safest choice." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BestSubtitleDownloadSitesContent />
    </>
  );
}
