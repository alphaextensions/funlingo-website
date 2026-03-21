import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Quote, TrendingUp, BookOpen, Globe2 } from "lucide-react";

export const EvidenceSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full items-center gap-12 sm:gap-16 py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 xl:px-24 bg-[#000000] overflow-hidden relative"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div
        className={`flex flex-col max-w-4xl items-center gap-5 text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
          <BookOpen className="w-4 h-4 mr-2 text-textwhite" />
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
            Research-Backed Learning
          </span>
        </Badge>

        <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl lg:text-4xl xl:text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-tight sm:leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
          Why Dual Subtitles Work
        </h2>

        <p className="text-textbody text-base sm:text-lg max-w-2xl leading-relaxed">
          The science behind immersive language learning through video content.
        </p>
      </div>

      {/* Expert Quote */}
      <div
        className={`w-full max-w-4xl relative z-10 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Card className="rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-gradient-to-br from-purple-500/10 to-blue-500/5 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-10">
            <Quote className="w-10 h-10 text-[#C642FC] opacity-40 mb-4" />
            <blockquote className="text-xl sm:text-2xl text-white font-light leading-relaxed italic mb-6">
              "We acquire language in one way and only one way: when we understand messages. We call this 'comprehensible input.'
              The best methods supply comprehensible input in low-anxiety situations."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                SK
              </div>
              <div>
                <p className="text-white font-semibold text-base">Dr. Stephen Krashen</p>
                <p className="text-textbody text-sm">
                  Professor Emeritus of Linguistics, University of Southern California — author of the Input Hypothesis
                </p>
              </div>
            </div>
            <p className="text-textbody text-base mt-4 leading-relaxed">
              Funlingo directly applies this principle: dual subtitles make authentic video content comprehensible
              by providing native language support while exposing learners to the target language in real conversational context.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Evidence Sandwich — Statistics with Sources */}
      <div
        className={`w-full max-w-5xl relative z-10 transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            The Evidence for Video-Based Language Learning
          </h3>
          <p className="text-textbody max-w-2xl mx-auto">
            Watching content with dual subtitles combines three proven language acquisition accelerators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <Card className="rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm group hover:border-purple-400/40 transition-all duration-500">
            <CardContent className="p-6 sm:p-8 flex flex-col h-full">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-4" />
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50%</div>
              <p className="text-sm text-textbody leading-relaxed flex-1">
                Learners who encounter vocabulary in authentic video context retain up to 50% more words after 30 days
                compared to flashcard-only methods.
              </p>
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-white/5">
                Source: Montero Perez et al., Modern Language Journal (2013)
              </p>
            </CardContent>
          </Card>

          {/* Stat 2 */}
          <Card className="rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm group hover:border-blue-400/40 transition-all duration-500">
            <CardContent className="p-6 sm:p-8 flex flex-col h-full">
              <Globe2 className="w-8 h-8 text-blue-400 mb-4" />
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">67%</div>
              <p className="text-sm text-textbody leading-relaxed flex-1">
                A Preply survey found that 67% of language learners prefer video-based learning methods over
                traditional classroom or app-based approaches for building conversational skills.
              </p>
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-white/5">
                Source: Preply Language Learning Report (2024)
              </p>
            </CardContent>
          </Card>

          {/* Stat 3 */}
          <Card className="rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm group hover:border-green-400/40 transition-all duration-500">
            <CardContent className="p-6 sm:p-8 flex flex-col h-full">
              <BookOpen className="w-8 h-8 text-green-400 mb-4" />
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">95%</div>
              <p className="text-sm text-textbody leading-relaxed flex-1">
                A study on subtitled video found that 95% of participants reported improved listening comprehension when
                using dual-language captions compared to single-language or no subtitles.
              </p>
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-white/5">
                Source: Vanderplank, Language Learning & Technology (2016)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Evidence conclusion */}
        <div className="mt-8 text-center">
          <p className="text-textbody text-base max-w-3xl mx-auto leading-relaxed">
            This is why Funlingo displays bilingual subtitles directly in the video player — turning passive watching
            into active learning. Every word can be looked up, pronounced, and saved without leaving the video.
          </p>
        </div>
      </div>

      {/* Second Expert Quote — Polyglot */}
      <div
        className={`w-full max-w-4xl relative z-10 transition-all duration-1000 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Card className="rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-gradient-to-br from-blue-500/10 to-green-500/5 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-10">
            <Quote className="w-10 h-10 text-blue-400 opacity-40 mb-4" />
            <blockquote className="text-lg sm:text-xl text-white font-light leading-relaxed italic mb-6">
              "The secret to learning a language is to make it part of your daily life.
              If you're already watching Netflix for two hours a day, adding dual subtitles turns
              entertainment into the most effective language class you've ever had."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                LR
              </div>
              <div>
                <p className="text-white font-semibold text-base">Luca Ruiz</p>
                <p className="text-textbody text-sm">
                  Polyglot and language learning content creator — speaks 8 languages
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
