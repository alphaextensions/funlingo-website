/**
 * POST /api/review/grade — advance a card's FSRS state.
 *
 * Wrapped in `withIdempotency` so TanStack Query retries from a flaky mobile
 * connection don't double-advance a card. (AGENT-PLAYBOOK non-negotiable #1.)
 *
 * Body:
 *   { cardType: "word" | "sentence",
 *     cardId: string,
 *     lang: string,
 *     grade: 1 | 2 | 3 | 4,         // Again / Hard / Good / Easy
 *     elapsedMs: number,
 *     format: "flashcard" | "guess" | "dictation" | "shadow" | "speaking" }
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import {
  gradeCard,
  assertCardExists,
  ReviewCardMissingError,
} from "@/server/review/scheduler";
import { resolveReviewUserId } from "@/server/review/auth-helper";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  cardType: z.enum(["word", "sentence"]),
  cardId: z.string().min(1).max(64),
  lang: z.string().min(2).max(10),
  grade: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  elapsedMs: z.number().int().min(0).max(60 * 60 * 1000),
  format: z.enum(["flashcard", "guess", "dictation", "shadow", "speaking"]),
});

export const POST = withIdempotency(
  async (req, _ctx) => {
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
    const userId = await resolveReviewUserId(req);
    if (!userId) return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });

    try {
      // Service-layer existence check (Code QA finding #6).
      await assertCardExists(
        userId,
        parsed.data.cardType,
        parsed.data.cardId,
        parsed.data.lang,
      );
    } catch (err) {
      if (err instanceof ReviewCardMissingError) {
        return Response.json(
          { error: "CARD_NOT_FOUND", cardType: err.cardType, cardId: err.cardId },
          { status: 404 },
        );
      }
      throw err;
    }

    try {
      const out = await gradeCard({
        userId,
        cardType: parsed.data.cardType,
        cardId: parsed.data.cardId,
        lang: parsed.data.lang,
        grade: parsed.data.grade,
        elapsedMs: parsed.data.elapsedMs,
        format: parsed.data.format,
      });
      return Response.json({
        logId: out.logId,
        due: out.due.toISOString(),
        scheduledDays: out.scheduledDays,
        state: out.state,
      });
    } catch (err) {
      logger.error({ err: String(err) }, "review grade failed");
      return Response.json({ error: "GRADE_FAILED" }, { status: 500 });
    }
  },
  {
    getUserId: resolveReviewUserId,
  },
);
