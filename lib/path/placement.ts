import { PLACEMENT_PASS_PCT } from "./constants";
import { makeEvent, type PathEvent } from "./events";
import { finaleKey, type PathState, testOutEvents } from "./progress";
import type { Course, Question } from "./schema";
import { seededShuffle } from "./takes";

// Placement: a few finale questions per episode, in course order, stopping at the first
// episode the learner doesn't know. Passed episodes are recorded as finale passes
// (via "placement") plus the usual test-out, so the server needs nothing new.

export const PER_EPISODE = 2;

export type PlacementStep = { episodeId: string; questions: Question[] };
export type PlacementResult = { episodeId: string; score: number; answers: (number | null)[] };

export function buildPlacement(course: Course): PlacementStep[] {
  return course.seasons.flatMap((season) =>
    season.episodes.map((episode) => ({
      episodeId: episode.id,
      questions: seededShuffle(episode.finale.questions, episode.id).slice(0, PER_EPISODE),
    })),
  );
}

/** Percentage of right answers; null ("not sure") counts as wrong. */
export function scoreStep(step: PlacementStep, answers: (number | null)[]): number {
  const right = step.questions.filter((q, i) => answers[i] === q.answer).length;
  return Math.round((right / step.questions.length) * 100);
}

export const stepPassed = (score: number) => score >= PLACEMENT_PASS_PCT;

export function placementEvents(
  course: Course,
  state: PathState,
  results: PlacementResult[],
  now: Date = new Date(),
): PathEvent[] {
  const episodes = course.seasons.flatMap((s) => s.episodes);
  return results.flatMap((result) => {
    const episode = episodes.find((e) => e.id === result.episodeId);
    if (!episode || !stepPassed(result.score)) return [];
    if (state.finales[finaleKey(course.id, episode.id)]?.passed) return [];
    return [
      makeEvent("finale_done", course.id, episode.id, { score: result.score, answers: result.answers, via: "placement" }, now),
      ...testOutEvents(course, episode, state, result.score, now),
    ];
  });
}
