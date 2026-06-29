import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";

export default function NotFound() {
  return (
    <div className="fnl-root flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full flex items-center justify-center px-5 py-24 text-center">
        <div className="max-w-[520px]">
          <div
            style={{
              fontSize: "clamp(72px,12vw,120px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-.03em",
              background: "var(--grad)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            404
          </div>
          <h1
            className="mt-4"
            style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-.01em" }}
          >
            This page took an unscheduled break.
          </h1>
          <p
            className="mt-3 mx-auto"
            style={{ fontSize: 17, lineHeight: 1.55, color: "var(--text-dim)", maxWidth: 420, fontWeight: 500 }}
          >
            The page you’re looking for doesn’t exist or has moved. Let’s get you
            back to learning.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 mt-7"
            style={{
              textDecoration: "none",
              padding: "15px 28px",
              borderRadius: 14,
              background: "var(--grad)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              boxShadow: "0 14px 30px -12px rgba(200,31,212,.7)",
            }}
          >
            Back to home →
          </a>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
