/**
 * Shared types for the AI module.
 *
 * The schemas here are the authoritative shape of what each prompt file
 * returns, and what the public `src/lib/ai/index.ts` interface exports.
 * Feature agents on the Watch, Review, Talk, and Content lanes depend on
 * these types.
 */

import type { GroqModel } from "./client";
import type { Confidential } from "@/server/types/confidential";

// ---------- Rate limiting / cost caps ----------

/**
 * Per-function cost/rate configuration. Enforced BEFORE the model call by
 * `src/server/ai/limits.ts`. See AGENT-PLAYBOOK "Engineering non-negotiables"
 * rule 2.
 */
export interface RateLimit {
  /** Max calls per user per UTC day. 0 disables user-scoped limiting. */
  perUserDay: number;
  /** Max calls per IP per UTC hour. 0 disables IP-scoped limiting. */
  perIpHour: number;
  /** Rough cap on input text length (characters, not tokens).
   *  limits.ts rejects before the call rather than letting a 500k-line paste
   *  cost us. */
  maxInputTokens: number;
  /** Per-call timeout — AbortController aborts the Groq call if exceeded. */
  timeoutMs: number;
  /** Model to use. MODEL_SMART for quality, MODEL_FAST for bulk. */
  model: GroqModel;
}

// ---------- Function I/O ----------

export type LangCode = string; // ISO-639-1 e.g. "en", "ja", "hi", "es"

export interface TranslatedLine {
  index: number;
  translation: string;
  idiomatic: boolean;
  /** When `idiomatic` is true, a short plain-language note explaining the
   *  idiom. Null otherwise. Shown as a tiny tag on the Natural subtitle. */
  idiomNote: string | null;
}

export interface TranslateLinesInput {
  lines: Confidential<string[]>;
  sourceLang: LangCode;
  targetLang: LangCode;
  /** "natural" (default, idiom-aware) or "literal" (word-for-word analysis). */
  style?: "natural" | "literal";
  /** For logging + wallet accounting. Required at the public interface. */
  userId: string;
  /** Optional IP for rate-limit bucketing. */
  ipHash?: string;
}

export interface WordCardSense {
  pos: string;
  nativeGloss: string;
  learningDefinition: string;
  example: string;
  exampleTranslation: string;
}

export interface WordCard {
  lemma: string;
  pos: string;
  cefr: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | null;
  shortMeaning: string;
  senses: WordCardSense[];
  isPhrase: boolean;
  cultureNote: string | null;
}

export interface WordCardInput {
  wordOrPhrase: string;
  /** The line (caption fragment) the word appeared in — confidential. */
  sentence: Confidential<string>;
  sourceLang: LangCode;
  nativeLang: LangCode;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  userId: string;
  ipHash?: string;
}

export interface SpeechScoreWord {
  word: string;
  /** 0..100 */
  score: number;
}
export interface SpeechScore {
  overall: number; // 0..100
  words: SpeechScoreWord[];
  tips: string[]; // 1-3 short tips
}
export interface ScoreSpeechInput {
  /** Base64-encoded audio for Groq (not persisted). */
  audioBase64: string;
  /** The reference text the speaker was asked to say. */
  referenceText: string;
  lang: LangCode;
  userId: string;
  ipHash?: string;
}

export interface TalkTurnInput {
  lessonScene: string;
  aiRole: string;
  userRole: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  /** Only history and reference-text go in; never caption text. */
  history: { role: "ai" | "user"; text: string }[];
  learningLang: LangCode;
  nativeLang: LangCode;
  userId: string;
  ipHash?: string;
}
export interface TalkTurnReply {
  text: string;
  translation: string;
  /** Tasks the user already satisfied in this turn (checklist tick). */
  tasksCompleted: string[];
}

export interface CorrectTurnInput {
  utterance: string;
  context: string; // one-line conversation summary
  learningLang: LangCode;
  nativeLang: LangCode;
  userId: string;
  ipHash?: string;
}
export interface CorrectTurnOutput {
  original: string;
  corrected: string;
  /** No change detected — frontend can hide the correction card. */
  isPerfect: boolean;
  diffs: { from: string; to: string }[];
  category: "grammar" | "word_choice" | "naturalness" | "pronunciation" | "none";
  reasonShort: string;
}

export interface CultureNote {
  anchor: { timestampSec?: number; lineIndex?: number } | null;
  text: string;
  kind: "idiom" | "reference" | "humour" | "register" | "custom";
}
export interface CultureInput {
  sourceMeta: { kind: "youtube" | "pack" | "podcast" | "book"; title: string; lang: LangCode };
  lines: Confidential<{ index: number; text: string; timestampSec?: number }[]>;
  nativeLang: LangCode;
  userId: string;
  ipHash?: string;
}

export interface SentenceAnalysis {
  translation: string;
  grammarNote: string;
  words: {
    word: string;
    pos: "noun" | "verb" | "adj" | "adv" | "pron" | "prep" | "conj" | "det" | "aux" | "num" | "intj" | "part" | "other";
  }[];
  idioms: { phrase: string; meaning: string }[];
  alternatives: string[];
}
export interface SentenceAnalysisInput {
  sentence: Confidential<string>;
  learningLang: LangCode;
  nativeLang: LangCode;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  userId: string;
  ipHash?: string;
}

export interface SummaryOutput {
  summary: string;
  keyPoints: { timestampSec?: number; text: string }[];
}
export interface SummarizeInput {
  lines: Confidential<{ text: string; timestampSec?: number }[]>;
  sourceLang: LangCode;
  nativeLang: LangCode;
  userId: string;
  ipHash?: string;
}

export interface ExamplesInput {
  lemma: string;
  learningLang: LangCode;
  nativeLang: LangCode;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  userId: string;
  ipHash?: string;
}
export interface ExamplesOutput {
  examples: { sentence: string; translation: string }[];
}

// ---------- Internal: prompt file shape ----------

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export interface PromptModule<TInput> {
  readonly name: string;
  readonly intent: string;
  readonly rateLimit: RateLimit;
  prompt(input: TInput): ChatMessage[];
  /** Response format hint — "json" asks Groq for strict JSON. "text" is free-form. */
  readonly responseFormat?: "json" | "text";
}

// ---------- Error types ----------

export class RateLimitError extends Error {
  readonly status = 429;
  constructor(
    public readonly scope: string,
    public readonly kind: "userDay" | "ipHour" | "monthlyCeiling" | "walletEmpty" | "inputTooLarge",
    public readonly retryAfterSec: number,
    message?: string,
  ) {
    super(message ?? `AI rate limit: ${scope}:${kind}`);
    this.name = "RateLimitError";
  }
}

export class SafetyFilterError extends Error {
  readonly status = 422;
  constructor(public readonly violated: string[]) {
    super(`AI output blocked by safety filter: ${violated.join(", ")}`);
    this.name = "SafetyFilterError";
  }
}
