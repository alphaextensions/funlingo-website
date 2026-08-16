"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Zap, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways, ProsCons } from "@/app/blog/_components/graphics";

export default function TrancyAlternativesContent() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[var(--bg)] to-[var(--bg)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface)]">
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--text)] to-[var(--text-dim)]">
            7 Best Trancy Alternatives (2026): Free &amp; Paid Dual-Subtitle Tools
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-dim)] mt-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              August 10, 2026
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Funlingo Team
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              11 min read
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        <article className="prose prose-lg max-w-none">

          <KeyTakeaways items={["Trancy is a powerful freemium AI bilingual-subtitle extension, but its best features (AI grammar, AiTalk speaking practice, flashcards) sit behind a Pro plan at about $9.90/month.", "Trancy has no Amazon Prime Video support, and its dense, feature-packed interface can feel overwhelming for casual learners.", "Funlingo is the best free pick: dual subtitles on Netflix, YouTube, and Prime Video with a multi-translation selector, pronunciation audio, AI grammar, and vocab export.", "Language Reactor, Immersive Translate, eJOY English, Migaku, Lingopie, and Substital each suit a specific niche &mdash; from sentence mining to curated TV catalogs.", "All prices are correct at the time of writing &mdash; always confirm the latest plans on each tool's own site before subscribing."]} />

          {/* Intro */}
          <section className="mb-16">
            <p className="text-[var(--text-dim)] leading-relaxed">
              <a href="https://www.trancy.org" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Trancy</a> has quickly become one of the most feature-rich AI bilingual-subtitle
              extensions available. It layers dual subtitles onto Netflix, YouTube, and Disney+, breaks
              down grammar with an AI sentence parser, offers AiTalk-style speaking practice, syncs
              vocabulary flashcards, and even ships companion iOS and Android apps. For serious,
              tech-savvy learners it can feel like an all-in-one study suite.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              But Trancy is not for everyone. Its most useful features are gated behind a Pro plan at
              roughly $9.90 per month (at the time of writing &mdash; confirm on their site), there is no
              Amazon Prime Video support, and the sheer density of options can feel heavy or overwhelming
              if you just want to watch a show and pick up a few words. We tested the top alternatives
              head-to-head to find the best fit for every kind of learner. If you are weighing Trancy
              against a close competitor, our{" "}
              <a href="/blog/language-reactor-vs-trancy" className="text-[#C642FC] hover:underline">
                Language Reactor vs Trancy comparison
              </a>{" "}
              is a useful companion to this guide.
            </p>
          </section>

          {/* Why Switch */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text)]">Why Look Beyond Trancy?</h2>
            <p className="text-[var(--text-dim)] leading-relaxed">
              Trancy earns a lot of goodwill. Its AI grammar and sentence-parsing tools are genuinely
              deep, the AiTalk speaking practice is a clever way to turn passive watching into active
              output, and the flashcard system plus mobile apps mean you can keep studying away from
              your desk. Across Netflix, YouTube, and Disney+, it is one of the most capable bilingual
              subtitle tools you can install.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              That said, the friction adds up. The features most people install Trancy for &mdash; unlimited
              AI grammar breakdowns, AiTalk, and advanced flashcard controls &mdash; require the Pro plan at
              around $9.90 per month, which is pricier than several rivals. There is no Amazon Prime Video
              support, cutting off a large library of foreign-language content. And the interface, while
              powerful, can be a lot to take in: casual learners often find the panels, toggles, and study
              modes more than they need. If any of these points describe your experience, one of the seven
              alternatives below will likely serve you better.
            </p>

            <ProsCons proLabel="Trancy strengths" conLabel="Where it falls short" pros={["Deep AI grammar and sentence parsing", "AiTalk-style AI speaking practice", "Vocabulary flashcards plus iOS and Android apps", "Broad support across Netflix, YouTube, and Disney+"]} cons={["Best features locked behind Pro at ~$9.90/month", "No Amazon Prime Video support", "Dense interface can overwhelm casual learners", "No completely free path to the full feature set"]} />
          </section>

          {/* The 7 Best Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">
              The 7 Best Trancy Alternatives
            </h2>

            {/* Comparison Table */}
            <div className="thin-scroll overflow-x-auto mb-12">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Tool</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Price</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Netflix</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">YouTube</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Prime Video</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Vocab Saving</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Pronunciation</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">AI Features</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-dim)]">
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium">Funlingo</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.trancy.org" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Trancy</a></td><td className="py-3 px-4">~$9.90/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Pro only</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.languagereactor.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Language Reactor</a></td><td className="py-3 px-4">$7.99/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Pro only</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Limited</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://immersivetranslate.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Immersive Translate</a></td><td className="py-3 px-4">$9.99/mo</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://ejoy-english.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">eJOY English</a></td><td className="py-3 px-4">$4.99/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.migaku.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Migaku</a></td><td className="py-3 px-4">~$10/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://lingopie.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Lingopie</a></td><td className="py-3 px-4">~$12/mo</td><td className="py-3 px-4">Extension</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Limited</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium">Substital</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td></tr>
                </tbody>
              </table>
              <p className="text-[var(--text-dim2)] text-sm mt-3">
                Funlingo is the only tool on this list with free Amazon Prime Video support. Pricing is
                accurate at the time of writing &mdash; always confirm current plans on each provider&apos;s site.
              </p>
            </div>

            {/* 1. Funlingo */}
            <div className="bg-[var(--surface)] border border-[#C642FC]/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-[#C642FC]" />
                <h3 className="text-2xl font-bold text-[var(--text)] m-0">1. Funlingo</h3>
                <Badge className="bg-[#C642FC]/20 text-[#C642FC] border-[#C642FC]/30">
                  Best Pick
                </Badge>
              </div>
              <p className="text-[var(--text-dim)] mb-4">
                Funlingo is the best free alternative to Trancy and the only extension here that supports{" "}
                <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">
                  dual subtitles
                </a>{" "}
                on Netflix, YouTube, and Amazon Prime Video &mdash; all at no cost. Where Trancy locks AI
                grammar, AiTalk, and advanced flashcards behind a roughly $9.90/month Pro plan, Funlingo
                gives you the core experience for free: a multi-translation selector (choose 1, 2, 3, or
                All translations per word), per-word pronunciation with audio playback and slow mode,
                AI-powered grammar explanations, and a built-in vocabulary saver with export support.
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                The key differentiator is breadth without a paywall. Funlingo covers all three major
                streaming platforms, supports 100+ languages, and never gates its core features behind a
                subscription or usage quota. If Trancy&apos;s dense interface or Pro pricing has worn you
                down, Funlingo is the most straightforward switch. It is Chrome-only and does not translate
                general web pages, so it is a focused video-learning tool rather than an everything suite.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free &mdash; no paid tier gating core features
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube &amp; Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Multi-translation selector (1/2/3/All)
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Per-word pronunciation with audio &amp; slow mode
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI grammar explanations
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Vocabulary saver with export &middot; 100+ languages
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No web page translation
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Chrome only (no Firefox or Safari)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Language Reactor */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">2. Language Reactor</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Free tier + $7.99/month Pro</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Language Reactor (formerly Learning Languages with Netflix) is the best-known Trancy
                rival and a strong pick if you want a large community and a curated catalog sorted by
                difficulty. It layers dual subtitles onto Netflix and YouTube, and its free tier is
                genuinely usable for basic side-by-side subtitles. The catch is that vocabulary saving,
                human-reviewed translations, and advanced playback live in Pro at $7.99/month (at the
                time of writing &mdash; confirm on their site). It has no Amazon Prime Video support and no
                per-word pronunciation audio. For a deeper look at the wider field, see our{" "}
                <a href="/blog/language-reactor-alternatives" className="text-[#C642FC] hover:underline">
                  Language Reactor alternatives
                </a>{" "}
                guide.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Usable free tier for basic dual subtitles
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Large, active community
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Catalog sorted by difficulty level
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Pro required at $7.99/mo for vocab saving
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No per-word pronunciation audio
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Immersive Translate */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">3. Immersive Translate</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">$9.99/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Immersive Translate is the best choice if your learning extends well beyond video. It
                excels at bilingual web page translation, PDF documents, and ebooks &mdash; areas where
                Trancy offers little. It does have a video subtitle mode, but Netflix support is limited
                and inconsistent compared with dedicated subtitle extensions. Its cross-browser support
                (Chrome, Firefox, Safari, Edge) is the widest here. If you read foreign-language articles
                and documents more than you watch shows, it is a great pick &mdash; and it pairs well with a
                focused video tool. Compare it more closely in our{" "}
                <a href="/blog/immersive-translate-alternatives" className="text-[#C642FC] hover:underline">
                  Immersive Translate alternatives
                </a>{" "}
                roundup.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Best-in-class web page translation
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> PDF and ebook translation
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Cross-browser support
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> $9.99/month for full features
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Video subtitle support is inconsistent
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No vocabulary saving or learning tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. eJOY English */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">4. eJOY English</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">$4.99/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                eJOY English is a solid budget alternative built specifically for English learners. It
                supports dual subtitles on Netflix and YouTube, and its standout feature is a gamified
                vocabulary review system that uses spaced repetition and mini-games to help words stick.
                At $4.99 per month (at the time of writing &mdash; confirm on their site) it is cheaper than
                Trancy Pro. The catch is scope: eJOY is focused on learning English from other languages,
                so it is not the right tool if your target is Spanish, Japanese, or another non-English
                language.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Gamified vocabulary review
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Budget-friendly at $4.99/mo
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix &amp; YouTube dual subtitles
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> English learning only
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No pronunciation audio
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Migaku */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">5. Migaku</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">About $10/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Migaku is built for power users who take immersion seriously. Its signature is sentence
                mining: while you watch Netflix or YouTube, you can turn subtitle lines into rich
                flashcards &mdash; complete with audio, images, and definitions &mdash; that sync into Anki-style
                spaced repetition. For dedicated learners who want to build a personal deck from real
                content, few tools go deeper. The trade-off is a steep learning curve and setup process;
                casual watchers may find it overkill. At around $10 per month (at the time of writing
                &mdash; confirm on their site) it sits in the same bracket as Trancy Pro, so it competes on
                depth rather than price.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Powerful sentence mining from video
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Anki-style spaced repetition (SRS)
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Excellent for dedicated immersion learners
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Steep learning curve and setup
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> ~$10/month &mdash; no free full tier
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Lingopie */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">6. Lingopie</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Subscription (~$12/month)</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Lingopie takes a different route: instead of overlaying subtitles on services you already
                pay for, it is a subscription streaming platform with its own curated catalog of TV shows
                and movies built for learners. Every title has interactive dual subtitles, clickable words,
                and review games, and the content is hand-picked by difficulty and language. In April 2026
                Lingopie also launched a Netflix-only Chrome extension covering four languages, extending
                its interactive subtitles to Netflix. At roughly $12 per month (at the time of writing
                &mdash; confirm on their site) it is one of the pricier options, and the core value is its own
                library rather than broad platform support.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Curated TV/movie catalog for learners
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Interactive subtitles and review games
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> New Netflix-only extension (4 languages)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Subscription (~$12/mo) on top of your streaming
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Extension is Netflix-only, limited languages
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No YouTube or Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Substital */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">7. Substital</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Free</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Substital takes a minimalist approach: instead of generating translations automatically,
                it lets you load your own SRT subtitle files onto Netflix, YouTube, and other streaming
                sites. That makes it ideal if you already have subtitle files in your target language or
                want to use community-sourced subtitles from sites like{" "}
                <a href="https://www.opensubtitles.org" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">OpenSubtitles</a>.
                The extension is free and lightweight, but it has no built-in translation, no vocabulary
                saving, and no learning tools. Think of it as a subtitle overlay utility rather than a
                full learning platform &mdash; a handy complement to a tool like Funlingo, not a replacement.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Load any SRT subtitle file
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Works on multiple streaming sites
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No built-in translation
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No vocabulary or learning features
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Requires you to source your own subtitle files
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Mid CTA */}
          <section className="mb-16">
            <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-3">
                Looking for dual subtitles on Netflix, YouTube &amp; Prime Video?
              </h3>
              <p className="text-[var(--text-dim)] mb-6">
                Funlingo gives you free dual subtitles, vocabulary saving, per-word pronunciation,
                and AI grammar explanations across all major streaming platforms &mdash; no Pro plan required.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-[var(--text)] px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                  Try Funlingo Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </section>

          {/* Which Alternative Is Right for You? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">Which Alternative Is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Budget-Conscious Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Go with{" "}
                  <a href="/chrome-extension" className="text-[#C642FC] hover:underline">
                    Funlingo
                  </a>. It is the only tool that offers dual subtitles on all three major streaming
                  platforms with vocabulary saving, pronunciation audio, and AI features &mdash; all
                  completely free, with no trial period, quota, or paywall.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Immersion Power User</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Pick Migaku. If you want to build your own Anki-style deck through sentence mining and
                  do not mind a steeper setup, its SRS workflow goes deeper than Trancy&apos;s flashcards.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Reading-Focused Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Choose Immersive Translate. If you spend more time with web articles, PDFs, and ebooks
                  than with video, its bilingual page translation is unmatched. Pair it with Funlingo for
                  video learning.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Curated-Content Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Consider Lingopie. If you would rather follow a hand-picked catalog sorted by level than
                  hunt for shows yourself, its learner-focused library and new Netflix extension are worth
                  the subscription.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  What&apos;s the best free alternative to Trancy?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube,
                  and Amazon Prime Video, with a multi-translation selector, pronunciation audio, AI
                  grammar explanations, and vocabulary saving with export &mdash; all completely free, with
                  no quota or paid tier gating the core features. Trancy&apos;s best features require a Pro
                  plan at about $9.90/month.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Does Trancy work on Amazon Prime Video?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  No. Trancy supports Netflix, YouTube, and Disney+, but not Amazon Prime Video. If you
                  watch content on Prime Video, Funlingo is the only tool on this list that supports all
                  three major streaming platforms &mdash; Netflix, YouTube, and Prime Video &mdash; for free.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  How much does Trancy Pro cost in 2026?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  At the time of writing, Trancy Pro costs about $9.90 per month and unlocks features
                  such as unlimited AI grammar breakdowns, AiTalk speaking practice, and advanced
                  flashcards. Pricing can change, so always confirm the current plans on Trancy&apos;s own
                  site before subscribing.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Is there a Trancy alternative with AI speaking practice?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Trancy&apos;s AiTalk is one of its headline features. If AI speaking practice matters most
                  to you, read our{" "}
                  <a href="/blog/aitalk-review" className="text-[#C642FC] hover:underline">
                    AiTalk review
                  </a>. For everyday video learning &mdash; dual subtitles, word lookup, pronunciation, and
                  AI grammar help &mdash; Funlingo covers the core for free across more platforms.
                </p>
              </div>
            </div>
          </section>

          {/* End CTA */}
          <section className="mb-8">
            <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-2xl p-10 text-center">
              <h3 className="text-3xl font-bold text-[var(--text)] mb-4">
                Ready to Learn Languages for Free?
              </h3>
              <p className="text-[var(--text-dim)] mb-8 text-lg">
                Join thousands of learners using Funlingo to watch Netflix, YouTube, and Prime
                Video with dual subtitles. Save vocabulary, translate words instantly, hear
                pronunciation, and get AI grammar help &mdash; all completely free.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-[var(--text)] px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
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
