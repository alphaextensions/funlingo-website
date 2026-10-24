import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { emptyState, type PathState, sceneKey } from "./progress";
import {
  buildSession,
  cardFromLogs,
  deckStats,
  deckWordIds,
  KNOWN_STABILITY_DAYS,
  NEW_PER_SESSION,
  previewIntervals,
  type ReviewLog,
  SESSION_MAX,
  untilLabel,
} from "./review";
import type { Course } from "./schema";
import { validateCourse } from "./validate";

function course(): Course {
  const r = validateCourse(JSON.parse(readFileSync(join(__dirname, "__fixtures__", "sample-course.json"), "utf8")));
  if (!r.ok) throw new Error(r.errors.join("\n"));
  return r.course;
}

const C = course();
const [S0, S1] = C.seasons[0].episodes[0].scenes;
const T0 = new Date("2026-10-01T09:00:00Z");
const DAY = 86_400_000;

const done = { status: "done" as const, bestScore: 80, attempts: 1, firstDoneAt: T0.toISOString() };
const withScenes = (...ids: string[]): PathState => ({
  ...emptyState(),
  scenes: Object.fromEntries(ids.map((id) => [sceneKey(C.id, id), done])),
});
const log = (rating: ReviewLog["rating"], at: Date, id = crypto.randomUUID()): ReviewLog => ({ id, rating, at: at.toISOString() });
const withReviews = (state: PathState, reviews: Record<string, ReviewLog[]>): PathState => ({
  ...state,
  reviews: Object.fromEntries(Object.entries(reviews).map(([w, logs]) => [`${C.id}/${w}`, logs])),
});

describe("deckWordIds", () => {
  it("holds the words of finished scenes, in course order", () => {
    expect(deckWordIds(C, withScenes(S0.id))).toEqual(S0.words);
    expect(deckWordIds(C, withScenes(S1.id, S0.id))).toEqual([...S0.words, ...S1.words]);
  });

  it("is empty before any scene is finished, and ignores scenes no longer in the course", () => {
    expect(deckWordIds(C, emptyState())).toEqual([]);
    expect(deckWordIds(C, withScenes("removed-scene"))).toEqual([]);
  });
});

describe("cardFromLogs", () => {
  it("has no card before the first review", () => {
    expect(cardFromLogs([])).toBeNull();
  });

  it("gives the same card whatever order the logs arrive in", () => {
    const logs = [log(3, T0), log(1, new Date(T0.getTime() + DAY)), log(3, new Date(T0.getTime() + 2 * DAY))];
    expect(cardFromLogs([...logs].reverse())).toEqual(cardFromLogs(logs));
  });

  it("schedules 'Got it' later than 'Forgot'", () => {
    expect(cardFromLogs([log(3, T0)])!.due.getTime()).toBeGreaterThan(cardFromLogs([log(1, T0)])!.due.getTime());
  });
});

describe("previewIntervals", () => {
  it("orders the four ratings from soonest to latest", () => {
    const p = previewIntervals([], T0);
    expect(p[1].getTime()).toBeLessThanOrEqual(p[2].getTime());
    expect(p[2].getTime()).toBeLessThanOrEqual(p[3].getTime());
    expect(p[3].getTime()).toBeLessThan(p[4].getTime());
  });
});

describe("sessions and stats", () => {
  const state = withScenes(S0.id, S1.id);
  const [w0, w1, w2] = S0.words;

  it("puts due reviews first, oldest first, then new words", () => {
    const s = withReviews(state, {
      [w1]: [log(3, new Date(T0.getTime() - 20 * DAY))],
      [w2]: [log(1, new Date(T0.getTime() - 30 * DAY))],
    });
    const ids = buildSession(C, s, T0).map((c) => c.wordId);
    expect(ids.slice(0, 2)).toEqual([w2, w1]);
    expect(ids).toContain(w0);
    expect(ids.indexOf(w0)).toBeGreaterThan(1);
  });

  it("leaves out words that are not due yet", () => {
    const s = withReviews(state, { [w0]: [log(4, T0)] });
    expect(buildSession(C, s, new Date(T0.getTime() + 60_000)).map((c) => c.wordId)).not.toContain(w0);
  });

  it("caps the session and the new words in it", () => {
    const big = structuredClone(C);
    big.words = Object.fromEntries(Array.from({ length: 40 }, (_, i) => [`w${i}`, { term: `t${i}`, gloss: `g${i}` }]));
    big.seasons[0].episodes[0].scenes[0].words = Object.keys(big.words);
    const s: PathState = { ...emptyState(), scenes: { [sceneKey(big.id, S0.id)]: done } };
    const session = buildSession(big, s, T0);
    expect(session.length).toBeLessThanOrEqual(SESSION_MAX);
    expect(session.filter((c) => c.card === null).length).toBe(NEW_PER_SESSION);
  });

  it("counts a word as known once its stability reaches three weeks", () => {
    const logs: ReviewLog[] = [log(4, T0)];
    for (let i = 0; i < 12 && cardFromLogs(logs)!.stability < KNOWN_STABILITY_DAYS; i++) {
      logs.push(log(4, cardFromLogs(logs)!.due));
    }
    expect(cardFromLogs(logs)!.stability).toBeGreaterThanOrEqual(KNOWN_STABILITY_DAYS);
    const stats = deckStats(C, withReviews(state, { [w0]: logs }), T0);
    expect(stats.known).toBe(1);
  });

  it("reports totals, due, new and the next due date", () => {
    const later = new Date(T0.getTime() + 3 * DAY);
    const s = withReviews(state, { [w0]: [log(3, T0)], [w1]: [log(1, new Date(T0.getTime() - 10 * DAY))] });
    const stats = deckStats(C, s, new Date(T0.getTime() + 60_000));
    expect(stats.total).toBe(S0.words.length + S1.words.length);
    expect(stats.newCount).toBe(stats.total - 2);
    expect(stats.due).toBe(1 + stats.newCount);
    expect(stats.nextDue!.getTime()).toBe(cardFromLogs(s.reviews[`${C.id}/${w0}`])!.due.getTime());
    expect(stats.nextDue!.getTime()).toBeLessThan(later.getTime() + 30 * DAY);
  });
});

describe("untilLabel", () => {
  const at = (ms: number) => new Date(T0.getTime() + ms);
  it("reads like a person would say it", () => {
    expect(untilLabel(at(10 * 60_000), T0)).toBe("in 10 min");
    expect(untilLabel(at(0), T0)).toBe("in 1 min");
    expect(untilLabel(at(5 * 3_600_000), T0)).toBe("in 5 h");
    expect(untilLabel(at(DAY), T0)).toBe("tomorrow");
    expect(untilLabel(at(3 * DAY), T0)).toBe("in 3 days");
  });
});
