/**
 * POST /api/settings — update profile preferences.
 * Idempotent — the client passes an Idempotency-Key.
 */

import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { buildPrefsPatch, mergePrefsJson } from "@/server/prefs";
import { isCefr, isOnboardingStatus } from "@/lib/onboarding/flow";

interface Body {
  name?: string | null;
  nativeLang?: string;
  activeLearningLang?: string;
  uiLocale?: string;
  dailyGoalType?: "minutes" | "reviews";
  dailyGoalValue?: number;
  motion?: boolean;
  /**
   * Wave 9 — opt-in to on-device Whisper transcription for Speaking +
   * Shadowing drills. Stored on Prefs.json alongside `motion`.
   */
  localPronunciation?: boolean;
  /** Wave 15 — extension drawer prefs, stored on Prefs.json. */
  sound?: boolean;
  haptics?: boolean;
  rtl?: boolean;
  voicePref?: string;
  /** Wave 17 — Listen-button voice per learning language. */
  voicePrefs?: Record<string, string>;
  /** Wave 18 — CEFR level from the `/welcome` proficiency step (A1..C2). */
  level?: string;
  /** Wave 18 — `/welcome` outcome, stored on Prefs.json. */
  onboarding?: "done" | "skipped";
}

export const POST = withIdempotency(async (req, { userId }) => {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if ("name" in body) data.name = body.name;
  if (body.nativeLang) data.nativeLang = body.nativeLang;
  if (body.activeLearningLang) data.activeLearningLang = body.activeLearningLang;
  if (body.uiLocale) data.uiLocale = body.uiLocale;
  if (body.dailyGoalType) data.dailyGoalType = body.dailyGoalType;
  if (typeof body.dailyGoalValue === "number") data.dailyGoalValue = body.dailyGoalValue;
  if (body.level !== undefined) {
    if (!isCefr(body.level)) return Response.json({ error: "INVALID_LEVEL" }, { status: 400 });
    data.level = body.level;
  }
  if (body.onboarding !== undefined && !isOnboardingStatus(body.onboarding)) {
    return Response.json({ error: "INVALID_ONBOARDING" }, { status: 400 });
  }

  // Ensure a LearningLanguage row exists for the chosen active language.
  if (body.activeLearningLang) {
    // (LearningLanguage model not in scaffold yet — tracked in schema TODO.)
    // No-op here; the handoff lane will seed it.
  }

  // Wave 15: a prefs-only save (e.g. the Sound toggle) carries no User
  // column, so skip the User write instead of issuing an empty update.
  const user =
    Object.keys(data).length > 0
      ? await prisma.user.update({ where: { id: userId }, data })
      : { id: userId };

  // Mirror Prefs-JSON fields (motion, localPronunciation, sound, haptics,
  // rtl, voicePref, onboarding). Prefs row may not exist — upsert. We only
  // touch the row when the body sets one of its fields so an unrelated save
  // doesn't rewrite the whole JSON; unknown keys already stored survive.
  const patch = buildPrefsPatch(body as Record<string, unknown>);
  if (Object.keys(patch).length > 0) {
    const existing = await prisma.prefs.findUnique({ where: { userId } });
    const json = mergePrefsJson(existing?.json ?? null, patch);
    await prisma.prefs.upsert({
      where: { userId },
      update: { json },
      create: { userId, json },
    });
  }

  return Response.json({ ok: true, user: { id: user.id } });
});
