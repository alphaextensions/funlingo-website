"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Shield, Lock, Eye, Globe, Mail } from "lucide-react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { useT } from "@/app/i18n/I18nProvider";
import type { Strings } from "@/app/i18n/pages/privacy";

const sectionIcons = [
  <Eye key="eye" className="w-6 h-6" />,
  <Lock key="lock" className="w-6 h-6" />,
  <Shield key="shield" className="w-6 h-6" />,
  <Globe key="globe" className="w-6 h-6" />,
  <Lock key="lock2" className="w-6 h-6" />,
  <Shield key="shield2" className="w-6 h-6" />,
  <Eye key="eye2" className="w-6 h-6" />,
];

export default function PrivacyContent({ s }: { s: Strings }) {
  const { locale } = useT();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const policySections = s.sections.map((section, i) => ({
    ...section,
    icon: sectionIcons[i] ?? <Shield className="w-6 h-6" />,
  }));

  return (
    <div className="flex flex-col items-start relative fnl-root min-h-screen">
      {/* Navigation Header */}
      <Navbar currentPage="/privacy" />

      {/* Main Content */}
      <main
        ref={sectionRef}
        className="flex flex-col w-full items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="flex flex-col max-w-4xl w-full items-center gap-12 sm:gap-16">
          {/* Hero Section */}
          <div
            className={`flex flex-col items-center gap-6 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(200,31,212,0.1)] border border-[#C81FD4]/20 text-[#C81FD4] text-sm font-medium mb-2 animate-fade-in-up">
              <Shield className="w-4 h-4" />
              {s.hero.badge}
            </div>

            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              {s.hero.title}
            </h1>

            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-3xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              {s.hero.intro}
            </p>

            {locale !== "en" && (
              <p className="text-textbody text-sm opacity-80 max-w-2xl">
                {s.translationNotice}{" "}
                <a
                  href="/privacy-policy"
                  hrefLang="en"
                  className="underline hover:text-textwhite"
                >
                  {s.englishLinkText}
                </a>
              </p>
            )}
          </div>

          {/* Last Updated */}
          <div
            className={`w-full text-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(122,28,172,0.2)] border border-[#9A1C8E]/30 text-textbody text-sm">
              {s.effectiveDate}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="w-full space-y-8">
            {policySections.map((section, index) => (
              <div
                key={index}
                className={`group p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm transition-all duration-500 hover:border-[#ffffff40] animate-fade-in-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#C81FD4] to-[#9A1C8E] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-[var(--text)]">{section.icon}</div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-body-normal-medium text-textwhite text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C81FD4] group-hover:to-[#9A1C8E] transition-all duration-300">
                      {section.title}
                    </h3>

                    <p className="font-body-normal-regular text-textbody text-[length:var(--body-normal-regular-font-size)] leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div
            className={`w-full transition-all duration-1000 delay-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="p-8 sm:p-12 rounded-2xl bg-[rgba(122,28,172,0.1)] border border-[#9A1C8E]/30 backdrop-blur-sm text-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(200,31,212,0.2)] border border-[#C81FD4]/30 text-[#C81FD4] text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  {s.contact.badge}
                </div>

                <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl">
                  {s.contact.title}
                </h3>

                <div className="space-y-4 font-body-normal-regular text-textbody text-[length:var(--body-normal-regular-font-size)] leading-relaxed max-w-2xl mx-auto">
                  <p>
                    {s.contact.text}
                  </p>

                  <div className="flex justify-center">
                    <Button className="bg-[var(--surface-2)] hover:bg-[rgba(255,255,255,0.2)] text-textwhite font-body-normal-medium h-12 px-8 py-3 rounded-lg border border-[var(--border)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group">
                      <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      getfunlingo@gmail.com
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div
            className={`text-center transition-all duration-1000 delay-1100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-[rgba(200,31,212,0.1)] border border-[#C81FD4]/20">
              <Shield className="w-5 h-5 text-[#C81FD4]" />
              <p className="font-body-normal-medium text-textwhite">
                {s.commitment}
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    <FooterSection />
    </div>
  );
}
