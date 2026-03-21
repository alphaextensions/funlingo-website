"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Star, Tv, BookOpen, Sparkles, Target, Timer, Brain, Headphones, Repeat, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LearnSpanishNetflixContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Learn Spanish Watching Netflix (Your Complete 2026 Guide)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Why Netflix Is the Best Tool for Learning Spanish</h2>
          <p className="leading-relaxed text-gray-300 mb-6">Spanish is the most studied language in the world, and Netflix has the largest library of Spanish-language content of any streaming platform. From gritty crime dramas set in Colombia to lighthearted comedies from Spain, there are hundreds of titles that can double as language lessons.</p>
          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">The key advantage of Netflix for Spanish learning is comprehensible input. When you watch engaging content with dual subtitles, you absorb vocabulary, grammar patterns, and pronunciation naturally, without the grind of traditional study.</p>
          <p className="text-gray-300 mb-6">For the broader approach to learning any language through media, check out our guide on <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">how to learn a language by watching</a>.</p>

          <div className="mt-8 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <p className="text-lg text-gray-200 mb-6">Watch Spanish Netflix with dual subtitles tonight. Free setup in 30 seconds.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">Try Funlingo Free</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Best Netflix Shows for Learning Spanish by Level</h2>
          <p className="text-gray-300 mb-8">Choosing the right show for your level is crucial. Content that is too difficult leads to frustration, while content that is too easy does not push your skills forward. Here are our recommendations organized by proficiency level.</p>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-[#C642FC]" /> Beginner Level (A1-A2)</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <p className="text-gray-300 mb-4">At the beginner level, you need shows with simple dialogue, clear pronunciation, and visual context that helps you follow the story even when you miss words.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">Extra en Espanol</strong> — A sitcom designed specifically for Spanish learners with simple vocabulary and slow, clear speech.</li>
              <li><strong className="text-white">Peppa Pig (Spanish dub)</strong> — Short episodes with basic vocabulary and repetitive sentence structures.</li>
              <li><strong className="text-white">Destinos</strong> — A classic Spanish learning telenovela with gradually increasing difficulty.</li>
              <li><strong className="text-white">Pocoyo (Spanish)</strong> — Animated series with narration that describes actions as they happen, making meaning clear from context.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#C642FC]" /> Intermediate Level (B1-B2)</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <p className="text-gray-300 mb-4">At the intermediate level, you can handle natural-speed dialogue but still benefit from dual subtitles for unfamiliar vocabulary and complex sentences.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">La Casa de Papel (Money Heist)</strong> — Gripping heist drama with diverse Spanish accents and everyday vocabulary mixed with planning terminology.</li>
              <li><strong className="text-white">Elite</strong> — Teen drama set in a prestigious school. Modern slang, emotional dialogue, and relatable scenarios.</li>
              <li><strong className="text-white">Club de Cuervos</strong> — Mexican comedy about a family fighting over a soccer team. Rich in Mexican Spanish idioms and humor.</li>
              <li><strong className="text-white">Gran Hotel</strong> — Period drama with clear Castilian Spanish and dramatic plot lines that keep you watching.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#C642FC]" /> Advanced Level (C1-C2)</h3>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-4">Advanced learners should seek out content with fast dialogue, regional accents, slang, and complex themes to push their skills to near-native levels.</p>
            <ul className="list-none space-y-2 text-gray-300 mb-0">
              <li><strong className="text-white">Narcos</strong> — Colombian drug cartel drama with fast Colombian Spanish, slang, and historical context.</li>
              <li><strong className="text-white">Vis a Vis</strong> — Prison drama with intense, rapid-fire dialogue and diverse character backgrounds.</li>
              <li><strong className="text-white">El Marginal</strong> — Argentine prison drama with Argentine Spanish, including voseo and lunfardo slang.</li>
              <li><strong className="text-white">Paquita Salas</strong> — Spanish comedy with fast, natural dialogue full of pop culture references and industry jargon.</li>
            </ul>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The Dual Subtitle Method for Spanish</h2>
          <p className="text-gray-300 mb-6">The most effective way to learn Spanish from Netflix is the dual subtitle method. Instead of choosing between Spanish subtitles (which you might not fully understand) or English subtitles (which do not expose you to written Spanish), you use both at the same time.</p>
          <p className="text-gray-300 mb-6">Learn how to set this up in our step-by-step guide: <a href="/blog/how-to-get-dual-subtitles-on-netflix" className="text-[#C642FC] hover:underline">How to Get Dual Subtitles on Netflix</a>.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Brain className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Contextual Learning</h3><p className="text-sm text-gray-400">You learn words in the context of real conversations, emotional scenes, and cultural situations, not isolated on flashcards.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Headphones className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Listening + Reading</h3><p className="text-sm text-gray-400">You simultaneously hear Spanish pronunciation while reading the text, training both skills in parallel.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Repeat className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Natural Repetition</h3><p className="text-sm text-gray-400">Characters use the same phrases repeatedly across episodes, giving you natural spaced exposure to key vocabulary.</p></div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10"><Bookmark className="w-8 h-8 text-[#C642FC] mb-4" /><h3 className="text-xl font-bold text-white mb-2">Save and Review</h3><p className="text-sm text-gray-400">With Funlingo, click any word in the subtitles to save it. Review your saved words later with spaced repetition.</p></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Your 15-Minute Daily Spanish Netflix Routine</h2>
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 mt-0">Daily Spanish Learning Routine</h3>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 1-2: Vocabulary Review</span><span className="text-white font-medium">Review yesterday&apos;s saved words using spaced repetition. Quickly go through 10 to 15 words to reinforce memory.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 3-12: Watch with Dual Subtitles</span><span className="text-white font-medium">Watch 10 minutes of a Spanish show with Funlingo dual subtitles. Save 5 to 10 new words by clicking them in the subtitles.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 13-14: Shadow a Scene</span><span className="text-white font-medium">Replay a 30-second scene and repeat the dialogue out loud, mimicking the actors&apos; pronunciation and intonation.</span></div></div>
              <div className="flex flex-col md:flex-row gap-4"><div className="flex-1"><span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minute 15: Quick Journal</span><span className="text-white font-medium">Write one sentence in Spanish summarizing what happened in the episode. Use at least one new word you saved today.</span></div></div>
            </div>
            <p className="text-gray-300 mt-6 italic">This routine builds vocabulary, listening, pronunciation, and writing skills in just 15 minutes per day.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Vocabulary Tips for Spanish Learners</h2>
          <p className="text-gray-300 mb-6">Spanish shares thousands of cognates with English, words that look and sound similar. Recognizing these cognates on screen gives you an instant vocabulary boost. Words like &quot;universidad,&quot; &quot;importante,&quot; and &quot;problema&quot; are immediately understandable.</p>
          <p className="text-gray-300 mb-6">For more strategies on building vocabulary while watching, check out our detailed guide on <a href="/blog/build-vocabulary-watching-shows" className="text-[#C642FC] hover:underline">how to build vocabulary while watching shows</a>. You can also compare tools in our <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">best dual subtitle extension comparison</a>.</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Can I really learn Spanish by watching Netflix?</strong><p className="text-gray-400 text-sm">Yes. Watching Netflix with dual subtitles provides comprehensible input, which research shows is one of the most effective ways to acquire a language naturally.</p></div>
              <div><strong className="text-white block mb-1">What are the best Netflix shows for learning Spanish?</strong><p className="text-gray-400 text-sm">For beginners, try Extra en Espanol. Intermediate learners enjoy La Casa de Papel and Elite. Advanced learners can tackle Narcos or Vis a Vis.</p></div>
              <div><strong className="text-white block mb-1">Should I watch with Spanish or English subtitles?</strong><p className="text-gray-400 text-sm">Use dual subtitles with Funlingo to see both simultaneously. This trains reading and listening in Spanish while maintaining full comprehension.</p></div>
              <div><strong className="text-white block mb-1">How many hours of Netflix do I need to learn Spanish?</strong><p className="text-gray-400 text-sm">Consistency matters more than hours. Watching 15 to 30 minutes daily with active strategies is more effective than occasional long sessions.</p></div>
              <div><strong className="text-white block mb-1">What is the difference between Spain Spanish and Latin American Spanish on Netflix?</strong><p className="text-gray-400 text-sm">They differ in pronunciation, vocabulary, and some grammar. Netflix labels them separately. Choose based on your goals, but both are mutually intelligible.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning Spanish on Netflix Tonight</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Free dual subtitles. Built-in vocabulary builder. Works on every Spanish title on Netflix. Set up in 30 seconds.</p>
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
