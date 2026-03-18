"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, BookOpen, Headphones, Repeat, Film, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LearnJapaneseWithAnimeContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Learn Japanese with Anime: A Beginner&apos;s 2026 Guide</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 18, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> FunLingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Why Anime Works for Learning Japanese</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Anime is one of the most accessible windows into spoken Japanese. Unlike textbook audio, anime gives you emotionally rich, context-heavy dialogue. You hear how pitch, tone, and formality shift between characters — something no flashcard deck can teach.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">The catch? Watching anime passively will not teach you Japanese. You need a method. This guide gives you one: a structured, daily approach that turns anime episodes into focused language lessons using dual subtitles, shadowing, and active recall.</p>
          <p className="text-gray-300 mb-6">If you are new to learning through media, start with our overview on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a> for the general principles.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Watch anime with dual subtitles for free using FunLingo on YouTube.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try FunLingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step 1: Pick the Right Anime for Your Level</h2>
          <p className="text-gray-300 mb-6">Not all anime is created equal for language learning. Action-heavy series with fantasy vocabulary and shouted attack names will not help you order food in Tokyo. Choose anime that matches your current level and uses the type of Japanese you actually want to speak.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-xl font-bold text-white mb-4"><BookOpen className="w-5 h-5 inline mr-2 text-[#C642FC]" />Beginner-Friendly Anime</h3>
            <ul className="space-y-3 text-gray-300">
              <li><strong className="text-white">Shirokuma Cafe (Polar Bear Cafe)</strong> — Slow, clear dialogue about everyday topics. Characters speak politely, making it ideal for picking up natural conversational patterns.</li>
              <li><strong className="text-white">Teasing Master Takagi-san</strong> — Simple school-life conversations between two students. Short sentences, common vocabulary, and lots of repetition.</li>
              <li><strong className="text-white">Chi&apos;s Sweet Home</strong> — A show about a kitten. Episodes are 3 minutes long, the vocabulary is basic, and the sentences are short. Perfect for absolute beginners.</li>
              <li><strong className="text-white">Rilakkuma and Kaoru</strong> — Gentle slice-of-life with a working adult. Introduces workplace vocabulary and casual speech in a relaxed format.</li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-xl font-bold text-white mb-4"><Film className="w-5 h-5 inline mr-2 text-[#C642FC]" />Intermediate Anime</h3>
            <ul className="space-y-3 text-gray-300">
              <li><strong className="text-white">March Comes in Like a Lion</strong> — Rich character-driven dialogue about life, loss, and relationships. Great for emotional vocabulary and keigo (polite speech).</li>
              <li><strong className="text-white">Barakamon</strong> — A calligrapher moves to a rural island. Mix of standard and regional Japanese, plus lots of natural, unscripted-feeling conversations.</li>
              <li><strong className="text-white">Silver Spoon</strong> — Agricultural school setting. Introduces topic-specific vocabulary while keeping dialogue grounded and conversational.</li>
              <li><strong className="text-white">Spy x Family</strong> — A mix of formal and casual speech. The family dynamic introduces vocabulary around home, school, and social situations.</li>
            </ul>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step 2: Set Up Dual Subtitles</h2>
          <p className="text-gray-300 mb-6">The foundation of this method is watching with two sets of subtitles: Japanese and your native language displayed simultaneously. This lets you read the original Japanese text while immediately checking meaning below it — no pausing, no tab-switching, no dictionary apps.</p>
          <p className="text-gray-300 mb-6">FunLingo adds dual subtitles to YouTube for free. Many anime episodes, clips, and full series are available on YouTube with Japanese subtitles. Install the <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-[#C642FC] hover:underline">FunLingo Chrome extension</a>, open a video, and select your target and native languages.</p>
          <p className="text-gray-300 mb-6">For a deeper look at dual subtitle tools, see our comparison of the <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">7 best dual subtitle extensions</a>.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30 mb-8">
            <h3 className="text-lg font-bold text-white mb-3">Quick Setup</h3>
            <ol className="space-y-2 text-gray-300 list-decimal list-inside">
              <li>Install FunLingo from the Chrome Web Store</li>
              <li>Open any anime video on YouTube</li>
              <li>Click the FunLingo icon and select Japanese + your native language</li>
              <li>Both subtitle tracks appear on screen as the video plays</li>
            </ol>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step 3: The 3-Pass Episode Method</h2>
          <p className="text-gray-300 mb-6">Watching an episode once is entertainment. Watching it three times with different focus areas is a language lesson. Here is how to structure your passes for maximum retention.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-[#C642FC] mb-2">1</div>
              <h3 className="text-lg font-bold text-white mb-2">Watch for Story</h3>
              <p className="text-sm text-gray-400">First pass: dual subtitles on. Focus on understanding the story. Do not pause or look things up. Let your brain absorb the sounds and patterns naturally.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-[#C642FC] mb-2">2</div>
              <h3 className="text-lg font-bold text-white mb-2">Study the Language</h3>
              <p className="text-sm text-gray-400">Second pass: pause at new words. Click words in FunLingo to see definitions. Save 5 to 10 words to your vocabulary list. Read the Japanese subtitle before checking the translation.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-[#C642FC] mb-2">3</div>
              <h3 className="text-lg font-bold text-white mb-2">Shadow and Speak</h3>
              <p className="text-sm text-gray-400">Third pass: Japanese subtitles only. Pause after each line and repeat it out loud, matching the speaker&apos;s rhythm and intonation. This is shadowing — it builds pronunciation and recall.</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">You do not need to do all three passes in one sitting. Spread them across the day: watch during lunch, study after dinner, shadow before bed.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step 4: Use Shadowing to Build Pronunciation</h2>
          <p className="text-gray-300 mb-6">Shadowing is the single most effective technique for improving your Japanese pronunciation. The concept is simple: listen to a line, pause, and repeat it out loud as accurately as you can. Match the rhythm, pitch accent, and emotion of the original speaker.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-xl font-bold text-white mb-4"><Headphones className="w-5 h-5 inline mr-2 text-[#C642FC]" />How to Shadow Effectively</h3>
            <ul className="space-y-3 text-gray-300">
              <li><strong className="text-white">Start with short lines.</strong> One sentence at a time. Do not try to shadow entire conversations at first.</li>
              <li><strong className="text-white">Mimic emotion, not just words.</strong> If the character sounds excited, sound excited. Emotion carries pitch patterns that are critical in Japanese.</li>
              <li><strong className="text-white">Record yourself occasionally.</strong> Compare your recording to the original. You will notice gaps you cannot hear in real time.</li>
              <li><strong className="text-white">Focus on common phrases first.</strong> Greetings, reactions, and everyday expressions give you the most practical value early on.</li>
            </ul>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step 5: Build Vocabulary with Context</h2>
          <p className="text-gray-300 mb-6">When you encounter a new word in anime, you are not learning it in isolation. You hear the pronunciation, see the written form, understand the context, and feel the emotional tone. This multi-layered input is far more memorable than a flashcard with a single translation.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-xl font-bold text-white mb-4"><MessageCircle className="w-5 h-5 inline mr-2 text-[#C642FC]" />Vocabulary Strategy</h3>
            <ul className="space-y-3 text-gray-300">
              <li><strong className="text-white">Save 5 to 10 words per episode.</strong> More than that and you will not retain them. Quality over quantity.</li>
              <li><strong className="text-white">Use FunLingo&apos;s word-saving feature.</strong> Click any word in the dual subtitles to see its meaning and save it for later review.</li>
              <li><strong className="text-white">Review saved words the next day.</strong> Spaced repetition means reviewing before you forget, not after. Next-day review locks words into long-term memory.</li>
              <li><strong className="text-white">Note the sentence, not just the word.</strong> Context is what makes a word stick. Save the whole line where you heard it.</li>
            </ul>
          </div>

          <p className="text-gray-300 mb-6">For a deeper dive into vocabulary methods, read our guide on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">how to build vocabulary while watching shows</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step 6: A Sample 30-Minute Daily Routine</h2>
          <p className="text-gray-300 mb-6">Consistency matters more than session length. Here is a realistic 30-minute daily routine you can maintain long-term.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">0 – 5 min</div>
                <div><strong className="text-white">Review yesterday&apos;s words.</strong> <span className="text-gray-400">Open your saved vocabulary in FunLingo. Read each word, try to recall the meaning, then check.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">5 – 15 min</div>
                <div><strong className="text-white">Watch with dual subtitles.</strong> <span className="text-gray-400">Play one episode or scene. Focus on understanding the story. Save any new words that stand out.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">15 – 25 min</div>
                <div><strong className="text-white">Rewatch and study.</strong> <span className="text-gray-400">Go back through the same scene. Pause at new words. Read the Japanese before checking the translation.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">25 – 30 min</div>
                <div><strong className="text-white">Shadow 5 lines.</strong> <span className="text-gray-400">Pick 5 lines you liked. Play, pause, repeat out loud. Focus on matching the original speaker.</span></div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Common Mistakes to Avoid</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Repeat className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div><strong className="text-white">Only watching, never studying.</strong> <span className="text-gray-400">Passive watching builds familiarity but not fluency. You need the study and shadow passes to convert input into output.</span></div>
              </div>
              <div className="flex gap-3 items-start">
                <Repeat className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div><strong className="text-white">Starting with advanced anime.</strong> <span className="text-gray-400">Attack on Titan and Death Note are great shows but terrible for beginners. The vocabulary is specialized and dialogue is fast. Start simple.</span></div>
              </div>
              <div className="flex gap-3 items-start">
                <Repeat className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div><strong className="text-white">Copying anime speech in real life.</strong> <span className="text-gray-400">Some anime characters speak in exaggerated or rude ways. Learn the patterns, but check formality levels before using phrases with real people.</span></div>
              </div>
              <div className="flex gap-3 items-start">
                <Repeat className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div><strong className="text-white">Trying to learn every word.</strong> <span className="text-gray-400">You will burn out. Stick to 5 to 10 words per session. Focus on high-frequency words you see across multiple episodes.</span></div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Can you actually learn Japanese from anime?</strong><p className="text-gray-400 text-sm">Yes, anime provides authentic spoken Japanese with emotional context. Combined with dual subtitles and active study methods like shadowing, it is an effective supplement to structured learning.</p></div>
              <div><strong className="text-white block mb-1">What anime should I start with as a beginner?</strong><p className="text-gray-400 text-sm">Start with slice-of-life anime like Shirokuma Cafe, Teasing Master Takagi-san, or Chi&apos;s Sweet Home. These use everyday vocabulary and slower, clearer speech.</p></div>
              <div><strong className="text-white block mb-1">Is anime Japanese different from real Japanese?</strong><p className="text-gray-400 text-sm">Some anime uses exaggerated or archaic speech patterns. Slice-of-life and drama genres are closest to everyday conversational Japanese.</p></div>
              <div><strong className="text-white block mb-1">How long does it take to understand anime without subtitles?</strong><p className="text-gray-400 text-sm">With consistent daily practice, most learners start catching common phrases within 2 to 3 months and can follow simple slice-of-life dialogue within 6 to 12 months.</p></div>
              <div><strong className="text-white block mb-1">Should I use English or romaji subtitles?</strong><p className="text-gray-400 text-sm">Use dual subtitles with Japanese and your native language side by side. FunLingo provides this for free on YouTube.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning Japanese with Anime Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free dual subtitles on YouTube. Built-in vocabulary builder. Click any word for instant definitions. No subscription required.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get FunLingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
