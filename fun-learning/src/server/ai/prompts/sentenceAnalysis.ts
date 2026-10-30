/**
 * Intent: deep "AI sentence analysis" sparkle button (SPEC §6.5): natural
 * translation + grammar note in the native language + per-word POS tags +
 * idiom flags + "say it another way" alternatives at the learner's level.
 * Bulk/cheap — fired from a sparkle button on any line so we want MODEL_FAST.
 */

import { unwrapConfidential } from "@/server/types/confidential";
import { MODEL_FAST } from "../client";
import type { PromptModule, SentenceAnalysisInput } from "../types";

export const sentenceAnalysis: PromptModule<SentenceAnalysisInput> = {
  name: "sentenceAnalysis",
  intent: "Natural translation + grammar note + word-type colouring + idioms + 2 alt phrasings.",
  rateLimit: {
    perUserDay: 800,
    perIpHour: 400,
    maxInputTokens: 500,
    timeoutMs: 12_000,
    model: MODEL_FAST,
  },
  responseFormat: "json",
  prompt(input) {
    const sentence = unwrapConfidential(input.sentence);
    return [
      {
        role: "system",
        content: [
          `Analyse ONE sentence in ${input.learningLang} for a ${input.nativeLang}-speaking learner at CEFR ${input.level}.`,
          `Return STRICT JSON:`,
          `{`,
          `  "translation": string, // natural, idiom-aware, in ${input.nativeLang}`,
          `  "grammarNote": string, // 1-3 short sentences explaining the structure, in ${input.nativeLang}`,
          `  "words": [{"word":string,"pos":"noun"|"verb"|"adj"|"adv"|"pron"|"prep"|"conj"|"det"|"aux"|"num"|"intj"|"part"|"other"}],`,
          `  "idioms": [{"phrase":string,"meaning":string}], // in ${input.nativeLang}; empty if none`,
          `  "alternatives": [string, string] // two "say it another way" sentences at the same ${input.level} level`,
          `}`,
          `No preamble. No markdown.`,
        ].join("\n"),
      },
      { role: "user", content: JSON.stringify({ sentence }) },
    ];
  },
};
