import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { makeEvent } from "./events";
import { buildPlacement, PER_EPISODE, placementEvents, scoreStep, stepPassed } from "./placement";
import { applyEvent, emptyState, nextUp, type PathState } from "./progress";
import type { Course } from "./schema";
import { validateCourse } from "./validate";

// Fixture with three episodes, so placement has somewhere to stop.
function course(): Course {
  const json = JSON.parse(readFileSync(join(__dirname, "__fixtures__", "sample-course.json"), "utf8"));
  for (const id of ["ep2", "ep3"]) {
    const ep = structuredClone(json.seasons[0].episodes[0]);
    ep.id = id;
    ep.scenes.forEach((s: { id: string }, i: number) => (s.id = `${id}-s${i}`));
    json.seasons[0].episodes.push(ep);
  }
  const r = validateCourse(json);
  if (!r.ok) throw new Error(r.errors.join("\n"));
  return r.course;
}

const C = course();
const [EP1, EP2, EP3] = C.seasons[0].episodes;
const NOW = new Date("2026-10-24T10:00:00Z");
const run = (events: ReturnType<typeof placementEvents>, start: PathState = emptyState()) => events.reduce(applyEvent, start);

describe("buildPlacement", () => {
  it("asks each episode's own finale questions, in course order", () => {
    const steps = buildPlacement(C);
    expect(steps.map((s) => s.episodeId)).toEqual([EP1.id, EP2.id, EP3.id]);
    for (const step of steps) {
      const finale = C.seasons[0].episodes.find((e) => e.id === step.episodeId)!.finale.questions;
      expect(step.questions).toHaveLength(Math.min(PER_EPISODE, finale.length));
      for (const q of step.questions) expect(finale).toContainEqual(q);
    }
  });

  it("is the same on every visit", () => {
    expect(buildPlacement(C)).toEqual(buildPlacement(C));
  });

  it("uses what there is when a finale has a single question", () => {
    const c = structuredClone(C);
    c.seasons[0].episodes[0].finale.questions = c.seasons[0].episodes[0].finale.questions.slice(0, 1);
    expect(buildPlacement(c)[0].questions).toHaveLength(1);
  });
});

describe("scoring", () => {
  const step = buildPlacement(C)[0];
  const right = step.questions.map((q) => q.answer);

  it("scores the share of right answers", () => {
    expect(scoreStep(step, right)).toBe(100);
    expect(scoreStep(step, [right[0], (right[1] + 1) % step.questions[1].options.length])).toBe(50);
  });

  it("counts 'not sure' as wrong", () => {
    expect(scoreStep(step, [null, null])).toBe(0);
  });

  it("passes at 85", () => {
    expect(stepPassed(85)).toBe(true);
    expect(stepPassed(84)).toBe(false);
  });
});

describe("placementEvents", () => {
  const passed = (episodeId: string) => ({ episodeId, score: 100, answers: [0, 1] });

  it("tests out of every passed episode and moves next-up past them", () => {
    const evs = placementEvents(C, emptyState(), [passed(EP1.id), passed(EP2.id), { episodeId: EP3.id, score: 50, answers: [0, null] }], NOW);
    const finales = evs.filter((e) => e.kind === "finale_done");
    expect(finales.map((e) => [e.ref, e.payload.via])).toEqual([
      [EP1.id, "placement"],
      [EP2.id, "placement"],
    ]);
    expect(evs.filter((e) => e.kind === "scene_done")).toHaveLength(EP1.scenes.length + EP2.scenes.length);
    expect(nextUp(C, run(evs))).toEqual({ episodeId: EP3.id, sceneId: EP3.scenes[0].id });
  });

  it("leaves episodes that are already passed alone", () => {
    const before = run([makeEvent("finale_done", C.id, EP1.id, { score: 90 }, NOW)]);
    const evs = placementEvents(C, before, [passed(EP1.id)], NOW);
    expect(evs).toEqual([]);
  });

  it("records nothing when no episode was passed", () => {
    expect(placementEvents(C, emptyState(), [{ episodeId: EP1.id, score: 0, answers: [null, null] }], NOW)).toEqual([]);
  });
});
