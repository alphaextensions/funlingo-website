
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Check,  Minus } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const ComparisonTableSection = (): React.JSX.Element => {
  // Schema for the comparison table to help AI understand the product relationships
  const tableSchema = {
    "@context": "https://schema.org",
    "@type": "Table",
    "about": "Language Learning Software Comparison",
    "name": "FunLingo vs Trancy vs FluentAI"
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
          FunLingo vs Trancy vs FluentAI
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          See why learners are switching to FunLingo for immersive, AI-powered language acquisition.
        </p>
      </div>

      {/* Table Container */}
       <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm">
      {/* Scrollable Container with custom scrollbar styling */}
      <div className="max-h-[600px] overflow-y-auto overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[800px] text-left border-collapse" aria-label="Feature comparison between FunLingo, Trancy, and FluentAI">
          <thead className="sticky top-0 z-20 bg-[#0a0a0a] shadow-sm">
            <tr className="border-b border-white/10">
              <th className="p-6 text-gray-400 font-medium w-1/4">Feature</th>
              <th className="p-6 text-white font-bold text-xl w-1/4 bg-[rgba(198,66,252,0.15)] border-t-2 border-t-[#C642FC] border-b border-b-[#C642FC]/20">
                FunLingo
              </th>
              <th className="p-6 text-gray-300 font-semibold w-1/4">Trancy</th>
              <th className="p-6 text-gray-300 font-semibold w-1/4">FluentAI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {/* Row 1 */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">In-player Dual Subtitles</h3>
                <span className="text-xs text-gray-500 block mt-1">(Bilingual subtitles)</span>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    <strong>Built-in and free;</strong> in-player overlay for Netflix, YouTube, Prime Video.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Focused on YouTube/Netflix bilingual subtitles and reading modes.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Market focus on dual subtitles; advanced options documented.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Instant Word-Level Lookup</h3>
                <span className="text-xs text-gray-500 block mt-1">& Multiple Translations</span>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Instant hover/word-lookup; UI for choosing multiple translations per word.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    AI word lookup & word translation; strong lookup features.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Word lookup supported; focus is on subtitle generation.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">AI Contextual Explanations</h3>
                <span className="text-xs text-gray-500 block mt-1">(Phrase & grammar insights)</span>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Contextual AI explanations integrated as "click-for-explain" help.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Offers AI grammar analysis, sentence segmentation, POS tagging.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Provides contextual translation features; roadmap emphasizes AI improvements.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Pronunciation Guides</h3>
                <span className="text-xs text-gray-500 block mt-1">& Native Audio</span>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Pronunciation guides and audio playback integrated (playback controls).
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Offers lifelike TTS & speech recognition features.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    TTS/voice features vary by extension; limited public detail.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 5 */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Vocab Builder</h3>
                <span className="text-xs text-gray-500 block mt-1">& Save / Review</span>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Save-to-vocab functionality and review lists directly from subtitles.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Save/bookmark words and create learning decks.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Some roadmap items mention vocabulary features.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 6: Reading Modes */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Reading Modes</h3>
                <span className="text-xs text-gray-500 block mt-1">(subtitle-as-text / study mode)</span>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Reading / study modes implied (word highlighting + hover-to-pause).
                  </span>
                </div>
              </td>
              <td className="p-6">
                 <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Dedicated "Subtitle Reading Mode" and reading-first tools.
                  </span>
                </div>
              </td>
              <td className="p-6">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Has reading and export features in guides.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 7: Custom Translation Engine */}
             <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Custom Translation Engine</h3>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Not prominently listed as user-facing (uses integrated APIs).
                  </span>
                </div>
              </td>
              <td className="p-6">
                 <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Custom engine selection supported (DeepL/OpenAI, etc).
                  </span>
                </div>
              </td>
              <td className="p-6">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Not clearly advertised.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 8: Cross-platform */}
            <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Cross-platform Compatibility</h3>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Works on Netflix, YouTube, Prime Video; promising more platforms.
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Broad platform support (YouTube, Netflix, HBO Max, etc).
                  </span>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Built for major streaming & web platforms.
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 9: Privacy */}
             <tr className="group hover:bg-white/5 transition-colors">
              <td className="p-6 text-gray-300 font-medium">
                <h3 className="text-base font-semibold text-white">Privacy & Safety</h3>
              </td>
              <td className="p-6 bg-[rgba(198,66,252,0.05)]">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                  <span className="text-sm text-gray-200">
                    Recently listed; check extension permissions.
                  </span>
                </div>
              </td>
              <td className="p-6">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Public docs & privacy pages available.
                  </span>
                </div>
              </td>
              <td className="p-6">
                 <div className="flex items-start gap-2">
                  <Minus className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                  <span className="text-sm text-gray-400">
                    Varies by provider.
                  </span>
                </div>
              </td>
            </tr>
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
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none -z-0"></div>
    </section>
  );
};
