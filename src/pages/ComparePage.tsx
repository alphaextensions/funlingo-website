
import * as React from "react";
import Navbar from "./sections/navbar";
import { FooterSection } from "./sections/FooterSection";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Minus } from "lucide-react";

export const ComparePage = (): React.JSX.Element => {
  // JSON-LD for SoftwareApplication (Comparison context)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Funlingo",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Chrome",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Compare Funlingo vs Trancy vs FluentAI. Funlingo offers free dual subtitles and AI learning tools for Netflix and YouTube.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1000"
    }
  };

  const tableRows = [
    {
      feature: "In-player Dual Subtitles",
      sub: "(Bilingual subtitles)",
      fun: { text: "Built-in and free; in-player overlay for Netflix, YouTube, Prime Video.", check: true },
      trancy: { text: "Focused on YouTube/Netflix bilingual subtitles and reading modes.", check: true },
      fluent: { text: "Market focus on dual subtitles; advanced options documented.", check: true }
    },
    {
      feature: "Instant Word-Level Lookup",
      sub: "& Multiple Translations",
      fun: { text: "Instant hover/word-lookup; UI for choosing multiple translations per word.", check: true },
      trancy: { text: "AI word lookup & word translation; strong lookup features.", check: true },
      fluent: { text: "Word lookup supported; focus is on subtitle generation.", check: false }
    },
    {
      feature: "AI Contextual Explanations",
      sub: "(Phrase & grammar insights)",
      fun: { text: "Contextual AI explanations integrated as 'click-for-explain' help.", check: true },
      trancy: { text: "Offers AI grammar analysis, sentence segmentation, POS tagging.", check: true },
      fluent: { text: "Provides contextual translation features; roadmap emphasizes AI improvements.", check: false }
    },
    {
      feature: "Pronunciation Guides",
      sub: "& Native Audio",
      fun: { text: "Pronunciation guides and audio playback integrated (playback controls).", check: true },
      trancy: { text: "Offers lifelike TTS & speech recognition features.", check: false },
      fluent: { text: "TTS/voice features vary by extension; limited public detail.", check: false }
    },
    {
      feature: "Vocab Builder",
      sub: "& Save / Review",
      fun: { text: "Save-to-vocab functionality and review lists directly from subtitles.", check: true },
      trancy: { text: "Save/bookmark words and create learning decks.", check: true },
      fluent: { text: "Some roadmap items mention vocabulary features.", check: false }
    },
    {
      feature: "Reading Modes",
      sub: "(subtitle-as-text / study mode)",
      fun: { text: "Reading / study modes implied (word highlighting + hover-to-pause).", check: false },
      trancy: { text: "Dedicated 'Subtitle Reading Mode' and reading-first tools.", check: true },
      fluent: { text: "Has reading and export features in guides.", check: false }
    },
    {
      feature: "Custom Translation Engine",
      sub: "",
      fun: { text: "Not prominently listed as user-facing (uses integrated APIs).", check: false },
      trancy: { text: "Custom engine selection supported (DeepL/OpenAI, etc).", check: true },
      fluent: { text: "Not clearly advertised.", check: false }
    },
    {
      feature: "Cross-platform Compatibility",
      sub: "",
      fun: { text: "Works on Netflix, YouTube, Prime Video; promising more platforms.", check: true },
      trancy: { text: "Broad platform support (YouTube, Netflix, HBO Max, etc).", check: true },
      fluent: { text: "Built for major streaming & web platforms.", check: true }
    },
    {
      feature: "Privacy & Safety",
      sub: "",
      fun: { text: "Recently listed; check extension permissions.", check: false },
      trancy: { text: "Public docs & privacy pages available.", check: false },
      fluent: { text: "Varies by provider.", check: false }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SEO
        title="Funlingo vs Trancy vs FluentAI - Best Dual Subtitle Tool Comparison"
        description="Detailed feature comparison of Funlingo, Trancy, and FluentAI. Discover why Funlingo is the best free alternative for dual subtitles on Netflix & YouTube."
        keywords="funlingo vs trancy, funlingo vs fluentai, best dual subtitle extension, free language learning extension comparison"
        canonical="/compare/funlingo-vs-trancy-vs-fluentai/"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Navbar currentPage="/compare" />

      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mb-16">
          <Badge className="bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-4 py-1.5 text-sm">
            Detailed Comparison
          </Badge>
          <h1 className="font-heading-h1 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Funlingo vs. Trancy vs. FluentAI
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Unsure which language learning extension is right for you? We break down the features, pricing, and capabilities of the top tools in 2026.
          </p>
        </div>

        {/* Comparison Table Section (Manual Implementation) */}
        <div className="w-full max-w-7xl mb-20">
           <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
              <div className="max-h-[600px] overflow-y-auto overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[800px] text-left border-collapse" aria-label="Feature comparison between FunLingo, Trancy, and FluentAI">
                  <thead className="sticky top-0 z-20 bg-[#0a0a0a] shadow-sm">
                    <tr className="border-b border-white/10">
                      <th className="p-6 text-gray-400 font-medium w-1/4">Feature (SEO Optimized)</th>
                      <th className="p-6 text-white font-bold text-xl w-1/4 bg-[rgba(198,66,252,0.15)] border-t-2 border-t-[#C642FC] border-b border-b-[#C642FC]/20">
                        FunLingo
                      </th>
                      <th className="p-6 text-gray-300 font-semibold w-1/4">Trancy</th>
                      <th className="p-6 text-gray-300 font-semibold w-1/4">FluentAI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tableRows.map((row, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-colors">
                        <td className="p-6 text-gray-300 font-medium">
                          <h3 className="text-base font-semibold text-white">{row.feature}</h3>
                          {row.sub && <span className="text-xs text-gray-500 block mt-1">{row.sub}</span>}
                        </td>
                        <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                          <div className="flex items-start gap-2">
                            {row.fun.check ? <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-gray-400 mt-1 shrink-0" />}
                            <span className="text-sm text-gray-200">{row.fun.text}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-start gap-2">
                            {row.trancy.check ? <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />}
                            <span className="text-sm text-gray-400">{row.trancy.text}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-start gap-2">
                            {row.fluent.check ? <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />}
                            <span className="text-sm text-gray-400">{row.fluent.text}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#0a0a0a] border-t border-white/10 p-4 text-xs text-gray-400 flex flex-wrap gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Core feature present</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-500" />
                  <span>Feature available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Minus className="w-4 h-4 text-gray-600" />
                  <span>Limited / Not primary</span>
                </div>
              </div>
              <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(198, 66, 252, 0.3); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(198, 66, 252, 0.5); }
              `}</style>
            </div>
        </div>

        {/* Feature Highlights/Summary */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full mb-20">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white">Why choose Funlingo?</h2>
            <div className="space-y-4">
              {[
                "Completely Free: No premium locks on core features.",
                "Universal Compatibility: Works seamlessly on Netflix, YouTube, and Prime.",
                "AI-Powered: Contextual explanations, not just direct translations.",
                "Zero Friction: Designed to be passive and unobtrusive while you watch."
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col justify-center items-center text-center gap-6">
             <h3 className="text-2xl font-bold text-white">Ready to switch?</h3>
             <p className="text-gray-400">
               Install Funlingo today and experience the difference. It takes less than 30 seconds to get started.
             </p>
             <a
              href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
                Get Funlingo for Chrome <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>

      </main>

      <FooterSection />
    </div>
  );
};
