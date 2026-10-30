/**
 * POST /api/watch/wordState
 *
 * Wave 16 — word-card actions ported from the extension popup:
 *   - `unsave`: the bookmark toggle's "Remove saved word". Deletes the
 *     learner's own UserWord (+ its encounters, via cascade) for this lang.
 *   - `known`: the saved-word self-test's "I know this" (extension
 *     `graduateWord`). Sets `state = "known"`.
 *   - `learning`: undo for `known`.
 *
 * Lang-scoped (non-negotiable #4) and idempotency-wrapped (non-negotiable #1).
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  lemma: z.string().min(1).max(200),
  lang: z.string().min(2).max(10),
  action: z.enum(["unsave", "known", "learning"]),
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
    return Response.json({ error: "VALIDATION_FAILED" }, { status: 400 });
  }
  const { lemma, lang, action } = parsed.data;
  const lemmaKey = lemma.trim().toLowerCase();

  try {
    if (action === "unsave") {
      const res = await prisma.userWord.deleteMany({
        where: { userId, lang, lemma: lemmaKey },
      });
      return Response.json({ ok: true, removed: res.count });
    }
    const res = await prisma.userWord.updateMany({
      where: { userId, lang, lemma: lemmaKey },
      data: { state: action },
    });
    if (res.count === 0) {
      return Response.json({ error: "NOT_SAVED" }, { status: 404 });
    }
    return Response.json({ ok: true, state: action });
  } catch (err) {
    logger.error({ err: String(err) }, "wordState failed");
    return Response.json({ error: "WORD_STATE_FAILED" }, { status: 500 });
  }
});
