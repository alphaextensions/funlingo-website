import * as React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Shield, Lock, Eye, Globe, Mail } from "lucide-react";
import Navbar from "./sections/navbar";

export const PrivacyPolicy = (): React.JSX.Element => {
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

  const policySections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information We Do Not Collect",
      content:
        "We built Funlingo to help users enjoy dual subtitles and learn languages while streaming without compromising privacy. We do not use cookies or third-party analytics to monitor your activity. We do not sell or rent your information to anyone.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Permissions Used",
      content:
        "Funlingo requires certain Chrome permissions only to function properly: Access to streaming site pages (e.g., Netflix, YouTube) to display dual subtitles within the video player. ActiveTab permission to inject subtitles and allow interactivity (pause on hover, translations, etc.). These permissions are used locally on your device only. Funlingo never sends page data or video content to any external server.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Processing",
      content:
        "All subtitle rendering, translations, and hover interactions occur locally in your browser. If future features use APIs for translations or dictionary lookups, requests will be made anonymously and without storing user identifiers.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Third-Party Services",
      content:
        "Funlingo may connect to public translation or dictionary APIs (for example, Google Translate API or similar). These are used only to fetch word meanings or translations and do not transmit any user identity or browsing data.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Children's Privacy",
      content:
        "Funlingo is safe for all audiences and does not knowingly collect data from children under 13.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security",
      content:
        "Because we do not store personal data, your information stays on your device. We follow best practices to ensure the extension's scripts are secure and limited to necessary domains.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Updates to This Policy",
      content:
        "We may update this Privacy Policy occasionally. If significant changes occur, we will update the Effective Date and post the new version on our website.",
    },
  ];

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,#000000_0%,#1a0a28_50%,#7A1CAC_100%)] min-h-screen">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(198,66,252,0.1)] border border-[#C642FC]/20 text-[#C642FC] text-sm font-medium mb-2 animate-fade-in-up">
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </div>

            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              Privacy Policy
            </h1>

            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-3xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Welcome to Funlingo. Your privacy is important to us. This Privacy
              Policy explains how we handle your information when you use the
              Funlingo Chrome Extension and our website.
            </p>
          </div>

          {/* Last Updated */}
          <div
            className={`w-full text-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(122,28,172,0.2)] border border-[#7A1CAC]/30 text-textbody text-sm">
              Effective Date: November 2025
            </div>
          </div>

          {/* Policy Sections */}
          <div className="w-full space-y-8">
            {policySections.map((section, index) => (
              <div
                key={index}
                className={`group p-6 sm:p-8 rounded-2xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-500 hover:border-[#ffffff40] animate-fade-in-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{section.icon}</div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-body-normal-medium text-textwhite text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
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
            <div className="p-8 sm:p-12 rounded-2xl bg-[rgba(122,28,172,0.1)] border border-[#7A1CAC]/30 backdrop-blur-sm text-center">
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(198,66,252,0.2)] border border-[#C642FC]/30 text-[#C642FC] text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </div>

                <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl">
                  Contact Us
                </h3>

                <div className="space-y-4 font-body-normal-regular text-textbody text-[length:var(--body-normal-regular-font-size)] leading-relaxed max-w-2xl mx-auto">
                  <p>
                    If you have questions or concerns about this Privacy Policy,
                    please contact us at:
                  </p>

                  <div className="flex justify-center">
                    <Button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-textwhite font-body-normal-medium h-12 px-8 py-3 rounded-lg border border-[#ffffff1a] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group">
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
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-[rgba(198,66,252,0.1)] border border-[#C642FC]/20">
              <Shield className="w-5 h-5 text-[#C642FC]" />
              <p className="font-body-normal-medium text-textwhite">
                Funlingo is committed to making language learning through
                streaming safe, private, and effortless.
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
    </div>
  );
};
