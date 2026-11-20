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
import type { Strings } from "@/app/i18n/pages/chromeExtension";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en";

const featureIcons = [Languages, Sparkles, BookMarked, Globe, MonitorPlay, Gift];

const stepIcons = [Download, MousePointerClick, Pin, Play];

const ChromeExtensionContent = ({ s }: { s: Strings }): React.JSX.Element => {
  const features = s.features.items.map((item, i) => ({
    ...item,
    icon: featureIcons[i] ?? Sparkles,
  }));
  const steps = s.install.steps.map((item, i) => ({
    ...item,
    icon: stepIcons[i] ?? Play,
  }));
  const faqs = s.faq.items;

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
            {s.hero.badge}
          </span>

          <h1 className="text-[var(--text)] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
            {s.hero.title}
          </h1>

          <p className="text-[var(--text-dim)] text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
            {s.hero.subtitle}
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
                  {s.hero.addToChrome}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9A1C8E] to-[#C81FD4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </Button>
            </a>

            <a href="#how-it-works">
              <Button className="relative bg-[var(--surface)] h-12 px-7 rounded-lg overflow-hidden border border-white/15 hover:bg-[var(--surface)] transition-all duration-300 hover:scale-105 group w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center text-[var(--text)] font-medium text-base whitespace-nowrap">
                  {s.hero.seeHowItWorks}
                </span>
              </Button>
            </a>
          </div>

          <p className="text-[var(--text-dim2)] text-sm mt-1">
            {s.hero.note}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-[var(--text)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              {s.features.title}
            </h2>
            <p className="text-[var(--text-dim)] text-lg mt-4">
              {s.features.subtitle}
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
              {s.install.title}
            </h2>
            <p className="text-[var(--text-dim)] text-lg mt-4">
              {s.install.subtitle}
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
              {s.faq.title}
            </h2>
            <p className="text-[var(--text-dim)] text-lg mt-4">
              {s.faq.subtitle}
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
              {s.cta.title}
            </h2>
            <p className="text-white/90 text-lg max-w-xl">
              {s.cta.subtitle}
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="relative bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(229,229,232,1)_100%)] h-12 px-8 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <span className="relative z-10 flex items-center justify-center gap-2 text-black font-medium text-base whitespace-nowrap">
                  <Download className="w-5 h-5" />
                  {s.cta.addToChrome}
                </span>
              </Button>
            </a>
            <p className="text-white/70 text-sm">
              {s.cta.note}
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ChromeExtensionContent;
