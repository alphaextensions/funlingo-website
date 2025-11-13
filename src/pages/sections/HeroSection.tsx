import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const HeroSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="flex flex-col w-full items-center justify-center gap-8 md:gap-20 lg:gap-32 pt-4 md:pt-16 lg:pt-20 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[linear-gradient(180deg,#000000_0%,#1a0a28_38%,#7A1CAC_74%,#C642FC_95%)] min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50%] md:bottom-[-15%] lg:bottom-[-100%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] lg:w-[2308px] lg:h-[1014px] rounded-full border border-solid border-[#C642FC] [background:radial-gradient(50%_50%_at_50%_50%,#000000_82%,#7A1CAC_100%)] animate-pulse-glow" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-0" />

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-6 lg:gap-12 xl:gap-16 relative z-10 w-full max-w-[1200px]">
        {/* Text Content */}
        <div
          className={`flex flex-col max-w-full lg:max-w-[500px] items-center lg:items-start gap-4 md:gap-6 lg:gap-8 relative flex-1 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Heading */}
          <div className="flex flex-col items-center lg:items-start gap-3 md:gap-4 relative self-stretch w-full">
            <h1
              className="relative flex items-center justify-center lg:justify-start self-stretch font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[length:var(--heading-h1-font-size)] text-center lg:text-left tracking-[var(--heading-h1-letter-spacing)] leading-[1.1] lg:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              Dual Subtitles <br className="hidden sm:block" />
              for Youtube and <br className="hidden sm:block" />
              Netflix
            </h1>

            <p
              className="relative flex items-center justify-center lg:justify-start self-stretch font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-base sm:text-lg md:text-xl lg:text-[length:var(--body-large-regular-font-size)] text-center lg:text-left tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed lg:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              Funlingo helps you master new languages naturally through instant
              translations and AI-powered explanations on YouTube, Netflix, and
              more.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <a
  href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
  target="_blank"
  rel="noopener noreferrer"
>
            <Button className="relative bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] h-12 sm:h-11 px-6 sm:px-5 py-3 sm:py-2 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 group w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textwhite text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)]">
                Download Extension
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7A1CAC] to-[#C642FC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Button>
            </a>

            <a
  href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
  target="_blank"
  rel="noopener noreferrer"
>
            <Button className="relative bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(229,229,232,1)_100%)] h-12 sm:h-11 px-6 sm:px-5 py-3 sm:py-2 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl group w-full sm:w-auto">
              <span className="relative flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textblack text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)] group-hover:text-gray-800 transition-colors duration-300">
                Try Demo
              </span>
            </Button>
            </a>
          </div>
        </div>

        {/* Product Image - Normal for mobile, expanded for desktop */}
        <div
          className={`flex-1 flex items-center justify-end transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative w-full max-w-full flex justify-end items-center lg:overflow-visible overflow-hidden">
            {/* Mobile: Normal behavior */}
            <div className="block lg:hidden relative w-full">
              <img
                src="/figmaAssets/heroImg2.png"
                alt="Funlingo Product Showcase"
                className="rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-500 object-cover animate-fade-in-up w-full"
                style={{
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "cover",
                  margin: 0,
                }}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl -z-10 scale-105 opacity-70"></div>
            </div>

            {/* Desktop: Expanded behavior */}
            <div className="hidden lg:block relative" style={{ width: "160%", marginRight: "-20%" }}>
              <img
                src="/figmaAssets/heroImg2.png"
                alt="Funlingo Product Showcase"
                className="rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-500 object-cover animate-fade-in-up"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "650px",
                  minHeight: "450px",
                  objectFit: "cover",
                  margin: 0,
                }}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl -z-10 scale-105 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div
        className={`flex flex-col w-full max-w-4xl xl:max-w-[1120px] items-center justify-center gap-6 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ animationDelay: "1000ms" }}
      >
        <div className="w-full max-w-4xl xl:max-w-[1120px] px-4 sm:px-8">
          <img
            className="relative w-full opacity-80 hover:opacity-100 transition-opacity duration-300 animate-fade-in-up"
            alt="Trusted companies logos"
            src="/figmaAssets/container.svg"
          />
        </div>
      </div>

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
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(198, 66, 252, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(198, 66, 252, 0.6);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};