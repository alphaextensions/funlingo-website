import type { Metadata } from "next";
import PlaybackSpeedYoutubeContent from "./content";

export const metadata: Metadata = {
  title: "Why Can't I Change Playback Speed on YouTube? (Fixed) | Funlingo",
  description:
    "Can't change playback speed on YouTube? Here are the most common causes and fixes — including browser issues, outdated apps, embedded videos, and restricted content.",
  keywords:
    "why can't i change playback speed on youtube, youtube playback speed not working, youtube speed control greyed out, youtube playback speed missing, change youtube speed, youtube slow motion not working",
  alternates: { canonical: "/blog/why-cant-change-playback-speed-youtube" },
  openGraph: {
    title: "Why Can't I Change Playback Speed on YouTube? (Fixed)",
    description:
      "Troubleshoot and fix YouTube playback speed issues. Covers browser problems, app bugs, embedded videos, and tips for language learners using speed controls.",
    type: "article",
    url: "/blog/why-cant-change-playback-speed-youtube",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Can't I Change Playback Speed on YouTube? (Fixed)",
  description:
    "Can't change playback speed on YouTube? Here are the most common causes and fixes — including browser issues, outdated apps, embedded videos, and restricted content.",
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
      name: "Why is the playback speed option greyed out on YouTube?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The playback speed option is usually greyed out on embedded videos where the uploader has disabled player controls, during live streams that are still in progress, or when using an outdated browser or YouTube app that doesn't support the speed control feature.",
      },
    },
    {
      "@type": "Question",
      name: "Can you change playback speed on YouTube TV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube TV has limited playback speed support. On some devices and recorded content, you can change speed, but live TV does not support speed changes. The feature availability depends on your device and the YouTube TV app version.",
      },
    },
    {
      "@type": "Question",
      name: "Does changing playback speed affect subtitles on YouTube?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, subtitles automatically adjust to match the playback speed. If you slow a video to 0.5x, subtitles will appear at the corresponding slower rate. If you speed up to 2x, subtitles will cycle faster to stay in sync with the audio.",
      },
    },
    {
      "@type": "Question",
      name: "How do I change playback speed on YouTube mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the YouTube mobile app, tap the video, then tap the gear icon (Settings) or the three-dot menu. Select 'Playback speed' and choose your preferred speed. Make sure your app is updated to the latest version if you don't see this option.",
      },
    },
    {
      "@type": "Question",
      name: "Can I set a default playback speed on YouTube?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube does not natively support setting a default playback speed. However, browser extensions like 'YouTube Playback Speed Control' can remember your preferred speed and apply it to every video automatically.",
      },
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
      <PlaybackSpeedYoutubeContent />
    </>
  );
}
