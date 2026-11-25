/**
 * POST /api/words/state — "I know this" / "Reactivate" for a saved word.
 *
 * Port of the extension popup's graduate / reactivate buttons
 * (popup.js `xo.graduateWord` / `xo.reactivateWord`). Idempotent and
 * lang-scoped: the word must belong to the caller AND the given learning
 * language, so a stale tab on another language can't flip the wrong row.
 */

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { SETTABLE_STATES } from "@/lib/words/state";

const schema = z.object({
  wordId: z.string().min(1).max(64),
  lang: z.string().min(2).max(10),
  state: z.enum(SETTABLE_STATES),
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
  const { wordId, lang, state } = parsed.data;
  const res = await prisma.userWord.updateMany({
    where: { id: wordId, userId, lang },
    data: { state },
  });
  if (res.count === 0) {
    return Response.json({ error: "WORD_NOT_FOUND" }, { status: 404 });
  }
  return Response.json({ ok: true, wordId, state });
});
