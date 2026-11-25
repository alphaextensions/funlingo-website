/**
 * Per-user preferences stored on `Prefs.json` as a free-form JSON blob.
 * This module centralises the shape and the read helper so we don't repeat
 * safe-JSON parsing in every API / page.
 *
 * The JSON schema is intentionally forgiving — unknown keys are preserved
 * on write (see `app/api/settings/route.ts`) and ignored on read.
 */

import { sanitizeVoicePrefs } from "@/lib/voice/prefs";
import { prisma } from "@/server/db";

export interface UserPrefs {
  motion?: boolean;
  /**
   * Wave 9: when `true`, Speaking + Shadowing drills switch to the on-device
   * Whisper + word-match flow instead of the Groq text-vs-text scorer.
   * Default is `false` so an existing learner's experience is unchanged.
   */
  localPronunciation?: boolean;
  /**
   * Wave 15 — extension settings-drawer parity (`funLearningPrefs`):
   * synthesized UI sounds, navigator.vibrate haptics, RTL layout preview and
   * the Listen-button voice. Defaults match the extension exactly.
   */
  sound?: boolean;
  haptics?: boolean;
  rtl?: boolean;
  voicePref?: string;
  /**
   * Wave 17 — Listen-button voice per learning language
   * (`{ es: "Google español" }`). Missing key = auto.
   */
  voicePrefs?: Record<string, string>;
  /**
   * Wave 18: `/welcome` first-run onboarding outcome. Absent = never seen.
   */
  onboarding?: "done" | "skipped";
}

/** Default shape when a user has never saved preferences. */
export function defaultPrefs(): UserPrefs {
  return {
    motion: true,
    localPronunciation: false,
    sound: true,
    haptics: true,
    rtl: false,
    voicePref: "auto",
    voicePrefs: {},
  };
}

/** Boolean Prefs.json fields `/api/settings` accepts. */
export const PREF_BOOL_KEYS = ["motion", "localPronunciation", "sound", "haptics", "rtl"] as const;

/**
 * Pick the Prefs.json fields out of a `/api/settings` body. Wrong types are
 * dropped (never coerced) so a bad client can't store `"sound": "yes"`.
 */
export function buildPrefsPatch(body: Record<string, unknown>): Partial<UserPrefs> {
  const out: Record<string, unknown> = {};
  for (const k of PREF_BOOL_KEYS) {
    if (typeof body[k] === "boolean") out[k] = body[k];
  }
  const v = body.voicePref;
  if (typeof v === "string" && v.length > 0 && v.length <= 200) out.voicePref = v;
  if (body.onboarding === "done" || body.onboarding === "skipped") out.onboarding = body.onboarding;
  if (body.voicePrefs && typeof body.voicePrefs === "object") {
    out.voicePrefs = sanitizeVoicePrefs(body.voicePrefs);
  }
  return out as Partial<UserPrefs>;
}

/** Merge a patch into the stored JSON string, preserving unknown keys. */
export function mergePrefsJson(existing: string | null, patch: Partial<UserPrefs>): string {
  let parsed: Record<string, unknown> = {};
  if (existing) {
    try {
      const p = JSON.parse(existing) as unknown;
      if (p && typeof p === "object" && !Array.isArray(p)) parsed = p as Record<string, unknown>;
    } catch {
      parsed = {};
    }
  }
  return JSON.stringify({ ...parsed, ...patch });
}

/**
 * Read the stored prefs row and return a merged shape. Never throws —
 * invalid JSON falls back to defaults so a corrupt row doesn't lock a user
 * out of their settings page.
 */
export async function getPrefs(userId: string): Promise<UserPrefs> {
  const defaults = defaultPrefs();
  if (!userId) return defaults;
  try {
    const row = await prisma.prefs.findUnique({ where: { userId } });
    if (!row?.json) return defaults;
    const parsed = JSON.parse(row.json) as unknown;
    if (!parsed || typeof parsed !== "object") return defaults;
    return { ...defaults, ...(parsed as UserPrefs) };
  } catch {
    return defaults;
  }
}
