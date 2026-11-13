/**
 * POST /api/watch/wordCard
 *
 * Cache-first word card lookup for the Watch route.
 *
 * - Cache key: (lemma, srcLang, tgtLang) — NEVER the user's sentence.
 * - Payload returned to the client: WordCard JSON.
 * - On cache miss: calls `wordCard()` from the AI module. The user's actual
 *   sentence is included in the AI request so the generated short-meaning
 *   can reflect the sense in context, but the sentence is NOT stored in
 *   the cache (AGENT-PLAYBOOK: "cache by (lemma, lang_pair) not by sentence").
 * - Entries auto-stale after 90 days — fetched lazily by freshness check
 *   on read.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { markConfidential } from "@/server/types/confidential";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";
import { wordCard, RateLimitError, SafetyFilterError } from "@/lib/ai";
import type { WordCard } from "@/lib/ai";

const STALE_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const schema = z.object({
  wordOrPhrase: z.string().min(1).max(200),
  sentence: z.string().min(1).max(2000),
  sourceLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
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

  const { wordOrPhrase, sentence, sourceLang, nativeLang, level } = parsed.data;
  const lemmaKey = normaliseLemma(wordOrPhrase);

  // Cache hit?
  try {
    const hit = await prisma.wordCardCache.findUnique({
      where: {
        lemma_srcLang_tgtLang: {
          lemma: lemmaKey,
          srcLang: sourceLang,
          tgtLang: nativeLang,
        },
      },
    });
    if (hit && Date.now() - hit.freshness.getTime() < STALE_MS) {
      try {
        const card = JSON.parse(hit.cardJson) as WordCard;
        return Response.json({ ...card, _cache: "hit" });
      } catch {
        /* fall through — re-generate */
      }
    }
  } catch (err) {
    logger.warn({ err: String(err) }, "wordCard cache lookup failed");
  }

  // Miss → call AI.
  try {
    const card = await wordCard({
      wordOrPhrase,
      sentence: markConfidential(sentence),
      sourceLang,
      nativeLang,
      level,
      userId,
    });

    // Persist cache (lemma + lang pair + the generated card). The user's
    // sentence does NOT go in.
    try {
      await prisma.wordCardCache.upsert({
        where: {
          lemma_srcLang_tgtLang: {
            lemma: lemmaKey,
            srcLang: sourceLang,
            tgtLang: nativeLang,
          },
        },
        update: {
          cardJson: JSON.stringify(card),
          freshness: new Date(),
        },
        create: {
          lemma: lemmaKey,
          srcLang: sourceLang,
          tgtLang: nativeLang,
          cardJson: JSON.stringify(card),
        },
      });
    } catch (err) {
      logger.warn({ err: String(err) }, "wordCard cache upsert failed");
    }

    return Response.json({ ...card, _cache: "miss" });
  } catch (err) {
    if (err instanceof RateLimitError) {
      return Response.json(
        {
          error: "RATE_LIMITED",
          scope: err.scope,
          kind: err.kind,
          retryAfterSec: err.retryAfterSec,
          message: err.message,
        },
        { status: 429 },
      );
    }
    if (err instanceof SafetyFilterError) {
      return Response.json(
        {
          error: "SAFETY_BLOCKED",
          violated: err.violated,
          message: "That card was blocked by the content filter.",
        },
        { status: 422 },
      );
    }
    logger.error({ err: String(err) }, "wordCard route failed");
    return Response.json({ error: "AI_UPSTREAM_FAILED" }, { status: 500 });
  }
});

function normaliseLemma(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}
