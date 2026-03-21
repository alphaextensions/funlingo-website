"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, BookOpen, Brain, Repeat, Bookmark, Headphones, Sparkles, Target, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VocabularyBuildingContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Blog Post</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Build Vocabulary While Watching: 5 Proven Strategies That Actually Work</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Why Vocabulary Building While Watching Is the Smartest Way to Learn</h2>
          <p className="leading-relaxed text-gray-300 mb-6">You have probably experienced this: you binge-watch an entire season of a foreign-language show, enjoy every minute, and then realize you cannot remember a single new word.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">But here is the good news: vocabulary building while watching is one of the most effective ways to acquire new words, provided you use the right strategies.</p>
          <p className="text-gray-300 mb-6">If you are new to learning languages through media, start with our complete guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a> for the foundational approach.</p>
          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Ready to turn every show into a vocabulary lesson?</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Strategy 1: Use Dual Subtitles for Contextual Vocabulary Learning</h2>
          <p className="text-gray-300 mb-6">The single most impactful change you can make is switching from single-language subtitles to dual subtitles. When you see both your native language and your target language on screen simultaneously, your brain automatically starts making connections.</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Strategy 2: Save Words While Watching and Review with Spaced Repetition</h2>
          <p className="text-gray-300 mb-6">Encountering a new word once is rarely enough to learn it. Research suggests that most learners need to encounter a word 7 to 16 times before it moves into long-term memory.</p>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
            {[{title:"Spot a New Word",desc:"While watching with dual subtitles, notice a word you want to learn."},{title:"Save It Instantly",desc:"Click the word in the subtitle to save it to your vocabulary list."},{title:"Finish Your Episode",desc:"Keep watching. Save 5 to 15 words per episode."},{title:"Review with Spaced Repetition",desc:"Review saved words at increasing intervals."},{title:"Encounter Them Again Naturally",desc:"Recognize your saved words in new episodes."}].map((s,i)=>(
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i+1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Strategy 3: Practice Active Listening to Reinforce New Words</h2>
          <p className="text-gray-300 mb-6">Active listening is the difference between hearing background noise and truly processing language.</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Strategy 4: Choose the Right Content for Your Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Target className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Beginner Level</h3><p className="text-sm text-gray-400">Start with children&apos;s shows, animated films, or shows you have already seen.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><BookOpen className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Intermediate Level</h3><p className="text-sm text-gray-400">Move to slice-of-life dramas, romantic comedies, or reality shows.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Sparkles className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Advanced Level</h3><p className="text-sm text-gray-400">Challenge yourself with political dramas, documentaries, or crime thrillers.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Layers className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Professional Vocabulary</h3><p className="text-sm text-gray-400">Watch industry-specific content to learn career-relevant vocabulary.</p></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Strategy 5: Build a Consistent Vocabulary Routine</h2>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 mt-0">Sample Weekly Vocabulary Building Routine</h3>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Monday - Thursday</span><span className="text-white font-medium">Watch 1 episode (25-45 min) with dual subtitles. Save 5-15 new words.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Daily (5-10 min)</span><span className="text-white font-medium">Review saved words with spaced repetition.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Friday</span><span className="text-white font-medium">Active listening session: replay 2-3 favorite scenes without subtitles.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Weekend</span><span className="text-white font-medium">Watch a movie or binge-watch for fun with dual subtitles.</span></div></div>
            </div>
            <p className="text-gray-300 mt-6 italic">Following this routine, you can realistically learn 100-300 new words per month.</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Why Contextual Vocabulary Learning Beats Flashcards Alone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Brain className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Emotional Memory Anchors</h3><p className="text-sm text-gray-400">Words learned during exciting scenes are easier to recall later.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Headphones className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Pronunciation Built In</h3><p className="text-sm text-gray-400">You hear native speakers pronounce every word naturally.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Repeat className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Natural Repetition</h3><p className="text-sm text-gray-400">High-frequency words appear naturally across episodes.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Bookmark className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Collocations and Usage</h3><p className="text-sm text-gray-400">You learn which words naturally appear together.</p></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Build Your Vocabulary One Episode at a Time</h2>
          <p className="text-gray-300 mb-6">Vocabulary building while watching is not about passively hoping that words will stick. It is about using proven strategies.</p>
          <p className="text-gray-300 mb-6">Ready to get started? Browse more strategies on our <a href="/blog" className="text-[#C642FC] hover:underline">blog</a> or install Funlingo today.</p>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Can you really build vocabulary by watching TV shows and movies?</strong><p className="text-gray-400 text-sm">Yes. Research on comprehensible input shows that encountering new words in meaningful contexts leads to effective vocabulary acquisition.</p></div>
              <div><strong className="text-white block mb-1">How many new words can I learn from watching one episode?</strong><p className="text-gray-400 text-sm">Most learners can realistically absorb 5 to 15 new words per episode when using active strategies.</p></div>
              <div><strong className="text-white block mb-1">Should I use subtitles in my native language or my target language?</strong><p className="text-gray-400 text-sm">Dual subtitles are the most effective option.</p></div>
              <div><strong className="text-white block mb-1">What is the best Chrome extension for building vocabulary while watching?</strong><p className="text-gray-400 text-sm">Funlingo is a vocabulary builder Chrome extension designed for language learners.</p></div>
              <div><strong className="text-white block mb-1">How does spaced repetition help with vocabulary from shows?</strong><p className="text-gray-400 text-sm">Spaced repetition shows you saved words at increasing intervals, strengthening long-term retention.</p></div>
            </div>
          </div>
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Building Your Vocabulary While Watching Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Dual subtitles. Vocabulary Builder. Spaced repetition. Everything you need to turn screen time into language growth.</p>
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
