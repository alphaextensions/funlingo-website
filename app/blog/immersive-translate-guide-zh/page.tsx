import type { Metadata } from "next";
import ImmersiveTranslateGuideZhContent from "./content";

export const metadata: Metadata = {
  title: "沈浸式翻譯完整教學：安裝、設定與使用技巧",
  description: "沈浸式翻譯完整指南：從安裝到進階設定，學習如何使用沈浸式翻譯工具來翻譯網頁、字幕和PDF。包含替代工具比較和使用技巧。",
  keywords: "沈浸式翻譯, 沈浸式翻譯教學, 沈浸式翻譯設定, 雙語字幕, 網頁翻譯, 字幕翻譯, immersive translate, Funlingo",
  alternates: { canonical: "/blog/immersive-translate-guide-zh" },
  openGraph: { title: "沈浸式翻譯完整教學：安裝、設定與使用技巧", description: "從安裝到進階設定，學習如何使用沈浸式翻譯工具。包含替代工具比較。", type: "article", url: "/blog/immersive-translate-guide-zh" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "沈浸式翻譯完整教學：安裝、設定與使用技巧", "description": "沈浸式翻譯完整指南：從安裝到進階設定。", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-20", "dateModified": "2026-03-20", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "沈浸式翻譯是免費的嗎？", "acceptedAnswer": { "@type": "Answer", "text": "沈浸式翻譯提供免費版本，包含基本的網頁翻譯功能。進階功能如PDF翻譯和更多翻譯引擎需要訂閱Pro方案。如果你主要需要影片雙語字幕，Funlingo是完全免費的替代選擇。" } }, { "@type": "Question", "name": "沈浸式翻譯支援哪些瀏覽器？", "acceptedAnswer": { "@type": "Answer", "text": "沈浸式翻譯支援Chrome、Firefox、Edge和Safari瀏覽器。各瀏覽器的功能可能略有不同。" } }, { "@type": "Question", "name": "有什麼替代工具推薦？", "acceptedAnswer": { "@type": "Answer", "text": "如果你需要影片雙語字幕功能，推薦使用Funlingo——它完全免費，支援Netflix、YouTube和Prime Video的雙語字幕。如果需要網頁翻譯，Google翻譯擴充功能也是不錯的免費選擇。" } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ImmersiveTranslateGuideZhContent />
    </>
  );
}
