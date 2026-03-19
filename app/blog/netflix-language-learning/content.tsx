"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, Star, Tv, BookOpen, Globe, Headphones, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NetflixLanguageLearningContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Netflix Language Learning: The Complete Guide for 2026</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> FunLingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 14 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">Netflix is one of the most powerful language learning tools available today. With thousands of shows and movies in dozens of languages, it provides authentic native content that textbooks simply cannot match. This guide covers everything you need to turn your Netflix habit into a language learning routine.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Netflix Is Perfect for Language Learning</h2>
          <p className="text-gray-300 mb-6">Language acquisition research consistently shows that comprehensible input is the most effective way to learn a language. When you understand messages in your target language, your brain naturally acquires vocabulary, grammar, and pronunciation patterns. Netflix delivers exactly this kind of input.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Tv className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Authentic Content</h3>
              <p className="text-sm text-gray-400">Real dialogue spoken by native speakers at natural speed, with slang, idioms, and cultural context you will not find in textbooks.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Headphones className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Listening Practice</h3>
              <p className="text-sm text-gray-400">Hours of listening input across different accents, speaking speeds, and registers. Your ear adapts to the sound of the language naturally.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <BookOpen className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Context-Rich Learning</h3>
              <p className="text-sm text-gray-400">Visual context, facial expressions, and storylines help you understand new words without a dictionary. You learn meaning through context.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Star className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Entertainment Factor</h3>
              <p className="text-sm text-gray-400">Unlike textbooks, Netflix is genuinely fun. You stay consistent because you actually want to watch the next episode.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Set Up Netflix for Language Learning</h2>
          <p className="text-gray-300 mb-6">Before you start watching, take five minutes to optimize your Netflix settings for learning.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Step 1: Create a Dedicated Profile</h3>
              <p className="text-sm text-gray-400">Create a separate Netflix profile for language learning. Set the display language to your target language. This changes the Netflix interface and improves content recommendations for that language.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Step 2: Change Audio Language</h3>
              <p className="text-sm text-gray-400">When you start a show, click the audio and subtitles icon. Switch the audio to your target language. Many Netflix originals have high-quality dubs in multiple languages.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Step 3: Configure Subtitles</h3>
              <p className="text-sm text-gray-400">For beginners, use subtitles in your native language. For intermediate learners, switch to target language subtitles. For the best results at any level, use dual subtitles with a tool like <a href="/blog/how-to-get-dual-subtitles-on-netflix" className="text-[#C642FC] hover:underline">FunLingo</a>.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Step 4: Install a Dual Subtitle Extension</h3>
              <p className="text-sm text-gray-400">Install <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-[#C642FC] hover:underline" target="_blank" rel="noopener noreferrer">FunLingo</a> to display both languages simultaneously. This eliminates the need to choose between understanding and learning.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The Dual Subtitle Method</h2>
          <p className="text-gray-300 mb-6">The dual subtitle method is the most effective way to learn from Netflix. Instead of choosing between native language subtitles (comfortable but passive) or target language subtitles (active but frustrating), you display both simultaneously.</p>
          <p className="text-gray-300 mb-6">Here is how it works: your target language appears as the primary subtitle, and your native language appears below it. You read the target language first, and glance at the translation only when needed. Over time, you glance down less and less as your comprehension improves.</p>
          <p className="text-gray-300 mb-6">FunLingo makes this effortless. After installing the free Chrome extension, dual subtitles appear automatically on Netflix. You can also click any word to see its translation, save vocabulary, and review it later. Learn more in our <a href="/blog/how-to-get-dual-subtitles-on-netflix" className="text-[#C642FC] hover:underline">step-by-step setup guide</a>.</p>

          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <p className="text-lg text-gray-200 mb-6">Get dual subtitles on Netflix in under 30 seconds. Completely free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try FunLingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Netflix Shows by Language</h2>
          <p className="text-gray-300 mb-8">Choosing the right show matters. Here are our top picks organized by language and difficulty level.</p>

          <h3 className="text-xl font-bold text-white mb-4">Spanish</h3>
          <div className="space-y-3 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Money Heist (La Casa de Papel)</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Fast-paced heist drama with a mix of formal and colloquial Spanish. Great for picking up everyday expressions and slang. Spanish from Spain.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Elite</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Teen drama set in a private school. Modern conversational Spanish with lots of youth slang. Useful for understanding informal registers.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Extra (in Spanish)</strong><Badge className="bg-green-500/10 text-green-400 border-green-500/20">Beginner</Badge></div>
              <p className="text-sm text-gray-400">A sitcom specifically designed for language learners. Slow, clear dialogue with simple vocabulary. Perfect starting point for beginners. For a deeper dive, see our <a href="/blog/learn-spanish-watching-netflix" className="text-[#C642FC] hover:underline">complete guide to learning Spanish on Netflix</a>.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">French</h3>
          <div className="space-y-3 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Lupin</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Mystery thriller with clear Parisian French. The protagonist speaks deliberately, making it easier to follow than many French shows.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Call My Agent (Dix Pour Cent)</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Comedy-drama set in a talent agency. Professional and casual French, great for learning workplace vocabulary and everyday conversation.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Emily in Paris</strong><Badge className="bg-green-500/10 text-green-400 border-green-500/20">Beginner</Badge></div>
              <p className="text-sm text-gray-400">Mix of English and French dialogue. Good entry point for beginners since many scenes are in English with French interspersed naturally.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Korean</h3>
          <div className="space-y-3 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Squid Game</strong><Badge className="bg-red-500/10 text-red-400 border-red-500/20">Advanced</Badge></div>
              <p className="text-sm text-gray-400">Intense drama with fast dialogue and lots of informal Korean. Best for advanced learners who want exposure to raw, emotional speech patterns.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Crash Landing on You</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Romantic drama with a mix of North and South Korean dialects. Slower pacing makes it easier to follow. Great for learning polite and casual speech levels.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">My Love from the Star</strong><Badge className="bg-green-500/10 text-green-400 border-green-500/20">Beginner</Badge></div>
              <p className="text-sm text-gray-400">Romantic comedy with clear, slow dialogue. Simple sentence structures make it accessible for beginners. See our <a href="/blog/learn-korean-watching-youtube" className="text-[#C642FC] hover:underline">Korean learning guide</a> for more resources.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Japanese</h3>
          <div className="space-y-3 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Alice in Borderland</strong><Badge className="bg-red-500/10 text-red-400 border-red-500/20">Advanced</Badge></div>
              <p className="text-sm text-gray-400">Sci-fi thriller with fast-paced dialogue. Good for advanced learners who want exposure to intense, emotional Japanese and technical vocabulary.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Midnight Diner</strong><Badge className="bg-green-500/10 text-green-400 border-green-500/20">Beginner</Badge></div>
              <p className="text-sm text-gray-400">Slow, warm storytelling set in a late-night diner. Short episodes with simple, everyday Japanese. One of the best shows for beginners.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Terrace House</strong><Badge className="bg-green-500/10 text-green-400 border-green-500/20">Beginner</Badge></div>
              <p className="text-sm text-gray-400">Reality show with natural, unscripted Japanese conversation. Everyday vocabulary and casual speech patterns. Perfect for learning how Japanese people actually talk.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">German</h3>
          <div className="space-y-3 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Dark</strong><Badge className="bg-red-500/10 text-red-400 border-red-500/20">Advanced</Badge></div>
              <p className="text-sm text-gray-400">Complex sci-fi thriller with dense dialogue. Challenging but rewarding for advanced learners. Excellent for building sophisticated vocabulary.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">How to Sell Drugs Online (Fast)</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Teen comedy-drama with modern, casual German. Great for learning youth slang and contemporary expressions. Short episodes keep things digestible.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2"><strong className="text-white">Barbarians</strong><Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Intermediate</Badge></div>
              <p className="text-sm text-gray-400">Historical drama mixing German and Latin. The German dialogue is relatively clear and formal, making it accessible for intermediate learners interested in history.</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Your 15-Minute Daily Routine</h2>
          <p className="text-gray-300 mb-6">Consistency matters more than duration. Here is a simple 15-minute routine you can follow every day.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">1</div>
              <div><strong className="text-white block mb-1">Minutes 1-2: Review Yesterday&apos;s Words</strong><p className="text-sm text-gray-400 mb-0">Open your FunLingo vocabulary list and review the words you saved yesterday. Try to recall the meaning before checking.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">2</div>
              <div><strong className="text-white block mb-1">Minutes 3-5: Watch with Dual Subtitles</strong><p className="text-sm text-gray-400 mb-0">Watch a scene with dual subtitles enabled. Focus on reading the target language first, only glancing at the translation when stuck.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">3</div>
              <div><strong className="text-white block mb-1">Minutes 6-10: Active Watching</strong><p className="text-sm text-gray-400 mb-0">Rewatch the same scene. This time, pause when you encounter a new word. Click it with FunLingo to see the translation and save it to your vocabulary list.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">4</div>
              <div><strong className="text-white block mb-1">Minutes 11-13: Listen Only</strong><p className="text-sm text-gray-400 mb-0">Watch the scene one more time with subtitles hidden. Focus purely on listening comprehension. See how much you understand from audio alone.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">5</div>
              <div><strong className="text-white block mb-1">Minutes 14-15: Shadow and Repeat</strong><p className="text-sm text-gray-400 mb-0">Pick 2-3 sentences from the scene and repeat them out loud, mimicking the pronunciation and rhythm of the native speakers.</p></div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">5 Common Mistakes to Avoid</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div><strong className="text-white block mb-1">Watching Only with Native Language Subtitles</strong><p className="text-sm text-gray-400 mb-0">If you only read your native language, your brain ignores the target language audio. Use dual subtitles or target language subtitles instead.</p></div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div><strong className="text-white block mb-1">Choosing Content That Is Too Difficult</strong><p className="text-sm text-gray-400 mb-0">If you understand less than 70% of what you hear, the content is too hard. Drop down to an easier show. Learning should feel challenging but not impossible.</p></div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div><strong className="text-white block mb-1">Pausing Too Often</strong><p className="text-sm text-gray-400 mb-0">Stopping every few seconds kills immersion. Let unfamiliar words wash over you. With dual subtitles, you can catch meaning without breaking the flow.</p></div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div><strong className="text-white block mb-1">Not Reviewing Vocabulary</strong><p className="text-sm text-gray-400 mb-0">Watching without saving and reviewing new words means most of what you learn will be forgotten. Use a vocabulary tool to capture and revisit words regularly.</p></div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div><strong className="text-white block mb-1">Being Inconsistent</strong><p className="text-sm text-gray-400 mb-0">Watching for three hours once a week is less effective than 15 minutes every day. Consistency builds the neural pathways needed for language acquisition.</p></div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Tools for Netflix Language Learning</h2>
          <p className="text-gray-300 mb-6">Several Chrome extensions can enhance your Netflix learning experience. Here are the top options. For a detailed comparison, read our <a href="/blog/netflix-language-learning-extensions" className="text-[#C642FC] hover:underline">Netflix language learning extensions guide</a>.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-[#C642FC]/30">
              <div className="flex items-center gap-2 mb-2"><Star className="w-5 h-5 text-yellow-400" /><strong className="text-white">FunLingo (Recommended)</strong></div>
              <p className="text-sm text-gray-400">Free dual subtitles on Netflix, YouTube, and Prime Video. Built-in vocabulary builder with word saving. No premium tier or feature restrictions. <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">See our full review</a>.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <strong className="text-white block mb-1">Language Reactor</strong>
              <p className="text-sm text-gray-400">Popular option with dual subtitles and pop-up dictionary. Free tier is limited, full features require a $6/month subscription.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <strong className="text-white block mb-1">Trancy</strong>
              <p className="text-sm text-gray-400">AI-powered grammar analysis and sentence breakdowns. Premium features require $8/month. Good for learners who want detailed linguistic explanations.</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-6">
              <div>
                <strong className="text-white block mb-2">Can you really learn a language from Netflix?</strong>
                <p className="text-sm text-gray-400 mb-0">Yes, Netflix is an effective language learning tool when used strategically. Research on comprehensible input shows that consuming native media with subtitles builds vocabulary, listening skills, and natural grammar intuition. Netflix provides thousands of hours of authentic content across dozens of languages.</p>
              </div>
              <div>
                <strong className="text-white block mb-2">What is the best Netflix show for beginners?</strong>
                <p className="text-sm text-gray-400 mb-0">For beginners, shows with simple dialogue work best. For Spanish, try Extra. For French, try Emily in Paris. For Korean, try My Love from the Star. For Japanese, try Midnight Diner or Terrace House. Choose shows you genuinely enjoy to stay motivated.</p>
              </div>
              <div>
                <strong className="text-white block mb-2">Do you need subtitles on or off?</strong>
                <p className="text-sm text-gray-400 mb-0">It depends on your level. Beginners should use dual subtitles. Intermediate learners benefit from target-language-only subtitles. Advanced learners can try watching without subtitles. The dual subtitle method with FunLingo works well at any level.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning with Netflix Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free dual subtitles on Netflix, YouTube, and Prime Video. Built-in vocabulary builder. No subscription required.</p>
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
