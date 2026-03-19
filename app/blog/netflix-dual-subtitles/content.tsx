"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, AlertCircle, Monitor, Globe, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NetflixDualSubtitlesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Get Dual Subtitles on Netflix (Step-by-Step)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">What Are Netflix Dual Subtitles?</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Netflix dual subtitles let you display two subtitle tracks at the same time while watching any show or movie. Your native language appears alongside your target language, so you can follow the dialogue in both languages without pausing or switching back and forth.</p>
          <p className="leading-relaxed text-gray-300 mb-6">Netflix itself only allows one subtitle track at a time. To get dual subtitles, you need a browser extension that overlays a second subtitle line on top of the Netflix player. The entire setup takes less than two minutes, and in this guide we will walk you through every step.</p>
          <p className="leading-relaxed text-gray-300 mb-6">This is different from simply switching between subtitle languages in Netflix settings. With dual subtitles, both languages are visible simultaneously, which means you can read the original dialogue and its translation in real time.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Use Dual Subtitles for Language Learning?</h2>
          <p className="text-gray-300 mb-6">Research on second language acquisition consistently shows that comprehensible input is the most effective way to learn a language. Dual subtitles turn Netflix into a powerful learning tool by making foreign-language dialogue comprehensible even if you are a beginner.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Globe className="w-8 h-8 text-[#C642FC] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Learn in Context</h3>
              <p className="text-sm text-gray-400">You see how words and phrases are actually used in real conversations, not in textbook examples. This builds natural, practical vocabulary.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Monitor className="w-8 h-8 text-[#C642FC] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Passive and Active Learning</h3>
              <p className="text-sm text-gray-400">Even when you are relaxing, your brain is absorbing sentence patterns, grammar structures, and pronunciation cues from the audio.</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">The key advantage of dual subtitles over single subtitles is immediate reference. When you hear a word you do not recognize, the translation is right there on screen. There is no need to pause, open a dictionary, or break the flow of the show.</p>
          <p className="text-gray-300 mb-6">For a deeper dive into the methodology behind learning languages through media, read our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Step-by-Step: Set Up Netflix Dual Subtitles with FunLingo</h2>
          <p className="text-gray-300 mb-8">Follow these five steps to start watching Netflix with dual subtitles today. The entire process takes about 90 seconds.</p>

          <div className="space-y-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">1</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Install the FunLingo Extension</h3>
                  <p className="text-gray-400 text-sm">Open Chrome and go to the <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-[#C642FC] hover:underline" target="_blank" rel="noopener noreferrer">FunLingo Chrome Web Store page</a>. Click &quot;Add to Chrome&quot; and confirm the installation. The FunLingo icon will appear in your browser toolbar. The extension is completely free with no premium tiers or paywalls.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">2</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Open Netflix in Chrome</h3>
                  <p className="text-gray-400 text-sm">Navigate to <strong className="text-white">netflix.com</strong> in your Chrome browser and sign in to your account. Make sure you are using the Chrome desktop browser, not the Netflix desktop app or a mobile device. Dual subtitle extensions only work within the browser.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">3</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Pick a Show or Movie</h3>
                  <p className="text-gray-400 text-sm">Choose a title that has subtitles available in your target language. Netflix originals like <em>Money Heist</em>, <em>Dark</em>, <em>Squid Game</em>, or <em>Lupin</em> are excellent choices because they have extensive subtitle and audio options in many languages. Start playing the content.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">4</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Enable Dual Subtitles</h3>
                  <p className="text-gray-400 text-sm">Once the video starts playing, click the FunLingo icon in the Netflix player controls or in your browser toolbar. The extension will detect the available subtitle tracks and display an option to enable dual subtitles. Toggle it on, and you will immediately see two subtitle lines on screen.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] flex items-center justify-center text-white font-bold text-lg">5</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Configure Your Languages</h3>
                  <p className="text-gray-400 text-sm">In the FunLingo settings panel, select your target language (the language you are learning) and your native language. The target language subtitle will appear on top and your native language on the bottom. You can also adjust font size, subtitle position, and opacity to match your preference.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <p className="text-lg text-gray-200 mb-6">Ready to set up Netflix dual subtitles? Install FunLingo in seconds.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Get FunLingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Troubleshooting Common Issues</h2>
          <p className="text-gray-300 mb-6">Most users get Netflix dual subtitles working on the first try. If something is not right, here are the most common issues and their fixes.</p>

          <div className="space-y-4 mb-12">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white block mb-1">Subtitles not appearing</strong>
                  <p className="text-gray-400 text-sm">Make sure you have subtitles enabled in the Netflix player itself. FunLingo adds a second subtitle track on top of the one Netflix provides. If Netflix subtitles are turned off, the extension has nothing to work with. Go to the subtitle menu in the Netflix player and select a language.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white block mb-1">Second subtitle not showing</strong>
                  <p className="text-gray-400 text-sm">Check that you have selected two different languages in the FunLingo settings. Also make sure the Netflix title has subtitles available in both of your chosen languages. You can check available languages in the Netflix subtitle menu.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white block mb-1">Extension not detected on Netflix</strong>
                  <p className="text-gray-400 text-sm">Try refreshing the Netflix page after installing FunLingo. If the issue persists, go to <strong className="text-white">chrome://extensions</strong>, make sure FunLingo is enabled, and refresh the page again. In rare cases you may need to restart Chrome entirely.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white block mb-1">Subtitles overlapping or misaligned</strong>
                  <p className="text-gray-400 text-sm">Open the FunLingo settings and adjust the subtitle position and font size. You can move the secondary subtitle higher or lower on the screen to prevent overlap with the primary subtitle track.</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Tips for Getting the Most Out of Netflix Dual Subtitles</h2>
          <p className="text-gray-300 mb-6">Simply turning on dual subtitles is a great start, but there are strategies that can significantly accelerate your progress.</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Start with shows you already know.</strong> Rewatching a favorite show in your target language removes the cognitive load of following a new plot, letting you focus entirely on the language.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Focus on the target language first.</strong> Train yourself to read the target language subtitle before glancing at the translation. Over time, you will find yourself needing the translation less and less.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Use the vocabulary builder.</strong> FunLingo lets you save words and phrases while watching. Tap on any word in the subtitle to see its meaning and save it for later review.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Watch 20 to 30 minutes daily.</strong> Consistency matters more than marathon sessions. A short daily viewing habit builds lasting vocabulary and listening skills over weeks and months.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Choose content at your level.</strong> If you are a beginner, animated shows and children&apos;s content use simpler language. Intermediate learners should try dramas and comedies with everyday dialogue.</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">For more strategies on building vocabulary while watching, check out our detailed guide on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">building vocabulary through shows</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Other Extensions That Offer Netflix Dual Subtitles</h2>
          <p className="text-gray-300 mb-6">FunLingo is not the only option for Netflix dual subtitles. Here is how the main alternatives compare.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Language Reactor</h3>
              <p className="text-gray-400 text-sm mb-3">Formerly known as Language Learning with Netflix. Offers dual subtitles and a pop-up dictionary. The free version covers basic dual subtitles, but vocabulary saving and advanced features require a paid plan at around $6 per month.</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> Dual subtitles</span>
                <span className="flex items-center gap-1 text-yellow-400"><Settings className="w-4 h-4" /> Freemium</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> No Prime Video</span>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Trancy</h3>
              <p className="text-gray-400 text-sm mb-3">An AI-powered option with sentence analysis and grammar breakdowns. Supports Netflix and YouTube but not Prime Video. The full feature set requires a subscription at approximately $8 per month.</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> AI features</span>
                <span className="flex items-center gap-1 text-yellow-400"><Settings className="w-4 h-4" /> $8/month</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> No Prime Video</span>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Substital</h3>
              <p className="text-gray-400 text-sm mb-3">Lets you load custom SRT subtitle files onto Netflix. Good if you have your own subtitle files, but requires more manual setup and does not include vocabulary tools or integrated language learning features.</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> Custom SRT files</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> Manual setup</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> No vocab tools</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-6">For a comprehensive comparison, see our full guide on the <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">best dual subtitle extensions</a>.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div>
                <strong className="text-white block mb-1">Are dual subtitles free on Netflix?</strong>
                <p className="text-gray-400 text-sm">Netflix does not offer dual subtitles as a built-in feature. However, free extensions like FunLingo let you add dual subtitles at no extra cost. You just need an active Netflix subscription and the Chrome browser.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Do all Netflix shows support dual subtitles?</strong>
                <p className="text-gray-400 text-sm">Dual subtitles work on any Netflix title that has subtitles available in your two chosen languages. Netflix originals tend to have the widest language support, often with 10 or more subtitle options. Third-party licensed content may have fewer language options.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Can I use dual subtitles on Netflix mobile?</strong>
                <p className="text-gray-400 text-sm">No. Dual subtitle extensions are Chrome browser add-ons and only work on desktop. The Netflix mobile app and tablet app do not support browser extensions. To use dual subtitles, watch Netflix through the Chrome browser on your computer.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Will dual subtitles slow down my Netflix playback?</strong>
                <p className="text-gray-400 text-sm">No. FunLingo is lightweight and does not affect video playback performance. The extension simply adds a second text overlay on top of the existing video player without modifying the video stream itself.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Can I change the size and position of dual subtitles?</strong>
                <p className="text-gray-400 text-sm">Yes. FunLingo allows you to customize font size, subtitle position, and opacity for both subtitle tracks. You can adjust these settings through the extension panel while watching.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Watching Netflix with Dual Subtitles</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Set up dual subtitles in under two minutes. Free forever, no premium tier, no feature limits.</p>
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
