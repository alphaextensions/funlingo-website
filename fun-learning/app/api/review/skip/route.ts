/**
 * POST /api/review/skip — log a skip without advancing FSRS state.
 *
 * Same shape as /grade minus `grade`. Also wrapped in `withIdempotency` so a
 * retried mobile request doesn't duplicate the ReviewLog row.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import {
  skipCard,
  assertCardExists,
  ReviewCardMissingError,
} from "@/server/review/scheduler";
import { resolveReviewUserId } from "@/server/review/auth-helper";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  cardType: z.enum(["word", "sentence"]),
  cardId: z.string().min(1).max(64),
  lang: z.string().min(2).max(10),
  elapsedMs: z.number().int().min(0).max(60 * 60 * 1000).optional(),
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
      await skipCard({
        userId,
        cardType: parsed.data.cardType,
        cardId: parsed.data.cardId,
        lang: parsed.data.lang,
        elapsedMs: parsed.data.elapsedMs ?? 0,
      });
      return Response.json({ ok: true });
    } catch (err) {
      logger.error({ err: String(err) }, "review skip failed");
      return Response.json({ error: "SKIP_FAILED" }, { status: 500 });
    }
  },
  { getUserId: resolveReviewUserId },
);
