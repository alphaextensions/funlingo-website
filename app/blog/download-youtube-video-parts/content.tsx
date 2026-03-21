"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Download, Monitor, Terminal, Scissors, AlertTriangle, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DownloadYoutubeVideoPartsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Download YouTube Videos (Specific Parts Only)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Why Download Only Part of a YouTube Video?</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Sometimes you do not need an entire 20-minute video. Maybe you want a 30-second clip of a native speaker using a tricky grammar pattern, a short segment for a presentation, or a reference clip for a creative project. Downloading the full video wastes storage, takes longer, and gives you extra footage you will never watch again.</p>
          <p className="leading-relaxed text-gray-300 mb-6">Language learners in particular benefit from creating short, focused study clips. A two-minute dialogue from a Spanish vlog or a single scene from a Korean variety show becomes a powerful flashcard when you can replay it on demand. Instead of scrubbing through a long video every time you study, you have exactly the segment you need saved locally.</p>
          <p className="leading-relaxed text-gray-300 mb-6">Below we cover four practical methods to <strong className="text-white">download a part of a YouTube video</strong>, ranging from zero-install browser tools to powerful command-line options.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 1: Online Clip Tools</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Scissors className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Best for: Quick clips without installing anything</span></div>
            <p className="text-gray-300 mb-4">Web-based tools like YTCutter and ClipConverter let you paste a YouTube URL, set start and end timestamps, and download just that segment. No software installation required.</p>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Step-by-Step with YTCutter</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-6">
            <li>Go to <strong className="text-white">ytcutter.com</strong> in your browser.</li>
            <li>Paste the full YouTube video URL into the input field.</li>
            <li>Use the preview player to find your desired start time. Click the <strong className="text-white">Set Start</strong> button.</li>
            <li>Scrub to your desired end time and click <strong className="text-white">Set End</strong>.</li>
            <li>Choose your output format: MP4 for video or MP3 for audio only.</li>
            <li>Click <strong className="text-white">Download</strong> and wait for the server to process your clip.</li>
          </ol>
          <p className="text-gray-300 mb-6">The main limitation of online tools is quality. Most cap output at 720p, and processing times can be slow for longer segments. They also depend on third-party servers that may go offline without notice.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 2: Screen Recording</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Monitor className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Best for: Capturing exactly what you see, including subtitles</span></div>
            <p className="text-gray-300 mb-4">Screen recording captures everything on your display, including subtitles, annotations, and on-screen translations. This makes it ideal for language learners who want to save clips with dual subtitles visible.</p>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Using OBS Studio (Free, Cross-Platform)</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-6">
            <li>Download and install <strong className="text-white">OBS Studio</strong> from obsproject.com.</li>
            <li>Create a new Scene and add a <strong className="text-white">Window Capture</strong> source targeting your browser.</li>
            <li>Set your recording output to MP4 under Settings &gt; Output.</li>
            <li>Navigate to the YouTube video and cue it to the segment you want.</li>
            <li>Click <strong className="text-white">Start Recording</strong>, play the video, then click <strong className="text-white">Stop Recording</strong> when your clip ends.</li>
          </ol>
          <h3 className="text-xl font-bold text-white mb-4">Using Built-In Tools</h3>
          <p className="text-gray-300 mb-6">On Windows 11, press <strong className="text-white">Win + Shift + R</strong> to start the Snipping Tool screen recorder. On macOS, press <strong className="text-white">Cmd + Shift + 5</strong> to open the screenshot toolbar and select Screen Recording. Both produce MP4 files you can trim afterward.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 3: yt-dlp with Timestamps</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Terminal className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Best for: High-quality downloads with precise control</span></div>
            <p className="text-gray-300 mb-4">yt-dlp is a free, open-source command-line tool that downloads videos from YouTube and hundreds of other sites. Combined with ffmpeg, it can extract specific time ranges at full quality.</p>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Step-by-Step</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-6">
            <li>Install yt-dlp and ffmpeg. On macOS: <code className="bg-white/10 px-2 py-1 rounded text-sm">brew install yt-dlp ffmpeg</code>. On Windows, download the executables from their GitHub releases.</li>
            <li>Open your terminal and run: <code className="bg-white/10 px-2 py-1 rounded text-sm block mt-2">yt-dlp --download-sections &quot;*00:01:30-00:02:45&quot; -f &quot;bestvideo[ext=mp4]+bestaudio[ext=m4a]&quot; &quot;VIDEO_URL&quot;</code></li>
            <li>The <code className="bg-white/10 px-2 py-1 rounded text-sm">--download-sections</code> flag tells yt-dlp to grab only the range between 1 minute 30 seconds and 2 minutes 45 seconds.</li>
            <li>The <code className="bg-white/10 px-2 py-1 rounded text-sm">-f</code> flag selects the best available MP4 video and M4A audio streams.</li>
            <li>Your clipped file will appear in the current directory.</li>
          </ol>
          <p className="text-gray-300 mb-6">For audio-only extraction, add the <code className="bg-white/10 px-2 py-1 rounded text-sm">-x --audio-format mp3</code> flags. This is perfect for creating listening exercises from podcast-style YouTube content.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 4: Browser-Based Video Editors</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Download className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Best for: Trimming after downloading the full video</span></div>
            <p className="text-gray-300 mb-4">If you already have the full video downloaded, browser-based editors like Kapwing or Canva&apos;s video editor let you trim it to the exact segment you need without installing desktop software.</p>
          </div>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-6">
            <li>Upload your downloaded video to Kapwing, Canva, or a similar editor.</li>
            <li>Use the timeline to set your in and out points.</li>
            <li>Export the trimmed clip in your preferred format and resolution.</li>
          </ol>
          <p className="text-gray-300 mb-6">This two-step approach gives you maximum flexibility. You keep the full video as a master copy and export as many clips as you need.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Legal Considerations</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-5 h-5 text-yellow-400" /><span className="font-semibold text-white">Know the rules before you download</span></div>
            <p className="text-gray-300 mb-4">Downloading YouTube videos technically violates YouTube&apos;s Terms of Service. However, the legal landscape is nuanced. Personal, non-commercial use for study purposes is generally low-risk. Fair use provisions in many countries allow short clips for education, commentary, and criticism.</p>
            <p className="text-gray-300">That said, you should never redistribute downloaded content, upload it elsewhere, or use it commercially without the original creator&apos;s permission. When in doubt, stick to screen recording short clips for personal study.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">A Better Way: Study Clips Without Downloading</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><BookOpen className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Use Funlingo for language study directly on YouTube</span></div>
            <p className="text-gray-300 mb-4">If your main reason for downloading clips is language learning, there is a simpler path. <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">Funlingo</a> adds dual subtitles directly to YouTube and Netflix, letting you study any scene in real time without downloading anything.</p>
            <p className="text-gray-300 mb-4">With Funlingo you can see your target language and native language subtitles simultaneously, click any word for an instant translation, and save vocabulary to review later. Instead of managing a library of downloaded clips, you study directly inside the streaming platform.</p>
            <p className="text-gray-300">You can also use Funlingo&apos;s <a href="/blog/how-to-learn-languages-with-reading-mode" className="text-[#C642FC] hover:underline">Reading Mode</a> to read through an entire video&apos;s transcript at your own pace, highlighting and saving words as you go.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Is it legal to download parts of YouTube videos?</h3>
            <p className="text-gray-300">Downloading YouTube videos violates YouTube&apos;s Terms of Service, but personal, non-commercial use for education is generally low-risk. Fair use provisions may apply for short clips used in commentary, criticism, or study. Never redistribute downloaded content without permission from the original creator.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">What is the best quality format for downloading YouTube clips?</h3>
            <p className="text-gray-300">MP4 with H.264 encoding is the most compatible format across devices and players. For the highest quality, select 1080p or 4K when available. If you only need the audio track, MP3 at 320kbps or M4A provides excellent audio quality at a smaller file size.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Can I download just the audio from a YouTube video?</h3>
            <p className="text-gray-300">Yes. yt-dlp supports audio-only extraction with the <code className="bg-white/10 px-2 py-1 rounded text-sm">-x</code> flag. Online tools like YTCutter also offer MP3 output. Audio-only downloads are especially useful for creating listening comprehension exercises or podcast-style study material.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">How do I download a YouTube clip with subtitles included?</h3>
            <p className="text-gray-300">The easiest method is screen recording, which captures subtitles as they appear on screen. Alternatively, use yt-dlp with the <code className="bg-white/10 px-2 py-1 rounded text-sm">--write-subs</code> flag to download subtitle files alongside the video, then burn them in using HandBrake or VLC.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-2 font-semibold">Skip the downloads. Study languages directly on YouTube.</p>
            <p className="text-gray-400 mb-6">Funlingo adds dual subtitles, word translations, and vocabulary saving right inside your browser. No clips to manage, no files to organize.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">
                Try Funlingo Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
