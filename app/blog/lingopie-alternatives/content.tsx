"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Zap, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways, ProsCons } from "@/app/blog/_components/graphics";

export default function LingopieAlternativesContent() {
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
            Lingopie Alternatives 2026: Best Free &amp; Cheaper Options (Extension Reviewed)
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-dim)] mt-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              August 9, 2026
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

          <KeyTakeaways items={["Lingopie is a paid subscription platform (around $12/month at the time of writing) built around real TV and movies with clickable subtitles, flashcards, and quizzes.", "In April 2026 Lingopie launched a Chrome extension for Netflix, but it is limited to four languages (Spanish, French, Italian, German), Netflix only, original (non-dubbed) content only, and still requires a paid subscription.", "Funlingo is the best free alternative: dual subtitles on Netflix, YouTube, and Amazon Prime Video, 100+ languages, click-to-translate, and vocab saving with no subscription.", "Language Reactor, Trancy, Migaku, and eJOY English each suit specific needs, from free Netflix study to Anki-based sentence mining.", "If you want structured, curated lessons instead of using your own content, Lingopie's own catalog still has a place."]} />

          {/* Intro */}
          <section className="mb-16">
            <p className="text-[var(--text-dim)] leading-relaxed">
              <a href="https://lingopie.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Lingopie</a> built its reputation on a simple, appealing idea: learn a language by
              watching real TV shows and movies with clickable subtitles. Tap a word, get an instant
              translation, save it to a flashcard deck, and review it later with built-in quizzes. It is
              a polished, structured experience &mdash; and for many learners it works well. But it is
              also a paid subscription platform, running around $12 per month at the time of writing
              (cheaper on an annual plan; confirm current pricing on Lingopie&apos;s site), and its
              content is limited to Lingopie&apos;s own curated catalog.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              In April 2026 Lingopie made a big move: it launched a Chrome extension that brings its
              clickable-subtitle tools directly to Netflix. Click a word while watching, get an instant
              translation, save it to your Lingopie deck, and review it later. It is a genuinely useful
              addition &mdash; but it comes with real limits. If Lingopie&apos;s cost, language coverage,
              or content restrictions are pushing you to look elsewhere, this guide covers the six best
              alternatives for 2026, with an honest take on each. If you are also exploring the wider
              world of{" "}
              <a href="/blog/netflix-language-learning-extensions" className="text-[#C642FC] hover:underline">
                Netflix language learning extensions
              </a>, this comparison will help you choose.
            </p>
          </section>

          {/* Why Look for an Alternative */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text)]">Why Look for a Lingopie Alternative?</h2>
            <p className="text-[var(--text-dim)] leading-relaxed">
              Lingopie deserves credit for making video-based learning approachable. Its catalog is
              hand-picked and organized by difficulty, the interactive transcript is clean, and the
              flashcard and quiz loop keeps you reviewing what you learn. For a learner who wants a
              guided, structured path through curated content, it is a strong option.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              The friction shows up when you want more freedom or a lower cost. Lingopie is a paid
              subscription, so there is no genuinely free way to keep using it long term. The catalog,
              while good, is a walled garden &mdash; you learn from Lingopie&apos;s content, not your own
              Netflix or YouTube queue. And the new April 2026 Chrome extension, while promising, is
              tightly scoped: it works on Netflix only (not YouTube), supports just four languages
              (Spanish, French, Italian, and German), and only activates on content that was originally
              produced in that language &mdash; dubbed shows are excluded. On top of all that, the
              extension still requires a paid Lingopie subscription to use. If any of these limits get in
              your way, the alternatives below are worth a look.
            </p>

            <ProsCons proLabel="Lingopie strengths" conLabel="Where it falls short" pros={["Curated catalog of real TV and movies, sorted by difficulty", "Clean clickable-subtitle transcript with instant translations", "Built-in flashcards and quizzes for structured review", "New Netflix Chrome extension brings word-saving to your own viewing"]} cons={["Paid subscription only (around $12/month at the time of writing)", "Extension supports Netflix only, not YouTube", "Extension limited to Spanish, French, Italian, and German", "Extension works on original-language content only (no dubs), and still needs a paid plan"]} />
          </section>

          {/* The 6 Best Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">
              The 6 Best Lingopie Alternatives
            </h2>

            {/* Comparison Table */}
            <div className="thin-scroll overflow-x-auto mb-12">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Tool</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Price</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Languages</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Platforms</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Uses your own content</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Free</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-dim)]">
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium">Funlingo</td><td className="py-3 px-4">Free</td><td className="py-3 px-4 text-green-400">100+</td><td className="py-3 px-4">Netflix, YouTube, Prime Video</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4 text-green-400">Yes</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.languagereactor.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Language Reactor</a></td><td className="py-3 px-4">Free / $7.99/mo</td><td className="py-3 px-4">Many</td><td className="py-3 px-4">Netflix, YouTube</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">Limited</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.trancy.org" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Trancy</a></td><td className="py-3 px-4">$9.90/mo</td><td className="py-3 px-4">Many</td><td className="py-3 px-4">Netflix, YouTube, Disney+</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">Limited</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://migaku.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Migaku</a></td><td className="py-3 px-4">~$10/mo</td><td className="py-3 px-4">Many</td><td className="py-3 px-4">Netflix, YouTube</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">No</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://ejoy-english.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">eJOY English</a></td><td className="py-3 px-4">$4.99/mo</td><td className="py-3 px-4">English only</td><td className="py-3 px-4">Netflix, YouTube</td><td className="py-3 px-4 text-green-400">Yes</td><td className="py-3 px-4">Limited</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://lingopie.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Lingopie catalog</a></td><td className="py-3 px-4">~$12/mo</td><td className="py-3 px-4">8+</td><td className="py-3 px-4">Own catalog + Netflix ext.</td><td className="py-3 px-4">Partly</td><td className="py-3 px-4">No</td></tr>
                </tbody>
              </table>
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
                Funlingo is the best free alternative to Lingopie, and it removes almost every limitation
                that pushes people to look elsewhere. It adds{" "}
                <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">
                  dual subtitles on Netflix
                </a>, YouTube, and Amazon Prime Video &mdash; not just one platform &mdash; and it works
                with any content in your own queue, dubbed or original. Where Lingopie&apos;s extension
                caps you at four languages and requires a paid plan, the{" "}
                <a href="/chrome-extension" className="text-[#C642FC] hover:underline">
                  Funlingo Chrome extension
                </a>{" "}
                supports 100+ languages and is completely free, with no paid tier gating the core
                features and no usage quota.
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                You get click-to-translate on any word with a multi-translation selector (see 1, 2, 3, or
                all translations), per-word pronunciation audio with a slow mode, AI grammar explanations,
                and a built-in vocabulary saver with export. It is the closest thing to Lingopie&apos;s
                word-saving workflow, only free, broader, and not restricted to a curated catalog. The
                one honest trade-off: Funlingo is a subtitle-and-vocab tool, so it does not hand you a
                structured, lesson-by-lesson course the way Lingopie&apos;s catalog does.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free &mdash; no subscription, no quota
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube &amp; Prime Video support
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> 100+ languages, dubbed or original content
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Multi-translation selector (1/2/3/All)
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Per-word pronunciation with audio &amp; slow mode
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI grammar help &amp; vocab saver with export
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No structured, curated lesson catalog
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
                <span className="text-[var(--text-dim)] text-base">Free / $7.99 per month for Pro</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Language Reactor is the best-known free-first alternative. It adds dual subtitles to
                Netflix and YouTube, with click-to-translate lookups and a curated catalog that sorts
                content by difficulty &mdash; a lot like Lingopie, but starting from a free tier. The Pro
                plan at $7.99 per month (confirm current pricing) unlocks vocabulary saving, human-reviewed
                translations, and advanced playback. Its main gaps versus Funlingo are the lack of Amazon
                Prime Video support and no per-word pronunciation audio. If you already lean on it and
                want to weigh other options, our{" "}
                <a href="/blog/language-reactor-alternatives" className="text-[#C642FC] hover:underline">
                  Language Reactor alternatives guide
                </a>{" "}
                goes deeper.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Usable free tier for dual subtitles
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix &amp; YouTube support
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Large community &amp; difficulty-sorted catalog
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Vocab saving requires $7.99/mo Pro
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
                <span className="text-[var(--text-dim)] text-base">$9.90 per month (confirm current pricing)</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Trancy is the pick for learners who want AI-assisted study and speaking practice on top of
                dual subtitles. It supports Netflix, YouTube, and Disney+, generates AI subtitles for
                videos that lack them, and includes conversation practice so you can rehearse what you
                watch. It works with your own content rather than a fixed catalog. At $9.90 per month it
                is priced in the same range as Lingopie, so it is more of a feature-rich sidegrade than a
                money-saver &mdash; but the AI grammar and speaking tools are genuinely strong.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI subtitles &amp; grammar analysis
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Built-in AI speaking practice
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> $9.90/month &mdash; similar cost to Lingopie
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Can feel overwhelming for casual learners
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Migaku */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">4. Migaku</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Around $10 per month (confirm current pricing)</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Migaku is built for power users who practice sentence mining &mdash; turning sentences from
                real content into flashcards. It adds interactive dual subtitles to Netflix and YouTube,
                and its standout feature is deep Anki integration: with a click you can export a sentence,
                its translation, audio, and even a screenshot into a study card. That makes it the best
                choice if you already live in Anki and want a serious, long-term review system. The
                trade-off is complexity and cost: at roughly $10 per month with a steeper learning curve,
                it is overkill for casual watchers.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Powerful sentence mining workflow
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Deep Anki integration with audio &amp; images
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Around $10/month subscription
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Steeper learning curve
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Overkill for casual learners
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. eJOY English */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">5. eJOY English</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">$4.99 per month (confirm current pricing)</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                eJOY English is the budget option for one specific audience: people learning English. It
                supports dual subtitles on Netflix and YouTube, and its highlight is a gamified vocabulary
                system that uses spaced repetition and mini-games to lock in new words &mdash; a fun,
                sticky loop similar in spirit to Lingopie&apos;s quizzes. At $4.99 per month it is cheaper
                than Lingopie, Trancy, or Migaku. The catch is scope: eJOY is designed for learning
                English, so it is the wrong tool if your target language is Spanish, Japanese, or anything
                other than English.
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Limited free tier
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Lingopie's own curated catalog */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">6. Lingopie&apos;s Own Curated Catalog</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Around $12 per month (confirm current pricing)</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Sometimes the best alternative to a limitation is the original product used differently.
                If what you actually want is structure &mdash; a curated path through hand-picked shows,
                with graded difficulty, flashcards, and quizzes &mdash; then Lingopie&apos;s own catalog
                still earns its place. The free extensions on this list give you freedom and range, but
                they hand you an empty queue and expect you to choose what to watch. Lingopie removes that
                decision by doing the curation for you. It is the right choice when you value guidance
                over flexibility and do not mind paying for it.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Curated, difficulty-graded catalog
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Built-in flashcards &amp; quizzes
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Structured path, no decision fatigue
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Around $12/month subscription
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Limited to Lingopie&apos;s catalog
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Netflix extension capped at four languages
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
                Want Lingopie-style word saving &mdash; free, in 100+ languages?
              </h3>
              <p className="text-[var(--text-dim)] mb-6">
                Funlingo gives you free dual subtitles, click-to-translate, per-word pronunciation, and a
                vocab saver on Netflix, YouTube &amp; Prime Video &mdash; no subscription required.
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
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">You Want It Free</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Go with{" "}
                  <a href="/blog/best-free-language-learning-tools-2026" className="text-[#C642FC] hover:underline">
                    Funlingo
                  </a>. It is the only tool here that gives you dual subtitles, click-to-translate, and
                  vocab saving across Netflix, YouTube, and Prime Video in 100+ languages &mdash; all
                  completely free, with no subscription and no quota.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">You Want AI &amp; Speaking Practice</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Pick Trancy. Its AI subtitles, grammar analysis, and built-in conversation practice go
                  further than Lingopie&apos;s toolkit, though at a similar monthly price.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">You Live in Anki</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Choose Migaku. Its sentence-mining workflow and deep Anki export make it the strongest
                  option for serious, long-term reviewers who want full control of their cards.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">You Want Structure</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Stick with Lingopie&apos;s catalog. If a curated, graded path matters more to you than
                  cost or flexibility, its guided lessons remain a solid choice.
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
                  What&apos;s the best free alternative to Lingopie?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and
                  Amazon Prime Video with click-to-translate, per-word pronunciation, AI grammar help, and
                  a vocabulary saver &mdash; all completely free, in 100+ languages, with no subscription.
                  Lingopie is a paid platform with no free tier.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  How much does Lingopie cost in 2026?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  At the time of writing, Lingopie costs around $12 per month, with a cheaper rate on the
                  annual plan. Pricing can change, so confirm the current numbers on Lingopie&apos;s site.
                  There is no permanently free tier.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  What are the limits of Lingopie&apos;s Netflix Chrome extension?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Lingopie&apos;s April 2026 Chrome extension works on Netflix only (not YouTube), supports
                  just four languages (Spanish, French, Italian, and German), and only activates on content
                  originally produced in that language &mdash; dubbed shows are excluded. It also still
                  requires a paid Lingopie subscription.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Does any Lingopie alternative work on Amazon Prime Video?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Yes. Funlingo is the only tool in this comparison that supports dual subtitles on Amazon
                  Prime Video, alongside Netflix and YouTube. Language Reactor, Trancy, Migaku, and eJOY
                  do not currently support Prime Video.
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
