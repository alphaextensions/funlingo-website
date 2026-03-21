"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Globe, BookOpen, Layers, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WebsiteTranslationContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Blog Post</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Website Translation for Language Learning: Read Any Website in Two Languages</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 07, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Learn Languages While Browsing the Web</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Language learning often requires switching between multiple tools. This constant switching interrupts learning and makes the process slow.</p>
          <p className="lead text-xl leading-relaxed text-gray-200">Funlingo&apos;s Website Translation feature changes this experience completely. Instead of leaving the page, you can now read any website in both the original language and your learning language at the same time.</p>
          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Experience seamless bilingual browsing today.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>
          <hr className="border-white/10 my-12" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What is the Funlingo Website Translation Feature?</h2>
          <p className="text-gray-300 mb-6">The Website Translation feature allows users to open any website and instantly view the content in two languages: the original language and your learning language.</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How the Feature Works</h2>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-16">
            {[{title:"Open Any Website",desc:"Visit any article, blog, or webpage."},{title:"Enable Website Translation",desc:"Turn on Page Translation in Funlingo."},{title:"Activate Bilingual Display",desc:"Enable the Bilingual Display option."},{title:"Learn Words in Context",desc:"Hover over words to understand meanings and usage."}].map((s,i)=>(
              <div key={i} className="flex gap-6 relative"><div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i+1}</div><div className="pt-2 text-gray-300"><strong className="text-white block mb-1">{s.title}</strong>{s.desc}</div></div>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Benefits of Bilingual Website Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Globe className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Learn Languages While Browsing</h3><p className="text-sm text-gray-400">Practice language skills while reading news, blogs, or research.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><BookOpen className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Understand Words in Context</h3><p className="text-sm text-gray-400">Context helps learners understand how words are actually used.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Zap className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Improve Vocabulary Naturally</h3><p className="text-sm text-gray-400">Repeated exposure across different webpages strengthens retention.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Layers className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Turn Any Website into a Resource</h3><p className="text-sm text-gray-400">Articles, blogs, and documentation pages become learning materials.</p></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Conclusion</h2>
          <p className="text-gray-300 mb-6">Learning a language becomes easier when it fits into your daily routine. Funlingo&apos;s Website Translation feature transforms any website into a bilingual reading experience.</p>
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Bilingual Browsing Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Turn any webpage into a language learning resource.</p>
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
