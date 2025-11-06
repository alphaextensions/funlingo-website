import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

// Define types for our data
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  size: "small" | "large";
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote:
      "Funlingo has transformed how I learn Japanese. I can finally understand anime without subtitles, and I'm learning naturally through content I actually enjoy!",
    name: "Sarah Chen",
    role: "Japanese Learner",
    avatar: "/figmaAssets/avatar.png",
    size: "small",
  },
  {
    id: 2,
    quote:
      "As a language teacher, I recommend Funlingo to all my students. It's the perfect complement to traditional learning methods. The AI explanations are incredibly accurate and contextual, helping students understand not just what words mean, but how they're used in real conversations. My students' comprehension has improved dramatically.",
    name: "Michael Rodriguez",
    role: "Spanish Teacher",
    avatar: "/figmaAssets/avatar-1.png",
    size: "large",
  },
  {
    id: 3,
    quote:
      "I've been using Funlingo for French learning and it's amazing! The pronunciation guides are so helpful, and I love how it works seamlessly with Netflix.",
    name: "Emma Thompson",
    role: "French Learner",
    avatar: "/figmaAssets/avatar-2.png",
    size: "small",
  },
  {
    id: 4,
    quote:
      "Learning Korean has never been easier. Funlingo makes it so natural - I just watch my favorite K-dramas and learn along the way. Highly recommend!",
    name: "David Park",
    role: "Korean Learner",
    avatar: "/figmaAssets/avatar-3.png",
    size: "small",
  },
  {
    id: 5,
    quote:
      "I bought the lifetime plan and it's worth every penny. The vocabulary builder feature is brilliant for reviewing words I've learned while watching shows.",
    name: "Lisa Mueller",
    role: "German Learner",
    avatar: "/figmaAssets/avatar-4.png",
    size: "small",
  },
];

export const FunlingoTestimonialsSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full items-center justify-center gap-10 sm:gap-12 lg:gap-14 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-24 relative [background:radial-gradient(50%_50%_at_0%_100%,rgba(198,66,252,1)_0%,rgba(122,28,172,1)_24%,rgba(0,0,0,1)_100%)] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
      <div className="absolute top-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />

      {/* Header Section */}
      <header
        className={`inline-flex flex-col max-w-full sm:max-w-screen-sm items-center justify-center gap-4 sm:gap-5 relative flex-[0_0_auto] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 relative flex-[0_0_auto] rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up">
          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] whitespace-nowrap [font-style:var(--body-xs-medium-font-style)]">
            Testimonials
          </span>
        </Badge>

        <h2
          className="relative flex items-center justify-center w-full max-w-2xl font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-2xl sm:text-3xl lg:text-4xl xl:text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-tight sm:leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)] animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Language Learners Love Funlingo
        </h2>
      </header>

      {/* Mobile Carousel */}
      <div className="lg:hidden w-full max-w-2xl relative">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  isActive={index === activeTestimonial}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? "bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] scale-125"
                  : "bg-textbody hover:bg-textwhite"
              }`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:inline-flex flex-col items-center justify-center gap-6 relative flex-[0_0_auto] w-full max-w-6xl">
        {/* First Row */}
        <div
          className={`inline-flex gap-6 flex-[0_0_auto] items-start relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {testimonialsData.slice(0, 2).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isActive={true}
            />
          ))}
        </div>

        {/* Second Row */}
        <div
          className={`inline-flex gap-6 flex-[0_0_auto] items-start relative transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {testimonialsData.slice(2, 5).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index + 2}
              isActive={true}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div
        className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {[
          { number: "4.9/5", label: "User Rating" },
          { number: "1,000+", label: "Active Learners" },
          { number: "50+", label: "Languages" },
          { number: "99%", label: "Satisfaction" },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center animate-fade-in-up"
            style={{ animationDelay: `${800 + index * 100}ms` }}
          >
            <div className="font-heading-h4 text-textwhite text-xl sm:text-2xl font-bold">
              {stat.number}
            </div>
            <div className="font-body-small-regular text-textbody text-sm sm:text-base">
              {stat.label}
            </div>
          </div>
        ))}
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
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Separate Testimonial Card Component for better reusability
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
  isActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`flex flex-col items-start gap-4 sm:gap-6 p-6 sm:p-8 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm rounded-xl overflow-hidden border border-[#ffffff1a] transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 relative ${
        testimonial.size === "small"
          ? "w-full max-w-sm"
          : "w-full max-w-2xl lg:max-w-[664px]"
      } ${isActive ? "opacity-100" : "opacity-0 absolute"} animate-fade-in-up`}
      style={{
        animationDelay: `${index * 100 + 300}ms`,
        zIndex: isActive ? 10 : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Gradient Border Effect - Fixed to not affect content */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm group-hover:blur-md"></div>
      <div className="absolute inset-[1px] rounded-xl bg-[rgba(0,0,0,0.9)] -z-10 backdrop-blur-sm"></div>

      <CardContent className="p-0 flex flex-col gap-4 sm:gap-6 w-full relative z-10">
        {/* Quote Icon */}
        <div className="absolute -top-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <Quote className="w-16 h-16 text-[#C642FC] transform rotate-12" />
        </div>

        {/* Quote Text */}
        <p
          className={`relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textwhite text-sm sm:text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-medium-line-height)] [font-style:var(--body-normal-medium-font-style)] group-hover:text-white transition-colors duration-300 ${
            isHovered ? "transform translate-x-1" : ""
          }`}
        >
          {testimonial.quote}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-1 group-hover:scale-110 transition-transform duration-300">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
            />
          ))}
          <span className="ml-2 font-body-small-medium text-textwhite text-sm">
            5.0
          </span>
        </div>

        {/* Author Info */}
        <div className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto] group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
          <Avatar className="relative w-10 h-10 rounded-[28px] group-hover:scale-110 transition-transform duration-300 border-2 border-transparent group-hover:border-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)]">
            <AvatarImage
              src={testimonial.avatar}
              alt={testimonial.name}
              className="object-cover"
            />
          </Avatar>

          <div className="flex flex-col items-start relative flex-1 grow">
            <p className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-small-medium text-textwhite text-[length:var(--body-small-medium-font-size)] leading-[var(--body-small-medium-line-height)] font-[number:var(--body-small-medium-font-weight)] tracking-[var(--body-small-medium-letter-spacing)] [font-style:var(--body-small-medium-font-style)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
              {testimonial.name}
            </p>

            <p className="relative flex items-center justify-center self-stretch font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-textbody text-[length:var(--body-small-regular-font-size)] tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] [font-style:var(--body-small-regular-font-style)] group-hover:text-textwhite transition-colors duration-300">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
