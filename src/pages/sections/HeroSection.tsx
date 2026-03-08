
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const HeroSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="flex flex-col w-full items-center justify-center gap-8 md:gap-20 lg:gap-24 pt-4 md:pt-12 lg:pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[linear-gradient(180deg,#000000_0%,#1a0a28_38%,#7A1CAC_74%,#C642FC_95%)] min-h-screen">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40%] md:bottom-[-10%] lg:bottom-[-80%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] lg:w-[2000px] lg:h-[900px] rounded-full border border-solid border-[#C642FC] [background:radial-gradient(50%_50%_at_50%_50%,#000000_82%,#7A1CAC_100%)] animate-pulse-glow" />

      {/* Additional Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-float" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-0" />

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 relative z-10 w-full max-w-[1400px] mt-8 lg:mt-0">
        {/* Text Content */}
        <div
          className={`flex flex-col max-w-full lg:max-w-[500px] xl:max-w-[550px] items-center lg:items-start gap-4 md:gap-6 lg:gap-8 relative flex-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Main Heading */}
          <div className="flex flex-col items-center lg:items-start gap-3 md:gap-4 relative self-stretch w-full">
            <h1
              className="relative flex items-center justify-center lg:justify-start self-stretch font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[length:var(--heading-h1-font-size)] text-center lg:text-left tracking-[var(--heading-h1-letter-spacing)] leading-[1.1] lg:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              Dual Subtitles <br className="hidden sm:block" />
              for Youtube, <br className="hidden sm:block" />
              Netflix and Prime
            </h1>

            <p
              className="relative flex items-center justify-center lg:justify-start self-stretch font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl md:text-2xl lg:text-[length:var(--body-large-regular-font-size)] text-center lg:text-left tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed lg:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              Turn your YouTube, Netflix and Prime time into an immersive language lesson. Funlingo provides bilingual subtitles, instant AI definitions, and vocabulary building—a completely free alternative to paid extensions.
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
                  Add to Chrome - It's Free
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
                  How it Works
                </span>
              </Button>
            </a>
          </div>
        </div>

        {/* Enhanced Product Image with Rotating Border */}
        <div
          className={`flex-1 flex items-center justify-center lg:justify-end transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative w-full max-w-full flex justify-center lg:justify-end items-center">
            {/* Mobile: Normal behavior with rotating border */}
            <div className="block lg:hidden relative w-full max-w-2xl">
              <div className="relative rounded-2xl overflow-visible animate-rotate-border">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#410c46] via-[#b037e5] to-[#410c46] bg-[length:200%_200%] opacity-80 -z-10"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/figmaAssets/heroImg3.png"
                    alt="Funlingo dual subtitle interface displaying English and Spanish subtitles on Netflix"
                    className="rounded-2xl w-full h-auto object-contain shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-500 animate-fade-in-up"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
              </div>

              {/* Enhanced Glow Effects - Theme Matching */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/40 via-pink-500/30 to-purple-600/40 rounded-3xl blur-2xl opacity-60 -z-20 animate-theme-glow" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/30 via-transparent to-pink-500/25 blur-lg -z-10 scale-105 opacity-50" />
            </div>

            {/* Desktop: Extended width/height with rotating border */}
            <div className="hidden lg:block relative w-full max-w-5xl mr-0">
              <div className="relative rounded-3xl overflow-visible animate-rotate-border">
                {/* Rotating Border */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#410c46] via-[#b037e5] to-[#410c46] bg-[length:200%_200%] opacity-80 -z-10"></div>

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden">
                  <img
                    src="/figmaAssets/heroImg3.png"
                    alt="Funlingo dual subtitle interface displaying English and Spanish subtitles on Netflix"
                    className="rounded-3xl w-full h-auto object-contain shadow-3xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-500 animate-fade-in-up"
                    style={{
                      maxHeight: "75vh",
                      minHeight: "355px",
                      width: "100%",
                    }}
                  />
                </div>

                {/* Professional Theme-Matching Glow Effects */}
                <div className="absolute -inset-12 bg-gradient-to-r from-purple-600/50 via-pink-500/40 to-purple-600/50 rounded-4xl blur-3xl opacity-70 -z-20 animate-theme-glow" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/40 via-transparent to-pink-500/35 blur-xl -z-10 scale-105 opacity-60" />

                {/* Additional Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient(circle, rgba(198,66,252,0.3) 0%, rgba(122,28,172,0.1) 50%, transparent 70%) rounded-full blur-xl opacity-60 -z-15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div
        className={`flex flex-col w-full max-w-4xl xl:max-w-[1120px] items-center justify-center gap-6 relative z-10 mt-8 lg:mt-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        style={{ animationDelay: "1000ms" }}
      >
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-90 hover:opacity-100 transition-opacity duration-300">
          <a href="https://launchigniter.com/product/funlingo?ref=badge-funlingo" target="_blank">
            <img src="https://launchigniter.com/api/badge/funlingo?theme=dark" alt="Featured on LaunchIgniter" width="212" height="55" />
          </a>

          <a href="https://www.producthunt.com/products/funlingo/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-funlingo" target="_blank" rel="noopener noreferrer">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1126955&theme=dark" alt="Funlingo - Dual Subtitles for Netflix, Youtube & More! | Product Hunt" style={{ width: "250px", height: "54px" }} width="250" height="54" />
          </a>

          <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer">
            <img src="https://twelve.tools/badge0-dark.svg" alt="Featured on Twelve Tools" width="200" height="54" />
          </a>

          <a href="https://wired.business" target="_blank">
            <img src="https://wired.business/badge0-dark.svg" alt="Featured on Wired Business" width="200" height="54" />
          </a>

          <a href="https://toolfame.com/item/funlingo" target="_blank" rel="noopener noreferrer">
            <img src="https://toolfame.com/badge-dark.svg" alt="Featured on toolfame.com" style={{ height: "54px", width: "auto" }} />
          </a>

          <a href="https://fazier.com/launches/getfunlingo.com" target="_blank" rel="noopener noreferrer">
            <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark" width="120" alt="Fazier badge" />
          </a>

          <a href="https://frogdr.com/getfunlingo.com?utm_source=getfunlingo.com" target="_blank">
            <img src="https://frogdr.com/getfunlingo.com/badge-white.svg" alt="Monitor your Domain Rating with FrogDR" width="250" height="54" />
          </a>

          <a href="https://www.foundrlist.com/product/funlingo" target="_blank" rel="noopener noreferrer">
            <img src="https://www.foundrlist.com/api/badge/funlingo" alt="Funlingo - Live on FoundrList" width="160" height="64" />
          </a>

          <a href="https://seojuice.com" target="_blank" rel="noopener noreferrer">
            <img src="https://seojuiced.b-cdn.net/seojuice/static/images/backlink-badge.svg" alt="SEOJuice" height="20" />
          </a>

          <a href="https://tinylaunch.com" target="_blank" rel="noopener">
            <img src="https://tinylaunch.com/tinylaunch_badge_1.svg" alt="TinyLaunch Badge" style={{ width: "202px", height: "auto" }} />
          </a>
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
        @keyframes theme-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        @keyframes rotate-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-theme-glow {
          animation: theme-glow 4s ease-in-out infinite;
        }
        .animate-rotate-border {
          animation: rotate-border 3s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
