"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Crown, Zap } from "lucide-react";

export default function NetflixLanguageLearningExtensionsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">Best Netflix Language Learning Extensions (2026): 5 Tools Tested & Compared</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">If you&apos;ve been searching for a language learning with Netflix Chrome extension, you&apos;re not alone &mdash; it&apos;s one of the most popular ways to combine entertainment with real language progress. Netflix has become one of the most popular platforms for language learning, and for good reason: thousands of shows and movies in dozens of languages, professional subtitles, and content you actually want to watch. But Netflix&apos;s built-in subtitle system only shows one language at a time. That is where Chrome extensions come in &mdash; they unlock dual subtitles, word lookups, and vocabulary tools that transform passive watching into active learning.</p>

          <p>We tested and compared the five most popular Netflix language learning extensions available in 2026. Below you will find detailed reviews, a side-by-side comparison table, and guidance on choosing the right tool for your learning style. If you are also interested in how <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">dual subtitle extensions</a> work across platforms, or want broader tips on <a href="/blog/netflix-language-learning" className="text-[#C642FC] hover:underline">learning languages with Netflix</a>, check out our dedicated guides.</p>

          <p className="text-gray-300 mb-6">Before we dive into the extensions, make sure you understand how to set up <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">dual subtitles on Netflix</a> — it takes under 30 seconds.</p>

          <hr className="border-white/10 my-10" />

          {/* Extension 1: Funlingo */}
          <div className="bg-white/5 rounded-xl p-8 border border-[#C642FC]/30 my-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C642FC] text-white text-xs font-bold px-4 py-1 rounded-bl-lg flex items-center gap-1"><Crown className="w-3 h-3" /> Best Free Option</div>
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">1. Funlingo</h2>
            <p className="text-[#C642FC] font-medium mb-4">Free &mdash; No account required</p>
            <p className="text-gray-300 mb-4">Funlingo is a free Chrome extension that overlays dual bilingual subtitles directly inside the Netflix player. It also works on YouTube and Prime Video. What sets it apart is the combination of word-level translation popups with multiple translation options (choose 1, 2, 3, or all meanings), per-word pronunciation audio, AI-powered explanations, and a built-in vocabulary saver &mdash; all completely free.</p>

            <h3 className="text-lg font-bold text-white mb-3 mt-6">Key Features</h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Dual in-player subtitles (original + translation) on Netflix, YouTube, Prime Video",
                "Click any word for instant multi-translation popup with selectable depth (1/2/3/All)",
                "Per-word pronunciation with audio playback and slow mode",
                "AI-powered contextual explanations and grammar notes",
                "Save words to vocabulary list for later review",
                "Rated 4.92/5 stars on the Chrome Web Store",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-green-400 mt-1 shrink-0" /><span className="text-gray-200">{f}</span></li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Completely free", "Multi-translation selector is unique", "Works across 3 major platforms", "No account needed to start", "Lightweight and fast"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Chrome only (no Firefox or Safari)", "Newer extension with smaller community", "No built-in flashcard SRS system yet"].map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Extension 2: Language Reactor */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">2. Language Reactor</h2>
            <p className="text-yellow-400 font-medium mb-4">Free tier + Pro at $7.99/month</p>
            <p className="text-gray-300 mb-4">Language Reactor (formerly Language Learning with Netflix) is one of the most well-known extensions in this space. It provides dual subtitles, a side panel with machine translations, and a catalog for finding content in your target language. The free version covers basic dual subtitles, while the Pro plan unlocks features like phrase saving, human translations, and advanced playback controls.</p>

            <h3 className="text-lg font-bold text-white mb-3 mt-6">Key Features</h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Dual subtitles with hover translations",
                "Content catalog to discover shows by language",
                "Side panel with full transcript and translations",
                "Pro: Human-reviewed translations and phrase saving",
                "Works on Netflix and YouTube",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-gray-400 mt-1 shrink-0" /><span className="text-gray-300">{f}</span></li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Large established community", "Content catalog is helpful for discovery", "Clean, intuitive interface", "Good free tier for basic use"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Best features locked behind Pro plan", "No per-word pronunciation audio", "No multi-translation selector", "Does not support Prime Video"].map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-300 mt-6 mb-0">See our full <a href="/blog/language-reactor-alternatives" className="text-[#C642FC] hover:underline">Language Reactor alternatives guide</a> for more options.</p>
          </div>

          {/* Extension 3: Trancy */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">3. Trancy</h2>
            <p className="text-yellow-400 font-medium mb-4">Free tier + Pro at $9.90/month</p>
            <p className="text-gray-300 mb-4">Trancy positions itself as an all-in-one immersive language learning tool. Beyond dual subtitles on Netflix and YouTube, it offers sentence-level grammar analysis, AI-powered speaking practice, and reading mode for web articles. It is a feature-rich option aimed at serious learners who want deep study tools integrated into their browser.</p>

            <h3 className="text-lg font-bold text-white mb-3 mt-6">Key Features</h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Dual subtitles with sentence-level analysis",
                "AI speaking practice with pronunciation scoring",
                "Grammar breakdown for individual sentences",
                "Reading mode for web articles and news",
                "Supports Netflix, YouTube, Disney+, and more",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-gray-400 mt-1 shrink-0" /><span className="text-gray-300">{f}</span></li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Most feature-rich option overall", "AI speaking practice is well-implemented", "Supports many streaming platforms", "Strong grammar analysis tools"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Most expensive option at $9.90/month", "Can feel overwhelming for casual learners", "Free tier is quite limited", "Heavier extension, may slow some browsers"].map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-300 mt-6 mb-0">For a detailed look at Trancy&apos;s AI conversation feature, see our <a href="/blog/aitalk-review" className="text-[#C642FC] hover:underline">AiTalk review</a>.</p>
          </div>

          {/* Extension 4: Immersive Translate */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">4. Immersive Translate</h2>
            <p className="text-yellow-400 font-medium mb-4">Free tier + Pro at $6.99/month</p>
            <p className="text-gray-300 mb-4">Immersive Translate started as a web page translation tool and has expanded to include video subtitle translation. Its strength lies in translating entire web pages in a bilingual format, which makes it excellent for reading practice. For Netflix, it offers dual subtitle overlay, though its video-specific learning features are less developed than competitors focused purely on streaming.</p>

            <h3 className="text-lg font-bold text-white mb-3 mt-6">Key Features</h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Bilingual web page translation (side-by-side)",
                "Dual subtitles on Netflix, YouTube, and other platforms",
                "Multiple translation engine options (Google, DeepL, etc.)",
                "PDF and ebook bilingual reading",
                "Cross-browser support (Chrome, Firefox, Safari)",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-gray-400 mt-1 shrink-0" /><span className="text-gray-300">{f}</span></li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Best web page translation tool", "Works across multiple browsers", "Multiple translation engines", "Great for reading-focused learners"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Video learning features are secondary", "No word-level popups on Netflix", "No vocabulary saving for video content", "No pronunciation audio features"].map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Extension 5: eJOY */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">5. eJOY English</h2>
            <p className="text-yellow-400 font-medium mb-4">Free tier + Premium at $4.99/month</p>
            <p className="text-gray-300 mb-4">eJOY is geared primarily toward English learners, though it supports other languages as well. It offers dual subtitles on Netflix and YouTube, a word lookup feature, and a gamified vocabulary review system with mini-games. It is a solid budget option for learners focused on English comprehension.</p>

            <h3 className="text-lg font-bold text-white mb-3 mt-6">Key Features</h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Dual subtitles on Netflix and YouTube",
                "Click-to-translate word lookup",
                "Gamified vocabulary review with mini-games",
                "Word books organized by topic and difficulty",
                "Phrasebook for saving expressions",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-gray-400 mt-1 shrink-0" /><span className="text-gray-300">{f}</span></li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Most affordable premium plan", "Fun gamified review system", "Good for English learners specifically", "Clean, simple interface"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Primarily English-focused", "Limited language pair options", "No AI-powered explanations", "Does not support Prime Video"].map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <h2 className="text-3xl font-bold text-white mt-16 mb-6">Side-by-Side Comparison Table</h2>
          <p>Here is a quick-reference comparison of all five extensions across the features that matter most for Netflix language learning.</p>

          <div className="my-10 not-prose">
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse" aria-label="Netflix language learning extensions comparison">
                  <thead className="bg-[#0a0a0a]">
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-gray-400 font-medium text-sm">Feature</th>
                      <th className="p-4 text-white font-bold text-sm bg-[rgba(198,66,252,0.15)] border-t-2 border-t-[#C642FC]">Funlingo</th>
                      <th className="p-4 text-gray-300 font-semibold text-sm">Language Reactor</th>
                      <th className="p-4 text-gray-300 font-semibold text-sm">Trancy</th>
                      <th className="p-4 text-gray-300 font-semibold text-sm">Immersive Translate</th>
                      <th className="p-4 text-gray-300 font-semibold text-sm">eJOY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {[
                      { feature: "Price", values: ["Free", "$7.99/mo", "$9.90/mo", "$6.99/mo", "$4.99/mo"], highlights: [true, false, false, false, false] },
                      { feature: "Dual Subtitles", values: ["Yes", "Yes", "Yes", "Yes", "Yes"], highlights: [true, false, false, false, false] },
                      { feature: "Word-Level Popup", values: ["Multi-translation", "Single translation", "With grammar", "No", "Single translation"], highlights: [true, false, false, false, false] },
                      { feature: "Pronunciation Audio", values: ["Per-word + slow", "No", "AI scoring", "No", "Basic TTS"], highlights: [true, false, false, false, false] },
                      { feature: "Vocab Saving", values: ["Yes", "Pro only", "Pro only", "No", "Yes"], highlights: [true, false, false, false, false] },
                      { feature: "AI Explanations", values: ["Yes", "No", "Yes", "No", "No"], highlights: [true, false, false, false, false] },
                      { feature: "Netflix Support", values: ["Yes", "Yes", "Yes", "Yes", "Yes"], highlights: [true, false, false, false, false] },
                      { feature: "YouTube Support", values: ["Yes", "Yes", "Yes", "Yes", "Yes"], highlights: [true, false, false, false, false] },
                      { feature: "Prime Video", values: ["Yes", "No", "Some", "Yes", "No"], highlights: [true, false, false, false, false] },
                      { feature: "Browser Support", values: ["Chrome", "Chrome", "Chrome, Edge", "Chrome, Firefox, Safari", "Chrome"], highlights: [false, false, false, true, false] },
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-colors">
                        <td className="p-4 text-gray-300 font-medium">{row.feature}</td>
                        {row.values.map((val, j) => (
                          <td key={j} className={`p-4 ${j === 0 ? "bg-[rgba(198,66,252,0.05)] text-gray-200" : "text-gray-400"}`}>
                            <span className={row.highlights[j] ? "text-[#C642FC] font-semibold" : ""}>{val}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">How to Choose the Right Extension</h2>
          <p>The best extension depends on your specific learning goals and budget. Here is a quick decision framework.</p>

          <div className="space-y-4 my-8">
            {[
              { icon: <Star className="w-5 h-5" />, scenario: "You want the best free option with the most features", pick: "Funlingo. It offers dual subtitles, multi-translation popups, pronunciation, AI explanations, and vocab saving &mdash; all free. No other extension matches this feature set at zero cost." },
              { icon: <Zap className="w-5 h-5" />, scenario: "You want deep grammar analysis and speaking practice", pick: "Trancy. Its AI-powered grammar breakdowns and speaking practice features go deeper than any competitor, though the $9.90/month price reflects that." },
              { icon: <Crown className="w-5 h-5" />, scenario: "You primarily read websites and articles in other languages", pick: "Immersive Translate. Its bilingual web page and PDF translation is best-in-class. The video features are secondary but functional." },
              { icon: <Star className="w-5 h-5" />, scenario: "You are learning English specifically and want gamified review", pick: "eJOY. Its vocabulary mini-games and topical word books make review engaging, though the language pair options are limited." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[#C642FC] mt-1 shrink-0">{item.icon}</div>
                <div>
                  <strong className="text-white block mb-1">{item.scenario}</strong>
                  <span className="text-gray-400 text-sm">{item.pick}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-xl p-8 my-8">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">Why we recommend starting with Funlingo</h3>
            <p className="text-gray-300 mb-4">Since Funlingo is completely free with no feature gates, it is the lowest-risk way to start learning languages on Netflix. You get dual subtitles, word lookups with multiple translations, pronunciation audio, and vocabulary saving from day one. If you later decide you need specialized features like grammar analysis (Trancy) or web page translation (Immersive Translate), you can always add a paid tool alongside Funlingo.</p>
            <p className="text-gray-300 m-0">The multi-translation selector &mdash; letting you choose to see 1, 2, 3, or all meanings for any word &mdash; is a feature unique to Funlingo and especially valuable for languages where words carry multiple meanings depending on context.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Choose a Language Learning Chrome Extension for Netflix</h2>
          <p className="text-gray-300 mb-6">Choosing the right Chrome extension for Netflix language learning comes down to three questions. First, how much are you willing to pay? Funlingo is the only extension that offers full dual subtitles, word-level translation, pronunciation audio, and vocabulary saving completely free. Language Reactor and Trancy lock their best features behind $6-10/month subscriptions.</p>
          <p className="text-gray-300 mb-6">Second, which platforms matter to you? If you watch Amazon Prime Video alongside Netflix, Funlingo is the only option that supports all three major platforms. Third, what&apos;s your learning style? If you prefer passive immersion with vocabulary building, Funlingo is ideal. If you want active grammar drills and speaking practice, Trancy&apos;s premium features may justify the cost.</p>

          <h2 className="text-3xl font-bold text-white mt-16 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "What is the best free Netflix language learning extension?", a: "Funlingo is the best free option. It offers dual subtitles, word-level translation popups with multiple meanings, pronunciation audio, AI-powered explanations, and a vocabulary saver — all at no cost. Most competitors lock these features behind paid plans ranging from $4.99 to $9.90 per month." },
              { q: "Do these extensions work on mobile?", a: "No. All five extensions reviewed here are Chrome extensions designed for desktop browsers. Netflix's mobile app does not support browser extensions. For mobile language learning with Netflix, you would need a dedicated app or use the mobile browser version with limited functionality." },
              { q: "Can I use multiple extensions at once?", a: "Technically yes, but it is not recommended. Running two subtitle-overlay extensions simultaneously can cause conflicts, overlapping subtitles, and performance issues. Pick one that best fits your workflow and disable the others while watching. You can always switch between extensions for different use cases." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                <h4 className="font-bold text-white text-lg mb-2">Q: {faq.q}</h4>
                <p className="text-gray-400 m-0">A: {faq.a}</p>
              </div>
            ))}
            <div>
              <strong className="text-white block mb-1">Does Netflix have a built-in language learning feature?</strong>
              <p className="text-gray-400 text-sm">No. Netflix doesn&apos;t have built-in language learning tools — it only offers standard subtitles in one language at a time. To get dual subtitles, word lookups, vocabulary saving, or pronunciation guides, you need a Chrome extension. Funlingo adds all of these features for free.</p>
            </div>
            <div>
              <strong className="text-white block mb-1">Can I use Netflix language learning extensions on my phone or TV?</strong>
              <p className="text-gray-400 text-sm">Netflix language learning extensions are Chrome browser add-ons and only work on desktop computers. They can&apos;t be installed on the Netflix mobile app, smart TVs, or tablets. To use dual subtitles on a bigger screen, watch Netflix in Chrome on your laptop and connect it to your TV via HDMI or Chromecast.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning Languages on Netflix Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Funlingo is free, requires no account, and takes 10 seconds to install. Get dual subtitles, word lookups, pronunciation, and vocabulary saving on Netflix, YouTube, and Prime Video.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Add Funlingo to Chrome &mdash; Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
