"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, BookOpen, ArrowRight, Check, X, AlertCircle } from "lucide-react";

export default function UnlessMeaningContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(245,158,11,0.1)] text-amber-400 border-amber-400/20 px-3 py-1">Dictionary</Badge>
          <h1 className="font-heading-h1 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            &lsquo;Unless&rsquo; &mdash; Meaning, Grammar Rules &amp; Examples
          </h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 21, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          <p className="lead text-xl leading-relaxed">
            The word <strong className="text-white">&ldquo;unless&rdquo;</strong> is one of those small English words that trips up learners at every level. It looks simple, but its logic can be surprisingly tricky. Whether you&apos;re preparing for an English exam, writing a formal email, or trying to follow dialogue in a Netflix series, understanding <strong className="text-white">unless</strong> is essential. In this guide, we cover the full meaning, grammar rules across all conditional types, 30+ example sentences, common mistakes, translations into other languages, and how immersion tools can help you internalize grammar naturally.
          </p>

          <div className="bg-white/5 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
            <p className="m-0 text-gray-200">
              <strong className="text-white">Quick definition:</strong> <strong className="text-white">Unless</strong> means <em>&ldquo;except if&rdquo;</em> or <em>&ldquo;if&nbsp;&#8230;&nbsp;not.&rdquo;</em> It introduces the only condition under which a statement would not be true. For example: <em>&ldquo;I won&apos;t leave unless you ask me to&rdquo;</em> = <em>&ldquo;I won&apos;t leave if you don&apos;t ask me to.&rdquo;</em>
            </p>
          </div>

          <hr className="border-white/10 my-10" />

          {/* SECTION: What Does "Unless" Mean? */}
          <h2 className="text-3xl font-bold text-white mb-6">What Does &ldquo;Unless&rdquo; Mean?</h2>
          <p>
            <strong className="text-white">Unless</strong> is a subordinating conjunction. It connects a dependent clause (the condition) to a main clause (the result). The core meaning is <em>&ldquo;except under the circumstance that&rdquo;</em> or, more simply, <em>&ldquo;except if.&rdquo;</em>
          </p>
          <p>
            Think of <strong className="text-white">unless</strong> as a negative gate. The action in the main clause will happen (or won&apos;t happen) in every scenario <em>except</em> the one described in the unless-clause. This is why <strong className="text-white">unless</strong> and <strong className="text-white">if&nbsp;&#8230;&nbsp;not</strong> often mean the same thing &mdash; but not always, as we&apos;ll explore below.
          </p>
          <p>
            Here is the simplest way to remember it:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6">
            <p className="m-0 text-gray-200 text-center text-lg">
              <strong className="text-white">Unless</strong> = <strong className="text-white">If&nbsp;&#8230;&nbsp;not</strong> (in most cases)
            </p>
          </div>
          <p>
            <em>&ldquo;Unless it rains, we&apos;ll go to the park&rdquo;</em> means exactly the same as <em>&ldquo;If it doesn&apos;t rain, we&apos;ll go to the park.&rdquo;</em> The rain is the one exception that would change the plan.
          </p>

          <hr className="border-white/10 my-10" />

          {/* SECTION: "Unless" vs "If Not" */}
          <h2 className="text-3xl font-bold text-white mb-6">&ldquo;Unless&rdquo; vs &ldquo;If Not&rdquo; &mdash; When They&apos;re Interchangeable and When They&apos;re Not</h2>
          <p>
            Many textbooks say <strong className="text-white">unless = if not</strong>, and for zero and first conditional sentences that is usually true. However, there are important situations where you <em>cannot</em> swap one for the other.
          </p>

          <h3 className="text-xl font-bold text-white mb-4">When you CAN use either</h3>
          <div className="space-y-3 my-6">
            {[
              { sentence: "Unless you hurry, you'll miss the bus.", alt: "If you don't hurry, you'll miss the bus." },
              { sentence: "We'll eat outside unless the weather is bad.", alt: "We'll eat outside if the weather isn't bad." },
              { sentence: "Unless water reaches 100 °C, it doesn't boil.", alt: "If water doesn't reach 100 °C, it doesn't boil." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="m-0 text-gray-200"><strong className="text-white">Unless:</strong> {item.sentence}</p>
                <p className="m-0 text-gray-400 text-sm mt-1"><strong>Equivalent:</strong> {item.alt}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-4">When you CANNOT use &ldquo;unless&rdquo;</h3>
          <p>
            <strong className="text-white">Unless</strong> does not work with unreal or hypothetical conditions. It is restricted to <em>open</em> conditions &mdash; situations that are still possible. Here are the key restrictions:
          </p>
          <div className="space-y-3 my-6">
            {[
              { wrong: "Unless I were taller, I would play basketball.", right: "If I were taller, I would play basketball.", reason: "Second conditional — hypothetical/unreal situation." },
              { wrong: "Unless I had studied, I would have failed.", right: "If I hadn't studied, I would have failed.", reason: "Third conditional — past unreal situation." },
              { wrong: "Unless I'm wrong, you've already been told.", right: "If I'm not wrong, you've already been told.", reason: "The speaker believes the condition IS true, not an exception." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="m-0 text-red-300 line-through">{item.wrong}</p>
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="m-0 text-green-300">{item.right}</p>
                </div>
                <p className="m-0 text-gray-500 text-sm italic">{item.reason}</p>
              </div>
            ))}
          </div>

          <hr className="border-white/10 my-10" />

          {/* SECTION: Grammar Rules */}
          <h2 className="text-3xl font-bold text-white mb-6">Grammar Rules for &ldquo;Unless&rdquo;</h2>
          <p>
            Understanding which conditional types work with <strong className="text-white">unless</strong> is the single most important grammar point. Let&apos;s break it down.
          </p>

          <div className="space-y-6 my-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Zero Conditional (general truths & facts)",
                pattern: "Unless + present simple, present simple",
                examples: [
                  "Unless you heat ice, it doesn't melt.",
                  "Plants die unless they get enough water.",
                  "Unless you press the button, the machine doesn't start.",
                ],
                note: "Used for scientific facts, rules, and things that are always true. 'Unless' and 'if not' are fully interchangeable here."
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "First Conditional (real future possibilities)",
                pattern: "Unless + present simple, will + base verb",
                examples: [
                  "Unless you study, you will fail the exam.",
                  "She won't come to the party unless you invite her.",
                  "Unless the train is on time, we'll be late for the meeting.",
                ],
                note: "The most common use of 'unless.' The condition is open — it may or may not happen. 'Unless' and 'if not' are interchangeable."
              },
              {
                icon: <AlertCircle className="w-6 h-6" />,
                title: "Second Conditional (hypothetical present/future)",
                pattern: "If + past simple, would + base verb",
                examples: [
                  "If I didn't have work tomorrow, I would stay up late.",
                  "If she spoke French, she would move to Paris.",
                ],
                note: "Do NOT use 'unless' here. The condition is unreal or imaginary. Stick with 'if...not.'"
              },
              {
                icon: <AlertCircle className="w-6 h-6" />,
                title: "Third Conditional (hypothetical past)",
                pattern: "If + past perfect, would have + past participle",
                examples: [
                  "If I hadn't missed the flight, I would have arrived on time.",
                  "If they had known the truth, they would have acted differently.",
                ],
                note: "Do NOT use 'unless' here either. The condition refers to something that didn't happen in the past — it's permanently unreal."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-amber-400">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white m-0">{item.title}</h3>
                </div>
                <p className="text-amber-400/80 text-sm font-mono mb-3 m-0">Pattern: {item.pattern}</p>
                <ul className="space-y-1 m-0 pl-0 list-none mb-3">
                  {item.examples.map((ex, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                      <span><em>{ex}</em></span>
                    </li>
                  ))}
                </ul>
                <p className="m-0 text-gray-500 text-sm">{item.note}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Additional Grammar Notes</h3>
          <ul className="space-y-2 my-4">
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span><strong className="text-white">Never use &ldquo;will&rdquo; in the unless-clause.</strong> Say <em>&ldquo;Unless it rains&rdquo;</em>, not <em>&ldquo;Unless it will rain.&rdquo;</em> This follows the same rule as all conditional if-clauses.</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span><strong className="text-white">Clause order is flexible.</strong> You can put the unless-clause first or second: <em>&ldquo;Unless you call, I&apos;ll assume you&apos;re coming&rdquo;</em> or <em>&ldquo;I&apos;ll assume you&apos;re coming unless you call.&rdquo;</em> Use a comma when the unless-clause comes first.</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span><strong className="text-white">Avoid double negatives.</strong> Since <em>unless</em> already contains a negative meaning, don&apos;t add &ldquo;not&rdquo; inside the unless-clause. Say <em>&ldquo;Unless you try&rdquo;</em>, not <em>&ldquo;Unless you don&apos;t try.&rdquo;</em></span>
            </li>
          </ul>

          <hr className="border-white/10 my-10" />

          {/* SECTION: 30+ Example Sentences */}
          <h2 className="text-3xl font-bold text-white mb-6">30+ Example Sentences with &ldquo;Unless&rdquo;</h2>
          <p>
            Below you&apos;ll find example sentences grouped by context. Reading them aloud is one of the best ways to internalize the pattern.
          </p>

          <h3 className="text-xl font-bold text-white mb-4">Everyday Life</h3>
          <ol className="space-y-2 my-4 pl-5">
            <li className="text-gray-300">Unless you set an alarm, you&apos;ll oversleep.</li>
            <li className="text-gray-300">I won&apos;t buy the jacket unless it goes on sale.</li>
            <li className="text-gray-300">Unless you eat breakfast, you&apos;ll be hungry by 10 a.m.</li>
            <li className="text-gray-300">We can&apos;t leave unless the babysitter arrives.</li>
            <li className="text-gray-300">Unless you tell me what happened, I can&apos;t help you.</li>
            <li className="text-gray-300">She never drinks coffee unless she has a headache.</li>
          </ol>

          <h3 className="text-xl font-bold text-white mb-4">Work &amp; School</h3>
          <ol start={7} className="space-y-2 my-4 pl-5">
            <li className="text-gray-300">Unless you submit the report by Friday, you won&apos;t get feedback in time.</li>
            <li className="text-gray-300">The project will be delayed unless we hire more developers.</li>
            <li className="text-gray-300">Unless the professor cancels class, we have to attend.</li>
            <li className="text-gray-300">You won&apos;t pass the course unless you complete all the assignments.</li>
            <li className="text-gray-300">Unless everyone agrees, we can&apos;t move forward with the plan.</li>
            <li className="text-gray-300">The meeting is still on unless you hear otherwise.</li>
          </ol>

          <h3 className="text-xl font-bold text-white mb-4">Travel &amp; Weather</h3>
          <ol start={13} className="space-y-2 my-4 pl-5">
            <li className="text-gray-300">Unless you book early, flights to Tokyo are expensive.</li>
            <li className="text-gray-300">We&apos;ll go hiking unless the forecast calls for thunderstorms.</li>
            <li className="text-gray-300">Unless you have a visa, you can&apos;t enter the country.</li>
            <li className="text-gray-300">The ferry doesn&apos;t run unless the sea is calm.</li>
            <li className="text-gray-300">Unless you bring sunscreen, you&apos;ll get burned.</li>
            <li className="text-gray-300">I always take an umbrella unless the sky is perfectly clear.</li>
          </ol>

          <h3 className="text-xl font-bold text-white mb-4">Relationships &amp; Feelings</h3>
          <ol start={19} className="space-y-2 my-4 pl-5">
            <li className="text-gray-300">Unless you apologize, she won&apos;t forgive you.</li>
            <li className="text-gray-300">I can&apos;t trust you unless you&apos;re honest with me.</li>
            <li className="text-gray-300">Unless we talk about it, the problem will only get worse.</li>
            <li className="text-gray-300">He won&apos;t change unless he wants to.</li>
            <li className="text-gray-300">Unless you listen, you&apos;ll never understand her point of view.</li>
          </ol>

          <h3 className="text-xl font-bold text-white mb-4">Technology &amp; Science</h3>
          <ol start={24} className="space-y-2 my-4 pl-5">
            <li className="text-gray-300">Unless you update the software, you&apos;ll be vulnerable to security threats.</li>
            <li className="text-gray-300">The experiment fails unless the temperature is controlled precisely.</li>
            <li className="text-gray-300">Unless you back up your data, you risk losing everything.</li>
            <li className="text-gray-300">The phone won&apos;t charge unless you use the original cable.</li>
            <li className="text-gray-300">Unless the code is tested, bugs will appear in production.</li>
          </ol>

          <h3 className="text-xl font-bold text-white mb-4">Formal &amp; Written English</h3>
          <ol start={29} className="space-y-2 my-4 pl-5">
            <li className="text-gray-300">No refund will be issued unless the item is returned within 30 days.</li>
            <li className="text-gray-300">Unless otherwise stated, all prices include tax.</li>
            <li className="text-gray-300">The contract is void unless signed by both parties.</li>
            <li className="text-gray-300">Unless the court rules otherwise, the verdict stands.</li>
            <li className="text-gray-300">Access is denied unless authorized by the administrator.</li>
          </ol>

          <hr className="border-white/10 my-10" />

          {/* SECTION: Common Mistakes */}
          <h2 className="text-3xl font-bold text-white mb-6">Common Mistakes with &ldquo;Unless&rdquo;</h2>
          <p>
            Even advanced learners make these errors. Study the incorrect and correct versions carefully.
          </p>

          <div className="space-y-4 my-8">
            {[
              {
                mistake: "Using 'will' in the unless-clause",
                wrong: "Unless it will rain, we'll go out.",
                right: "Unless it rains, we'll go out.",
                tip: "Never use 'will' or 'would' inside the unless-clause. Use the present simple."
              },
              {
                mistake: "Double negative with 'unless...not'",
                wrong: "Unless you don't hurry, you'll miss the bus.",
                right: "Unless you hurry, you'll miss the bus.",
                tip: "'Unless' already carries a negative meaning. Adding 'not' creates a confusing double negative."
              },
              {
                mistake: "Using 'unless' in second/third conditionals",
                wrong: "Unless I had known, I would have helped.",
                right: "If I had known, I would have helped.",
                tip: "'Unless' only works with open (real/possible) conditions, not hypothetical or past unreal ones."
              },
              {
                mistake: "Using 'unless' when the condition is expected to be true",
                wrong: "Unless I'm right, this plan will work.",
                right: "If I'm right, this plan will work.",
                tip: "Use 'unless' only when the condition is an exception, not when you believe the condition is likely true."
              },
              {
                mistake: "Confusing 'unless' with 'until'",
                wrong: "Unless the timer goes off, keep stirring. (meaning: up to that point)",
                right: "Until the timer goes off, keep stirring.",
                tip: "'Unless' sets a conditional exception. 'Until' sets a time boundary. They are not interchangeable."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white m-0 mb-3">{item.mistake}</h3>
                <div className="flex items-start gap-2 mb-2">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="m-0 text-red-300">{item.wrong}</p>
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="m-0 text-green-300">{item.right}</p>
                </div>
                <p className="m-0 text-gray-500 text-sm"><strong>Tip:</strong> {item.tip}</p>
              </div>
            ))}
          </div>

          <hr className="border-white/10 my-10" />

          {/* SECTION: Unless in Other Languages */}
          <h2 className="text-3xl font-bold text-white mb-6">&ldquo;Unless&rdquo; in Other Languages</h2>
          <p>
            If you&apos;re learning English from another language &mdash; or learning another language from English &mdash; it helps to see how <strong className="text-white">unless</strong> is translated. Notice that many languages express the same idea with a phrase meaning &ldquo;if&nbsp;&#8230;&nbsp;not&rdquo; rather than having a single dedicated word.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 my-8">
            {[
              { lang: "Spanish", word: "a menos que / a no ser que", note: "Followed by the subjunctive mood: 'A menos que estudies, no aprobarás.'" },
              { lang: "French", word: "à moins que (+ subjunctive)", note: "'À moins que tu ne viennes, je partirai seul.'" },
              { lang: "German", word: "es sei denn / wenn...nicht", note: "'Es sei denn, du kommst mit' = 'Unless you come along.'" },
              { lang: "Portuguese", word: "a menos que / a não ser que", note: "Also takes the subjunctive: 'A menos que chova, iremos ao parque.'" },
              { lang: "Italian", word: "a meno che (+ congiuntivo)", note: "'A meno che tu non venga, andrò da solo.'" },
              { lang: "Japanese", word: "〜ない限り (~nai kagiri)", note: "Literally 'as long as...not': '勉強しない限り、合格しない。'" },
              { lang: "Korean", word: "~지 않는 한 (~ji anneun han)", note: "'공부하지 않는 한 합격할 수 없다.'" },
              { lang: "Turkish", word: "-medikçe / -madıkça", note: "'Çalışmadıkça başaramazsın' = 'Unless you work, you can't succeed.'" },
              { lang: "Arabic", word: "إلا إذا (illā idhā) / ما لم (mā lam)", note: "إلا إذا درست، لن تنجح" },
              { lang: "Hindi", word: "जब तक...नहीं (jab tak...nahīṁ)", note: "'जब तक तुम नहीं पढ़ोगे, पास नहीं होगे।'" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5">
                <strong className="text-white block mb-1">{item.lang}</strong>
                <p className="m-0 text-amber-400 font-medium text-sm mb-1">{item.word}</p>
                <p className="m-0 text-sm text-gray-500 italic">{item.note}</p>
              </div>
            ))}
          </div>

          <p>
            Comparing how your native language handles the concept of &ldquo;unless&rdquo; can deepen your understanding and prevent direct-translation errors.
          </p>

          <hr className="border-white/10 my-10" />

          {/* SECTION: Learn Grammar Naturally */}
          <h2 className="text-3xl font-bold text-white mb-6">Learn Grammar Naturally by Watching English Shows with Dual Subtitles</h2>
          <p>
            Grammar rules are important, but they only stick when you encounter them repeatedly in real, meaningful contexts. This is why linguists emphasize <strong className="text-white">comprehensible input</strong> &mdash; hearing and reading the language in natural settings &mdash; as the fastest path to internalization.
          </p>
          <p>
            When you watch an English TV series or YouTube video and hear a character say <em>&ldquo;I&apos;m not going unless you come with me,&rdquo;</em> your brain processes not just the grammar rule but also the tone, the emotion, the context, and the cultural nuance. That&apos;s far more powerful than reading the rule in a textbook.
          </p>
          <p>
            <strong className="text-white">Dual subtitles</strong> supercharge this process. With your target language on top and your native language below (or vice versa), you can:
          </p>
          <ul className="space-y-2 my-4">
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span>See exactly how &ldquo;unless&rdquo; is used in real dialogue</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span>Compare the English sentence structure with your native language in real time</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span>Pick up collocations and sentence patterns you&apos;d never find in a grammar book</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <ArrowRight className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <span>Build an intuitive &ldquo;feel&rdquo; for when &ldquo;unless&rdquo; sounds natural versus when it doesn&apos;t</span>
            </li>
          </ul>
          <p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-amber-400 hover:underline">Funlingo</a> is a free Chrome extension that adds dual subtitles to Netflix, YouTube, and Prime Video. It also provides AI-powered word definitions, per-word pronunciation, and a built-in vocabulary builder &mdash; so every show you watch becomes a hands-on grammar and vocabulary lesson.
          </p>

          <hr className="border-white/10 my-10" />

          {/* SECTION: FAQ */}
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6 my-8">
            {[
              {
                q: "What does 'unless' mean in simple words?",
                a: "'Unless' means 'except if.' It introduces the one condition that would change the outcome. For example, 'I'll stay home unless the weather improves' means the only thing that would make me go out is better weather."
              },
              {
                q: "Can I use 'unless' and 'if not' interchangeably?",
                a: "In zero and first conditional sentences (real/possible conditions), yes — they are usually interchangeable. However, you cannot use 'unless' in second or third conditional sentences (hypothetical or past unreal situations). In those cases, only 'if...not' works."
              },
              {
                q: "Why can't I use 'will' after 'unless'?",
                a: "This is a general rule for all conditional clauses in English. The clause after 'unless' (or 'if') describes a condition, not a result. English uses the present simple to describe the condition and 'will' only in the result clause. So it's 'Unless it rains (condition), we will go (result)' — never 'Unless it will rain.'"
              },
              {
                q: "Is 'unless' formal or informal?",
                a: "'Unless' is used in both formal and informal English. You'll hear it in everyday conversation ('I won't go unless you come'), in academic writing ('Unless otherwise noted, all figures are in USD'), and in legal language ('Unless the contract is signed by both parties...'). It's versatile and appropriate in any register."
              },
              {
                q: "What is the difference between 'unless' and 'until'?",
                a: "'Unless' sets a conditional exception (except if), while 'until' sets a time boundary (up to the point when). 'I won't leave unless you ask me' means the only reason I would leave is your asking. 'I won't leave until you ask me' means I'll wait here and leave at the moment you ask. They answer different questions: 'unless' answers 'under what condition?' and 'until' answers 'up to when?'"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white m-0 mb-3">{item.q}</h3>
                <p className="m-0 text-gray-300">{item.a}</p>
              </div>
            ))}
          </div>

          <hr className="border-white/10 my-10" />

          {/* CTA */}
          <div className="bg-[rgba(245,158,11,0.05)] border border-amber-400/20 rounded-2xl p-8 text-center my-12">
            <BookOpen className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Master English Grammar by Watching, Not Memorizing</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Grammar rules like &ldquo;unless&rdquo; click faster when you hear them in real shows with dual subtitles. Funlingo adds free dual subtitles, AI word lookup, and pronunciation tools to Netflix, YouTube, and Prime Video &mdash; so you learn naturally while watching what you love.
            </p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[linear-gradient(135deg,#b45309_0%,#f59e0b_100%)] text-white px-8 py-3 text-lg rounded-full hover:opacity-90 transition-opacity">
                Try Funlingo Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
}
