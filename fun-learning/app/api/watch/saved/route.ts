/**
 * GET /api/watch/saved?lang=xx[&sourceId=yy]
 *
 * Wave 16 — powers two extension behaviours on /watch:
 *   1. Saved words highlighted in EVERY video (extension's saved-word lookup
 *      index), plus the card's "already saved" / self-test state.
 *   2. Saved lines marked with a heart in this source's transcript.
 *
 * Lang-scoped (AGENT-PLAYBOOK non-negotiable #4): UserWord, Encounter and
 * Sentence reads all carry `lang` in the WHERE.
 *
 * Returns no caption text: lemmas are the user's own saved words, and saved
 * lines come back as timestamps only.
 */

import { z } from "zod";
import { prisma } from "@/server/db";
import { resolveReviewUserId } from "@/server/review/auth-helper";

export const dynamic = "force-dynamic";

const query = z.object({
  lang: z.string().min(2).max(10),
  sourceId: z.string().min(1).max(200).optional(),
});

const MAX_LEMMAS = 5000;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = query.safeParse({
    lang: url.searchParams.get("lang") ?? "",
    sourceId: url.searchParams.get("sourceId") ?? undefined,
  });
  if (!parsed.success) {
    return Response.json({ error: "VALIDATION_FAILED" }, { status: 400 });
  }
  const userId = await resolveReviewUserId(req);
  if (!userId) return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const { lang, sourceId } = parsed.data;
  const [words, moments, sentences] = await Promise.all([
    prisma.userWord.findMany({
      where: { userId, lang },
      select: { lemma: true, state: true },
      orderBy: { updatedAt: "desc" },
      take: MAX_LEMMAS,
    }),
    sourceId
      ? prisma.encounter.findMany({
          where: { userId, lang, sourceId, userWordId: null },
          select: { timestampSec: true },
        })
      : Promise.resolve([]),
    sourceId
      ? prisma.sentence.findMany({
          where: { userId, lang, sourceId },
          select: { timestampSec: true },
        })
      : Promise.resolve([]),
  ]);

  const lineTimes = new Set<number>();
  for (const r of [...moments, ...sentences]) {
    if (typeof r.timestampSec === "number") lineTimes.add(r.timestampSec);
  }

  return Response.json({
    words: words.map((w) => ({ lemma: w.lemma, state: w.state })),
    savedLineTimes: [...lineTimes].sort((a, b) => a - b),
  });
}
