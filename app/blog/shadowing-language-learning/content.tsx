"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, Volume2, Headphones, Mic, BookOpen, Target } from "lucide-react";

export default function ShadowingLanguageLearningContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">What Is Shadowing in Language Learning? (+ AI Tools)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 19, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">If you have ever watched a polyglot speak a new language with near-native pronunciation after just a few months of study, there is a good chance they used shadowing. This powerful technique &mdash; repeating what you hear in real time &mdash; has been used by interpreters and language coaches for decades. Now, AI tools are making it more effective than ever.</p>

          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <p className="m-0 text-gray-200"><strong className="text-white">Quick definition:</strong> Language shadowing means listening to native speech and repeating it aloud simultaneously &mdash; matching the speaker&apos;s rhythm, intonation, and pronunciation as closely as possible, typically with a 1-2 second delay.</p>
          </div>

          <hr className="border-white/10 my-10" />

          <h2 className="text-3xl font-bold text-white mb-6">The Science Behind Shadowing</h2>
          <p>Shadowing is not just a parlor trick. Research in neurolinguistics shows it activates multiple language-processing pathways at once, making it one of the most efficient techniques for building fluency.</p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            {[
              { icon: <Headphones className="w-6 h-6" />, title: "Listening comprehension", desc: "Your brain learns to parse natural speech speed, connected sounds, and reductions that textbooks never teach." },
              { icon: <Volume2 className="w-6 h-6" />, title: "Pronunciation & prosody", desc: "By mimicking native speakers, you internalize correct stress patterns, intonation curves, and individual phonemes." },
              { icon: <Mic className="w-6 h-6" />, title: "Fluency & automaticity", desc: "Repeated motor practice builds muscle memory in your mouth and throat, reducing the gap between thinking and speaking." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-[#C642FC] mb-3">{item.icon}</div>
                <div className="text-white font-bold mb-2">{item.title}</div>
                <p className="text-sm text-gray-400 m-0">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>A 2019 study published in <em>Language Learning</em> found that learners who practiced shadowing for just 10 minutes a day over 4 weeks showed statistically significant improvements in pronunciation accuracy and speech fluency compared to a control group that only did listening exercises. The key difference? Shadowing engages your <strong className="text-white">motor cortex</strong> alongside your auditory cortex, creating stronger neural pathways for language production.</p>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">Step-by-Step: How to Shadow Effectively</h2>
          <p>Follow these five steps to build a shadowing routine that actually produces results.</p>

          <div className="space-y-6 my-8">
            {[
              { step: 1, title: "Choose your content wisely", desc: "Pick audio or video where the speaker talks at a natural but not overwhelming pace. Podcasts, Netflix dialogue scenes, and YouTube vlogs all work well. The content should be slightly above your current level &mdash; you should understand 70-80% without subtitles." },
              { step: 2, title: "Listen first without speaking", desc: "Play a 30-60 second clip and just listen. Focus on the overall meaning, the rhythm of the sentences, and any words you recognize. This primes your brain for what is coming and reduces cognitive overload when you start speaking." },
              { step: 3, title: "Shadow along with the speaker", desc: "Play the clip again and speak along, staying about 1-2 seconds behind the speaker. Do not pause the audio. Match their speed, tone, and emotion as closely as possible. It will feel messy at first &mdash; that is completely normal." },
              { step: 4, title: "Record yourself", desc: "Use your phone or a recording app to capture your shadowing. This creates an objective record you can review. Many learners skip this step, but it is the fastest way to identify specific sounds or patterns you are struggling with." },
              { step: 5, title: "Compare and repeat", desc: "Listen to your recording side-by-side with the original. Note specific differences in pronunciation, rhythm, or intonation. Then shadow the same clip again, focusing on those weak spots. Repeat 3-5 times per clip before moving on." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-5 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center font-bold text-lg">{item.step}</div>
                <div>
                  <strong className="text-white block mb-1">{item.title}</strong>
                  <span className="text-gray-400 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">Best Content Sources for Shadowing</h2>
          <p>Not all content is created equal when it comes to shadowing practice. Here is what works best for each platform.</p>

          <div className="grid sm:grid-cols-2 gap-6 my-8">
            {[
              { icon: <BookOpen className="w-5 h-5" />, title: "Podcasts", desc: "Ideal for intermediate learners. Try slow-news podcasts or interview-style shows. The lack of visual context forces deeper listening. Examples: News in Slow Spanish, InnerFrench, Nihongo con Teppei." },
              { icon: <Target className="w-5 h-5" />, title: "YouTube", desc: "Great for all levels. Vlogs, language channels, and cooking shows provide natural speech with visual context. Use Funlingo's dual subtitles to read along while you shadow." },
              { icon: <Headphones className="w-5 h-5" />, title: "Netflix & Streaming", desc: "Excellent for advanced shadowing. Dialogue-heavy dramas and sitcoms expose you to colloquial speech, slang, and emotional register. Funlingo overlays dual subtitles directly in the player." },
              { icon: <Mic className="w-5 h-5" />, title: "Audiobooks", desc: "Perfect for learners who want clear, well-articulated speech. Narrators speak deliberately, making it easier to shadow individual sentences and build confidence before tackling faster content." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-[#C642FC] mb-3">{item.icon}<span className="text-white font-bold">{item.title}</span></div>
                <p className="text-sm text-gray-400 m-0">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">How AI Tools Enhance Shadowing</h2>
          <p>Traditional shadowing had a major limitation: you had no way to get feedback on your pronunciation unless you hired a tutor. AI changes that equation completely.</p>

          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">What AI brings to shadowing</h3>
            <ul className="space-y-3 list-none pl-0 m-0">
              {[
                "Speech recognition can score your pronunciation accuracy in real time, highlighting specific phonemes you mispronounce.",
                "AI-powered slow playback lets you hear difficult phrases at reduced speed without distorting the pitch.",
                "Instant word-level translations mean you never have to stop shadowing to look up a word &mdash; you understand as you go.",
                "Vocabulary tracking automatically saves words you struggle with so you can review them later.",
                "Contextual grammar explanations help you understand why a phrase is structured the way it is, not just what it means.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">How Funlingo Dual Subtitles Help with Shadowing</h2>
          <p>One of the biggest challenges with shadowing is understanding what you are repeating. Without comprehension, shadowing becomes mindless parroting. This is where <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">dual subtitles</a> make a transformative difference.</p>

          <div className="bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 rounded-xl p-8 my-8">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">Funlingo + Shadowing workflow</h3>
            <p className="text-gray-300 mb-4">With Funlingo installed, your shadowing sessions on Netflix, YouTube, or Prime Video become dramatically more effective:</p>
            <ul className="space-y-3 list-none pl-0 m-0">
              {[
                "See the original language subtitle and your native language translation simultaneously &mdash; so you always know what you are saying.",
                "Click any word for instant pronunciation audio, multiple translation options, and usage examples.",
                "Identify unfamiliar vocabulary in real time without pausing the video or breaking your flow.",
                "Save difficult words to your vocabulary list and review them after your shadowing session.",
                "Use the bilingual text as a visual anchor while you practice matching the speaker's rhythm and intonation.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" />
                  <span className="text-gray-200 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">Common Shadowing Mistakes to Avoid</h2>
          <ul className="space-y-4 list-none pl-0">
            {[
              { title: "Choosing content that is too difficult", desc: "If you understand less than 60% of what is being said, you will spend more energy decoding than practicing production. Scale down to easier content." },
              { title: "Mumbling instead of committing", desc: "Shadowing only works if you actually move your mouth and produce sound. Whispering or mumbling undermines the motor practice that makes this technique effective." },
              { title: "Shadowing without understanding", desc: "Repeating sounds you do not understand builds no language skill. Use dual subtitles or pre-read a transcript so you know the meaning of what you are saying." },
              { title: "Skipping the recording step", desc: "Without recording, you have no way to objectively assess your progress. Even a quick phone recording reveals gaps you cannot hear in the moment." },
              { title: "Doing marathon sessions", desc: "Shadowing is mentally taxing. Sessions beyond 30 minutes often lead to declining quality. Two focused 15-minute sessions beat one tired 45-minute session." },
            ].map((item, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <span className="text-red-400 text-xl font-bold mt-1">&#10005;</span>
                <div><strong className="text-white block mb-1">{item.title}</strong><span className="text-gray-400 text-sm">{item.desc}</span></div>
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-white mt-16 mb-6">30-Day Shadowing Challenge Plan</h2>
          <p>Ready to commit? Here is a structured plan that takes you from beginner shadower to confident practitioner in one month.</p>

          <div className="space-y-6 my-8">
            {[
              { week: "Week 1 (Days 1-7)", title: "Foundation", tasks: "10 minutes daily. Use slow, clear content (children's shows, slow-news podcasts). Focus only on matching rhythm &mdash; do not worry about every word. Enable Funlingo dual subtitles so you understand what you hear." },
              { week: "Week 2 (Days 8-14)", title: "Building stamina", tasks: "15 minutes daily. Move to natural-speed content (YouTube vlogs, Netflix sitcoms). Start recording yourself on days 8, 11, and 14. Compare recordings to the original." },
              { week: "Week 3 (Days 15-21)", title: "Precision focus", tasks: "20 minutes daily. Pick specific sounds or patterns you struggle with. Shadow the same 60-second clip 5 times in a row, trying to get closer each time. Review saved vocabulary from Funlingo." },
              { week: "Week 4 (Days 22-30)", title: "Real-world application", tasks: "20-30 minutes daily. Shadow dialogue-heavy content (dramas, interviews). Record yourself on days 22, 25, and 28. Compare your day-28 recording to your day-1 recording &mdash; you will be amazed at the difference." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#C642FC]/20 text-[#C642FC] px-3 py-1 rounded-full text-sm font-bold">{item.week}</span>
                  <span className="text-white font-bold">{item.title}</span>
                </div>
                <p className="text-gray-400 text-sm m-0">{item.tasks}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white mt-16 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How long should I shadow each day?", a: "Start with 10-15 minutes per day. Consistency matters more than duration. As you build stamina, you can increase to 20-30 minutes. Avoid sessions longer than 45 minutes as mental fatigue reduces effectiveness." },
              { q: "Is shadowing good for beginners?", a: "Shadowing works at any level, but absolute beginners should start with slower, simpler content like children's shows or graded podcasts. Having dual subtitles (via a tool like Funlingo) makes shadowing accessible even for beginners since you can read along while you speak." },
              { q: "What languages work best with shadowing?", a: "Shadowing works for every language, but it is especially effective for tonal languages (Mandarin, Vietnamese, Thai) and languages with complex pronunciation (French, Portuguese, Arabic) because it trains your ear and mouth simultaneously." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                <h4 className="font-bold text-white text-lg mb-2">Q: {faq.q}</h4>
                <p className="text-gray-400 m-0">A: {faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Shadowing with Dual Subtitles</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Funlingo gives you real-time bilingual subtitles on Netflix, YouTube, and Prime Video &mdash; so you always understand what you are shadowing. Free to use, no account required.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Try Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
