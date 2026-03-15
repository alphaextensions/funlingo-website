import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navbar from "./sections/navbar";

// Define types for our form data
interface FeedbackFormData {
  name: string;
  email: string;
  category: string;
  message: string;
  uninstallReason: string;
  missingFeatures: string[];
  notWorkingProperly: boolean;
  otherReason: string;
  desiredFeature: string;
  satisfaction: number;
  recommend: string;
}

export const Feedback = (): React.JSX.Element => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    category: "feature",
    message: "",
    uninstallReason: "",
    missingFeatures: [],
    notWorkingProperly: false,
    otherReason: "",
    desiredFeature: "",
    satisfaction: 5,
    recommend: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
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

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email.";
    if (!formData.message.trim()) return "Please enter your feedback.";

    if (
      formData.category === "uninstall" &&
      formData.missingFeatures.length === 0 &&
      !formData.notWorkingProperly &&
      !formData.otherReason.trim()
    ) {
      return "Please select at least one uninstall reason.";
    }
    return null;
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await fetch(
        "https://script.google.com/macros/s/AKfycbzbir-gTrH4MPvKXoSGJ3gH3DRVZQz1Ja-A5LY4EDhkhja-JD40OOKH8qpNyoqn-9jf/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
        }
      );

      // ✅ Success
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        category: "feature",
        message: "",
        uninstallReason: "",
        missingFeatures: [],
        notWorkingProperly: false,
        otherReason: "",
        desiredFeature: "",
        satisfaction: 5,
        recommend: "",
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleCheckboxChange = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      missingFeatures: prev.missingFeatures.includes(feature)
        ? prev.missingFeatures.filter(f => f !== feature)
        : [...prev.missingFeatures, feature]
    }));
  };

  const satisfactionLabels: { [key: number]: string } = {
    1: "Very Dissatisfied",
    2: "Dissatisfied",
    3: "Neutral",
    4: "Satisfied",
    5: "Very Satisfied"
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
              Your input helps us build a better language learning experience for everyone
            </p>
          </div>

           {/* ❌ ERROR MESSAGE */}
          {error && (
            <div className="w-full max-w-2xl p-3 rounded-lg bg-red-500/20 border border-red-500 backdrop-blur-sm animate-fade-in-up">
              <p className="font-body-normal-medium text-red-200 text-center">
                {error}
              </p>
            </div>
          )}

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
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <option value="uninstall">Reason for Uninstalling</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Satisfaction Rating */}
            <div className="flex flex-col gap-3">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Overall Satisfaction
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.satisfaction}
                  onChange={(e) => setFormData({ ...formData, satisfaction: parseInt(e.target.value) })}
                  className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#C642FC] [&::-webkit-slider-thumb]:to-[#7A1CAC]"
                />
                <div className="flex justify-between text-xs text-textbody">
                  <span>1 - Very Dissatisfied</span>
                  <span className="text-textwhite font-medium">
                    {formData.satisfaction} - {satisfactionLabels[formData.satisfaction]}
                  </span>
                  <span>5 - Very Satisfied</span>
                </div>
              </div>
            </div>

            {/* Uninstall Reasons - Conditionally Shown */}
            {formData.category === 'uninstall' && (
              <div className="space-y-4 p-4 rounded-lg bg-[rgba(0,0,0,0.2)] border border-[#ffffff1a] animate-fade-in-up">
                <h4 className="font-body-normal-medium text-textwhite mb-3">
                  Why are you considering uninstalling?
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="missing-features"
                      checked={formData.missingFeatures.includes('features')}
                      onChange={() => handleCheckboxChange('features')}
                      className="w-4 h-4 rounded border-[#ffffff1a] bg-[rgba(0,0,0,0.3)] text-[#C642FC] focus:ring-[#C642FC] focus:ring-2"
                    />
                    <label htmlFor="missing-features" className="font-body-normal-regular text-textwhite cursor-pointer">
                      Missing features I need
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="not-working"
                      checked={formData.notWorkingProperly}
                      onChange={(e) => setFormData({ ...formData, notWorkingProperly: e.target.checked })}
                      className="w-4 h-4 rounded border-[#ffffff1a] bg-[rgba(0,0,0,0.3)] text-[#C642FC] focus:ring-[#C642FC] focus:ring-2"
                    />
                    <label htmlFor="not-working" className="font-body-normal-regular text-textwhite cursor-pointer">
                      Not working properly
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="other-reason"
                      checked={formData.missingFeatures.includes('other')}
                      onChange={() => handleCheckboxChange('other')}
                      className="w-4 h-4 rounded border-[#ffffff1a] bg-[rgba(0,0,0,0.3)] text-[#C642FC] focus:ring-[#C642FC] focus:ring-2"
                    />
                    <label htmlFor="other-reason" className="font-body-normal-regular text-textwhite cursor-pointer">
                      Other reasons
                    </label>
                  </div>

                  {formData.missingFeatures.includes('other') && (
                    <div className="mt-2 animate-fade-in-up">
                      <Input
                        type="text"
                        value={formData.otherReason}
                        onChange={(e) => setFormData({ ...formData, otherReason: e.target.value })}
                        className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                        placeholder="Please specify other reasons..."
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Feature Request Section */}
            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                {formData.category === 'feature' ? 'Feature Details' : 'Any Feature You\'d Like Us to Build?'}
              </label>
              <Input
                type="text"
                value={formData.desiredFeature}
                onChange={(e) => setFormData({ ...formData, desiredFeature: e.target.value })}
                className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                placeholder={
                  formData.category === 'feature' 
                    ? "Describe the feature you'd like to see..."
                    : "What feature would make you reconsider?"
                }
              />
            </div>

            {/* Recommendation */}
            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Would you recommend FunLingo to others?
              </label>
              <select
                value={formData.recommend}
                onChange={(e) => setFormData({ ...formData, recommend: e.target.value })}
                className="h-10 px-3 py-2 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[#ffffff1a] text-textwhite font-body-normal-regular hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
              >
                <option value="">Select an option</option>
                <option value="definitely">Definitely yes</option>
                <option value="probably">Probably yes</option>
                <option value="unsure">Not sure</option>
                <option value="probably-not">Probably not</option>
                <option value="definitely-not">Definitely not</option>
              </select>
            </div>

            {/* Main Message */}
            <div className="flex flex-col gap-2">
              <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                Additional Comments
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300 min-h-[120px] resize-vertical"
                placeholder="Share any additional thoughts, suggestions, or details..."
              />
            </div>

           <Button
              type="submit"
              disabled={loading}
              className={`w-full h-12 px-6 py-3 rounded-lg transition-all duration-300 mt-2 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] hover:opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              }`}
            >
              <span className="relative z-10 font-body-normal-medium text-textwhite">
                {loading ? "Submitting..." : "Submit Feedback"}
              </span>
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
                link: "mailto:getfunlingo@gmail.com"
              },
              {
                icon: (
                  <>
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </>
                ),
                title: "Instagram",
                description: "@getfunlingo",
                delay: "800ms",
                link: "https://www.instagram.com/getfunlingo?igsh=MWVkcWQ5Nmh0YmZqdA=="
              },
              {
                icon: (
                  <>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </>
                ),
                title: "LinkedIn",
                description: "Follow our page",
                delay: "900ms",
                link: "https://www.linkedin.com/company/getfunlingo/"
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm text-center group hover:bg-[rgba(255,255,255,0.08)] hover:border-[#ffffff40] hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 animate-fade-in-up no-underline"
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
              </a>
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