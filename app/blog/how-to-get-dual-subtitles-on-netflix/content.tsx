"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Monitor, Download, Settings, Play, CheckCircle, Lightbulb, Target, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HowToGetDualSubtitlesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Get Dual Subtitles on Netflix (2026 Guide)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Why You Need Dual Subtitles on Netflix</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Netflix has thousands of shows and movies in dozens of languages, making it one of the best language learning resources available. But there is a problem: Netflix only lets you display one subtitle language at a time.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">For language learners, that means constantly choosing between understanding what is happening (native language subtitles) and practicing your target language (target language subtitles). Dual subtitles solve this by showing both languages simultaneously.</p>
          <p className="text-gray-300 mb-6">Studies on comprehensible input have shown that learners acquire language faster when they can understand the meaning of what they hear. Dual subtitles give you that understanding while keeping you exposed to the target language text.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Get dual subtitles on Netflix in under 30 seconds. Completely free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step-by-Step: How to Get Dual Subtitles on Netflix</h2>
          <p className="text-gray-300 mb-8">Setting up dual subtitles on Netflix takes less than 30 seconds. Here is the complete process.</p>

          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
            {[
              { icon: Monitor, title: "Open Netflix in Chrome", desc: "Navigate to netflix.com in your Chrome browser on a desktop or laptop computer. Dual subtitle extensions do not work on the Netflix app or other browsers." },
              { icon: Download, title: "Install Funlingo", desc: "Visit the Chrome Web Store and search for Funlingo, or click the direct link below. Click 'Add to Chrome' and confirm the installation. It takes about 10 seconds." },
              { icon: Settings, title: "Select Your Languages", desc: "Click the Funlingo icon in your Chrome toolbar. Choose your native language and your target language. Funlingo supports all languages that Netflix provides subtitles for." },
              { icon: Play, title: "Play Any Show or Movie", desc: "Start watching any Netflix title. Funlingo automatically detects when you are on Netflix and adds the second subtitle track below the original subtitles." },
              { icon: CheckCircle, title: "Start Learning", desc: "Both subtitle languages now appear on screen. You can click on individual words to see translations and save them to your vocabulary list." },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i + 1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How Dual Subtitles Transform Netflix Into a Language Lesson</h2>
          <p className="text-gray-300 mb-6">Once you have dual subtitles set up, Netflix becomes a fundamentally different learning experience. Here is what changes.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Lightbulb className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Instant Context</h3><p className="text-sm text-gray-400">You never need to pause and look up a word. The translation is right there on screen, keeping you immersed in the story.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Target className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Pattern Recognition</h3><p className="text-sm text-gray-400">Over time, your brain starts recognizing recurring grammar patterns and sentence structures without explicit study.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><BookOpen className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Reading Practice</h3><p className="text-sm text-gray-400">You practice reading in your target language while listening to native speakers. This trains both reading speed and listening comprehension.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Play className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Natural Pace</h3><p className="text-sm text-gray-400">Unlike textbooks, Netflix dialogue moves at natural speed, training your brain to process language in real time.</p></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Tips for Different Levels</h2>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-12">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Beginner</span><span className="text-white font-medium">Start with shows you have already watched in your native language. Familiarity with the plot lets you focus on the language. Animated shows and children&apos;s content use simpler vocabulary.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Intermediate</span><span className="text-white font-medium">Watch new shows with dual subtitles. Focus on recognizing words you know and saving new ones. Romantic comedies and slice-of-life dramas use everyday conversation.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Advanced</span><span className="text-white font-medium">Try watching with only target language subtitles first, then rewatch with dual subtitles to catch what you missed. Documentaries and political dramas build advanced vocabulary.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Pro Tip</span><span className="text-white font-medium">Regardless of your level, save 5 to 15 new words per episode. Review them daily using spaced repetition to lock them into long-term memory.</span></div></div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Netflix Shows for Language Learning</h2>
          <p className="text-gray-300 mb-6">The best shows for learning are ones you genuinely enjoy. That said, some genres work better than others for language acquisition. Check out our dedicated guides for specific languages like <a href="/blog/learn-spanish-watching-netflix" className="text-[#C642FC] hover:underline">learning Spanish with Netflix</a>.</p>
          <p className="text-gray-300 mb-6">For more vocabulary building strategies while watching, read our guide on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">how to build vocabulary while watching shows</a>.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Can Netflix show two subtitles at once?</strong><p className="text-gray-400 text-sm">Netflix does not natively support dual subtitles. You need a Chrome extension like Funlingo to display two subtitle languages simultaneously.</p></div>
              <div><strong className="text-white block mb-1">Is Funlingo free for Netflix dual subtitles?</strong><p className="text-gray-400 text-sm">Yes, Funlingo is completely free with no premium tier or trial period. All features are available at no cost.</p></div>
              <div><strong className="text-white block mb-1">Does this work on the Netflix app?</strong><p className="text-gray-400 text-sm">No, dual subtitle extensions only work in the Chrome browser on desktop or laptop. They do not work on the Netflix mobile or TV app.</p></div>
              <div><strong className="text-white block mb-1">Which languages does Funlingo support on Netflix?</strong><p className="text-gray-400 text-sm">Funlingo supports all subtitle languages available on Netflix. You can pair any two languages as your dual subtitles.</p></div>
              <div><strong className="text-white block mb-1">Will dual subtitles slow down my Netflix streaming?</strong><p className="text-gray-400 text-sm">No. Funlingo is lightweight and does not affect video playback performance or streaming quality.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Get Dual Subtitles on Netflix Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free Chrome extension. 30-second setup. Dual subtitles on every Netflix title. Start learning tonight.</p>
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
