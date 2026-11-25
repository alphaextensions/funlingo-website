/**
 * GET /api/review/session?lang=xx
 *
 * Returns the next ~20 cards due for review for (userId, lang), interleaving
 * UserWord + Sentence cards. Each card includes the data the Review UI needs
 * to render the Flashcard / Guess / Dictation / Shadow / Speaking drills.
 *
 * Lang scoping is enforced in `cardsDueNow` — this route never returns cards
 * from another learning language, satisfying veto test #8.
 */

import { prisma } from "@/server/db";
import { cardsDueNow } from "@/server/review/scheduler";
import { resolveReviewUserId } from "@/server/review/auth-helper";
import { z } from "zod";

const query = z.object({
  lang: z.string().min(2).max(10),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = query.safeParse({
    lang: url.searchParams.get("lang") ?? "",
    limit: url.searchParams.get("limit") ?? "20",
  });
  if (!parsed.success) {
    return Response.json(
      { error: "VALIDATION_FAILED", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const userId = await resolveReviewUserId(req);
  if (!userId) return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const refs = await cardsDueNow(userId, parsed.data.lang, parsed.data.limit);

  // Hydrate each ref with the data the UI needs. Done in two batched queries
  // (one per type) and zipped back together — keeps the hot path cheap.
  const wordIds = refs.filter((r) => r.cardType === "word").map((r) => r.cardId);
  const sentenceIds = refs
    .filter((r) => r.cardType === "sentence")
    .map((r) => r.cardId);

  const [words, sentences] = await Promise.all([
    wordIds.length
      ? prisma.userWord.findMany({
          where: { id: { in: wordIds }, userId, lang: parsed.data.lang },
          include: {
            encounters: {
              orderBy: { savedAt: "desc" },
              take: 1,
              include: {
                source: { select: { id: true, title: true, meta: true, type: true } },
              },
            },
          },
        })
      : Promise.resolve([]),
    sentenceIds.length
      ? prisma.sentence.findMany({
          where: { id: { in: sentenceIds }, userId, lang: parsed.data.lang },
          include: {
            source: { select: { title: true, meta: true, type: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  const wordMap = new Map(words.map((w) => [w.id, w]));
  const sentenceMap = new Map(sentences.map((s) => [s.id, s]));

  interface SessionCard {
    cardType: "word" | "sentence";
    cardId: string;
    lang: string;
    due: string;
    reps: number;
    state: number;
    /** For word cards. */
    word?: {
      lemma: string;
      pos: string | null;
      note: string | null;
      encounter?: {
        line: string;
        translation: string | null;
        timestampSec: number | null;
        savedAt: string;
        sourceTitle: string | null;
        sourceId: string | null;
        sourceType: string | null;
      };
    };
    /** For sentence cards. */
    sentence?: {
      text: string;
      translation: string | null;
      timestampSec: number | null;
      sourceTitle: string | null;
    };
  }

  const cards: SessionCard[] = [];
  for (const ref of refs) {
    if (ref.cardType === "word") {
      const w = wordMap.get(ref.cardId);
      if (!w) continue;
      const enc = w.encounters[0];
      cards.push({
        cardType: "word",
        cardId: ref.cardId,
        lang: ref.lang,
        due: ref.due.toISOString(),
        reps: ref.reps,
        state: ref.state,
        word: {
          lemma: w.lemma,
          pos: w.pos,
          note: w.note,
          encounter: enc
            ? {
                line: enc.line,
                translation: enc.translation,
                timestampSec: enc.timestampSec,
                savedAt: enc.savedAt.toISOString(),
                sourceTitle: enc.source?.title ?? null,
                sourceId: enc.source?.id ?? enc.sourceId ?? null,
                sourceType: enc.source?.type ?? null,
              }
            : undefined,
        },
      });
    } else {
      const s = sentenceMap.get(ref.cardId);
      if (!s) continue;
      cards.push({
        cardType: "sentence",
        cardId: ref.cardId,
        lang: ref.lang,
        due: ref.due.toISOString(),
        reps: ref.reps,
        state: ref.state,
        sentence: {
          text: s.text,
          translation: s.translation,
          timestampSec: s.timestampSec,
          sourceTitle: s.source?.title ?? null,
        },
      });
    }
  }

  return Response.json({
    lang: parsed.data.lang,
    count: cards.length,
    cards,
  });
}
