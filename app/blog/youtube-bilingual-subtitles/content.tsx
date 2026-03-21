"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Play, BookOpen, Mic, Globe, Monitor, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function YoutubeBilingualSubtitlesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">YouTube Bilingual Subtitles: Watch Videos in Two Languages</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">What Are Bilingual Subtitles on YouTube?</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Bilingual subtitles display two languages on screen at the same time while you watch a YouTube video. Your target language appears alongside your native language, so you can follow foreign-language content without guessing or pausing to translate.</p>
          <p className="leading-relaxed text-gray-300 mb-6">YouTube has the largest library of free video content in the world, covering virtually every language. News broadcasts, vlogs, educational channels, interviews, music videos, and documentaries are all available. Bilingual subtitles unlock all of this content as language learning material.</p>
          <p className="leading-relaxed text-gray-300 mb-6">The concept is simple: instead of choosing between reading subtitles in the language you are learning or in your native language, you see both at once. This lets your brain connect the foreign words to their meanings in real time while you listen to natural speech.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why YouTube Does Not Offer Bilingual Subtitles Natively</h2>
          <p className="text-gray-300 mb-6">Despite having auto-generated captions in dozens of languages and a translation feature, YouTube only lets you display one subtitle track at a time. You can turn on English captions or Spanish captions, but not both simultaneously.</p>
          <p className="text-gray-300 mb-6">YouTube&apos;s auto-translate feature generates a machine translation of existing captions, but it replaces the original text instead of showing both. This means you lose access to the original language subtitles when you enable translation.</p>
          <p className="text-gray-300 mb-6">For language learners, this is a major limitation. Seeing only the translation does not help you learn the original language. And seeing only the original language can be overwhelming if you do not understand most of the words yet. Bilingual subtitles solve this gap by showing both at the same time.</p>
          <p className="text-gray-300 mb-6">To get bilingual subtitles on YouTube, you need a browser extension that adds a second subtitle layer on top of the YouTube player. Several tools offer this, and we will walk through the best options below.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Get YouTube Bilingual Subtitles with Funlingo</h2>
          <p className="text-gray-300 mb-8">Funlingo is a free Chrome extension that adds bilingual subtitles to YouTube (as well as Netflix and Prime Video). Here is the step-by-step setup.</p>

          <div className="space-y-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">1</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Install Funlingo from the Chrome Web Store</h3>
                  <p className="text-gray-400 text-sm">Visit the <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-[#C642FC] hover:underline" target="_blank" rel="noopener noreferrer">Funlingo extension page</a> and click &quot;Add to Chrome.&quot; Confirm the installation when prompted. The extension is entirely free with no hidden costs or premium tiers.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">2</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Open Any YouTube Video</h3>
                  <p className="text-gray-400 text-sm">Navigate to youtube.com and find a video in your target language, or any video that has captions available. Make sure the video has subtitles by checking for the &quot;CC&quot; button in the player controls. Auto-generated captions work just as well as manually uploaded ones.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">3</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Enable Bilingual Subtitles</h3>
                  <p className="text-gray-400 text-sm">Click the Funlingo icon in the YouTube player or in your browser toolbar. Select your target language and your native language from the dropdown menus. Toggle on bilingual subtitles, and both languages will appear on the video immediately.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">4</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Customize Your Experience</h3>
                  <p className="text-gray-400 text-sm">Adjust font size, position, and opacity through the Funlingo settings panel. You can choose which language appears on top, change the text size for readability, and save words to your vocabulary list by clicking on them in the subtitles.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <p className="text-lg text-gray-200 mb-6">Turn YouTube into your personal language classroom. Install Funlingo for free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Types of YouTube Content for Bilingual Learning</h2>
          <p className="text-gray-300 mb-6">Not all YouTube content is equally useful for language learning. Here are the best categories to watch with bilingual subtitles, ranked by effectiveness.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Mic className="w-8 h-8 text-[#C642FC] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">News Broadcasts</h3>
              <p className="text-sm text-gray-400">News anchors speak clearly and at a measured pace. The vocabulary is formal but practical. Channels like DW News (German), France 24 (French), and NHK World (Japanese) are excellent starting points.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Play className="w-8 h-8 text-[#C642FC] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Vlogs and Daily Life</h3>
              <p className="text-sm text-gray-400">Vlogs expose you to casual, everyday language that textbooks rarely teach. You pick up slang, colloquialisms, and natural sentence patterns that native speakers actually use in daily conversation.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <BookOpen className="w-8 h-8 text-[#C642FC] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Educational Channels</h3>
              <p className="text-sm text-gray-400">Channels like Kurzgesagt, TED-Ed, or local educational creators explain topics with clear visuals and precise language. The structured explanations make it easier to follow along even in a foreign language.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Sparkles className="w-8 h-8 text-[#C642FC] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Interviews and Podcasts</h3>
              <p className="text-sm text-gray-400">Long-form interviews give you extended exposure to natural conversation. Two people talking back and forth helps you learn how questions and responses work in your target language.</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">For Korean learners specifically, we have a dedicated guide on the <a href="/blog/learn-korean-watching-youtube" className="text-[#C642FC] hover:underline">best YouTube channels for learning Korean</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Tips for Effective Learning with Bilingual Subtitles</h2>
          <p className="text-gray-300 mb-6">Bilingual subtitles are a tool, and like any tool, how you use it matters. These strategies will help you learn faster.</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Read the target language first.</strong> Make a habit of reading the foreign-language subtitle before looking at the translation. This trains your brain to process the new language actively instead of relying on your native language.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Watch content you genuinely enjoy.</strong> If you find the content boring, you will stop watching. Pick topics that interest you. Language learning through YouTube should feel like entertainment, not homework.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Save new words as you go.</strong> Use Funlingo&apos;s vocabulary builder to save unfamiliar words by clicking them in the subtitles. Review your saved words later to reinforce what you learned during the video.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Replay difficult sections.</strong> If a sentence is hard to understand, replay it a few times. Pay attention to how the spoken words match the subtitle text. This improves both listening comprehension and reading speed.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Gradually reduce reliance on translations.</strong> As your skills improve, try watching with only the target language subtitle for stretches of time. Switch back to bilingual mode when you hit a confusing section. This progression builds real fluency.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Be consistent.</strong> Watching 15 to 20 minutes of YouTube content daily with bilingual subtitles is more effective than binge-watching for three hours once a week. Consistency builds long-term retention.</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Comparison of Tools for YouTube Bilingual Subtitles</h2>
          <p className="text-gray-300 mb-6">Several browser extensions offer bilingual subtitles on YouTube. Here is how they compare.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-[#C642FC]/30">
              <h3 className="text-lg font-bold text-white mb-2">Funlingo</h3>
              <p className="text-gray-400 text-sm mb-3">Free bilingual subtitles on YouTube, Netflix, and Prime Video. Includes a built-in vocabulary builder and word-saving feature. No premium tier, no feature locks, no ads. The most complete free option available.</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> YouTube, Netflix, Prime Video</span>
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> 100% free</span>
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> Vocabulary builder</span>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Language Reactor</h3>
              <p className="text-gray-400 text-sm mb-3">Popular extension with bilingual subtitles and a pop-up dictionary for YouTube and Netflix. Free version covers basic features. Advanced vocabulary tools and export options require a Pro subscription at about $6 per month.</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> YouTube, Netflix</span>
                <span className="flex items-center gap-1 text-yellow-400"><Globe className="w-4 h-4" /> Freemium ($6/mo)</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> No Prime Video</span>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Trancy</h3>
              <p className="text-gray-400 text-sm mb-3">AI-powered tool with bilingual subtitles, sentence analysis, and grammar breakdowns for YouTube. The most feature-rich option, but also the most expensive at around $8 per month for full access.</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> YouTube, Netflix</span>
                <span className="flex items-center gap-1 text-yellow-400"><Globe className="w-4 h-4" /> Freemium ($8/mo)</span>
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> AI analysis</span>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Immersive Translate</h3>
              <p className="text-gray-400 text-sm mb-3">Primarily a web page translation tool that also supports YouTube bilingual subtitles. Works well for reading-based learning but lacks the vocabulary building features of dedicated language learning extensions.</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> YouTube subtitles</span>
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> Web page translation</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> No vocab tools</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-6">For a deeper comparison of all these tools, check out our guide on the <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">best dual subtitle extensions for language learning</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div>
                <strong className="text-white block mb-1">Does YouTube have built-in bilingual subtitles?</strong>
                <p className="text-gray-400 text-sm">No. YouTube only displays one subtitle track at a time. Its auto-translate feature replaces the original subtitles with a translation instead of showing both. You need a browser extension like Funlingo to display two languages simultaneously.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">What languages are supported for YouTube bilingual subtitles?</strong>
                <p className="text-gray-400 text-sm">Funlingo supports every language that YouTube offers subtitles for. This includes both manually uploaded captions and YouTube&apos;s auto-generated subtitles, covering over 100 languages in total.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Can I customize the appearance of bilingual subtitles?</strong>
                <p className="text-gray-400 text-sm">Yes. Funlingo lets you adjust font size, position, and opacity for both subtitle tracks. You can choose which language appears on top and customize the look to match your preferences.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Do bilingual subtitles work with auto-generated YouTube captions?</strong>
                <p className="text-gray-400 text-sm">Yes. Funlingo works with both manually uploaded subtitles and YouTube&apos;s auto-generated captions. Auto-generated captions may have occasional errors, but they are accurate enough for effective language learning on most videos.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Can I use bilingual subtitles on YouTube mobile?</strong>
                <p className="text-gray-400 text-sm">Bilingual subtitle extensions work only in the Chrome desktop browser. The YouTube mobile app does not support browser extensions. To use bilingual subtitles, watch YouTube through Chrome on your computer.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Watch YouTube with Bilingual Subtitles</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Turn every YouTube video into a language lesson. Bilingual subtitles on YouTube, Netflix, and Prime Video. Free forever.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
