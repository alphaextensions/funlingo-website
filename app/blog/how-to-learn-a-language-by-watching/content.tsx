"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, Play, Repeat, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LearnByWatchingContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Learn a Language by Watching (Without Wasting Your Time)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> February 21, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed text-gray-200">A lot of people say, &quot;Just watch Netflix in your target language.&quot;</p>
          <p>In theory, that sounds great. In practice, most learners either pause every 20 seconds to translate, turn on subtitles in their native language and stop paying attention, or give up because it feels too difficult.</p>
          <p className="font-semibold text-white">Watching can absolutely help -- but only if it&apos;s structured correctly.</p>
          <p>This guide explains how to actually learn a language by watching -- in a way that improves listening, vocabulary, and comprehension.</p>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Watching Can Be Powerful for Language Learning</h2>
          <p>Watching shows provides three things traditional learning methods often lack:</p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li><strong className="text-white">Real pronunciation</strong></li>
            <li><strong className="text-white">Natural sentence structure</strong></li>
            <li><strong className="text-white">Emotional context</strong></li>
          </ol>
          <p>When you hear words in conversation tied to tone, facial expression, and real situations, your brain builds stronger memory associations. This is called contextual language learning.</p>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">The 3-Layer Method for Learning From Shows</h2>
          <h3 className="text-xl font-bold text-white mb-4">1. Watch With Dual Context (Not Just Subtitles)</h3>
          <p>Use both subtitles -- but intentionally. See the original line and the translated line together. This allows instant comparison without breaking listening rhythm.</p>
          <p className="italic text-gray-400 border-l-4 border-[#C642FC] pl-4">The key is: Read quickly, return to listening immediately. Over time, you&apos;ll rely less on translation.</p>
          <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Focus on Sentences, Not Single Words</h3>
          <p>Most learners make the mistake of translating word-by-word. But language doesn&apos;t function word-by-word. Understand the full sentence first, then examine 1-2 unknown words inside context.</p>
          <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Repetition Beats Translation</h3>
          <ul className="space-y-4 list-none pl-0 mb-8">
            <li className="flex gap-3"><Repeat className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" /><span className="text-gray-300">Replay short 3-5 second clips.</span></li>
            <li className="flex gap-3"><Play className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" /><span className="text-gray-300">Listen twice before looking at translation.</span></li>
            <li className="flex gap-3"><Mic className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" /><span className="text-gray-300">Try shadowing (repeat what you hear aloud).</span></li>
          </ul>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Choosing the Right Content Level</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-xl">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Start with:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300"><li>Vlogs</li><li>Sitcoms</li><li>Interviews</li><li>Everyday conversations</li></ul>
            </div>
            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl">
              <h3 className="text-red-400 font-bold mb-4">Avoid:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300"><li>Crime dramas with heavy slang</li><li>Political debates</li><li>Historical documentaries</li></ul>
            </div>
          </div>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">A Realistic Weekly Plan</h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start"><div className="bg-[#C642FC]/20 text-[#C642FC] font-bold px-3 py-1 rounded text-sm shrink-0 mt-1">3 days</div><div><strong className="text-white block">15-20 minutes of structured watching</strong></div></div>
            <div className="flex gap-4 items-start"><div className="bg-[#C642FC]/20 text-[#C642FC] font-bold px-3 py-1 rounded text-sm shrink-0 mt-1">2 days</div><div><strong className="text-white block">10 minutes reviewing saved vocabulary</strong></div></div>
            <div className="flex gap-4 items-start"><div className="bg-[#C642FC]/20 text-[#C642FC] font-bold px-3 py-1 rounded text-sm shrink-0 mt-1">1 day</div><div><strong className="text-white block">Summarize a scene out loud</strong></div></div>
          </div>
          <p className="italic text-gray-400">Consistency matters more than duration.</p>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Final Thoughts</h2>
          <p>Watching won&apos;t magically make you fluent. But when structured correctly, it becomes one of the most natural and sustainable ways to learn.</p>
          <p className="font-bold text-white">That&apos;s real progress.</p>
          <hr className="border-white/10 my-12" />
          <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] text-2xl font-bold">F</div>
            <div><h3 className="text-lg font-bold text-white mt-0 mb-2">About the author</h3><p className="text-gray-300 text-sm mb-2">Team Funlingo</p></div>
          </div>
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning While You Watch</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Try Funlingo&apos;s dual subtitles and turn your next Netflix binge into a language lesson.</p>
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
