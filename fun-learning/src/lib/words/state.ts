/**
 * Saved-word state helpers — Wave 17 popup parity.
 *
 * The extension's saved-word store has two user-facing states: active and
 * "graduated" (the learner pressed "I know this", or skipped the highlight
 * three times). Our UserWord.state is richer (new | learning | known |
 * mastered); `known` and `mastered` are the graduated states.
 *
 * Graduated words drop out of the FSRS daily queue (see
 * `cardsDueNow` in src/server/review/scheduler.ts) — that's what makes the
 * "I know this" button honest.
 */

export const GRADUATED_STATES = ["known", "mastered"] as const;

export function isGraduated(state: string | null | undefined): boolean {
  return state === "known" || state === "mastered";
}

/** States a learner can set by hand from /words. */
export const SETTABLE_STATES = ["known", "learning"] as const;
export type SettableState = (typeof SETTABLE_STATES)[number];
