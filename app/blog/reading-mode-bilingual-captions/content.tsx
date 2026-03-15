"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, BookOpen, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReadingModeContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Product Feature</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Reading Mode: Learn Naturally -- Read Captions Side-by-Side While You Watch</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> February 05, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Rushab Kasat</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed text-gray-200">Watching movies, shows, or videos is one of the easiest ways to learn a language -- if the learning experience fits naturally into your viewing flow. At Funlingo we built <em>Reading Mode</em> so learners can read exact captions in both the original (audio) language and their native/learning language -- synchronized to the video timestamp -- without breaking concentration.</p>
          <p>This article explains <em>why</em> Reading Mode works, <em>how</em> to use it effectively, and <em>how</em> it fits into a practical learning routine you can use today.</p>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why side-by-side captions are more effective than translation lists</h2>
          <p>Most language study tools separate video from reading: you either pause to look up a word, open a dictionary, or copy text into a note. That friction kills learning momentum.</p>
          <p>Reading Mode removes that friction by:</p>
          <ul className="space-y-4 list-none pl-0 mb-8">
            <li className="flex gap-3"><Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Keeping audio and text together:</strong> The original audio stays playing while you read both lines.</span></li>
            <li className="flex gap-3"><Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Providing exact, timestamped context:</strong> Every caption is linked to a time code.</span></li>
            <li className="flex gap-3"><Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Reducing cognitive load:</strong> Seeing short, aligned lines is easier to scan than full-paragraph translations.</span></li>
          </ul>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What Reading Mode shows you</h2>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-12">
            <ul className="space-y-4 list-disc pl-5 m-0 text-gray-300">
              <li><strong className="text-white">Video player (left pane):</strong> standard playback controls.</li>
              <li><strong className="text-white">Synchronized bilingual captions (right pane):</strong> original + learning language aligned to the same timestamp.</li>
              <li><strong className="text-white">Highlighting:</strong> current line is emphasized.</li>
              <li><strong className="text-white">Hover/tap micro-help:</strong> hover any word for synonyms and examples.</li>
              <li><strong className="text-white">Playback shortcuts:</strong> jump, replay, or loop segments.</li>
            </ul>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">5 practical ways to use Reading Mode</h2>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-16">
            {[{title:"Passive exposure (10-30 mins)",desc:"Put on a show you like, read along."},{title:"Targeted vocabulary capture",desc:"When you see a new word, hover for synonyms."},{title:"Pronunciation drills",desc:"Loop 2-3 seconds of audio and read aloud."},{title:"Comprehension checks",desc:"After a scene, summarize the main idea."},{title:"Active note-taking",desc:"Use timestamped lines to add quick notes."}].map((s,i)=>(
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i+1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How Reading Mode fits into a learner routine</h2>
          <ul className="space-y-4 list-none pl-0 mb-12">
            <li className="flex gap-3"><Clock className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Daily micro-sessions:</strong> 15-20 minutes most days.</span></li>
            <li className="flex gap-3"><Save className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Weekly review:</strong> Use saved words + spaced repetition.</span></li>
            <li className="flex gap-3"><BookOpen className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" /><span className="text-gray-300"><strong className="text-white">Project-based learning:</strong> Pick a theme to build topic-specific vocabulary.</span></li>
          </ul>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-16">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">Real learner example</h3>
            <blockquote className="border-l-4 border-[#C642FC] pl-4 italic text-gray-200 mb-4">&quot;I used Reading Mode with a Korean travel vlog for 20 minutes a day. After two weeks I recognized common travel phrases and could follow 40-50% of simple sentences without pausing.&quot;</blockquote>
            <p className="text-gray-400 text-sm text-right">Team Funlingo</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Conclusion</h2>
          <p>Reading while watching removes friction and turns entertainment time into meaningful learning time.</p>
          <hr className="border-white/10 my-12" />
          <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] text-2xl font-bold">F</div>
            <div><h3 className="text-lg font-bold text-white mt-0 mb-2">About the author</h3><p className="text-gray-300 text-sm mb-2">Team Funlingo</p></div>
          </div>
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to try Reading Mode?</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Install Funlingo and turn your next video into a language lesson.</p>
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
