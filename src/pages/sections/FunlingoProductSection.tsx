import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

const features = [
  "Works on YouTube",
  "Works on Netflix",
  "Instant translations",
];

const stats = [
  {
    number: "50+",
    title: "Languages Supported",
    description:
      "Learn any language you want with our extensive language database and growing collection.",
  },
  {
    number: "1000+",
    title: "Active Learners",
    description:
      "Join thousands of language learners who are mastering new languages through content they love.",
  },
];

export const FunlingoProductSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate stats counting
          stats.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedStats((prev) => {
                const newStats = [...prev];
                newStats[index] = 1;
                return newStats;
              });
            }, index * 400 + 500);
          });
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
      className="flex flex-col w-full items-center gap-16 sm:gap-20 lg:gap-24 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-24 bg-[#000000] overflow-hidden"
    >
      {/* First Row: How It Works */}
      <div
        className={`flex flex-col lg:flex-row w-full max-w-4xl xl:max-w-[1008px] items-center justify-center gap-8 lg:gap-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Text Content */}
        <div className="flex flex-col max-w-full lg:max-w-[480px] items-start justify-center gap-4 sm:gap-5 flex-1 order-2 lg:order-1">
          <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up">
            <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
              How It Works
            </span>
          </Badge>

          <div className="flex flex-col items-start gap-4 sm:gap-5 w-full">
            <h2
              className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl lg:text-4xl xl:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-tight sm:leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)] animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Learn From Your
              <br />
              Favorite Content
            </h2>

            <p
              className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-base sm:text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              Simply install the extension and start watching videos in your
              target language. Funlingo does the rest automatically.
            </p>
          </div>

          <div
            className="flex flex-col items-start gap-3 w-full animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 w-full group hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-default"
              >
                <div className="relative">
                  <CheckIcon className="w-5 h-5 text-brandlime-green flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                  <div className="absolute inset-0 w-5 h-5 bg-brandlime-green rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300 animate-ping-slow"></div>
                </div>
                <span className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] group-hover:text-textwhite transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Image/Graphic */}
        <div
          className={`relative w-full max-w-md lg:max-w-[480px] h-[300px] sm:h-[350px] lg:h-[440.47px] flex-shrink-0 flex items-center justify-center order-1 lg:order-2 transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-95 rotate-3"
          }`}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border border-[#ffffff1a] bg-[radial-gradient(50%_50%_at_51%_-14%,rgba(122,28,172,0.2)_0%,rgba(0,0,0,1)_100%)] flex items-center justify-center group hover:shadow-2xl hover:shadow-purple-500/30 hover:border-[#ffffff66] transition-all duration-500">
            <div className="text-center p-6 sm:p-8 transform group-hover:scale-105 transition-transform duration-500">
              <div className="text-6xl sm:text-7xl lg:text-9xl mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                🌐
              </div>
              <p className="text-textwhite text-xl sm:text-2xl font-heading-h5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-500">
                Universal Language Learning
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>

      {/* Second Row: Our Impact */}
      <div
        className={`flex flex-col lg:flex-row w-full max-w-4xl xl:max-w-[1008px] items-center justify-center gap-8 lg:gap-12 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Image/Graphic */}
        <div
          className={`relative w-full max-w-md lg:max-w-[480px] h-[300px] sm:h-[350px] lg:h-[400px] flex-shrink-0 flex items-center justify-center order-1 lg:order-1 transition-all duration-1000 delay-700 ${
            isVisible
              ? "opacity-100 scale-100 -rotate-3"
              : "opacity-0 scale-95 -rotate-6"
          }`}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border border-[#ffffff1a] bg-[radial-gradient(50%_50%_at_51%_-14%,rgba(122,28,172,0.2)_0%,rgba(0,0,0,1)_100%)] flex items-center justify-center group hover:shadow-2xl hover:shadow-purple-500/30 hover:border-[#ffffff66] transition-all duration-500">
            <div className="text-center p-6 sm:p-8 transform group-hover:scale-105 transition-transform duration-500">
              <div className="text-6xl sm:text-7xl lg:text-9xl mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                ⚡
              </div>
              <p className="text-textwhite text-xl sm:text-2xl font-heading-h5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-500">
                Lightning Fast
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col max-w-full lg:max-w-[480px] items-start justify-center gap-4 sm:gap-5 flex-1 order-2 lg:order-2">
          <Badge
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
              Our Impact
            </span>
          </Badge>

          <h2
            className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl lg:text-4xl xl:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-tight sm:leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)] animate-fade-in-up"
            style={{ animationDelay: "1000ms" }}
          >
            Trusted by Language
            <br />
            Learners Worldwide
          </h2>

          <div className="flex flex-col sm:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10 w-full">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 flex-1 group hover:scale-105 transition-all duration-300 p-4 rounded-xl hover:bg-[rgba(255,255,255,0.05)] cursor-default animate-fade-in-up"
                style={{ animationDelay: `${1200 + index * 200}ms` }}
              >
                <div
                  className={`text-white font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-brandlime-green text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] [font-style:var(--heading-h4-font-style)] transform transition-all duration-1000 ${
                    animatedStats[index]
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-0"
                  }`}
                >
                  {stat.number}
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <h3 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    {stat.title}
                  </h3>

                  <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] group-hover:text-textwhite transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Call to Action for Mobile */}
      <div
        className="lg:hidden flex flex-col items-center gap-4 mt-8 animate-fade-in-up"
        style={{ animationDelay: "1400ms" }}
      >
        <p className="font-body-normal-regular text-textbody text-center max-w-md">
          Ready to transform your language learning journey?
        </p>
        <button className="bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] h-12 px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
          <span className="font-body-normal-medium text-textwhite">
            Get Started Now
          </span>
        </button>
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
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-ping-slow {
          animation: ping-slow 2s ease-out infinite;
        }
      `}</style>
    </section>
  );
};
