"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Check, X, ArrowRight, BookOpen, Globe, Star, Smartphone, Languages } from "lucide-react";
import { KeyTakeaways, StatGrid, DualSubtitleDemo } from "@/app/blog/_components/graphics";

export default function EnglishVietnameseDictionaryContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-[var(--bg)] to-[var(--bg)] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(200,31,212,0.1)] text-[#C81FD4] border-[#C81FD4]/20 px-3 py-1">Dictionary</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">Best English-Vietnamese Dictionary Apps &amp; Sites (2026)</h1>
          <p className="text-lg text-[var(--text-dim)] max-w-2xl mx-auto lg:mx-0">The definitive guide to choosing the right eng viet dict for vocabulary building, translation, and learning Vietnamese through real content.</p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[var(--text-dim)] font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 21, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-[var(--text-dim)]">

          <KeyTakeaways items={["A good eng-viet dict must show tone marks, multiple meanings, and native-speaker audio, since Vietnamese has six tones that change a word's meaning.", "Top all-rounders are VDICT and Laban Dictionary; TFlat is best for spaced-repetition flashcards and Glosbe for real-world sentence examples.", "Several apps (Laban, TFlat, EVD, Dict Box) work fully offline, which is useful when traveling in Vietnam.", "Vietnamese grammar is actually simpler than many Asian languages: no conjugation, gender, or plurals, and it uses the Latin alphabet.", "Pair a dictionary with watching real content using Funlingo's free dual Vietnamese-plus-English subtitles to see words in context."]} />

          {/* --- Why a good dictionary matters --- */}
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Why a Good English-Vietnamese Dictionary Matters</h2>
          <p className="leading-relaxed text-[var(--text-dim)] mb-6">Vietnamese is one of the fastest-growing languages for learners worldwide. Over 85 million native speakers call it their first language, and the Vietnamese diaspora spans the United States, Australia, France, and beyond. Whether you are planning a trip to Hanoi, building a relationship with Vietnamese family members, consuming Vietnamese media, or doing business in Ho Chi Minh City, you need a reliable English-Vietnamese dictionary — an eng viet dict you can trust for accuracy, pronunciation, and context.</p>
          <p className="leading-relaxed text-[var(--text-dim)] mb-6">The problem is that Vietnamese and English are vastly different languages. Vietnamese is tonal (six tones change the meaning of a word entirely), uses a Latin-based script with extensive diacritical marks, and has grammar patterns that do not map to English at all. A bad dictionary gives you a single translation without tone marks, context, or usage examples — which is almost useless for a tonal language. A good dictionary gives you pronunciation with tones, multiple meanings, example sentences, and ideally audio from native speakers.</p>
          <p className="lead text-xl leading-relaxed text-[var(--text)] mb-6">This guide compares the 10 best English-Vietnamese dictionary apps and websites available in 2026, explains Vietnamese tones, lists essential phrases, and shows you how to learn Vietnamese through content you actually enjoy watching.</p>

          <StatGrid stats={[{ value: "85M+", label: "native Vietnamese speakers" }, { value: "6", label: "tones that change meaning" }, { value: "10", label: "dictionaries compared" }]} />

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <p className="text-lg text-[var(--text)] mb-6">Learn Vietnamese naturally with free dual subtitles on YouTube and Netflix.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-[var(--border)] my-12" />

          {/* --- Top 10 Dictionaries --- */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><BookOpen className="w-6 h-6 inline mr-2 text-[#C81FD4]" />Top 10 English-Vietnamese Dictionaries Compared</h2>
          <p className="text-[var(--text-dim)] mb-6">We tested every major English-Vietnamese dictionary app and website in 2026. Here are the top 10, ranked by usefulness for learners and everyday translation needs.</p>

          {/* 1. VDICT */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">1. VDICT</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Web &amp; App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">VDICT (vdict.com) is one of the oldest and most comprehensive English-Vietnamese dictionaries online. Built specifically for Vietnamese learners, it offers detailed definitions, example sentences, related phrases, and synonym suggestions. The database is enormous — covering technical, medical, legal, and everyday vocabulary that general translators miss entirely.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Web, Android, iOS</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free (ad-supported)</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Massive vocabulary database, example sentences, Vietnamese-English and English-Vietnamese lookup, specialized terminology</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Huge database</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Example sentences</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Dated interface</span></div>
            </div>
          </div>

          {/* 2. Laban Dictionary */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">2. Laban Dictionary</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Web &amp; App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">Laban Dictionary is the most popular English-Vietnamese dictionary app in Vietnam with over 10 million downloads. It features offline support, native speaker audio pronunciation, daily vocabulary quizzes, and a clean modern interface. The app includes both English-Vietnamese and Vietnamese-English directions, plus a built-in grammar reference.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Web (laban.vn), Android, iOS</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free with premium option ($2.99/month)</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Offline mode, audio pronunciation, daily quizzes, grammar tips, vocabulary flashcards</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Offline mode</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Audio pronunciation</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Ads on free tier</span></div>
            </div>
          </div>

          {/* 3. Tra Tu */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">3. Tra Tu (Tra T&#7915;)</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Web &amp; App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">Tra Tu (tratu.soha.vn) is a well-established Vietnamese dictionary portal that aggregates results from multiple dictionary sources in a single lookup. When you search a word, you see definitions from several Vietnamese-English dictionaries simultaneously, giving you a more complete picture of how a word is used. It also includes idiom lookups and sentence examples.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Web, Android</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Multi-source definitions, idiom database, sentence examples, Vietnamese interface</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Multiple sources</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Idiom support</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Vietnamese-only UI</span></div>
            </div>
          </div>

          {/* 4. Google Translate */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">4. <a href="https://translate.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">Google Translate</a></h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Web &amp; App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">Google Translate needs no introduction. It handles English-Vietnamese translation for sentences and paragraphs, offers camera translation for signs and menus, and supports real-time conversation mode. Vietnamese translation quality has improved significantly with Neural Machine Translation, though it still struggles with tonal nuances and idiomatic Vietnamese expressions.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Web, Android, iOS, Chrome extension</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Camera translation, conversation mode, offline packs, 130+ languages, text-to-speech</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Camera mode</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Conversation mode</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Weak on idioms</span></div>
            </div>
          </div>

          {/* 5. TFlat Dictionary */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">5. TFlat Dictionary</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">TFlat is a lightweight English-Vietnamese dictionary app beloved for its speed and simplicity. It works fully offline, launches instantly, and provides clear definitions with phonetic transcription. The built-in flashcard system uses spaced repetition to help you memorize vocabulary, and the &quot;word of the day&quot; feature keeps your learning consistent.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Android, iOS</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free (ad-supported), Premium $1.99</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Full offline support, flashcards with spaced repetition, word of the day, fast lookup</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Fast &amp; lightweight</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Spaced repetition</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">No web version</span></div>
            </div>
          </div>

          {/* 6. EVD */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">6. English Vietnamese Dictionary (EVD)</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">EVD is a straightforward dictionary app that focuses on doing one thing well: fast, accurate English-to-Vietnamese and Vietnamese-to-English lookups. It includes over 350,000 entries, pronunciation guides, and the ability to save favorite words for later review. The interface is clean and distraction-free.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Android, iOS</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> 350,000+ entries, favorites list, pronunciation guides, bidirectional lookup</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">350K+ entries</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Clean interface</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Limited examples</span></div>
            </div>
          </div>

          {/* 7. Dict Box */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">7. Dict Box</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">App</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">Dict Box is a multi-language dictionary app with a strong English-Vietnamese module. Its standout feature is the &quot;tap to translate&quot; bubble that works across any app on your phone — you can look up Vietnamese words while reading articles, chatting, or browsing without switching apps. It also supports offline dictionaries that you download once and use anywhere.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Android, iOS</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free, Premium $4.99/year</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Tap-to-translate overlay, offline dictionaries, multi-language support, word history</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Tap-to-translate</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Works in any app</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Premium for full features</span></div>
            </div>
          </div>

          {/* 8. Vietgle */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">8. Vietgle</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Web</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">Vietgle (vietgle.vn) is a Vietnamese-developed dictionary and translation platform that combines dictionary lookups with sentence-level translation. It is particularly strong for Vietnamese-to-English translation, offering contextual definitions that account for Vietnamese grammar patterns. The platform also includes a thesaurus and word-origin information for Vietnamese vocabulary.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Web</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Sentence translation, contextual definitions, thesaurus, Vietnamese word origins</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Contextual definitions</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Vietnamese-developed</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Web only</span></div>
            </div>
          </div>

          {/* 9. Oxford Vietnamese Dictionary */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">9. Oxford Vietnamese Dictionary</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Print &amp; Digital</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">The Oxford English-Vietnamese Dictionary remains the gold standard for academic and professional use. With over 100,000 entries and detailed usage notes, it provides the most authoritative definitions available. The digital edition integrates with Oxford&apos;s online platform and offers audio pronunciation for both English and Vietnamese entries. It is the reference that other dictionaries are measured against.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Print, Digital (Oxford online)</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> $30-50 (print), subscription (digital)</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> 100,000+ entries, academic authority, usage notes, audio pronunciation</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Most authoritative</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Usage notes</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">Paid access</span></div>
            </div>
          </div>

          {/* 10. Glosbe */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-[var(--text)]">10. Glosbe</h3>
              <span className="text-xs text-[var(--text-dim)] bg-[var(--surface-2)] px-2 py-1 rounded">Web</span>
            </div>
            <p className="text-[var(--text-dim)] mb-3">Glosbe is a community-driven multilingual dictionary that shines for English-Vietnamese because of its &quot;translation memory&quot; feature. It pulls real sentence pairs from translated documents, subtitles, and parallel texts — so you see how words and phrases are actually translated in real-world contexts rather than just dictionary definitions. This makes it invaluable for understanding natural usage.</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Platform:</strong> Web</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Price:</strong> Free</p>
            <p className="text-[var(--text-dim)] text-sm mb-2"><strong className="text-[var(--text)]">Key features:</strong> Translation memory, real sentence examples, community-driven, 6000+ language pairs</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Real sentence pairs</span></div>
              <div><Check className="w-4 h-4 inline text-emerald-400 mr-1" /><span className="text-[var(--text-dim)]">Community-driven</span></div>
              <div><X className="w-4 h-4 inline text-red-400 mr-1" /><span className="text-[var(--text-dim)]">No app</span></div>
            </div>
          </div>

          <hr className="border-[var(--border)] my-12" />

          {/* --- Comparison Table --- */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><Star className="w-6 h-6 inline mr-2 text-[#C81FD4]" />English-Vietnamese Dictionary Comparison Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm text-left border border-[var(--border)] rounded-xl overflow-hidden">
              <thead className="bg-[var(--surface)]">
                <tr>
                  <th className="px-4 py-3 text-[var(--text)] font-semibold">Dictionary</th>
                  <th className="px-4 py-3 text-[var(--text)] font-semibold">Platform</th>
                  <th className="px-4 py-3 text-[var(--text)] font-semibold">Price</th>
                  <th className="px-4 py-3 text-[var(--text)] font-semibold">Offline</th>
                  <th className="px-4 py-3 text-[var(--text)] font-semibold">Audio</th>
                  <th className="px-4 py-3 text-[var(--text)] font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-dim)]">
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">VDICT</td><td className="px-4 py-3">Web, App</td><td className="px-4 py-3">Free</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3">Comprehensive lookups</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Laban Dictionary</td><td className="px-4 py-3">Web, App</td><td className="px-4 py-3">Free / $2.99/mo</td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3">Daily learners</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Tra Tu</td><td className="px-4 py-3">Web, Android</td><td className="px-4 py-3">Free</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3">Multi-source definitions</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Google Translate</td><td className="px-4 py-3">Web, App</td><td className="px-4 py-3">Free</td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3">Quick translations</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">TFlat</td><td className="px-4 py-3">App</td><td className="px-4 py-3">Free / $1.99</td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3">Flashcard learners</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">EVD</td><td className="px-4 py-3">App</td><td className="px-4 py-3">Free</td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3">Simple lookups</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Dict Box</td><td className="px-4 py-3">App</td><td className="px-4 py-3">Free / $4.99/yr</td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3">In-app translation</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Vietgle</td><td className="px-4 py-3">Web</td><td className="px-4 py-3">Free</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3">Contextual definitions</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Oxford Vietnamese</td><td className="px-4 py-3">Print, Digital</td><td className="px-4 py-3">$30-50</td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-emerald-400" /></td><td className="px-4 py-3">Academic use</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="px-4 py-3 font-medium text-[var(--text)]">Glosbe</td><td className="px-4 py-3">Web</td><td className="px-4 py-3">Free</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3">Real-world examples</td></tr>
              </tbody>
            </table>
          </div>

          <hr className="border-[var(--border)] my-12" />

          {/* --- Vietnamese Tones --- */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><Languages className="w-6 h-6 inline mr-2 text-[#C81FD4]" />Vietnamese Tones Explained</h2>
          <p className="text-[var(--text-dim)] mb-6">Vietnamese is a tonal language with six distinct tones. The same syllable pronounced with different tones becomes a completely different word. This is why a good eng viet dict must show tone marks — without them, you cannot pronounce or understand Vietnamese correctly.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Ngang (level) — a</span><span className="text-[var(--text-dim)]">Mid-level, flat tone</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">S&#7855;c (rising) — &#225;</span><span className="text-[var(--text-dim)]">Starts mid, rises sharply</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Huy&#7873;n (falling) — &#224;</span><span className="text-[var(--text-dim)]">Starts mid, falls gradually</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">H&#7887;i (dipping-rising) — &#7843;</span><span className="text-[var(--text-dim)]">Dips down then rises</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Ng&#227; (rising glottalized) — &#227;</span><span className="text-[var(--text-dim)]">Rises with a glottal stop in the middle</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">N&#7863;ng (low glottalized) — &#7841;</span><span className="text-[var(--text-dim)]">Drops low with a heavy stop</span></div>
            </div>
          </div>

          <p className="text-[var(--text-dim)] mb-6">A classic example: the syllable &quot;ma&quot; with each tone means something entirely different — ma (ghost), m&#225; (cheek/mother in southern dialect), m&#224; (but/which), m&#7843; (tomb), m&#227; (horse/code), m&#7841; (rice seedling). This is why tone marks in any English-Vietnamese dictionary are non-negotiable for learners.</p>

          <hr className="border-[var(--border)] my-12" />

          {/* --- Essential Phrases --- */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><Globe className="w-6 h-6 inline mr-2 text-[#C81FD4]" />Essential Vietnamese Phrases for Beginners</h2>
          <p className="text-[var(--text-dim)] mb-6">These are the phrases you will use most often when starting to learn Vietnamese. Practice these with audio from any of the dictionary apps above, and pay close attention to the tone marks.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Greetings &amp; Basics</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Xin ch&#224;o</span><span className="text-[var(--text-dim)]">Hello</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">T&#7841;m bi&#7879;t</span><span className="text-[var(--text-dim)]">Goodbye</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">C&#7843;m &#417;n</span><span className="text-[var(--text-dim)]">Thank you</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Xin l&#7895;i</span><span className="text-[var(--text-dim)]">Sorry / Excuse me</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">V&#226;ng / D&#7841;</span><span className="text-[var(--text-dim)]">Yes (North / South)</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Kh&#244;ng</span><span className="text-[var(--text-dim)]">No</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">B&#7841;n kh&#7887;e kh&#244;ng?</span><span className="text-[var(--text-dim)]">How are you?</span></div>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Travel &amp; Getting Around</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Bao nhi&#234;u ti&#7873;n?</span><span className="text-[var(--text-dim)]">How much does it cost?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">&#7902; &#273;&#226;u?</span><span className="text-[var(--text-dim)]">Where is it?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">T&#244;i mu&#7889;n &#273;i...</span><span className="text-[var(--text-dim)]">I want to go to...</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">B&#7841;n n&#243;i ti&#7871;ng Anh kh&#244;ng?</span><span className="text-[var(--text-dim)]">Do you speak English?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">T&#244;i kh&#244;ng hi&#7875;u</span><span className="text-[var(--text-dim)]">I don&apos;t understand</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Nh&#224; v&#7879; sinh &#7903; &#273;&#226;u?</span><span className="text-[var(--text-dim)]">Where is the bathroom?</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">G&#7885;i xe gi&#250;p t&#244;i</span><span className="text-[var(--text-dim)]">Call a car for me</span></div>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Food &amp; Dining</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">T&#244;i mu&#7889;n g&#7885;i...</span><span className="text-[var(--text-dim)]">I would like to order...</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Ngon qu&#225;!</span><span className="text-[var(--text-dim)]">Delicious!</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">T&#237;nh ti&#7873;n</span><span className="text-[var(--text-dim)]">Check, please</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Kh&#244;ng cay</span><span className="text-[var(--text-dim)]">Not spicy</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">M&#7897;t ly c&#224; ph&#234;</span><span className="text-[var(--text-dim)]">One cup of coffee</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Ph&#7903; b&#242;</span><span className="text-[var(--text-dim)]">Beef pho</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">B&#225;nh m&#236;</span><span className="text-[var(--text-dim)]">Vietnamese baguette sandwich</span></div>
            </div>
          </div>

          <hr className="border-[var(--border)] my-12" />

          {/* --- Learning Vietnamese with Content --- */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><Smartphone className="w-6 h-6 inline mr-2 text-[#C81FD4]" />How to Learn Vietnamese with Shows &amp; YouTube</h2>
          <p className="text-[var(--text-dim)] mb-6">A dictionary is essential, but it only teaches you words in isolation. To actually understand Vietnamese — how sentences are constructed, how tone changes meaning in conversation, how people speak at natural speed — you need to hear and see the language in context. Vietnamese content on YouTube, Netflix, and Prime Video is one of the best resources available.</p>
          <p className="text-[var(--text-dim)] mb-6">Vietnamese YouTube is massive. Channels covering cooking, travel, comedy, tech reviews, and daily vlogs give you hours of authentic Vietnamese speech with visual context that helps you understand even when you miss words. Vietnamese dramas on Netflix and Prime Video offer longer-form storytelling with emotional range and everyday dialogue patterns.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">Recommended Vietnamese Content for Learners</h3>
            <ul className="space-y-3 text-[var(--text-dim)]">
              <li><strong className="text-[var(--text)]">Vietnamese cooking channels on YouTube</strong> — Simple vocabulary, clear speech, visual context from food preparation. Try channels featuring ph&#7903;, b&#225;nh m&#236;, and regional dishes.</li>
              <li><strong className="text-[var(--text)]">Vietnamese travel vlogs</strong> — Casual conversational Vietnamese with stunning visuals from Hanoi, Da Nang, Hoi An, and Ho Chi Minh City.</li>
              <li><strong className="text-[var(--text)]">Vietnamese music videos with lyrics</strong> — V-pop is growing fast. Music helps you internalize tones and rhythm naturally.</li>
              <li><strong className="text-[var(--text)]">Vietnamese dramas on Netflix</strong> — Longer dialogue scenes let you practice sustained listening and pick up emotional vocabulary.</li>
              <li><strong className="text-[var(--text)]">Vietnamese news channels</strong> — Formal register, clear pronunciation, current events vocabulary for intermediate learners.</li>
            </ul>
          </div>

          <p className="text-[var(--text-dim)] mb-6">The key is watching with dual subtitles — Vietnamese subtitles on top, English subtitles below. You hear the Vietnamese, read the Vietnamese text (reinforcing reading skills and tone marks), and check the English translation when needed. Over time, you rely on the English less and less.</p>

          <DualSubtitleDemo targetLang="Vietnamese" target="Cảm ơn bạn rất nhiều." highlight="Cảm ơn" native="Thank you very much." />

          <hr className="border-[var(--border)] my-12" />

          {/* --- How Funlingo Helps --- */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">How Funlingo Helps You Learn Vietnamese with Dual Subtitles</h2>
          <p className="text-[var(--text-dim)] mb-6">Funlingo is a free Chrome extension that adds dual subtitles to YouTube, Netflix, and Prime Video. For Vietnamese learners, this means you can watch any Vietnamese video with both Vietnamese and English subtitles displayed simultaneously — no setup, no configuration, no subscription fees.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[#C81FD4]/30 mb-8">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">What Funlingo Does for Vietnamese Learners</h3>
            <ul className="space-y-3 text-[var(--text-dim)]">
              <li><Check className="w-4 h-4 inline text-emerald-400 mr-2" /><strong className="text-[var(--text)]">Dual subtitles</strong> — See Vietnamese and English side by side while watching any video</li>
              <li><Check className="w-4 h-4 inline text-emerald-400 mr-2" /><strong className="text-[var(--text)]">Works on YouTube, Netflix, and Prime Video</strong> — One extension covers the three biggest video platforms</li>
              <li><Check className="w-4 h-4 inline text-emerald-400 mr-2" /><strong className="text-[var(--text)]">Click any word for instant translation</strong> — Tap a Vietnamese word in the subtitle to see its English meaning without leaving the video</li>
              <li><Check className="w-4 h-4 inline text-emerald-400 mr-2" /><strong className="text-[var(--text)]">See Vietnamese tones in context</strong> — Subtitles show proper diacritical marks so you learn correct tones from real content</li>
              <li><Check className="w-4 h-4 inline text-emerald-400 mr-2" /><strong className="text-[var(--text)]">Completely free</strong> — No trial period, no credit card, no premium tier</li>
            </ul>
          </div>

          <p className="text-[var(--text-dim)] mb-6">A dictionary tells you what a word means. Funlingo shows you how that word is actually used — in a conversation, in a story, in a song. The combination of a solid eng viet dict and Funlingo&apos;s dual subtitles gives you both the reference tool and the immersion experience you need to learn Vietnamese effectively.</p>

          <p className="text-[var(--text-dim)] mb-6">For more on how dual subtitles accelerate language learning, read our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C81FD4] hover:underline">how to learn a language by watching</a>.</p>

          <hr className="border-[var(--border)] my-12" />

          {/* --- FAQ --- */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-12">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-[var(--text)] block mb-1">What is the best English-Vietnamese dictionary app?</strong><p className="text-[var(--text-dim)] text-sm">For comprehensive definitions, VDICT and Laban Dictionary are the top choices. For quick translations, Google Translate works well. For vocabulary building with spaced repetition, TFlat is excellent. For learning Vietnamese through real content, Funlingo provides free dual subtitles on YouTube and Netflix so you can see Vietnamese and English side by side.</p></div>

              <div><strong className="text-[var(--text)] block mb-1">Is Vietnamese hard to learn for English speakers?</strong><p className="text-[var(--text-dim)] text-sm">Vietnamese has a steep initial learning curve due to its tonal system (6 tones) and unfamiliar sounds. However, Vietnamese grammar is simpler than many Asian languages — no conjugation, no grammatical gender, and no plurals. Vietnamese uses the Latin alphabet (with diacritics), so you do not need to learn a new script. With consistent exposure through media and a good dictionary, beginners can make fast progress.</p></div>

              <div><strong className="text-[var(--text)] block mb-1">Can I use an English-Vietnamese dictionary offline?</strong><p className="text-[var(--text-dim)] text-sm">Yes. Laban Dictionary, TFlat, EVD, and Dict Box all offer offline modes. You download the dictionary database once over Wi-Fi, then use it anywhere without an internet connection. This is especially useful when traveling in Vietnam where data connectivity can be spotty in rural areas.</p></div>

              <div><strong className="text-[var(--text)] block mb-1">What is the difference between Northern and Southern Vietnamese?</strong><p className="text-[var(--text-dim)] text-sm">Northern Vietnamese (Hanoi dialect) and Southern Vietnamese (Ho Chi Minh City dialect) differ in pronunciation, some vocabulary, and tone merging. Southern speakers merge the h&#7887;i and ng&#227; tones, while Northern speakers keep them distinct. Most dictionaries and language courses teach Northern Vietnamese as the standard, but Southern Vietnamese is more widely spoken globally due to diaspora patterns.</p></div>

              <div><strong className="text-[var(--text)] block mb-1">How does Funlingo help with learning Vietnamese?</strong><p className="text-[var(--text-dim)] text-sm">Funlingo is a free Chrome extension that displays Vietnamese and English subtitles simultaneously on YouTube, Netflix, and Prime Video. You hear native Vietnamese speech while reading both the Vietnamese text (with correct tone marks) and the English translation. You can click any word for instant lookup. This contextual learning approach complements dictionary study by showing you how vocabulary and grammar work in real conversations.</p></div>
            </div>
          </div>

          {/* --- Final CTA --- */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Start Learning Vietnamese with Dual Subtitles</h2>
            <p className="text-lg text-[var(--text-dim)] mb-8 max-w-xl mx-auto">Watch Vietnamese videos on YouTube and Netflix with Vietnamese and English subtitles side by side. Click any word for instant translation. Completely free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
