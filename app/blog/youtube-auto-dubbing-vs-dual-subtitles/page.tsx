import type { Metadata } from "next";
import BlogPostContent from "./content";

export const metadata: Metadata = {
  title: "YouTube Auto-Dubbing vs Dual Subtitles: Which Is Better for Learning a Language? (2026)",
  description: "YouTube's AI auto-dubbing sounds great in 2026 — but it replaces the original audio. Here's why dual subtitles beat dubbing for actually learning a language, and how to get them free.",
  keywords: "youtube auto dubbing, dual subtitles youtube, learn language youtube, auto dubbing vs subtitles, youtube dubbing language learning, bilingual subtitles",
  alternates: {
    canonical: "/blog/youtube-auto-dubbing-vs-dual-subtitles",
  },
  openGraph: {
    title: "YouTube Auto-Dubbing vs Dual Subtitles: Which Is Better for Learning a Language? (2026)",
    description: "YouTube's AI auto-dubbing sounds great in 2026 — but it replaces the original audio. Here's why dual subtitles beat dubbing for actually learning a language, and how to get them free.",
    type: "article",
    url: "/blog/youtube-auto-dubbing-vs-dual-subtitles",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is YouTube auto-dubbing good for learning a language?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on direction. If a video is originally in the language you are learning, dubbing replaces that native audio with a synthetic voice in your own language, so it removes the input you need — it is better for consuming than learning. Watching content dubbed into your target language can add listening practice, but you lose natural prosody and have nothing to read along with." } },
    { "@type": "Question", "name": "Does YouTube have built-in dual subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "No. At the time of writing, YouTube's native player cannot stack two subtitle tracks. Its auto-translate feature only swaps a single caption track from one language to another, so you cannot see the original and a translation at the same time without a browser extension like Funlingo." } },
    { "@type": "Question", "name": "Why are dual subtitles better than dubbing for study?", "acceptedAnswer": { "@type": "Answer", "text": "Dual subtitles keep the original native audio and show both languages as text at once, so you hear how the language really sounds while reading what it means. That combination builds vocabulary and comprehension in context. Dubbing removes the native audio entirely, which strips away the listening input active study relies on." } },
    { "@type": "Question", "name": "How do I get dual subtitles on YouTube?", "acceptedAnswer": { "@type": "Answer", "text": "Install a free Chrome extension such as Funlingo. It adds dual subtitles and click-to-translate to YouTube, Netflix, and Amazon Prime Video, supports 100+ languages, and includes pronunciation audio and save-to-vocab. There is no quota and no paid tier gating the core features; it is Chrome-only." } },
    { "@type": "Question", "name": "Should I ever use auto-dubbing as a learner?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, in the right context. Use auto-dubbing for casual consumption or as supplementary listening when the video is dubbed into your target language. For real study, turn it off and use dual subtitles so you keep the original audio and can read along in both languages." } }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "YouTube Auto-Dubbing vs Dual Subtitles: Which Is Better for Learning a Language? (2026)",
  "description": "YouTube's AI auto-dubbing sounds great in 2026 — but it replaces the original audio. Here's why dual subtitles beat dubbing for actually learning a language, and how to get them free.",
  "author": { "@type": "Organization", "name": "Funlingo" },
  "datePublished": "2026-08-11",
  "dateModified": "2026-08-11",
  "image": "https://getfunlingo.com/og-image.jpg"
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostContent />
    </>
  );
}
