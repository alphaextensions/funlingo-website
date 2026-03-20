"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, X, Zap, DollarSign, Globe, Monitor } from "lucide-react";

export default function LanguageReactorVsTrancyContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Comparison</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">Language Reactor vs Trancy: Which Is Better in 2026?</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 20, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> FunLingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">If you learn languages by watching movies and TV shows, you have probably come across Language Reactor and Trancy. Both are popular Chrome extensions that add dual subtitles, vocabulary tools, and translation features to streaming platforms. But which one actually deserves a spot in your browser? We put them head to head across pricing, platform support, features, ease of use, and language coverage to help you decide.</p>

          <p>If you want a broader overview of all the tools available, check out our guide to the <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">best dual subtitle extensions</a> or our deep dive into <a href="/blog/netflix-language-learning-extensions" className="text-[#C642FC] hover:underline">Netflix language learning extensions</a>.</p>

          <hr className="border-white/10 my-10" />

          {/* Quick Overview */}
          <h2 className="text-3xl font-bold text-white">Quick Overview</h2>
          <p>Language Reactor (formerly Language Learning with Netflix) has been around since 2019 and built a loyal user base with its clean interface and catalogue mode. Trancy launched in 2023 and has quickly gained traction with its AI-powered grammar breakdowns and wider platform support. Both tools aim to turn passive watching into active learning, but they take different approaches to get there.</p>

          <div className="grid sm:grid-cols-2 gap-4 my-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mt-0 mb-2">Language Reactor</h3>
              <p className="text-sm text-gray-400 mb-3">Est. 2019 &middot; 1M+ users</p>
              <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><DollarSign className="w-4 h-4 text-[#C642FC]" /> $6/mo (Pro)</li>
                <li className="flex items-center gap-2 text-gray-300"><Monitor className="w-4 h-4 text-[#C642FC]" /> Netflix, YouTube</li>
                <li className="flex items-center gap-2 text-gray-300"><Globe className="w-4 h-4 text-[#C642FC]" /> 40+ languages</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mt-0 mb-2">Trancy</h3>
              <p className="text-sm text-gray-400 mb-3">Est. 2023 &middot; 500K+ users</p>
              <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><DollarSign className="w-4 h-4 text-[#C642FC]" /> $8/mo (Pro)</li>
                <li className="flex items-center gap-2 text-gray-300"><Monitor className="w-4 h-4 text-[#C642FC]" /> Netflix, YouTube, Disney+, more</li>
                <li className="flex items-center gap-2 text-gray-300"><Globe className="w-4 h-4 text-[#C642FC]" /> 30+ languages</li>
              </ul>
            </div>
          </div>

          <hr className="border-white/10 my-10" />

          {/* Pricing */}
          <h2 className="text-3xl font-bold text-white">Pricing Comparison</h2>
          <p>Cost is often the deciding factor for language learners, especially those just starting out. Here is how the two extensions compare on price.</p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <h3 className="text-xl font-bold text-white mt-0 mb-4">Language Reactor Pricing</h3>
            <p className="text-gray-300 mb-2">Language Reactor offers a free tier with basic dual subtitles on Netflix and YouTube. The Pro plan costs <strong className="text-white">$6 per month</strong> (or $48/year) and unlocks machine translations, phonetic transcriptions (romaji, pinyin), vocabulary export to Anki, and the catalogue mode for finding content by difficulty level. The free tier is surprisingly usable, but the vocabulary features are locked behind the paywall.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <h3 className="text-xl font-bold text-white mt-0 mb-4">Trancy Pricing</h3>
            <p className="text-gray-300 mb-2">Trancy also has a free tier, but it is more restrictive &mdash; you get limited daily AI queries and basic subtitle display. The Pro plan is <strong className="text-white">$8 per month</strong> (or $60/year) and unlocks unlimited AI grammar analysis, sentence-by-sentence replay mode, full platform support, and advanced vocabulary tools. While it costs more, the AI grammar feature is genuinely unique.</p>
          </div>

          <p>For learners on a budget, Language Reactor&apos;s free tier offers more functionality. But if AI grammar breakdowns are important to you, Trancy&apos;s $8/mo may be worth the premium.</p>

          <hr className="border-white/10 my-10" />

          {/* Feature Comparison Table */}
          <h2 className="text-3xl font-bold text-white">Feature-by-Feature Comparison</h2>
          <p>Below is a detailed breakdown of how Language Reactor and Trancy stack up across the features that matter most for language learners.</p>

          <div className="bg-white/5 rounded-xl border border-white/10 my-8 overflow-hidden">
            <div className="grid grid-cols-3 gap-0 text-sm">
              <div className="p-4 font-bold text-white bg-white/5 border-b border-white/10">Feature</div>
              <div className="p-4 font-bold text-white bg-white/5 border-b border-l border-white/10 text-center">Language Reactor</div>
              <div className="p-4 font-bold text-white bg-white/5 border-b border-l border-white/10 text-center">Trancy</div>

              {[
                { feature: "Dual Subtitles", lr: true, tr: true },
                { feature: "Netflix Support", lr: true, tr: true },
                { feature: "YouTube Support", lr: true, tr: true },
                { feature: "Prime Video Support", lr: false, tr: false },
                { feature: "Disney+ Support", lr: false, tr: true },
                { feature: "Word Click Translation", lr: true, tr: true },
                { feature: "AI Grammar Analysis", lr: false, tr: true },
                { feature: "Sentence Replay Mode", lr: true, tr: true },
                { feature: "Vocabulary Saver", lr: true, tr: true },
                { feature: "Anki Export", lr: true, tr: false },
                { feature: "Phonetic Transcription", lr: true, tr: true },
                { feature: "Catalogue / Difficulty Ratings", lr: true, tr: false },
                { feature: "Web Page Translation", lr: false, tr: true },
                { feature: "Pronunciation Audio", lr: false, tr: true },
                { feature: "Free Tier Available", lr: true, tr: true },
              ].map((row, i) => (
                <React.Fragment key={i}>
                  <div className={`p-4 text-gray-300 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5`}>{row.feature}</div>
                  <div className={`p-4 text-center ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-l border-white/5`}>
                    {row.lr ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                  </div>
                  <div className={`p-4 text-center ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-l border-white/5`}>
                    {row.tr ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-400 mx-auto" />}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <hr className="border-white/10 my-10" />

          {/* Platform Support */}
          <h2 className="text-3xl font-bold text-white">Platform Support</h2>
          <p>One of the biggest practical differences between these two tools is which streaming services they support.</p>

          <p><strong className="text-white">Language Reactor</strong> focuses on Netflix and YouTube. That is it. If you primarily watch content on these two platforms, this is perfectly fine. But if you use Disney+, HBO Max, or Prime Video, you are out of luck.</p>

          <p><strong className="text-white">Trancy</strong> supports a wider range of platforms including Netflix, YouTube, Disney+, Coursera, TED, and several other video sites. This makes it more versatile if your content diet spans multiple services. However, neither tool supports Amazon Prime Video at the time of writing.</p>

          <p>Neither extension works on mobile devices or smart TVs &mdash; they are both Chrome-only desktop extensions.</p>

          <hr className="border-white/10 my-10" />

          {/* Ease of Use */}
          <h2 className="text-3xl font-bold text-white">Ease of Use</h2>
          <p><strong className="text-white">Language Reactor</strong> has a mature, well-polished interface. When you open Netflix or YouTube, the extension automatically activates and displays dual subtitles below the video. The sidebar catalogue mode lets you browse content and filter by language and difficulty. The learning curve is gentle &mdash; most users figure it out within a few minutes.</p>

          <p><strong className="text-white">Trancy</strong> has a slightly busier interface with more options visible at once. The AI grammar panel opens alongside the subtitles, which can feel overwhelming at first. However, once you get used to the layout, it becomes intuitive. Trancy also includes an onboarding tutorial that walks new users through each feature.</p>

          <p>Both extensions install in under a minute from the Chrome Web Store and require no complex setup.</p>

          <hr className="border-white/10 my-10" />

          {/* Language Support */}
          <h2 className="text-3xl font-bold text-white">Language Support</h2>
          <p>Language Reactor supports over 40 languages, making it one of the most comprehensive options available. This includes popular choices like Spanish, French, German, Japanese, Korean, and Chinese, as well as less commonly studied languages like Turkish, Thai, and Vietnamese.</p>

          <p>Trancy supports around 30 languages. While this covers all the most popular choices, learners of less common languages may find gaps. Trancy&apos;s AI grammar feature works best with major languages like English, Spanish, Japanese, and Korean &mdash; the quality of grammar explanations can vary for smaller languages.</p>

          <hr className="border-white/10 my-10" />

          {/* Pros and Cons */}
          <h2 className="text-3xl font-bold text-white">Pros and Cons</h2>

          <div className="grid sm:grid-cols-2 gap-6 my-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mt-0 mb-4">Language Reactor</h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Generous free tier", "Clean, mature interface", "Anki export for spaced repetition", "Catalogue mode with difficulty ratings", "40+ languages supported"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["No AI grammar analysis", "Limited to Netflix and YouTube", "No pronunciation audio", "Vocabulary export requires Pro"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mt-0 mb-4">Trancy</h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["AI-powered grammar breakdowns", "Wider platform support (Disney+, TED)", "Pronunciation audio included", "Web page translation mode", "Sentence-by-sentence replay"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Higher price at $8/month", "Restrictive free tier", "No Anki export", "Busier interface at first", "Fewer supported languages"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-10" />

          {/* Verdict */}
          <h2 className="text-3xl font-bold text-white">Our Verdict</h2>
          <p><strong className="text-white">Choose Language Reactor if:</strong> You primarily use Netflix and YouTube, want a clean interface, prefer Anki integration for spaced repetition, and want a usable free tier. At $6/mo for Pro, it is also the cheaper option.</p>

          <p><strong className="text-white">Choose Trancy if:</strong> You want AI grammar analysis, use streaming platforms beyond Netflix and YouTube (especially Disney+), and value pronunciation audio and web page translation. The $8/mo price tag is justified if you actively use these features.</p>

          <p>But honestly? Both tools lock important features behind paid plans. If you are looking for a comprehensive language learning extension that does not cost anything, there is a third option worth considering.</p>

          <hr className="border-white/10 my-10" />

          {/* FunLingo Alternative */}
          <h2 className="text-3xl font-bold text-white">The Free Alternative: FunLingo</h2>
          <div className="bg-[rgba(198,66,252,0.05)] rounded-xl p-8 border border-[#C642FC]/20 my-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#C642FC]" />
              <span className="text-[#C642FC] font-bold text-lg">Why pay when you do not have to?</span>
            </div>
            <p className="text-gray-300 mb-4">FunLingo offers everything you need for language learning through video &mdash; completely free. Unlike Language Reactor and Trancy, you do not need to choose between a limited free tier and a monthly subscription.</p>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Dual subtitles on Netflix, YouTube, and Prime Video",
                "Word-level translation popups with multiple meaning options",
                "Pronunciation audio with slow playback mode",
                "AI-powered contextual grammar explanations",
                "Built-in vocabulary saver for review",
                "No account required, no hidden paywalls",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-green-400 mt-1 shrink-0" /><span className="text-gray-200">{f}</span></li>
              ))}
            </ul>
            <p className="text-gray-300 mb-0">FunLingo covers all three major streaming platforms &mdash; including Prime Video, which neither Language Reactor nor Trancy supports. With a 4.92/5 rating on the Chrome Web Store, it is the highest-rated tool in the category.</p>
          </div>

          <hr className="border-white/10 my-10" />

          {/* FAQ */}
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>

          <div className="space-y-6 my-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">Is Language Reactor free?</h3>
              <p className="text-gray-300 m-0">Language Reactor has a free tier that includes basic dual subtitles on Netflix and YouTube. However, features like vocabulary export, machine translations, phonetic transcriptions, and the catalogue mode require the Pro plan at $6 per month. The free version is functional for casual learners, but serious students will likely need Pro.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">Does Trancy work on Netflix?</h3>
              <p className="text-gray-300 m-0">Yes, Trancy supports Netflix along with YouTube, Disney+, Coursera, TED, and several other platforms. Basic Netflix support is available on the free tier, but advanced features like AI grammar analysis, unlimited sentence replay, and full vocabulary tools require the $8/mo Pro plan.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">What is the best free alternative to Language Reactor and Trancy?</h3>
              <p className="text-gray-300 m-0">FunLingo is the best free alternative. It provides dual subtitles, word-level translations, pronunciation audio, AI grammar explanations, and vocabulary saving across Netflix, YouTube, and Prime Video &mdash; all at no cost. Unlike the free tiers of Language Reactor and Trancy, FunLingo does not restrict any features behind a paywall.</p>
            </div>
          </div>

          <hr className="border-white/10 my-10" />

          {/* Final CTA */}
          <div className="bg-[rgba(198,66,252,0.05)] rounded-xl p-8 border border-[#C642FC]/20 text-center my-8">
            <h2 className="text-2xl font-bold text-white mt-0 mb-3">Skip the Monthly Fees</h2>
            <p className="text-gray-300 mb-6">Get dual subtitles, AI translations, pronunciation audio, and vocabulary tools on Netflix, YouTube, and Prime Video &mdash; 100% free with FunLingo.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-white px-8 py-4 text-lg rounded-full hover:opacity-90 transition-opacity">
                Add FunLingo to Chrome &mdash; It&apos;s Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
