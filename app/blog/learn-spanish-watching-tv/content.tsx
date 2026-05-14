"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, Star } from "lucide-react";

export default function LearnSpanishWatchingTvContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Spanish Learning</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">Learn Spanish Watching TV: The Practical Guide That Actually Works (2026)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 15, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">Most people who try to learn Spanish from TV give up after a few weeks. Not because the method doesn&apos;t work &mdash; it absolutely does &mdash; but because they picked the wrong shows, didn&apos;t use dual subtitles, or treated TV time like background noise instead of practice. This guide walks through what actually works: a tiered list of shows by level, the exact dual-subtitle setup, a 15-minute daily routine you can stick to, and the four beginner mistakes that quietly destroy progress.</p>

          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <p className="m-0"><strong className="text-white">The short version:</strong> Pick a show one level above your comprehension. Use dual subtitles (Spanish + English) the whole time. Look up 2&ndash;3 unknown words per episode and save them. Watch 15 minutes a day, every day. That&apos;s the entire system.</p>
          </div>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Watching TV Actually Works (When Done Right)</h2>
          <p>Second-language acquisition research is unusually consistent on one point: comprehensible input &mdash; content where you understand roughly 80&ndash;90% of what&apos;s being said &mdash; is the single biggest driver of natural fluency. The challenge is that beginner Spanish content is rarely interesting, and interesting Spanish content is rarely comprehensible to beginners.</p>
          <p>Dual subtitles solve this. They take a show you find interesting and push your comprehension into the productive zone by displaying both the original Spanish and your native language at the same time. You stay inside the story, your brain stays engaged, and you absorb vocabulary, grammar patterns, and pronunciation through context &mdash; the way kids actually learn languages.</p>
          <p>This is fundamentally different from watching a show with only English subtitles (you&apos;ll learn nothing) or with only Spanish subtitles (you&apos;ll be frustrated and quit). The combination is the unlock.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Best Spanish TV Shows by Level</h2>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Absolute Beginner (A1&ndash;A2)</h3>
          <p>Start here if you&apos;ve done a few weeks of Duolingo or have basic phrases down but conversations still feel like a blur.</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Extra en Español</strong> &mdash; The most-recommended beginner show for a reason. Sitcom format, slow and deliberate Spanish, designed for learners. On YouTube for free.</li>
            <li><strong className="text-white">Destinos</strong> &mdash; A telenovela-style PBS series built around teaching Spanish. The acting is dated; the pedagogical sequencing is excellent.</li>
            <li><strong className="text-white">Dreaming Spanish (YouTube)</strong> &mdash; Hundreds of short videos at carefully labelled difficulty levels. Free, ad-free, and a brilliant gateway to native content.</li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Low Intermediate (B1)</h3>
          <p>You can follow basic dialogue if it&apos;s slow. Pick shows where the pacing is unhurried and the vocabulary is everyday.</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">La Casa de las Flores</strong> (Mexico, Netflix) &mdash; Family dramedy. Clear Mexican Spanish, expressive characters, three short seasons.</li>
            <li><strong className="text-white">Las Chicas del Cable</strong> (Spain, Netflix) &mdash; 1920s period drama set in Madrid. Castilian Spanish, dramatic pacing, good for getting used to the Spain accent.</li>
            <li><strong className="text-white">Club de Cuervos</strong> (Mexico, Netflix) &mdash; Comedy about a soccer team. Fast in places but very rewatchable.</li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Intermediate (B2)</h3>
          <p>You catch most dialogue and only need subtitles for the tricky bits. Time to push into native-paced content.</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">La Casa de Papel</strong> (Money Heist, Spain) &mdash; Iconic. Fast Castilian Spanish, heist plot, addictive.</li>
            <li><strong className="text-white">Elite</strong> (Spain) &mdash; High-school drama. Lots of slang and contemporary speech &mdash; useful if you want to sound modern.</li>
            <li><strong className="text-white">Narcos</strong> (Colombia/USA) &mdash; Colombian Spanish with English narration mixed in. Drug-cartel drama; not for everyone but linguistically interesting.</li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Advanced (C1+)</h3>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">El Marginal</strong> (Argentina) &mdash; Argentine Spanish, prison drama, heavy slang. A real test.</li>
            <li><strong className="text-white">La Reina del Sur</strong> &mdash; Mexican telenovela with regional vocabulary. Long, immersive.</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Set Up Dual Subtitles for Spanish</h2>
          <p>You need a Chrome extension &mdash; Netflix and Prime Video don&apos;t support dual subtitles natively. Funlingo is the simplest option and is completely free:</p>
          <ol className="space-y-3 list-decimal pl-6 text-gray-300 my-6">
            <li><strong className="text-white">Install Funlingo</strong> from the Chrome Web Store. One click, no account needed.</li>
            <li><strong className="text-white">Open any Spanish show</strong> on Netflix, YouTube, or Prime Video in Chrome.</li>
            <li><strong className="text-white">Set Spanish as target, English (or your native language) as second</strong>. Both subtitle tracks now appear on screen, synced to the dialogue.</li>
            <li><strong className="text-white">Click any unfamiliar word</strong> to see its translation and hear it pronounced. Save the words you want to remember.</li>
          </ol>
          <p>For the full walkthrough across platforms, see our complete <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">Netflix dual subtitle guide</a> or the broader <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">comparison of dual subtitle extensions</a>.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">The 15-Minute Daily Routine</h2>
          <p>Consistency beats intensity. A daily 15-minute session compounds far more than a chaotic two-hour binge once a week. Here is the routine that produces the most learners-per-week-of-effort:</p>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <ul className="space-y-3 list-none pl-0 m-0 text-gray-300">
              <li className="flex gap-3"><span className="text-[#C642FC] font-bold">Min 0&ndash;2:</span><span>Open the show, dual subtitles on, pick up where you left off.</span></li>
              <li className="flex gap-3"><span className="text-[#C642FC] font-bold">Min 2&ndash;12:</span><span>Watch one scene or about ten minutes. Don&apos;t pause every word &mdash; only stop for words you keep hearing.</span></li>
              <li className="flex gap-3"><span className="text-[#C642FC] font-bold">Min 12&ndash;14:</span><span>Save 2&ndash;3 new words to your vocabulary list. Pick words that appeared in context, not random ones from a popup.</span></li>
              <li className="flex gap-3"><span className="text-[#C642FC] font-bold">Min 14&ndash;15:</span><span>Quick review of yesterday&apos;s saved words. Say each one out loud once.</span></li>
            </ul>
          </div>
          <p>That&apos;s it. No grammar drills, no flashcard marathons. Done daily, this approach typically produces noticeable comprehension gains within 4&ndash;6 weeks.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">4 Beginner Mistakes That Stall Progress</h2>
          <div className="space-y-4 my-6">
            <div className="bg-white/5 rounded-xl p-5 border border-red-500/20">
              <h4 className="font-bold text-white mb-2">1. Picking a show that&apos;s too hard</h4>
              <p className="text-gray-300 m-0 text-sm">If you&apos;re reading the English subtitles 90% of the time, the show is above your level. Drop down a tier. You&apos;ll learn faster watching easier content where you can actually follow the Spanish.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-red-500/20">
              <h4 className="font-bold text-white mb-2">2. Looking up every unknown word</h4>
              <p className="text-gray-300 m-0 text-sm">Stopping every two seconds breaks the flow that makes TV-based learning work in the first place. Aim for 2&ndash;3 lookups per ten-minute session, not 20.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-red-500/20">
              <h4 className="font-bold text-white mb-2">3. Watching with English subtitles only</h4>
              <p className="text-gray-300 m-0 text-sm">This is just watching TV. Your brain isn&apos;t doing any Spanish work. Dual subtitles are non-negotiable until you&apos;re solidly intermediate.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-red-500/20">
              <h4 className="font-bold text-white mb-2">4. Not reviewing saved vocabulary</h4>
              <p className="text-gray-300 m-0 text-sm">Saving words you never look at again is the same as not saving them. Even a 60-second review of yesterday&apos;s words triples retention.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">What About Speaking?</h2>
          <p>Watching TV builds comprehension and vocabulary brilliantly, but it won&apos;t make you fluent at speaking on its own. Speaking is its own skill that requires its own practice &mdash; either with a tutor, a language partner, or an AI conversation tool. The realistic goal of a TV-based routine is to make speaking practice <em>productive</em> when you do it: by the time you sit down with a tutor, you already have thousands of words and patterns in your head, and you just need to convert them from passive to active.</p>

          <h2 className="text-3xl font-bold text-white mt-16 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Can you really learn Spanish just by watching TV?", a: "You can build excellent comprehension and a large passive vocabulary purely from TV with dual subtitles. To become fluent at speaking, you'll also need active practice — speaking with a tutor, language partner, or AI conversation tool. TV does the heavy lifting on input; speaking practice converts it to output." },
              { q: "What's the best Spanish TV show for absolute beginners?", a: "Extra en Español is the classic, designed specifically for learners with slow, deliberate Spanish. After that, the Dreaming Spanish YouTube channel offers hundreds of short videos at carefully labelled levels. Once you have basics down, La Casa de las Flores on Netflix is a great first 'real' show." },
              { q: "How long does it take to see results?", a: "With consistent daily watching (15–30 minutes), dual subtitles, and word lookups, most learners notice meaningful comprehension gains within 4–8 weeks. Reaching low-intermediate fluency typically takes 6–12 months of consistent practice combined with some active output." },
              { q: "Should I use Spanish or English subtitles?", a: "Both, simultaneously — that's what dual subtitles are for. Spanish on top, English underneath. This is the entire reason this method works so much better than watching with one language at a time. Use a free Chrome extension like Funlingo to enable it on Netflix, YouTube, and Prime Video." },
              { q: "Is Spain Spanish or Latin American Spanish better to learn?", a: "Whichever variety you actually want to use. If you'll visit or live in Spain, learn Castilian. If you'll be in Mexico, the US, or most of Latin America, lean Latin American. The grammar is 99% identical, and once you're intermediate, switching between varieties is straightforward." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                <h4 className="font-bold text-white text-lg mb-2">Q: {faq.q}</h4>
                <p className="text-gray-400 m-0">A: {faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Tonight &mdash; Free Dual Subtitles in 30 Seconds</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Funlingo gives you Spanish + English subtitles on Netflix, YouTube, and Prime Video. Click any word for translation and pronunciation. Save vocabulary. All free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Add Funlingo to Chrome &mdash; Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
