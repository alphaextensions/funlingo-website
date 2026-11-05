/**
 * Wave 15 — haptic patterns, ported 1:1 from the extension's `learn.js`
 * (`Je(pattern)` calls inside `$e`).
 *
 * Feature-detected: iOS Safari and desktop browsers have no
 * `navigator.vibrate`, so this is a silent no-op there. Respects the
 * Haptics toggle (separate from Sound and from Motion).
 */

import { getFeedbackPrefs } from "./prefs";
import type { SoundEvent } from "./sound";

export const HAPTIC_PATTERNS: Readonly<Record<SoundEvent, number | readonly number[]>> = Object.freeze({
  tap: 12,
  flip: 10,
  correct: [15, 30, 15, 30, 20],
  wrong: [40, 50, 40],
  // Web-only: reuse the success pattern (see sound.ts `complete`).
  complete: [15, 30, 15, 30, 20],
});

export function canVibrate(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

/** Fire the pattern for an event. Returns whether a vibrate call was made. */
export function vibrate(event: SoundEvent): boolean {
  if (!getFeedbackPrefs().haptics) return false;
  if (!canVibrate()) return false;
  try {
    const p = HAPTIC_PATTERNS[event];
    navigator.vibrate(typeof p === "number" ? p : [...p]);
    return true;
  } catch {
    return false;
  }
}
