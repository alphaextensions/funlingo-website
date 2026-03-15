"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Tv, Music, BookOpen, Utensils, Gamepad2, Timer, Target, Star, Headphones, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LearnKoreanYouTubeContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Learn Korean by Watching YouTube: A Complete 2026 Guide</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Why YouTube Is the Best Free Resource for Learning Korean</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Korean is one of the most popular languages to learn in 2026, fueled by K-dramas, K-pop, and Korean cinema. And YouTube sits at the center of Korean culture online, with millions of hours of content from native speakers covering every topic imaginable.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">Unlike textbooks or apps that use scripted dialogues, YouTube gives you access to real Korean as it is actually spoken. From casual vlogs to formal news broadcasts, you can immerse yourself in the language at every level, completely for free.</p>
          <p className="text-gray-300 mb-6">For the broader methodology behind learning languages through media, check out our complete guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a>.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Watch Korean YouTube with dual subtitles. Completely free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try FunLingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Korean YouTube Channels by Category</h2>
          <p className="text-gray-300 mb-8">The key to learning Korean on YouTube is choosing content that matches both your level and your interests. Here are the best channels organized by category.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><BookOpen className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Structured Lessons</h3><p className="text-sm text-gray-400">Talk To Me In Korean, Korean Unnie, GO! Billy Korean, and Professor Yoon&apos;s Korean. These channels teach grammar and vocabulary with clear explanations in English.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Tv className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Entertainment and Variety</h3><p className="text-sm text-gray-400">Korean variety shows like those on KBS, MBC, and tvN channels. Fast-paced dialogue helps train listening speed and teaches colloquial expressions.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Utensils className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Cooking and Lifestyle</h3><p className="text-sm text-gray-400">Channels like Maangchi, Korean Bapsang, and lifestyle vloggers. These use everyday vocabulary and speak at a measured pace, perfect for beginners.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Music className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">K-Pop and Music</h3><p className="text-sm text-gray-400">Official K-pop channels, behind-the-scenes content, and lyric analysis videos. Music is one of the best ways to memorize vocabulary and improve pronunciation.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Gamepad2 className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Gaming</h3><p className="text-sm text-gray-400">Korean gaming YouTubers offer highly engaging content with natural, unscripted dialogue. Great for learning informal speech and slang used by younger Koreans.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><MessageSquare className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Podcasts and Talk Shows</h3><p className="text-sm text-gray-400">Korean podcast-style channels and interview shows. These provide extended listening practice with natural conversational flow between speakers.</p></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Your 15-Minute Daily Korean Routine</h2>
          <p className="text-gray-300 mb-6">Consistency matters more than intensity. This daily routine takes just 15 minutes and uses YouTube as your primary learning tool.</p>

          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 mt-0">Daily 15-Minute Korean YouTube Routine</h3>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 1-2: Warm Up</span><span className="text-white font-medium">Review 10 saved vocabulary words from yesterday using spaced repetition. This primes your brain for Korean.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 3-12: Watch with Dual Subtitles</span><span className="text-white font-medium">Watch a 10-minute Korean video with FunLingo dual subtitles. Save 5 to 10 new words by clicking them in the subtitles. Focus on words you see repeatedly.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 13-15: Active Review</span><span className="text-white font-medium">Replay one 30-second clip without looking at subtitles. Try to understand it from listening alone. Then replay with subtitles to check.</span></div></div>
            </div>
            <p className="text-gray-300 mt-6 italic">Following this routine consistently, you can learn 150 to 300 new Korean words per month and dramatically improve your listening skills.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Use Dual Subtitles for Korean on YouTube</h2>
          <p className="text-gray-300 mb-6">Dual subtitles are the most powerful tool for learning Korean from YouTube. They let you see both Korean text (in Hangul) and your native language translation simultaneously, so you never lose track of meaning while being exposed to the Korean writing system.</p>

          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
            {[
              { title: "Install FunLingo", desc: "Add the free FunLingo Chrome extension from the Chrome Web Store. It takes about 10 seconds to install." },
              { title: "Choose Korean + Your Language", desc: "Set Korean as your target language and your native language as the translation language in FunLingo's settings." },
              { title: "Find a Korean Video", desc: "Search for Korean content that interests you. Make sure the video has Korean subtitles or auto-generated captions." },
              { title: "Watch with Both Languages", desc: "FunLingo displays Korean and your native language subtitles simultaneously. Click any Korean word to see its meaning and save it." },
              { title: "Build Your Vocabulary", desc: "Saved words go into your personal vocabulary list. Review them daily with spaced repetition to move them into long-term memory." },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i + 1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Tips for Beginners Learning Korean on YouTube</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Star className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Learn Hangul First</h3><p className="text-sm text-gray-400">Hangul can be learned in a few hours. Being able to read Korean subtitles accelerates your learning dramatically compared to relying on romanization.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Timer className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Start with Short Videos</h3><p className="text-sm text-gray-400">Begin with 3 to 5 minute videos. Shorter content lets you rewatch and focus without fatigue. Gradually increase to 10 to 15 minute videos.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Target className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Focus on High-Frequency Words</h3><p className="text-sm text-gray-400">The top 1,000 Korean words cover about 85% of everyday conversation. Prioritize saving words you see repeatedly across different videos.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Headphones className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Shadow the Speakers</h3><p className="text-sm text-gray-400">Try repeating what the speakers say immediately after hearing it. This shadowing technique improves pronunciation and intonation.</p></div>
          </div>

          <p className="text-gray-300 mb-6">Once you are comfortable with YouTube, expand to Netflix for longer-form Korean content. Read our guide on <a href="/blog/learn-spanish-watching-netflix" className="text-[#C642FC] hover:underline">learning languages with Netflix</a> for strategies that apply to Korean dramas as well. You can also learn how to <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">build vocabulary while watching shows</a> for more advanced techniques.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Can I learn Korean just by watching YouTube?</strong><p className="text-gray-400 text-sm">YouTube is an excellent supplementary tool. While it should not be your only resource, consistent daily watching with active strategies can dramatically improve listening, vocabulary, and cultural understanding.</p></div>
              <div><strong className="text-white block mb-1">How long does it take to learn Korean from YouTube?</strong><p className="text-gray-400 text-sm">With a consistent 15-minute daily routine using dual subtitles, most learners notice significant improvement in listening comprehension within 2 to 3 months.</p></div>
              <div><strong className="text-white block mb-1">What are the best Korean YouTube channels for beginners?</strong><p className="text-gray-400 text-sm">Talk To Me In Korean, Korean Unnie, and GO! Billy Korean offer structured lessons. For immersion, start with Korean cooking channels that use simple everyday language.</p></div>
              <div><strong className="text-white block mb-1">Do I need to learn Hangul before watching Korean YouTube?</strong><p className="text-gray-400 text-sm">Learning Hangul first is recommended and takes only a few hours. It allows you to read Korean subtitles, which significantly accelerates learning.</p></div>
              <div><strong className="text-white block mb-1">How do I get Korean dual subtitles on YouTube?</strong><p className="text-gray-400 text-sm">Install the free FunLingo Chrome extension. It adds dual subtitles to YouTube, displaying Korean and your native language simultaneously.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning Korean on YouTube Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free dual subtitles on every Korean YouTube video. Built-in vocabulary builder. No subscription needed.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get FunLingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
