
import * as React from "react";
import Navbar from "@/pages/sections/navbar";
import { FooterSection } from "@/pages/sections/FooterSection";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, BookOpen, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ReadingModeBlogPost = (): React.JSX.Element => {
  // Schema for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Reading Mode — Read Captions Side-by-Side While You Watch",
    "description": "Turn your watch time into a language lesson with Funlingo Reading Mode — synchronized bilingual captions, instant synonyms and examples.",
    "author": {
      "@type": "Person",
      "name": "Rushab Kasat",
      "url": "https://www.linkedin.com/company/getfunlingo/" 
    },
    "datePublished": "2026-02-05",
    "dateModified": "2026-02-05",
    "image": "https://getfunlingo.com/og-image.jpg", // Placeholder if specific image not available
    "publisher": {
        "@type": "Organization",
        "name": "Funlingo",
        "logo": {
            "@type": "ImageObject",
            "url": "https://getfunlingo.com/logo.png"
        }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SEO
        title="Reading Mode — Read Captions Side-by-Side While You Watch | Funlingo"
        description="Turn your watch time into a language lesson. Funlingo’s Reading Mode shows synchronized bilingual captions (native + learning language) with instant synonyms & examples."
        keywords="Reading Mode, bilingual reading, AI language learning, contextual learning, dual subtitles, caption reading mode"
        canonical="/blog/reading-mode-bilingual-captions"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Navbar currentPage="/blog" />

      {/* Hero Section */}
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">
            Product Feature
          </Badge>
          
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Reading Mode: Learn Naturally — Read Captions Side-by-Side While You Watch
          </h1>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
             <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> February 05, 2026</div>
             <div className="flex items-center gap-1"><User className="w-4 h-4" /> Rushab Kasat</div>
             <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          
          {/* Intro */}
          <p className="lead text-xl leading-relaxed text-gray-200">
            Watching movies, shows, or videos is one of the easiest ways to learn a language — if the learning experience fits naturally into your viewing flow. At Funlingo we built <em>Reading Mode</em> so learners can read exact captions in both the original (audio) language and their native/learning language — synchronized to the video timestamp — without breaking concentration.
          </p>
          <p>
            This article explains <em>why</em> Reading Mode works, <em>how</em> to use it effectively, and <em>how</em> it fits into a practical learning routine you can use today.
          </p>

          <hr className="border-white/10 my-12" />

          {/* Why side-by-side captions */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why side-by-side captions are more effective than translation lists</h2>
          <p>
            Most language study tools separate video from reading: you either pause to look up a word, open a dictionary, or copy text into a note. That friction kills learning momentum.
          </p>
          <p>Reading Mode removes that friction by:</p>
          <ul className="space-y-4 list-none pl-0 mb-8">
            <li className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Keeping audio and text together:</strong> The original audio stays playing while you read both lines — this builds direct audio-text mapping (key for pronunciation & listening).</span>
            </li>
            <li className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Providing exact, timestamped context:</strong> Every caption is linked to a time code, so you see the sentence in the moment it’s spoken.</span>
            </li>
            <li className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Reducing cognitive load:</strong> Seeing short, aligned lines (original + translation) is easier to scan than full-paragraph translations or disconnected flashcards.</span>
            </li>
          </ul>
          <p className="italic text-gray-400 border-l-4 border-[#C642FC] pl-4">
            Outcome: learners build vocabulary and comprehension in context — which research and language pedagogy consistently show is higher-retention than decontextualized memorization.
          </p>

          {/* What Reading Mode shows you */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What Reading Mode shows you</h2>
          <p>Reading Mode is designed for clarity and learning speed. On a single split view you’ll find:</p>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-12">
            <ul className="space-y-4 list-disc pl-5 m-0 text-gray-300">
               <li><strong className="text-white">Video player (left pane):</strong> standard playback controls, timeline, and playhead.</li>
               <li><strong className="text-white">Synchronized bilingual captions (right pane):</strong> original-language caption (top) + native/learning language caption (bottom) aligned to the same timestamp.</li>
               <li><strong className="text-white">Highlighting:</strong> current line is emphasized so you can follow along in real time.</li>
               <li><strong className="text-white">Hover/tap micro-help:</strong> hover any word to get synonyms and example sentences (instant contextual help).</li>
               <li><strong className="text-white">Playback shortcuts:</strong> jump backwards/forwards, replay a line, or loop short segments for targeted practice.</li>
            </ul>
          </div>

          {/* 5 practical ways */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">5 practical ways to use Reading Mode</h2>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-16">
            {[
              { title: "Passive exposure (10–30 mins)", desc: "Put on a show you like, read along. Focus on rhythm and familiar words." },
              { title: "Targeted vocabulary capture", desc: "When you see a new word, hover for synonyms and examples, then “save” it to your vocabulary list for spaced review." },
              { title: "Pronunciation drills", desc: "Loop 2–3 seconds of audio and read the caption aloud (mimic native rhythm)." },
              { title: "Comprehension checks", desc: "After a scene, summarize the main idea in your own words using the captions as prompts." },
              { title: "Active note-taking", desc: "Use the exact timestamped line to add quick notes (example: “0:42 — ‘hammer and chisel’ — construction terms”)." }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="pt-2 text-gray-300">
                  <strong className="text-white block mb-1">{step.title}</strong>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Routine */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How Reading Mode fits into a learner routine</h2>
          <ul className="space-y-4 list-none pl-0 mb-12">
            <li className="flex gap-3">
                <Clock className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Daily micro-sessions:</strong> 15–20 minutes most days keeps progress steady without burnout.</span>
            </li>
            <li className="flex gap-3">
                <Save className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Weekly review:</strong> Use saved words + spaced repetition to consolidate new vocabulary.</span>
            </li>
            <li className="flex gap-3">
                <BookOpen className="w-5 h-5 text-[#C642FC] mt-1 shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Project-based learning:</strong> Pick a show or theme (e.g., cooking videos, interviews) to build topic-specific vocabulary.</span>
            </li>
          </ul>

          {/* Implementation details */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Implementation details & privacy (brief)</h2>
          <p className="mb-12">
            Reading Mode uses locally displayed subtitle text and AI-enhanced context lookups. Funlingo aims to minimize network transfers: subtitle processing is done with privacy-first defaults (see our Privacy Policy). If you’re privacy-sensitive, check the settings panel that explains local vs server processing for each feature.
          </p>

          {/* Real learner example */}
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-16">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">Real learner example</h3>
            <blockquote className="border-l-4 border-[#C642FC] pl-4 italic text-gray-200 mb-4">
              “I used Reading Mode with a Korean travel vlog for 20 minutes a day. After two weeks I recognized common travel phrases and could follow 40–50% of simple sentences without pausing.”
            </blockquote>
            <p className="text-gray-400 text-sm text-right">Team Funlingo</p>
          </div>

          {/* Conclusion */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Conclusion</h2>
          <p>
            Reading while watching removes friction and turns entertainment time into meaningful learning time. Reading Mode is all about keeping learning natural: read exact captions aligned to the video you’re watching, get quick synonyms and examples, save words, and review with spaced repetition.
          </p>
          <p className="mb-12">
            If you’re curious, try Reading Mode on a short clip today — pick one scene, read along, and replay a line 3 times. Small, repeatable actions build real fluency over time.
          </p>

          <hr className="border-white/10 my-12" />

          {/* Author */}
          <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
             <div className="w-16 h-16 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] text-2xl font-bold">
                AP
             </div>
             <div>
                <h3 className="text-lg font-bold text-white mt-0 mb-2">About the author</h3>
                <p className="text-gray-300 text-sm mb-2">
                   Team Funlingo
                </p>
                
             </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
             <h2 className="text-3xl font-bold text-white mb-4">Ready to try Reading Mode?</h2>
             <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
               Install Funlingo and turn your next video into a language lesson.
             </p>
             <a
              href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">
                 Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
};
