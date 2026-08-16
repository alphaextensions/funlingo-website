"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Film, Globe, MousePointerClick, BookMarked, Sparkles } from "lucide-react";
import { KeyTakeaways, Callout, StepFlow, DualSubtitleDemo } from "@/app/blog/_components/graphics";

export default function LearnLanguageAmazonPrimeVideoContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-[var(--bg)] to-[var(--bg)] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">How to Learn a Language on Amazon Prime Video with Dual Subtitles (2026)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[var(--text-dim)] font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> August 12, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-lg max-w-none text-[var(--text-dim)]">
          <KeyTakeaways items={["Amazon Prime Video has a deep, often-overlooked library of foreign-language films, series, and Amazon Originals — great raw material for immersion.", "Prime Video does not offer native dual subtitles, so you can normally see only one subtitle language at a time.", "Most language-learning extensions — Language Reactor, Trancy, eJOY, Immersive Translate — do not support Prime Video at all.", "Funlingo is one of the few tools (and it is free) that adds dual subtitles and click-to-translate directly to the Prime Video player.", "A simple 15-minute daily routine plus save-to-vocabulary turns casual watching into steady, context-rich learning."]} />

          <p className="lead text-xl leading-relaxed text-[var(--text)] mb-6">Netflix gets most of the attention when people talk about learning a language from TV, but <a href="https://www.primevideo.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Amazon Prime Video</a> is quietly one of the best immersion libraries you already pay for. It carries acclaimed foreign-language films, regional series, and its own Amazon Originals in Spanish, French, Korean, Japanese, German, and more. The catch is that Prime Video has no built-in dual-subtitle mode, and — surprisingly — almost none of the popular language-learning extensions support it. This guide shows you the honest state of things, and how to turn Prime Video into a proper study tool with dual subtitles and click-to-translate.</p>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Why Prime Video Is Underrated for Immersion</h2>
          <p className="text-[var(--text-dim)] mb-6">If your only exposure to language-learning-via-streaming has been Netflix, you are missing a large second library. Prime Video invests heavily in international productions, and its catalog of foreign-language cinema and series is genuinely deep. Because it is bundled with an Amazon Prime membership many people already have, it is effectively &quot;free&quot; content you are not using for study.</p>
          <p className="text-[var(--text-dim)] mb-6">The value for a learner is authenticity. Scripted shows and films give you natural pacing, real idioms, regional accents, and the kind of everyday phrasing that textbooks flatten out. Amazon Originals in particular tend to have clean, well-timed subtitle tracks, which matters a lot when you are reading along. The one thing Prime Video does not do is let you read two languages at once — and that is exactly the gap dual subtitles fill.</p>

          <Callout variant="note" title="One quick honesty note">Streaming catalogs differ by country and change over time. Everything below is written to be evergreen — availability varies by region, so treat title suggestions as categories to explore rather than guaranteed listings at the time of writing.</Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">The Dual-Subtitle Method (and Why Prime Video Needs Help)</h2>
          <p className="text-[var(--text-dim)] mb-6">The core technique is simple: show the <strong className="text-[var(--text)]">original-language subtitles and your native-language subtitles at the same time</strong>. You read the target language line to train your ear and eyes, and glance at your own language only when you need to confirm meaning. Over hundreds of lines, this builds vocabulary and grammar intuition far faster than either subtitle alone.</p>
          <p className="text-[var(--text-dim)] mb-6">Netflix power users often lean on browser extensions for this. The problem on Prime Video is coverage: the well-known tools were built around Netflix and YouTube and simply do not run inside the Prime Video player. That leaves most learners stuck toggling a single subtitle track. Funlingo takes a different approach and injects dual subtitles directly into Prime Video, so you get the method without switching platforms.</p>

          <DualSubtitleDemo targetLang="Spanish" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Setup: Dual Subtitles on Prime Video in 3 Steps</h2>
          <p className="text-[var(--text-dim)] mb-6">Getting dual subtitles running on Prime Video with Funlingo takes a couple of minutes, and it is free — there is no paid tier gating the core features and no monthly quota to burn through.</p>

          <StepFlow
            steps={[
              { title: "Install Funlingo", desc: "Add the free Funlingo extension to Chrome from the Chrome Web Store or the install page. It is Chrome only at the time of writing." },
              { title: "Open a Prime Video title", desc: "Play any film or series that has subtitles in your target language, and set your learning language in the Funlingo popup." },
              { title: "Turn on dual subtitles", desc: "Enable dual subtitles from the Funlingo controls to see the original and your language together, then click any word to translate." },
            ]}
          />

          <Callout variant="tip" title="Pick a title with a real subtitle track">Dual subtitles work best when the title already offers subtitles in your target language. If a show only ships dubbed audio with no matching subtitle track, choose another — Prime Video&apos;s foreign-language originals are usually a safe bet.</Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Which Extensions Actually Support Prime Video?</h2>
          <p className="text-[var(--text-dim)] mb-6">This is the part most guides skip, so let&apos;s be direct. If you have tried adding a subtitle tool to Prime Video and nothing happened, you were not doing it wrong — the popular options do not support the platform. Here is where things stand at the time of writing:</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8 thin-scroll overflow-x-auto">
            <table className="w-full text-sm text-[var(--text-dim)]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-4 text-[var(--text)]">Tool</th>
                  <th className="text-left py-2 pr-4 text-[var(--text)]">Prime Video dual subtitles</th>
                  <th className="text-left py-2 pr-4 text-[var(--text)]">Price</th>
                  <th className="text-left py-2 text-[var(--text)]">Main platforms</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)]"><td className="py-2 pr-4 text-[var(--text)] font-semibold">Funlingo</td><td className="py-2 pr-4 text-emerald-300">Yes</td><td className="py-2 pr-4">Free</td><td className="py-2">Netflix, YouTube, Prime Video</td></tr>
                <tr className="border-b border-[var(--border)]"><td className="py-2 pr-4">Language Reactor</td><td className="py-2 pr-4 text-rose-300">No</td><td className="py-2 pr-4">$7.99/mo Pro</td><td className="py-2">Netflix, YouTube</td></tr>
                <tr className="border-b border-[var(--border)]"><td className="py-2 pr-4">Trancy</td><td className="py-2 pr-4 text-rose-300">No</td><td className="py-2 pr-4">$9.90/mo</td><td className="py-2">Netflix, YouTube, Disney+</td></tr>
                <tr className="border-b border-[var(--border)]"><td className="py-2 pr-4">eJOY English</td><td className="py-2 pr-4 text-rose-300">No</td><td className="py-2 pr-4">$4.99/mo</td><td className="py-2">English-only</td></tr>
                <tr><td className="py-2 pr-4">Immersive Translate</td><td className="py-2 pr-4 text-rose-300">No / limited</td><td className="py-2 pr-4">$9.99/mo</td><td className="py-2">Web pages, PDFs</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-[var(--text-dim)] mb-6">The takeaway is not that the other tools are bad — Language Reactor and Trancy are excellent <em>on the platforms they support</em>. It is simply that if Prime Video is where you want to learn, your realistic options narrow fast, and Funlingo is the free one that covers it. For a wider look at the category, see our guide to the <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">best dual-subtitle extension</a> and our roundup of <a href="/blog/language-reactor-alternatives" className="text-[#C642FC] hover:underline">Language Reactor alternatives</a>.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Best Kinds of Prime Video Content by Language and Level</h2>
          <p className="text-[var(--text-dim)] mb-6">You do not need a specific title list to start — you need to match content to your level. Availability varies by region, so use these as categories to browse rather than fixed recommendations.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="flex items-center gap-2 mb-3"><Globe className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-[var(--text)]">By language</span></div>
            <p className="text-[var(--text-dim)] mb-0">Prime Video is strong on acclaimed <strong className="text-[var(--text)]">Spanish</strong> and <strong className="text-[var(--text)]">French</strong> cinema and series, growing <strong className="text-[var(--text)]">Korean</strong> and <strong className="text-[var(--text)]">Japanese</strong> catalogs including anime and drama, and a solid slate of <strong className="text-[var(--text)]">German</strong> productions and Amazon Originals. Amazon Originals are a good default because their subtitle tracks tend to be clean and well-timed.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-[var(--text)]">By level</span></div>
            <p className="text-[var(--text-dim)] mb-0"><strong className="text-[var(--text)]">Beginner:</strong> animated films and light comedy, where visuals carry the plot and dialogue is slower. <strong className="text-[var(--text)]">Intermediate:</strong> character-driven drama and romance, which repeat everyday vocabulary in context. <strong className="text-[var(--text)]">Advanced:</strong> crime thrillers, documentaries, and fast-talking comedy, where slang and regional accents stretch your listening.</p>
          </div>

          <Callout variant="tip" title="Rewatch beats rushing">A show you already know in your own language is the easiest on-ramp: you follow the plot effortlessly, so all your attention goes to the language. Rewatching a familiar favorite with dual subtitles is one of the highest-value beginner moves.</Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">A 15-Minute Daily Prime Video Routine</h2>
          <p className="text-[var(--text-dim)] mb-6">Consistency beats marathon sessions. Fifteen focused minutes a day, most days, will move you further than a three-hour binge once a week. Here is a simple loop you can run inside a single episode segment.</p>

          <StepFlow
            steps={[
              { title: "Warm up (2 min)", desc: "Pick up where you left off and watch a short stretch with dual subtitles on, just listening and reading — no pausing yet." },
              { title: "Active watch (8 min)", desc: "Watch a scene, pausing to click unfamiliar words for instant translation and pronunciation, and save the useful ones." },
              { title: "Review (3 min)", desc: "Reopen your saved words, replay pronunciation, and check the AI grammar note on any phrase that confused you." },
              { title: "Recap (2 min)", desc: "Rewatch the same scene with dual subtitles once more — the words you just saved will now jump out at you." },
            ]}
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Click-to-Translate and Save-to-Vocabulary</h2>
          <p className="text-[var(--text-dim)] mb-6">Dual subtitles get you comprehension; the word workflow is what makes learning stick. Inside the Prime Video player, Funlingo lets you click any word in the subtitles for an instant translation and definition — no leaving the page, no separate dictionary tab.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="flex items-center gap-2 mb-3"><MousePointerClick className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-[var(--text)]">Click any word</span></div>
            <p className="text-[var(--text-dim)] mb-0">Tap a word to see its meaning in context, with a multi-translation selector so you can choose to view 1, 2, 3, or all senses. Each word includes per-word pronunciation with audio and a slow mode, plus optional AI grammar explanations for tricky conjugations or phrases. It works across 100+ languages.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="flex items-center gap-2 mb-3"><BookMarked className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-[var(--text)]">Save to vocabulary</span></div>
            <p className="text-[var(--text-dim)] mb-0">Save any word you look up to your personal vocabulary list and export it later for review in your favorite flashcard app. This closes the loop between watching and remembering. For more on building this habit, see <a href="/blog/vocabulary-building-watching-shows" className="text-[#C642FC] hover:underline">vocabulary building while watching shows</a>.</p>
          </div>

          <Callout variant="warning" title="Don&apos;t save everything">It is tempting to click every unknown word, but a bloated list you never review helps no one. Save words that repeat or feel genuinely useful, and let the rest wash over you — comprehension will still improve from context.</Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Prime Video vs Netflix for Learning</h2>
          <p className="text-[var(--text-dim)] mb-6">You do not have to choose. Netflix and Prime Video have different libraries, and using both simply doubles your immersion material. Funlingo adds dual subtitles to Netflix, YouTube, and Prime Video alike, so your workflow — click-to-translate, save-to-vocab, pronunciation — stays identical wherever you watch. If Netflix is your main platform, our <a href="/blog/netflix-language-learning" className="text-[#C642FC] hover:underline">Netflix language learning</a> guide covers that side in depth.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="flex items-center gap-2 mb-3"><Film className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-[var(--text)]">The honest bottom line</span></div>
            <p className="text-[var(--text-dim)] mb-0">Prime Video is an excellent, under-used immersion library, but it has no native dual subtitles and most learning extensions ignore it. Funlingo is one of the few free tools that fills that gap, and it works across your other streaming services too. If you want a broader shortlist, see the <a href="/blog/best-free-language-learning-tools-2026" className="text-[#C642FC] hover:underline">best free language learning tools of 2026</a>.</p>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Frequently Asked Questions</h2>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Does Amazon Prime Video have dual subtitles?</h3>
            <p className="text-[var(--text-dim)]">No. Prime Video lets you pick one subtitle language at a time but has no built-in dual-subtitle mode. To read the original language and your own language together, you need a browser extension like Funlingo that adds dual subtitles to the player. It is free, with no monthly quota.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Does Language Reactor work on Prime Video?</h3>
            <p className="text-[var(--text-dim)]">No. Language Reactor supports Netflix and YouTube only and does not run on Prime Video; its Pro plan is around $7.99/mo. Trancy ($9.90/mo, Netflix/YouTube/Disney+), eJOY ($4.99/mo, English-only), and Immersive Translate ($9.99/mo, web/PDF focus) also do not support Prime Video. Funlingo is one of the few that does, and it is free.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">How do I turn on dual subtitles on Prime Video?</h3>
            <p className="text-[var(--text-dim)]">Install the free Funlingo Chrome extension, open a Prime Video title that has subtitles in your target language, set your learning language, and enable dual subtitles from the Funlingo controls. You can then click any word for an instant translation, pronunciation, and grammar note.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Is Funlingo free to use on Prime Video?</h3>
            <p className="text-[var(--text-dim)]">Yes. Funlingo is a free Chrome extension with no paid tier gating its core features and no monthly quota. Dual subtitles, click-to-translate, per-word pronunciation, AI grammar explanations, and save-to-vocabulary all work on Prime Video, Netflix, and YouTube across 100+ languages.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">What should I watch on Prime Video to learn a language?</h3>
            <p className="text-[var(--text-dim)]">Availability varies by region, but Amazon Originals are a reliable starting point thanks to clean subtitle tracks. Match content to your level: animation and light comedy for beginners, character drama for intermediate learners, and thrillers or documentaries for advanced listening practice.</p>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-[var(--text)] mb-2 font-semibold">Turn Prime Video into a free language classroom</p>
            <p className="text-[var(--text-dim)] mb-6">Funlingo adds dual subtitles and AI translation to Amazon Prime Video, Netflix, and YouTube. Click any word to translate it, save it to your vocabulary, and learn in 100+ languages — free, right in your browser.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
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
