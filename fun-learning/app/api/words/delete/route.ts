/**
 * POST /api/words/delete — remove one or more saved words.
 *
 * Port of the extension popup's "×" remove button and the "Manage words"
 * multi-select delete mode. The client holds the request for a few seconds
 * so the learner can Undo; this route only runs once that window closes.
 *
 * Idempotent + lang-scoped. Encounters cascade via the FK; ReviewCardState
 * has no FK (composite cardType/cardId), so we clear the word rows by hand.
 * ReviewLog history is kept — it's the learner's activity record.
 */

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";

const schema = z.object({
  wordIds: z.array(z.string().min(1).max(64)).min(1).max(500),
  lang: z.string().min(2).max(10),
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
  const { wordIds, lang } = parsed.data;

  const owned = await prisma.userWord.findMany({
    where: { id: { in: wordIds }, userId, lang },
    select: { id: true },
  });
  const ids = owned.map((w) => w.id);
  if (ids.length === 0) return Response.json({ ok: true, deleted: 0 });

  await prisma.$transaction([
    prisma.reviewCardState.deleteMany({
      where: { userId, lang, cardType: "word", cardId: { in: ids } },
    }),
    prisma.userWord.deleteMany({ where: { id: { in: ids }, userId, lang } }),
  ]);
  return Response.json({ ok: true, deleted: ids.length });
});
