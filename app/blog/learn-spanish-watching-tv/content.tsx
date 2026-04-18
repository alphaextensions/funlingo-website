"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Star, Tv, BookOpen, Sparkles, Target, Timer, Brain, Headphones, Repeat, Bookmark, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LearnSpanishWatchingTvContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Learn Spanish Watching TV: Your Complete 2026 Guide</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 18, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          {/* ── Intro ── */}
          <h2 className="text-2xl font-bold text-white mb-4">Why Watching TV Is One of the Best Ways to Learn Spanish</h2>
          <p className="leading-relaxed text-gray-300 mb-6">If you have ever tried flashcards, grammar drills, or textbook exercises and struggled to stay motivated, there is good news: watching TV is one of the most effective and enjoyable ways to learn Spanish. Streaming platforms like Netflix, Amazon Prime Video, and YouTube offer thousands of hours of Spanish-language content, from beginner-friendly cartoons to fast-paced dramas packed with regional slang.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">The science behind it is simple. When you watch engaging stories, your brain processes vocabulary, grammar, and pronunciation in context rather than in isolation. Pair that with dual subtitles and a structured daily routine, and you can make real progress in as little as 15 minutes a day. This guide covers the best shows for every level, how to use dual subtitles effectively, and a step-by-step daily routine you can start tonight.</p>
          <p className="text-gray-300 mb-6">For a deeper look at learning any language through media, see our guide on <a href="/blog/netflix-language-learning" className="text-[#C642FC] hover:underline">Netflix language learning</a>.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Start learning Spanish with dual subtitles on Netflix, Prime Video, and more. Free setup in 30 seconds.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          {/* ── Best Spanish TV Shows for Every Level ── */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Spanish TV Shows for Every Level</h2>
          <p className="text-gray-300 mb-8">Picking the right show for your level is the single most important decision you can make. Content that is too hard leads to frustration, while content that is too easy will not challenge you. Below are our top recommendations across three proficiency tiers, plus YouTube channels that complement any level.</p>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-[#C642FC]" /> Beginner (A1-A2)</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <p className="text-gray-300 mb-4">At this stage you need slow, clear speech with lots of visual context. Animated shows and content made for learners are ideal because you can follow the story even when you miss words.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">Pocoyo (Spanish)</strong> — A charming animated series with simple vocabulary and a narrator who describes every action on screen. Perfect for picking up basic verbs and nouns.</li>
              <li><strong className="text-white">Extra en Espanol</strong> — A sitcom designed specifically for Spanish learners. The dialogue is intentionally slow, and the humor keeps you engaged while reinforcing common phrases.</li>
              <li><strong className="text-white">Destinos</strong> — An educational telenovela that gradually increases in difficulty. Each episode builds on the vocabulary and grammar from the one before, making it feel like a structured course wrapped in a soap opera.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#C642FC]" /> Intermediate (B1-B2)</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <p className="text-gray-300 mb-4">You can handle natural-speed dialogue but still need dual subtitles for unfamiliar vocabulary. These shows expose you to a range of accents, idioms, and real-world conversation.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">La Casa de Papel (Money Heist)</strong> — A gripping heist drama on Netflix with diverse Spanish accents. The mix of planning jargon and emotional dialogue builds both formal and informal vocabulary.</li>
              <li><strong className="text-white">Elite</strong> — A teen drama set at a prestigious school in Spain. Packed with modern slang, emotional exchanges, and relatable scenarios that mirror everyday conversation.</li>
              <li><strong className="text-white">Club de Cuervos</strong> — A Mexican comedy about a wealthy family fighting over a soccer team. Rich in Mexican Spanish idioms, humor, and cultural references.</li>
              <li><strong className="text-white">Narcos</strong> — A Netflix original that mixes English and Colombian Spanish. Useful for training your ear to switch between languages and understanding Latin American accents.</li>
            </ul>
            <p className="text-gray-300 mt-4 mb-0">For a full Netflix-specific breakdown, read our guide on <a href="/blog/learn-spanish-watching-netflix" className="text-[#C642FC] hover:underline">how to learn Spanish watching Netflix</a>.</p>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#C642FC]" /> Advanced (C1-C2)</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <p className="text-gray-300 mb-4">At this level, look for fast dialogue, heavy slang, regional accents, and complex plotlines that push your comprehension to near-native levels.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">El Marginal</strong> — An Argentine prison drama featuring voseo, lunfardo slang, and rapid-fire dialogue. A masterclass in Argentine Spanish.</li>
              <li><strong className="text-white">Vis a Vis</strong> — A Spanish prison thriller with intense, overlapping conversations and diverse character backgrounds that expose you to multiple registers.</li>
              <li><strong className="text-white">Velvet</strong> — A period drama set in 1950s Madrid with elegant Castilian Spanish, rich vocabulary, and nuanced dialogue that rewards close listening.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Tv className="w-5 h-5 text-[#C642FC]" /> YouTube Channels</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">YouTube is an underrated resource for Spanish learning. These channels complement your TV watching with structured, free content.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">Easy Spanish</strong> — Street interviews with native speakers across the Spanish-speaking world. Real conversations with subtitles in both Spanish and English.</li>
              <li><strong className="text-white">Dreaming Spanish</strong> — Built around the comprehensible input method. Videos are categorized by level so you always watch content matched to your ability.</li>
            </ul>
          </div>

          <hr className="border-white/10 my-12" />

          {/* ── Best Spanish Content on Amazon Prime Video ── */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Spanish Content on Amazon Prime Video</h2>
          <p className="text-gray-300 mb-6">Amazon Prime Video has a growing library of Spanish-language originals and licensed series that many learners overlook. If you already have a Prime membership, you have access to excellent Spanish content without paying anything extra.</p>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">El Internado</strong> — A mystery thriller set in a boarding school. Clear Castilian Spanish with suspenseful storylines that keep you watching episode after episode.</li>
              <li><strong className="text-white">Grand Hotel</strong> — A period drama with elegant dialogue and romantic intrigue. Excellent for intermediate learners who want exposure to formal Spanish.</li>
              <li><strong className="text-white">Unauthorized Living (Vivir sin Permiso)</strong> — A crime drama set in Galicia with a mix of standard Spanish and regional flavor. Great for advanced learners.</li>
            </ul>
          </div>
          <p className="text-gray-300 mb-6">One major advantage of using Funlingo with Prime Video is that <strong className="text-white">Funlingo is the only browser extension that supports dual subtitles on Amazon Prime Video</strong>. While other tools are limited to Netflix, Funlingo lets you learn with two subtitle tracks on Prime as well, opening up an entirely separate content library for your studies.</p>

          <hr className="border-white/10 my-12" />

          {/* ── How to Use Dual Subtitles for Spanish Learning ── */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Use Dual Subtitles for Spanish Learning</h2>
          <p className="text-gray-300 mb-6">The dual subtitle method is the most efficient way to learn Spanish from TV. Instead of choosing between Spanish subtitles (which beginners often cannot follow) or English subtitles (which let you understand but do not teach you to read Spanish), you display both languages on screen at the same time.</p>
          <p className="text-gray-300 mb-6">Here is why it works. When you see the Spanish text alongside the English translation, your brain automatically maps new words and phrases to their meanings. Over time, you start recognizing patterns in grammar, verb conjugations, and sentence structure without consciously studying them. You are essentially getting reading practice, listening practice, and vocabulary acquisition in a single activity.</p>
          <p className="text-gray-300 mb-6">Funlingo makes this effortless. Install the extension, pick your target language and your native language, and subtitles appear in both languages automatically. You can click any word to see its definition, save vocabulary for later review, and adjust subtitle positioning to your preference.</p>
          <p className="text-gray-300 mb-6">For a complete walkthrough, read our <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">Netflix dual subtitles setup guide</a>. And for a comparison of the best tools available, check out our roundup of <a href="/blog/netflix-language-learning-extensions" className="text-[#C642FC] hover:underline">Netflix language learning extensions</a>.</p>

          <hr className="border-white/10 my-12" />

          {/* ── Your 15-Minute Daily Spanish TV Routine ── */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Your 15-Minute Daily Spanish TV Routine</h2>
          <p className="text-gray-300 mb-8">You do not need hours of study time to make progress. This four-step routine takes just 15 minutes and turns any TV episode into an active language lesson. Consistency is what matters: 15 focused minutes every day beats a two-hour session once a week.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Timer className="w-5 h-5 text-[#C642FC]" /> Minutes 1-2: Watch Without Subtitles</h4>
              <p className="text-gray-300 mb-0">Pick a short scene (two to three minutes) and watch it with no subtitles at all. Focus on the overall meaning: What is happening? What emotions do you detect? How much can you catch from context, tone, and body language alone? This trains your raw listening comprehension.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#C642FC]" /> Minutes 3-10: Rewatch with Dual Subtitles</h4>
              <p className="text-gray-300 mb-0">Now rewatch the same scene with dual subtitles enabled in Funlingo. Pause whenever you encounter a new word or phrase. Click it to see the definition, and save it to your vocabulary list. Pay attention to how the Spanish sentence structure differs from the English translation. This is where the bulk of your learning happens.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Headphones className="w-5 h-5 text-[#C642FC]" /> Minutes 11-13: Watch with Spanish Subtitles Only</h4>
              <p className="text-gray-300 mb-0">Watch the scene a third time with only Spanish subtitles. This forces your brain to connect the spoken words directly to the Spanish text without the safety net of English. You will be surprised how much more you understand after the dual subtitle pass.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Repeat className="w-5 h-5 text-[#C642FC]" /> Minutes 14-15: Review Saved Vocabulary</h4>
              <p className="text-gray-300 mb-0">Open your saved vocabulary in Funlingo and review the words you added during this session. Try to recall their meaning before revealing the translation. This short review cements new words in your long-term memory and keeps your vocabulary list manageable.</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">Want to learn more about building vocabulary through shows? Read our dedicated guide on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">how to build vocabulary watching shows</a>.</p>

          <hr className="border-white/10 my-12" />

          {/* ── Common Beginner Mistakes ── */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Common Beginner Mistakes to Avoid</h2>
          <p className="text-gray-300 mb-6">Learning Spanish through TV is powerful, but only if you avoid these common traps that slow learners down or lead to discouragement.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <ul className="list-none space-y-3 text-gray-300 mb-0">
              <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" /><span><strong className="text-white">Watching passively without subtitles.</strong> Simply having a show on in the background does almost nothing for language acquisition. You need to actively engage with the content by reading subtitles and pausing to look up words.</span></li>
              <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" /><span><strong className="text-white">Starting with content that is too advanced.</strong> Jumping straight into fast-paced dramas like Narcos when you are a beginner leads to frustration. Start with learner-friendly shows and work your way up.</span></li>
              <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" /><span><strong className="text-white">Trying to understand every single word.</strong> Perfectionism kills progress. Focus on understanding the overall meaning of scenes rather than obsessing over individual words you do not know.</span></li>
              <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" /><span><strong className="text-white">Not reviewing vocabulary.</strong> Saving words is only half the battle. If you never go back and review them, they fade from memory within days. Use Funlingo&apos;s vocabulary review feature regularly.</span></li>
              <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" /><span><strong className="text-white">Only watching and never speaking.</strong> TV is excellent for input, but language learning also requires output. Practice speaking the phrases you learn, even if it is just repeating dialogue out loud during your sessions.</span></li>
            </ul>
          </div>

          <hr className="border-white/10 my-12" />

          {/* ── FAQ ── */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Can you really learn Spanish just by watching TV?</h3>
              <p className="text-gray-300 mb-0">Watching TV alone will not make you fluent, but it is one of the most effective ways to build listening comprehension, vocabulary, and natural pronunciation. Combined with dual subtitles and active learning techniques, TV can be a core part of your study routine.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">What are the best Spanish shows for beginners?</h3>
              <p className="text-gray-300 mb-0">For beginners, try animated shows like Pocoyo or short-form content with simple dialogue. Netflix&apos;s Extra en Espanol is specifically designed for learners. As you progress, try Destinos, then move to shows like Money Heist or Elite.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">How many hours of TV should I watch to learn Spanish?</h3>
              <p className="text-gray-300 mb-0">Quality matters more than quantity. Aim for 15 to 30 minutes daily with dual subtitles and active note-taking rather than hours of passive watching. Consistency over several months produces better results than occasional binge sessions.</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* ── Final CTA ── */}
          <div className="text-center py-10 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Start Learning Spanish Tonight?</h2>
            <p className="text-lg text-gray-200 mb-6">Install Funlingo, pick a show from this guide, and follow the 15-minute routine. Dual subtitles on Netflix, Amazon Prime Video, and more — completely free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </a>
          </div>

        </div>
      </main>
      <FooterSection />
    </div>
  );
}
