import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import {
  Rocket,
  Users,
  Languages,
  Zap,
  Target,
  Heart,
  Globe,
  Lightbulb,
} from "lucide-react";
import Navbar from "./sections/navbar";
import Frame4 from "../assets/Frame4.png"; // Import the image

export const About = (): React.JSX.Element => {
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

  const stats = [
    {
      number: "1,000+",
      label: "Active Users",
      description: "Language learners worldwide trust Funlingo",
      icon: <Users className="w-6 h-6" />,
      delay: "600ms",
    },
    {
      number: "50+",
      label: "Languages",
      description: "Supported language pairs and growing",
      icon: <Languages className="w-6 h-6" />,
      delay: "800ms",
    },
    {
      number: "10M+",
      label: "Translations",
      description: "Words and phrases translated to date",
      icon: <Zap className="w-6 h-6" />,
      delay: "1000ms",
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Pioneering AI-powered language learning through video content",
      gradient: "from-[#C642FC] to-[#7A1CAC]",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Community",
      description:
        "Building a global community of passionate language learners",
      gradient: "from-[#C642FC] to-[#7A1CAC]",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Speed",
      description:
        "Instant translations and explanations without slowing you down",
      gradient: "from-[#C642FC] to-[#7A1CAC]",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "Driven by our love for languages and learning",
      gradient: "from-[#C642FC] to-[#7A1CAC]",
    },
  ];

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,#000000_0%,#1a0a28_50%,#7A1CAC_100%)] min-h-screen">
      {/* Navigation Header */}
      <Navbar currentPage="/about" />

      {/* Main Content */}
      <main
        ref={sectionRef}
        className="flex flex-col w-full items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="flex flex-col max-w-7xl w-full items-center gap-16 sm:gap-20">
          {/* Hero Section */}
          <div
            className={`flex flex-col items-center gap-6 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(198,66,252,0.1)] border border-[#C642FC]/20 text-[#C642FC] text-sm font-medium mb-2 animate-fade-in-up">
              <Target className="w-4 h-4" />
              Our Story
            </div>

            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              About Funlingo
            </h1>

            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-3xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Making language learning natural, effortless, and fun through the
              content you already love
            </p>
          </div>

          {/* Mission Section */}
          <div className="w-full">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Mission Text */}
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-heading-h2 font-[number:var(--heading-h2-font-weight)] text-textwhite text-2xl sm:text-3xl lg:text-[length:var(--heading-h2-font-size)] tracking-[var(--heading-h2-letter-spacing)] leading-[var(--heading-h2-line-height)] [font-style:var(--heading-h2-font-style)]">
                  Our Mission
                </h3>

                <div className="space-y-4 font-body-normal-regular text-textbody text-[length:var(--body-normal-regular-font-size)] leading-relaxed">
                  <p>
                    Funlingo was born from a simple idea: language learning
                    shouldn't feel like studying. By integrating seamlessly with
                    the videos you already watch, we transform passive
                    entertainment into active learning opportunities.
                  </p>

                  <p>
                    Every show, every video becomes a chance to improve your
                    language skills naturally and contextually. We believe that
                    the best way to learn a language is through immersion and
                    real-world context.
                  </p>

                  <p>
                    That's why we've built a tool that meets you where you
                    are—watching your favorite content—and helps you learn
                    without disrupting your experience.
                  </p>
                </div>
              </div>

              {/* Values Grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-2xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-[#ffffff40]"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{value.icon}</div>
                    </div>

                    <h4 className="font-body-normal-medium text-textwhite text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                      {value.title}
                    </h4>

                    <p className="font-body-normal-regular text-textbody text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Demo Section - NEW SECTION ADDED */}
          <div className="w-full max-w-6xl">
            <div
              className={`flex flex-col items-center gap-8 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center space-y-4 animate-fade-in-up">
                <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl">
                  See It In Action
                </h3>
                <p className="font-body-large-regular text-textbody text-[length:var(--body-large-regular-font-size)] leading-relaxed max-w-2xl">
                  Experience how Funlingo transforms your favorite content into 
                  engaging language lessons with dual subtitles
                </p>
              </div>

              {/* Image Container with Hover Effects */}
              <div
                className="relative group animate-fade-in-up"
                style={{ animationDelay: "600ms" }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm p-4 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-[#C642FC]/40">
                  {/* Gradient Border Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm group-hover:blur-md"></div>
                  
                  {/* Main Image */}
                  <img
                    src={Frame4}
                    alt="Funlingo in action showing dual subtitles on Netflix with Avengers"
                    className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Floating Elements Animation */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#C642FC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 group-hover:animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#7A1CAC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 group-hover:animate-bounce"></div>
              </div>

              {/* Caption */}
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "800ms" }}>
                <p className="font-body-small-regular text-textbody text-sm italic">
                  Learn new languages effortlessly while enjoying your favorite movies and series on Netflix and YouTube.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section - UPDATED DELAY */}
          <div className="w-full">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
            }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-[#ffffff40] animate-fade-in-up"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(198,66,252,0.1)] border border-[#C642FC]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-[#C642FC]">{stat.icon}</div>
                  </div>

                  <div className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-[length:var(--heading-h1-font-size)] mb-2 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    {stat.number}
                  </div>

                  <h4 className="font-body-normal-medium text-textwhite text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    {stat.label}
                  </h4>

                  <p className="font-body-normal-regular text-textbody text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Story Section - UPDATED DELAY */}
          <div className="w-full max-w-4xl">
            <div
              className={`p-8 sm:p-12 rounded-2xl bg-[rgba(122,28,172,0.1)] border border-[#7A1CAC]/30 backdrop-blur-sm transition-all duration-1000 delay-900 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(198,66,252,0.2)] border border-[#C642FC]/30 text-[#C642FC] text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Behind the Scenes
                </div>

                <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl">
                  The Team Behind Funlingo
                </h3>

                <div className="space-y-4 font-body-normal-regular text-textbody text-[length:var(--body-normal-regular-font-size)] leading-relaxed max-w-3xl mx-auto">
                  <p>
                    We're a passionate team of language enthusiasts, AI
                    researchers, and product builders who believe that learning
                    should be joyful and integrated into daily life.
                  </p>

                  <p>
                    Our journey started when we realized how much time we spent
                    consuming content in other languages and saw an opportunity
                    to turn that time into meaningful learning experiences.
                  </p>

                  <p>
                    Today, we're dedicated to making language learning
                    accessible to everyone, everywhere—one video at a time.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <div className="flex items-center justify-center gap-2 font-body-small-regular text-textbody text-sm">
                    <div className="w-2 h-2 bg-[#C642FC] rounded-full animate-pulse"></div>
                    Remote First Team
                  </div>
                  <div className="flex items-center justify-center gap-2 font-body-small-regular text-textbody text-sm">
                    <div className="w-2 h-2 bg-[#7A1CAC] rounded-full animate-pulse"></div>
                    Global Community
                  </div>
                  <div className="flex items-center justify-center gap-2 font-body-small-regular text-textbody text-sm">
                    <div className="w-2 h-2 bg-[#C642FC] rounded-full animate-pulse"></div>
                    User-Focused Development
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action - UPDATED DELAY */}
          <div
            className={`flex flex-col items-center gap-8 text-center transition-all duration-1000 delay-1100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4 max-w-2xl animate-fade-in-up">
              <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl">
                Join Our Journey
              </h3>

              <p className="font-body-large-regular text-textbody text-[length:var(--body-large-regular-font-size)] leading-relaxed">
                We're just getting started. Be part of the revolution in
                language learning and help us make Funlingo better for everyone.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group/btn overflow-hidden relative">
                <Rocket className="w-4 h-4 mr-2 relative z-10 group-hover/btn:scale-110 transition-transform" />
                <span className="relative z-10 font-body-normal-medium text-textwhite group-hover/btn:scale-105 transition-transform duration-300">
                  Download Extension
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </Button>

              <Button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-textwhite font-body-normal-medium h-12 px-8 py-3 rounded-lg border border-[#ffffff1a] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group">
                <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Share Feedback
              </Button>
            </div>

            {/* Social Proof */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 mt-8 font-body-small-regular text-textbody text-sm animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] border-2 border-[#1a0a28]"
                    ></div>
                  ))}
                </div>
                <span>Join 1,000+ learners</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-yellow-400">
                      ★
                    </div>
                  ))}
                </div>
                <span>4.9/5 Rating</span>
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