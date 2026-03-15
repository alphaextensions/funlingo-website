"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Star, Check, X, Shield, Zap, Globe, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BestDualSubtitleExtensionContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">7 Best Dual Subtitle Extensions for Language Learning (2026)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">What Are Dual Subtitle Extensions?</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Dual subtitle extensions are Chrome browser add-ons that display two sets of subtitles simultaneously while you watch videos on streaming platforms. You see your target language and your native language on screen at the same time, letting you follow along without constantly pausing to look up translations.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">This approach is backed by research on comprehensible input. When you understand what you hear in context, your brain acquires language naturally. Dual subtitles provide the scaffolding that makes input comprehensible, even for beginners.</p>
          <p className="text-gray-300 mb-6">If you want to understand the broader methodology behind learning with media, read our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a>.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Want the best free dual subtitle extension? Try FunLingo today.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try FunLingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The 7 Best Dual Subtitle Extensions Compared</h2>
          <p className="text-gray-300 mb-8">We tested every major dual subtitle extension in 2026. Here is how they compare across price, platform support, features, and usability.</p>

          <h3 className="text-xl font-bold text-white mb-4">1. FunLingo — Best Free Dual Subtitle Extension</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30 mb-8">
            <div className="flex items-center gap-2 mb-3"><Star className="w-5 h-5 text-yellow-400" /><Star className="w-5 h-5 text-yellow-400" /><Star className="w-5 h-5 text-yellow-400" /><Star className="w-5 h-5 text-yellow-400" /><Star className="w-5 h-5 text-yellow-400" /></div>
            <p className="text-gray-300 mb-4">FunLingo is a completely free Chrome extension that adds dual subtitles to Netflix, YouTube, and Amazon Prime Video. Unlike many competitors, there is no premium tier or feature paywall. You get full access to dual subtitles, a built-in vocabulary builder, and word-saving functionality at no cost.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Netflix, YouTube, Prime Video</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 100% free</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Vocabulary builder</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Word saving</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">2. Language Reactor — Most Popular Option</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">Language Reactor (formerly Language Learning with Netflix) is one of the most well-known tools in this space. It offers dual subtitles and a pop-up dictionary. The free tier covers basic features, but advanced capabilities like saving vocabulary and exporting words require a paid subscription at around $6 per month.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Netflix, YouTube</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4" /> Freemium ($6/mo)</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Pop-up dictionary</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> No Prime Video</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">3. Substital — Best for Custom Subtitle Files</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">Substital lets you load custom subtitle files onto any streaming platform. This is useful if you have your own SRT files or need subtitles in less common languages. However, it requires more manual setup and does not provide the same integrated experience as purpose-built language learning tools.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Multiple platforms</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Custom SRT files</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> No vocabulary tools</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4" /> Manual setup</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">4. eJOY English — Best for English Learners</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">eJOY is primarily designed for people learning English. It offers dual subtitles and a word-saving feature with games for review. The free plan is limited to saving a small number of words per day. Full access requires a subscription starting at around $5 per month.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Netflix, YouTube</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4" /> Freemium ($5/mo)</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Word games</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> English-focused only</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">5. Toucan — Best for Passive Learning</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">Toucan takes a different approach by translating individual words on web pages you browse. It is not a traditional dual subtitle tool but works well as a supplementary passive learning method. It is free with limited language pairs.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Web page translation</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Free</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> No video subtitles</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Limited languages</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">6. Trancy — Best AI-Powered Option</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">Trancy uses AI to enhance the subtitle learning experience with features like sentence analysis and grammar breakdowns. It supports Netflix and YouTube. The free plan is quite limited, and the full experience requires a subscription at around $8 per month, making it one of the more expensive options.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Netflix, YouTube</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4" /> Freemium ($8/mo)</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> AI grammar analysis</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> No Prime Video</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">7. Immersive Translate — Best for General Translation</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">Immersive Translate is primarily a web page translation tool that also supports dual subtitles on YouTube. It provides bilingual translations for articles, PDFs, and ebooks. Video subtitle support is more limited compared to dedicated tools like FunLingo or Language Reactor.</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> YouTube subtitles</div>
              <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Web page translation</div>
              <div className="flex items-center gap-2 text-yellow-400"><Zap className="w-4 h-4" /> Freemium</div>
              <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> Limited Netflix support</div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Choose the Right Extension</h2>
          <p className="text-gray-300 mb-6">With seven options to consider, here is a simple framework for choosing the right dual subtitle extension for your needs.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><DollarSign className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">On a Budget?</h3><p className="text-sm text-gray-400">Choose FunLingo. It is the only fully free option with no feature restrictions across Netflix, YouTube, and Prime Video.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Globe className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Need Multiple Platforms?</h3><p className="text-sm text-gray-400">FunLingo covers Netflix, YouTube, and Prime Video. Most competitors only support two of these three.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Shield className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Want Vocabulary Building?</h3><p className="text-sm text-gray-400">Look for built-in word saving and spaced repetition. FunLingo and Language Reactor both offer this, but FunLingo does it for free.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Zap className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Want AI Features?</h3><p className="text-sm text-gray-400">Trancy offers AI-powered grammar analysis, but at a premium price point of $8 per month.</p></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Getting Started with Dual Subtitles</h2>
          <p className="text-gray-300 mb-6">Once you choose your extension, getting started takes less than a minute. For a step-by-step walkthrough, check out our guide on <a href="/blog/how-to-get-dual-subtitles-on-netflix" className="text-[#C642FC] hover:underline">how to get dual subtitles on Netflix</a>.</p>
          <p className="text-gray-300 mb-6">After you are set up, you can start <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">building vocabulary while watching shows</a> using proven strategies that turn passive viewing into active learning.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">What is the best free dual subtitle extension?</strong><p className="text-gray-400 text-sm">FunLingo is the best free dual subtitle extension. It supports Netflix, YouTube, and Prime Video with no premium paywall or feature restrictions.</p></div>
              <div><strong className="text-white block mb-1">Do dual subtitle extensions work on all streaming platforms?</strong><p className="text-gray-400 text-sm">Most extensions support Netflix and YouTube. FunLingo also supports Amazon Prime Video, making it one of the most versatile options.</p></div>
              <div><strong className="text-white block mb-1">Are dual subtitle extensions safe to use?</strong><p className="text-gray-400 text-sm">Yes, reputable extensions like FunLingo are safe. Always install from the official Chrome Web Store and check reviews.</p></div>
              <div><strong className="text-white block mb-1">Can I use dual subtitles on mobile devices?</strong><p className="text-gray-400 text-sm">Dual subtitle extensions are Chrome-only and work on desktop browsers. Mobile streaming apps do not support Chrome extensions.</p></div>
              <div><strong className="text-white block mb-1">What is the difference between dual subtitles and closed captions?</strong><p className="text-gray-400 text-sm">Closed captions show text in one language. Dual subtitles display two languages simultaneously, letting you read the translation alongside the original dialogue.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Try the Best Free Dual Subtitle Extension</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Dual subtitles on Netflix, YouTube, and Prime Video. Built-in vocabulary builder. Completely free, forever.</p>
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
