import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    title: "Vocabulary Builder",
    description:
      "Save words and phrases you learn while watching. Review them later with our spaced repetition system for better retention.",
    isActive: true,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics. See how many words you've learned and track your improvement over time.",
    isActive: false,
  },
  {
    title: "Pronunciation Guides",
    description:
      "Hear how words should be pronounced by native speakers. Perfect your accent with our audio pronunciation feature.",
    isActive: false,
  },
];

export const FunlingoFeaturesSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
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

  // Auto-rotate features with better timing
  useEffect(() => {
    if (!isVisible || !isAutoRotating) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 8000); // Increased from 4000ms to 8000ms for better reading time

    return () => clearInterval(interval);
  }, [isVisible, isAutoRotating]);

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
    setIsAutoRotating(false);

    // Resume auto-rotation after 30 seconds of inactivity
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 30000);
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full items-center justify-center gap-16 sm:gap-20 lg:gap-24 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-24 bg-[#000000] overflow-hidden"
    >
      {/* Header Section */}
      <header
        className={`flex flex-col max-w-4xl xl:max-w-[1008px] items-center justify-center gap-4 sm:gap-5 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up">
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)]">
            Funlingo Features
          </span>
        </Badge>

        <div className="flex flex-col max-w-full sm:max-w-[800px] items-center gap-4">
          <h2
            className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl lg:text-4xl xl:text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-tight sm:leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)] animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Maximize Your Learning with
            <br />
            Powerful Features
          </h2>

          <p
            className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-base sm:text-[length:var(--body-normal-regular-font-size)] text-center tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] max-w-2xl animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            Everything you need to learn a language naturally through the
            content you already love watching.
          </p>
        </div>
      </header>

      {/* Features Content */}
      <div
        className={`flex flex-col lg:flex-row items-start justify-between w-full max-w-4xl xl:max-w-[1008px] gap-8 lg:gap-12 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Features List */}
        <div className="flex flex-col lg:flex-row items-start w-full lg:w-auto gap-6 lg:gap-8 order-2 lg:order-1">
          {/* Progress Indicator - Vertical for desktop, horizontal for mobile */}
          <div className="hidden lg:flex relative w-2 h-auto bg-textblack rounded-lg overflow-hidden">
            <div
              className="w-full rounded-lg bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] transition-all duration-1000 ease-out"
              style={{
                height: `${((activeFeature + 1) / features.length) * 100}%`,
              }}
            ></div>

            {/* Feature Indicators */}
            {features.map((_, index) => (
              <div
                key={index}
                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white transition-all duration-700 ${
                  index <= activeFeature
                    ? "bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] scale-125"
                    : "bg-textblack scale-100"
                }`}
                style={{ top: `${(index / (features.length - 1)) * 100}%` }}
              ></div>
            ))}
          </div>

          {/* Horizontal Progress Bar for Mobile */}
          <div className="lg:hidden w-full h-2 bg-textblack rounded-lg overflow-hidden relative mb-4">
            <div
              className="h-full rounded-lg bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] transition-all duration-1000 ease-out"
              style={{
                width: `${((activeFeature + 1) / features.length) * 100}%`,
              }}
            ></div>

            {features.map((_, index) => (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white transition-all duration-700 ${
                  index <= activeFeature
                    ? "bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] scale-125"
                    : "bg-textblack scale-100"
                }`}
                style={{ left: `${(index / (features.length - 1)) * 100}%` }}
              ></div>
            ))}
          </div>

          {/* Feature Items */}
          <div className="flex flex-col gap-8 lg:gap-14 w-full">
            {features.map((feature, index) => (
              <article
                key={index}
                className={`flex flex-col items-start justify-center gap-4 w-full p-4 lg:p-6 rounded-xl cursor-pointer transition-all duration-700 group ${
                  index === activeFeature
                    ? "bg-[rgba(255,255,255,0.05)] border border-[#ffffff33] scale-105 shadow-lg shadow-purple-500/20"
                    : "hover:bg-[rgba(255,255,255,0.02)] hover:scale-102"
                }`}
                onClick={() => handleFeatureClick(index)}
                onMouseEnter={() => setIsAutoRotating(false)}
                onMouseLeave={() => {
                  setTimeout(() => setIsAutoRotating(true), 2000);
                }}
              >
                <div className="flex items-center gap-4 w-full">
                  {/* Mobile Indicator */}
                  <div
                    className={`lg:hidden w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                      index === activeFeature
                        ? "bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] border-transparent scale-125"
                        : "bg-transparent border-textbody group-hover:border-textwhite"
                    }`}
                  ></div>

                  <h3
                    className={`[font-family:'Inter',Helvetica] font-normal text-lg sm:text-xl tracking-[0] leading-7 transition-all duration-500 ${
                      index === activeFeature
                        ? "text-textwhite font-semibold"
                        : "text-textbody group-hover:text-textwhite"
                    }`}
                  >
                    {feature.title}
                  </h3>
                </div>

                <p
                  className={`font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] transition-all duration-500 ${
                    index === activeFeature
                      ? "text-textwhite"
                      : "text-textbody group-hover:text-textwhite"
                  }`}
                >
                  {feature.description}
                </p>

                {/* Active Feature Indicator */}
                {index === activeFeature && (
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] rounded-full mt-2"></div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Feature Card */}
        <div
          className={`w-full lg:max-w-[487.19px] h-[300px] sm:h-[400px] lg:h-[481.24px] rounded-2xl overflow-hidden border border-solid border-[#ffffff33] [background:radial-gradient(50%_50%_at_51%_-14%,rgba(122,28,172,0.2)_0%,rgba(0,0,0,1)_100%)] transition-all duration-1000 delay-500 order-1 lg:order-2 group hover:shadow-2xl hover:shadow-purple-500/30 hover:border-[#ffffff66] ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => {
            setTimeout(() => setIsAutoRotating(true), 2000);
          }}
        >
          <CardContent className="p-6 sm:p-8 flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 text-center transform group-hover:scale-105 transition-transform duration-700">
              <div className="text-6xl sm:text-7xl lg:text-9xl transform transition-all duration-1000 group-hover:scale-110 group-hover:rotate-12">
                {activeFeature === 0 ? "📚" : activeFeature === 1 ? "📊" : "🎤"}
              </div>
              <h3 className="font-heading-h4 text-textwhite text-xl sm:text-2xl lg:text-[length:var(--heading-h4-font-size)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-700">
                {features[activeFeature].title}
              </h3>
              <p className="font-body-normal-regular text-textbody text-sm sm:text-[length:var(--body-normal-regular-font-size)] max-w-[300px] group-hover:text-textwhite transition-colors duration-700">
                {features[activeFeature].description}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </CardContent>
        </div>
      </div>

      {/* Feature Navigation for Mobile */}
      <div className="lg:hidden flex items-center justify-center gap-4 mt-8">
        {features.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === activeFeature
                ? "bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] scale-125"
                : "bg-textbody hover:bg-textwhite"
            }`}
            onClick={() => handleFeatureClick(index)}
            aria-label={`Show ${features[index].title}`}
          />
        ))}

        {/* Auto-rotation status indicator */}
        <div className="ml-4 flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isAutoRotating ? "bg-green-500 animate-pulse" : "bg-gray-500"
            }`}
          ></div>
          <span className="text-textbody text-xs">
            {isAutoRotating ? "Auto" : "Paused"}
          </span>
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
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};
