import type { Metadata } from "next";
import BestYoutubeSubtitleDownloadersContent from "./content";

export const metadata: Metadata = {
  title: "Best YouTube Subtitle Downloaders — Top 10 Tools Compared",
  description: "Compare the 10 best YouTube subtitle downloaders in 2026. Download subtitles in SRT, VTT, and TXT formats. Free and paid options compared with pros and cons.",
  keywords: "youtube subtitles downloader, download youtube subtitles, youtube subtitle download, youtube captions download, srt download youtube, best subtitle downloader",
  alternates: { canonical: "/blog/best-youtube-subtitle-downloaders" },
  openGraph: { title: "Best YouTube Subtitle Downloaders — Top 10 Tools Compared", description: "Compare the 10 best YouTube subtitle downloaders in 2026. Free and paid options with pros and cons.", type: "article", url: "/blog/best-youtube-subtitle-downloaders" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Best YouTube Subtitle Downloaders — Top 10 Tools Compared", "description": "Compare the 10 best YouTube subtitle downloaders in 2026. Free and paid options with pros and cons.", "author": { "@type": "Organization", "name": "FunLingo Team" }, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is the best free YouTube subtitle downloader?", "acceptedAnswer": { "@type": "Answer", "text": "DownSub is the best free YouTube subtitle downloader for most users. It works directly in your browser, requires no installation, and supports SRT and TXT formats. For command-line users, yt-dlp offers the most powerful and flexible subtitle downloading capabilities." } }, { "@type": "Question", "name": "Can you download auto-generated subtitles from YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, most subtitle downloaders including DownSub, SaveSubs, and yt-dlp can download both manual and auto-generated subtitles from YouTube. Auto-generated subtitles may contain errors since they are created by speech recognition." } }, { "@type": "Question", "name": "What format should I download YouTube subtitles in?", "acceptedAnswer": { "@type": "Answer", "text": "SRT is the most widely supported subtitle format and works with virtually all media players and video editors. Use VTT if you need web-compatible subtitles. Use TXT if you just need a plain text transcript without timestamps." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BestYoutubeSubtitleDownloadersContent />
    </>
  );
}
