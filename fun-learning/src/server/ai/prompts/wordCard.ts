/**
 * Intent: produce the "inline card" shown when a learner taps a word or
 * phrase in the player (SPEC §6.3). Returns the lemma, POS, CEFR band, a
 * short native-language meaning, 1-3 senses with examples, and a short
 * culture note when relevant. Uses MODEL_SMART — this is a quality call.
 */

import { unwrapConfidential } from "@/server/types/confidential";
import { MODEL_SMART } from "../client";
import type { PromptModule, WordCardInput } from "../types";

export const wordCard: PromptModule<WordCardInput> = {
  name: "wordCard",
  intent:
    "Lemma + POS + CEFR + senses + examples for one word or phrase, grounded in the sentence it was tapped from.",
  rateLimit: {
    // ~200 taps/day is a lot of saving; 500 is a hard upper bound.
    perUserDay: 500,
    perIpHour: 300,
    maxInputTokens: 500,
    timeoutMs: 12_000,
    model: MODEL_SMART,
  },
  responseFormat: "json",
  prompt(input) {
    const sentence = unwrapConfidential(input.sentence);
    return [
      {
        role: "system",
        content: [
          `You explain a ${input.sourceLang} word or phrase to a ${input.nativeLang}-speaking learner at CEFR ${input.level}.`,
          `Return STRICT JSON with this shape and no extra fields:`,
          `{`,
          `  "lemma": string,            // base/dictionary form`,
          `  "pos": string,              // "verb" | "phrasal verb" | "noun" | "adjective" | "idiom" | "collocation" | …`,
          `  "cefr": "A1"|"A2"|"B1"|"B2"|"C1"|"C2"|null,`,
          `  "shortMeaning": string,     // 3-10 words IN ${input.nativeLang}`,
          `  "senses": [`,
          `    {`,
          `      "pos": string,`,
          `      "nativeGloss": string,  // in ${input.nativeLang}`,
          `      "learningDefinition": string, // in ${input.sourceLang}`,
          `      "example": string,      // in ${input.sourceLang} — NOT a quote of the user's line`,
          `      "exampleTranslation": string // in ${input.nativeLang}`,
          `    }`,
          `  ],`,
          `  "isPhrase": boolean,        // true for phrasal verbs/idioms/collocations`,
          `  "cultureNote": string|null  // 1 sentence if the phrase is region-coded, slang, humour, or a cultural reference; else null`,
          `}`,
          `Rules:`,
          `- Use the LEMMA, not the inflected form (e.g. "carried out" → lemma "carry out").`,
          `- 1-3 senses. The first sense MUST fit the context sentence.`,
          `- No stereotypes, no sexual content, no group+crime generalisations. Examples must be safe for all audiences.`,
          `- Examples: new sentences you write, NOT verbatim movie/TV dialogue.`,
        ].join("\n"),
      },
      {
        role: "user",
        content: JSON.stringify({
          word_or_phrase: input.wordOrPhrase,
          sentence_context: sentence,
          source_lang: input.sourceLang,
          native_lang: input.nativeLang,
          level: input.level,
        }),
      },
    ];
  },
};
