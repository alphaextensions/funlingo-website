import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import logo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import { Check, Clock, Star, Rocket, Target, Zap } from "lucide-react";
import Navbar from "./sections/navbar";

const roadmapItems = [
  {
    quarter: "Q1 2025",
    status: "Completed",
    icon: <Check className="w-5 h-5" />,
    theme: "success",
    items: [
      {
        title: "Chrome Extension Launch",
        description: "Initial release with YouTube support",
        completed: true,
        highlight: true,
      },
      {
        title: "Basic Translation Features",
        description: "Word and phrase translations in 10 languages",
        completed: true,
      },
      {
        title: "User Authentication",
        description: "Secure login and progress tracking",
        completed: true,
      },
    ],
  },
  {
    quarter: "Q2 2025",
    status: "Completed",
    icon: <Check className="w-5 h-5" />,
    theme: "success",
    items: [
      {
        title: "Netflix Support",
        description: "Extend functionality to Netflix platform",
        completed: true,
        highlight: true,
      },
      {
        title: "AI-Powered Explanations",
        description: "Context-aware grammar and usage tips",
        completed: true,
      },
      {
        title: "Pronunciation Guides",
        description: "Audio pronunciation for all translations",
        completed: true,
      },
    ],
  },
  {
    quarter: "Q3 2025",
    status: "In Progress",
    icon: <Zap className="w-5 h-5" />,
    theme: "active",
    items: [
      {
        title: "Firefox Extension",
        description: "Cross-browser support for Firefox users",
        completed: true,
      },
      {
        title: "Mobile Apps (iOS & Android)",
        description: "Native mobile experience",
        completed: false,
        highlight: true,
      },
      {
        title: "Advanced Vocabulary Builder",
        description: "Spaced repetition learning system",
        completed: false,
      },
    ],
  },
  {
    quarter: "Q4 2025",
    status: "Planned",
    icon: <Target className="w-5 h-5" />,
    theme: "planned",
    items: [
      {
        title: "Amazon Prime Video Support",
        description: "Expand to more streaming platforms",
        completed: false,
        highlight: true,
      },
      {
        title: "Conversation Practice Mode",
        description: "Interactive dialogue practice",
        completed: false,
      },
      {
        title: "Learning Analytics Dashboard",
        description: "Track your progress with detailed insights",
        completed: false,
      },
    ],
  },
  {
    quarter: "Q1 2025",
    status: "Planned",
    icon: <Rocket className="w-5 h-5" />,
    theme: "future",
    items: [
      {
        title: "Community Features",
        description: "Connect with other learners",
        completed: false,
        highlight: true,
      },
      {
        title: "Custom Content Upload",
        description: "Learn from your own videos",
        completed: false,
      },
      {
        title: "API Access",
        description: "Integrate Funlingo into your apps",
        completed: false,
      },
    ],
  },
];

export const Roadmap = (): React.JSX.Element => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // const handleScroll = () => {
    //   setIsScrolled(window.scrollY > 50);
    // };
    // window.addEventListener("scroll", handleScroll);

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
      // window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[rgba(198,66,252,0.2)] text-[#C642FC] border border-[#C642FC]/30";
      case "In Progress":
        return "bg-[rgba(198,66,252,0.3)] text-white border border-[#C642FC]";
      case "Planned":
        return "bg-[rgba(255,255,255,0.1)] text-textwhite border border-[#ffffff1a]";
      default:
        return "bg-[rgba(255,255,255,0.1)] text-textwhite border border-[#ffffff1a]";
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "success":
        return "border-[#C642FC] bg-[rgba(198,66,252,0.05)]";
      case "active":
        return "border-[#C642FC] bg-[rgba(198,66,252,0.1)]";
      case "planned":
        return "border-[#7A1CAC] bg-[rgba(122,28,172,0.05)]";
      case "future":
        return "border-[#7A1CAC] bg-[rgba(122,28,172,0.05)]";
      default:
        return "border-[#ffffff1a] bg-[rgba(255,255,255,0.05)]";
    }
  };

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,#000000_0%,#1a0a28_50%,#7A1CAC_100%)] min-h-screen">
      {/* Navigation Header */}
      <Navbar currentPage="/roadmap" />

      {/* Main Content */}
      <main
        ref={sectionRef}
        className="flex flex-col w-full items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="flex flex-col max-w-4xl xl:max-w-[1200px] w-full items-center gap-12 sm:gap-16">
          {/* Header Section */}
          <div
            className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              Product Roadmap
            </h1>
            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Follow our journey as we build the future of language learning
              through immersive content
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div
            className={`flex flex-col w-full gap-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {roadmapItems.map((quarter, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 animate-fade-in-up"
                style={{ animationDelay: `${400 + index * 200}ms` }}
              >
                {/* Quarter Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 group">
                  <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-xl sm:text-2xl lg:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-500">
                    {quarter.quarter}
                  </h3>
                  <Badge
                    className={`w-fit transition-all duration-500 group-hover:scale-110 ${getStatusColor(
                      quarter.status
                    )}`}
                  >
                    <span className="font-body-xs-medium">
                      {quarter.status}
                    </span>
                  </Badge>
                </div>

                {/* Quarter Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {quarter.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex flex-col p-4 sm:p-6 rounded-xl border backdrop-blur-sm transition-all duration-500 group/item hover:scale-105 hover:shadow-2xl ${getThemeColor(
                        quarter.theme
                      )} ${
                        quarter.status === "In Progress" && item.highlight
                          ? "shadow-lg shadow-purple-500/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 transition-all duration-500 group-hover/item:scale-110 ${
                            item.completed
                              ? "border-[#C642FC] bg-[#C642FC]"
                              : "border-textbody group-hover/item:border-[#C642FC]"
                          }`}
                        >
                          {item.completed ? (
                            <Check className="w-3 h-3 text-white transition-all duration-300 group-hover/item:scale-125" />
                          ) : (
                            <Clock className="w-3 h-3 text-textbody transition-all duration-300 group-hover/item:scale-125 group-hover/item:text-[#C642FC]" />
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-grow">
                          <h4 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-[#C642FC] group-hover/item:to-[#7A1CAC] transition-all duration-500">
                            {item.title}
                          </h4>
                          <p className="font-body-small-regular text-textbody group-hover/item:text-textwhite transition-colors duration-500">
                            {item.description}
                          </p>
                        </div>
                        {item.highlight && (
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                        )}
                      </div>

                      {/* Progress Indicator */}
                      <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded-full mt-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.completed
                              ? "bg-[#C642FC] w-full"
                              : quarter.status === "In Progress"
                              ? "bg-[#C642FC] w-1/2"
                              : "bg-[rgba(255,255,255,0.3)] w-0 group-hover/item:w-1/4"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline Connector (for mobile) */}
                {index < roadmapItems.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#C642FC] to-[#7A1CAC] rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`flex flex-col items-center gap-6 text-center mt-12 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="p-8 rounded-2xl border border-[#C642FC] bg-[rgba(198,66,252,0.1)] backdrop-blur-sm max-w-2xl">
              <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] mb-4">
                Help Shape Our Future
              </h3>
              <p className="font-body-large-regular text-textbody mb-6">
                Your feedback drives our development. Tell us what features
                you'd love to see next!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group overflow-hidden relative">
                  <span className="relative z-10 font-body-normal-medium text-textwhite">
                    Submit Feature Request
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] h-12 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-[#ffffff1a]">
                  <span className="font-body-normal-medium text-textwhite">
                    Join Beta Testing
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
