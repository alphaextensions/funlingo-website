"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Tv } from "lucide-react";
import { KeyTakeaways, ProsCons, StepFlow, Callout } from "@/app/blog/_components/graphics";

export default function LearnJapaneseWithCrunchyrollContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Learn Japanese on Crunchyroll: Free Dual Subtitles Guide</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> June 11, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <img src="/blog-images/learn-japanese-with-crunchyroll-hero.jpg" alt="Crunchyroll anime with Japanese and English dual subtitles for language learning" width={1600} height={893} fetchPriority="high" />

          <KeyTakeaways items={["Crunchyroll is a goldmine of native Japanese audio, but it does not show Japanese subtitles or dual subtitles on its own.", "The free Funlingo Chrome extension adds Crunchyroll dual subtitles — Japanese plus your language — with click-to-translate on any word.", "Slice-of-life and school comedies are the best anime to learn Japanese because the speech is natural, slow, and everyday.", "A simple daily routine — watch, mine words, rewatch — turns each episode into real listening and vocabulary practice.", "Pair anime with structured grammar and kanji study so the immersion actually sticks."]} />

          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">If you already spend hours on <a href="https://www.crunchyroll.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Crunchyroll</a>, you are sitting on one of the best free Japanese-listening resources in the world — you just are not using it for study yet. This guide shows you how to turn anime episodes into lessons with free Crunchyroll dual subtitles, which titles teach the most usable Japanese, and a light daily routine that actually moves the needle. For the broader, platform-agnostic version of this topic, see our companion guide on how to <a href="/blog/learn-japanese-with-anime" className="text-[#C642FC] hover:underline">learn Japanese with anime</a>; here we go deep on Crunchyroll specifically.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Anime Is Great for Learning Japanese</h2>
          <p className="text-gray-300 mb-6">Anime gives you something a textbook never can: hours of native Japanese delivered with emotion, facial expression, and on-screen context that make meaning easy to guess. When a character is clearly frustrated, embarrassed, or excited, you absorb not just the words but the register and tone behind them — the difference between casual and polite speech, the little sentence-ending particles, the way real people actually talk. That is comprehensible input at scale, and it is exactly the kind of repeated exposure that builds a listening ear.</p>
          <p className="text-gray-300 mb-6">It works best as a supplement, not a replacement. Immersion fills your head with vocabulary and rhythm, but you still need a structured base in grammar and kanji to make sense of what you are hearing. Used together — a little study, a lot of anime — Crunchyroll becomes a steady stream of input that reinforces everything you learn elsewhere.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Does Crunchyroll Have Japanese Subtitles?</h2>
          <p className="text-gray-300 mb-6">Here is the catch most learners hit: Crunchyroll streams shows in original <strong className="text-white">Japanese audio</strong>, but its subtitle menu is built for <em>translated</em> languages — English, Spanish, Portuguese, and so on. For the vast majority of titles there is no native Japanese caption track in the player, and there is certainly no dual-subtitle mode that shows Japanese and English at the same time. So out of the box you get great audio with English text, which is fine for following the plot but weak for study, because your eyes read the translation and your brain skips the Japanese entirely.</p>
          <p className="text-gray-300 mb-6">To actually learn, you need the Japanese on screen next to your own language, and you need to be able to look words up without leaving the episode. That is the gap a free tool fills.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Set Up Free Dual Subtitles on Crunchyroll</h2>
          <p className="text-gray-300 mb-6"><strong className="text-white">Funlingo</strong> is a free Chrome extension that adds Crunchyroll dual subtitles directly to the player. You see the Japanese line and your own language at the same time, and you can click any word in the subtitle for an instant definition, reading, and meaning in context. It works the same way on Netflix, YouTube, and Prime Video too, so one install covers all your watching. Here is how to get it running in under two minutes:</p>

          <StepFlow
            steps={[
              { title: "Install Funlingo", desc: "Add the free Funlingo extension to Chrome from the Web Store — no account or payment required." },
              { title: "Open Crunchyroll", desc: "Start any anime in Japanese audio. Funlingo activates automatically on the player." },
              { title: "Turn on dual subtitles", desc: "Set Japanese as the learning language and English as your native line to see both at once." },
              { title: "Click to translate", desc: "Tap any word in the subtitles for its reading, definition, and meaning in context — then keep watching." },
            ]}
          />

          <Callout variant="tip" title="Use furigana while your kanji is weak">If reading raw kanji slows you down, lean on the click-to-translate readings to bridge the gap. Over dozens of episodes you will start recognizing common kanji on sight, and the hovering you needed at the start fades away on its own.</Callout>

          <p className="text-gray-300 mb-6">Because Funlingo is free by design — not a trial that nudges you toward a subscription — you never hit a paywall mid-episode, and there is no monthly quota to burn through. Grab it from the <a href="/chrome-extension" className="text-[#C642FC] hover:underline">Chrome extension page</a>. If your watching also happens on Netflix, the same approach is covered in our <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">Netflix dual subtitles</a> guide.</p>

          <img src="/blog-images/learn-japanese-with-crunchyroll-inline.jpg" alt="Best Crunchyroll anime for learning Japanese, shown as a curated lineup" width={1600} height={893} loading="lazy" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The Best Anime to Learn Japanese on Crunchyroll</h2>
          <p className="text-gray-300 mb-6">The best anime to learn Japanese on Crunchyroll are the ones where people talk like people — everyday vocabulary, modern grammar, and a pace you can follow. Flashy action shows are fun, but they lean on shouted attack names and invented terminology you will rarely use in conversation. The list below is grouped by level so you can start where you actually are and climb.</p>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Beginner: start with slice-of-life</h3>
          <p className="text-gray-300 mb-6">If you want the best slice of life anime to learn Japanese, this is your tier. Slice-of-life and school comedies are gold for beginners because the Japanese is slow, clear, and grounded in daily situations — greetings, food, school, family, weather. Look for gentle, low-stakes shows about ordinary life and cozy hobbies. The dialogue repeats the same high-frequency words constantly, which is exactly what a beginner needs to lock in a core vocabulary.</p>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Intermediate: romance and everyday drama</h3>
          <p className="text-gray-300 mb-6">Once basic conversations feel comfortable, move to romance, school drama, and workplace stories. The sentences get longer and the emotional range wider, so you meet more polite and casual register shifts, more idioms, and faster back-and-forth — without jumping into specialist jargon. This tier is where your listening speed really grows.</p>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Advanced: action, fantasy, and dense scripts</h3>
          <p className="text-gray-300 mb-6">When you can follow intermediate shows mostly by ear, action, fantasy, mystery, and sci-fi open up. These carry heavier vocabulary, invented terms, and rapid dialogue, so save them for when guessing from context is comfortable. Pick stories you love enough to rewatch — repetition is what converts a hard show into an easy one.</p>

          <ProsCons
            proLabel="Great for learning"
            conLabel="Watch for fun, study later"
            pros={[
              "Slice-of-life: natural, everyday, high-frequency vocabulary",
              "School comedies: clear speech and lots of repetition",
              "Romance: realistic conversation and register shifts",
              "Workplace stories: practical, modern Japanese",
            ]}
            cons={[
              "Hardcore action: shouted attack names over real dialogue",
              "Heavy fantasy: invented terms you will rarely use",
              "Period dramas: archaic grammar and speech patterns",
              "Dense sci-fi: fast, jargon-heavy scripts",
            ]}
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">A Simple Daily Anime Routine</h2>
          <p className="text-gray-300 mb-6">You do not need hours a day — you need consistency. A single episode handled deliberately beats a marathon you forget. Here is a routine that fits in roughly 30 minutes:</p>

          <StepFlow
            steps={[
              { title: "Watch once for flow", desc: "Enjoy the episode with dual subtitles on, getting the gist without stopping every line." },
              { title: "Mine new words", desc: "On a second pass, click unfamiliar words and save the handful that keep recurring." },
              { title: "Shadow a few lines", desc: "Replay two or three sentences and say them aloud to train pronunciation and rhythm." },
              { title: "Review tomorrow", desc: "Revisit your saved words the next day so they move into long-term memory." },
            ]}
          />

          <Callout variant="note" title="Quality over quantity">Five new words you genuinely absorb from one episode beat fifty you skim and forget. Keep the daily load small enough that you actually come back tomorrow — momentum is the whole game.</Callout>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Common Mistakes to Avoid</h2>
          <p className="text-gray-300 mb-6">Most learners who quit anime immersion make the same few errors. Sidestep these and you will stay on track:</p>
          <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
            <li><strong className="text-white">Reading only the English line.</strong> If your eyes never touch the Japanese, you are watching, not studying. Dual subtitles only help if you actually read the Japanese first and use the English to confirm.</li>
            <li><strong className="text-white">Starting too hard.</strong> Jumping into a dense action series as a beginner is demoralizing. Begin with slice-of-life and earn the harder shows.</li>
            <li><strong className="text-white">Trying to understand every word.</strong> Pausing on every line kills momentum. Let some things wash over you and look up only what repeats.</li>
            <li><strong className="text-white">Skipping grammar entirely.</strong> Anime is input, not a syllabus. Without a grammar base, the sentences stay a blur no matter how much you watch.</li>
            <li><strong className="text-white">Copying anime speech wholesale.</strong> A lot of anime dialogue is rough, dramatic, or gendered in ways that sound odd in real life. Enjoy it, but verify register before you use a phrase yourself.</li>
          </ul>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-2 mb-3"><Tv className="w-5 h-5 text-[#C642FC]" /><span className="font-semibold text-white">One install, every platform</span></div>
            <p className="text-gray-300">Funlingo is not Crunchyroll-only. The same dual subtitles and click-to-translate work on Netflix, YouTube, and Prime Video, so whatever you watch becomes Japanese practice. Start on Crunchyroll, then point it at anything else you already enjoy — see the full picture on the <a href="/chrome-extension" className="text-[#C642FC] hover:underline">extension page</a>.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Does Crunchyroll have Japanese subtitles?</h3>
            <p className="text-gray-300">Crunchyroll streams anime in original Japanese audio, but its subtitle menu is built for translated languages like English rather than native Japanese captions. For most titles there is no official Japanese-subtitle track in the player. To study with Japanese text on screen, add a free tool like Funlingo, which overlays a Japanese line alongside your own language while you watch.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Can you get dual subtitles on Crunchyroll?</h3>
            <p className="text-gray-300">Yes. Crunchyroll does not offer dual subtitles natively, but the free Funlingo Chrome extension adds them. It shows the Japanese line and an English (or other-language) line at the same time on the Crunchyroll player, and lets you click any word for an instant reading, definition, and meaning in context. There is no paid tier for the core dual-subtitle experience.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">What is the best anime to learn Japanese?</h3>
            <p className="text-gray-300">The best anime to learn Japanese are slice-of-life and everyday-setting shows with natural, modern, conversational speech. Beginners should start with slice-of-life and school comedies; intermediate learners can move to romance and workplace stories; advanced learners can handle action and fantasy. Above all, pick titles you enjoy enough to rewatch, because repetition is what makes the vocabulary stick.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Is anime good for learning Japanese?</h3>
            <p className="text-gray-300">Anime is an excellent supplement because it delivers huge amounts of native audio with emotion, context, and visuals that make meaning easy to infer. Pair it with a structured base in grammar and kanji, plus dual subtitles and click-to-translate so you absorb the words instead of just reading a translation. Done that way, every episode is listening practice and vocabulary input at once.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-2 font-semibold">Turn every Crunchyroll episode into a Japanese lesson</p>
            <p className="text-gray-400 mb-6">Funlingo adds free dual subtitles and click-to-translate to Crunchyroll, Netflix, YouTube, and Prime Video. Read Japanese and English together, tap any word to learn it, and pay nothing. Free, forever, right in your browser.</p>
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
