import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { makeEvent, type PathEvent } from "./events";
import {
  applyEvent,
  emptyState,
  episodeProgress,
  finaleKey,
  nextUp,
  type PathState,
  sceneKey,
  sceneStatus,
  testOutEvents,
} from "./progress";
import type { Course } from "./schema";
import { validateCourse } from "./validate";

// Sample fixture plus a second episode, so cross-episode rules have something to walk.
function course(): Course {
  const json = JSON.parse(readFileSync(join(__dirname, "__fixtures__", "sample-course.json"), "utf8"));
  const ep2 = structuredClone(json.seasons[0].episodes[0]);
  ep2.id = "ep2";
  ep2.scenes.forEach((s: { id: string }, i: number) => (s.id = `ep2-s${i}`));
  json.seasons[0].episodes.push(ep2);
  const r = validateCourse(json);
  if (!r.ok) throw new Error(r.errors.join("\n"));
  return r.course;
}

const C = course();
const EP1 = C.seasons[0].episodes[0];
const EP2 = C.seasons[0].episodes[1];
const S0 = EP1.scenes[0].id;
const S1 = EP1.scenes[1].id;
const T0 = new Date("2026-10-20T10:00:00Z");
const T1 = new Date("2026-10-21T10:00:00Z");

const ev = (kind: PathEvent["kind"], ref: string, payload: Record<string, unknown>, now = T1) =>
  makeEvent(kind, C.id, ref, payload, now);
const run = (events: PathEvent[], start: PathState = emptyState()) => events.reduce(applyEvent, start);
const done = (sceneId: string, score = 80, now = T1) => ev("scene_done", sceneId, { score, content_version: 1 }, now);

describe("makeEvent", () => {
  it("stamps an id, the course and an ISO client time", () => {
    const e = makeEvent("scene_done", "en-es", "s1", { score: 1 }, T0, "id-1");
    expect(e).toEqual({ id: "id-1", kind: "scene_done", course_id: "en-es", ref: "s1", payload: { score: 1 }, client_ts: T0.toISOString() });
    expect(makeEvent("take_done", "en-es", "s1:0", {}).id).toMatch(/^[0-9a-f-]{36}$/);
  });
});

describe("applyEvent", () => {
  it("keeps the best score and counts every attempt", () => {
    const s = run([done(S0, 60), done(S0, 90), done(S0, 70)]);
    expect(s.scenes[sceneKey(C.id, S0)]).toMatchObject({ status: "done", bestScore: 90, attempts: 3 });
  });

  it("does not downgrade a finished scene when a late scene_started arrives", () => {
    const s = run([done(S0), ev("scene_started", S0, { content_version: 1 })]);
    expect(s.scenes[sceneKey(C.id, S0)]).toMatchObject({ status: "done", attempts: 1 });
  });

  it("ignores an event it has already applied", () => {
    const e = done(S0);
    expect(run([e, e]).scenes[sceneKey(C.id, S0)].attempts).toBe(1);
  });

  it("keeps the earliest completion time whatever the arrival order", () => {
    const s = run([done(S0, 80, T1), done(S0, 80, T0)]);
    expect(s.scenes[sceneKey(C.id, S0)].firstDoneAt).toBe(T0.toISOString());
  });

  it("marks a finale passed at 75 but not at 74", () => {
    const failed = run([ev("finale_done", EP1.id, { score: 74 })]);
    expect(failed.finales[finaleKey(C.id, EP1.id)]).toMatchObject({ passed: false, bestScore: 74, attempts: 1 });
    const passed = run([ev("finale_done", EP1.id, { score: 75 })], failed);
    expect(passed.finales[finaleKey(C.id, EP1.id)]).toMatchObject({ passed: true, bestScore: 75, attempts: 2 });
  });

  it("keeps a finale passed after a later lower score", () => {
    const s = run([ev("finale_done", EP1.id, { score: 90 }), ev("finale_done", EP1.id, { score: 10 })]);
    expect(s.finales[finaleKey(C.id, EP1.id)]).toMatchObject({ passed: true, bestScore: 90 });
  });

  it("appends a word review to that word's log, once per event", () => {
    const r1 = ev("word_reviewed", "hola", { rating: 3, term: "hola" }, T0);
    const r2 = ev("word_reviewed", "hola", { rating: 1, term: "hola" }, T1);
    const s = run([r1, r2, r1]);
    expect(s.reviews[`${C.id}/hola`]).toEqual([
      { id: r1.id, rating: 3, at: T0.toISOString() },
      { id: r2.id, rating: 1, at: T1.toISOString() },
    ]);
  });

  it("does not repeat a review that is already in the log, even after `seen` forgot it", () => {
    const r1 = ev("word_reviewed", "hola", { rating: 3, term: "hola" }, T0);
    const once = run([r1]);
    const forgetful = { ...once, seen: [] };
    expect(run([r1], forgetful).reviews[`${C.id}/hola`]).toHaveLength(1);
  });

  it("ignores a review with a rating outside 1-4", () => {
    const s = run([ev("word_reviewed", "hola", { rating: 5, term: "hola" }), ev("word_reviewed", "hola", { term: "hola" })]);
    expect(s.reviews).toEqual({});
  });

  it("treats take_done as log-only", () => {
    const s = run([ev("take_done", `${S0}:0`, { kind: "guess" })]);
    expect(s.scenes).toEqual({});
  });
});

describe("derived progress", () => {
  it("counts only scenes that still exist in the content", () => {
    const s = run([done(S0), done("deleted-scene")]);
    expect(episodeProgress(C, EP1, s)).toEqual({ done: 1, total: 2, pct: 50, finalePassed: false });
  });

  it("opens scenes one after another", () => {
    expect(sceneStatus(C, EP1, 0, emptyState())).toBe("open");
    expect(sceneStatus(C, EP1, 1, emptyState())).toBe("locked");
    const s = run([done(S0)]);
    expect(sceneStatus(C, EP1, 0, s)).toBe("done");
    expect(sceneStatus(C, EP1, 1, s)).toBe("open");
  });

  it("opens every scene once the finale is passed", () => {
    const s = run([ev("finale_done", EP1.id, { score: 100 })]);
    expect(sceneStatus(C, EP1, 1, s)).toBe("open");
  });

  it("walks next-up across scenes, the finale and episodes", () => {
    expect(nextUp(C, emptyState())).toEqual({ episodeId: EP1.id, sceneId: S0 });
    let s = run([done(S0)]);
    expect(nextUp(C, s)).toEqual({ episodeId: EP1.id, sceneId: S1 });
    s = run([done(S1)], s);
    expect(nextUp(C, s)).toEqual({ episodeId: EP1.id, sceneId: null });
    s = run([ev("finale_done", EP1.id, { score: 80 })], s);
    expect(nextUp(C, s)).toEqual({ episodeId: EP2.id, sceneId: EP2.scenes[0].id });
  });

  it("returns null when the whole course is done", () => {
    const all = C.seasons[0].episodes.flatMap((e) => [
      ...e.scenes.map((sc) => done(sc.id)),
      ev("finale_done", e.id, { score: 100 }),
    ]);
    expect(nextUp(C, run(all))).toBeNull();
  });

  it("builds test-out events only for scenes not yet done", () => {
    const s = run([done(S0)]);
    const evs = testOutEvents(C, EP1, s, 88, T1);
    expect(evs.map((e) => [e.kind, e.ref, e.payload.score])).toEqual([["scene_done", S1, 88]]);
    expect(episodeProgress(C, EP1, run(evs, s)).done).toBe(2);
  });
});
