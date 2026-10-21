"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import {
  Languages,
  Sparkles,
  BookMarked,
  Globe,
  MonitorPlay,
  Gift,
  Download,
  MousePointerClick,
  Pin,
  Play,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?hl=en";

const features = [
  {
    icon: Languages,
    title: "Dual Subtitles",
    description:
      "See two subtitle tracks at once — your target language and your native language — directly inside the video player.",
  },
  {
    icon: Sparkles,
    title: "AI Translation & Definitions",
    description:
      "Hover any word for instant, context-aware AI translations, grammar notes, and real example phrases.",
  },
  {
    icon: BookMarked,
    title: "Vocabulary Builder",
    description:
      "Save any word or phrase with one click. Every entry keeps its translation and the sentence you found it in.",
  },
  {
    icon: Globe,
    title: "100+ Languages",
    description:
      "From Spanish and Japanese to Korean, German, Arabic, and Hindi — set your languages independently.",
  },
  {
    icon: MonitorPlay,
    title: "8 Platforms",
    description:
      "Works on Netflix, YouTube, Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy, and Coursera.",
  },
  {
    icon: Gift,
    title: "100% Free",
    description:
      "No paywalls, no premium tier, no account required. Every feature is free, forever.",
  },
];

const steps = [
  {
    icon: Download,
    title: "Open the Chrome Web Store",
    description:
      "Visit the Funlingo listing on the Chrome Web Store using the button above.",
  },
  {
    icon: MousePointerClick,
    title: "Click Add to Chrome",
    description:
      "Click Add to Chrome, then confirm with Add extension. It installs in seconds.",
  },
  {
    icon: Pin,
    title: "Pin Funlingo",
    description:
      "Pin Funlingo to your toolbar so it is always one click away while you watch.",
  },
  {
    icon: Play,
    title: "Press Play & Learn",
    description:
      "Open Netflix, YouTube, or any supported platform and dual subtitles appear automatically.",
  },
];

const faqs = [
  {
    question: "Is the Funlingo Chrome extension free?",
    answer:
      "Yes. The Funlingo Chrome extension is 100% free with no hidden costs, premium tiers, or paywalls. You get dual subtitles, AI translation, AI word definitions, and the vocabulary builder at no charge. Just add it to Chrome and start using every feature immediately, no account required.",
  },
  {
    question: "What platforms does the Funlingo extension work on?",
    answer:
      "Funlingo works on 8 platforms: Netflix, YouTube, Amazon Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy, and Coursera. Dual subtitles and AI translation integrate directly into each video player, so you can learn languages while watching movies, shows, anime, and online courses.",
  },
  {
    question: "How do I install the Funlingo Chrome extension?",
    answer:
      "Open the Funlingo listing on the Chrome Web Store, click Add to Chrome, then confirm by clicking Add extension. Pin Funlingo to your toolbar, open any supported platform like Netflix or YouTube, and the dual subtitles will appear automatically. The whole process takes under a minute.",
  },
  {
    question: "Does the Funlingo extension support my language?",
    answer:
      "Almost certainly. Funlingo supports 100+ languages for subtitle translation, including Spanish, French, Japanese, Korean, Mandarin, German, Portuguese, Italian, Arabic, Hindi, and many more. You can set your target language and your native language independently for true dual-subtitle learning.",
  },
  {
    question: "Is Funlingo a safe Chrome extension?",
    answer:
      "Yes. Funlingo is published on the official Chrome Web Store, where it is reviewed by Google, and is rated 4.8 out of 5 stars. It runs locally in your browser to display subtitles and does not require you to create an account to start learning.",
  },
];

const ChromeExtensionContent = (): React.JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--bg)] px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--text-dim)]">
            <Sparkles className="w-4 h-4 text-[#C81FD4]" />
            Free Chrome extension · Rated 4.8/5
          </span>

          <h1 className="text-[var(--text)] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
            Funlingo Chrome Extension
          </h1>

          <p className="text-[var(--text-dim)] text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
            Free dual subtitles and AI translation on Netflix, YouTube, Prime
            Video and 5 more platforms. Learn languages in 100+ tongues while you
            watch.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="relative bg-[linear-gradient(135deg,#C81FD4_0%,#9A1C8E_100%)] h-12 px-7 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 group w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-2 text-[var(--text)] font-medium text-base whitespace-nowrap">
                  <Download className="w-5 h-5" />
                  Add to Chrome — It&apos;s Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9A1C8E] to-[#C81FD4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </Button>
            </a>

            <a href="#how-it-works">
              <Button className="relative bg-[var(--surface)] h-12 px-7 rounded-lg overflow-hidden border border-white/15 hover:bg-[var(--surface)] transition-all duration-300 hover:scale-105 group w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center text-[var(--text)] font-medium text-base whitespace-nowrap">
                  See how it works
                </span>
              </Button>
            </a>
          </div>

          <p className="text-[var(--text-dim2)] text-sm mt-1">
            No account needed · Installs in under a minute
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-[var(--text)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Everything you need to learn while watching
            </h2>
            <p className="text-[var(--text-dim)] text-lg mt-4">
              One free extension turns your favorite streaming and learning sites
              into an immersive language classroom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7 hover:border-[#C81FD4]/40 hover:bg-[var(--surface)] transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#C81FD4_0%,#9A1C8E_100%)] mb-5">
                    <Icon className="w-6 h-6 text-[var(--text)]" />
                  </div>
                  <h3 className="text-[var(--text)] font-semibold text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to install */}
      <section
        id="how-it-works"
        className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[var(--bg2)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-[var(--text)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Install in under a minute
            </h2>
            <p className="text-[var(--text-dim)] text-lg mt-4">
              No setup headaches. Add Funlingo to Chrome and start learning right
              away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7"
                >
                  <span className="absolute top-6 right-6 text-5xl font-bold text-white/5">
                    {index + 1}
                  </span>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#C81FD4_0%,#9A1C8E_100%)] mb-5">
                    <Icon className="w-6 h-6 text-[var(--text)]" />
                  </div>
                  <h3 className="text-[var(--text)] font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[var(--text)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-[var(--text-dim)] text-lg mt-4">
              Everything about the Funlingo Chrome extension.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7"
              >
                <h3 className="text-[var(--text)] font-semibold text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-[var(--text-dim)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[var(--bg)]">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,#1a0a28_0%,#9A1C8E_120%)] px-6 py-14 md:px-12 md:py-20 text-center">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C81FD4]/30 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight max-w-2xl">
              Start learning languages while you watch
            </h2>
            <p className="text-white/90 text-lg max-w-xl">
              Join thousands of learners using Funlingo for free dual subtitles
              and AI translation across 8 platforms.
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="relative bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(229,229,232,1)_100%)] h-12 px-8 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <span className="relative z-10 flex items-center justify-center gap-2 text-black font-medium text-base whitespace-nowrap">
                  <Download className="w-5 h-5" />
                  Add to Chrome — It&apos;s Free
                </span>
              </Button>
            </a>
            <p className="text-white/70 text-sm">
              Free forever · Rated 4.8/5 on the Chrome Web Store
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ChromeExtensionContent;
