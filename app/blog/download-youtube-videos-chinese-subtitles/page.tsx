import type { Metadata } from "next";
import DownloadYoutubeVideosChineseSubtitlesContent from "./content";

export const metadata: Metadata = {
  title: "Download YouTube Videos with Chinese Subtitles (2026 Guide)",
  description: "Step-by-step guide to downloading YouTube videos with Chinese subtitles. 3 free methods for saving videos with Chinese captions for offline language learning.",
  keywords: "youtube视频在线下载, download youtube videos chinese subtitles, youtube chinese subtitles download, save youtube video with subtitles, youtube video downloader chinese, learn chinese youtube videos, chinese subtitle download, funlingo chinese subtitles",
  alternates: { canonical: "/blog/download-youtube-videos-chinese-subtitles" },
  openGraph: { title: "Download YouTube Videos with Chinese Subtitles (2026 Guide)", description: "3 free methods to download YouTube videos with Chinese subtitles for offline learning.", type: "article", url: "/blog/download-youtube-videos-chinese-subtitles" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Download YouTube Videos with Chinese Subtitles (2026 Guide)", "description": "Step-by-step guide to downloading YouTube videos with Chinese subtitles.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "How do I download YouTube videos with Chinese subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "You can use tools like yt-dlp with the --write-sub flag, online services like SaveSubs, or browser extensions. For real-time Chinese learning without downloading, Funlingo provides free dual subtitles (Chinese + your language) directly on YouTube." } }, { "@type": "Question", "name": "Can I watch YouTube with Chinese and English subtitles at the same time?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Funlingo is a free Chrome extension that displays dual subtitles on YouTube — Chinese and English (or any language pair) simultaneously. No downloading required." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DownloadYoutubeVideosChineseSubtitlesContent />
    </>
  );
}
