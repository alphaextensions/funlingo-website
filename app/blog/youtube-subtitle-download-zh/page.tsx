import type { Metadata } from "next";
import YoutubeSubtitleDownloadZhContent from "./content";

export const metadata: Metadata = {
  title: "YouTube字幕下载 — SRT一键导出指南 (2026)",
  description: "一键下载YouTube字幕为SRT格式。本文介绍多种YouTube字幕下载方法，包括在线工具、浏览器扩展和命令行方案，支持中英文双语字幕导出。",
  keywords: "youtube字幕下载, youtube 字幕下载, youtube字幕导出srt, youtube字幕下载工具, 下载youtube字幕, youtube subtitle download, youtube cc下载, youtube字幕提取, funlingo双语字幕",
  alternates: { canonical: "/blog/youtube-subtitle-download-zh" },
  openGraph: { title: "YouTube字幕下载 — SRT一键导出指南 (2026)", description: "多种YouTube字幕下载方法，支持SRT格式和双语字幕导出。", type: "article", url: "/blog/youtube-subtitle-download-zh" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "YouTube字幕下载 — SRT一键导出指南 (2026)", "description": "多种YouTube字幕下载方法，支持SRT格式导出。", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "YouTube字幕可以下载吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。YouTube的手动字幕和自动生成字幕都可以通过第三方工具下载。常用格式包括SRT、VTT和TXT。也可以使用Funlingo直接在YouTube上显示双语字幕，无需下载。" } }, { "@type": "Question", "name": "如何下载YouTube的中英双语字幕？", "acceptedAnswer": { "@type": "Answer", "text": "可以使用yt-dlp分别下载中文和英文字幕后合并，或使用Funlingo Chrome扩展直接在YouTube上实时显示中英双语字幕，完全免费且无需下载。" } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <YoutubeSubtitleDownloadZhContent />
    </>
  );
}
