/**
 * Intent: generate 2 safe example sentences for a lemma at the learner's
 * level, used on Word detail (SPEC §9) and Review flashcard backs (SPEC §11).
 * The content filter requirement is explicit in SPEC §11: "generated
 * examples pass a content filter" — invokeJson applies the filter.
 */

import { MODEL_FAST } from "../client";
import type { ExamplesInput, PromptModule } from "../types";

export const examples: PromptModule<ExamplesInput> = {
  name: "examples",
  intent: "Two safe example sentences for a lemma at a given CEFR level.",
  rateLimit: {
    perUserDay: 1_000,
    perIpHour: 500,
    maxInputTokens: 200,
    timeoutMs: 10_000,
    model: MODEL_FAST,
  },
  responseFormat: "json",
  prompt(input) {
    return [
      {
        role: "system",
        content: [
          `Write exactly TWO example sentences using the lemma "${input.lemma}" in ${input.learningLang} at CEFR ${input.level}.`,
          `Each sentence must be:`,
          `- Natural, something a native speaker would actually say.`,
          `- Different in tense/register from the other.`,
          `- SAFE: no stereotypes, no linking groups to crime, no sexual content, no slurs, no violence.`,
          `- Short (≤ 15 words).`,
          `Return STRICT JSON: {"examples":[{"sentence":string,"translation":string},{"sentence":string,"translation":string}]}`,
          `Translations are in ${input.nativeLang}. No preamble, no markdown.`,
        ].join("\n"),
      },
      { role: "user", content: JSON.stringify({ lemma: input.lemma, level: input.level }) },
    ];
  },
};
