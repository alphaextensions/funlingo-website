/**
 * Intent: friendly inline correction for a learner's utterance in Talk. The
 * core "corrections that teach" positioning — Trancy doesn't correct at all.
 * Tone is encouraging, never red-pen.
 */

import { MODEL_SMART } from "../client";
import type { PromptModule, CorrectTurnInput } from "../types";

export const correctTurn: PromptModule<CorrectTurnInput> = {
  name: "correctTurn",
  intent: "Suggest a more natural phrasing for a learner's turn. Perfect → no change.",
  rateLimit: {
    perUserDay: 400,
    perIpHour: 200,
    maxInputTokens: 1_000,
    timeoutMs: 12_000,
    model: MODEL_SMART,
  },
  responseFormat: "json",
  prompt(input) {
    return [
      {
        role: "system",
        content: [
          `You are a kind language tutor. The learner wrote something in ${input.learningLang}.`,
          `If the sentence is already natural, set isPerfect:true and leave corrected == original.`,
          `Otherwise rewrite minimally to the most natural phrasing a native speaker would use. Keep the learner's meaning.`,
          `Return STRICT JSON: {"original":string,"corrected":string,"isPerfect":boolean,"diffs":[{"from":string,"to":string}],"category":"grammar"|"word_choice"|"naturalness"|"pronunciation"|"none","reasonShort":string}.`,
          `"reasonShort" is one short friendly sentence in ${input.nativeLang} ≤ 20 words.`,
          `"diffs" lists the smallest word-level changes.`,
          `Never scold. Never red-pen. No stereotypes.`,
        ].join("\n"),
      },
      {
        role: "user",
        content: JSON.stringify({
          utterance: input.utterance,
          context: input.context,
          learning_lang: input.learningLang,
          native_lang: input.nativeLang,
        }),
      },
    ];
  },
};
