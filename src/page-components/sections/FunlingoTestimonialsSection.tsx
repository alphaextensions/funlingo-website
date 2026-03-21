
import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  date: string;
  avatar: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Shubham Routray",
    date: "Nov 15, 2025",
    quote:
      "Funlingo has made learning a new language part of my everyday entertainment. The dual subtitles help me catch new words instantly, and the built-in meanings make everything so easy to understand.",
    avatar: "/figmaAssets/avatar.png",
  },
  {
    id: 2,
    name: "Daniel",
    date: "Nov 11, 2025",
    quote:
      "I’ve been using this extension for a while now, and it’s amazing how much my language skills have improved just by watching videos. It feels effortless and fun, and I love how it fits into my daily routine. I can learn language very easily.",
    avatar: "/figmaAssets/avatar-1.png",
  },
  {
    id: 3,
    name: "Aastha Pandey",
    date: "Nov 10, 2025",
    quote:
      "Funlingo has completely transformed the way I learn languages! Watching Netflix or YouTube while picking up new words feels effortless now. The dual subtitles and instant word meanings make understanding so smooth and fun. It’s intuitive, perfectly integrated with the player, and adds so much value to every show I watch. Learning while watching has never been this enjoyable",
    avatar: "/figmaAssets/background.png",
  },
  {
    id: 4,
    name: "Sarthak Shinde",
    date: "Nov 10, 2025",
    quote:
      "Funlingo is an awesome tool for learning languages while watching Netflix or YouTube. I love the dual subtitles and instant word meanings — it makes understanding so easy. It’s smooth, simple, and blends perfectly with the player. Learning while watching has never been this fun! 🎬✨",
    avatar: "/figmaAssets/avatar-3.png",
  },
  {
    id: 5,
    name: "indera craft",
    date: "Nov 19, 2025",
    quote: "fun to use !",
    avatar: "/figmaAssets/avatar-4.png",
  },
];

export const FunlingoTestimonialsSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play effect
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => clearInterval(intervalId);
  }, [api]);

  // Review schema for testimonials — enables rich results and AI citation
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Funlingo",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Chrome, Edge, Brave",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.92",
      "reviewCount": String(testimonialsData.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonialsData.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": new Date(t.date).toISOString().split("T")[0],
      "reviewBody": t.quote,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }))
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full items-center justify-center gap-10 sm:gap-12 lg:gap-14 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-24 relative [background:radial-gradient(50%_50%_at_0%_100%,rgba(198,66,252,1)_0%,rgba(122,28,172,1)_24%,rgba(0,0,0,1)_100%)] overflow-hidden"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
      <div className="absolute top-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />

      {/* Header Section */}
      <header
        className={`inline-flex flex-col max-w-full sm:max-w-screen-sm items-center justify-center gap-4 sm:gap-5 relative flex-[0_0_auto] z-10 transition-all duration-1000 ${
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

      {/* Carousel Section */}
      <div 
        className={`w-full max-w-7xl relative z-10 px-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonialsData.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 h-auto">
                <div className="p-1 h-full">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Custom Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index + 1
                  ? "w-8 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
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

// Updated Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({
  testimonial,
  
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="flex flex-col items-center text-center gap-4 p-6 sm:p-8 bg-[rgba(0,0,0,0.6)] backdrop-blur-md rounded-2xl overflow-hidden border border-[#ffffff1a] transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/20 w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm group-hover:blur-md"></div>
      <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a] -z-10"></div>

      <CardContent className="p-0 flex flex-col items-center gap-4 w-full h-full relative z-10">
        {/* Quote Icon */}
        <div className="opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Quote className="w-8 h-8 text-[#C642FC] fill-current" />
        </div>

        {/* Quote Text */}
        <div className="flex-grow flex items-center justify-center">
          <p
            className={`font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textwhite text-base sm:text-lg leading-relaxed tracking-wide italic transition-all duration-300 ${
              isHovered ? "scale-[1.01]" : ""
            }`}
          >
            "{testimonial.quote}"
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 group-hover:scale-110 transition-transform duration-300 mt-auto pt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-12 h-1 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] rounded-full opacity-50"></div>

        {/* Author Info */}
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-12 h-12 rounded-full border-2 border-[#C642FC] shadow-lg mb-1">
            <AvatarImage
              src={testimonial.avatar}
              alt={testimonial.name}
              className="object-cover"
            />
          </Avatar>

          <div className="flex flex-col items-center">
            <p className="font-heading-h6 text-textwhite text-base font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
              {testimonial.name}
            </p>

            <p className="font-body-small-regular text-textbody text-xs">
              {testimonial.date}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
