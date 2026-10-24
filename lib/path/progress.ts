import { FINALE_PASS_PCT } from "./constants";
import { makeEvent, type PathEvent } from "./events";
import type { Course, Episode } from "./schema";

// Local progress, derived from events with the same merge rules as supabase
// apply_events(): completion is an OR, best score is the max, attempts count distinct
// events, first completion is the earliest. Keep the two in step.

export type SceneState = {
  status: "started" | "done";
  bestScore: number | null;
  attempts: number;
  firstDoneAt: string | null;
};

export type FinaleState = { bestScore: number; passed: boolean; attempts: number };

export type ReviewLog = { id: string; rating: 1 | 2 | 3 | 4; at: string };

export type PathState = {
  v: 1;
  scenes: Record<string, SceneState>;
  finales: Record<string, FinaleState>;
  reviews: Record<string, ReviewLog[]>; // "<course>/<wordId>" → that word's review logs
  seen: string[]; // applied event ids, newest last; makes applyEvent idempotent
};

const SEEN_CAP = 5000;

export const emptyState = (): PathState => ({ v: 1, scenes: {}, finales: {}, reviews: {}, seen: [] });
export const sceneKey = (courseId: string, sceneId: string) => `${courseId}/${sceneId}`;
export const finaleKey = (courseId: string, episodeId: string) => `${courseId}/${episodeId}`;

function scoreOf(ev: PathEvent): number | null {
  const raw = ev.payload.score;
  if (typeof raw !== "number" || !Number.isFinite(raw)) return null;
  const score = Math.round(raw);
  return score >= 0 && score <= 100 ? score : null;
}

export function applyEvent(state: PathState, ev: PathEvent): PathState {
  if (state.seen.includes(ev.id)) return state;
  const seen = [...state.seen, ev.id].slice(-SEEN_CAP);

  if (ev.kind === "scene_started") {
    const key = sceneKey(ev.course_id, ev.ref);
    if (state.scenes[key]) return { ...state, seen };
    return {
      ...state,
      seen,
      scenes: { ...state.scenes, [key]: { status: "started", bestScore: null, attempts: 0, firstDoneAt: null } },
    };
  }

  if (ev.kind === "scene_done") {
    const score = scoreOf(ev);
    if (score === null) return state;
    const key = sceneKey(ev.course_id, ev.ref);
    const prev = state.scenes[key];
    const firstDoneAt =
      prev?.firstDoneAt && prev.firstDoneAt < ev.client_ts ? prev.firstDoneAt : ev.client_ts;
    return {
      ...state,
      seen,
      scenes: {
        ...state.scenes,
        [key]: {
          status: "done",
          bestScore: Math.max(prev?.bestScore ?? 0, score),
          attempts: (prev?.attempts ?? 0) + 1,
          firstDoneAt,
        },
      },
    };
  }

  if (ev.kind === "finale_done") {
    const score = scoreOf(ev);
    if (score === null) return state;
    const key = finaleKey(ev.course_id, ev.ref);
    const prev = state.finales[key];
    return {
      ...state,
      seen,
      finales: {
        ...state.finales,
        [key]: {
          bestScore: Math.max(prev?.bestScore ?? 0, score),
          passed: (prev?.passed ?? false) || score >= FINALE_PASS_PCT,
          attempts: (prev?.attempts ?? 0) + 1,
        },
      },
    };
  }

  if (ev.kind === "word_reviewed") {
    const rating = ev.payload.rating;
    if (rating !== 1 && rating !== 2 && rating !== 3 && rating !== 4) return state;
    const key = `${ev.course_id}/${ev.ref}`;
    const log: ReviewLog = { id: ev.id, rating, at: ev.client_ts };
    return { ...state, seen, reviews: { ...state.reviews, [key]: [...(state.reviews[key] ?? []), log] } };
  }

  return { ...state, seen }; // take_done: logged only
}

const isDone = (course: Course, sceneId: string, state: PathState) =>
  state.scenes[sceneKey(course.id, sceneId)]?.status === "done";

const finalePassed = (course: Course, episode: Episode, state: PathState) =>
  state.finales[finaleKey(course.id, episode.id)]?.passed ?? false;

export function episodeProgress(course: Course, episode: Episode, state: PathState) {
  const total = episode.scenes.length;
  const done = episode.scenes.filter((s) => isDone(course, s.id, state)).length;
  return { done, total, pct: Math.round((done / total) * 100), finalePassed: finalePassed(course, episode, state) };
}

export function sceneStatus(
  course: Course,
  episode: Episode,
  sceneIndex: number,
  state: PathState,
): "locked" | "open" | "done" {
  if (isDone(course, episode.scenes[sceneIndex].id, state)) return "done";
  if (sceneIndex === 0 || finalePassed(course, episode, state)) return "open";
  return isDone(course, episode.scenes[sceneIndex - 1].id, state) ? "open" : "locked";
}

/** The first unfinished episode and its first unfinished scene (null: only the Finale is left). */
export function nextUp(course: Course, state: PathState): { episodeId: string; sceneId: string | null } | null {
  for (const season of course.seasons) {
    for (const episode of season.episodes) {
      if (finalePassed(course, episode, state)) continue;
      const scene = episode.scenes.find((s) => !isDone(course, s.id, state));
      return { episodeId: episode.id, sceneId: scene?.id ?? null };
    }
  }
  return null;
}

/** Passing a Finale tests out of the episode: one scene_done per scene not yet done. */
export function testOutEvents(
  course: Course,
  episode: Episode,
  state: PathState,
  score: number,
  now: Date = new Date(),
): PathEvent[] {
  return episode.scenes
    .filter((s) => !isDone(course, s.id, state))
    .map((s) => makeEvent("scene_done", course.id, s.id, { score, content_version: course.version }, now));
}
