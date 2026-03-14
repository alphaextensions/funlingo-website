
import * as React from "react";
import Navbar from "@/pages/sections/navbar";
import { FooterSection } from "@/pages/sections/FooterSection";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ReadingModeBlog2 = (): React.JSX.Element => {
  // Schema for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Reading Mode — Learn Languages While You Watch",
    "description": "Turn your watch time into a language lesson with Funlingo's Reading Mode — synchronized bilingual captions, hover synonyms and example sentences for contextual learning.",
    "author": {
      "@type": "Person",
      "name": "Aastha Pandey",
      "url": "https://www.linkedin.com/in/aastha-p/" 
    },
    "datePublished": "2026-02-16",
    "dateModified": "2026-02-16",
    "image": "https://getfunlingo.com/blog-images/image.png",
    "publisher": {
        "@type": "Organization",
        "name": "Funlingo",
        "logo": {
            "@type": "ImageObject",
            "url": "https://getfunlingo.com/logo.png"
        }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://getfunlingo.com/blog/how-to-learn-languages-with-reading-mode"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Will Reading Mode work on any video?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It works on most video players that provide subtitles (YouTube, many Vimeo embeds). Some streaming platforms restrict overlays; in those cases Reading Mode will show compatibility tips."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — captions are rendered locally where possible; hover lookups are minimized and anonymized consistent with our privacy policy."
        }
      },
      {
        "@type": "Question",
        "name": "Can I export saved words?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can export your vocabulary list (CSV/Anki format) from the app’s vocabulary page for review in other tools."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SEO
        title="Reading Mode — Learn Languages While You Watch with Bilingual Captions | Funlingo"
        description="Turn your watch time into a language lesson. Funlingo’s Reading Mode displays synchronized bilingual captions with hover synonyms & examples for contextual learning."
        keywords="Reading Mode, bilingual captions, dual subtitles, learn languages while watching, AI language learning, contextual learning"
        canonical="/blog/how-to-learn-languages-with-reading-mode"
        type="article"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Navbar currentPage="/blog" />

      {/* Hero Section */}
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">
            Learning Guide
          </Badge>
          
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Reading Mode: How to Learn Languages While You Watch (Bilingual Captions That Actually Work)
          </h1>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
             <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> February 16, 2026</div>
             <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo</div>
             <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          
          {/* TL;DR */}
          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <h3 className="text-white text-lg font-bold mt-0 mb-2">TL;DR</h3>
            <p className="m-0 text-gray-300">
              Watching shows and videos can become productive learning time when the viewing experience removes friction. Reading Mode shows exact captions in the original audio language and your learning language — synchronized to the video timestamp — with instant hover definitions and example sentences. Use the short routines below to turn passive viewing into repeatable vocabulary gains.
            </p>
          </div>

          {/* Why watching to learn fails */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Why “watching to learn” often fails — and how Reading Mode fixes it</h2>
          <p>
            People try to learn languages from shows and videos for two good reasons: the content is authentic and plentiful. But common problems kill learning momentum:
          </p>
          <ul className="space-y-3 list-none pl-0 mb-6">
            <li className="flex gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span className="text-gray-300">Pausing to look up words interrupts comprehension.</span>
            </li>
            <li className="flex gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span className="text-gray-300">Copy-and-paste or typing slow down the flow.</span>
            </li>
            <li className="flex gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span className="text-gray-300">Context is lost when you extract single words from a sentence.</span>
            </li>
          </ul>
          <p>
            Reading Mode solves those problems by keeping audio and reading together. Instead of switching tab or opening a dictionary, you <em>read the exact sentence aligned to the video</em> and hover any word for instant synonyms and an example. That means you build audio-to-text mapping and retain meaning — in context.
          </p>

          {/* How Reading Mode works */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">How Reading Mode actually works</h2>
          <p>Reading Mode presents a split interface:</p>
          <ul className="space-y-4 list-disc pl-5 text-gray-300">
             <li><strong className="text-white">Left:</strong> video player with normal playback controls.</li>
             <li><strong className="text-white">Right:</strong> a reading pane with <em>sentence-by-sentence captions</em> — original (audio) language on top, learning language on bottom.</li>
             <li><strong className="text-white">Active highlight:</strong> the current sentence (matched to the video timecode) is emphasized so your eyes naturally follow.</li>
             <li><strong className="text-white">Hover micro-help:</strong> hover a word to reveal synonyms and example sentences, instantly — no pausing.</li>
          </ul>
          <p className="text-sm text-gray-400 mt-4 italic">
            Technically, Reading Mode uses timestamped subtitle files (SRT/WEBVTT) mapped to the player timestamp, and a lightweight AI lookup for synonyms/examples that runs on hover. The UX principle is simple: reduce context switching and keep cognitive load low.
          </p>

          {/* 5 Concrete Routines */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-8">5 concrete routines to use Reading Mode</h2>
          <p className="mb-8">These short, repeatable actions are what move a learner from passive to deliberate practice.</p>
          
          <div className="space-y-8">
            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h3 className="text-xl font-bold text-[#C642FC] mt-0 mb-3">1. The 15-minute “watch + highlight” session</h3>
                <p className="m-0 text-gray-300">Watch 15 minutes of a show you enjoy. Every time you see a new word, hover and tap “Save” to add it to your vocabulary list. This builds a queue of context-rich words for later review.</p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h3 className="text-xl font-bold text-[#C642FC] mt-0 mb-3">2. The 5-minute drill</h3>
                <p className="m-0 text-gray-300">Replay a 5–10 second clip with the caption highlighted. Read the sentence aloud three times, mimic pronunciation, then practice the saved words for 2 minutes.</p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h3 className="text-xl font-bold text-[#C642FC] mt-0 mb-3">3. The weekly review</h3>
                <p className="m-0 text-gray-300">Use your saved words in spaced repetition. Before you watch, quickly review last week’s list — then watch with Reading Mode on and notice how many words you recognize.</p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h3 className="text-xl font-bold text-[#C642FC] mt-0 mb-3">4. Topic immersion</h3>
                <p className="m-0 text-gray-300">Pick a theme (cooking, travel, tech) and watch two short videos. You’ll see the same domain vocabulary reappear; that repetition accelerates retention.</p>
            </div>

            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <h3 className="text-xl font-bold text-[#C642FC] mt-0 mb-3">5. Comprehension checks</h3>
                <p className="m-0 text-gray-300">After a scene, write a one-line summary of what you understood using the captions as prompts. This tests whether you’re gaining meaning — not just word recognition.</p>
            </div>
          </div>

          {/* Micro case */}
          <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mt-16 mb-12">
            <h3 className="text-xl font-bold text-white mb-4 mt-0">What learners told us (real-user micro-case)</h3>
            <blockquote className="border-l-4 border-[#C642FC] pl-4 italic text-gray-200 mb-4">
              “I started with 10 minutes a day. After two weeks I could follow 30–40% of simple conversations without pausing. The timestamped captions made all the difference.”
            </blockquote>
            <p className="text-gray-400 text-sm text-right">— Team Funlingo</p>
            <p className="text-sm text-gray-400 mt-4">Short anecdotal reports like this validate the approach: context + repeated exposure beats decontextualized drills.</p>
          </div>

          {/* Use Cases */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">When Reading Mode is most (and least) useful</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                <h4 className="text-green-400 font-bold mt-0 mb-2">Most Useful</h4>
                <p className="text-gray-300 m-0 text-sm">Casual video content (interviews, vlogs, documentaries), language learning at beginner→intermediate levels, vocabulary building tied to scenes.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                <h4 className="text-red-400 font-bold mt-0 mb-2">Less Useful</h4>
                <p className="text-gray-300 m-0 text-sm">Content with heavy domain-specific jargon (legal/medical) unless you pair it with specialized glossaries; secure pages (banking, email) where overlays are intentionally blocked for privacy.</p>
            </div>
          </div>

          {/* Tech & Privacy */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Quick tech and privacy notes for curious readers</h2>
          <ul className="space-y-4 list-disc pl-5 text-gray-300 mb-12">
            <li>Reading Mode uses local subtitle rendering and on-hover micro lookups. Wherever possible, processing is local or GDPR-aware to minimize data sent to servers.</li>
            <li>For sites where overlays are unsafe or prohibited (logins, payments, health portals), the extension disables Reading Mode automatically. See our privacy and domain policy in the extension settings.</li>
          </ul>

          {/* Measuring Progress */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to measure progress with Reading Mode</h2>
          <p>Track simple metrics for motivation:</p>
          <ul className="space-y-3 list-disc pl-5 text-gray-300 mb-6">
            <li>Minutes watched with Reading Mode enabled (weekly).</li>
            <li>Number of words saved to your vocabulary list.</li>
            <li>Review accuracy in spaced repetition (percent of correct recalls).</li>
            <li>Listening comprehension improvement (self-reported % of understood sentences).</li>
          </ul>
          <p className="text-gray-400 italic">Even small gains — 10–20% improvement in recognition — compound over months.</p>

          <hr className="border-white/10 my-12" />

          {/* FAQ */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Practical FAQs you can use on the page</h2>
          <div className="space-y-8">
            <div>
                <h4 className="text-white font-bold text-lg mb-2">Q: Will Reading Mode work on any video?</h4>
                <p className="text-gray-300 m-0">A: It works on most video players that provide subtitles (YouTube, many Vimeo embeds). Some streaming platforms restrict overlays; in those cases Reading Mode will show compatibility tips.</p>
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-2">Q: Is my data private?</h4>
                <p className="text-gray-300 m-0">A: Yes — captions are rendered locally where possible; hover lookups are minimized and anonymized consistent with our privacy policy.</p>
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-2">Q: Can I export saved words?</h4>
                <p className="text-gray-300 m-0">A: You can export your vocabulary list (CSV/Anki format) from the app’s vocabulary page for review in other tools.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
             <h2 className="text-3xl font-bold text-white mb-4">Start using Reading Mode today</h2>
             <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
               Pick one scene, read along, and replay a line 3 times. Small, repeatable actions build real fluency over time.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                {/* <a href="/how-it-works" className="no-underline">
                   <Button variant="outline" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white">
                     See Demo
                   </Button>
                </a> */}
             </div>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
};
