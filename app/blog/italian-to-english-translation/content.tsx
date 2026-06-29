"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, BookOpen, Languages, AlertTriangle, Utensils, Briefcase, MapPin } from "lucide-react";
import { KeyTakeaways, Callout, DualSubtitleDemo } from "@/app/blog/_components/graphics";

export default function ItalianToEnglishTranslationContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/40 via-[var(--bg)] to-[var(--bg)] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(200,31,212,0.1)] text-[#C81FD4] border-[#C81FD4]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">Italian to English Translation: Best Tools &amp; Tips</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[var(--text-dim)] font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 20, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-[var(--text-dim)]">
          <KeyTakeaways items={["Italian is not word-for-word: gendered nouns, flexible word order, and idioms mean literal translation often misses the real meaning.", "Use tools by task: DeepL for natural longer text, Google Translate for quick camera lookups, Reverso Context for real examples, WordReference for word-level depth.", "Watch for false friends like camera (room), libreria (bookshop), and parente (relative) that look English but mean something else.", "Translate meaning, not words: In bocca al lupo literally means in the mouth of the wolf but means good luck.", "Immersion with dual subtitles on Italian video builds an intuitive sense of how the language actually works."]} />
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Why Italian to English Translation Matters</h2>
          <p className="leading-relaxed text-[var(--text-dim)] mb-6">Whether you are traveling through Rome, reading an Italian recipe, watching a Fellini film, or communicating with Italian business partners, the need to translate from italiano to english comes up constantly. Italian is spoken by over 85 million people worldwide and is one of the most studied languages in the world.</p>
          <p className="lead text-xl leading-relaxed text-[var(--text)] mb-6">The challenge is that Italian is not a word-for-word language. Gendered nouns, flexible word order, and idiomatic expressions mean that a literal translation often misses the actual meaning. This guide covers the best tools for accurate Italian to English translation, essential phrases you should know, grammar pitfalls to watch for, and how immersion through Italian media can transform your understanding.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <p className="text-lg text-[var(--text)] mb-6">Learn Italian naturally with dual subtitles on YouTube — free with Funlingo.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><Languages className="w-6 h-6 inline mr-2 text-[#C81FD4]" />Best Italian to English Translation Tools</h2>
          <p className="text-[var(--text-dim)] mb-6">No single tool is perfect for every translation scenario. Here are the best options depending on your needs, from quick lookups to deep contextual understanding.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-3"><a href="https://translate.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">Google Translate</a></h3>
            <p className="text-[var(--text-dim)] mb-3">The most widely used translator in the world. Google Translate handles Italian to English reasonably well for short sentences and common phrases. Its camera feature lets you point your phone at Italian menus, signs, and documents for instant translation.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Best for:</strong> Quick lookups, camera translation of signs and menus, getting the gist of a text.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Limitations:</strong> Struggles with complex sentences, idiomatic expressions, and literary Italian. Often produces awkward phrasing for longer passages.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-3"><a href="https://www.deepl.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">DeepL</a></h3>
            <p className="text-[var(--text-dim)] mb-3">DeepL consistently produces more natural-sounding translations than Google Translate, especially for Italian. It handles nuance, formal vs. informal registers, and complex grammar structures better. The free tier allows 500,000 characters per month.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Best for:</strong> Longer texts, emails, business documents, and any context where natural phrasing matters.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Limitations:</strong> No camera translation, limited free tier for heavy users, does not show alternative meanings for individual words.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-3"><a href="https://www.reverso.net" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">Reverso</a> Context</h3>
            <p className="text-[var(--text-dim)] mb-3">Reverso Context is uniquely valuable because it shows your word or phrase used in real sentences from movies, books, and documents. Instead of a single translation, you see dozens of examples showing how native speakers actually use the expression.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Best for:</strong> Understanding how a word is used in context, finding the right translation for idiomatic expressions, learning natural phrasing.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Limitations:</strong> Not ideal for translating full documents or long passages. Works best for phrases and short sentences.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-3">WordReference</h3>
            <p className="text-[var(--text-dim)] mb-3">WordReference is the gold standard for dictionary-style lookups. It gives you detailed definitions, conjugation tables, example sentences, and — crucially — community forums where native speakers discuss tricky translations and nuances that no algorithm captures.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Best for:</strong> Deep word-level understanding, verb conjugations, forum discussions about tricky translations.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Limitations:</strong> Not a sentence or document translator. Works at the word and phrase level only.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[#C81FD4]/30 mb-6">
            <h3 className="text-xl font-bold text-[var(--text)] mb-3">Funlingo (Contextual Video Translation)</h3>
            <p className="text-[var(--text-dim)] mb-3">Funlingo takes a different approach: instead of translating text you paste in, it shows you Italian and English subtitles side by side while you watch Italian videos on YouTube. You hear the Italian spoken naturally, see the original text, and read the English translation simultaneously. This is contextual translation — you learn how words and phrases are actually used in conversation.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Best for:</strong> Learning Italian through immersion, understanding spoken Italian, building vocabulary in context, watching Italian content with dual subtitles.</p>
            <p className="text-[var(--text-dim)] text-sm"><strong className="text-[var(--text)]">Price:</strong> Free. No subscription required.</p>
          </div>

          <p className="text-[var(--text-dim)] mb-6">For a broader comparison of AI-powered translation tools, see our roundup of the <a href="/blog/best-ai-translator-tools" className="text-[#C81FD4] hover:underline">best AI translator tools</a>.</p>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><BookOpen className="w-6 h-6 inline mr-2 text-[#C81FD4]" />Common Italian Phrases with English Translations</h2>
          <p className="text-[var(--text-dim)] mb-6">Learning key phrases is the fastest way to start communicating in Italian. Here are essential expressions organized by category.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Greetings &amp; Basics</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Buongiorno</span><span className="text-[var(--text-dim)]">Good morning / Good day</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Buonasera</span><span className="text-[var(--text-dim)]">Good evening</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Ciao</span><span className="text-[var(--text-dim)]">Hello / Goodbye (informal)</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Arrivederci</span><span className="text-[var(--text-dim)]">Goodbye (formal)</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Come stai?</span><span className="text-[var(--text-dim)]">How are you? (informal)</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Grazie</span><span className="text-[var(--text-dim)]">Thank you</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">Per favore / Per piacere</span><span className="text-[var(--text-dim)]">Please</span></div>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4"><MapPin className="w-5 h-5 inline mr-2 text-[#C81FD4]" />Travel &amp; Directions</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Dove si trova...?</span><span className="text-[var(--text-dim)]">Where is...?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Quanto costa?</span><span className="text-[var(--text-dim)]">How much does it cost?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Mi scusi</span><span className="text-[var(--text-dim)]">Excuse me (formal)</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Parla inglese?</span><span className="text-[var(--text-dim)]">Do you speak English?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Non capisco</span><span className="text-[var(--text-dim)]">I don&apos;t understand</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">Vorrei un biglietto per...</span><span className="text-[var(--text-dim)]">I would like a ticket to...</span></div>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4"><Utensils className="w-5 h-5 inline mr-2 text-[#C81FD4]" />Food &amp; Dining</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Un tavolo per due, per favore</span><span className="text-[var(--text-dim)]">A table for two, please</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Il conto, per favore</span><span className="text-[var(--text-dim)]">The check, please</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Vorrei ordinare...</span><span className="text-[var(--text-dim)]">I would like to order...</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Che cosa mi consiglia?</span><span className="text-[var(--text-dim)]">What do you recommend?</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">Era squisito!</span><span className="text-[var(--text-dim)]">It was delicious!</span></div>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4"><Briefcase className="w-5 h-5 inline mr-2 text-[#C81FD4]" />Business &amp; Formal</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Piacere di conoscerla</span><span className="text-[var(--text-dim)]">Pleased to meet you (formal)</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Potrebbe ripetere?</span><span className="text-[var(--text-dim)]">Could you repeat that?</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Sono d&apos;accordo</span><span className="text-[var(--text-dim)]">I agree</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Mi mandi un&apos;email</span><span className="text-[var(--text-dim)]">Send me an email</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">A che ora &egrave; la riunione?</span><span className="text-[var(--text-dim)]">What time is the meeting?</span></div>
            </div>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6"><AlertTriangle className="w-6 h-6 inline mr-2 text-[#C81FD4]" />Italian Grammar Tips for English Speakers</h2>
          <p className="text-[var(--text-dim)] mb-6">Italian grammar differs from English in several important ways. Understanding these differences helps you produce and recognize accurate translations instead of relying on word-for-word conversion.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">Gendered Nouns</h3>
            <p className="text-[var(--text-dim)] mb-3">Every Italian noun is either masculine or feminine, and adjectives must match the gender of the noun they describe. There is no equivalent in English. As a general rule, nouns ending in <strong className="text-[var(--text)]">-o</strong> are masculine (il libro = the book) and nouns ending in <strong className="text-[var(--text)]">-a</strong> are feminine (la casa = the house). Nouns ending in <strong className="text-[var(--text)]">-e</strong> can be either gender and must be memorized.</p>
            <p className="text-[var(--text-dim)] text-sm">Translation impact: Adjectives, articles, and pronouns all change based on noun gender. A translator that ignores gender agreement will produce grammatically broken Italian.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">Verb Conjugations</h3>
            <p className="text-[var(--text-dim)] mb-3">Italian verbs change form based on who is performing the action, when it happened, and the mood of the sentence. Where English uses &quot;I speak, you speak, he speaks,&quot; Italian has <strong className="text-[var(--text)]">parlo, parli, parla, parliamo, parlate, parlano</strong> — six distinct forms just for the present tense. This means the subject pronoun is often dropped entirely because the verb itself tells you who is speaking.</p>
            <p className="text-[var(--text-dim)] text-sm">Translation impact: Machine translators sometimes add unnecessary pronouns or choose the wrong conjugation. WordReference&apos;s conjugation tables are invaluable here.</p>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">False Friends (Falsi Amici)</h3>
            <p className="text-[var(--text-dim)] mb-3">Italian and English share many Latin-derived words, but some look similar while meaning completely different things. These false cognates can trip up translators and learners alike.</p>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Camera</span><span className="text-[var(--text-dim)]">Means &quot;room&quot; not &quot;camera&quot;</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Firma</span><span className="text-[var(--text-dim)]">Means &quot;signature&quot; not &quot;firm/company&quot;</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Libreria</span><span className="text-[var(--text-dim)]">Means &quot;bookshop&quot; not &quot;library&quot;</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Parente</span><span className="text-[var(--text-dim)]">Means &quot;relative&quot; not &quot;parent&quot;</span></div>
              <div className="flex justify-between border-b border-[var(--border)] pb-2"><span className="text-[var(--text)] font-medium">Sensibile</span><span className="text-[var(--text-dim)]">Means &quot;sensitive&quot; not &quot;sensible&quot;</span></div>
              <div className="flex justify-between"><span className="text-[var(--text)] font-medium">Annoiare</span><span className="text-[var(--text-dim)]">Means &quot;to bore&quot; not &quot;to annoy&quot;</span></div>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-6">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">Word Order Differences</h3>
            <p className="text-[var(--text-dim)]">Italian generally follows Subject-Verb-Object order like English, but adjectives usually come <em>after</em> the noun (una macchina rossa = a red car, literally &quot;a car red&quot;). Certain common adjectives like buono (good), bello (beautiful), and grande (big) can come before the noun, but their placement can subtly change the meaning. Automatic translators handle basic word order well but sometimes produce unnatural phrasing with more complex sentences.</p>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Tips for More Accurate Italian to English Translation</h2>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <ul className="space-y-4 text-[var(--text-dim)]">
              <li><strong className="text-[var(--text)]">Use multiple tools together.</strong> Run your text through DeepL for a natural translation, then check key words on WordReference for nuance. Reverso Context fills in the gaps for idiomatic expressions.</li>
              <li><strong className="text-[var(--text)]">Translate meaning, not words.</strong> Italian expressions like &quot;In bocca al lupo&quot; (literally &quot;In the mouth of the wolf&quot;) mean &quot;Good luck.&quot; A word-for-word translation makes no sense. Always consider the intended meaning.</li>
              <li><strong className="text-[var(--text)]">Pay attention to register.</strong> Italian distinguishes strongly between formal (Lei) and informal (tu) address. A good translation preserves this distinction — &quot;Could you please&quot; vs. &quot;Can you&quot; in English.</li>
              <li><strong className="text-[var(--text)]">Check verb tenses carefully.</strong> Italian has tenses that do not map cleanly to English. The passato prossimo and imperfetto both translate to English past tense, but they describe different types of past actions. Context determines which English tense to use.</li>
              <li><strong className="text-[var(--text)]">Read the translation out loud.</strong> If it sounds awkward when spoken, it probably needs reworking. Natural translations should flow as if they were originally written in the target language.</li>
            </ul>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">How Watching Italian Shows with Dual Subtitles Helps Translation Skills</h2>
          <p className="text-[var(--text-dim)] mb-6">Reading about translation rules is useful, but nothing teaches you how Italian actually works like hearing it spoken by native speakers in real contexts. Italian cinema and television — from classic Fellini to modern Netflix series like &quot;Suburra&quot; and &quot;Baby&quot; — provide hours of authentic Italian with natural pacing, slang, regional accents, and emotional nuance that no textbook captures.</p>
          <p className="text-[var(--text-dim)] mb-6">Watching with dual subtitles lets you see the Italian text and English translation simultaneously. Over time, you start recognizing patterns: how Italian structures sentences, which words are used in specific contexts, and how idiomatic expressions function. This builds an intuitive sense of translation that complements your tool-based approach.</p>

          <DualSubtitleDemo targetLang="Italian" target="In bocca al lupo per l'esame!" highlight="bocca" native="Good luck on the exam!" />

          <Callout variant="tip" title="Pair tools with immersion">Run a passage through DeepL for the gist, then watch related Italian videos with dual subtitles to hear those words in real context.</Callout>
          <p className="text-[var(--text-dim)] mb-6">For a deeper dive into using Netflix as a language learning tool, read our guide on <a href="/blog/netflix-language-learning" className="text-[#C81FD4] hover:underline">Netflix language learning strategies</a>.</p>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-8">
            <h3 className="text-lg font-bold text-[var(--text)] mb-3">What to Watch in Italian</h3>
            <ul className="space-y-3 text-[var(--text-dim)]">
              <li><strong className="text-[var(--text)]">Italian cooking shows on YouTube</strong> — Everyday vocabulary, clear speech, visual context that helps you understand without reading subtitles.</li>
              <li><strong className="text-[var(--text)]">Italian news clips</strong> — Formal register, clear pronunciation, current events vocabulary.</li>
              <li><strong className="text-[var(--text)]">Italian travel vlogs</strong> — Casual conversational Italian with visual context from real Italian cities and towns.</li>
              <li><strong className="text-[var(--text)]">Italian film trailers</strong> — Short, dense, and emotionally charged. Great for picking up expressive phrases and natural dialogue rhythm.</li>
            </ul>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-12">
            <h3 className="text-xl font-bold text-[var(--text)] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-[var(--text)] block mb-1">What is the most accurate Italian to English translator?</strong><p className="text-[var(--text-dim)] text-sm">DeepL is widely considered the most accurate general-purpose Italian to English translator for text. For contextual translations while watching Italian shows or videos, Funlingo provides real-time dual subtitles that preserve natural meaning. WordReference is best for detailed word lookups with example sentences and forum discussions.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">Is Italian hard to learn for English speakers?</strong><p className="text-[var(--text-dim)] text-sm">Italian is one of the easiest languages for English speakers to learn. The US Foreign Service Institute classifies it as a Category I language, requiring roughly 600 to 750 hours to achieve professional proficiency. Italian shares many cognates with English, has mostly phonetic spelling, and follows predictable pronunciation rules.</p></div>
              <div><strong className="text-[var(--text)] block mb-1">How do you say common phrases in Italian?</strong><p className="text-[var(--text-dim)] text-sm">Essential phrases include: Buongiorno (Good morning), Grazie (Thank you), Per favore (Please), Mi scusi (Excuse me), Quanto costa? (How much does it cost?), Parla inglese? (Do you speak English?), and Dove si trova...? (Where is...?). See the full phrase list above for greetings, travel, food, and business expressions.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Learn Italian Naturally with Dual Subtitles</h2>
            <p className="text-lg text-[var(--text-dim)] mb-8 max-w-xl mx-auto">Watch Italian videos on YouTube with Italian and English subtitles side by side. Click any word for instant translation. Completely free.</p>
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
