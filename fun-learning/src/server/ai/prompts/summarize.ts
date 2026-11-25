/**
 * Intent: short native-language summary of a source, with key points keyed to
 * timestamps (SPEC §6.4 "Summary" tab, SPEC §5.2 podcast AI summary).
 * MODEL_FAST — summaries fire on every source open; the "quality call" bar
 * doesn't apply here.
 */

import { unwrapConfidential } from "@/server/types/confidential";
import { MODEL_FAST } from "../client";
import type { PromptModule, SummarizeInput } from "../types";

export const summarize: PromptModule<SummarizeInput> = {
  name: "summarize",
  intent: "Native-language summary + 3-7 key points with timestamps.",
  rateLimit: {
    perUserDay: 300,
    perIpHour: 150,
    maxInputTokens: 5_000,
    timeoutMs: 20_000,
    model: MODEL_FAST,
  },
  responseFormat: "json",
  prompt(input) {
    const lines = unwrapConfidential(input.lines);
    return [
      {
        role: "system",
        content: [
          `Summarise a ${input.sourceLang} transcript for a ${input.nativeLang}-speaking learner.`,
          `Return STRICT JSON: {"summary":string,"keyPoints":[{"timestampSec":number|null,"text":string}]}.`,
          `Rules:`,
          `- "summary" is 2-4 sentences in ${input.nativeLang}.`,
          `- 3-7 key points, each ≤ 15 words in ${input.nativeLang}.`,
          `- Never quote the transcript verbatim. OUR OWN WORDS.`,
          `- No preamble. No markdown.`,
        ].join("\n"),
      },
      { role: "user", content: JSON.stringify({ lines }) },
    ];
  },
};
