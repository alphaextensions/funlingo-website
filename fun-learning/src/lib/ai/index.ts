/**
 * Public AI module interface — THIS IS THE API CONTRACT other feature agents
 * (Watch, Review, Talk, Content) import from. Nothing in `src/lib/ai/` should
 * leak Groq/OpenAI SDK types, prompt internals, or implementation details.
 *
 * Each function:
 *   - takes a typed input (confidential fields marked via `Confidential<T>`),
 *   - enforces per-function cost caps BEFORE calling Groq,
 *   - applies the safety filter to the OUTPUT (opt-out impossible),
 *   - throws `RateLimitError` (status 429) or `SafetyFilterError` (status 422)
 *     with structured fields callers can turn into friendly copy.
 *
 * See AGENT-PLAYBOOK "Playbook learnings" (AI module) for the pinned
 * signatures.
 */

import { invokeJson, invokeStream } from "@/server/ai/invoke";
import { translateLines as translateLinesPrompt, parseTranslateChunk } from "@/server/ai/prompts/translateLines";
import { wordCard as wordCardPrompt } from "@/server/ai/prompts/wordCard";
import { scoreSpeech as scoreSpeechPrompt } from "@/server/ai/prompts/scoreSpeech";
import { talkTurn as talkTurnPrompt, parseTalkTurnChunk } from "@/server/ai/prompts/talkTurn";
import { correctTurn as correctTurnPrompt } from "@/server/ai/prompts/correctTurn";
import { culture as culturePrompt } from "@/server/ai/prompts/culture";
import { sentenceAnalysis as sentenceAnalysisPrompt } from "@/server/ai/prompts/sentenceAnalysis";
import { summarize as summarizePrompt } from "@/server/ai/prompts/summarize";
import { examples as examplesPrompt } from "@/server/ai/prompts/examples";
import { unwrapConfidential } from "@/server/types/confidential";
import type {
  CorrectTurnInput,
  CorrectTurnOutput,
  CultureInput,
  CultureNote,
  ExamplesInput,
  ExamplesOutput,
  ScoreSpeechInput,
  SentenceAnalysisInput,
  SentenceAnalysis,
  SpeechScore,
  SummarizeInput,
  SummaryOutput,
  TalkTurnInput,
  TalkTurnReply,
  TranslateLinesInput,
  TranslatedLine,
  WordCard,
  WordCardInput,
} from "@/server/ai/types";

export type {
  CorrectTurnInput,
  CorrectTurnOutput,
  CultureInput,
  CultureNote,
  ExamplesInput,
  ExamplesOutput,
  ScoreSpeechInput,
  SentenceAnalysisInput,
  SentenceAnalysis,
  SpeechScore,
  SummarizeInput,
  SummaryOutput,
  TalkTurnInput,
  TalkTurnReply,
  TranslateLinesInput,
  TranslatedLine,
  WordCard,
  WordCardInput,
};
export { RateLimitError, SafetyFilterError } from "@/server/ai/types";

// ---------------------------------------------------------------------------
// translateLines  (STREAMING)
// ---------------------------------------------------------------------------
export function translateLines(input: TranslateLinesInput): AsyncIterable<TranslatedLine> {
  const raw = unwrapConfidential(input.lines);
  const inputChars = raw.reduce((n, l) => n + l.length, 0);
  return invokeStream({
    module: translateLinesPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars,
    parseChunk: parseTranslateChunk,
  });
}

// ---------------------------------------------------------------------------
// wordCard  (JSON)
// ---------------------------------------------------------------------------
export async function wordCard(input: WordCardInput): Promise<WordCard> {
  const sent = unwrapConfidential(input.sentence);
  return invokeJson<WordCardInput, WordCard>({
    module: wordCardPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: input.wordOrPhrase.length + sent.length,
    parse: (raw) => JSON.parse(raw),
  });
}

// ---------------------------------------------------------------------------
// scoreSpeech  (JSON)
// ---------------------------------------------------------------------------
export async function scoreSpeech(input: ScoreSpeechInput): Promise<SpeechScore> {
  return invokeJson<ScoreSpeechInput, SpeechScore>({
    module: scoreSpeechPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: input.referenceText.length + 500, // audio adds "roughly 500 chars worth"
    parse: (raw) => JSON.parse(raw),
  });
}

