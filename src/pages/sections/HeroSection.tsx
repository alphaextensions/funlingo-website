import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const HeroSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="flex flex-col w-full items-center justify-center gap-16 md:gap-24 lg:gap-48 pt-16 md:pt-20 lg:pt-24 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[linear-gradient(180deg,#000000_0%,#1a0a28_38%,#7A1CAC_74%,#C642FC_95%)] min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] lg:w-[2308px] lg:h-[1014px] rounded-full border border-solid border-[#C642FC] [background:radial-gradient(50%_50%_at_50%_50%,#000000_82%,#7A1CAC_100%)] animate-pulse-glow" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-0" />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-[120px] relative z-10 w-full max-w-[1008px]">
        {/* Text Content */}
        <div
          className={`flex flex-col max-w-full lg:max-w-[720px] items-center lg:items-start gap-6 md:gap-8 lg:gap-10 relative flex-1 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Announcement Badge */}
          <div className="inline-flex items-center justify-center gap-2 pl-2 pr-4 py-2 relative rounded-[84px] overflow-hidden border-[none] shadow-[0px_2px_4px_1px_#0000001a,0px_1px_3px_#0000000f] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[84px] before:[background:linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(229,229,232,0.1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none hover:scale-105 transition-transform duration-300 animate-fade-in-up">
            <Badge className="inline-flex flex-col items-start px-[7px] py-px relative rounded-[40px] bg-[linear-gradient(180deg,#C642FC_0%,#7A1CAC_100%)] border-0 h-auto animate-pulse">
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] whitespace-nowrap [font-style:var(--body-xs-medium-font-style)]">
                New
              </span>
            </Badge>

            <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-textwhite text-[length:var(--body-small-regular-font-size)] tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] whitespace-nowrap [font-style:var(--body-small-regular-font-style)]">
              Now available for Chrome & Firefox
            </span>
          </div>

          {/* Main Heading */}
          <div className="flex flex-col items-center lg:items-start gap-4 md:gap-6 relative self-stretch w-full">
            <h1
              className="relative flex items-center justify-center lg:justify-start self-stretch font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-4xl sm:text-5xl lg:text-6xl xl:text-[length:var(--heading-h1-font-size)] text-center lg:text-left tracking-[var(--heading-h1-letter-spacing)] leading-[1.1] lg:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Learn Languages <br className="hidden sm:block" />
              While Watching <br className="hidden sm:block" />
              Your Favorite Shows
            </h1>

            <p
              className="relative flex items-center justify-center lg:justify-start self-stretch font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] text-center lg:text-left tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed lg:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              Funlingo helps you master new languages naturally through instant
              translations and AI-powered explanations on YouTube, Netflix, and
              more.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Button className="relative bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] h-12 sm:h-10 px-6 sm:px-5 py-3 sm:py-2 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 group w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textwhite text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)]">
                Download Extension
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7A1CAC] to-[#C642FC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Button>

            <Button className="relative bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(229,229,232,1)_100%)] h-12 sm:h-10 px-6 sm:px-5 py-3 sm:py-2 rounded-lg overflow-hidden border-0 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl group w-full sm:w-auto">
              <span className="relative flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textblack text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)] group-hover:text-gray-800 transition-colors duration-300">
                Try Demo
              </span>
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div
          className={`relative w-full max-w-md lg:max-w-[400px] xl:w-[400px] h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[589.91px] flex-shrink-0 transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 translate-x-10 scale-95"
          }`}
        >
          {/* Main Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-full flex justify-center rounded-2xl overflow-hidden [background:url(..//figmaAssets/background.png)_50%_50%_/_cover] shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-500">
            <img
              className="w-full h-full object-cover lg:ml-[255px] transform hover:scale-105 transition-transform duration-700"
              alt="Abstract color swirl"
              src="/figmaAssets/abstract-color-swirl-1.png"
            />
          </div>

          {/* Floating Image 1 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 sm:w-[400px] sm:h-[343px] bg-[url(/figmaAssets/image-1.png)] bg-cover bg-[50%_50%] rounded-xl shadow-2xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 animate-float" />

          {/* Floating Image 2 */}
          <div className="absolute top-8 right-4 sm:top-16 sm:left-[155px] w-1/2 h-1/3 sm:w-[300px] sm:h-[134px] bg-[url(/figmaAssets/image-2.png)] bg-cover bg-[50%_50%] rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 animate-float-delayed" />
        </div>
      </div>

      {/* Trusted By Section */}
      <div
        className={`flex flex-col w-full max-w-4xl xl:max-w-[1120px] items-center justify-center gap-6 relative z-10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* <div className="flex flex-col w-full items-start relative">
          <div className="flex flex-col items-center px-4 sm:px-8 lg:px-[353.86px] py-0 relative self-stretch w-full">
            <h5 className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-brandlime-green text-lg sm:text-xl lg:text-[length:var(--heading-h5-font-size)] text-center tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] [font-style:var(--heading-h5-font-style)] animate-pulse">
              Trusted by 1,000+ language learners worldwide
            </h5>
          </div>
        </div> */}

        <div className="w-full max-w-4xl xl:max-w-[1120px] px-4 sm:px-8">
          <img
            className="relative w-full opacity-80 hover:opacity-100 transition-opacity duration-300"
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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-10px) rotate(-6deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
};
