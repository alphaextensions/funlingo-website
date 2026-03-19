"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, FileText, Download, Play, Pencil, RefreshCw, Globe, BookOpen, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SrtFilesSubtitleDownloadContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">SRT Files Explained: How to Download &amp; Use Subtitle Files</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">Subtitles are one of the most powerful tools for language learners, accessibility advocates, and anyone watching foreign-language content. At the heart of subtitles is the SRT file, a simple text format that has been the standard for over two decades. This guide covers everything you need to know about subtitle downloads: what SRT files are, where to find them, how to use them, and why modern tools like FunLingo are making manual subtitle management a thing of the past.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What Is an SRT File?</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><FileText className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">SRT = SubRip Text</span></div>
            <p className="text-gray-300 mb-4">An SRT file is a plain text file that contains subtitle data. The format was originally developed for the SubRip software, which could extract subtitles from DVDs. Today it is the most widely supported subtitle format across media players, video editors, and streaming platforms.</p>
          </div>
          <p className="text-gray-300 mb-4">Every SRT file follows a simple structure. Each subtitle entry has three parts: a sequence number, a timestamp range, and the subtitle text. Here is an example:</p>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8 font-mono text-sm">
            <p className="text-white mb-1">1</p>
            <p className="text-gray-400 mb-1">00:00:01,000 --&gt; 00:00:04,500</p>
            <p className="text-gray-200 mb-4">Welcome to today&apos;s lesson.</p>
            <p className="text-white mb-1">2</p>
            <p className="text-gray-400 mb-1">00:00:05,000 --&gt; 00:00:08,200</p>
            <p className="text-gray-200 mb-4">We will learn about subtitle formats.</p>
            <p className="text-white mb-1">3</p>
            <p className="text-gray-400 mb-1">00:00:09,000 --&gt; 00:00:12,800</p>
            <p className="text-gray-200">Let&apos;s get started.</p>
          </div>
          <p className="text-gray-300 mb-6">The timestamp format is <code className="bg-white/10 px-2 py-1 rounded text-sm">hours:minutes:seconds,milliseconds</code>. Note the comma before milliseconds, not a period. This is one of the key differences between SRT and other formats. The simplicity of this format is its greatest strength: you can open, read, and edit SRT files with any text editor.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Other Subtitle Formats You Should Know</h2>
          <p className="text-gray-300 mb-6">While SRT dominates, several other subtitle formats exist for different use cases. Understanding the differences helps you choose the right format and convert between them when needed.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">WebVTT (.vtt)</h3>
            <p className="text-gray-300">WebVTT is the web standard for HTML5 video. It is nearly identical to SRT but adds a <code className="bg-white/10 px-2 py-1 rounded text-sm">WEBVTT</code> header, uses periods instead of commas for milliseconds, and supports CSS styling and positioning. YouTube and most web players use VTT internally. Converting between SRT and VTT is trivial.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">SSA / ASS (.ssa / .ass)</h3>
            <p className="text-gray-300">SubStation Alpha and Advanced SubStation Alpha are formats popular in the anime community. They support rich styling, custom fonts, colors, positioning, and even animation effects. If you watch fan-subtitled anime, you have almost certainly encountered ASS files. They are more complex to edit but produce visually impressive results.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">SUB / IDX (.sub / .idx)</h3>
            <p className="text-gray-300">The MicroDVD SUB format and its VobSub variant (SUB paired with an IDX index file) are older formats associated with DVD ripping. VobSub subtitles are bitmap-based, meaning they are images rather than text. This makes them harder to edit but preserves the original DVD subtitle styling exactly.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Where to Download Subtitles</h2>
          <p className="text-gray-300 mb-6">There are several reputable websites where you can find subtitle files for movies, TV shows, and other video content. Here are the most reliable sources for <strong className="text-white">subtitle downloads</strong>:</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3"><Download className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">OpenSubtitles.org</span></div>
            <p className="text-gray-300">The largest subtitle database on the internet with millions of subtitles in dozens of languages. Supports searching by movie name, IMDB ID, or file hash. Free accounts have daily download limits; a VIP subscription removes them. The site also offers an API for developers building subtitle tools.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3"><Download className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Subscene.com</span></div>
            <p className="text-gray-300">A community-driven subtitle site with strong coverage of Asian and Middle Eastern languages. The interface is clean and subtitles are well-organized by language. Particularly good for Korean, Japanese, Arabic, and Farsi subtitles.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3"><Download className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">YIFY Subtitles</span></div>
            <p className="text-gray-300">Focused on movie subtitles, YIFY Subtitles offers a straightforward interface with subtitles organized by movie and language. The site is ad-supported but functional, and its subtitle files are generally well-timed and accurate.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Download className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Podnapisi.net</span></div>
            <p className="text-gray-300">A Slovenian-based subtitle site with excellent coverage of European languages. The community is active and subtitles are regularly updated. Podnapisi has a reputation for high-quality, well-synchronized subtitle files.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5 text-yellow-400" /><span className="font-semibold text-white">Safety tips for subtitle download sites</span></div>
            <p className="text-gray-300">SRT and VTT files are plain text and cannot contain malware. However, subtitle download sites sometimes have misleading ads and fake download buttons. Stick to the sites listed above, use an ad blocker, and never install software that a subtitle site asks you to download. If the file you downloaded ends in .exe or .zip instead of .srt, delete it immediately.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Use SRT Files with Media Players</h2>
          <p className="text-gray-300 mb-6">Once you have downloaded a subtitle file, loading it into a media player is straightforward. Here are instructions for the most popular players:</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3"><Play className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">VLC Media Player</span></div>
            <ol className="list-decimal pl-6 space-y-2 text-gray-300">
              <li><strong className="text-white">Auto-load:</strong> Place the SRT file in the same folder as the video file with the same name (e.g., movie.mp4 and movie.srt). VLC will load it automatically.</li>
              <li><strong className="text-white">Manual load:</strong> Open your video in VLC, then go to Subtitle &gt; Add Subtitle File and select your SRT file.</li>
              <li><strong className="text-white">Adjust timing:</strong> Press <code className="bg-white/10 px-2 py-1 rounded text-sm">G</code> to delay subtitles or <code className="bg-white/10 px-2 py-1 rounded text-sm">H</code> to advance them, in 50ms increments.</li>
              <li><strong className="text-white">Multiple subtitle tracks:</strong> VLC supports loading multiple subtitle files. Use the Subtitle menu to switch between them.</li>
            </ol>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3"><Play className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">MPV Player</span></div>
            <p className="text-gray-300">MPV automatically loads SRT files that share the same filename as the video. You can also drag and drop subtitle files onto the player window. Press <code className="bg-white/10 px-2 py-1 rounded text-sm">V</code> to cycle through available subtitle tracks and <code className="bg-white/10 px-2 py-1 rounded text-sm">Z</code> / <code className="bg-white/10 px-2 py-1 rounded text-sm">Shift+Z</code> to adjust timing.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Play className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Streaming Services</span></div>
            <p className="text-gray-300">Most streaming services like Netflix and YouTube do not support loading external SRT files. They use their own internal subtitle systems. This is one of the key limitations that tools like FunLingo solve by working directly within the streaming platform to provide dual subtitles without external files.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Create and Edit SRT Files</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Pencil className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Tools for subtitle editing</span></div>
            <p className="text-gray-300 mb-4">Because SRT files are plain text, you can create and edit them with any text editor. However, dedicated subtitle editors make the process much easier by providing a timeline, video preview, and auto-sync features.</p>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Creating SRT Files from Scratch</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-6">
            <li>Open a text editor (Notepad, VS Code, Sublime Text).</li>
            <li>Type the sequence number (starting at 1), then press Enter.</li>
            <li>Type the timestamp range in the format <code className="bg-white/10 px-2 py-1 rounded text-sm">HH:MM:SS,mmm --&gt; HH:MM:SS,mmm</code>, then press Enter.</li>
            <li>Type the subtitle text. You can use multiple lines for longer text.</li>
            <li>Add a blank line between entries.</li>
            <li>Save the file with the <code className="bg-white/10 px-2 py-1 rounded text-sm">.srt</code> extension and <strong className="text-white">UTF-8 encoding</strong> (critical for non-Latin characters).</li>
          </ol>

          <h3 className="text-xl font-bold text-white mb-4">Recommended Subtitle Editors</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-300 mb-6">
            <li><strong className="text-white">Subtitle Edit</strong> (Windows, free): The most feature-rich free subtitle editor. Supports dozens of formats, has auto-sync, waveform display, and OCR for bitmap subtitles.</li>
            <li><strong className="text-white">Aegisub</strong> (Cross-platform, free): Popular in the anime community. Excellent for ASS/SSA styling but also handles SRT well. Features audio waveform display and powerful timing tools.</li>
            <li><strong className="text-white">Subtitle Workshop</strong> (Windows, free): A lightweight option that handles basic editing and format conversion without the complexity of Subtitle Edit.</li>
          </ul>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Converting Between Subtitle Formats</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><RefreshCw className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Common conversions</span></div>
            <p className="text-gray-300 mb-4">The most common conversion is between SRT and VTT, since many web-based tools require VTT. Here are the key differences to adjust:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong className="text-white">SRT to VTT:</strong> Add <code className="bg-white/10 px-2 py-1 rounded text-sm">WEBVTT</code> as the first line, remove sequence numbers, and replace commas with periods in timestamps.</li>
              <li><strong className="text-white">VTT to SRT:</strong> Remove the WEBVTT header, add sequence numbers, and replace periods with commas in timestamps.</li>
              <li><strong className="text-white">SRT to ASS:</strong> Use Aegisub or Subtitle Edit to import the SRT and export as ASS. This lets you add styling afterward.</li>
            </ul>
          </div>
          <p className="text-gray-300 mb-6">Online converters like Subtitle Tools (subtitle-tools.com) handle these conversions in your browser. For batch conversions, ffmpeg can convert subtitle formats on the command line: <code className="bg-white/10 px-2 py-1 rounded text-sm">ffmpeg -i subtitles.srt subtitles.vtt</code>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Using Subtitles for Language Learning</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Globe className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Subtitles are a language learner&apos;s best friend</span></div>
            <p className="text-gray-300 mb-4">Research consistently shows that watching content with subtitles improves vocabulary acquisition, listening comprehension, and reading speed. The ideal approach depends on your level:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong className="text-white">Beginners:</strong> Watch with subtitles in your native language to understand the plot, then rewatch with target-language subtitles.</li>
              <li><strong className="text-white">Intermediate:</strong> Use dual subtitles so you can read both languages simultaneously. This is where the real acquisition happens.</li>
              <li><strong className="text-white">Advanced:</strong> Switch to target-language subtitles only, using them as a reading aid for rapid speech.</li>
            </ul>
          </div>
          <p className="text-gray-300 mb-6">The challenge with manual subtitle downloads is the friction. You need to find the right file, match it to your video, deal with timing issues, and you only get one language at a time. For language learning, you want two languages visible simultaneously, which is difficult to set up with standalone SRT files.</p>
          <p className="text-gray-300 mb-6">For a deeper dive into this methodology, read our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a> and our article on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">building vocabulary through shows</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How FunLingo Eliminates Manual Subtitle Downloads</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><BookOpen className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">Dual subtitles without the hassle</span></div>
            <p className="text-gray-300 mb-4">If you are downloading subtitles primarily for language learning, FunLingo offers a fundamentally better workflow. Instead of hunting for SRT files, managing downloads, and fighting sync issues, FunLingo works directly inside Netflix, YouTube, and Amazon Prime Video to display dual subtitles in real time.</p>
            <p className="text-gray-300 mb-4">With FunLingo you get:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong className="text-white">Automatic dual subtitles</strong> in your target and native language, perfectly synced to the video.</li>
              <li><strong className="text-white">Click-to-translate</strong> on any word for an instant definition without leaving the player.</li>
              <li><strong className="text-white">Vocabulary saving</strong> so you can build a personal word list from the content you watch.</li>
              <li><strong className="text-white"><a href="/blog/how-to-learn-languages-with-reading-mode" className="text-[#C642FC] hover:underline">Reading Mode</a></strong> to browse the full transcript and study at your own pace.</li>
              <li><strong className="text-white">No file management</strong> — everything happens inside your browser automatically.</li>
            </ul>
          </div>
          <p className="text-gray-300 mb-6">SRT files remain essential for offline viewing, video editing, and accessibility. But for the specific use case of language learning on streaming platforms, FunLingo replaces a manual, error-prone workflow with a seamless, integrated experience. Learn more about why this approach works in our guide on <a href="/blog/netflix-language-learning" className="text-[#C642FC] hover:underline">Netflix language learning</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">What program opens SRT files?</h3>
            <p className="text-gray-300">SRT files are plain text, so any text editor can open them: Notepad on Windows, TextEdit on macOS, or code editors like VS Code. To view subtitles synced with video, use VLC, MPV, or PotPlayer. You can also import SRT files into video editors like Premiere Pro, DaVinci Resolve, and Final Cut Pro for embedding subtitles into video exports.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">How do I sync subtitles that are out of time?</h3>
            <p className="text-gray-300">For quick fixes while watching, VLC lets you press G or H to shift subtitle timing by 50ms per press. For a permanent fix, open the SRT file in Subtitle Edit or Aegisub and use the time-shift tool to adjust all timestamps at once. If only certain sections are off, you may need to manually adjust individual timestamps or use the resync feature in Subtitle Edit, which lets you set reference points.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Are subtitle download sites safe?</h3>
            <p className="text-gray-300">SRT and VTT files are plain text and cannot contain viruses or malware. The risk comes from the download sites themselves, which may have deceptive ads or fake download buttons. Stick to reputable sites like OpenSubtitles, Subscene, and Podnapisi. Use an ad blocker, and never download an .exe file from a subtitle site. If you are asked to install software to view subtitles, close the page immediately.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">What is the difference between SRT and VTT?</h3>
            <p className="text-gray-300">Both are text-based subtitle formats with nearly identical structures. SRT uses commas for milliseconds (00:00:01,000) while VTT uses periods (00:00:01.000). VTT requires a WEBVTT header line and supports CSS-based styling and positioning. VTT is the HTML5 web standard, so browsers and web players prefer it. SRT has broader support in desktop media players and video editors. Converting between the two takes seconds with any subtitle tool or a simple find-and-replace.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-2 font-semibold">Stop hunting for subtitle files. Start learning with FunLingo.</p>
            <p className="text-gray-400 mb-6">Dual subtitles, instant word translations, and vocabulary saving — all built into Netflix, YouTube, and Prime Video. Completely free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">
                Try FunLingo Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
