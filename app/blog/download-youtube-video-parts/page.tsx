import type { Metadata } from "next";
import DownloadYoutubeVideoPartsContent from "./content";

export const metadata: Metadata = {
  title: "How to Download YouTube Videos (Specific Parts Only)",
  description: "Learn how to download specific parts of YouTube videos using online clip tools, screen recording, yt-dlp, and browser editors. Perfect for language study clips and reference material.",
  keywords: "download youtube video part of video, download part of youtube video, youtube clip download, download youtube segment, youtube video cutter, yt-dlp timestamps, language learning clips",
  alternates: { canonical: "/blog/download-youtube-video-parts" },
  openGraph: { title: "How to Download YouTube Videos (Specific Parts Only)", description: "Learn how to download specific parts of YouTube videos using online clip tools, screen recording, yt-dlp, and browser editors.", type: "article", url: "/blog/download-youtube-video-parts" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Download YouTube Videos (Specific Parts Only)", "description": "Learn how to download specific parts of YouTube videos using online clip tools, screen recording, yt-dlp, and browser editors.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Is it legal to download parts of YouTube videos?", "acceptedAnswer": { "@type": "Answer", "text": "Downloading YouTube videos for personal, non-commercial use is generally tolerated, but it does violate YouTube's Terms of Service. Fair use may apply for educational purposes, commentary, or criticism. Always respect copyright and never redistribute downloaded content without permission." } }, { "@type": "Question", "name": "What is the best quality format for downloading YouTube clips?", "acceptedAnswer": { "@type": "Answer", "text": "MP4 with H.264 encoding is the most universally compatible format. For the highest quality, choose 1080p or 4K if available. If you only need audio, MP3 at 320kbps or M4A offers excellent quality at a smaller file size." } }, { "@type": "Question", "name": "Can I download just the audio from a YouTube video?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Tools like yt-dlp let you extract audio only using the -x flag. Online tools like YTCutter also offer an audio-only download option. This is useful for creating listening practice material for language learning." } }, { "@type": "Question", "name": "How do I download a YouTube clip with subtitles included?", "acceptedAnswer": { "@type": "Answer", "text": "Screen recording is the easiest way to capture a clip with subtitles visible. Alternatively, yt-dlp can download subtitle files alongside video, which you can then embed using a tool like HandBrake or VLC." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DownloadYoutubeVideoPartsContent />
    </>
  );
}
