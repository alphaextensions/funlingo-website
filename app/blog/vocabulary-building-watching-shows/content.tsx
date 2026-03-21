"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Brain, Eye, BookOpen, Repeat, Target, Lightbulb, BarChart3, Layers, Zap, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VocabularyBuildingWatchingContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Build Vocabulary While Watching Shows (A Science-Backed Method)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 11 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">The Problem with Passive Watching</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Most people who try to learn a language by watching shows make the same mistake: they watch passively. They enjoy the story, read the subtitles, and feel like they are learning. But when they try to use the language in real life, they cannot recall the words they saw.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">The solution is not to watch more. It is to watch smarter. Language science gives us a clear, repeatable method for turning every episode into a vocabulary lesson, and it only adds a few minutes to your viewing time.</p>
          <p className="text-gray-300 mb-6">This guide builds on the foundational strategies in our article on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a> and goes deeper into the specific science of vocabulary retention.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Turn every show into a vocabulary lesson with free dual subtitles.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The Science Behind Vocabulary Acquisition from Video</h2>
          <p className="text-gray-300 mb-6">Three well-established principles from language science explain why watching shows can be so effective for vocabulary building, when done correctly.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Brain className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-lg font-bold text-white mb-2">Comprehensible Input</h3><p className="text-sm text-gray-400">Stephen Krashen&apos;s theory states that language is acquired when learners understand messages that contain structures slightly beyond their current level. Dual subtitles make input comprehensible by providing translations in real time.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Eye className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-lg font-bold text-white mb-2">Dual Coding Theory</h3><p className="text-sm text-gray-400">Allan Paivio&apos;s research shows that information processed through both visual and auditory channels is remembered better. When you hear a word, see it written, and understand its context visually, you create three memory anchors instead of one.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Repeat className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-lg font-bold text-white mb-2">The Spacing Effect</h3><p className="text-sm text-gray-400">Hermann Ebbinghaus demonstrated that reviewing information at increasing intervals dramatically improves long-term retention. Spaced repetition after watching locks vocabulary into permanent memory.</p></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The 4-Step Vocabulary Building Method</h2>
          <p className="text-gray-300 mb-8">This method combines all three scientific principles into a simple, repeatable process you can use with any show on Netflix, YouTube, or Prime Video.</p>

          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
            {[
              { title: "Step 1: Watch with Dual Subtitles", desc: "Enable dual subtitles using Funlingo so you see both your target language and native language on screen. This makes the input comprehensible and lets you follow the story while being exposed to new vocabulary in written form. Do not pause or look things up at this stage. Just watch naturally." },
              { title: "Step 2: Notice and Save New Words", desc: "As you watch, your brain will naturally flag unfamiliar words that appear repeatedly or in emotionally engaging scenes. When you notice a word you want to learn, click it in the subtitles to save it to your vocabulary list. Aim for 5 to 15 words per episode. Do not try to save every unknown word. Focus on words that seem useful or that you have seen more than once." },
              { title: "Step 3: Review with Spaced Repetition", desc: "After your watching session, spend 2 to 5 minutes reviewing your saved words. The key is spaced repetition: review new words after 1 day, then 3 days, then 7 days, then 14 days. Each review strengthens the neural pathway. Funlingo's built-in spaced repetition handles the scheduling automatically." },
              { title: "Step 4: Re-encounter Words Naturally", desc: "As you continue watching more episodes, you will naturally encounter your saved words again in new contexts. Each natural re-encounter reinforces the word further. This is where the method becomes self-sustaining: the more you watch, the more you reinforce previously saved vocabulary." },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i + 1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why This Method Beats Flashcards Alone</h2>
          <p className="text-gray-300 mb-6">Flashcard apps like Anki are excellent tools, but they have a fundamental limitation: they teach words in isolation. You learn that &quot;casa&quot; means &quot;house,&quot; but you do not learn how native speakers actually use the word in conversation, what emotions it carries, or what words naturally appear alongside it.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Flashcards Alone</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Efficient for memorizing definitions</div>
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Good spaced repetition scheduling</div>
                <div className="flex items-center gap-2 text-red-400"><Zap className="w-4 h-4" /> Words learned in isolation</div>
                <div className="flex items-center gap-2 text-red-400"><Zap className="w-4 h-4" /> No pronunciation training</div>
                <div className="flex items-center gap-2 text-red-400"><Zap className="w-4 h-4" /> No emotional memory anchors</div>
                <div className="flex items-center gap-2 text-red-400"><Zap className="w-4 h-4" /> Can feel like a chore</div>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30">
              <h3 className="text-lg font-bold text-white mb-3">4-Step Method + Funlingo</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Words learned in rich context</div>
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Built-in spaced repetition</div>
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Native pronunciation included</div>
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Emotional memory anchors</div>
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Collocations and usage patterns</div>
                <div className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Feels like entertainment</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Retention Rates: What the Research Shows</h2>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-12">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Without any review</span><span className="text-white font-medium">Learners forget approximately 80% of new vocabulary within 48 hours (Ebbinghaus forgetting curve).</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">With spaced repetition only</span><span className="text-white font-medium">Retention improves to around 70-80% at 30 days when words are reviewed at optimal intervals.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">With contextual learning + spaced repetition</span><span className="text-white font-medium">Retention reaches 85-95% at 30 days when words are learned in meaningful context and reinforced with spaced review.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">With 4-step method (dual subtitles + saving + spaced repetition + natural re-encounters)</span><span className="text-white font-medium">The highest retention rates. Multiple encoding channels, emotional anchors, and natural reinforcement create durable vocabulary knowledge.</span></div></div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How Funlingo Makes This Method Easy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Layers className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Dual Subtitles</h3><p className="text-sm text-gray-400">See both languages simultaneously on Netflix, YouTube, and Prime Video. No manual setup for each video, it works automatically.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Target className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">One-Click Word Saving</h3><p className="text-sm text-gray-400">Click any word in the subtitles to see its translation and save it to your vocabulary list. No disruption to your watching flow.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><BarChart3 className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Spaced Repetition</h3><p className="text-sm text-gray-400">Saved words are automatically scheduled for review at optimal intervals. You just follow the prompts.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Lightbulb className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Completely Free</h3><p className="text-sm text-gray-400">All features are available for free. No premium tier, no trial period, no word-saving limits. For a full comparison of tools, see our <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">best dual subtitle extension guide</a>.</p></div>
          </div>

          <p className="text-gray-300 mb-6">Ready to put this method into practice? Start with our platform-specific guides: <a href="/blog/how-to-get-dual-subtitles-on-netflix" className="text-[#C642FC] hover:underline">dual subtitles on Netflix</a>, <a href="/blog/learn-spanish-watching-netflix" className="text-[#C642FC] hover:underline">learning Spanish with Netflix</a>, or <a href="/blog/learn-korean-watching-youtube" className="text-[#C642FC] hover:underline">learning Korean on YouTube</a>.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">How many words can I learn per episode using this method?</strong><p className="text-gray-400 text-sm">Most learners can effectively acquire 5 to 15 new words per episode, with long-term retention rates above 80% when combined with spaced repetition.</p></div>
              <div><strong className="text-white block mb-1">Is watching shows better than flashcards for vocabulary?</strong><p className="text-gray-400 text-sm">Watching shows provides contextual learning that flashcards cannot match. The ideal approach combines both: learn words from shows and reinforce them with spaced repetition.</p></div>
              <div><strong className="text-white block mb-1">What is the science behind learning vocabulary from TV?</strong><p className="text-gray-400 text-sm">Three principles support this: comprehensible input theory (Krashen), dual coding theory (Paivio), and the spacing effect (Ebbinghaus). Together they show that contextual audiovisual learning with spaced review leads to durable acquisition.</p></div>
              <div><strong className="text-white block mb-1">Do I need dual subtitles for this method to work?</strong><p className="text-gray-400 text-sm">Dual subtitles significantly enhance the method by providing instant comprehension. While you can learn with single subtitles, dual subtitles make the process faster and more enjoyable.</p></div>
              <div><strong className="text-white block mb-1">How does Funlingo&apos;s word-saving feature work?</strong><p className="text-gray-400 text-sm">Click any word in the subtitles to see its translation and save it. Saved words can then be reviewed with spaced repetition for long-term retention.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Building Vocabulary While You Watch</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Dual subtitles. One-click word saving. Spaced repetition. The complete science-backed vocabulary building toolkit, completely free.</p>
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
