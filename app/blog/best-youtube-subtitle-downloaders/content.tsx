"use client";

import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Check,
  X,
  Download,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    name: "DownSub",
    description:
      "DownSub is one of the most popular free online subtitle downloaders. Simply paste a YouTube URL and it detects all available subtitle tracks, including auto-generated captions. You can download subtitles in SRT or TXT format with a single click — no account or installation required.",
    pros: [
      "Completely free with no sign-up",
      "Supports SRT and TXT formats",
      "Works with auto-generated subtitles",
      "Detects all available languages",
    ],
    cons: [
      "Contains ads on the website",
      "No batch download support",
      "Occasional downtime",
    ],
  },
  {
    name: "SaveSubs",
    description:
      "SaveSubs is a versatile web-based tool that downloads subtitles from YouTube and many other platforms including Vimeo, Dailymotion, and Facebook. It offers multiple output formats and can handle both manual and auto-generated captions.",
    pros: [
      "Supports multiple video platforms",
      "Multiple output formats (SRT, VTT, TXT)",
      "Clean and simple interface",
      "Works on mobile browsers",
    ],
    cons: [
      "Slower processing for long videos",
      "Some formats occasionally unavailable",
      "Ad-supported free tier",
    ],
  },
  {
    name: "YouSubtitles",
    description:
      "YouSubtitles provides the simplest possible interface for downloading YouTube subtitles. Paste a link, pick a language, and download. It focuses solely on YouTube and does one thing well — extracting subtitle files quickly and reliably.",
    pros: [
      "Extremely simple to use",
      "Fast subtitle extraction",
      "No registration required",
      "Lightweight and loads quickly",
    ],
    cons: [
      "YouTube only — no other platforms",
      "Limited format options",
      "No advanced features like translation",
    ],
  },
  {
    name: "4K Video Downloader",
    description:
      "4K Video Downloader is a premium desktop application that downloads videos, audio, and subtitles from YouTube. Its subtitle downloading feature supports batch processing, making it ideal for users who need subtitles for entire playlists or channels.",
    pros: [
      "Batch download subtitles for playlists",
      "Desktop app — fast and reliable",
      "Supports SRT and many other formats",
      "Also downloads video and audio",
    ],
    cons: [
      "Paid software (free version is limited)",
      "Requires installation on your computer",
      "Heavier resource usage than web tools",
    ],
  },
  {
    name: "yt-dlp",
    description:
      "yt-dlp is an open-source command-line tool and the most powerful option for downloading YouTube subtitles. It supports every subtitle format, can extract auto-generated captions, and integrates into automated workflows. It is the go-to choice for developers and power users.",
    pros: [
      "Most powerful and flexible option",
      "Supports all subtitle formats",
      "Batch processing and automation",
      "Free and open-source",
    ],
    cons: [
      "Requires command-line knowledge",
      "No graphical interface",
      "Setup can be intimidating for beginners",
    ],
  },
  {
    name: "Checksub",
    description:
      "Checksub is a freemium platform that combines subtitle downloading with AI-powered auto-transcription and translation. It is designed for content creators who need subtitles generated, edited, and exported in professional formats.",
    pros: [
      "AI auto-transcription for any video",
      "Built-in subtitle editor",
      "Translation to 200+ languages",
      "Professional export formats",
    ],
    cons: [
      "Free tier has limited minutes",
      "Requires account creation",
      "More complex than simple downloaders",
    ],
  },
  {
    name: "Subtitle Edit",
    description:
      "Subtitle Edit is a free, open-source desktop application primarily designed as a subtitle editor, but it also includes the ability to download subtitles from YouTube. It is ideal for users who need to download and then modify subtitle files.",
    pros: [
      "Full-featured subtitle editor included",
      "Free and open-source",
      "Supports 300+ subtitle formats",
      "Spell check and timing tools",
    ],
    cons: [
      "Windows only (Linux via Mono)",
      "Overkill for simple downloads",
      "Steeper learning curve",
    ],
  },
  {
    name: "Google Takeout",
    description:
      "Google Takeout lets you export data from your Google account, including subtitle files for your own YouTube uploads. If you are a content creator who needs to retrieve captions from your own channel, this is the official method provided by Google.",
    pros: [
      "Official Google method",
      "Downloads all your subtitles at once",
      "Includes both manual and auto captions",
      "No third-party tools needed",
    ],
    cons: [
      "Only works for your own videos",
      "Export process can take hours",
      "Not intuitive to find subtitle data",
    ],
  },
  {
    name: "Browser DevTools Method",
    description:
      "For technically inclined users, you can extract subtitle data directly from YouTube using your browser's Developer Tools. By inspecting network requests while a video plays, you can find and download the raw subtitle track data in its original format.",
    pros: [
      "No tools or extensions required",
      "Works even when other tools break",
      "Access to raw subtitle data",
      "Completely free and private",
    ],
    cons: [
      "Requires technical knowledge",
      "Manual and time-consuming process",
      "Raw data may need formatting",
    ],
  },
  {
    name: "FunLingo",
    description:
      "FunLingo takes a different approach — instead of downloading subtitles, it displays dual-language subtitles directly on YouTube as you watch. This makes it the best option for language learners who want to study with subtitles in real time without managing files.",
    pros: [
      "Dual subtitles directly on YouTube",
      "No file management needed",
      "Built for language learning",
      "Word-by-word translation on hover",
    ],
    cons: [
      "Chrome extension — not a file downloader",
      "Requires the browser extension",
      "Focused on learning, not content creation",
    ],
  },
];

export default function BestYoutubeSubtitleDownloadersContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.5) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Download className="w-3 h-3 mr-1" />
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Best YouTube Subtitle Downloaders — Top 10 Tools Compared
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Find the perfect tool to download YouTube subtitles in SRT, VTT, or
            TXT. We compare free and paid options so you can choose what fits
            your workflow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> March 19, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> FunLingo Team
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 10 min read
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 pb-24 prose prose-invert prose-lg">
        {/* Introduction */}
        <p>
          Whether you need subtitles for{" "}
          <Link
            href="/blog/how-to-learn-a-language-by-watching"
            className="text-purple-400 hover:text-purple-300"
          >
            language learning
          </Link>
          , content repurposing, accessibility, or research, downloading YouTube
          subtitles is a common need. But with dozens of tools available, which
          one should you use?
        </p>
        <p>
          We tested and compared the 10 best YouTube subtitle downloaders in
          2026 — covering free web tools, desktop apps, command-line utilities,
          and alternative approaches. Here is what we found.
        </p>

        {/* Why Download YouTube Subtitles */}
        <h2>Why Download YouTube Subtitles?</h2>
        <p>
          Before diving into the tools, here are the most common reasons people
          download subtitles from YouTube:
        </p>
        <ul>
          <li>
            <strong>Language Learning</strong> — Study transcripts alongside
            video to improve vocabulary, listening comprehension, and reading
            skills in a foreign language.
          </li>
          <li>
            <strong>Content Creation</strong> — Repurpose video content into
            blog posts, social media captions, or translated versions for global
            audiences.
          </li>
          <li>
            <strong>Accessibility</strong> — Provide captions for hearing-
            impaired viewers or create transcripts for environments where audio
            is not available.
          </li>
          <li>
            <strong>Research &amp; Reference</strong> — Extract quotes, analyze
            speech patterns, or create searchable text archives of video
            content.
          </li>
        </ul>
        <p>
          Understanding your use case helps you pick the right tool. A language
          learner has different needs than a content creator working with{" "}
          <Link
            href="/blog/srt-files-subtitle-download"
            className="text-purple-400 hover:text-purple-300"
          >
            SRT files
          </Link>
          .
        </p>

        {/* Tool Reviews */}
        <h2>The 10 Best YouTube Subtitle Downloaders</h2>

        {tools.map((tool, index) => (
          <div
            key={tool.name}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 my-8 not-prose"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/30 text-purple-300 text-sm font-bold">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold text-white">{tool.name}</h3>
            </div>
            <p className="text-gray-300 mb-5 leading-relaxed">
              {tool.description}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Pros
                </h4>
                <ul className="space-y-1.5">
                  {tool.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1.5">
                  <X className="w-4 h-4" /> Cons
                </h4>
                <ul className="space-y-1.5">
                  {tool.cons.map((con) => (
                    <li
                      key={con}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Mid-Article CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl p-8 my-12 text-center not-prose">
          <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Skip the Downloads — Watch with Dual Subtitles
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            FunLingo shows subtitles in two languages directly on YouTube. No
            files to manage, no formatting headaches — just learn as you watch.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full">
              <Globe className="w-4 h-4 mr-2" />
              Try FunLingo Free
            </Button>
          </a>
        </div>

        {/* How to Choose */}
        <h2>How to Choose the Right Tool</h2>
        <p>
          With ten solid options, the best tool depends on your specific
          situation. Here is a quick decision framework:
        </p>
        <ul>
          <li>
            <strong>Just need a quick SRT file?</strong> Use{" "}
            <strong>DownSub</strong> or <strong>SaveSubs</strong>. They are free,
            fast, and require no setup.
          </li>
          <li>
            <strong>Downloading subtitles for an entire playlist?</strong> Use{" "}
            <strong>4K Video Downloader</strong> or <strong>yt-dlp</strong> for
            batch processing.
          </li>
          <li>
            <strong>Need to edit subtitles after downloading?</strong> Go with{" "}
            <strong>Subtitle Edit</strong> — it combines downloading and editing
            in one tool.
          </li>
          <li>
            <strong>Want AI-generated subtitles or translations?</strong>{" "}
            <strong>Checksub</strong> handles transcription and translation with
            AI.
          </li>
          <li>
            <strong>Learning a language with YouTube?</strong>{" "}
            <strong>FunLingo</strong> is purpose-built for this — dual subtitles
            right on the video without any downloads.
          </li>
          <li>
            <strong>Developer or power user?</strong>{" "}
            <strong>yt-dlp</strong> gives you full control with scripting and
            automation capabilities.
          </li>
        </ul>
        <p>
          For a deeper look at the download process itself, check out our guide
          on{" "}
          <Link
            href="/blog/download-subtitles-from-youtube"
            className="text-purple-400 hover:text-purple-300"
          >
            how to download subtitles from YouTube
          </Link>
          .
        </p>

        {/* FAQ Section */}
        <h2>Frequently Asked Questions</h2>

        <h3>What is the best free YouTube subtitle downloader?</h3>
        <p>
          DownSub is the best free YouTube subtitle downloader for most users. It
          works directly in your browser, requires no installation, and supports
          SRT and TXT formats. For command-line users, yt-dlp offers the most
          powerful and flexible subtitle downloading capabilities.
        </p>

        <h3>Can you download auto-generated subtitles from YouTube?</h3>
        <p>
          Yes, most subtitle downloaders including DownSub, SaveSubs, and yt-dlp
          can download both manual and auto-generated subtitles from YouTube.
          Auto-generated subtitles may contain errors since they are created by
          speech recognition.
        </p>

        <h3>What format should I download YouTube subtitles in?</h3>
        <p>
          SRT is the most widely supported subtitle format and works with
          virtually all media players and video editors. Use VTT if you need
          web-compatible subtitles. Use TXT if you just need a plain text
          transcript without timestamps. Learn more in our{" "}
          <Link
            href="/blog/srt-files-subtitle-download"
            className="text-purple-400 hover:text-purple-300"
          >
            guide to SRT files
          </Link>
          .
        </p>

        {/* End CTA */}
        <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/20 rounded-2xl p-10 my-12 text-center not-prose">
          <h3 className="text-3xl font-bold text-white mb-4">
            Learn Languages While Watching YouTube
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
            Instead of downloading and managing subtitle files, use FunLingo to
            display dual-language subtitles directly on YouTube. Hover over any
            word for an instant translation.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg px-8 py-4 rounded-full">
              Add FunLingo to Chrome — It&apos;s Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
