"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Volume2, Globe, MousePointerClick, Brain, Save, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BestAIToolsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Blog Post</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">FunLingo: AI-native, low-friction learning</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> January 28, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 4 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed text-gray-200">FunLingo overlays dual subtitles and lets users click any word to see 1/2/3/All native-language translations, with phonetics, audio, and a save-to-vocab flow that creates durable learning.</p>
          <hr className="border-white/10 my-12" />
          <h3 className="text-2xl font-bold text-white mb-6">Feature breakdown</h3>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-12">
            <ul className="space-y-6 list-none pl-0 m-0">
              <li className="flex gap-4"><div className="mt-1 text-[#C642FC] shrink-0"><Globe className="w-5 h-5" /></div><div><strong className="text-white">Interactive Dual Subtitles (in-player)</strong> — <span className="text-gray-400">view learner + native subtitles together.</span></div></li>
              <li className="flex gap-4"><div className="mt-1 text-[#C642FC] shrink-0"><MousePointerClick className="w-5 h-5" /></div><div><strong className="text-white">Word-Level Multi-Translation Selector (choose depth)</strong> — <span className="text-gray-400">pick how many meanings to show per word to avoid overload or to get deeper nuance. (Unique FunLingo UX)</span></div></li>
              <li className="flex gap-4"><div className="mt-1 text-[#C642FC] shrink-0"><Brain className="w-5 h-5" /></div><div><strong className="text-white">Click-for-Context AI Explanations</strong> — <span className="text-gray-400">brief grammar and usage notes for phrases.</span></div></li>
              <li className="flex gap-4"><div className="mt-1 text-[#C642FC] shrink-0"><Volume2 className="w-5 h-5" /></div><div><strong className="text-white">Pronunciation Guides with phonetic transcription & slow playback</strong> — <span className="text-gray-400">hear native speech and break down syllables.</span></div></li>
              <li className="flex gap-4"><div className="mt-1 text-[#C642FC] shrink-0"><Save className="w-5 h-5" /></div><div><strong className="text-white">Save-to-Vocab and Review Deck</strong> — <span className="text-gray-400">immediate saving from overlay with spaced review.</span></div></li>
            </ul>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How it works (step-by-step user flow)</h2>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-16">
            {["Install the FunLingo browser extension.", "Play a video or open an article with dual subtitles.", "Hover or click any word in the learning subtitle. A small overlay appears with chips: [1][2][3][All].", "Select the number of translations to view. See phonetics, a short context sentence, and Play for native audio.", "Tap Save to Vocab to add the phrase to your review deck."].map((step, i) => (
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i + 1}</div><div className="pt-2 text-gray-300">{step}</div></div>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Real use cases (users & intent)</h2>
          <ul className="space-y-4 list-disc pl-5 text-gray-300 mb-16">
            <li><strong className="text-white">Students:</strong> speed up comprehension for lectures and foreign-language media.</li>
            <li><strong className="text-white">Travelers & professionals:</strong> learn targeted vocabulary from local shows and webinars.</li>
            <li><strong className="text-white">Teachers:</strong> create classroom exercises from real media.</li>
          </ul>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20">
            <h2 className="text-2xl font-bold text-white mb-6 mt-0">Comparison summary: Why FunLingo stands out</h2>
            <ul className="space-y-4 list-none pl-0 mb-0">
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Unique per-word multi-translation selector</strong> eliminates guesswork and minimizes re-search time.</span></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Integrated pronunciation & save flows</strong> convert viewing time to durable memory.</span></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Low friction, in-player overlays</strong> preserve immersion and boost daily usage — key to consistent learning.</span></li>
            </ul>
          </div>
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to try FunLingo?</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Turn your next movie night into a language breakthrough.</p>
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
