"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Download, ArrowRight, Monitor, Globe, Check, X } from "lucide-react";

export default function DownloadYoutubeVideosChineseSubtitlesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Chinese Content</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Download YouTube Videos with Chinese Subtitles &mdash; 3 Free Methods (2026 Guide)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 21, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">Whether you are studying Mandarin Chinese or simply want to save Chinese-language YouTube videos for offline viewing, downloading videos with their Chinese subtitles intact is incredibly useful. This guide walks you through three free methods to download YouTube videos with Chinese subtitles (youtube视频在线下载) so you can study on the go, review tricky vocabulary on the train, or build a personal library of Chinese learning material.</p>

          <p className="text-gray-300 mb-6">We will cover the command-line tool yt-dlp, several online subtitle extraction services, and browser extensions. At the end, we will also show you a smarter alternative that eliminates the need to download anything at all: watching YouTube with free dual Chinese subtitles in real time using Funlingo.</p>

          <hr className="border-white/10 my-12" />

          {/* Why Download */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Download YouTube Videos with Chinese Subtitles?</h2>
          <p className="text-gray-300 mb-6">YouTube is the largest free library of Chinese-language content on the internet. From native Mandarin vloggers and news channels to Chinese cooking shows and tech reviews, there are millions of hours of authentic Chinese content available. But streaming requires a stable internet connection, and YouTube does not natively let you save videos for offline use on desktop. That is where downloading comes in.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Download className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Offline Study Sessions</h3>
              <p className="text-sm text-gray-400">Save videos to your phone or tablet and study Chinese during commutes, flights, or anywhere without Wi-Fi. Having subtitles embedded means you never lose the learning context.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Monitor className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Review Difficult Passages</h3>
              <p className="text-sm text-gray-400">Some Chinese phrases need repeated listening. Downloaded videos let you loop specific sections in a media player without buffering delays or ads interrupting your flow.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Globe className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Build a Personal Library</h3>
              <p className="text-sm text-gray-400">Curate a collection of Chinese videos organized by topic and difficulty level. Over time, this becomes your personalized immersion library tailored to your learning goals.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Clock className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Subtitle File Extraction</h3>
              <p className="text-sm text-gray-400">Extract Chinese subtitle files (SRT or VTT) separately and use them with flashcard tools like Anki, or load them into translation software for deeper vocabulary study.</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* Method 1: yt-dlp */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 1: yt-dlp Command Line (Most Powerful)</h2>
          <p className="text-gray-300 mb-6">yt-dlp is a free, open-source command-line tool and the successor to the now-deprecated youtube-dl. It is the most powerful and flexible way to download YouTube videos with subtitles in any language, including Chinese (Simplified and Traditional). If you are comfortable with a terminal, this is the gold standard.</p>

          <h3 className="text-xl font-semibold text-white mb-4">Step 1: Install yt-dlp</h3>
          <p className="text-gray-300 mb-4">You can install yt-dlp on Windows, macOS, or Linux. The easiest methods are:</p>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-white/10 mb-6 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre-wrap"><code>{`# Windows (using winget)
winget install yt-dlp

# macOS (using Homebrew)
brew install yt-dlp

# Linux (using pip)
pip install yt-dlp

# Or download the binary directly from GitHub
# https://github.com/yt-dlp/yt-dlp/releases`}</code></pre>
          </div>

          <h3 className="text-xl font-semibold text-white mb-4">Step 2: List Available Subtitle Languages</h3>
          <p className="text-gray-300 mb-4">Before downloading, check which subtitle languages are available for a video:</p>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-white/10 mb-6 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre-wrap"><code>{`yt-dlp --list-subs "https://www.youtube.com/watch?v=VIDEO_ID"`}</code></pre>
          </div>
          <p className="text-gray-300 mb-4">Look for language codes like <code className="text-red-400 bg-white/5 px-2 py-0.5 rounded">zh-Hans</code> (Simplified Chinese), <code className="text-red-400 bg-white/5 px-2 py-0.5 rounded">zh-Hant</code> (Traditional Chinese), or <code className="text-red-400 bg-white/5 px-2 py-0.5 rounded">zh</code> (generic Chinese). Auto-generated subtitles will appear under a separate section.</p>

          <h3 className="text-xl font-semibold text-white mb-4">Step 3: Download Video with Chinese Subtitles</h3>
          <p className="text-gray-300 mb-4">To download a video with embedded Chinese subtitles:</p>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-white/10 mb-6 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre-wrap"><code>{`# Download video + Chinese subtitles (embedded into the video)
yt-dlp --write-sub --sub-lang zh-Hans --embed-subs "https://www.youtube.com/watch?v=VIDEO_ID"

# Download ONLY the subtitle file (no video)
yt-dlp --write-sub --sub-lang zh-Hans --skip-download "https://www.youtube.com/watch?v=VIDEO_ID"

# Download with auto-generated Chinese subtitles
yt-dlp --write-auto-sub --sub-lang zh-Hans --embed-subs "https://www.youtube.com/watch?v=VIDEO_ID"

# Download with BOTH Chinese and English subtitles
yt-dlp --write-sub --sub-lang "zh-Hans,en" --embed-subs "https://www.youtube.com/watch?v=VIDEO_ID"

# Convert subtitle format to SRT
yt-dlp --write-sub --sub-lang zh-Hans --convert-subs srt --skip-download "https://www.youtube.com/watch?v=VIDEO_ID"`}</code></pre>
          </div>

          <h3 className="text-xl font-semibold text-white mb-4">Step 4: Choose Video Quality</h3>
          <p className="text-gray-300 mb-4">You can specify the video quality to balance file size and resolution:</p>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-white/10 mb-6 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre-wrap"><code>{`# Best quality (may be large)
yt-dlp -f "bestvideo+bestaudio" --write-sub --sub-lang zh-Hans --embed-subs URL

# 720p for smaller file size (good for mobile)
yt-dlp -f "bestvideo[height<=720]+bestaudio" --write-sub --sub-lang zh-Hans --embed-subs URL

# Download entire playlist with Chinese subs
yt-dlp --write-sub --sub-lang zh-Hans --embed-subs "https://www.youtube.com/playlist?list=PLAYLIST_ID"`}</code></pre>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Most flexible: supports every subtitle language and format</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Can embed subtitles directly into the video file</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Batch download entire playlists and channels</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Completely free and open source</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Requires comfort with the command line</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Initial setup takes a few minutes</div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* Method 2: Online Tools */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 2: Online Subtitle Download Tools (Easiest)</h2>
          <p className="text-gray-300 mb-6">If you do not want to install anything, several online tools let you extract Chinese subtitles from YouTube videos directly in your browser. These are the simplest option, though they usually only download the subtitle file itself, not the video.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">SaveSubs</h3>
            <p className="text-gray-300 mb-3">SaveSubs is one of the most popular online tools for downloading YouTube subtitles. Simply paste the video URL, select Chinese from the language list, and download the subtitle file in SRT or TXT format. It supports both human-written and auto-generated subtitles.</p>
            <p className="text-gray-400 text-sm mb-3"><strong className="text-white">URL:</strong> savesubs.com &nbsp;|&nbsp; <strong className="text-white">Formats:</strong> SRT, TXT, VTT</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> No installation required, works in any browser</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Supports YouTube, Vimeo, Facebook, and more</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Downloads subtitles only, not the video itself</div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">DownSub</h3>
            <p className="text-gray-300 mb-3">DownSub extracts subtitles from YouTube, Viki, VLive, and other platforms. It automatically detects all available languages and lets you download any of them as SRT or TXT files. DownSub also offers a translation feature that can machine-translate subtitles into Chinese if the original language is different.</p>
            <p className="text-gray-400 text-sm mb-3"><strong className="text-white">URL:</strong> downsub.com &nbsp;|&nbsp; <strong className="text-white">Formats:</strong> SRT, TXT</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Auto-detects all available subtitle languages</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Built-in machine translation option</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Machine-translated subtitles may have errors</div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">YouTubeTranscript.com</h3>
            <p className="text-gray-300 mb-3">This tool generates a full text transcript of any YouTube video with timestamps. Paste the URL, choose Chinese, and you get a timestamped transcript you can copy or download. It is especially useful when you want to study the text alongside the video without needing a separate subtitle file.</p>
            <p className="text-gray-400 text-sm mb-3"><strong className="text-white">URL:</strong> youtubetranscript.com &nbsp;|&nbsp; <strong className="text-white">Formats:</strong> TXT with timestamps</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Full transcript with timestamps, great for study notes</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Simple copy-paste interface</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Limited format options compared to other tools</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-4">How to Use Online Tools (General Steps)</h3>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
            {[
              { title: "Copy the YouTube Video URL", desc: "Open the Chinese video on YouTube and copy the full URL from the address bar." },
              { title: "Paste the URL into the Tool", desc: "Go to SaveSubs, DownSub, or YouTubeTranscript and paste the video link into the input field." },
              { title: "Select Chinese as the Language", desc: "Choose Simplified Chinese (zh-Hans) or Traditional Chinese (zh-Hant) from the available languages." },
              { title: "Download the Subtitle File", desc: "Click download and save the SRT or TXT file to your device. You can then load it into any media player alongside the video." },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-red-400/50 flex items-center justify-center text-red-400 font-bold shrink-0 z-10">{i + 1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>

          <hr className="border-white/10 my-12" />

          {/* Method 3: Browser Extensions */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Method 3: Browser Extensions</h2>
          <p className="text-gray-300 mb-6">Several Chrome and Firefox extensions can download YouTube videos or extract subtitles directly from your browser. These offer a middle ground between the power of yt-dlp and the simplicity of online tools.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Subtitle Downloader Extensions</h3>
            <p className="text-gray-300 mb-3">Extensions like <strong className="text-white">Substital</strong> and <strong className="text-white">YouTube Subtitle Downloader</strong> add a download button directly on the YouTube player page. When you click it, you can select Chinese and download the subtitle file in SRT format. These are convenient because they integrate right into your browsing workflow.</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> One-click subtitle download from YouTube pages</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> No need to copy-paste URLs to external sites</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Most only download subtitles, not the video file</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> May stop working when YouTube updates its interface</div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Video Downloader Extensions</h3>
            <p className="text-gray-300 mb-3">Extensions like <strong className="text-white">Video DownloadHelper</strong> can download the actual video file from many sites. However, most video downloader extensions do not embed subtitles into the downloaded file. You would need to download the video and subtitle file separately, then combine them using a media player like VLC or a tool like FFmpeg.</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Can download the video file itself</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Subtitles usually not embedded, requires extra steps</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Chrome Web Store restricts many video download extensions</div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* Comparison Table */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Comparison: Which Method Should You Use?</h2>
          <p className="text-gray-300 mb-6">Each method has its strengths. Here is a side-by-side comparison to help you decide.</p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 pr-4 text-white font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 text-white font-semibold">yt-dlp</th>
                  <th className="text-center py-3 px-4 text-white font-semibold">Online Tools</th>
                  <th className="text-center py-3 px-4 text-white font-semibold">Extensions</th>
                  <th className="text-center py-3 pl-4 text-white font-semibold">Funlingo</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Downloads video</td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><X className="w-4 h-4 text-gray-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Downloads Chinese subtitles</td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><X className="w-4 h-4 text-gray-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Embeds subs in video</td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><X className="w-4 h-4 text-gray-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Dual subtitles (Chinese + English)</td>
                  <td className="text-center py-3 px-4 text-gray-500">Manual</td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">No installation needed</td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Batch download playlists</td>
                  <td className="text-center py-3 px-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><X className="w-4 h-4 text-gray-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-4">Click-to-translate words</td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 px-4"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                  <td className="text-center py-3 pl-4"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Price</td>
                  <td className="text-center py-3 px-4 text-green-400">Free</td>
                  <td className="text-center py-3 px-4 text-green-400">Free</td>
                  <td className="text-center py-3 px-4 text-green-400">Free</td>
                  <td className="text-center py-3 pl-4 text-green-400">Free</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="border-white/10 my-12" />

          {/* Alternative: Funlingo */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">A Better Alternative: Watch with Dual Chinese Subtitles (No Downloading)</h2>
          <p className="text-gray-300 mb-6">Downloading videos is useful for offline access, but if your primary goal is learning Chinese, there is a faster and more effective approach. Instead of downloading, you can watch YouTube videos with dual subtitles in real time, seeing Chinese and your native language simultaneously on the screen.</p>

          <p className="text-gray-300 mb-6">Funlingo is a free Chrome extension that adds dual subtitles to YouTube, Netflix, and Amazon Prime Video. For Chinese learners, it displays Chinese characters (Simplified or Traditional) alongside an English translation (or any other language) directly below the video. You do not need to download anything, manage subtitle files, or use command-line tools.</p>

          <div className="bg-gradient-to-br from-red-900/20 to-transparent p-8 rounded-xl border border-red-400/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 mt-0">Why Funlingo Beats Downloading for Chinese Learning</h3>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
                <div className="flex-1">
                  <span className="text-red-400 text-sm uppercase tracking-wider block mb-1">Real-Time Dual Subtitles</span>
                  <span className="text-white font-medium">See Chinese characters and English (or any language) side by side as you watch. No file management, no syncing issues, no extra steps.</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
                <div className="flex-1">
                  <span className="text-red-400 text-sm uppercase tracking-wider block mb-1">Click Any Word to Translate</span>
                  <span className="text-white font-medium">Click any Chinese character or word in the subtitles to see its pinyin, pronunciation, and meaning instantly. No copying to a separate dictionary app.</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
                <div className="flex-1">
                  <span className="text-red-400 text-sm uppercase tracking-wider block mb-1">Works on YouTube, Netflix, and Prime Video</span>
                  <span className="text-white font-medium">One extension covers all three major streaming platforms. Watch Chinese dramas on Netflix, Chinese vlogs on YouTube, and Chinese films on Prime Video with dual subtitles.</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <span className="text-red-400 text-sm uppercase tracking-wider block mb-1">Completely Free</span>
                  <span className="text-white font-medium">Funlingo is free to use with no hidden paywalls, premium tiers, or trial periods. Dual subtitles, word lookup, and vocabulary saving are all included at no cost.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Watch Chinese YouTube videos with dual subtitles. No downloading needed.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          {/* Best Chinese YouTube Channels */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Chinese YouTube Channels for Language Learning</h2>
          <p className="text-gray-300 mb-6">Whether you download videos or use Funlingo for real-time dual subtitles, you need great content. Here are the best Chinese YouTube channels organized by category and difficulty level.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Mandarin Corner</h3>
              <p className="text-sm text-gray-400 mb-2">Street interviews and real-life conversations in Mandarin with pinyin and English subtitles. Content ranges from beginner to advanced and covers everyday topics that teach practical, usable Chinese.</p>
              <Badge className="bg-green-900/30 text-green-400 border-green-400/20 text-xs">Beginner to Advanced</Badge>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Li Ziqi</h3>
              <p className="text-sm text-gray-400 mb-2">Beautiful cinematic videos about traditional Chinese cooking and rural life. Minimal dialogue but excellent for cultural immersion and learning food and nature vocabulary at a gentle pace.</p>
              <Badge className="bg-blue-900/30 text-blue-400 border-blue-400/20 text-xs">Beginner</Badge>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">ChinesePod</h3>
              <p className="text-sm text-gray-400 mb-2">Structured Mandarin lessons organized by proficiency level. Each video focuses on a specific grammar point or vocabulary theme with clear explanations and example sentences.</p>
              <Badge className="bg-green-900/30 text-green-400 border-green-400/20 text-xs">Beginner to Intermediate</Badge>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">CCTV Chinese</h3>
              <p className="text-sm text-gray-400 mb-2">Official CCTV channel with news broadcasts, documentaries, and cultural programs. Formal Mandarin with clear pronunciation, ideal for learners targeting professional or academic Chinese.</p>
              <Badge className="bg-orange-900/30 text-orange-400 border-orange-400/20 text-xs">Intermediate to Advanced</Badge>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Xiao Ma NYC</h3>
              <p className="text-sm text-gray-400 mb-2">A polyglot who speaks Mandarin on the streets of New York, surprising native speakers. Fun, engaging content that demonstrates natural conversational Chinese in real-world interactions.</p>
              <Badge className="bg-blue-900/30 text-blue-400 border-blue-400/20 text-xs">Beginner to Intermediate</Badge>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Dashu Mandarin</h3>
              <p className="text-sm text-gray-400 mb-2">Short, focused lessons on Chinese grammar, sentence patterns, and common mistakes. Great for learners who want structured explanations alongside their immersion practice.</p>
              <Badge className="bg-green-900/30 text-green-400 border-green-400/20 text-xs">Beginner to Intermediate</Badge>
            </div>
          </div>

          <p className="text-gray-300 mb-6">For more strategies on learning through video content, check out our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a> and tips for <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">building vocabulary while watching shows</a>.</p>

          <hr className="border-white/10 my-12" />

          {/* FAQ */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <strong className="text-white block mb-1">How do I download YouTube videos with Chinese subtitles?</strong>
                <p className="text-gray-400 text-sm">The most reliable method is yt-dlp with the command <code className="text-red-400 bg-white/5 px-1 rounded">yt-dlp --write-sub --sub-lang zh-Hans --embed-subs URL</code>. For a simpler approach, use online tools like SaveSubs or DownSub to extract just the subtitle file. For real-time Chinese learning without downloading, install the free Funlingo Chrome extension for dual subtitles.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Can I watch YouTube with Chinese and English subtitles at the same time?</strong>
                <p className="text-gray-400 text-sm">Yes. Funlingo is a free Chrome extension that displays dual subtitles on YouTube, showing Chinese and English (or any other language pair) simultaneously. No downloading or subtitle file management required.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Are auto-generated Chinese subtitles on YouTube accurate?</strong>
                <p className="text-gray-400 text-sm">YouTube&apos;s auto-generated Chinese subtitles have improved significantly but are not perfect, especially with fast speech, accents, or specialized vocabulary. For language learning, videos with manually created Chinese subtitles are more reliable. Funlingo works with both auto-generated and manual subtitles.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Is it legal to download YouTube videos with Chinese subtitles?</strong>
                <p className="text-gray-400 text-sm">Downloading YouTube videos is against YouTube&apos;s Terms of Service unless the video has a download option enabled by the creator. Downloading subtitle files alone (without the video) falls into a grayer area. For a completely compliant approach, use Funlingo to watch with dual subtitles directly on YouTube without downloading anything.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">What is the best format for Chinese subtitle files?</strong>
                <p className="text-gray-400 text-sm">SRT (SubRip) is the most widely supported format and works with nearly every media player including VLC, MPV, and PotPlayer. VTT (WebVTT) is another good option, especially for web-based players. Both formats handle Chinese characters without issues as long as the file encoding is UTF-8.</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning Chinese on YouTube Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free dual subtitles on every Chinese YouTube video. Click any word to see its meaning. No subscription, no downloading, no hassle.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
