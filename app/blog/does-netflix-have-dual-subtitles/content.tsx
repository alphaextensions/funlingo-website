"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, X } from "lucide-react";

export default function DoesNetflixHaveDualSubtitlesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Quick Answer</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">Does Netflix Have Dual Subtitles?</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 13, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 4 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed text-gray-200">
            <strong className="text-white">No &mdash; Netflix does not have a built-in dual subtitle feature.</strong> The native Netflix player only lets you pick one subtitle language at a time. To watch with two subtitle languages on screen at once, you need a free Chrome extension like Funlingo that overlays a second subtitle track on top of the Netflix player. The setup takes about 30 seconds, works on any Netflix title with subtitles available in your two languages, and costs nothing beyond your existing Netflix subscription.
          </p>

          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <p className="m-0 text-gray-200"><strong className="text-white">TL;DR:</strong> Netflix has zero native support for dual subtitles. Use the free <a href="/" className="text-[#C642FC] hover:underline">Funlingo Chrome extension</a> to add a second subtitle track. Works on every Netflix show, supports 100+ languages, no account required.</p>
          </div>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Netflix Won&apos;t Show Two Subtitles</h2>
          <p>Netflix designed its player around the assumption that each viewer wants subtitles in a single language. Inside the player settings, you can pick from whichever languages a given title has been localised into, but the moment you select one, the others disappear. There is no "both" option, no overlay, and no developer mode hidden behind a keyboard shortcut.</p>
          <p>This is a deliberate product choice rather than a technical limitation. Netflix delivers each subtitle track as a separate timed-text file, so technically multiple could be rendered simultaneously. The reason this isn&apos;t exposed in the UI is that Netflix optimises for a casual entertainment audience, not language learners. Two subtitle lines stacked on screen would clutter the picture for most users.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Get Dual Subtitles on Netflix Anyway</h2>
          <p>A small ecosystem of Chrome extensions exists to fill this gap. They work by injecting a second subtitle line into the Netflix player, using the same timed-text data Netflix already streams. The most accessible option is Funlingo, which is completely free and adds dual subtitles plus word lookups in three steps:</p>
          <ol className="space-y-3 list-decimal pl-6 text-gray-300 my-6">
            <li><strong className="text-white">Install Funlingo from the Chrome Web Store</strong> &mdash; a one-click install, no account needed.</li>
            <li><strong className="text-white">Open any show on netflix.com in Chrome</strong> &mdash; the extension activates automatically.</li>
            <li><strong className="text-white">Pick your target language and your native language</strong> &mdash; both subtitle tracks appear immediately.</li>
          </ol>
          <p>For the full walkthrough with screenshots, troubleshooting, and tips on choosing shows, see our complete guide on <a href="/blog/netflix-dual-subtitles" className="text-[#C642FC] hover:underline">how to get dual subtitles on Netflix</a>.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">What About the Netflix Mobile App or Smart TV?</h2>
          <p>Chrome extensions only run on the Chrome desktop browser. The Netflix mobile app, smart TV apps, and console apps don&apos;t allow browser-style add-ons, so dual subtitles aren&apos;t available there. If you prefer watching on a TV, the most reliable workaround is to stream Netflix in Chrome on a laptop and either cast to your TV with a Chromecast or connect via HDMI. The dual subtitle overlay travels with the video output, so it shows up on the bigger screen too.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Is It Worth It for Language Learning?</h2>
          <p>For anyone using Netflix as part of their language-learning routine, dual subtitles are arguably the highest-leverage upgrade available. You stay inside the show, never have to pause to look something up, and start absorbing how words actually behave in conversation rather than how textbooks describe them. Research on second-language acquisition consistently finds that comprehensible input &mdash; content where you understand roughly 80&ndash;90% of what&apos;s said &mdash; is where most real learning happens. Dual subtitles take a show that&apos;s 30% comprehensible and push it well past that threshold instantly.</p>

          <h2 className="text-3xl font-bold text-white mt-16 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Does Netflix have dual subtitles?", a: "No. The Netflix player only supports one subtitle language at a time. There is no setting, no keyboard shortcut, and no hidden developer option to enable a second track. Free Chrome extensions like Funlingo add this feature on top of the existing player." },
              { q: "Can I add dual subtitles to Netflix for free?", a: "Yes. Funlingo is a completely free Chrome extension that adds dual subtitles to Netflix at no cost. There is no premium tier locking the feature and no account requirement. Install it, pick your two languages, and the second subtitle track appears automatically." },
              { q: "Do dual subtitles work on the Netflix mobile app?", a: "No. The mobile app does not support browser extensions. To get dual subtitles on a phone or tablet, you would have to watch in a desktop browser. The most common workaround for TV viewing is to cast Chrome from a laptop to your TV via Chromecast or HDMI." },
              { q: "Does Netflix plan to add dual subtitles?", a: "Netflix has not announced any plans to support dual subtitles natively. Language learners have requested the feature for years, but it remains a third-party use case. Free extensions like Funlingo fill the gap reliably." },
              { q: "Will dual subtitle extensions get my Netflix account banned?", a: "No. Funlingo and similar extensions only modify how subtitles are displayed in your own browser. They don't bypass Netflix's authentication, scrape video, or do anything that violates Netflix's terms of service. Millions of language learners use them without issue." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                <h4 className="font-bold text-white text-lg mb-2">Q: {faq.q}</h4>
                <p className="text-gray-400 m-0">A: {faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get Dual Subtitles on Netflix in 30 Seconds</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Funlingo is free, requires no account, and works on every Netflix title. Add a second subtitle language plus word-level lookups in one install.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Add Funlingo to Chrome &mdash; Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
