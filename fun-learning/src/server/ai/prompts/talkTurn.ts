/**
 * Intent: produce the AI partner's next reply in a Talk conversation. Streams
 * tokens so the UI can type-out effect. Uses MODEL_SMART — quality matters
 * for the "corrections that teach" positioning.
 */

import { MODEL_SMART } from "../client";
import type { PromptModule, TalkTurnInput } from "../types";

export const talkTurn: PromptModule<TalkTurnInput> = {
  name: "talkTurn",
  intent: "Streams the AI partner's next conversational reply in a Talk lesson.",
  rateLimit: {
    // Talk is heavy — ~60 turns in a long session. 300 is 5+ sessions/day.
    perUserDay: 300,
    perIpHour: 150,
    maxInputTokens: 2_000,
    timeoutMs: 25_000,
    model: MODEL_SMART,
  },
  responseFormat: "json",
  prompt(input) {
    const difficultyRule = {
      beginner: "Short sentences, common vocabulary, slow natural speech. Avoid idioms.",
      intermediate: "Full sentences, some everyday idioms, moderate pace.",
      advanced: "Native-register speech, idioms, slang where appropriate.",
    }[input.difficulty];

    const historyText = input.history
      .map((h) => `${h.role.toUpperCase()}: ${h.text}`)
      .join("\n");

    return [
      {
        role: "system",
        content: [
          `You are role-playing in a language-learning conversation in ${input.learningLang}.`,
          `Scene: ${input.lessonScene}`,
          `Your role: ${input.aiRole}. The learner's role: ${input.userRole}.`,
          `Difficulty: ${input.difficulty} — ${difficultyRule}`,
          `Return STRICT JSON on ONE line (no code fences): {"text":<reply in ${input.learningLang}>,"translation":<reply in ${input.nativeLang}>,"tasksCompleted":[...task strings the learner's PREVIOUS turn satisfied, or []]}.`,
          `Stay in character. One reply per turn. Keep it to 1-3 sentences.`,
          `No stereotypes, no slurs, no sexual content. Culturally sensitive.`,
        ].join("\n"),
      },
      {
        role: "user",
        content: `Conversation so far:\n${historyText}\n\nYour next AI line:`,
      },
    ];
  },
};

/** Parse the streamed JSON: the whole reply is a single JSON object, so we
 *  only emit once we see a close-brace (or at stream end). */
export function parseTalkTurnChunk(buffered: string) {
  const trimmed = buffered.trim();
  if (!trimmed.endsWith("}")) return { emit: [], remaining: buffered };
  try {
    const obj = JSON.parse(trimmed);
    if (typeof obj.text === "string" && typeof obj.translation === "string") {
      return {
        emit: [
          {
            text: obj.text,
            translation: obj.translation,
            tasksCompleted: Array.isArray(obj.tasksCompleted)
              ? obj.tasksCompleted.filter((s: unknown) => typeof s === "string")
              : [],
          },
        ],
        remaining: "",
      };
    }
  } catch {
    /* fall through */
  }
  return { emit: [], remaining: buffered };
}
