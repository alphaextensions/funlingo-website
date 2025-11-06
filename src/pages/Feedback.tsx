import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navbar from "./sections/navbar";
// import logo from "../assets/logo.png";

export const Feedback = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "feature",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", category: "feature", message: "" });
  };

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,#000000_0%,#1a0a28_50%,#7A1CAC_100%)] min-h-screen">
      {/* Navigation Header */}
      <Navbar currentPage="/feedback" />

      {/* Main Content */}
      <main
        ref={sectionRef}
        className="flex flex-col w-full items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="flex flex-col max-w-4xl w-full items-center gap-12 sm:gap-16">
          {/* Header Section */}
          <div
            className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              We'd Love Your Feedback
            </h1>
            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Your input helps us build a better language learning experience
              for everyone
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div
              className={`w-full max-w-2xl p-4 rounded-lg bg-[rgba(198,66,252,0.2)] border border-[#C642FC] backdrop-blur-sm transition-all duration-500 ${
                submitted ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "300ms" }}
            >
              <p className="font-body-normal-medium text-white text-center">
                Thank you for your feedback! We'll review it carefully.
              </p>
            </div>
          )}

          {/* Feedback Form */}
          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-2xl flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] group hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in-up`}
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="h-10 px-3 py-2 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[#ffffff1a] text-textwhite font-body-normal-regular hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
              >
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="improvement">Improvement Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Your Feedback
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300 min-h-[200px] resize-vertical"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group/btn overflow-hidden relative mt-2"
            >
              <span className="relative z-10 font-body-normal-medium text-textwhite group-hover/btn:scale-105 transition-transform duration-300">
                Submit Feedback
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </form>

          {/* Contact Options */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                ),
                title: "Email Us",
                description: "getfunlingo@gmail.com",
                delay: "700ms",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                ),
                title: "Discord",
                description: "Join our community",
                delay: "800ms",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Vote on Features",
                description: "Check our roadmap",
                delay: "900ms",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm text-center group hover:bg-[rgba(255,255,255,0.08)] hover:border-[#ffffff40] hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h4 className="font-heading-h6 text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                  {item.title}
                </h4>
                <p className="font-body-small-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
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
