"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Zap, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways, ProsCons } from "@/app/blog/_components/graphics";

export default function MigakuAlternativesContent() {
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
            6 Best Migaku Alternatives (2026): Simpler, Free Ways to Immerse
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-dim)] mt-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              August 8, 2026
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

          <KeyTakeaways items={["Migaku is a powerful paid immersion toolkit (browser extension plus mobile apps) at roughly $10/month, but its Anki-style sentence-mining workflow has a real learning curve and setup effort.", "If you just want to watch shows with dual subtitles and look words up, a lighter tool will save you hours of configuration.", "Funlingo is the best free pick: dual subtitles on Netflix, YouTube, and Prime Video with one-tap save-to-vocabulary and no Anki setup required.", "Language Reactor (free plus ~$7.99/mo Pro) and Trancy (~$9.90/mo) are strong browser-based options; Lingopie and eJOY English suit curated-catalog and English learners respectively.", "If you genuinely want sentence mining but for free, pairing Anki with a subtitle overlay is the DIY route that most closely matches Migaku's philosophy."]} />

          {/* Intro */}
          <section className="mb-16">
            <p className="text-[var(--text-dim)] leading-relaxed">
              <a href="https://migaku.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Migaku</a> has earned a devoted following among serious immersion learners. It bundles a
              browser extension and mobile apps into one toolkit built around a compelling idea: turn the
              sentences you hear in real shows into study cards, then review them with spaced repetition.
              For learners who fully commit to the method, it is a genuinely powerful system &mdash; deeply
              customizable and grounded in a strong immersion philosophy.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              But Migaku is not for everyone. At roughly $10 per month it is a paid subscription, the
              Anki-style workflow takes real setup effort, and the whole sentence-mining approach can feel
              like overkill if you mostly want to relax, watch a show, and tap a word when you are curious.
              We tested the best alternatives to find simpler and often free ways to immerse. Whether you
              want a no-setup free extension or a budget catalog of graded content, this guide covers the
              six best Migaku alternatives available in 2026. If you are also weighing browser tools, our
              guide to{" "}
              <a href="/blog/language-reactor-alternatives" className="text-[#C642FC] hover:underline">
                Language Reactor alternatives
              </a>{" "}
              is a useful companion read.
            </p>
          </section>

          {/* Why Look for a Migaku Alternative? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text)]">Why Look for a Migaku Alternative?</h2>
            <p className="text-[var(--text-dim)] leading-relaxed">
              Migaku deserves real credit. It popularized structured sentence mining for a mainstream
              audience, its spaced-repetition flashcards are built directly into the immersion experience,
              and its customization options let advanced learners tune almost everything. The philosophy is
              sound: learn from real, native content rather than textbook drills, and let the words you
              actually encounter drive your study.
            </p>
            <p className="text-[var(--text-dim)] leading-relaxed">
              The friction is in the workflow. Sentence mining &mdash; turning sentences from shows into
              Anki-style cards and reviewing them daily &mdash; is a commitment. There is a real learning
              curve just to configure the system the way you want, and the spaced-repetition review habit is
              not for everyone; plenty of learners bounce off Anki-style decks entirely. On top of that, it
              is a paid subscription at around $10 per month (pricing changes, so check the current plan).
              For a casual learner who simply wants{" "}
              <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">
                dual subtitles
              </a>{" "}
              and quick word lookups while watching, that is more machinery than the goal requires. If any of
              that describes you, one of the lighter alternatives below will get you immersing faster.
            </p>

            <ProsCons proLabel="Migaku strengths" conLabel="Reasons to switch" pros={["Structured sentence mining from real shows", "Built-in Anki-style spaced-repetition flashcards", "Deep customization for advanced learners", "Strong, coherent immersion philosophy", "Browser extension plus mobile apps"]} cons={["Real learning curve and setup effort", "Anki/SRS review workflow is not for everyone", "Paid subscription at roughly $10/month", "Overkill for casual watch-and-look-up learners"]} />
          </section>

          {/* The 6 Best Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">
              The 6 Best Migaku Alternatives
            </h2>

            {/* Comparison Table */}
            <div className="thin-scroll overflow-x-auto mb-12">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Tool</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Price</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Learning curve</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Sentence mining</th>
                    <th className="py-3 px-4 text-[var(--text)] font-bold">Best for</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-dim)]">
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium">Funlingo</td><td className="py-3 px-4 text-green-400">Free</td><td className="py-3 px-4 text-green-400">Minimal</td><td className="py-3 px-4">One-tap save-to-vocab</td><td className="py-3 px-4">Immersion with zero setup</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.languagereactor.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Language Reactor</a></td><td className="py-3 px-4">Free / ~$7.99/mo Pro</td><td className="py-3 px-4">Low</td><td className="py-3 px-4">Phrase saving (Pro)</td><td className="py-3 px-4">Netflix &amp; YouTube learners</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://www.trancy.org" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Trancy</a></td><td className="py-3 px-4">~$9.90/mo</td><td className="py-3 px-4">Medium</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4">AI grammar &amp; speaking practice</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://lingopie.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Lingopie</a></td><td className="py-3 px-4">~$12/mo</td><td className="py-3 px-4">Low</td><td className="py-3 px-4">Basic flashcards</td><td className="py-3 px-4">Curated graded catalog</td></tr>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)]"><td className="py-3 px-4 text-[var(--text)] font-medium"><a href="https://ejoy-english.com" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">eJOY English</a></td><td className="py-3 px-4">~$4.99/mo</td><td className="py-3 px-4">Low</td><td className="py-3 px-4">Gamified review</td><td className="py-3 px-4">Budget English learners</td></tr>
                  <tr className="border-b border-[var(--border)]"><td className="py-3 px-4 text-[var(--text)] font-medium">Anki + subtitle overlay</td><td className="py-3 px-4 text-green-400">Free</td><td className="py-3 px-4">High</td><td className="py-3 px-4 text-green-400">Full (DIY)</td><td className="py-3 px-4">Free sentence mining</td></tr>
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
                Funlingo is the best free alternative to Migaku for anyone who wants immersion without the
                Anki setup. It puts{" "}
                <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">
                  dual subtitles on Netflix
                </a>, YouTube, and Amazon Prime Video, and lets you click any word to translate it instantly
                &mdash; with a multi-translation selector (1, 2, 3, or All), per-word pronunciation audio and
                slow mode, and AI grammar help. When you find a word worth keeping, one tap saves it to your
                vocabulary list, which you can export. There are no decks to configure and no review algorithm
                to tune; you just watch and learn.
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                The trade-off is deliberate. Funlingo does not try to replicate Migaku&apos;s full
                spaced-repetition mining pipeline &mdash; if that structured daily review is exactly what you
                want, see the DIY option below. But for the large majority of learners who found Migaku&apos;s
                workflow too heavy, Funlingo delivers the core immersion loop &mdash; watch, understand, save
                &mdash; completely free, with no quota and no paid tier gating the essentials.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free &mdash; no paid tier, no quota
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Netflix, YouTube &amp; Prime Video dual subtitles
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Click any word to translate &mdash; multi-translation selector
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Per-word pronunciation audio &amp; slow mode
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> One-tap save-to-vocabulary with export
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> No Anki setup &mdash; 100+ languages
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No full Anki-style spaced-repetition pipeline
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Chrome only (no Firefox or Safari)
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No mobile app &mdash; browser learning only
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Language Reactor */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">2. Language Reactor</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Free / ~$7.99/month Pro</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Language Reactor is the most familiar browser-based alternative and a much gentler on-ramp
                than Migaku. It adds dual subtitles to Netflix and YouTube, lets you hover words for
                translations, and offers a curated catalog sorted by difficulty. The free tier covers basic
                dual subtitles, while Language Reactor Pro at roughly $7.99 per month unlocks phrase saving
                and advanced playback. It is a fine pick if your content lives on Netflix and YouTube, though
                it has no Amazon Prime Video support and no built-in pronunciation audio. For a fuller
                rundown, see our{" "}
                <a href="/blog/language-reactor-alternatives" className="text-[#C642FC] hover:underline">
                  Language Reactor alternatives guide
                </a>.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Usable free tier, gentle learning curve
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Curated catalog sorted by difficulty
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Large, active community
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Phrase saving needs Pro at ~$7.99/mo
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
                <span className="text-[var(--text-dim)] text-base">~$9.90/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Trancy leans into AI. It supports Netflix, YouTube, and Disney+, generates AI subtitles for
                content that lacks good ones, and parses grammar structures in real time. Its{" "}
                <a href="/blog/aitalk-review" className="text-[#C642FC] hover:underline">
                  AiTalk speaking practice
                </a>{" "}
                lets you rehearse conversations tied to what you are watching. It shares some of Migaku&apos;s
                ambition to be an all-in-one study environment, at a similar monthly price of around $9.90.
                It is a strong choice for learners who want AI grammar analysis and speaking drills, but the
                feature depth means a moderate learning curve of its own, and there is no Amazon Prime Video
                support.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI subtitles &amp; real-time grammar parsing
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> AI speaking practice (AiTalk)
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> ~$9.90/month subscription
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Feature depth adds a learning curve
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No Amazon Prime Video support
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Lingopie */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">4. Lingopie</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Subscription, ~$12/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                Lingopie takes a different tack from Migaku: instead of a tool you bolt onto your own
                streaming, it is a curated catalog of shows licensed for language learning, with interactive
                dual subtitles, click-to-translate, and simple flashcards built in. In April 2026 it also
                launched a Netflix-only Chrome extension, extending its reach beyond its own library. The
                appeal is a low learning curve and content already graded for learners; the trade-offs are
                the roughly $12 per month subscription and a catalog that, outside the Netflix extension, is
                limited to what Lingopie has licensed. It suits learners who want a guided,
                ready-to-watch experience rather than a build-it-yourself system.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Curated catalog graded for learners
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Interactive subtitles &amp; built-in flashcards
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> New Netflix-only Chrome extension (April 2026)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> ~$12/month subscription
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Core catalog limited to licensed content
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No deep sentence-mining pipeline
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. eJOY English */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">5. eJOY English</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">~$4.99/month</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                eJOY English is the budget pick, built specifically for English learners. It adds dual
                subtitles on Netflix and YouTube and pairs them with a gamified vocabulary review system that
                uses spaced repetition and mini-games to help words stick &mdash; a lighter, friendlier take
                on the review habit at the heart of Migaku. At around $4.99 per month it is the cheapest
                subscription on this list. The catch is scope: eJOY is designed for learning English from
                other languages, so it is not the tool for studying Spanish, Japanese, or other non-English
                targets. For{" "}
                <a href="/blog/vocabulary-building-watching-shows" className="text-[#C642FC] hover:underline">
                  building vocabulary while watching shows
                </a>, though, its gamified loop is genuinely motivating.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Gamified spaced-repetition review
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Budget-friendly at ~$4.99/mo
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
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Not a full immersion toolkit
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Anki + a subtitle overlay */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">6. Anki + a Subtitle Overlay (DIY)</h3>
              <p className="text-[var(--text-dim)] mb-2">
                <span className="text-[var(--text-dim)] text-base">Free</span>
              </p>
              <p className="text-[var(--text-dim)] mb-6">
                If what drew you to Migaku was sentence mining itself &mdash; and you would rather not pay for
                it &mdash; the free DIY route is to combine <a href="https://apps.ankiweb.net" target="_blank" rel="noopener noreferrer" className="text-[#C642FC] hover:underline">Anki</a> with a subtitle overlay tool that lets you
                load target-language subtitles onto your video. You watch, copy the sentences you want, and
                build your own spaced-repetition cards in Anki, which is free on desktop and Android. This
                gets you closest to Migaku&apos;s philosophy at zero cost, and Anki&apos;s review engine is
                the gold standard. The honest downside is effort: this is the highest learning curve on the
                list, with the most manual setup and card-making. It is the right pick only for learners who
                actively enjoy the mining process, not those looking to simplify.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Pros</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Completely free
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Full sentence mining, your way
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Anki&apos;s best-in-class SRS engine
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Cons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Highest learning curve on this list
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Lots of manual setup and card-making
                    </li>
                    <li className="flex items-center gap-2 text-[var(--text-dim)] text-base">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" /> No polished all-in-one experience
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
                Want immersion without the Anki setup?
              </h3>
              <p className="text-[var(--text-dim)] mb-6">
                Funlingo gives you free dual subtitles on Netflix, YouTube &amp; Prime Video, click-to-translate,
                per-word pronunciation, and one-tap save-to-vocabulary &mdash; no configuration required.
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
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Casual Immersion Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Go with{" "}
                  <a href="/chrome-extension" className="text-[#C642FC] hover:underline">
                    Funlingo
                  </a>. It gives you dual subtitles on Netflix, YouTube, and Prime Video with
                  click-to-translate and one-tap vocabulary saving &mdash; free, with no Anki setup and no
                  quota. Perfect if Migaku felt like too much machinery.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Dedicated Sentence Miner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  If you genuinely love the mining workflow but want it free, pair Anki with a subtitle
                  overlay. You keep full control of your cards and Anki&apos;s review engine &mdash; just be
                  ready for the setup effort.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">AI &amp; Speaking Enthusiast</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Pick Trancy. Its AI grammar parsing and AiTalk speaking practice go deeper than most
                  extensions, at around $9.90/month. Great if you want an all-in-one AI study environment.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Guided-Catalog or Budget Learner</h4>
                <p className="text-[var(--text-dim)] text-base">
                  Choose Lingopie (~$12/mo) for graded, ready-to-watch content, or eJOY English (~$4.99/mo)
                  if you are learning English on a budget and like gamified review. Both keep the learning
                  curve low.
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
                  What&apos;s the best free alternative to Migaku?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Funlingo is the best free alternative. It offers dual subtitles on Netflix, YouTube, and
                  Amazon Prime Video with click-to-translate, per-word pronunciation, AI grammar help, and
                  one-tap save-to-vocabulary &mdash; all free, with no Anki setup and no quota. Migaku, by
                  contrast, is a paid subscription of around $10/month built around a heavier sentence-mining
                  workflow.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Do I need Anki or sentence mining to learn from shows?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  No. Sentence mining with Anki is powerful but optional. Many learners make excellent
                  progress simply by watching with{" "}
                  <a href="/blog/learn-japanese-with-anime" className="text-[#C642FC] hover:underline">
                    dual subtitles
                  </a>{" "}
                  and looking up words as they go. Tools like Funlingo let you save vocabulary with one tap
                  without ever building a flashcard deck.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Is Migaku worth the subscription?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  It depends on your goals. If you commit to daily spaced-repetition review and enjoy
                  customizing your setup, Migaku&apos;s roughly $10/month toolkit is a coherent, powerful
                  system. If you mostly want to watch shows and look words up, it is likely overkill &mdash;
                  a free tool like Funlingo or one of the other alternatives here will serve you better.
                  Pricing changes, so always check Migaku&apos;s current plans.
                </p>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                  Which alternative works on Amazon Prime Video?
                </h4>
                <p className="text-[var(--text-dim)] text-base">
                  Among the tools here, Funlingo is the option that supports dual subtitles on Amazon Prime
                  Video alongside Netflix and YouTube. Language Reactor, Trancy, and eJOY English do not
                  currently support Prime Video, so Funlingo is the pick if that platform matters to you. For
                  more, see our{" "}
                  <a href="/blog/best-free-language-learning-tools-2026" className="text-[#C642FC] hover:underline">
                    best free language learning tools of 2026
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* End CTA */}
          <section className="mb-8">
            <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-2xl p-10 text-center">
              <h3 className="text-3xl font-bold text-[var(--text)] mb-4">
                Ready to Immerse for Free?
              </h3>
              <p className="text-[var(--text-dim)] mb-8 text-lg">
                Join thousands of learners using Funlingo to watch Netflix, YouTube, and Prime
                Video with dual subtitles. Click any word to translate, hear pronunciation, get AI grammar
                help, and save vocabulary in one tap &mdash; no Anki setup, completely free.
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
