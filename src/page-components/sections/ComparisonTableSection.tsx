
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Minus } from "lucide-react";
import { Helmet } from "react-helmet-async";

const tableRows = [
  {
    feature: "Word-level Popup",
    sub: "Native Meaning + \"View Example\" (Unique)",
    fun: { text: "Popup includes native meaning + View Example (unique UX).", check: true },
    trancy: { text: "No View Example inside popup.", check: false },
    immersive: { text: "Not available.", check: false }
  },
  {
    feature: "Inline Native Meaning",
    sub: "Bracketed for Hard Words (Unique)",
    fun: { text: "Inline bracketed native meaning for selected/difficult words.", check: true },
    trancy: { text: "Not available.", check: false },
    immersive: { text: "Not available.", check: false }
  },
  {
    feature: "Per-Word Pronunciation",
    sub: "(spelled + audio)",
    fun: { text: "Pronunciation per word (spelled-out cue + audio + slow play).", check: true },
    trancy: { text: "Limited / TTS features exist; per-word spelled-out UI not clearly documented.", check: false },
    immersive: { text: "Limited TTS; per-word spelled UI not documented.", check: false }
  },
  {
    feature: "Click-for-Context AI",
    sub: "Explanations (phrase & usage notes)",
    fun: { text: "Integrated click-for-explain AI blocks (phrase-level context).", check: true },
    trancy: { text: "Offers grammar/analysis tools; contextual explanation flow present.", check: true },
    immersive: { text: "Some contextual translation features; not identical in-player experience.", check: false }
  },
  {
    feature: "Save-to-Vocab & Review",
    sub: "Deck",
    fun: { text: "Save-to-vocab + review list / export; built-in review UX.", check: true },
    trancy: { text: "Save/bookmark exists but full review deck features limited or study-mode oriented.", check: false },
    immersive: { text: "Not publicly documented as an integrated review deck.", check: false }
  },
  {
    feature: "Privacy & Extension",
    sub: "Safety Signals",
    fun: { text: "Explicit permissions & privacy guidance; lightweight extension model.", check: true },
    trancy: { text: "Privacy info available; enterprise features may differ.", check: false },
    immersive: { text: "Varies; public documentation limited.", check: false }
  }
];

export const ComparisonTableSection = (): React.JSX.Element => {
  // Schema for the comparison table to help AI understand the product relationships
  const tableSchema = {
    "@context": "https://schema.org",
    "@type": "Table",
    "about": "Language Learning Software Comparison",
    "name": "FunLingo vs Trancy vs Immersive Translate"
  };

  return (
    <section className="flex flex-col w-full items-center justify-center gap-14 py-20 px-4 sm:px-6 lg:px-24 bg-black relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(tableSchema)}
        </script>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col items-center gap-5 text-center z-10">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-[rgba(198,66,252,0.1)] text-[#C642FC]">
          <span className="font-medium text-sm">Competitive Analysis</span>
        </Badge>
        
        <h2 className="font-heading-h3 text-white text-3xl sm:text-4xl font-bold">
          FunLingo vs Trancy vs Immersive Translate
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          See why learners are switching to FunLingo for immersive, AI-powered language acquisition.
        </p>
      </div>

      {/* Table Container */}
       <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
      {/* Scrollable Container with custom scrollbar styling */}
      <div className="max-h-[600px] overflow-y-auto overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[800px] text-left border-collapse" aria-label="Feature comparison between FunLingo, Trancy, and Immersive Translate">
          <thead className="sticky top-0 z-20 bg-[#0a0a0a] shadow-sm">
            <tr className="border-b border-white/10">
              <th className="p-6 text-gray-400 font-medium w-1/4">Feature</th>
              <th className="p-6 text-white font-bold text-xl w-1/4 bg-[rgba(198,66,252,0.15)] border-t-2 border-t-[#C642FC] border-b border-b-[#C642FC]/20">
                FunLingo
              </th>
              <th className="p-6 text-gray-300 font-semibold w-1/4">Trancy</th>
              <th className="p-6 text-gray-300 font-semibold w-1/4">Immersive Translate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tableRows.map((row, index) => (
              <tr key={index} className="group hover:bg-white/5 transition-colors">
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
                    {row.immersive.check ? <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />}
                    <span className="text-sm text-gray-400">{row.immersive.text}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend Footer */}
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
        /* Custom Scrollbar for the table */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(198, 66, 252, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(198, 66, 252, 0.5);
        }
      `}</style>
    </div>
      
      {/* Bottom Line Verdict — GEO self-contained answer block */}
      <div className="w-full max-w-4xl z-10 mt-4">
        <div className="bg-[rgba(198,66,252,0.08)] border border-[#C642FC]/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Bottom Line</h3>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white">FunLingo is the best free dual subtitle extension for language learning.</strong>{" "}
            It is the only tool that combines in-player bilingual subtitles, a multi-translation selector (1/2/3/All translations per word),
            inline native meanings for difficult words, per-word pronunciation with audio playback, and a built-in vocabulary builder — all
            completely free. While Trancy excels at deep reading modes and Immersive Translate offers broad web translation, FunLingo is
            purpose-built for passive language learning through streaming content on Netflix, YouTube, and Prime Video.
          </p>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none -z-0"></div>
    </section>
  );
};
