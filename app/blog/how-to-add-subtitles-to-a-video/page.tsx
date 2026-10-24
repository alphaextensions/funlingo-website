import type { Metadata } from "next";
import HowToAddSubtitlesToAVideoContent from "./content";

export const metadata: Metadata = {
  title: "How to Add Subtitles to a Video (2026): 5 Free Methods",
  description: "Add subtitles to any video — auto-generate in YouTube Studio, attach an SRT in VLC, burn captions in with HandBrake, or overlay them on Netflix and YouTube with a free Chrome extension.",
  keywords: "how to add subtitles to a video, add subtitles to video free, srt file, burn subtitles into video, add captions to video, subtitle video youtube, vlc add subtitles, handbrake burn subtitles",
  alternates: { canonical: "/blog/how-to-add-subtitles-to-a-video" },
  openGraph: { title: "How to Add Subtitles to a Video (2026): 5 Free Methods", description: "Five ways to add subtitles to a video — auto-generated captions, SRT files, burned-in subtitles, and browser overlays for streaming.", type: "article", url: "/blog/how-to-add-subtitles-to-a-video" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Add Subtitles to a Video (2026): 5 Free Methods", "description": "Five ways to add subtitles to a video — auto-generated captions, SRT files, burned-in subtitles, and browser overlays for streaming.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-08-26", "dateModified": "2026-08-26", "image": "https://getfunlingo.com/blog-images/how-to-add-subtitles-to-a-video-hero.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", "name": "How to add subtitles to a video", "description": "Add subtitles to a video you own using an SRT file, or overlay them on streaming video with a browser extension.", "totalTime": "PT10M", "supply": [{ "@type": "HowToSupply", "name": "A video file or streaming video" }, { "@type": "HowToSupply", "name": "A subtitle file (.srt or .vtt), or auto-generated captions" }], "step": [{ "@type": "HowToStep", "name": "Choose soft or burned-in subtitles", "text": "Soft subtitles are a separate file viewers can switch off. Burned-in subtitles are painted into the pixels and always visible. Pick soft subtitles unless the platform strips them." }, { "@type": "HowToStep", "name": "Get a subtitle file", "text": "Auto-generate captions in YouTube Studio, transcribe with a speech-to-text tool, or write an SRT by hand." }, { "@type": "HowToStep", "name": "Check and fix the timing", "text": "Open the video with the subtitle file and correct any drift so lines appear as the words are spoken." }, { "@type": "HowToStep", "name": "Attach or burn the subtitles", "text": "Attach the SRT alongside the video for soft subtitles, or use HandBrake to burn them permanently into the picture." }] };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "How do I add subtitles to a video for free?", "acceptedAnswer": { "@type": "Answer", "text": "Upload to YouTube Studio and use auto-generated captions, or drag an SRT file onto the video in VLC. Both are free. To add subtitles to streaming video you do not own, use a free Chrome extension such as Funlingo." } }, { "@type": "Question", "name": "What is an SRT file?", "acceptedAnswer": { "@type": "Answer", "text": "An SRT (SubRip) file is a plain text file listing numbered subtitle blocks, each with a start and end timestamp and one or two lines of text. It is the most widely supported subtitle format and you can edit it in any text editor." } }, { "@type": "Question", "name": "What is the difference between soft and burned-in subtitles?", "acceptedAnswer": { "@type": "Answer", "text": "Soft subtitles are stored as a separate track or file, so viewers can turn them off, change the language, or restyle them. Burned-in (hardcoded) subtitles are rendered permanently into the video pixels and cannot be removed." } }, { "@type": "Question", "name": "Can I add subtitles to Netflix or YouTube videos I do not own?", "acceptedAnswer": { "@type": "Answer", "text": "You cannot modify the file itself, but a browser extension can overlay subtitles on top of the player as you watch. Funlingo does this on Netflix, YouTube, and Prime Video, and can show two languages at once." } }, { "@type": "Question", "name": "How long should each subtitle line be?", "acceptedAnswer": { "@type": "Answer", "text": "Keep lines to about 42 characters, at most two lines on screen, held for at least one second and no more than seven. That keeps reading speed comfortable at roughly 17 characters per second." } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToAddSubtitlesToAVideoContent />
    </>
  );
}
