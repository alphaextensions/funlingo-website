import type { Course, Scene } from "./schema";

// Pure logic behind the scene takes. Quizzes are seeded by scene and word, so a scene
// shows the same options on every visit and in tests.

export type ChoiceItem = { prompt: string; answer: string; options: string[] };

export const SHADOW_MATCH_OK = 0.6;
const MAX_OPTIONS = 4;

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: T[], seed: string): T[] {
  const out = [...items];
  const rand = mulberry32(fnv1a(seed));
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** One question per scene word; distractors come from the same scene first, then the course. */
function buildChoiceItems(course: Course, scene: Scene, field: "gloss" | "term"): ChoiceItem[] {
  const value = (wordId: string) => course.words[wordId][field];
  const others = Object.keys(course.words).filter((w) => !scene.words.includes(w));
  return scene.words.map((wordId) => {
    const seed = `${scene.id}:${wordId}:${field}`;
    const answer = value(wordId);
    const pool = [
      ...seededShuffle(scene.words.filter((w) => w !== wordId), seed),
      ...seededShuffle(others, seed),
    ].map(value);
    const distractors = [...new Set(pool.filter((v) => v !== answer))].slice(0, MAX_OPTIONS - 1);
    return { prompt: course.words[wordId].term, answer, options: seededShuffle([answer, ...distractors], seed) };
  });
}

/** See the target term, pick its meaning. */
export const buildGuessItems = (course: Course, scene: Scene) => buildChoiceItems(course, scene, "gloss");

/** Hear the target term, pick how it is written. */
export const buildListenItems = (course: Course, scene: Scene) => buildChoiceItems(course, scene, "term");

/** Scene score: the rounded mean of scored takes, or full marks when nothing was scored. */
export function scoreTakes(results: (number | null)[]): number {
  const scored = results.filter((r): r is number => r !== null);
  if (!scored.length) return 100;
  return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
}

export function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/** Share of the expected words that appear in what the recognizer heard (0..1). */
export function matchRatio(expected: string, heard: string): number {
  const want = normalizeWords(expected);
  if (!want.length) return 0;
  const got = new Set(normalizeWords(heard));
  return want.filter((w) => got.has(w)).length / want.length;
}
