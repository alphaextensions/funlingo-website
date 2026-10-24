"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Zap, Shield, Download, Languages } from "lucide-react";
import { StatGrid, KeyTakeaways, Callout, StepFlow, FeatureGrid } from "@/app/blog/_components/graphics";
import { Badge } from "@/components/ui/badge";

export default function BestSubtitleExtensionsChromeContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[var(--bg)] to-[var(--bg)] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(200,31,212,0.1)] text-[#C81FD4] border-[#C81FD4]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">7 Best Subtitle Extensions for Chrome (2026)</h1>
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
            src="/blog-images/best-subtitle-extensions-chrome-hero.jpg"
            alt="A row of Chrome subtitle extension cards, each labelled with a different job: add, download, translate, sync, and style"
            width={1400}
            height={781}
            fetchPriority="high"
          />

          <KeyTakeaways items={["\"Subtitle extension\" covers five unrelated jobs. Installing the wrong category is the usual reason people conclude these tools do not work.", "Substital is the pick when a video has no captions at all and you need to load your own SRT.", "Downloaders export the subtitle file itself. They show nothing on screen — a different job from overlays.", "Sync problems split in two: a constant offset is a one-slider fix, while growing drift means the file was timed for another frame rate.", "Every overlay extension needs permission to read and change data on the sites it supports. That is how the overlay is drawn, so judge the scope rather than the prompt."]} />

          <p className="lead text-xl leading-relaxed text-[var(--text)] mb-6">Search the Chrome Web Store for &quot;subtitles&quot; and you get hundreds of results doing wildly different things. Some overlay text on a player. Some scrape the caption file for download. Some only change the font size. Picking from the wrong category is why people conclude subtitle extensions are broken.</p>
          <p className="text-[var(--text-dim)] mb-6">So this list is organised by the job, not by star rating. Find what you are actually trying to do, then take the tool underneath it.</p>

          <StatGrid
            stats={[
              { value: "7", label: "tools and categories" },
              { value: "5", label: "distinct jobs" },
              { value: ".srt", label: "format they all speak" },
              { value: "0", label: "that work on mobile" },
            ]}
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Which Job Do You Need Done?</h2>

          <FeatureGrid items={[
            { title: "Add subtitles where there are none", desc: "The video has no captions at all and you want to load your own SRT file. You need an overlay loader." },
            { title: "Download the subtitle file", desc: "You want the SRT itself, to read, edit, or reuse offline. You need a downloader, not an overlay." },
            { title: "Translate captions that exist", desc: "Subtitles are there, but not in a language you read. You need a translation layer over the existing track." },
            { title: "Fix subtitles that are out of sync", desc: "The text is right but arrives early or late. You need offset control, not a different subtitle file." },
            { title: "Make captions readable", desc: "They are correct but too small, badly placed, or low contrast. You need styling control." },
          ]} />

          <Callout variant="note" title="One thing none of them do">
            <p>No extension changes the video file. Everything here is a visual layer drawn over the player at playback time, or a file exported out of it. Close the tab and the video is exactly as it was — which is also why none of this carries over to a TV app, a phone, or a download.</p>
          </Callout>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">The 7 Best Chrome Subtitle Extensions</h2>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">1. Substital — Best for Videos With No Captions</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[#C81FD4]/30 mb-8">
            <p className="text-[var(--text-dim)] mb-4">The specialist for the hardest case: a video with no captions whatsoever. Substital loads an external SRT — your own file, or one found through its built-in search — and overlays it on the player. It works across a broad range of sites rather than a fixed list of the big platforms, which is what makes it the default answer for embedded players, course videos, and smaller hosts.</p>
            <p className="text-[var(--text-dim)] mb-4">The trade-off is manual work. You are responsible for finding a subtitle file that matches your exact version of the video, and for nudging the sync when it does not line up. It also includes the offset control that makes it the practical answer to job four on this list.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Loads any custom SRT</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Broad site support</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Built-in sync offset</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4 flex-shrink-0" /> You supply the file</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">2. Subtitle Downloaders — Best for Getting the File Itself</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <p className="text-[var(--text-dim)] mb-4">A category rather than a single product. These pull the caption track off a video and hand you an .srt or .txt file. Useful for reading a transcript, studying a script offline, quoting accurately, or feeding text into another tool. They display nothing while you watch, which is exactly the point — different job, different tool.</p>
            <p className="text-[var(--text-dim)] mb-4">Quality varies more here than anywhere else on this list, and abandoned clones with near-identical names are common. We cover the ones actually worth installing in our guide to the <a href="/blog/best-youtube-subtitle-downloaders" className="text-[#C81FD4] hover:underline">best YouTube subtitle downloaders</a>, and the file formats themselves in <a href="/blog/srt-files-subtitle-download" className="text-[#C81FD4] hover:underline">working with SRT files</a>.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Exports .srt and .txt</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Good for offline study</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Nothing shown on screen</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4 flex-shrink-0" /> Quality varies widely</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">3. <a href="https://immersivetranslate.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">Immersive Translate</a> — Best for Translating Existing Captions</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <p className="text-[var(--text-dim)] mb-4">Primarily a whole-page translator that also handles YouTube captions. Reach for it when the subtitles already exist but not in a language you read, and when you want one tool covering articles and PDFs as well as video. Coverage is narrower than dedicated video tools — YouTube is well supported, Netflix much less so.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Translates YouTube captions</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Pages, PDFs, ebooks too</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4 flex-shrink-0" /> Freemium</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Limited Netflix support</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">4. Sync and Offset Fixers — Best for Subtitles That Arrive Late</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <p className="text-[var(--text-dim)] mb-4">Before hunting for a better subtitle file, work out which sync problem you have. The two look similar for the first minute and need completely different fixes.</p>
            <div className="grid gap-3 text-sm mb-4">
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-28">Constant offset</span><span className="text-[var(--text-dim)]">Every line is late by the same amount. Shift the whole track with an offset slider and you are done.</span></div>
              <div className="flex gap-3"><span className="text-[#C81FD4] font-bold flex-shrink-0 w-28">Growing drift</span><span className="text-[var(--text-dim)]">Fine at the start, seconds off by the end. The file was timed against a different frame rate — usually 23.976 against 25. No slider fixes this; the file needs re-timing.</span></div>
            </div>
            <p className="text-[var(--text-dim)] mb-4">Most offset controls ship inside overlay extensions rather than as standalone tools, which is why Substital doubles as the practical answer here.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Fixes constant offset instantly</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Cannot fix frame-rate drift</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">5. Caption Styling Extensions — Best for Readability and Accessibility</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <p className="text-[var(--text-dim)] mb-4">If the captions are already correct and simply hard to read, you do not need a language tool — you need control over size, font, background opacity, and vertical position. Several small extensions do only this, and they are the right answer for low-vision viewing, a large screen at a distance, or captions that keep landing on top of burned-in on-screen text.</p>
            <p className="text-[var(--text-dim)] mb-4">Check the native player first, though. YouTube and Netflix both expose caption styling in account settings, and using it costs you no extension permissions at all.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Font, size, contrast</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Reposition captions</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4 flex-shrink-0" /> Often native already</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> No translation</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">6. Transcript Viewers — Best for Searching a Video by Text</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <p className="text-[var(--text-dim)] mb-4">These render the caption track as a scrollable, clickable transcript beside the player, so you can search a forty-minute video for one sentence and jump straight to it. Strictly speaking they are reading the subtitles rather than displaying them, but if your real problem is finding a moment rather than understanding dialogue, this is the category you want.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Search within a video</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Click a line to jump</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Needs an existing track</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4 flex-shrink-0" /> Mostly YouTube-only</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] mb-4">7. Funlingo — Best If You Are Watching to Learn</h3>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[#C81FD4]/30 mb-8">
            <p className="text-[var(--text-dim)] mb-4">Worth separating out, because language learning is a genuinely different job from the six above. Learners do not want one clean caption track — they want the original and a translation on screen together, which is something no native player will do. Every streaming service lets you choose exactly one subtitle language at a time.</p>
            <p className="text-[var(--text-dim)] mb-4">Funlingo is a free Chrome extension that shows both at once on Netflix, YouTube, and Prime Video, and turns every word into a click target for an instant translation with phonetics and audio. There is no paid tier, so vocabulary saving is included rather than gated.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Two languages at once</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Free, no premium tier</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4 flex-shrink-0" /> Click-to-translate</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4 flex-shrink-0" /> Overkill for plain captions</div>
            </div>
          </div>

          <Callout variant="tip" title="Comparing learning tools specifically?">
            <p>This post deliberately stays on general subtitle jobs. If you are choosing between Funlingo, Language Reactor, Trancy, eJOY and the rest, that is its own comparison — see <a href="/blog/best-dual-subtitle-extension" className="text-[#C81FD4] hover:underline">the best dual subtitle extensions</a>, which ranks seven of them on price, platform coverage, and vocabulary features.</p>
          </Callout>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <p className="text-lg text-[var(--text)] mb-6">Watching foreign-language content to learn from it?</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <img
            src="/blog-images/best-subtitle-extensions-chrome-inline.jpg"
            alt="A Chrome extension permission prompt with the site-access scope highlighted for review"
            width={1400}
            height={781}
            loading="lazy"
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Checking an Extension Before You Install It</h2>
          <p className="text-[var(--text-dim)] mb-6">Subtitle extensions need real access to work. To draw an overlay on a streaming site, an extension must be able to read and change data on that domain — there is no narrower permission that would do the job. That is legitimate, which also means the permission prompt on its own tells you nothing. Judge the scope instead.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><Shield className="w-8 h-8 text-[#C81FD4] mb-4" /><h3 className="text-lg font-bold text-[var(--text)] mb-2">Check which sites</h3><p className="text-sm text-[var(--text-dim)]">A subtitle tool should name the sites it supports. Access to all sites is a far wider ask and deserves an explanation on the listing.</p></div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><Download className="w-8 h-8 text-[#C81FD4] mb-4" /><h3 className="text-lg font-bold text-[var(--text)] mb-2">Install from the Web Store</h3><p className="text-sm text-[var(--text-dim)]">Sideloaded .crx files from elsewhere skip review entirely. Use the official listing.</p></div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><Languages className="w-8 h-8 text-[#C81FD4] mb-4" /><h3 className="text-lg font-bold text-[var(--text)] mb-2">Sort reviews by newest</h3><p className="text-sm text-[var(--text-dim)]">Streaming players change often. An extension that broke three months ago shows up in recent reviews first.</p></div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]"><Zap className="w-8 h-8 text-[#C81FD4] mb-4" /><h3 className="text-lg font-bold text-[var(--text)] mb-2">Check the last update</h3><p className="text-sm text-[var(--text-dim)]">One untouched for two years is likely abandoned, and abandoned extensions get sold and repurposed.</p></div>
          </div>

          <Callout variant="warning" title="Run one at a time">
            <p>Two subtitle extensions on the same page will both try to draw over the player, and the result is overlapping text, duplicate tracks, or neither one working. If subtitles stop appearing, disable everything else in the category before concluding the tool is broken.</p>
          </Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Getting Set Up</h2>
          <p className="text-[var(--text-dim)] mb-6">Whichever category you land in, installation follows the same shape and takes about a minute.</p>

          <StepFlow steps={[
            { title: "Install from the store", desc: "Open the official Chrome Web Store listing and choose Add to Chrome." },
            { title: "Review permissions", desc: "Read which sites it asks for and confirm they match the services you actually use." },
            { title: "Open a video", desc: "Start playing something on a supported site. Refresh the tab if it was open before you installed." },
            { title: "Configure and replay", desc: "Set your file, language, or styling, then restart the video from the beginning so the overlay picks it up." },
          ]} />

          <p className="text-[var(--text-dim)] mb-6">If your video is a local file rather than a stream, extensions are the wrong tool entirely. Our guide on <a href="/blog/how-to-add-subtitles-to-a-video" className="text-[#C81FD4] hover:underline">how to add subtitles to a video</a> covers SRT files, VLC, and burning captions in permanently.</p>

          <hr className="border-[var(--border)] my-12" />

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-12">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-[var(--text)] block mb-1">Can a Chrome extension add subtitles to a video that has none?</strong><p className="text-[var(--text-dim)] text-sm">Yes. Substital and similar tools overlay an external SRT on the player, which works on sites with no captions of their own. The overlay is visual only and does not alter the video file.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">How do I download the subtitle file from a video?</strong><p className="text-[var(--text-dim)] text-sm">Use a subtitle downloader extension, which pulls the caption track off the player and exports .srt or .txt. That is a different category from overlays, which show text on screen but give you no file.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">How do I fix subtitles that are out of sync?</strong><p className="text-[var(--text-dim)] text-sm">If every line is late by the same amount, use the offset slider in your overlay extension. If the gap grows through the video, the file was timed for a different frame rate and needs re-timing rather than shifting.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">Are subtitle extensions for Chrome safe?</strong><p className="text-[var(--text-dim)] text-sm">Reputable Web Store ones are. They legitimately need permission to read and change data on the sites they support, since that is how the overlay is drawn. Requests for access to all sites, with no explanation, are the thing worth questioning.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">Do Chrome subtitle extensions work on mobile?</strong><p className="text-[var(--text-dim)] text-sm">No. Chrome on Android and iOS does not support extensions, and streaming apps run outside the browser. These are desktop-only tools.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Turn Watching Into Learning</h2>
            <p className="text-lg text-[var(--text-dim)] mb-8 max-w-xl mx-auto">Subtitles in two languages on Netflix, YouTube, and Prime Video. Click any word to translate. Vocabulary builder included, because there is no premium tier to hide it behind.</p>
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
