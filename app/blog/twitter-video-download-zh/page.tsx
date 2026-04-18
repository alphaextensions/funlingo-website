import type { Metadata } from "next";
import TwitterVideoDownloadZhContent from "./content";

export const metadata: Metadata = {
  title: "推特视频下载 — 3种免费保存方法 (2026)",
  description: "如何免费下载推特(X)视频？本文介绍3种最简单的推特视频下载方法，包括在线工具、浏览器扩展和手机端方案，支持高清无水印保存。",
  robots: { index: false, follow: true },
  keywords: "推特视频下载, twitter视频下载, x视频下载, 推特视频保存, 推特视频下载器, 免费下载推特视频, twitter video download, 推特下载工具, 推特视频在线下载, funlingo",
  alternates: { canonical: "/blog/twitter-video-download-zh" },
  openGraph: { title: "推特视频下载 — 3种免费保存方法 (2026)", description: "3种最简单的推特视频下载方法，支持高清无水印保存。", type: "article", url: "/blog/twitter-video-download-zh" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "推特视频下载 — 3种免费保存方法 (2026)", "description": "3种最简单的推特视频下载方法，支持高清无水印保存。", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "推特视频可以免费下载吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。本文介绍的3种方法都是完全免费的，包括在线下载工具、浏览器扩展和yt-dlp命令行工具。大部分支持高清和无水印下载。" } }, { "@type": "Question", "name": "如何下载推特视频到手机？", "acceptedAnswer": { "@type": "Answer", "text": "在手机上，可以使用在线工具如SaveTweetVid或TWDown。复制推特视频链接，粘贴到网站，选择清晰度后即可下载保存到相册。iOS用户可能需要先保存到文件再转存相册。" } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TwitterVideoDownloadZhContent />
    </>
  );
}
