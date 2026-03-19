"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Coffee, Tv, BookOpen, Brain, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DailyLanguageLearningHabitsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">5 Daily Habits That Make Language Learning Stick (Without Extra Study Time)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 18, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> FunLingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">The Real Reason People Quit Learning Languages</h2>
          <p className="leading-relaxed text-gray-300 mb-6">It is not a lack of talent. It is not the wrong app. The number one reason people abandon language learning is that they treat it as a separate activity that requires finding extra time in an already full schedule. When life gets busy, the &ldquo;extra&rdquo; activity is the first thing to go.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">The solution is not more discipline. It is better design. Instead of adding new tasks to your day, attach language learning to things you already do. This is called habit stacking, and it is the most reliable way to build consistency without willpower.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Turn your streaming time into language practice with FunLingo — free dual subtitles on Netflix, YouTube, and Prime Video.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try FunLingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What Is Habit Stacking?</h2>
          <p className="text-gray-300 mb-6">Habit stacking was popularized by James Clear in Atomic Habits. The idea is simple: you take an existing habit you do every day and attach a new behavior to it. The existing habit acts as the trigger. Because the trigger already happens automatically, the new behavior gets pulled along with it.</p>
          <p className="text-gray-300 mb-6">For language learning, this means identifying moments in your day that are already consistent — your morning coffee, your commute, your evening streaming session — and layering a language activity on top of each one.</p>
          <p className="text-gray-300 mb-8">Here are five specific habits you can stack today, each one requiring zero extra time in your schedule.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Habit 1: Switch Your Streaming Language</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Tv className="w-8 h-8 text-[#C642FC]" />
              <div>
                <h3 className="text-xl font-bold text-white">Stack on: Your evening TV time</h3>
                <p className="text-sm text-gray-400">Time required: 0 extra minutes</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">You are already going to watch something tonight. The only change is adding dual subtitles. With FunLingo installed, every Netflix, YouTube, or Prime Video session becomes a language input session automatically.</p>
            <p className="text-gray-300 mb-4">You do not need to watch &ldquo;educational&rdquo; content. Watch what you enjoy. A thriller in your target language with dual subtitles teaches you more real vocabulary than a textbook chapter you never open.</p>
            <p className="text-gray-300">For a full walkthrough of this approach, read our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a>.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Habit 2: Morning Coffee Vocabulary Review</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-8 h-8 text-[#C642FC]" />
              <div>
                <h3 className="text-xl font-bold text-white">Stack on: Making coffee or tea</h3>
                <p className="text-sm text-gray-400">Time required: 3 to 5 minutes</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">While your kettle boils or your coffee brews, open your saved vocabulary in FunLingo. Review the words you saved from last night&apos;s watching session. Try to recall the meaning before checking. That is it.</p>
            <p className="text-gray-300 mb-4">This is spaced repetition in its simplest form. You encountered the word in context last night. You review it the next morning. Research shows this timing — reviewing within 12 to 24 hours — dramatically improves long-term retention.</p>
            <p className="text-gray-300">For the science behind this, see our article on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">building vocabulary while watching shows</a>.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Habit 3: Commute Listening</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#C642FC]" />
              <div>
                <h3 className="text-xl font-bold text-white">Stack on: Your daily commute</h3>
                <p className="text-sm text-gray-400">Time required: 0 extra minutes</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">Replace one podcast or music playlist with content in your target language. It does not need to be a language learning podcast. News, storytelling, or even re-listening to audio from a show you already watched with dual subtitles all count.</p>
            <p className="text-gray-300 mb-4">The goal is not to understand every word. It is to train your ear to recognize sounds, rhythm, and patterns. This kind of passive exposure primes your brain for the active learning you do during your evening sessions.</p>
            <p className="text-gray-300">If you drive, YouTube videos with FunLingo subtitles work well on your phone screen while parked, or use just the audio while driving.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Habit 4: Lunch Break Web Browsing</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-[#C642FC]" />
              <div>
                <h3 className="text-xl font-bold text-white">Stack on: Scrolling during lunch</h3>
                <p className="text-sm text-gray-400">Time required: 0 extra minutes</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">You probably spend part of your lunch break reading articles, news, or social media. With FunLingo&apos;s <a href="/blog/website-translation-language-learning" className="text-[#C642FC] hover:underline">website translation feature</a>, you can read any webpage in two languages side by side.</p>
            <p className="text-gray-300 mb-4">Read a news article you are interested in, but in bilingual mode. You absorb vocabulary about real-world topics while doing something you were already going to do. The context of a real article makes words stick far better than isolated vocabulary lists.</p>
            <p className="text-gray-300">Start with topics you know well — if you follow tech news or sports, reading those topics in your target language gives you a huge advantage because you already understand the context.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Habit 5: Before-Bed Shadowing</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-[#C642FC]" />
              <div>
                <h3 className="text-xl font-bold text-white">Stack on: Your bedtime routine</h3>
                <p className="text-sm text-gray-400">Time required: 5 minutes</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">Before you put your phone down for the night, pick 3 to 5 lines from what you watched earlier. Play each line, pause, and repeat it out loud. Match the speaker&apos;s rhythm and intonation as closely as you can.</p>
            <p className="text-gray-300 mb-4">This is called shadowing, and it is one of the most effective techniques for building spoken fluency. Five minutes of shadowing before bed is more valuable than an hour of passive listening because you are actively producing the language.</p>
            <p className="text-gray-300">Research also shows that language reviewed before sleep consolidates better during the night. You are literally learning in your sleep.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Putting It All Together</h2>
          <p className="text-gray-300 mb-6">Here is what a typical day looks like with all five habits stacked. Notice that none of these require scheduling a separate &ldquo;study session.&rdquo;</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">Morning</div>
                <div><strong className="text-white">Coffee + vocabulary review.</strong> <span className="text-gray-400">3 minutes reviewing saved words while your coffee brews.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">Commute</div>
                <div><strong className="text-white">Target language audio.</strong> <span className="text-gray-400">Replace one podcast with content in your target language.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">Lunch</div>
                <div><strong className="text-white">Bilingual web browsing.</strong> <span className="text-gray-400">Read one article in two languages using FunLingo&apos;s website translation.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">Evening</div>
                <div><strong className="text-white">Streaming with dual subtitles.</strong> <span className="text-gray-400">Watch your regular shows with FunLingo enabled. Save 5 to 10 new words.</span></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="text-[#C642FC] font-bold text-sm whitespace-nowrap mt-1">Bedtime</div>
                <div><strong className="text-white">5-minute shadowing.</strong> <span className="text-gray-400">Repeat 3 to 5 lines from tonight&apos;s episode before putting your phone down.</span></div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-6">Total extra time in your day: roughly 10 minutes. Total language exposure: spread across your entire day. This is how consistent learners make progress without burning out.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why This Works Better Than Study Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Distributed Practice</h3>
              <p className="text-sm text-gray-400">Five short touchpoints throughout the day create more neural connections than one long session. Your brain processes language between sessions, even when you are not thinking about it.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Low Friction</h3>
              <p className="text-sm text-gray-400">Because every habit is attached to something you already do, there is no activation energy required. You do not need motivation to start — the trigger is automatic.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Multiple Input Types</h3>
              <p className="text-sm text-gray-400">Reading, listening, watching, and speaking across the day engages different parts of your brain. This variety strengthens overall language acquisition.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Sustainable Long-Term</h3>
              <p className="text-sm text-gray-400">The habits that work are the ones you can maintain for months. Stacking on existing routines makes consistency the default, not the exception.</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">How many minutes a day do I need to learn a language?</strong><p className="text-gray-400 text-sm">Even 15 minutes of focused daily practice is more effective than hour-long sessions done inconsistently. The key is daily consistency, not session length.</p></div>
              <div><strong className="text-white block mb-1">What is habit stacking for language learning?</strong><p className="text-gray-400 text-sm">Habit stacking means attaching a new language learning activity to an existing daily habit. For example, watching one show episode with dual subtitles right after dinner, or reviewing vocabulary while waiting for your morning coffee.</p></div>
              <div><strong className="text-white block mb-1">Why do most people quit learning a language?</strong><p className="text-gray-400 text-sm">Most people quit because they set unrealistic goals, rely only on textbook study, and see language learning as a separate task. Building small habits around activities you already enjoy solves this.</p></div>
              <div><strong className="text-white block mb-1">Can watching TV shows really help me learn a language?</strong><p className="text-gray-400 text-sm">Yes. Watching shows with dual subtitles provides authentic input in context, which research shows is one of the most effective ways to acquire vocabulary and improve listening comprehension.</p></div>
              <div><strong className="text-white block mb-1">What is the best free tool for building a language learning habit?</strong><p className="text-gray-400 text-sm">FunLingo is a free Chrome extension that adds dual subtitles to Netflix, YouTube, and Prime Video. It turns your existing streaming habit into a language learning session with no extra effort.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Building Your Language Habit Today</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free dual subtitles on Netflix, YouTube, and Prime Video. Turn the streaming you already do into real language progress.</p>
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
