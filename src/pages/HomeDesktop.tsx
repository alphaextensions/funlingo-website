import * as React from "react";

import { FunlingoFeaturesSection } from "./sections/FunlingoFeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { FunlingoProductSection } from "./sections/FunlingoProductSection";
import { FunlingoTestimonialsSection } from "./sections/FunlingoTestimonialsSection";
import { WhyChooseFunlingoSection } from "./sections/WhyChooseFunlingoSection";

// import { useState, useEffect } from "react";
import Navbar from "./sections/navbar";

// const navItems = [
//   { label: "Home", href: "/", active: true },
//   { label: "Pricing", href: "/pricing" },
//   { label: "Roadmap", href: "/roadmap" },
//   { label: "Feedback", href: "/feedback" },
//   { label: "About", href: "/about" },
// ];

const featureBadges = [
  {
    icon: "/figmaAssets/svg-12.svg",
    text: "Learn while you watch",
  },
  {
    icon: "/figmaAssets/svg-1.svg",
    text: "1000+ active users",
  },
  {
    icon: "/figmaAssets/svg-6.svg",
    text: "Free trial available",
  },
  {
    icon: "/figmaAssets/svg-5.svg",
    text: "Works on YouTube & Netflix",
  },
  // {
  //   icon: "/figmaAssets/svg-12.svg",
  //   text: "Multiple languages",
  // },
  // {
  //   icon: "/figmaAssets/svg-1.svg",
  //   text: "Smart AI translations",
  // },
];

export const HomeDesktop = (): React.JSX.Element => {
  return (
    <div className="flex flex-col items-start relative bg-[#000000]">
      {/* Navigation Header */}
      <Navbar currentPage="/" />

      {/* Feature Badges Section */}
      <section className="flex flex-col w-full items-center justify-center relative bg-backgroundbackdrop overflow-hidden border-b border-[#ffffff1a]">
        <div className="max-w-[1200px] w-full py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-14 animate-fade-in-up">
            {featureBadges.map((badge, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(2120,2120,2120,0.05)] hover:bg-[rgba(2120,2120,2120,0.1)] border border-[rgba(2120,2120,2120,0.1)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group cursor-pointer"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <img
                  className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert group-hover:invert-0 group-hover:brightness-100"
                  alt="Feature icon"
                  src={badge.icon}
                />
                <p className="relative flex items-center justify-center w-fit font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-textwhite text-[length:var(--body-small-regular-font-size)] tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] whitespace-nowrap [font-style:var(--body-small-regular-font-style)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                  {badge.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of your sections */}
      <HeroSection />
      <WhyChooseFunlingoSection />
      <FunlingoProductSection />
      <FunlingoFeaturesSection />
      <FunlingoTestimonialsSection />
      <FooterSection />

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
            transform: translateY(20px);
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
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
