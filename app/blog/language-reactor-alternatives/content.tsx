"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Zap, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LanguageReactorAlternativesContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/15">
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Best Language Reactor Alternatives for Language Learning (2026)
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mt-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              April 18, 2026
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Funlingo Team
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              10 min read
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        <article className="prose prose-invert prose-lg max-w-none">

          {/* Intro */}
          <section className="mb-16">
            <p className="text-gray-300 leading-relaxed">
              Language Reactor (formerly Language Learning with Netflix) has been one of the most popular
              browser extensions for learning languages through video content. But as the tool has evolved,
              many users have found reasons to look elsewhere. The free version is increasingly limited,
              Language Reactor Pro now costs $7.99 per month for full features, there is no support for
              Amazon Prime Video, and the extension lacks per-word pronunciation audio &mdash; a feature
              that matters a lot when you are trying to nail unfamiliar sounds.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We tested the top alternatives head-to-head to find the best options for every type of
              learner. Whether you want a completely free tool, advanced AI grammar analysis, or support
              for platforms beyond Netflix and YouTube, this guide covers the seven best Language Reactor
              alternatives available in 2026. If you are exploring the broader landscape of{" "}
              <a href="/blog/netflix-language-learning-extensions" className="text-[#C642FC] hover:underline">
                Netflix language learning extensions
              </a>, this comparison will help you make an informed choice.
            </p>
          </section>

          {/* Why Switch */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Why Switch from Language Reactor?</h2>
            <p className="text-gray-300 leading-relaxed">
              Language Reactor deserves credit for popularizing the idea of dual subtitles on Netflix.
              It has a large and active community, a curated content catalog that helps you find shows
              by difficulty level, and a clean, familiar interface. For many learners it was their first
              exposure to immersive video-based study.
            </p>
            <p className="text-gray-300 leading-relaxed">
              That said, its limitations have become harder to ignore. The Pro plan at $7.99 per month
              is required for vocabulary saving, human-reviewed translations, and advanced playback
              controls. The free tier restricts you to basic dual subtitles with no way to save phrases
              or export vocabulary. There is no Amazon Prime Video support at all, which locks out a
              huge library of foreign-language content. And unlike newer tools, Language Reactor does
              not offer per-word pronunciation audio, a multi-translation selector that lets you compare
              translations from different engines, or AI-powered grammar explanations. If any of these
              gaps affect your workflow, one of the alternatives below will serve you better.
            </p>
          </section>

          {/* The 7 Best Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">
              The 7 Best Language Reactor Alternatives
            </h2>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-bold">Tool</th>
                    <th className="py-3 px-4 text-white font-bold">Price</th>
                    <th className="py-3 px-4 text-white font-bold">Netflix</th>
                    <th className="py-3 px-4 text-white font-bold">YouTube</th>
                    <th className="py-3 px-4 text-white font-bold">Prime Video</th>
                    <th className="py-3 px-4 text-white font-bold">Vocab Saving</th>
                    <th className="py-3 px-4 text-white font-bold">Pronunciation</th>
                    <th className="py-3 px-4 text-white font-bold">AI Features</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">Funlingo</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-white font-medium">Trancy</td><td className="py-3 px-4">$9.90/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Pro only</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">Immersive Translate</td><td className="py-3 px-4">$9.99/mo</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-white font-medium">eJOY English</td><td className="py-3 px-4">$4.99/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">Substital</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-white font-medium">Mate Translate</td><td className="py-3 px-4">$29.99</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">Linguo TV</td><td className="py-3 px-4">Free</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                </tbody>
              </table>
            </div>

            {/* 1. Funlingo */}
            <div className="bg-white/5 border border-[#C642FC]/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-[#C642FC]" />
                <h3 className="text-2xl font-bold text-white m-0">1. Funlingo</h3>
                <Badge className="bg-[#C642FC]/20 text-[#C642FC] border-[#C642FC]/30">
                  Best Pick
                </Badge>
              </div>
              <p className="text-gray-300 mb-4">
                Funlingo is the best free alternative to Language Reactor and the only extension that
                supports{" "}
                <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">
                  dual subtitles on Netflix
                </a>, YouTube, and Amazon Prime Video &mdash; all at no cost. Where Language Reactor
                locks vocabulary saving and advanced translations behind a $7.99/month paywall, Funlingo
                gives you everything for free: a multi-translation selector that lets you compare results
                from different translation engines, per-word pronunciation with audio playback and slow
                mode, AI-powered grammar explanations, and a built-in vocabulary saver with export support.
              </p>
              <p className="text-gray-300 mb-6">
                The key differentiator is breadth. Funlingo is the only tool on this list that covers all
                three major streaming platforms while remaining completely free. If you have been paying for
                Language Reactor Pro or hitting the limits of its free tier, Funlingo is the most
                straightforward upgrade.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free &mdash; no paid tier
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube & Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Multi-translation selector
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Per-word pronunciation with audio & slow mode
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI grammar explanations
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Vocabulary saver with export
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No web page translation
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Chrome only (no Firefox or Safari)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Trancy */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">2. Trancy</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">$9.90/month</span>
              </p>
              <p className="text-gray-300 mb-6">
                Trancy is the strongest option if you want deep grammar analysis and AI-powered speaking
                practice alongside your dual subtitles. It supports Netflix, YouTube, and Disney+, and
                its sentence parser breaks down grammar structures in real time. The built-in{" "}
                <a href="/blog/aitalk-review" className="text-[#C642FC] hover:underline">
                  AiTalk feature
                </a>{" "}
                lets you practice conversations with an AI tutor based on the content you are watching.
                The trade-off is price: at $9.90 per month, Trancy is more expensive than Language Reactor
                Pro. But for serious learners who want an all-in-one study environment, the extra cost
                may be worth it. Read our full{" "}
                <a href="/blog/language-reactor-vs-trancy" className="text-[#C642FC] hover:underline">
                  Language Reactor vs Trancy comparison
                </a>{" "}
                for a detailed breakdown.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI grammar analysis & sentence parsing
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI speaking practice (AiTalk)
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube & Disney+ support
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> $9.90/month &mdash; more than Language Reactor Pro
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Can be overwhelming for casual learners
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Immersive Translate */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">3. Immersive Translate</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">$9.99/month</span>
              </p>
              <p className="text-gray-300 mb-6">
                Immersive Translate is the best choice if your language learning extends beyond video
                content. It excels at bilingual web page translation, PDF document translation, and ebook
                reading &mdash; areas where Language Reactor offers nothing at all. Video subtitle support
                exists but is secondary; Netflix support is limited and inconsistent compared to dedicated
                subtitle extensions. Immersive Translate works across Chrome, Firefox, Safari, and Edge,
                giving it the widest browser compatibility on this list. If you spend more time reading
                foreign-language articles and documents than watching shows, this is the right pick.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Best-in-class web page translation
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> PDF and ebook translation
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Cross-browser support
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> $9.99/month for full features
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Video subtitle support is inconsistent
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No vocabulary saving or learning tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. eJOY English */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">4. eJOY English</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">$4.99/month</span>
              </p>
              <p className="text-gray-300 mb-6">
                eJOY English is a solid budget alternative built specifically for English learners. It
                supports dual subtitles on Netflix and YouTube, and its standout feature is a gamified
                vocabulary review system that uses spaced repetition and mini-games to help you retain
                new words. At $4.99 per month it is cheaper than both Language Reactor Pro and Trancy.
                The downside is scope: eJOY is focused on learning English from other languages, so it
                is not the right tool if you are learning Spanish, Japanese, or other non-English targets.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Gamified vocabulary review
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Budget-friendly at $4.99/mo
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix & YouTube dual subtitles
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> English learning only
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No pronunciation audio
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Substital */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">5. Substital</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">Free</span>
              </p>
              <p className="text-gray-300 mb-6">
                Substital takes a different approach: instead of generating translations automatically,
                it lets you load your own SRT subtitle files onto Netflix, YouTube, and other streaming
                sites. This makes it ideal for people who already have subtitle files in their target
                language or who want to use community-sourced subtitles from sites like OpenSubtitles.
                The extension is free and lightweight, but it has no built-in translation, vocabulary
                saving, or language learning tools. Think of it as a subtitle overlay utility rather
                than a learning platform.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Load any SRT subtitle file
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Works on multiple streaming sites
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No built-in translation
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No vocabulary or learning features
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Requires you to source your own subtitle files
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Mate Translate */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">6. Mate Translate</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">One-time $29.99</span>
              </p>
              <p className="text-gray-300 mb-6">
                Mate Translate is a system-wide translation tool rather than a video subtitle extension.
                It lets you highlight and translate any text on any web page, in any app, and even in
                images using OCR. The one-time payment of $29.99 covers macOS, iOS, Chrome, Firefox,
                Safari, Edge, and Opera &mdash; making it one of the most versatile general translation
                tools available. However, Mate has no video subtitle features, no dual subtitle display,
                and no language learning tools. It is best suited as a complement to a dedicated subtitle
                extension like Funlingo rather than a standalone Language Reactor replacement.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> One-time purchase, no subscription
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Works system-wide across apps
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Supports all major browsers and platforms
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No video subtitle features at all
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No dual subtitles or learning tools
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Not designed for language learning
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Linguo TV */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">7. Linguo TV</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">Free</span>
              </p>
              <p className="text-gray-300 mb-6">
                Linguo TV is not a browser extension but a web-based catalog that organizes Netflix
                content by language and difficulty level. It helps you discover what to watch for language
                learning purposes &mdash; filtering shows and movies by target language, CEFR level, and
                genre. It is a useful content discovery tool, but it does not add dual subtitles or any
                interactive learning features to Netflix itself. Pair it with Funlingo or another subtitle
                extension to get the full benefit: use Linguo TV to find appropriate content, then use
                Funlingo to learn from it with dual subtitles and vocabulary tools.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Free to use
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Content organized by difficulty level
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Helps discover foreign-language shows
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No dual subtitles
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No interactive learning tools
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Netflix catalog only
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Mid CTA */}
          <section className="mb-16">
            <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Looking for dual subtitles on Netflix, YouTube & Prime Video?
              </h3>
              <p className="text-gray-400 mb-6">
                Funlingo gives you free dual subtitles, vocabulary saving, per-word pronunciation,
                and AI grammar explanations across all major streaming platforms.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                  Try Funlingo Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </section>

          {/* Which Alternative Is Right for You? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Which Alternative Is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Budget-Conscious Learner</h4>
                <p className="text-gray-400 text-base">
                  Go with{" "}
                  <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">
                    Funlingo
                  </a>. It is the only tool that offers dual subtitles on all three major streaming
                  platforms with vocabulary saving, pronunciation audio, and AI features &mdash; all
                  completely free. No trial period, no usage limits, no paywall.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Grammar Nerd</h4>
                <p className="text-gray-400 text-base">
                  Pick{" "}
                  <a href="/blog/language-reactor-vs-trancy" className="text-[#C642FC] hover:underline">
                    Trancy
                  </a>. Its AI sentence parser and grammar breakdowns go deeper than any other extension.
                  The AiTalk speaking practice feature adds another dimension to your study sessions.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Reading-Focused Learner</h4>
                <p className="text-gray-400 text-base">
                  Choose Immersive Translate. If you spend more time with web articles, PDFs, and ebooks
                  than with video content, its bilingual page translation is unmatched. Pair it with
                  Funlingo for video learning.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">English Learner on a Budget</h4>
                <p className="text-gray-400 text-base">
                  Consider eJOY English. Its gamified vocabulary review system makes English learning
                  fun and sticky. At $4.99/month it costs less than Language Reactor Pro or Trancy.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  What&apos;s the best free alternative to Language Reactor?
                </h4>
                <p className="text-gray-400 text-base">
                  Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube,
                  and Amazon Prime Video, with word-level translations, pronunciation audio, AI grammar
                  explanations, and vocabulary saving &mdash; all completely free. Language Reactor&apos;s
                  free tier limits you to basic dual subtitles without vocabulary saving or advanced features.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Does Language Reactor work on Amazon Prime Video?
                </h4>
                <p className="text-gray-400 text-base">
                  No. Language Reactor only supports Netflix and YouTube. If you watch content on Amazon
                  Prime Video, Funlingo is the only free extension that supports all three major streaming
                  platforms.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Is Language Reactor still free in 2026?
                </h4>
                <p className="text-gray-400 text-base">
                  Language Reactor offers a limited free tier that includes basic dual subtitles. However,
                  features like phrase saving, human-reviewed translations, and advanced playback controls
                  require Language Reactor Pro at $7.99/month.
                </p>
              </div>
            </div>
          </section>

          {/* End CTA */}
          <section className="mb-8">
            <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-2xl p-10 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Learn Languages for Free?
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Join thousands of learners using Funlingo to watch Netflix, YouTube, and Prime
                Video with dual subtitles. Save vocabulary, translate words instantly, hear
                pronunciation, and get AI grammar help &mdash; all completely free.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-white px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                  Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </section>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
