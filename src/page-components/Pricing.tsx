import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import logo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import Navbar from "./sections/navbar";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out Funlingo",
    features: [
      "Basic translations",
      "YouTube support",
      "Up to 50 words per day",
      "Community support",
      "Limited language pairs",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Best for serious language learners",
    features: [
      "Unlimited translations",
      "YouTube & Netflix support",
      "AI-powered explanations",
      "Pronunciation guides",
      "All language pairs",
      "Priority support",
      "Offline mode",
      "Advanced grammar tips",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Lifetime",
    price: "$149",
    period: "one-time payment",
    description: "Pay once, learn forever",
    features: [
      "Everything in Pro",
      "Lifetime updates",
      "Early access to features",
      "Premium support",
      "Custom vocabulary lists",
      "Export learning progress",
    ],
    cta: "Get Lifetime Access",
    popular: false,
  },
];

export const Pricing = (): React.JSX.Element => {
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

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,#000000_0%,#1a0a28_50%,#7A1CAC_100%)] min-h-screen">
      {/* Navigation Header */}
      <Navbar currentPage="/pricing" />

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
              Choose Your Learning Plan
            </h1>
            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Start learning languages naturally. No hidden fees, cancel
              anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`flex flex-col p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 group hover:scale-105 hover:shadow-2xl ${
                  plan.popular
                    ? "border-[#C642FC] bg-[rgba(198,66,252,0.1)] relative shadow-lg shadow-purple-500/20 scale-105"
                    : "border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] hover:shadow-purple-500/10"
                } animate-fade-in-up`}
                style={{ animationDelay: `${400 + index * 200}ms` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] border-0 px-4 py-1.5 hover:scale-110 transition-transform duration-300">
                    <span className="text-textwhite font-body-xs-medium">
                      Most Popular
                    </span>
                  </Badge>
                )}

                <div className="flex flex-col gap-4 mb-6">
                  <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-xl sm:text-2xl lg:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-500">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-[var(--heading-h1-line-height)] group-hover:scale-110 transition-transform duration-300">
                      {plan.price}
                    </span>
                    <span className="font-body-normal-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                      {plan.period}
                    </span>
                  </div>
                  <p className="font-body-normal-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                    {plan.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2 group/feature hover:translate-x-1 transition-transform duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-[#C642FC] mt-0.5 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-body-normal-regular text-textwhite group-hover/feature:text-transparent group-hover/feature:bg-clip-text group-hover/feature:bg-gradient-to-r group-hover/feature:from-[#C642FC] group-hover/feature:to-[#7A1CAC] transition-all duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 px-6 py-3 rounded-lg transition-all duration-300 group/btn overflow-hidden relative ${
                    plan.popular
                      ? "bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] hover:shadow-lg hover:shadow-purple-500/30"
                      : "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] hover:shadow-lg hover:shadow-white/10"
                  } hover:scale-105`}
                >
                  <span className="relative z-10 font-body-normal-medium text-textwhite group-hover/btn:scale-105 transition-transform duration-300">
                    {plan.cta}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div
            className={`flex flex-col items-center gap-4 text-center mt-8 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="font-body-normal-regular text-textbody animate-fade-in-up">
              All plans include a 14-day money-back guarantee
            </p>
            <p
              className="font-body-small-regular text-textbody animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Questions? Contact us at getfunlingo@gmail.com
            </p>
          </div>

          {/* FAQ Section */}
          <div
            className={`w-full max-w-4xl mt-12 transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="font-heading-h3 text-textwhite text-center mb-8 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Can I switch plans anytime?",
                  answer:
                    "Yes, you can upgrade, downgrade, or cancel your plan at any time.",
                },
                {
                  question: "Do you offer student discounts?",
                  answer:
                    "Yes, we offer 50% off for students with valid student ID.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and cryptocurrency.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, all paid plans come with a 14-day free trial.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[#ffffff1a] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${1000 + index * 100}ms` }}
                >
                  <h3 className="font-body-normal-medium text-textwhite mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    {faq.question}
                  </h3>
                  <p className="font-body-normal-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
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
