import * as React from "react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Blog", href: "/blog" },
  { label: "Feedback", href: "/feedback" },
  { label: "About", href: "/about" },
];

const informationLinks = [
  { label: "Feedback", href: "/feedback" },
  { label: "Download Extension", href: "https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" },
];

const followLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/getfunlingo/" },
  { label: "Instagram", href: "https://www.instagram.com/getfunlingo?igsh=MWVkcWQ5Nmh0YmZqdA==" },
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
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/getfunlingo/",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001 12.017 0z"/>
                  </svg>
                ),
                label: "Instagram",
                href: "https://www.instagram.com/getfunlingo?igsh=MWVkcWQ5Nmh0YmZqdA==",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] border border-[#ffffff1a] flex items-center justify-center text-white hover:scale-110 hover:bg-[rgba(255,255,255,0.2)] hover:border-[#ffffff33] transition-all duration-300 animate-fade-in-up"
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

      

      {/* Bottom Section */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl xl:max-w-[1008px] gap-4 pt-6 border-t border-[#ffffff1a] transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="flex items-center justify-center w-fit font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-textwhite text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] whitespace-nowrap [font-style:var(--body-small-medium-font-style)] hover:scale-105 transition-transform duration-300 cursor-default">
          ©2026 Funlingo. All rights reserved.
        </p>

        {/* Additional Links */}
        <div className="flex items-center gap-6">
          {[
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Support", href: "/support" },
            // { label: "Cookie Policy", href: "/cookies" },
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