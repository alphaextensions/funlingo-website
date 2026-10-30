/**
 * Intent: translate a batch of lines (video captions, book excerpts, etc.)
 * from `sourceLang` → `targetLang` in a natural, idiom-aware way. Streams
 * one JSON object per line so the player can start rendering the Natural
 * subtitle track while the rest is still inflight.
 *
 * Correctness bar: a native speaker would say it. The idiom regression suite
 * in `tests/idioms/` gates deploys at ≥95% per language pair.
 *
 * This is the single most critical AI function — competitors (Trancy, LR)
 * default to literal Google Translate and get idioms wrong, which is where
 * our "Natural translations" positioning lives.
 */

import { unwrapConfidential } from "@/server/types/confidential";
import { MODEL_FAST } from "../client";
import type { PromptModule, TranslateLinesInput } from "../types";

export const translateLines: PromptModule<TranslateLinesInput> = {
  name: "translateLines",
  intent:
    "Idiom-aware line-by-line translation. Streams NDJSON {index,translation,idiomatic,idiomNote}.",
  rateLimit: {
    // Watching an hour-long video can hit ~500 lines; a serial of ~10 episodes
    // in a day pushes ~5000. 6000 is generous for a committed learner.
    perUserDay: 6_000,
    // IP-wide — enough for a shared household Wi-Fi (~3-4 users).
    perIpHour: 2_000,
    // Enough for ~15K chars of input (large transcript batch).
    maxInputTokens: 4_000,
    timeoutMs: 25_000,
    model: MODEL_FAST,
  },
  responseFormat: "json",
  prompt(input) {
    const lines = unwrapConfidential(input.lines);
    const style = input.style ?? "natural";
    const indexed = lines.map((text, i) => ({ i, text }));

    const styleRule =
      style === "literal"
        ? "Translate word-for-word, preserving source word order where possible. Do NOT substitute idioms. Flag idioms with idiomatic:true + idiomNote."
        : "Translate the way a native speaker of the target language would say it. Match register (formal/casual/slang) to the source. For idioms, phrasal verbs and set phrases, use the natural equivalent in the target language — never a literal word-for-word gloss. Set idiomatic:true + a short plain idiomNote for those lines.";

    return [
      {
        role: "system",
        content: [
          `You are a careful ${input.sourceLang} → ${input.targetLang} translator for a language-learning app.`,
          styleRule,
          "Return ONE JSON object per input line, EACH on its own newline (NDJSON).",
          `Each object: {"index":<number>,"translation":<string>,"idiomatic":<boolean>,"idiomNote":<string|null>}.`,
          "No preamble. No wrapping array. No code fences. Exactly one JSON object per line, in input order.",
          "Translations must flow — reorder clauses when the target language demands it.",
          `Known idiom examples (English → natural equivalents):`,
          `  "Same old, same old" → "Lo de siempre" (es), "いつも通り" (ja), "वही पुरानी बातें" (hi)`,
          `  "How have you been?" → "¿Qué tal has estado?" (es), "元気にしてた？" (ja)`,
          `  "I've been better" → "He estado mejor" / "Podría estar mejor" (es), "もっと元気な時もあったけどね" (ja)`,
          `  "Hey, how's it going?" → "¿Qué tal?" (es), "やあ、調子どう？" (ja)`,
          `  "break the ice" → "romper el hielo" (es), "打ち解ける" (ja)`,
          `  "carry out" → "llevar a cabo" (es), "実行する" (ja)`,
        ].join("\n"),
      },
      {
        role: "user",
        content: JSON.stringify({ lines: indexed }),
      },
    ];
  },
};

/** Parse NDJSON-ish streamed deltas into TranslatedLine chunks. Each returns
 *  the *remaining* unparsed suffix so the stream helper can carry over
 *  partial lines across the next chunk. */
export function parseTranslateChunk(buffered: string) {
  const out: Array<{ index: number; translation: string; idiomatic: boolean; idiomNote: string | null }> = [];
  const lines = buffered.split("\n");
  const remaining = lines.pop() ?? "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const obj = JSON.parse(trimmed);
      if (typeof obj.index === "number" && typeof obj.translation === "string") {
        out.push({
          index: obj.index,
          translation: obj.translation,
          idiomatic: !!obj.idiomatic,
          idiomNote: typeof obj.idiomNote === "string" ? obj.idiomNote : null,
        });
      }
    } catch {
      // Partial token — the next delta will complete it.
    }
  }
  return { emit: out, remaining };
}
