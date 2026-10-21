"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { KeyTakeaways, DualSubtitleDemo } from "@/app/blog/_components/graphics";
import { Badge } from "@/components/ui/badge";

export default function DoesNetflixHaveDualSubtitlesContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-[var(--bg)] to-[var(--bg)] z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(200,31,212,0.1)] text-[#C81FD4] border-[#C81FD4]/20 px-3 py-1">Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">Does Netflix Have Dual Subtitles?</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[var(--text-dim)] font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 18, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 3 min read</div>
          </div>
        </div>
      </section>
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-lg max-w-none text-[var(--text-dim)]">
          <KeyTakeaways
            items={[
              "Netflix has no built-in dual subtitle feature — the player shows only one subtitle language at a time.",
              "You can get dual subtitles on Netflix for free with the Funlingo Chrome extension.",
              "Setup takes about 30 seconds: install Funlingo, open Netflix in Chrome, and toggle on your two languages.",
              "Dual subtitles only work in the Chrome desktop browser, not in the Netflix mobile, tablet, or smart TV apps.",
            ]}
          />
          <p className="leading-relaxed text-[var(--text-dim)] mb-6">Netflix does not have a built-in dual subtitle feature. The Netflix player only allows you to select one subtitle language at a time. However, you can get dual subtitles on Netflix for free using a Chrome extension called Funlingo. Once installed, Funlingo overlays a second subtitle track on top of the Netflix player, showing both your native language and your target language simultaneously. The setup takes about 30 seconds.</p>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">How to Set Up Dual Subtitles on Netflix</h2>
          <p className="text-[var(--text-dim)] mb-6">Getting dual subtitles running on Netflix is quick and straightforward. Follow these steps:</p>

          <div className="space-y-4 mb-8">
            <div className="bg-[var(--surface)] p-5 rounded-xl border border-[var(--border)]">
              <strong className="text-[var(--text)]">Step 1: Install Funlingo</strong>
              <p className="text-[var(--text-dim)] text-sm mt-1">Go to the <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?hl=en" className="text-[#C81FD4] hover:underline" target="_blank" rel="noopener noreferrer">Funlingo Chrome Web Store page</a> and click &quot;Add to Chrome.&quot; Confirm the installation when prompted.</p>
            </div>
            <div className="bg-[var(--surface)] p-5 rounded-xl border border-[var(--border)]">
              <strong className="text-[var(--text)]">Step 2: Open Netflix in Chrome</strong>
              <p className="text-[var(--text-dim)] text-sm mt-1">Navigate to <a href="https://www.netflix.com" className="text-[#C81FD4] hover:underline" target="_blank" rel="noopener noreferrer">netflix.com</a> in your Chrome browser and sign in to your account.</p>
            </div>
            <div className="bg-[var(--surface)] p-5 rounded-xl border border-[var(--border)]">
              <strong className="text-[var(--text)]">Step 3: Play a Show or Movie</strong>
              <p className="text-[var(--text-dim)] text-sm mt-1">Choose any title that has subtitles in your target language. Netflix originals usually offer the widest subtitle selection.</p>
            </div>
            <div className="bg-[var(--surface)] p-5 rounded-xl border border-[var(--border)]">
              <strong className="text-[var(--text)]">Step 4: Enable Dual Subtitles</strong>
              <p className="text-[var(--text-dim)] text-sm mt-1">Click the Funlingo icon in your Chrome toolbar or inside the Netflix player controls. Toggle on dual subtitles and select your two languages. Both subtitle tracks will appear on screen instantly.</p>
            </div>
          </div>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Why Use Dual Subtitles for Language Learning?</h2>
          <DualSubtitleDemo
            targetLang="Spanish"
            target="No tengo miedo de nada."
            highlight="miedo"
            native="I am not afraid of anything."
          />
          <p className="text-[var(--text-dim)] mb-6">Dual subtitles turn Netflix into a powerful language learning tool. By displaying both your native language and your target language at the same time, you can follow conversations naturally without pausing or switching subtitle tracks. This approach builds vocabulary in context, reinforces grammar patterns through real dialogue, and trains your ear to connect spoken words with their written form. Research on language acquisition consistently shows that comprehensible input from authentic media is one of the most effective ways to improve fluency.</p>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Which Extension Is Best for Dual Subtitles?</h2>
          <p className="text-[var(--text-dim)] mb-6">Several Chrome extensions offer dual subtitles on Netflix, but they differ in pricing, platform support, and extra features. Funlingo is completely free with no premium tier or feature limits. Other popular options like Language Reactor and Trancy offer dual subtitles but lock advanced features behind paid subscriptions. For a detailed side-by-side comparison, check out our guide on <a href="/blog/netflix-language-learning-extensions" className="text-[#C81FD4] hover:underline">Netflix language learning extensions</a>. You can also read our full breakdown of <a href="/blog/netflix-dual-subtitles" className="text-[#C81FD4] hover:underline">how to get dual subtitles on Netflix</a> for step-by-step setup instructions and troubleshooting tips.</p>

          <hr className="border-[var(--border)] my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">Frequently Asked Questions</h2>
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] mb-12">
            <div className="space-y-4">
              <div>
                <strong className="text-[var(--text)] block mb-1">Does Netflix support dual subtitles natively?</strong>
                <p className="text-[var(--text-dim)] text-sm">No. Netflix only allows one subtitle language at a time. To display two subtitle languages simultaneously, you need a free Chrome extension like Funlingo.</p>
              </div>
              <div>
                <strong className="text-[var(--text)] block mb-1">How do I get dual subtitles on Netflix for free?</strong>
                <p className="text-[var(--text-dim)] text-sm">Install the free Funlingo Chrome extension, open Netflix in Chrome, play any show or movie, and toggle on dual subtitles. The entire setup takes about 30 seconds.</p>
              </div>
              <div>
                <strong className="text-[var(--text)] block mb-1">Do dual subtitles work on the Netflix app?</strong>
                <p className="text-[var(--text-dim)] text-sm">No. Dual subtitle extensions only work in the Chrome desktop browser. The Netflix mobile app, smart TV apps, and tablet apps do not support browser extensions.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(200,31,212,0.05)] border border-[#C81FD4]/20">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Try Dual Subtitles on Netflix Today</h2>
            <p className="text-lg text-[var(--text-dim)] mb-8 max-w-xl mx-auto">Set up dual subtitles in 30 seconds. Free forever, no premium tier, no feature limits.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Funlingo Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
