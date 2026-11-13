/**
 * POST /api/talk/corrections/save
 *
 * Wire 3 (cross-feature): save a Talk correction as a Sentence row the user
 * can drill later. When `correctTurn` surfaces "Try: 'estoy cansado' instead
 * of 'soy cansado'", the Talk UI calls this endpoint with the corrected form,
 * the original (as translation hint), and the owning TalkTurn id — the row
 * then lives alongside the user's other dictation/speaking sentences and
 * appears in /sentences and the Review scheduler.
 *
 * Design decisions:
 *  - Idempotent (withIdempotency). Client sends `talk-save-<turnId>` as the
 *    key so repeat saves of the same correction don't duplicate.
 *  - Store `talkTurnId:<id>` in Sentence (via the sourceId field is wrong —
 *    the schema's `source` is a FK to Source. We don't have a Source for a
 *    Talk turn. Instead we encode the reference as `talkTurnId:<id>` in a
 *    lightweight way: Sentence has no `note` column, so we piggy-back the
 *    reference into `translation` only when the user doesn't have one of
 *    their own. The task description said "store `talkTurnId:X` in a note
 *    field if a direct FK would require schema change" — Sentence has no
 *    `note`, so we instead store it in a dedicated structured prefix in
 *    `translation`.
 *
 *    Actually, Sentence does carry `lists` (comma-joined labels), so we
 *    append `source:talk` to those; the TalkTurn id is persisted in the
 *    `translation` field only if it's otherwise empty, prefixed with
 *    `[talk:<id>]`. This avoids a schema change while keeping the
 *    reference recoverable.
 *  - `lang` comes from the TalkSession, verified against the user.
 *  - A sentence row for the same (userId, text, lang) with `source:talk`
 *    in its lists is treated as the "already saved" case and returned 200
 *    without a second row.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  talkTurnId: z.string().min(1).max(200),
  correctedText: z.string().min(1).max(2000),
  originalText: z.string().min(1).max(2000).optional(),
  reasonShort: z.string().max(500).optional(),
});

export const POST = withIdempotency(async (req, { userId }) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "BAD_JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "VALIDATION_FAILED", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { talkTurnId, correctedText, originalText, reasonShort } = parsed.data;

  try {
    // Load the TalkTurn + session so we can:
    //   1. Confirm it belongs to this user (prevent cross-user poisoning).
    //   2. Scope the Sentence to the session's `lang` (non-negotiable #4).
    const turn = await prisma.talkTurn.findUnique({
      where: { id: talkTurnId },
      select: {
        id: true,
        session: { select: { userId: true, lang: true } },
      },
    });
    if (!turn || turn.session.userId !== userId) {
      return Response.json({ error: "TURN_NOT_FOUND" }, { status: 404 });
    }
    const lang = turn.session.lang;
    const text = correctedText.trim();
    if (!text) {
      return Response.json({ error: "EMPTY_TEXT" }, { status: 400 });
    }

    // Dedupe: a prior save of the same correction for this user returns the
    // existing row rather than duplicating.
    const existing = await prisma.sentence.findFirst({
      where: {
        userId,
        lang,
        text,
        lists: { contains: "source:talk" },
      },
      select: { id: true },
    });
    if (existing) {
      return Response.json({ ok: true, sentenceId: existing.id, deduped: true });
    }

    // Build the translation field. Prefer the user's intended meaning
    // (originalText), falling back to the correction reason. Prepend a
    // lightweight recovery tag `[talk:<turnId>]` so the Sentence can be
    // traced back to its origin without a schema change.
    const traceTag = `[talk:${talkTurnId}]`;
    const translationBody = originalText?.trim() || reasonShort?.trim() || "";
    const translation = translationBody
      ? `${traceTag} ${translationBody}`
      : traceTag;

    const sentence = await prisma.sentence.create({
      data: {
        userId,
        lang,
        text,
        translation,
        // Lists per task spec: "speaking,favorite". We also append a
        // "source:talk" marker so Sentences UI / future lanes can filter.
        lists: "speaking,favorite,source:talk",
      },
    });

    return Response.json({
      ok: true,
      sentenceId: sentence.id,
      lang,
    });
  } catch (err) {
    logger.error({ err: String(err) }, "talk corrections save failed");
    return Response.json({ error: "SAVE_FAILED" }, { status: 500 });
  }
});
