import { type Card, createEmptyCard, fsrs, type Grade } from "ts-fsrs";
import { type PathState, type ReviewLog, sceneKey } from "./progress";
import type { Course } from "./schema";

export type { ReviewLog } from "./progress";

// The review deck: every word from a finished scene, scheduled with FSRS. Only the
// review logs are stored; a card is always replayed from its logs (fuzz off, so the
// replay is deterministic), which makes merging two devices a plain union of logs.

export const KNOWN_STABILITY_DAYS = 21;
export const SESSION_MAX = 20;
export const NEW_PER_SESSION = 10;

const scheduler = fsrs({ enable_fuzz: false });

export const reviewKey = (courseId: string, wordId: string) => `${courseId}/${wordId}`;

export function deckWordIds(course: Course, state: PathState): string[] {
  const ids = new Set<string>();
  for (const season of course.seasons) {
    for (const episode of season.episodes) {
      for (const scene of episode.scenes) {
        if (state.scenes[sceneKey(course.id, scene.id)]?.status !== "done") continue;
        for (const w of scene.words) if (Object.hasOwn(course.words, w)) ids.add(w);
      }
    }
  }
  return [...ids];
}

const byTime = (a: ReviewLog, b: ReviewLog) => (a.at < b.at ? -1 : a.at > b.at ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export function cardFromLogs(logs: ReviewLog[]): Card | null {
  if (!logs.length) return null;
  const sorted = [...logs].sort(byTime);
  let card = createEmptyCard(new Date(sorted[0].at));
  for (const l of sorted) card = scheduler.next(card, new Date(l.at), l.rating as Grade).card;
  return card;
}

/** When each rating would schedule the card next, for the labels under the buttons. */
export function previewIntervals(logs: ReviewLog[], now: Date): Record<1 | 2 | 3 | 4, Date> {
  const card = cardFromLogs(logs) ?? createEmptyCard(now);
  const due = (g: 1 | 2 | 3 | 4) => scheduler.next(card, now, g as Grade).card.due;
  return { 1: due(1), 2: due(2), 3: due(3), 4: due(4) };
}

export type DeckCard = { wordId: string; card: Card | null; due: Date };

function deck(course: Course, state: PathState, now: Date): DeckCard[] {
  return deckWordIds(course, state).map((wordId) => {
    const card = cardFromLogs(state.reviews[reviewKey(course.id, wordId)] ?? []);
    return { wordId, card, due: card ? card.due : now };
  });
}

/** Due reviews first (oldest first), then a few new words. */
export function buildSession(course: Course, state: PathState, now: Date): DeckCard[] {
  const cards = deck(course, state, now);
  const due = cards.filter((c) => c.card && c.due <= now).sort((a, b) => a.due.getTime() - b.due.getTime());
  const fresh = cards.filter((c) => !c.card).slice(0, NEW_PER_SESSION);
  return [...due, ...fresh].slice(0, SESSION_MAX);
}

export function deckStats(course: Course, state: PathState, now: Date) {
  const cards = deck(course, state, now);
  const reviewed = cards.filter((c) => c.card);
  const newCount = cards.length - reviewed.length;
  const future = reviewed.filter((c) => c.due > now).map((c) => c.due.getTime());
  return {
    total: cards.length,
    due: reviewed.length - future.length + newCount,
    newCount,
    known: reviewed.filter((c) => c.card!.stability >= KNOWN_STABILITY_DAYS).length,
    nextDue: future.length ? new Date(Math.min(...future)) : null,
  };
}
