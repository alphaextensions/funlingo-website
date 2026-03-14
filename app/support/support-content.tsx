"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navbar from "@/sections/navbar";

export default function SupportContent() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    priority: string;
    issueType: string;
    message: string;
    attachments: File[];
  }>({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    issueType: "technical",
    message: "",
    attachments: [],
  });

  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      issueType: "technical",
      message: "",
      attachments: [],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const supportTypes = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
      ),
      title: "Technical Support",
      description: "App issues, bugs, or technical problems",
      responseTime: "2-4 hours"
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
      title: "Feature Request",
      description: "Suggest new features or improvements",
      responseTime: "1-2 days"
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      ),
      title: "General Inquiry",
      description: "Other questions or information requests",
      responseTime: "1-2 days"
    }
  ];

  const priorityOptions = [
    { value: "low", label: "Low", color: "text-green-400" },
    { value: "medium", label: "Medium", color: "text-yellow-400" },
    { value: "high", label: "High", color: "text-orange-400" },
    { value: "urgent", label: "Urgent", color: "text-red-400" }
  ];

  return (
    <div className="flex flex-col items-start relative bg-[linear-gradient(180deg,#000000_0%,#1a0a28_50%,#7A1CAC_100%)] min-h-screen">
      {/* Navigation Header */}
      <Navbar currentPage="/support" />

      {/* Main Content */}
      <main
        ref={sectionRef}
        className="flex flex-col w-full items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="flex flex-col max-w-6xl w-full items-center gap-12 sm:gap-16">
          {/* Header Section */}
          <div
            className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              Get Help & Support
            </h1>
            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Our team is here to help you succeed with FunLingo. Reach out anytime.
            </p>
          </div>

          {/* Support Type Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {supportTypes.map((type, index) => (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm group hover:bg-[rgba(255,255,255,0.08)] hover:border-[#ffffff40] hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {type.icon}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading-h6 text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                      {type.title}
                    </h4>
                    <p className="font-body-small-regular text-textbody text-xs">
                      Response: {type.responseTime}
                    </p>
                  </div>
                </div>
                <p className="font-body-small-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          {/* Success Message */}
          {submitted && (
            <div
              className={`w-full max-w-4xl p-4 rounded-lg bg-[rgba(198,66,252,0.2)] border border-[#C642FC] backdrop-blur-sm transition-all duration-500 ${
                submitted ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "300ms" }}
            >
              <p className="font-body-normal-medium text-white text-center">
                Thank you for contacting us! We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Support Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className={`w-full flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-1000 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] group hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in-up`}
                style={{ animationDelay: "800ms" }}
              >
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
                      placeholder="Your full name"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                      Issue Type
                    </label>
                    <select
                      value={formData.issueType}
                      onChange={(e) =>
                        setFormData({ ...formData, issueType: e.target.value })
                      }
                      className="h-10 px-3 py-2 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[#ffffff1a] text-textwhite font-body-normal-regular hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                    >
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Account</option>
                      <option value="feature">Feature Request</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                      className="h-10 px-3 py-2 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[#ffffff1a] text-textwhite font-body-normal-regular hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                    >
                      {priorityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    Subject
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="bg-[rgba(0,0,0,0.3)] border-[#ffffff1a] text-textwhite placeholder:text-textbody hover:border-[#ffffff40] focus:border-[#C642FC] transition-all duration-300 min-h-[150px] resize-vertical"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body-normal-medium text-textwhite group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                    Attachments (Optional)
                  </label>
                  <div className="flex flex-col gap-3">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-body-normal-medium file:bg-gradient-to-r file:from-[#7A1CAC] file:to-[#C642FC] file:text-textwhite hover:file:opacity-90 transition-all duration-300"
                    />
                    {formData.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(198,66,252,0.2)] border border-[#C642FC]"
                          >
                            <span className="font-body-small-regular text-textwhite text-sm">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group/btn overflow-hidden relative mt-2"
                >
                  <span className="relative z-10 font-body-normal-medium text-textwhite group-hover/btn:scale-105 transition-transform duration-300">
                    Send Support Request
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className={`flex flex-col gap-6 transition-all duration-1000 delay-900 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="p-6 rounded-2xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm hover:bg-[rgba(255,255,255,0.08)] hover:border-[#ffffff40] transition-all duration-300 animate-fade-in-up">
                <h3 className="font-heading-h4 text-textwhite mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C642FC] group-hover:to-[#7A1CAC] transition-all duration-300">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body-normal-medium text-textwhite">Email Support</p>
                      <p className="font-body-small-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                        getfunlingo@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body-normal-medium text-textwhite">Discord Community</p>
                      <p className="font-body-small-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                        Join for real-time help
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body-normal-medium text-textwhite">Response Time</p>
                      <p className="font-body-small-regular text-textbody group-hover:text-textwhite transition-colors duration-300">
                        2-48 hours depending on priority
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#ffffff1a] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm hover:bg-[rgba(255,255,255,0.08)] hover:border-[#ffffff40] transition-all duration-300 animate-fade-in-up">
                <h3 className="font-heading-h4 text-textwhite mb-4">Before You Contact</h3>
                <ul className="space-y-2">
                  {[
                    "Check our FAQ section for quick answers",
                    "Include relevant screenshots if possible",
                    "Describe the steps to reproduce the issue",
                    "Mention your device and app version"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-body-small-regular text-textbody">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
}