// ---------------------------------------------------------------------------
// talkTurn  (STREAMING — one object emitted at completion)
// ---------------------------------------------------------------------------
export function talkTurn(input: TalkTurnInput): AsyncIterable<TalkTurnReply> {
  const inputChars =
    input.lessonScene.length +
    input.history.reduce((n, h) => n + h.text.length, 0);
  return invokeStream({
    module: talkTurnPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars,
    parseChunk: parseTalkTurnChunk,
  });
}

// ---------------------------------------------------------------------------
// correctTurn  (JSON)
// ---------------------------------------------------------------------------
export async function correctTurn(input: CorrectTurnInput): Promise<CorrectTurnOutput> {
  return invokeJson<CorrectTurnInput, CorrectTurnOutput>({
    module: correctTurnPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: input.utterance.length + input.context.length,
    parse: (raw) => JSON.parse(raw),
  });
}

// ---------------------------------------------------------------------------
// culture  (JSON)
// ---------------------------------------------------------------------------
export async function culture(input: CultureInput): Promise<CultureNote[]> {
  const lines = unwrapConfidential(input.lines);
  return invokeJson<CultureInput, CultureNote[]>({
    module: culturePrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: lines.reduce((n, l) => n + l.text.length, 0),
    parse: (raw) => {
      const obj = JSON.parse(raw) as { notes: CultureNote[] };
      return obj.notes ?? [];
    },
  });
}

// ---------------------------------------------------------------------------
// sentenceAnalysis  (JSON)
// ---------------------------------------------------------------------------
export async function sentenceAnalysis(
  input: SentenceAnalysisInput,
): Promise<SentenceAnalysis> {
  const sent = unwrapConfidential(input.sentence);
  return invokeJson<SentenceAnalysisInput, SentenceAnalysis>({
    module: sentenceAnalysisPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: sent.length,
    parse: (raw) => JSON.parse(raw),
  });
}

// ---------------------------------------------------------------------------
// summarize  (JSON)
// ---------------------------------------------------------------------------
export async function summarize(input: SummarizeInput): Promise<SummaryOutput> {
  const lines = unwrapConfidential(input.lines);
  return invokeJson<SummarizeInput, SummaryOutput>({
    module: summarizePrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: lines.reduce((n, l) => n + l.text.length, 0),
    parse: (raw) => JSON.parse(raw),
  });
}

// ---------------------------------------------------------------------------
// examples  (JSON)
// ---------------------------------------------------------------------------
export async function examples(input: ExamplesInput): Promise<ExamplesOutput> {
  return invokeJson<ExamplesInput, ExamplesOutput>({
    module: examplesPrompt,
    input,
    userId: input.userId,
    ipHash: input.ipHash,
    inputChars: input.lemma.length,
    parse: (raw) => JSON.parse(raw),
  });
}

// ---------- Content-lane helpers (safe placeholders) ----------
//
// These are "nice-to-have" Home-page accents the Content agent built against.
// The AI module v1 doesn't ship them yet because they'd fire on every Home
// render per user — easy to blow the cost budget with naive caching. Shipped
// as safe placeholders so the Home page renders; a future agent wires them
// to `culture()` + `wordCard()` with proper daily caching keyed by (userId, YYYY-MM-DD).

export interface DailyPickInput {
  userId: string;
  lang: string;
}

export interface DailyWord {
  lemma: string;
  gloss?: string;
  translation?: string;
  example?: string;
}

export interface DailyCultureNote {
  kind: string; // "idiom" | "reference" | "register" | "sound" | …
  text: string;
}

export async function wordOfTheDay(_input: DailyPickInput): Promise<DailyWord | null> {
  // Placeholder: no word surfaced until a real agent wires caching.
  return null;
}

export async function cultureNoteOfTheDay(_input: DailyPickInput): Promise<DailyCultureNote | null> {
  // Placeholder: no note surfaced until a real agent wires caching.
  return null;
}
