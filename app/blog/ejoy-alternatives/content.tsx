"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways, ProsCons } from "@/app/blog/_components/graphics";

export default function EjoyAlternativesContent() {
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
            eJOY Alternatives: 6 Best Free &amp; Paid Options (2026)
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-dim)] mt-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              August 15, 2026
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
        <article className="prose prose-lg max-w-none">

          <KeyTakeaways items={["eJOY English is a fun, budget-friendly freemium extension, but it is built specifically for learning English — not ideal if your target is Spanish, Japanese, Korean, or another language.", "eJOY has no Amazon Prime Video support, and its game-heavy vocabulary flow is not for everyone.", "Funlingo is the best free pick: dual subtitles on Netflix, YouTube, and Prime Video with 100+ target languages, a multi-translation selector, pronunciation audio, AI grammar, and vocab export.", "Language Reactor, Trancy, Immersive Translate, Migaku, and Lingopie each suit a specific niche — from AI speaking practice to sentence mining to curated TV catalogs.", "All prices are correct at the time of writing — always confirm the latest plans on each tool&apos;s own site before subscribing."]} />

          {/* Intro */}
          <section className="mb-16">
            <p className="text-[var(--text-dim)] leading-relaxed">
              <a href="https://ejoy-english.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">eJOY English</a> is one of the most enjoyable ways to pick up
              vocabulary while you watch. The freemium browser extension layers dual subtitles onto Netflix
              and YouTube, lets you click any word for an instant look-up, and then funnels those words into
              a gamified review system with spaced repetition and mini-games. For learners who want studying
              to feel like play, it is genuinely motivating — and at around $4.99 per month for premium (at
              the time of writing — confirm on their site), it is easy on the wallet.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              But eJOY is not for everyone. The biggest catch is scope: it is built specifically for learning
              English, so it is not the right tool if your target language is Spanish, Japanese, Korean, or
              anything other than English. There is no Amazon Prime Video support, and the game-heavy flow —
              while fun for some — can feel like busywork if you just want to watch a show and pick up words
              in context. We tested the top alternatives head-to-head to find the best fit for every kind of
              learner. If you want the wider picture first, our{" "}
              <a href="/blog/best-free-language-learning-tools-2026" className="text-[#C642FC] hover:underline">
                best free language learning tools
              </a>{" "}
              roundup is a useful companion to this guide.
            </p>
          </section>

          {/* Why Switch */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text)]">Why Look Beyond eJOY?</h2>
            <p className="text-[var(--text-dim)] leading-relaxed">
              eJOY earns a lot of goodwill. Its gamified vocabulary review is one of the most engaging on the
              market, turning passive watching into an active habit through spaced repetition and mini-games.
              Click-to-look-up is fast and frictionless, the dual subtitles on Netflix and YouTube are clean,
              and the premium tier is cheaper than most rivals. For an English learner who thrives on
              gamification, it is a strong pick.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              That said, the limits add up. eJOY is designed for people learning English, so if you are
              studying Spanish, Japanese, Korean, or another target language, it simply is not built for you.
              There is no Amazon Prime Video support, cutting off a large library of foreign-language content.
              And the game-first approach is a matter of taste: some learners love it, while others find the
              constant points, streaks, and mini-games more distracting than helpful. If any of these points
              describe your experience, one of the six alternatives below will likely serve you better.
            </p>

            <ProsCons proLabel="eJOY strengths" conLabel="Where it falls short" pros={["Fun, gamified vocabulary review with spaced repetition", "Fast click-to-look-up for instant word definitions", "Budget-friendly premium at around $4.99/month", "Clean dual subtitles on Netflix and YouTube"]} cons={["Built for learning English only — not other target languages", "No Amazon Prime Video support", "Game-heavy flow is not to everyone&apos;s taste", "No completely free path to the full feature set"]} />
          </section>

          {/* The 6 Best Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">
              The 6 Best eJOY Alternatives
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
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Best for</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-dim)]">
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium">Funlingo</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">Any language, all 3 platforms, free</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://ejoy-english.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">eJOY English</a></td><td className="py-3 px-4">~$4.99/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Gamified English vocab</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.languagereactor.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Language Reactor</a></td><td className="py-3 px-4">Free + $7.99/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Curated catalog by level</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.trancy.org" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Trancy</a></td><td className="py-3 px-4">~$9.90/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">AI grammar + AiTalk speaking</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://immersivetranslate.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Immersive Translate</a></td><td className="py-3 px-4">~$9.99/mo</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Web pages, PDFs, ebooks</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.migaku.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Migaku</a></td><td className="py-3 px-4">~$10/mo</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Sentence mining + Anki SRS</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://lingopie.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Lingopie</a></td><td className="py-3 px-4">~$12/mo</td><td className="py-3 px-4">Extension</td><td className="py-3 px-4">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Curated TV catalog</td></tr>
                </tbody>
              </table>
              <p className="text-[var(--text-dim2)] text-sm mt-3">
                Funlingo is the only tool on this list with free Amazon Prime Video support and 100+ target
                languages. Pricing is accurate at the time of writing &mdash; always confirm current plans on
                each provider&apos;s site.
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
                Funlingo is the best free alternative to eJOY and the only extension here that supports{" "}
                <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">
                  dual subtitles
                </a>{" "}
                on Netflix, YouTube, and Amazon Prime Video &mdash; all at no cost. The bigger difference is
                reach: where eJOY is built specifically for learning English, Funlingo supports 100+ target
                languages, so it works whether you are studying Spanish, Japanese, Korean, French, or almost
                anything else. You get a multi-translation selector (choose 1, 2, 3, or All translations per
                word), per-word pronunciation with audio playback and slow mode, AI-powered grammar
                explanations, and a built-in vocabulary saver with export support.
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                The key differentiator is breadth without a paywall. Funlingo covers all three major streaming
                platforms and never gates its core features behind a subscription or usage quota. If eJOY&apos;s
                English-only focus or its game-heavy flow has worn you down, Funlingo is the most
                straightforward switch. It is Chrome-only and is a focused video-learning tool rather than a
                gamified study suite &mdash; if you specifically want points and mini-games, eJOY still does that
                well.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free &mdash; no paid tier gating core features
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> 100+ target languages, not just English
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
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI grammar &middot; vocab saver with export
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No gamified mini-games or points system
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
                Language Reactor (formerly Learning Languages with Netflix) is the best-known name in this
                space and a strong pick if you want a large community and a curated catalog sorted by
                difficulty. Unlike eJOY, it supports many target languages, layering dual subtitles onto
                Netflix and YouTube, and its free tier is genuinely usable for basic side-by-side subtitles.
                The catch is that vocabulary saving, human-reviewed translations, and advanced playback live
                in Pro at $7.99/month (at the time of writing &mdash; confirm on their site). It has no Amazon
                Prime Video support and no per-word pronunciation audio. For a deeper look at the wider field,
                see our{" "}
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
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Supports many target languages
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

            {/* 3. Trancy */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">3. Trancy</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">About $9.90/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Trancy is the pick for learners who want AI depth. It layers dual subtitles onto Netflix,
                YouTube, and Disney+, breaks down grammar with an AI sentence parser, and adds AiTalk-style
                speaking practice to turn passive watching into active output. For serious, tech-savvy
                learners it can feel like an all-in-one study suite. The trade-offs: its best features sit
                behind a Pro plan at roughly $9.90/month (at the time of writing &mdash; confirm on their site),
                there is no Amazon Prime Video support, and the dense interface can feel heavy for casual
                users. If AI grammar and speaking practice matter most, it is well worth a look &mdash; see our{" "}
                <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">
                  dual-subtitle extension comparison
                </a>{" "}
                for how it stacks up.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Deep AI grammar and sentence parsing
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AiTalk-style AI speaking practice
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube &amp; Disney+ support
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Best features locked behind ~$9.90/mo Pro
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Dense interface can overwhelm casual learners
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Immersive Translate */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">4. Immersive Translate</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">About $9.99/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Immersive Translate is the best choice if your learning extends well beyond video. It excels
                at bilingual web page translation, PDF documents, and ebooks &mdash; areas where eJOY offers
                nothing. It does have a video subtitle mode, but Netflix support is limited and inconsistent
                compared with dedicated subtitle extensions. Its cross-browser support (Chrome, Firefox,
                Safari, Edge) is the widest here. If you read foreign-language articles and documents more
                than you watch shows, it is a great pick &mdash; and it pairs well with a focused video tool.
                Compare it more closely in our{" "}
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> ~$9.99/month for full features
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

            {/* 5. Migaku */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">5. Migaku</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">About $10/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Migaku is built for power users who take immersion seriously. Its signature is sentence
                mining: while you watch Netflix or YouTube, you can turn subtitle lines into rich flashcards
                &mdash; complete with audio, images, and definitions &mdash; that sync into Anki-style spaced
                repetition. If eJOY&apos;s gamified review hooked you but you want something deeper and more
                customizable, Migaku goes further. The trade-off is a steep learning curve and setup process;
                casual watchers may find it overkill. At around $10 per month (at the time of writing &mdash;
                confirm on their site) it competes on depth rather than price.
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
                Lingopie takes a different route: instead of overlaying subtitles on services you already pay
                for, it is a subscription streaming platform with its own curated catalog of TV shows and
                movies built for learners. Every title has interactive dual subtitles, clickable words, and
                review games, and the content is hand-picked by difficulty and language. Lingopie also offers
                a Netflix-only Chrome extension that extends its interactive subtitles to Netflix. At roughly
                $12 per month (at the time of writing &mdash; confirm on their site) it is one of the pricier
                options, and the core value is its own library rather than broad platform support.
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
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix-only extension available
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
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Learning a Non-English Language</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Go with{" "}
                  <a href="/chrome-extension" className="text-[#C642FC] hover:underline">
                    Funlingo
                  </a>. It supports 100+ target languages and gives you dual subtitles on all three major
                  streaming platforms with vocabulary saving, pronunciation audio, and AI features &mdash; all
                  completely free, with no trial period, quota, or paywall.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">AI-Depth Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Pick Trancy. If AI grammar breakdowns and AiTalk speaking practice matter most and you do
                  not mind a Pro subscription, its study suite goes deeper on active output than eJOY&apos;s
                  gamified review.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Immersion Power User</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Choose Migaku. If you want to build your own Anki-style deck through sentence mining and do
                  not mind a steeper setup, its SRS workflow is far deeper than eJOY&apos;s mini-games. Pair it
                  with Funlingo for everyday watching.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Curated-Content Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Consider Lingopie. If you would rather follow a hand-picked catalog sorted by level than
                  hunt for shows yourself, its learner-focused library and Netflix extension are worth the
                  subscription.
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
                  What&apos;s the best free alternative to eJOY?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and
                  Amazon Prime Video, with a multi-translation selector, pronunciation audio, AI grammar
                  explanations, and vocabulary saving with export &mdash; all completely free, with no quota or
                  paid tier gating the core features. Unlike eJOY, which is built for learning English,
                  Funlingo supports 100+ target languages.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Can I use eJOY to learn Spanish, Japanese, or Korean?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  eJOY English is built specifically for learning English, so it is not the right tool if
                  your target language is Spanish, Japanese, Korean, or another non-English language. Funlingo
                  supports 100+ languages, making it a better choice for learners studying any language. Our{" "}
                  <a href="/blog/netflix-language-learning-extensions" className="text-[#C642FC] hover:underline">
                    Netflix language learning extensions
                  </a>{" "}
                  guide covers more multi-language options.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Does eJOY work on Amazon Prime Video?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  No. eJOY supports dual subtitles on Netflix and YouTube, but not Amazon Prime Video. If you
                  watch content on Prime Video, Funlingo is the only tool on this list that supports all three
                  major streaming platforms &mdash; Netflix, YouTube, and Prime Video &mdash; for free.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  How much does eJOY premium cost in 2026?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  At the time of writing, eJOY premium costs around $4.99 per month and unlocks advanced
                  vocabulary review, gamified practice, and additional look-up features. Pricing can change,
                  so always confirm the current plans on eJOY&apos;s own site before subscribing.
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
