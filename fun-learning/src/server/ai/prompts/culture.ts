/**
 * Intent: produce Funlingo Culture Notes for a source (SPEC §6.4 "Culture"
 * tab + Home "Culture note of the day"). Notes anchor to specific lines and
 * explain idioms, references, humour, register.
 *
 * Caption text is Confidential<T> and is never stored server-side. Notes
 * themselves (which we WROTE, not quoted) + their anchors (timestamps + line
 * indices only, no caption text) are cacheable per LEGAL.md.
 */

import { unwrapConfidential } from "@/server/types/confidential";
import { MODEL_SMART } from "../client";
import type { PromptModule, CultureInput } from "../types";

export const culture: PromptModule<CultureInput> = {
  name: "culture",
  intent: "Culture notes keyed to lines of a source — our own writing, never a quote.",
  rateLimit: {
    perUserDay: 200,
    perIpHour: 100,
    maxInputTokens: 4_000,
    timeoutMs: 25_000,
    model: MODEL_SMART,
  },
  responseFormat: "json",
  prompt(input) {
    const lines = unwrapConfidential(input.lines);
    return [
      {
        role: "system",
        content: [
          `You write short Culture Notes for a language-learning app.`,
          `A culture note explains WHY a line is funny, rude, regional, slang, or references something a learner wouldn't know.`,
          `You're writing to a ${input.nativeLang}-speaking learner.`,
          `Return STRICT JSON: {"notes":[{"anchor":{"lineIndex":number,"timestampSec":number|null},"text":string,"kind":"idiom"|"reference"|"humour"|"register"|"custom"}]}.`,
          `Rules:`,
          `- 0-6 notes total; only lines that genuinely need one.`,
          `- Note "text" is 1-2 sentences in ${input.nativeLang}, OUR OWN WORDS, never quoting the source line.`,
          `- Never persist or re-emit the source line's text. Reference it by its index.`,
          `- No stereotypes. No linking groups to crime.`,
        ].join("\n"),
      },
      {
        role: "user",
        content: JSON.stringify({
          source_kind: input.sourceMeta.kind,
          source_title: input.sourceMeta.title,
          source_lang: input.sourceMeta.lang,
          native_lang: input.nativeLang,
          lines,
        }),
      },
    ];
  },
};
