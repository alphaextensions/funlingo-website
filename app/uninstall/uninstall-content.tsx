"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";

// TODO: replace FORM_UID_ENTRY_ID once a short-answer field titled "User ID"
// is added to the Google Form. Use Forms' "Get pre-filled link" feature to
// discover its entry.NNNN id.
const GOOGLE_FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSdv2e6cdee5tguj0Fh1iS7QWcAmAp8dHTDkx0rqvyfVAq-MKw/viewform?embedded=true";
const FORM_UID_ENTRY_ID = "entry.<NUMBER>";

function UninstallInner() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") || "";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (!params.uid) return;

    const body = new Blob([JSON.stringify(params)], { type: "application/json" });

    // sendBeacon is purpose-built to survive tab close — non-blocking,
    // queued on a separate browser thread. Returns false if the browser
    // rejected the request (rare; usually payload too large).
    const queued = navigator.sendBeacon("/api/uninstall-log", body);

    if (!queued) {
      // Fallback: keepalive fetch also survives tab close on modern browsers.
      fetch("/api/uninstall-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
        keepalive: true,
      }).catch(() => {
        /* user is gone; nothing to do */
      });
    }
  }, [searchParams]);

  const formSrc = uid
    ? `${GOOGLE_FORM_BASE}&${FORM_UID_ENTRY_ID}=${encodeURIComponent(uid)}`
    : GOOGLE_FORM_BASE;

  return (
    <div className="flex flex-col items-start relative fnl-root min-h-screen">
      <Navbar currentPage="/uninstall" />

      <main
        ref={sectionRef}
        className="flex flex-col w-full items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="flex flex-col max-w-3xl w-full items-center gap-10">
          <div
            className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-textwhite text-3xl sm:text-4xl lg:text-5xl xl:text-[length:var(--heading-h1-font-size)] tracking-[var(--heading-h1-letter-spacing)] leading-tight sm:leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)] animate-fade-in-up">
              Sorry to see you go
            </h1>
            <p
              className="font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-textbody text-lg sm:text-xl lg:text-[length:var(--body-large-regular-font-size)] tracking-[var(--body-large-regular-letter-spacing)] leading-relaxed sm:leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)] max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Mind telling us why? Your feedback helps us build a better Funlingo.
            </p>
          </div>

          <div
            className={`w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm overflow-hidden shadow-2xl shadow-purple-500/10 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } animate-fade-in-up`}
            style={{ animationDelay: "400ms" }}
          >
            <div className="h-1 bg-gradient-to-r from-[#9A1C8E] to-[#C81FD4]" />
            <iframe
              src={formSrc}
              width="100%"
              height={900}
              title="Funlingo uninstall feedback"
              className="block w-full bg-white"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    <FooterSection />
    </div>
  );
}

export default function UninstallContent() {
  return (
    <Suspense fallback={null}>
      <UninstallInner />
    </Suspense>
  );
}
