
import * as React from "react";

import { FunlingoFeaturesSection } from "./sections/FunlingoFeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { FunlingoProductSection } from "./sections/FunlingoProductSection";
import { FunlingoTestimonialsSection } from "./sections/FunlingoTestimonialsSection";
import { WhyChooseFunlingoSection } from "./sections/WhyChooseFunlingoSection";
import { ComparisonTableSection } from "./sections/ComparisonTableSection";
import SEO from "@/components/SEO";

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
  // {
  //   icon: "/figmaAssets/svg-1.svg",
  //   text: "1000+ active users",
  // },
  {
    icon: "/figmaAssets/svg-6.svg",
    text: "Free dual subtitle extension",
  },
  {
    icon: "/figmaAssets/svg-5.svg",
    text: "Works on YouTube, Netflix and Prime",
  },
  {
    icon: "/figmaAssets/svg-12.svg",
    text: "Subtitles in two languages",
  },
  // {
  //   icon: "/figmaAssets/svg-1.svg",
  //   text: "Smart AI translations",
  // },
];

export const HomeDesktop = (): React.JSX.Element => {
  // Structured Data for AI Search Engines (Schema.org)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Funlingo",
    "headline": "Free Dual Subtitle Extension for Language Learning",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Chrome, Edge, Brave",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free forever version available"
    },
    "description": "A free dual subtitle Chrome extension that helps users learn languages by watching videos on Netflix, YouTube, and Prime Video with simultaneous bilingual subtitles. Supports 100+ languages with AI-powered translations.",
    "featureList": "Dual subtitles, AI dictionary, Netflix support, YouTube support, Prime Video support, Vocabulary builder, 100+ languages, Language learning tools",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.92",
      "ratingCount": "12",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Dual Subtitle Learning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dual subtitle learning is a method where you display two sets of subtitles simultaneously: one in the audio's original language (e.g., Spanish) and one in your native language (e.g., English). This allows for instant comparison and comprehension without stopping the video."
        }
      },
      {
        "@type": "Question",
        "name": "Is Funlingo really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Funlingo is a completely free alternative to paid subtitle extensions. You get full dual subtitle functionality at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI help with language learning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The integrated AI provides instant, context-aware translations and grammar explanations for any subtitle word you hover over."
        }
      },
      {
        "@type": "Question",
        "name": "Which sites are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Funlingo currently supports dual subtitles on YouTube, Netflix, and Prime Video, covering millions of videos across 100+ languages."
        }
      },
      {
        "@type": "Question",
        "name": "Can I save words?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can save words to your personal vocabulary list to review later, tracking your progress over time."
        }
      },
      {
        "@type": "Question",
        "name": "Is it good for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Dual subtitles allow beginners to follow the story in their native language while associating spoken audio with target language text."
        }
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Funlingo",
    "url": "https://getfunlingo.com",
    "logo": "https://getfunlingo.com/figmaAssets/logo.png",
    "description": "Funlingo builds free AI-powered language learning tools. Our Chrome extension provides dual subtitles for Netflix, YouTube, and Prime Video, helping users learn 100+ languages through immersive video content.",
    "sameAs": []
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://getfunlingo.com"
      }
    ]
  };

  return (
    <div className="flex flex-col items-start relative bg-[#000000]">
      <SEO 
        title="Funlingo - Free Dual Subtitles for Netflix & YouTube Learning"
        description="Free dual subtitle Chrome extension for Netflix, YouTube & Prime. AI-powered bilingual subtitles, vocabulary building, and instant translations."
        keywords="free dual subtitle chrome extension, learn languages while watching videos, bilingual subtitles netflix, dual subtitles youtube, ai powered language learning, best free subtitle tool"
        canonical="/"
      />
      {/* Schema.org Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

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
      <ComparisonTableSection />
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
