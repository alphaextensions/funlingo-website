"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X } from "lucide-react";
import { StatGrid, KeyTakeaways, StepFlow, Callout, ProsCons } from "@/app/blog/_components/graphics";
import { Badge } from "@/components/ui/badge";

export default function HowToAddSubtitlesToAVideoContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[var(--bg)] to-[var(--bg)] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(200,31,212,0.1)] text-[#C81FD4] border-[#C81FD4]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">How to Add Subtitles to a Video (2026): 5 Free Methods</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[var(--text-dim)] font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> August 26, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-[var(--text-dim)]">

          <img
            src="/blog-images/how-to-add-subtitles-to-a-video-hero.jpg"
            alt="A video player frame with a subtitle bar, beside a floating SRT timestamp block"
            width={1400}
            height={781}
            fetchPriority="high"
          />

          <KeyTakeaways items={["Decide first whether you want soft subtitles (a separate file viewers can switch off) or burned-in subtitles (permanent, always visible).", "For a video you own, the fastest free route is auto-generated captions in YouTube Studio, then fixing the errors by hand.", "VLC plays an SRT file alongside any local video with no re-encoding and no upload.", "HandBrake burns subtitles permanently into the picture for platforms that strip subtitle tracks.", "For streaming video you do not own, a browser extension overlays subtitles on the player instead — and can show two languages at once."]} />

          <p className="lead text-xl leading-relaxed text-[var(--text)] mb-6">Adding subtitles to a video sounds like one task, but it is really two very different ones. If the video file is yours, you are attaching or burning in a subtitle track. If you are watching something on Netflix or YouTube, you cannot touch the file at all — you overlay subtitles on top of the player as it plays.</p>
          <p className="text-[var(--text-dim)] mb-6">This guide covers both. Start by picking the kind of subtitles you actually need, because that decision drives every step after it.</p>

          <StatGrid
            stats={[
              { value: "5", label: "methods covered" },
              { value: ".srt", label: "most compatible format" },
              { value: "42", label: "characters per line max" },
              { value: "Free", label: "every tool listed" },
            ]}
          />

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Soft vs Burned-In Subtitles</h2>
          <p className="text-[var(--text-dim)] mb-6">This is the one choice worth understanding before you open any tool. Everything else is mechanics.</p>

          <img
            src="/blog-images/how-to-add-subtitles-to-a-video-inline.jpg"
            alt="Side-by-side comparison of soft subtitles, which can be switched off, and burned-in subtitles painted into the pixels"
            width={1400}
            height={781}
            loading="lazy"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[#C81FD4]/30">
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">Soft subtitles</h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">Stored as a separate file (.srt, .vtt) or as a track inside the container. The player draws them at playback time.</p>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Viewers can switch them off</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Multiple languages in one file</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Searchable and indexable text</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Fix a typo without re-encoding</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Some platforms strip the track</div>
              </div>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">Burned-in subtitles</h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">Painted directly into the video pixels during export. Also called hardcoded or open captions.</p>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Survives every platform and re-upload</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Plays on autoplay-muted social feeds</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Exact control over font and position</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Cannot be turned off or translated</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Any fix means a full re-export</div>
              </div>
            </div>
          </div>

          <Callout variant="tip" title="Which should you pick?">
            <p>Default to soft subtitles. They are reversible, accessible, and good for search. Burn them in only when the destination demands it — Instagram, TikTok, and most autoplay-muted feeds either ignore subtitle tracks or hide them behind a tap.</p>
          </Callout>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Method 1: Auto-Generate Captions in YouTube Studio</h2>
          <p className="text-[var(--text-dim)] mb-6">The fastest free option for a video you own. YouTube transcribes the audio, and you correct the mistakes instead of typing from scratch. Even a rough machine transcript saves most of the work.</p>

          <StepFlow steps={[
            { title: "Upload the video", desc: "Set it to Unlisted if you only want the transcript and plan to publish elsewhere." },
            { title: "Open Subtitles", desc: "In YouTube Studio, go to Subtitles and wait for the automatic track to finish processing." },
            { title: "Edit the errors", desc: "Click Duplicate and Edit. Fix names, technical terms, and homophones, which is where auto-captions fail most." },
            { title: "Download the SRT", desc: "Export the corrected track as .srt so you can reuse it anywhere else." },
          ]} />

          <Callout variant="note" title="Auto-captions are a first draft, not a deliverable">
            <p>Machine transcription is strong on ordinary speech and weak on proper nouns, jargon, accents, overlapping speakers, and background noise. Always read it through before publishing — an uncorrected auto-caption track reads as careless and is unreliable for accessibility.</p>
          </Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Method 2: Attach an SRT File in VLC</h2>
          <p className="text-[var(--text-dim)] mb-6">If the video sits on your own drive and you just want to watch it with subtitles, this takes about five seconds. Nothing is uploaded and nothing is re-encoded.</p>
          <p className="text-[var(--text-dim)] mb-6">Drag the .srt file onto the VLC window while the video is playing. That is the whole process. For it to load automatically every time, put the subtitle file in the same folder as the video and give it the same filename:</p>

          <div className="not-prose my-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 overflow-x-auto">
            <pre className="text-sm text-[var(--text-dim)] m-0 leading-relaxed"><code>{`my-video.mp4
my-video.srt          → loads automatically
my-video.es.srt       → Spanish track
my-video.en.srt       → English track`}</code></pre>
          </div>

          <p className="text-[var(--text-dim)] mb-6">If the subtitles drift out of sync, press <strong className="text-[var(--text)]">G</strong> to pull them earlier and <strong className="text-[var(--text)]">H</strong> to push them later, in 50ms steps. A constant offset is easy to fix this way; drift that grows over time usually means the subtitle file was timed against a different frame rate.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Method 3: Burn Subtitles In with HandBrake</h2>
          <p className="text-[var(--text-dim)] mb-6">HandBrake is free, open source, and available on Windows, macOS, and Linux. Use it when the subtitles have to survive re-uploads and platform processing.</p>

          <StepFlow steps={[
            { title: "Open the source", desc: "Drag your video file into HandBrake and let it scan." },
            { title: "Add the track", desc: "Go to the Subtitles tab, choose Add External Subtitle Track, and select your .srt file." },
            { title: "Tick Burn In", desc: "This is the step people miss. Without it the track is only muxed in as a soft subtitle." },
            { title: "Encode", desc: "Pick a preset such as Fast 1080p30 and start the encode. The subtitles are now permanent." },
          ]} />

          <Callout variant="warning" title="Keep the original">
            <p>Burning in is destructive and cannot be reversed — the text becomes part of the picture. Always export to a new file and keep your untouched master, or a single typo means re-editing from scratch.</p>
          </Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Method 4: Add Subtitles in a Video Editor</h2>
          <p className="text-[var(--text-dim)] mb-6">If you are already editing the video, do the subtitles in the same place. Every major editor now has automatic transcription built in, and you get full control over typography and placement.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><h3 className="text-lg font-bold text-[var(--text)] mb-2">CapCut</h3><p className="text-sm text-[var(--text-dim)]">Free, with solid auto-captions and social-ready animated styles. The usual choice for vertical video.</p></div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><h3 className="text-lg font-bold text-[var(--text)] mb-2">DaVinci Resolve</h3><p className="text-sm text-[var(--text-dim)]">Free tier includes transcription and a proper subtitle track on the timeline. Best free option for long-form work.</p></div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><h3 className="text-lg font-bold text-[var(--text)] mb-2">Premiere Pro</h3><p className="text-sm text-[var(--text-dim)]">Speech to Text generates a caption track you can export as SRT or burn in on export. Subscription only.</p></div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><h3 className="text-lg font-bold text-[var(--text)] mb-2">Descript</h3><p className="text-sm text-[var(--text-dim)]">Edits video by editing the transcript, so captions come free as a by-product of the edit itself.</p></div>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Method 5: Add Subtitles to Streaming Video You Do Not Own</h2>
          <p className="text-[var(--text-dim)] mb-6">None of the methods above apply to Netflix, YouTube, or Prime Video. You have no file to edit. What you can do is overlay subtitles on top of the player while it plays, using a browser extension.</p>
          <p className="text-[var(--text-dim)] mb-6">This matters most for language learners. A browser overlay can show the original language and your native language at the same time, which no built-in player setting will do — every streaming service lets you pick exactly one subtitle language at a time.</p>

          <ProsCons
            pros={["Shows two languages at once, which no native player supports", "Click any word for an instant translation without pausing", "Works across Netflix, YouTube, and Prime Video", "No files, no downloads, no re-encoding"]}
            cons={["Chrome desktop only — mobile streaming apps cannot run extensions", "Requires an active subscription to the streaming service", "Only overlays on playback; it does not change the video file"]}
          />

          <p className="text-[var(--text-dim)] mb-6"><a href="/blog/best-dual-subtitle-extension" className="text-[#C81FD4] hover:underline">Funlingo</a> is a free Chrome extension that does this on Netflix, YouTube, and Prime Video. You pick two languages, they appear together under the video, and clicking a word gives you the translation, phonetics, and audio without stopping playback.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <p className="text-lg text-[var(--text)] mb-6">Want subtitles in two languages on Netflix, YouTube, and Prime Video?</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">How to Write an SRT File by Hand</h2>
          <p className="text-[var(--text-dim)] mb-6">An SRT is plain text. If you only need a handful of lines, a text editor beats any tool. Each block is a number, a timestamp range, the text, and a blank line:</p>

          <div className="not-prose my-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 overflow-x-auto">
            <pre className="text-sm text-[var(--text-dim)] m-0 leading-relaxed"><code>{`1
00:00:01,000 --> 00:00:04,000
Welcome back to the channel.

2
00:00:04,500 --> 00:00:08,200
Today we're looking at three ways
to make your workflow faster.`}</code></pre>
          </div>

          <p className="text-[var(--text-dim)] mb-6">Four rules cover almost every broken SRT people run into:</p>
          <ul className="text-[var(--text-dim)] mb-6 space-y-2">
            <li>Timestamps use a <strong className="text-[var(--text)]">comma</strong> before the milliseconds, not a period. A period is the VTT convention and will break an SRT parser.</li>
            <li>The arrow is exactly <code className="text-[var(--text)]">--&gt;</code>, two hyphens and a right angle bracket, with a space on each side.</li>
            <li>Every block ends with a blank line, including the last one.</li>
            <li>Save as UTF-8. Anything else mangles accented characters and non-Latin scripts.</li>
          </ul>

          <Callout variant="tip" title="Converting to WebVTT">
            <p>For HTML5 video you need .vtt instead. The conversion is nearly free: add the line <code>WEBVTT</code> at the top of the file and replace the comma in every timestamp with a period. The block structure stays the same.</p>
          </Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Making Subtitles Actually Readable</h2>
          <p className="text-[var(--text-dim)] mb-6">Broadcast subtitling has settled on a few conventions over decades. They are worth following, because they are tuned to how fast people read while also watching a picture.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-32">Line length</span><span className="text-[var(--text-dim)]">Around 42 characters. Longer lines force viewers to scan instead of glance.</span></div>
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-32">Lines on screen</span><span className="text-[var(--text-dim)]">Two at most. Three starts covering the picture.</span></div>
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-32">Duration</span><span className="text-[var(--text-dim)]">At least 1 second, at most 7. Below one second the eye cannot catch it.</span></div>
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-32">Reading speed</span><span className="text-[var(--text-dim)]">Roughly 17 characters per second. Condense the wording rather than flashing text faster.</span></div>
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-32">Line breaks</span><span className="text-[var(--text-dim)]">Break at clause boundaries, never between an article and its noun.</span></div>
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-32">Sync</span><span className="text-[var(--text-dim)]">Appear as the line is spoken. Early subtitles spoil jokes; late ones read as errors.</span></div>
            </div>
          </div>

          <p className="text-[var(--text-dim)] mb-6">If you are adding subtitles for language learning rather than accessibility, the calculus changes — you want the original text alongside a translation, not a condensed single track. Our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C81FD4] hover:underline">learning a language by watching</a> covers that approach in depth.</p>

          <hr className="border-[var(--border)] my-12" />

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-12">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-[var(--text)] block mb-1">How do I add subtitles to a video for free?</strong><p className="text-[var(--text-dim)] text-sm">Upload to YouTube Studio and correct the auto-generated captions, or drag an SRT onto the video in VLC. Both are free. For streaming video you do not own, use a free Chrome extension such as Funlingo.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">What is an SRT file?</strong><p className="text-[var(--text-dim)] text-sm">A plain text file of numbered subtitle blocks, each with a start and end timestamp and one or two lines of text. It is the most widely supported subtitle format and opens in any text editor.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">What is the difference between soft and burned-in subtitles?</strong><p className="text-[var(--text-dim)] text-sm">Soft subtitles live in a separate file or track, so viewers can switch them off or change language. Burned-in subtitles are rendered into the pixels permanently and cannot be removed.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">Can I add subtitles to Netflix or YouTube videos I do not own?</strong><p className="text-[var(--text-dim)] text-sm">Not to the file itself, but a browser extension can overlay subtitles on the player as you watch. Funlingo does this on Netflix, YouTube, and Prime Video, and shows two languages at once.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">Why are my subtitles out of sync?</strong><p className="text-[var(--text-dim)] text-sm">A constant offset means the file starts at the wrong point — nudge it with G and H in VLC. Drift that grows over time means the subtitles were timed against a different frame rate, and the file needs re-timing rather than shifting.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Subtitles in Two Languages, Free</h2>
            <p className="text-lg text-[var(--text-dim)] mb-8 max-w-xl mx-auto">Overlay dual subtitles on Netflix, YouTube, and Prime Video. Click any word for an instant translation. No paywall, no premium tier.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
