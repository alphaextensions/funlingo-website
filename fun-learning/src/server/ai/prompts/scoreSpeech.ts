/**
 * Intent: score a learner's spoken attempt at a reference sentence. Returns
 * per-word 0-100 scores + an overall + up to 3 short "worst sounds" tips.
 * Used by the Shadow mode in the study player (SPEC §6.5) and by Talk's
 * voice turns (SPEC §7.3).
 *
 * NOTE: audio is sent transiently to Groq's speech endpoint (via the
 * invocation helper's audio path) and immediately deleted. Nothing is
 * cached. Confidential<T> isn't needed because this is the user's OWN voice,
 * not third-party caption text — but the Confidential policy still applies
 * to anything else.
 */

import { MODEL_SMART } from "../client";
import type { PromptModule, ScoreSpeechInput } from "../types";

// Groq doesn't yet expose fine-grained ASR scoring — we approximate by having
// MODEL_SMART reason about a learner's self-reported transcript vs the
// reference. The audio handoff lives in the invoke-audio helper (future lane
// adds Whisper on Groq via `/audio/transcriptions`). For now this prompt is
// the structured-scoring half; the ASR half is a TODO wired through the
// public interface.
export const scoreSpeech: PromptModule<ScoreSpeechInput> = {
  name: "scoreSpeech",
  intent: "Per-word pronunciation score (0-100) + 1-3 improvement tips.",
  rateLimit: {
    // Shadow mode: ~30 attempts in a long session. 400 is heavy use.
    perUserDay: 400,
    perIpHour: 200,
    maxInputTokens: 1_200,
    timeoutMs: 15_000,
    model: MODEL_SMART,
  },
  responseFormat: "json",
  prompt(input) {
    return [
      {
        role: "system",
        content: [
          `You are a pronunciation coach for ${input.lang}.`,
          `Given a reference sentence and a user's spoken attempt (already transcribed by ASR), produce:`,
          `  - words: array of {word, score 0..100}`,
          `  - overall: 0..100 (weighted by word length)`,
          `  - tips: 1-3 short, encouraging corrections for the worst sounds. No shaming.`,
          `Return STRICT JSON: {"overall":number,"words":[{"word":string,"score":number}],"tips":[string]}.`,
          `No preamble. No markdown.`,
        ].join("\n"),
      },
      {
        role: "user",
        content: JSON.stringify({
          reference: input.referenceText,
          lang: input.lang,
          // The actual audio-vs-reference comparison happens upstream (ASR +
          // phoneme alignment). For the Groq-only path, we trust ASR output.
          asr_transcript_placeholder: "<<ASR transcript elsewhere>>",
        }),
      },
    ];
  },
};
