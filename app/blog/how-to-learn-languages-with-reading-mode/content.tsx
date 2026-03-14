"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReadingMode2Content() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Learning Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Reading Mode: How to Learn Languages While You Watch (Bilingual Captions That Actually Work)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> February 16, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <h3 className="text-white text-lg font-bold mt-0 mb-2">TL;DR</h3>
            <p className="m-0 text-gray-300">Watching shows and videos can become productive learning time when the viewing experience removes friction. Reading Mode shows exact captions in the original audio language and your learning language -- synchronized to the video timestamp -- with instant hover definitions and example sentences. Use the short routines below to turn passive viewing into repeatable vocabulary gains.</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Why &quot;watching to learn&quot; often fails -- and how Reading Mode fixes it</h2>
          <p>People try to learn languages from shows and videos for two good reasons: the content is authentic and plentiful. But common problems kill learning momentum:</p>
          <ul className="space-y-3 list-none pl-0 mb-6">
            <li className="flex gap-3"><span className="text-red-400 font-bold">&#10005;</span><span className="text-gray-300">Pausing to look up words interrupts comprehension.</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-bold">&#10005;</span><span className="text-gray-300">Copy-and-paste or typing slow down the flow.</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-bold">&#10005;</span><span className="text-gray-300">Context is lost when you extract single words from a sentence.</span></li>
          </ul>
          <p>Reading Mode solves those problems by keeping audio and reading together.</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">How Reading Mode actually works</h2>
          <p>Reading Mode presents a split interface:</p>
          <ul className="space-y-4 list-disc pl-5 text-gray-300">
            <li><strong className="text-white">Left:</strong> video player with normal playback controls.</li>
            <li><strong className="text-white">Right:</strong> a reading pane with sentence-by-sentence captions.</li>
            <li><strong className="text-white">Active highlight:</strong> the current sentence is emphasized.</li>
            <li><strong className="text-white">Hover micro-help:</strong> hover a word to reveal synonyms and example sentences.</li>
          </ul>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-8">5 concrete routines to use Reading Mode</h2>
          <div className="space-y-8">
            {[{t:"1. The 15-minute watch + highlight session",d:"Watch 15 minutes of a show you enjoy. Every time you see a new word, hover and tap Save."},{t:"2. The 5-minute drill",d:"Replay a 5-10 second clip with the caption highlighted. Read the sentence aloud three times."},{t:"3. The weekly review",d:"Use your saved words in spaced repetition. Before you watch, quickly review last week's list."},{t:"4. Topic immersion",d:"Pick a theme and watch two short videos. Same domain vocabulary reappears."},{t:"5. Comprehension checks",d:"After a scene, write a one-line summary of what you understood."}].map((s,i)=>(
              <div key={i} className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h3 className="text-xl font-bold text-[#C642FC] mt-0 mb-3">{s.t}</h3>
                <p className="m-0 text-gray-300">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mt-16 mb-12">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">What learners told us (real-user micro-case)</h3>
            <blockquote className="border-l-4 border-[#C642FC] pl-4 italic text-gray-200 mb-4">&quot;I started with 10 minutes a day. After two weeks I could follow 30-40% of simple conversations without pausing. The timestamped captions made all the difference.&quot;</blockquote>
            <p className="text-gray-400 text-sm text-right">-- Team Funlingo</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Practical FAQs</h2>
          <div className="space-y-8">
            <div><h4 className="text-white font-bold text-lg mb-2">Q: Will Reading Mode work on any video?</h4><p className="text-gray-300 m-0">A: It works on most video players that provide subtitles (YouTube, many Vimeo embeds).</p></div>
            <div><h4 className="text-white font-bold text-lg mb-2">Q: Is my data private?</h4><p className="text-gray-300 m-0">A: Yes -- captions are rendered locally where possible.</p></div>
            <div><h4 className="text-white font-bold text-lg mb-2">Q: Can I export saved words?</h4><p className="text-gray-300 m-0">A: You can export your vocabulary list (CSV/Anki format).</p></div>
          </div>
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start using Reading Mode today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Pick one scene, read along, and replay a line 3 times. Small, repeatable actions build real fluency over time.</p>
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
