/**
 * Wave 15 — `fx` is the web port of the extension's `$e` feedback object:
 * each cue plays its sound AND its haptic, each gated by its own toggle.
 *
 *   fx.tap()      — buttons, tiles, nav, toggles
 *   fx.flip()     — flashcard flip
 *   fx.correct()  — right answer
 *   fx.wrong()    — wrong answer
 *   fx.complete() — web-only: quiz/deck/review finished (reuses `correct`)
 */

import { playSound, type SoundEvent } from "./sound";
import { vibrate } from "./haptics";

function cue(event: SoundEvent): void {
  playSound(event);
  vibrate(event);
}

export const fx = {
  tap: () => cue("tap"),
  flip: () => cue("flip"),
  correct: () => cue("correct"),
  wrong: () => cue("wrong"),
  complete: () => cue("complete"),
};

export type { SoundEvent };
export * from "./prefs";
