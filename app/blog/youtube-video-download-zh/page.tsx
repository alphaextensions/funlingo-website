import type { Metadata } from "next";
import YoutubeVideoDownloadZhContent from "./content";

export const metadata: Metadata = {
  title: "油管视频下载 — 高清无水印保存方法 (2026)",
  description: "最新油管(YouTube)视频下载方法，支持高清1080P/4K无水印保存。包括在线工具、浏览器扩展和命令行方案，电脑和手机都能用。",
  keywords: "油管视频下载, youtube视频下载, 油管下载, youtube下载工具, 油管视频保存, 高清视频下载, youtube下载器, 免费下载油管视频, 油管视频下载方法, funlingo",
  alternates: { canonical: "/blog/youtube-video-download-zh" },
  openGraph: { title: "油管视频下载 — 高清无水印保存方法 (2026)", description: "最新油管视频下载方法，支持高清无水印保存。", type: "article", url: "/blog/youtube-video-download-zh" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "油管视频下载 — 高清无水印保存方法 (2026)", "description": "最新油管视频下载方法，支持高清无水印保存。", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "油管视频怎么下载到手机？", "acceptedAnswer": { "@type": "Answer", "text": "在手机上下载油管视频，可以使用在线工具如y2mate或savefrom.net。复制视频链接，粘贴到网站，选择分辨率后下载。Android用户可直接保存，iOS用户可先保存到文件App再转存相册。" } }, { "@type": "Question", "name": "有没有免费的油管视频下载工具？", "acceptedAnswer": { "@type": "Answer", "text": "有很多免费工具：在线工具推荐y2mate、savefrom.net；桌面软件推荐yt-dlp（开源免费）；浏览器扩展推荐Video DownloadHelper。如果只是想学习视频内容，推荐使用Funlingo免费双语字幕扩展，无需下载即可在线学习。" } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <YoutubeVideoDownloadZhContent />
    </>
  );
}
