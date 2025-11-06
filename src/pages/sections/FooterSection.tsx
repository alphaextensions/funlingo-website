import * as React from "react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "About", href: "/about" },
];

const informationLinks = [
  { label: "How It Works", href: "/#features" },
  { label: "Feedback", href: "/feedback" },
  { label: "Download Extension", href: "#download" },
];

const followLinks = [
  { label: "Twitter", href: "https://twitter.com/funlingo" },
  { label: "Discord", href: "https://discord.gg/funlingo" },
  { label: "GitHub", href: "https://github.com/funlingo" },
];

export const FooterSection = (): React.JSX.Element => {
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

  return (
    <footer
      ref={sectionRef}
      className="flex flex-col w-full items-center gap-8 sm:gap-10 pt-12 pb-6 px-4 sm:px-6 lg:px-8 xl:px-24 bg-transparent [background:radial-gradient(50%_50%_at_50%_138%,rgba(198,66,252,1)_0%,rgba(122,28,172,0.5)_24%,rgba(0,0,0,1)_100%)] overflow-hidden"
    >
      {/* Main Footer Content */}
      <div
        className={`flex flex-col lg:flex-row w-full max-w-4xl xl:max-w-[1008px] items-start justify-between gap-8 lg:gap-5 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Brand Section */}
        <div className="flex flex-col items-start gap-3 flex-1 max-w-sm animate-fade-in-up">
          <div className="flex items-center justify-center w-fit mt-[-1.00px] bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,#C642FC_40%,#7A1CAC_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-transparent text-2xl sm:text-3xl lg:text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] whitespace-nowrap [font-style:var(--heading-h5-font-style)] hover:scale-105 transition-transform duration-300 cursor-default">
            <img src={logo} alt="" width={170} />
          </div>

          {/* Social Icons for Mobile */}
          <div className="lg:hidden flex items-center gap-4 mt-4">
            {[
              {
                icon: "🐦",
                label: "Twitter",
                href: "https://twitter.com/funlingo",
              },
              {
                icon: "💬",
                label: "Discord",
                href: "https://discord.gg/funlingo",
              },
              {
                icon: "💻",
                label: "GitHub",
                href: "https://github.com/funlingo",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] border border-[#ffffff1a] flex items-center justify-center text-lg hover:scale-110 hover:bg-[rgba(255,255,255,0.2)] hover:border-[#ffffff33] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 w-full lg:w-auto">
          {/* Quick Links */}
          <nav
            className="flex flex-col items-start gap-4 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="flex items-center justify-center w-fit mt-[-1.00px] font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-textwhite text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] whitespace-nowrap [font-style:var(--body-small-medium-font-style)] group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#C642FC] hover:to-[#7A1CAC] transition-all duration-300">
              Quick Links
            </h3>

            <ul className="inline-flex flex-col items-start gap-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textbody text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)] hover:text-textwhite transition-all duration-300 group/link relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover/link:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] group-hover/link:w-full transition-all duration-300"></div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information Links */}
          <nav
            className="flex flex-col items-start gap-4 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <h3 className="flex items-center justify-center w-fit mt-[-1.00px] font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-textwhite text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] whitespace-nowrap [font-style:var(--body-small-medium-font-style)] group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#C642FC] hover:to-[#7A1CAC] transition-all duration-300">
              Information
            </h3>

            <ul className="inline-flex flex-col items-start gap-3">
              {informationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textbody text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)] hover:text-textwhite transition-all duration-300 group/link relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover/link:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] group-hover/link:w-full transition-all duration-300"></div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow Links - Hidden on mobile since we have icons */}
          <nav
            className="hidden lg:flex flex-col items-start gap-4 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <h3 className="flex items-center justify-center w-fit mt-[-1.00px] font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-textwhite text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] whitespace-nowrap [font-style:var(--body-small-medium-font-style)] group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#C642FC] hover:to-[#7A1CAC] transition-all duration-300">
              Follow
            </h3>

            <ul className="inline-flex flex-col items-start gap-3">
              {followLinks.map((link, index) => (
                <li key={index}>
                  <a
                    className="flex items-center justify-center w-fit [font-family:'Inter',Helvetica] font-medium text-textbody text-base tracking-[0] leading-[26px] whitespace-nowrap hover:text-textwhite transition-all duration-300 group/link relative overflow-hidden"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="relative z-10 group-hover/link:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] group-hover/link:w-full transition-all duration-300"></div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Newsletter Signup for Desktop */}
      <div
        className={`hidden lg:flex w-full max-w-2xl items-center justify-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[#ffffff1a] backdrop-blur-sm w-full max-w-md">
          <h3 className="font-body-small-medium text-textwhite text-center">
            Stay Updated with Funlingo
          </h3>
          <div className="flex gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[#ffffff1a] text-textwhite placeholder-textbody focus:outline-none focus:border-[#C642FC] transition-colors duration-300"
            />
            <button className="px-4 py-2 rounded-lg bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] text-textwhite font-body-normal-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl xl:max-w-[1008px] gap-4 pt-6 border-t border-[#ffffff1a] transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="flex items-center justify-center w-fit font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-textwhite text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] whitespace-nowrap [font-style:var(--body-small-medium-font-style)] hover:scale-105 transition-transform duration-300 cursor-default">
          ©2025 Funlingo. All rights reserved.
        </p>

        {/* Additional Links */}
        <div className="flex items-center gap-6">
          {[
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="font-body-small-regular text-textbody hover:text-textwhite transition-colors duration-300 text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] flex items-center justify-center text-textwhite shadow-lg hover:scale-110 hover:shadow-purple-500/30 transition-all duration-300 z-50 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>

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
    </footer>
  );
};
