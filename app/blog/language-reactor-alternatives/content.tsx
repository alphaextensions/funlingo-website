"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, X, Crown } from "lucide-react";

export default function LanguageReactorAlternativesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Comparison</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">Best Language Reactor Alternatives for Language Learning (2026)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 13, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">Language Reactor was for years the go-to Chrome extension for learning languages with Netflix and YouTube subtitles. It still has plenty of fans &mdash; the catalog of curated content is solid, and the dual subtitle overlay is clean. But the free tier is genuinely limited, the Pro plan is $7.99/month, there is no Amazon Prime Video support, and a handful of features that other extensions ship by default (per-word pronunciation, multi-translation popups) are simply missing. If any of that sounds familiar, this guide covers the seven best alternatives we&apos;ve tested, ranked by who they&apos;re a good fit for.</p>

          <hr className="border-white/10 my-10" />

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Switch from Language Reactor?</h2>
          <p>Language Reactor is a strong product, but four things drive people to look elsewhere:</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Cost.</strong> The free tier strips out vocabulary saving, human-reviewed translations, and a chunk of playback controls. To get the full experience you&apos;re paying $7.99/month, which adds up if you also subscribe to a translator like DeepL or a flashcard tool.</li>
            <li><strong className="text-white">No Prime Video support.</strong> Language Reactor works on Netflix and YouTube, full stop. If a serious slice of your watch-time is on Amazon Prime Video, you need a different tool.</li>
            <li><strong className="text-white">No per-word pronunciation.</strong> You see translations but you can&apos;t tap a word and hear it pronounced. For learners working on listening and speaking, that&apos;s a real gap.</li>
            <li><strong className="text-white">No multi-translation selector.</strong> Words with multiple meanings (most words) only show a single translation, which can quietly mislead you about how a word is actually used.</li>
          </ul>
          <p>None of this makes Language Reactor a bad tool. It does mean other tools cover the same ground for free, or cover ground Language Reactor doesn&apos;t cover at all.</p>

          <hr className="border-white/10 my-10" />

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">The 7 Best Language Reactor Alternatives</h2>

          {/* 1. Funlingo */}
          <div className="bg-white/5 rounded-xl p-8 border border-[#C642FC]/30 my-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C642FC] text-white text-xs font-bold px-4 py-1 rounded-bl-lg flex items-center gap-1"><Crown className="w-3 h-3" /> Best Free Pick</div>
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">1. Funlingo &mdash; Free</h3>
            <p className="text-[#C642FC] font-medium mb-4">Best free overall, only option with Prime Video support</p>
            <p>Funlingo is the most direct free replacement for Language Reactor. You get dual subtitles on Netflix, YouTube, <em>and</em> Amazon Prime Video, plus the two features Language Reactor doesn&apos;t ship: per-word pronunciation with audio playback (and a slow-speed mode), and a multi-translation popup where you choose to see 1, 2, 3, or all meanings of a word. Vocabulary saving is built in. Everything is free, with no account required. The trade-off vs Language Reactor: a smaller community and content catalog, and no curated difficulty ratings on shows.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                  {["Free with no premium tier", "Prime Video supported", "Multi-translation popup", "Per-word pronunciation audio", "AI grammar explanations"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                  {["Chrome only", "No curated content catalog", "No flashcard SRS yet"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Trancy */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">2. Trancy &mdash; $9.90/month</h3>
            <p className="text-gray-400 font-medium mb-4">Best for grammar analysis and AI speaking practice</p>
            <p>Trancy is the closest paid competitor to Language Reactor on features, and pulls ahead in two areas: deep grammar breakdowns for individual sentences, and AiTalk &mdash; an AI conversation practice mode where you speak back to an AI tutor about the content you just watched. Supports Netflix, YouTube, and Disney+ but not Prime Video. The free tier is usable; the Pro tier unlocks AiTalk, custom dictionaries, and unlimited saves. For a head-to-head, see our <a href="/blog/language-reactor-vs-trancy" className="text-[#C642FC] hover:underline">Language Reactor vs Trancy</a> comparison and the full <a href="/blog/aitalk-review" className="text-[#C642FC] hover:underline">AiTalk review</a>.</p>
          </div>

          {/* 3. Immersive Translate */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">3. Immersive Translate &mdash; $9.99/month</h3>
            <p className="text-gray-400 font-medium mb-4">Best for web page and PDF translation, not video-first</p>
            <p>Immersive Translate is less of a Language Reactor alternative and more of a complementary tool, but it&apos;s worth a mention because many learners use both. Its strength is bilingual web-page translation &mdash; news articles, blog posts, documentation, PDFs &mdash; rendered alongside the original. Video subtitle support exists but feels secondary. Worth picking if you read more than you watch. We cover this in detail in our <a href="/blog/immersive-translate-alternatives" className="text-[#C642FC] hover:underline">Immersive Translate alternatives guide</a>.</p>
          </div>

          {/* 4. eJOY */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">4. eJOY English &mdash; $4.99/month</h3>
            <p className="text-gray-400 font-medium mb-4">Best for English learners, gamified vocabulary</p>
            <p>eJOY is purpose-built for learners studying English, with a gamified review system and a content library skewed heavily toward English-language shows. Dual subtitles work on YouTube and Netflix. The price is lower than Language Reactor, and the SRS-style flashcard review is more polished than what Language Reactor offers. If your target language isn&apos;t English, eJOY isn&apos;t the right choice &mdash; but for English learners specifically it&apos;s a solid alternative.</p>
          </div>

          {/* 5. Substital */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">5. Substital &mdash; Free</h3>
            <p className="text-gray-400 font-medium mb-4">Best for loading your own SRT files</p>
            <p>Substital takes a different approach: instead of overlaying Netflix&apos;s own subtitle tracks, it lets you load custom SRT files onto Netflix and a few other platforms. Useful if you&apos;ve downloaded fan-translated subs or transcripts that Netflix doesn&apos;t officially carry. No learning tools beyond the subtitles themselves &mdash; no lookups, no vocabulary saving &mdash; but if you specifically need to bring your own subtitle files, this is the simplest option.</p>
          </div>

          {/* 6. Mate Translate */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">6. Mate Translate &mdash; One-time $29.99</h3>
            <p className="text-gray-400 font-medium mb-4">Best for system-wide translation, video-agnostic</p>
            <p>Mate is a hover-to-translate tool that works on any text on any page or app &mdash; not specific to Netflix or YouTube. Pay once and own it for life across browser and desktop. Doesn&apos;t add dual subtitles to streaming platforms, so it&apos;s not a one-for-one Language Reactor replacement. But for the segment of learners who want a universal translation layer plus a separate, dedicated dual-subtitle tool, Mate paired with Funlingo gives you both for under $30 total.</p>
          </div>

          {/* 7. Linguo TV */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-6">
            <h3 className="text-2xl font-bold text-white mb-2 mt-0">7. Linguo TV &mdash; Free</h3>
            <p className="text-gray-400 font-medium mb-4">Best for finding content, not adding features</p>
            <p>Linguo TV doesn&apos;t overlay subtitles &mdash; it&apos;s a curated catalog of Netflix content organised by language and rough difficulty level. Useful when you&apos;re looking for the right show to watch in your target language but don&apos;t know where to start. Use Linguo TV to find the show, then use Funlingo or Language Reactor to actually watch it with dual subtitles.</p>
          </div>

          <hr className="border-white/10 my-10" />

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 my-8 not-prose">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase tracking-wider bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Tool</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Netflix</th>
                  <th className="px-4 py-3">YouTube</th>
                  <th className="px-4 py-3">Prime Video</th>
                  <th className="px-4 py-3">Vocab</th>
                  <th className="px-4 py-3">Pronunciation</th>
                  <th className="px-4 py-3">AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { tool: "Funlingo", price: "Free", n: "✓", y: "✓", p: "✓", v: "✓", pr: "✓", ai: "✓", highlight: true },
                  { tool: "Language Reactor", price: "$7.99/mo", n: "✓", y: "✓", p: "—", v: "Pro", pr: "—", ai: "Pro" },
                  { tool: "Trancy", price: "$9.90/mo", n: "✓", y: "✓", p: "—", v: "Pro", pr: "—", ai: "✓" },
                  { tool: "Immersive Translate", price: "$9.99/mo", n: "Limited", y: "Limited", p: "—", v: "—", pr: "—", ai: "✓" },
                  { tool: "eJOY English", price: "$4.99/mo", n: "✓", y: "✓", p: "—", v: "✓", pr: "✓", ai: "—" },
                  { tool: "Substital", price: "Free", n: "✓", y: "—", p: "—", v: "—", pr: "—", ai: "—" },
                  { tool: "Mate Translate", price: "$29.99 once", n: "—", y: "—", p: "—", v: "—", pr: "✓", ai: "—" },
                  { tool: "Linguo TV", price: "Free", n: "Catalog", y: "—", p: "—", v: "—", pr: "—", ai: "—" },
                ].map((row, i) => (
                  <tr key={i} className={row.highlight ? "bg-[rgba(198,66,252,0.08)]" : ""}>
                    <td className={`px-4 py-3 ${row.highlight ? "font-bold text-white" : "text-gray-200"}`}>{row.tool}</td>
                    <td className="px-4 py-3">{row.price}</td>
                    <td className="px-4 py-3">{row.n}</td>
                    <td className="px-4 py-3">{row.y}</td>
                    <td className="px-4 py-3">{row.p}</td>
                    <td className="px-4 py-3">{row.v}</td>
                    <td className="px-4 py-3">{row.pr}</td>
                    <td className="px-4 py-3">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Which Alternative Is Right for You?</h2>
          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-6">
            <p className="m-0"><strong className="text-white">Budget-conscious, watch on multiple platforms:</strong> Funlingo. Free, supports Prime Video, includes pronunciation and AI.</p>
          </div>
          <div className="bg-white/5 border-l-4 border-blue-500 p-6 rounded-r-lg my-6">
            <p className="m-0"><strong className="text-white">Grammar-focused, want AI speaking practice:</strong> Trancy. Pay the $9.90/month for AiTalk and grammar breakdowns.</p>
          </div>
          <div className="bg-white/5 border-l-4 border-green-500 p-6 rounded-r-lg my-6">
            <p className="m-0"><strong className="text-white">Read web articles more than watch shows:</strong> Immersive Translate. Or pair Funlingo (for video) with Immersive Translate (for the web).</p>
          </div>
          <div className="bg-white/5 border-l-4 border-orange-500 p-6 rounded-r-lg my-6">
            <p className="m-0"><strong className="text-white">Learning English specifically, like gamification:</strong> eJOY English. Cheaper than Language Reactor with stronger review tools.</p>
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "What's the best free alternative to Language Reactor?", a: "Funlingo. It's the only fully free alternative that matches or exceeds Language Reactor on dual subtitles, while adding Prime Video support, per-word pronunciation, and a multi-translation selector. Language Reactor's free tier locks vocabulary saving and several playback features behind Pro." },
              { q: "Does Language Reactor work on Amazon Prime Video?", a: "No. Language Reactor only supports Netflix and YouTube. Funlingo is currently the only free Chrome extension that supports all three major streaming platforms (Netflix, YouTube, and Prime Video) with dual subtitles." },
              { q: "Is Language Reactor still free in 2026?", a: "Yes, the free tier still exists. It includes basic dual subtitles on supported platforms. But the features most learners actually want — phrase saving, vocabulary review, human-reviewed translations, advanced playback controls — are gated behind Language Reactor Pro at $7.99/month." },
              { q: "Can I use Funlingo and Language Reactor at the same time?", a: "Technically yes, but it's not recommended. Two subtitle-overlay extensions running on the same Netflix tab can produce duplicate subtitle lines or visual glitches. Pick one for active viewing and disable the other to keep the player clean." },
              { q: "Which alternative supports the most languages?", a: "Funlingo supports 100+ languages for translation. Language Reactor supports a similar range. Most alternatives in this list support 50+ languages. The bigger differentiator is usually feature depth (pronunciation, vocab, AI) rather than language count." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                <h4 className="font-bold text-white text-lg mb-2">Q: {faq.q}</h4>
                <p className="text-gray-400 m-0">A: {faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">The Free Way to Replace Language Reactor</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Funlingo gives you dual subtitles on Netflix, YouTube, and Prime Video, plus word lookups and pronunciation — all free, no account needed.</p>
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
