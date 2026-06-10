"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Zap, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways, Callout, ProsCons, StatGrid } from "@/app/blog/_components/graphics";

export default function ImmersiveTranslateAlternativesContent() {
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
            Best Immersive Translate Alternatives (2026): 6 Free & Paid Options Compared
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mt-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              March 20, 2026
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
          <img
            src="/blog-images/immersive-translate-alternatives-hero.jpg"
            alt="Comparison of translation tools with the best alternative highlighted"
            width={1600}
            height={893}
            fetchPriority="high"
          />
          <KeyTakeaways items={["Immersive Translate excels at bilingual web page, PDF, and ebook translation but has very limited Netflix support and no vocabulary tools.", "Its Pro plan runs about $9.99/month or $69.99/year, with the free tier capping daily translations and premium engines.", "Funlingo is the best free alternative for video-based learning, with dual subtitles on Netflix, YouTube, and Prime Video plus a vocab builder.", "For web page reading, free options like Google Translate Extension and Microsoft Translator cover the basics.", "Choose by use case: video learning favors Funlingo, while reading-heavy workflows favor Immersive Translate or DeepL."]} />

          <StatGrid stats={[{ value: "$0", label: "Funlingo cost — free forever for dual subtitles" }, { value: "$9.99", label: "Immersive Translate Pro per month" }, { value: "7", label: "Alternatives compared side by side below" }, { value: "3", label: "Streaming platforms Funlingo supports (Netflix, YouTube, Prime)" }]} />

          {/* Best Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">
              Best Alternatives to Immersive Translate
            </h2>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-bold">Tool</th>
                    <th className="py-3 px-4 text-white font-bold">Price</th>
                    <th className="py-3 px-4 text-white font-bold">Web Translation</th>
                    <th className="py-3 px-4 text-white font-bold">Netflix Subtitles</th>
                    <th className="py-3 px-4 text-white font-bold">YouTube Subtitles</th>
                    <th className="py-3 px-4 text-white font-bold">Prime Video</th>
                    <th className="py-3 px-4 text-white font-bold">Vocab Saving</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">Funlingo</td><td className="py-3 px-4">Free</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-white font-medium">Google Translate Ext.</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">DeepL Extension</td><td className="py-3 px-4">Free/Pro</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-white font-medium">Trancy</td><td className="py-3 px-4">$8/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Pro only</td></tr>
                  <tr className="border-b border-white/5 bg-white/5"><td className="py-3 px-4 text-white font-medium">Language Reactor</td><td className="py-3 px-4">$6/mo</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Pro only</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-white font-medium">Microsoft Translator</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                </tbody>
              </table>
            </div>

            {/* Funlingo */}
            <div className="bg-white/5 border border-[#C642FC]/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-[#C642FC]" />
                <h3 className="text-2xl font-bold text-white m-0">Funlingo</h3>
                <Badge className="bg-[#C642FC]/20 text-[#C642FC] border-[#C642FC]/30">
                  Best Pick
                </Badge>
              </div>
              <p className="text-gray-300 mb-4">
                Funlingo is the best free alternative to Immersive Translate for video-based
                language learning. It provides dual subtitles on Netflix, YouTube, and Amazon
                Prime Video, along with a built-in vocabulary builder that lets you save words
                and phrases for later review. Unlike Immersive Translate, Funlingo is completely
                free and specifically optimized for learning languages through video content.
              </p>
              <p className="text-gray-300 mb-6">
                With word-by-word translations, instant click-to-translate on any subtitle word,
                and support for dozens of languages, Funlingo turns your entertainment time into
                an effective language learning session.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free to use
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube & Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Built-in vocabulary builder
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Word-by-word translations
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Save words for later review
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No PDF translation support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Google Translate Extension */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Google Translate Extension</h3>
              <p className="text-gray-300 mb-6">
                Google Translate&apos;s official Chrome extension is a straightforward tool for
                translating web pages and selected text. It supports over 100 languages and is
                completely free. While it lacks the bilingual side-by-side display that Immersive
                Translate offers, it is reliable for quick translations and basic reading comprehension.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> 100+ languages supported
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Reliable and well-maintained
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No bilingual side-by-side view
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No video subtitle support
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Basic translation quality for some languages
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DeepL Extension */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">DeepL Extension</h3>
              <p className="text-gray-300 mb-6">
                DeepL is widely regarded as having the highest quality machine translations,
                especially for European languages. Their browser extension brings that quality
                directly to web pages. The free tier allows a limited number of translations
                per month, while the Pro plan unlocks unlimited usage.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Best-in-class translation quality
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Clean and intuitive interface
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Full page translation
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Limited free tier
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Fewer supported languages than Google
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No video or subtitle features
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trancy */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Trancy</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">~$8/month</span>
              </p>
              <p className="text-gray-300 mb-6">
                Trancy is an AI-powered language learning extension that supports dual subtitles
                on Netflix and YouTube. It offers sentence-by-sentence analysis, grammar breakdowns,
                and vocabulary features. While powerful, it comes at a monthly cost and can feel
                overwhelming for casual learners.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI-powered sentence analysis
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix & YouTube dual subtitles
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Grammar breakdowns
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> $8/month subscription required
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Can be overwhelming for beginners
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Language Reactor */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Language Reactor</h3>
              <p className="text-gray-300 mb-2">
                <span className="text-gray-400 text-base">~$6/month</span>
              </p>
              <p className="text-gray-300 mb-6">
                Language Reactor (formerly Language Learning with Netflix) is one of the most
                well-known tools for learning languages through video. It offers dual subtitles
                on Netflix and YouTube, with hover-over translations and a phrase saving feature.
                The free version is limited, and full functionality requires a Pro subscription.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Popular with large community
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix & YouTube support
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Hover-over word translations
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> $6/month for full features
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Free tier is very limited
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Microsoft Translator */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Microsoft Translator</h3>
              <p className="text-gray-300 mb-6">
                Microsoft Translator integrates seamlessly with Microsoft Edge and offers a solid
                free web page translation experience. It supports over 70 languages and provides
                real-time translation of web content. While it lacks video subtitle features, it
                is a dependable choice for general web browsing in foreign languages.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Deep Edge browser integration
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> 70+ languages supported
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Best experience limited to Edge
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No video subtitle features
                    </li>
                    <li className="flex items-center gap-2 text-gray-300 text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No bilingual side-by-side mode
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Full comparison table */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Immersive Translate Alternatives 2026: Full Comparison Table
            </h2>
            <img
              src="/blog-images/immersive-translate-alternatives-inline.jpg"
              alt="A web page translated bilingually side by side, original text next to its translation"
              width={1600}
              height={893}
              loading="lazy"
            />
            <p className="text-gray-300 leading-relaxed mb-6">
              The table below compares the leading Immersive Translate alternatives in 2026 across
              the factors that matter most: price, supported platforms, whether the tool shows dual
              subtitles on streaming video, and what each one is genuinely best at. Prices are the
              publicly listed rates at the time of writing and may change.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Price</th>
                  <th>Platforms</th>
                  <th>Dual subtitles on video</th>
                  <th>Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Funlingo</td>
                  <td>Free</td>
                  <td>Chrome &amp; Edge extension</td>
                  <td>Yes &mdash; Netflix, YouTube &amp; Prime Video</td>
                  <td>Free video-based language learning</td>
                </tr>
                <tr>
                  <td>Immersive Translate</td>
                  <td>Freemium (~$9.99/mo Pro)</td>
                  <td>Browser extension, iOS, Android</td>
                  <td>Partial &mdash; YouTube only, no Netflix</td>
                  <td>Bilingual web, PDF &amp; ebook reading</td>
                </tr>
                <tr>
                  <td>DeepL</td>
                  <td>Free tier; Pro from ~$8.74/mo</td>
                  <td>Web, desktop apps, browser extension</td>
                  <td>No</td>
                  <td>Highest-quality document &amp; text translation</td>
                </tr>
                <tr>
                  <td>Google Translate</td>
                  <td>Free</td>
                  <td>Web, mobile apps, browser extension</td>
                  <td>No</td>
                  <td>Quick free web page translation, 100+ languages</td>
                </tr>
                <tr>
                  <td>Trancy</td>
                  <td>Freemium (~$8/mo Pro)</td>
                  <td>Chrome &amp; Edge extension</td>
                  <td>Yes &mdash; Netflix &amp; YouTube</td>
                  <td>AI sentence analysis on video &amp; web</td>
                </tr>
                <tr>
                  <td>Language Reactor</td>
                  <td>Freemium (~$6/mo Pro)</td>
                  <td>Chrome &amp; Edge extension</td>
                  <td>Yes &mdash; Netflix &amp; YouTube</td>
                  <td>Netflix/YouTube learning with hover translations</td>
                </tr>
                <tr>
                  <td>Microsoft Translator</td>
                  <td>Free</td>
                  <td>Edge built-in, web, mobile apps</td>
                  <td>No</td>
                  <td>Free web translation inside Microsoft Edge</td>
                </tr>
              </tbody>
            </table>
            <Callout variant="tip" title="Mix tools instead of forcing one">
              You do not have to pick a single tool. A practical free stack in 2026 is Funlingo for
              dual subtitles while you watch Netflix and YouTube, plus Google Translate or DeepL&apos;s
              free tier for reading articles and PDFs. That covers both video and text without paying
              for Immersive Translate Pro.
            </Callout>
          </section>

          {/* Which alternative should you choose? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">
              Which Alternative Should You Choose?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The right Immersive Translate alternative depends entirely on how you actually learn or
              read. Here are clear picks by use case.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-[#C642FC]/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 m-0">Best free option for video &rarr; Funlingo</h3>
                <p className="text-gray-400 text-base m-0">
                  If you learn through Netflix, YouTube, or Prime Video, Funlingo gives you free dual
                  subtitles, click-to-translate words, and a vocabulary builder &mdash; the things
                  Immersive Translate charges for or simply does not offer for streaming video.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 m-0">Best for documents &rarr; DeepL</h3>
                <p className="text-gray-400 text-base m-0">
                  For translating PDFs, Word files, and long-form text where accuracy matters most,
                  DeepL produces the most natural output, especially for European languages.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 m-0">Best all-round web translation &rarr; Immersive Translate</h3>
                <p className="text-gray-400 text-base m-0">
                  If your main need is reading foreign websites, ebooks, and PDFs in a bilingual
                  side-by-side layout across many engines, Immersive Translate is still the most
                  complete tool &mdash; it is the alternatives that beat it on video, not on reading.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 m-0">Best for Netflix/YouTube learning &rarr; Funlingo or Language Reactor</h3>
                <p className="text-gray-400 text-base m-0">
                  Both turn streaming into structured practice. Choose Funlingo if you want a free,
                  no-account experience that also covers Prime Video; choose Language Reactor if you
                  want its large pre-built deck ecosystem and do not mind a Pro subscription.
                </p>
              </div>
            </div>
          </section>

          {/* Trancy vs Immersive Translate */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Trancy vs Immersive Translate
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Trancy and Immersive Translate are often compared because both translate web pages and
              YouTube. The real difference is focus: Immersive Translate is a reading-and-translation
              tool, while Trancy is built around active language learning on video, with AI sentence
              breakdowns and Netflix dual subtitles that Immersive Translate lacks.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3">Where Trancy wins</h3>
            <ProsCons
              proLabel="Trancy advantages"
              conLabel="Immersive Translate advantages"
              pros={["Dual subtitles on Netflix, not just YouTube", "AI-powered sentence and grammar analysis on subtitles", "Built for learners who study from video clips", "Vocabulary and saved-phrase review features"]}
              cons={["Stronger full web page bilingual reading layout", "Native PDF and EPUB / ebook translation", "Wider choice of translation engines (DeepL, OpenAI, etc.)", "Mobile apps for iOS and Android"]}
            />
            <p className="text-gray-300 leading-relaxed">
              In short: pick Trancy if your learning happens mostly inside Netflix and YouTube and you
              want AI explanations; pick Immersive Translate if you mostly read articles, PDFs, and
              books. If you want the same video benefits as Trancy without a subscription, Funlingo is
              the free option to try first.
            </p>
          </section>

          {/* Open source */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Is There an Open-Source Immersive Translate Alternative?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              There is no single open-source project that fully replicates Immersive Translate&apos;s
              polished bilingual reading across web pages, PDFs, ebooks, and video. But if you
              specifically want open-source or self-hostable tooling, a few honest options exist:
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 m-0">
                  <span className="font-semibold text-white">LibreTranslate:</span>{" "}
                  A free and open-source machine-translation API you can self-host. It powers the
                  translations but does not provide the on-page bilingual reading UI by itself &mdash;
                  you pair it with a browser extension that supports custom engines.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 m-0">
                  <span className="font-semibold text-white">Argos Translate:</span>{" "}
                  An offline, open-source translation library (the engine behind LibreTranslate).
                  Great for privacy and offline use, but it is a library, not a finished reading
                  extension.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 m-0">
                  <span className="font-semibold text-white">Open-source translate extensions:</span>{" "}
                  Community extensions such as TWP (Translate Web Pages) are open-source and can route
                  through your own or free translation backends for full-page translation.
                </p>
              </li>
            </ul>
            <Callout variant="note" title="Open source vs polish">
              Open-source options give you privacy and control, but they generally do not match the
              one-click reading experience or video dual-subtitle support of Immersive Translate,
              Trancy, or Funlingo. If your priority is video learning rather than self-hosting,
              Funlingo&apos;s free closed-source extension will be far less work to set up.
            </Callout>
          </section>

          {/* What Is Immersive Translate? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">What Is Immersive Translate?</h2>
            <p className="text-gray-300 leading-relaxed">
              Immersive Translate is a popular browser extension designed to help users read
              foreign-language web content by providing bilingual translations directly on the page.
              Rather than replacing the original text entirely, it displays translations side by side
              with the source language, making it a valuable tool for language learners and anyone
              who frequently browses multilingual content.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The extension supports a wide range of websites and can translate entire web pages,
              PDF documents, and even YouTube subtitles into your target language. It leverages
              multiple translation engines including Google Translate, DeepL, and OpenAI to deliver
              flexible translation quality depending on your needs.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Since its launch, Immersive Translate has gained a strong following among language
              learners who want to consume native content without constantly switching between
              tabs or apps. But is it really the best option available? Let&apos;s take a closer look
              at its features, pricing, limitations, and the top alternatives you should consider.
            </p>
          </section>

          {/* Immersive Translate Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Immersive Translate Features</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Web Page Translation</span>
                    <p className="text-gray-400 text-base mt-1">
                      Translates entire web pages in a bilingual format, preserving the original layout
                      while showing translations alongside the source text.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">YouTube Subtitle Translation</span>
                    <p className="text-gray-400 text-base mt-1">
                      Displays dual subtitles on YouTube videos, showing both the original language
                      and your translation simultaneously.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">PDF Document Translation</span>
                    <p className="text-gray-400 text-base mt-1">
                      Translates PDF files directly in the browser, useful for academic papers,
                      reports, and documentation in foreign languages.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Ebook & EPUB Support</span>
                    <p className="text-gray-400 text-base mt-1">
                      Read ebooks in foreign languages with bilingual support, making it easier to
                      enjoy literature while learning.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Multiple Translation Engines</span>
                    <p className="text-gray-400 text-base mt-1">
                      Choose from Google Translate, DeepL, Microsoft Translator, OpenAI, and more
                      to find the best translation quality for your language pair.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Immersive Translate Pricing</h2>
            <p className="text-gray-300 leading-relaxed">
              Immersive Translate offers a free tier that covers basic web page translation and
              limited subtitle translation. However, many of its most useful features are locked
              behind the Pro plan, which costs approximately $9.99 per month or $69.99 per year.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The free version restricts the number of translations per day and limits access
              to premium translation engines like DeepL and OpenAI. If you rely on the tool
              heavily for daily language learning or work, you will likely need to upgrade to
              Pro to avoid hitting translation caps.
            </p>
          </section>

          {/* Limitations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Limitations of Immersive Translate</h2>
            <Callout variant="warning" title="If you rely on Netflix">Immersive Translate has very limited or no Netflix dual-subtitle support. For Netflix learning, Funlingo or Language Reactor are far better fits.</Callout>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Limited Netflix Support:</span>{" "}
                  Immersive Translate has very limited or no support for Netflix dual subtitles,
                  making it unsuitable for learners who rely on Netflix as their primary content source.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">No Vocabulary Building:</span>{" "}
                  The extension focuses purely on translation and does not offer built-in vocabulary
                  saving, flashcard creation, or spaced repetition features to reinforce learning.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Translation Quality Varies:</span>{" "}
                  Depending on the engine selected and the language pair, translation quality can
                  be inconsistent. Some less common language pairs produce awkward or inaccurate results.
                </p>
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
                Funlingo gives you free dual subtitles, vocabulary saving, and word-by-word
                translations across all major streaming platforms.
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

          {/* How to Choose */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">How to Choose the Right Tool</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">For Video-Based Learning</h4>
                <p className="text-gray-400 text-base">
                  If you learn primarily through Netflix, YouTube, or Prime Video, choose{" "}
                  <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">
                    Funlingo
                  </a>{" "}
                  for the best free dual subtitle experience with vocabulary building.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">For Web Page Reading</h4>
                <p className="text-gray-400 text-base">
                  If your focus is reading foreign-language websites and articles, Immersive
                  Translate or{" "}
                  <a href="/blog/website-translation-language-learning" className="text-[#C642FC] hover:underline">
                    DeepL
                  </a>{" "}
                  provide the best bilingual reading experience.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">On a Budget</h4>
                <p className="text-gray-400 text-base">
                  Funlingo, Google Translate Extension, and Microsoft Translator are all completely
                  free. Funlingo is the clear winner if video content is part of your routine.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">For All-in-One Learning</h4>
                <p className="text-gray-400 text-base">
                  Compare{" "}
                  <a href="/blog/language-reactor-vs-trancy" className="text-[#C642FC] hover:underline">
                    Language Reactor vs Trancy
                  </a>{" "}
                  if you want AI-powered analysis alongside dual subtitles, but expect a monthly cost.
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
                  Is Immersive Translate free?
                </h4>
                <p className="text-gray-400 text-base">
                  Immersive Translate offers a free tier with basic web page translation, but many
                  features are limited. The Pro plan costs around $9.99/month and unlocks premium
                  translation engines, higher daily limits, and advanced features like enhanced
                  PDF translation.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Does Immersive Translate work on Netflix?
                </h4>
                <p className="text-gray-400 text-base">
                  Immersive Translate has very limited support for Netflix. If you need reliable
                  dual subtitles on Netflix, Funlingo or Language Reactor are much better options.
                  Funlingo is free and also supports YouTube and Amazon Prime Video.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  What is the best free alternative to Immersive Translate?
                </h4>
                <p className="text-gray-400 text-base">
                  For video-based language learning, Funlingo is the best free alternative. It
                  provides dual subtitles on Netflix, YouTube, and Prime Video, plus a vocabulary
                  builder and word-saving features at no cost. For web page translation, Google
                  Translate Extension is a solid free choice.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Is there an open-source Immersive Translate alternative?
                </h4>
                <p className="text-gray-400 text-base">
                  There is no exact open-source clone, but LibreTranslate and Argos Translate are
                  free, open-source translation engines you can self-host, and open-source extensions
                  like TWP (Translate Web Pages) can use them for full-page translation. None of them
                  match Immersive Translate&apos;s polished bilingual reading or offer video dual
                  subtitles &mdash; for free video learning, Funlingo is the easier route.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Trancy vs Immersive Translate &mdash; which is better?
                </h4>
                <p className="text-gray-400 text-base">
                  Choose Trancy for learning from video: it adds Netflix dual subtitles and AI
                  sentence analysis that Immersive Translate lacks. Choose Immersive Translate for
                  reading websites, PDFs, and ebooks in a bilingual layout. If you want Trancy&apos;s
                  video benefits without a subscription, Funlingo is a free alternative to try first.
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
                Video with dual subtitles. Save vocabulary, translate words instantly, and make
                real progress &mdash; all completely free.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-white px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                  Add Funlingo to Chrome &mdash; It&apos;s Free <ArrowRight className="ml-2 w-5 h-5" />
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
