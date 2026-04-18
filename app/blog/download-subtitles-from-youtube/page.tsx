import type { Metadata } from "next";
import DownloadSubtitlesFromYoutubeContent from "./content";

export const metadata: Metadata = {
  title: "How to Download Subtitles from YouTube (3 Free Methods) | Funlingo",
  description:
    "Learn how to download subtitles from YouTube for free using 3 easy methods: YouTube's built-in transcript, online tools like DownSub, and browser extensions. SRT, TXT & more formats.",
  keywords:
    "download subtitles from youtube, youtube subtitle download, download youtube captions, youtube srt download, save youtube subtitles, extract youtube subtitles, youtube transcript download",
  alternates: { canonical: "/blog/download-subtitles-from-youtube" },
  openGraph: {
    title: "How to Download Subtitles from YouTube (3 Free Methods)",
    description:
      "Step-by-step guide to downloading YouTube subtitles for free. Covers YouTube transcript, online tools, and browser extensions for SRT & TXT formats.",
    type: "article",
    url: "/blog/download-subtitles-from-youtube",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Download Subtitles from YouTube (3 Free Methods)",
  description:
    "Learn how to download subtitles from YouTube for free using 3 easy methods: YouTube's built-in transcript, online tools like DownSub, and browser extensions.",
  author: { "@type": "Organization", name: "Funlingo Team" },
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  image: "https://getfunlingo.com/og-image.jpg",
  publisher: {
    "@type": "Organization",
    name: "Funlingo",
    logo: { "@type": "ImageObject", url: "https://getfunlingo.com/logo.png" },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can you download auto-generated subtitles from YouTube?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, most online tools and browser extensions can download both manually uploaded and auto-generated YouTube subtitles. YouTube's built-in transcript feature also shows auto-generated captions that you can copy.",
      },
    },
    {
      "@type": "Question",
      name: "What format are YouTube subtitles in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube subtitles are stored in a proprietary XML format, but most download tools convert them to SRT (SubRip), TXT (plain text), or VTT (WebVTT) formats. SRT is the most common and widely supported format.",
      },
    },
    {
      "@type": "Question",
      name: "Are YouTube subtitle downloaders safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reputable tools like DownSub and SaveSubs are generally safe. However, always avoid sites that ask you to install unknown software or request excessive permissions. Stick to well-known tools and check reviews before using any new service.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download subtitles in multiple languages from one YouTube video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If a video has subtitles in multiple languages, tools like DownSub let you choose which language to download. You can download subtitles in as many languages as the video offers.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a way to view dual-language subtitles on YouTube without downloading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Browser extensions like Funlingo let you display dual subtitles directly on YouTube, Netflix, and Prime Video. This is ideal for language learners who want to see translations in real time without downloading separate files.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Download Subtitles from YouTube",
  description:
    "Download subtitles from any YouTube video in SRT, VTT, or TXT format using free methods.",
  totalTime: "PT5M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "0",
  },
  tool: [{ "@type": "HowToTool", name: "Web browser" }],
  step: [
    {
      "@type": "HowToStep",
      name: "Find the YouTube Video",
      text: "Navigate to the YouTube video you want to download subtitles from and copy its URL.",
    },
    {
      "@type": "HowToStep",
      name: "Choose a Download Method",
      text: "Select one of three free methods: an online subtitle downloader tool, a browser extension, or the yt-dlp command line tool.",
    },
    {
      "@type": "HowToStep",
      name: "Download the Subtitles",
      text: "Paste the video URL into your chosen tool, select the language and format (SRT, VTT, or TXT), and download the subtitle file.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <DownloadSubtitlesFromYoutubeContent />
    </>
  );
}
