import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import {
  Brain,
  PlayCircle,
  Bot,
  Languages,
  BarChart3,
  Users,
  Sparkles,
  Target,
  Zap,
  Clock,
  Award,
  Shield,
  Star,
  TrendingUp,
  Globe,
  MessageCircle,
} from "lucide-react";

const featureItems = [
  {
    icon: Brain,
    title: "Contextual Learning",
    description:
      "Learn words and phrases in the context of real conversations and authentic content.",
    color: "text-purple-300",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-400/30",
    gradient: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: PlayCircle,
    title: "Fun & Engaging",
    description:
      "Transform your favorite videos into interactive language lessons.",
    color: "text-blue-300",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/30",
    gradient: "from-blue-500/20 to-cyan-600/10",
  },
  {
    icon: Bot,
    title: "AI-Powered Insights",
    description:
      "Get instant explanations and personalized feedback from our AI.",
    color: "text-green-300",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/30",
    gradient: "from-green-500/20 to-emerald-600/10",
  },
  {
    icon: Languages,
    title: "Real-time Translations",
    description: "Seamless translations while you watch, read, or listen.",
    color: "text-cyan-300",
    bgColor: "bg-cyan-500/20",
    borderColor: "border-cyan-400/30",
    gradient: "from-cyan-500/20 to-blue-600/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your journey with detailed analytics and milestones.",
    color: "text-orange-300",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-400/30",
    gradient: "from-orange-500/20 to-red-600/10",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join a global community and practice with native speakers.",
    color: "text-pink-300",
    bgColor: "bg-pink-500/20",
    borderColor: "border-pink-400/30",
    gradient: "from-pink-500/20 to-rose-600/10",
  },
];

const stats = [
  {
    icon: Target,
    value: "95%",
    label: "Learning Efficiency",
    color: "text-white",
  },
  { icon: Zap, value: "2.5x", label: "Faster Progress", color: "text-white" },
  { icon: Clock, value: "24/7", label: "AI Availability", color: "text-white" },
  { icon: Award, value: "10+", label: "Languages", color: "text-white" },
];

export const WhyChooseFunlingoSection = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full items-center gap-12 sm:gap-16 lg:gap-20 py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-24 bg-backgroundbackdrop overflow-hidden relative"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-grid-white"></div>
      </div>

      {/* Header Section */}
      <div
        className={`inline-flex flex-col max-w-4xl items-center justify-center gap-6 sm:gap-8 text-center transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up backdrop-blur-sm">
          <Sparkles className="w-4 h-4 mr-2 text-textwhite" />
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
            Why Choose Funlingo
          </span>
        </Badge>

        <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-center text-2xl sm:text-3xl lg:text-4xl xl:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-tight sm:leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
          Revolutionize Your
          <span className="bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] bg-clip-text text-transparent">
            {" "}
            Language Journey
          </span>
        </h2>

        <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-base sm:text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] max-w-3xl">
          Break free from traditional methods with our AI-powered platform that
          makes language learning intuitive, engaging, and remarkably effective.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="w-full max-w-7xl relative z-10">
        {/* Main Bento Grid */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-4 lg:gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Large Feature Card - Top Left */}
          <Card className="lg:col-span-3 lg:row-span-1 group relative rounded-3xl overflow-hidden border border-solid border-[#ffffff1a] bg-gradient-to-br from-purple-500/10 to-blue-500/5 hover:border-purple-400/40 transition-all duration-500 backdrop-blur-sm hover:transform hover:-translate-y-1">
            <CardContent className="relative z-10 flex flex-col h-full p-8 lg:p-10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)] mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Smart Contextual Learning
                  </h3>
                  <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] group-hover:text-textwhite/90 transition-colors duration-300">
                    Learn naturally through real conversations and authentic
                    content, not memorization. Our AI understands context and
                    helps you speak like a native.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <TrendingUp className="w-8 h-8 text-white/40" />
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards - Top Right */}
          <div className="lg:col-span-3 lg:row-span-1 grid grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-gradient-to-br from-white/5 to-white/2 hover:border-white/30 transition-all duration-500 backdrop-blur-sm hover:transform hover:scale-105"
              >
                <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                  <stat.icon
                    className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div className="font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-white text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] [font-style:var(--heading-h4-font-style)] font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                    {stat.label}
                  </div>

                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Medium Feature Cards - Bottom Row */}
          {featureItems.slice(1, 4).map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="lg:col-span-2 group relative rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-gradient-to-br from-white/5 to-white/2 hover:border-white/30 transition-all duration-500 backdrop-blur-sm hover:transform hover:-translate-y-1"
              >
                <CardContent className="relative z-10 flex flex-col h-full p-6 lg:p-8">
                  <div
                    className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}
                  >
                    <IconComponent className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <h3 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)] mb-3 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] group-hover:text-textwhite/90 transition-colors duration-300 flex-1">
                    {item.description}
                  </p>

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  ></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Feature Row */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {featureItems.slice(4).map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-solid border-[#ffffff1a] bg-gradient-to-br from-white/5 to-white/2 hover:border-white/30 transition-all duration-500 backdrop-blur-sm hover:transform hover:-translate-y-1"
              >
                <CardContent className="relative z-10 flex flex-row items-start h-full p-6 lg:p-8 gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                  >
                    <IconComponent className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)] mb-2 group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] group-hover:text-textwhite/90 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  ></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust & Community Section */}
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-8 mt-12 lg:mt-16 p-8 lg:p-10 rounded-3xl border border-solid border-[#ffffff1a] bg-gradient-to-r from-purple-500/10 to-blue-500/5 backdrop-blur-sm transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-brandlime-green" />
              <div>
                <div className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)]">
                  Trusted by 50,000+ Learners
                </div>
                <div className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                  Join our global community
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Globe className="w-6 h-6 text-blue-400" />
              <div className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                120+ Countries
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <MessageCircle className="w-6 h-6 text-green-400" />
              <div className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                1M+ Conversations
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-backgroundbackdrop flex items-center justify-center"
                >
                  <Star className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
            <div className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
              4.9/5 Rating
            </div>
          </div>
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
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .bg-grid-white {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};
