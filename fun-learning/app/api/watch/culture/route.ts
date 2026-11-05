/**
 * POST /api/watch/culture
 *
 * Cache-first culture notes for the current line + context window.
 *
 * - Cache key: (sourceId, SHA256(triggerLine), sourceLang, nativeLang).
 *   LEGAL: lineHash is a SHA-256 digest, NEVER the raw line. Even for
 *   cache keys, caption text does not land in the DB.
 * - Response payload is the AI-generated note TEXT (our own writing),
 *   which is safe to persist.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { markConfidential } from "@/server/types/confidential";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";
import { culture, RateLimitError, SafetyFilterError } from "@/lib/ai";
import type { CultureNote } from "@/lib/ai";
import { sha256Hex } from "@/lib/watch/hash";

const STALE_MS = 90 * 24 * 60 * 60 * 1000;

const schema = z.object({
  sourceId: z.string().min(1).max(200),
  sourceTitle: z.string().min(1).max(500),
  sourceLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
  triggerLineIndex: z.number().int().min(0),
  lines: z
    .array(
      z.object({
        index: z.number().int().min(0),
        text: z.string().min(1).max(2000),
        timestampSec: z.number().int().min(0).optional(),
      }),
    )
    .min(1)
    .max(32),
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

  const { sourceId, sourceTitle, sourceLang, nativeLang, triggerLineIndex, lines } =
    parsed.data;
  const trigger = lines.find((l) => l.index === triggerLineIndex) ?? lines[0];
  const lineHash = await sha256Hex(trigger.text);

  // Cache hit?
  try {
    const hit = await prisma.cultureNoteCache.findUnique({
      where: {
        sourceId_lineHash_sourceLang_nativeLang: {
          sourceId,
          lineHash,
          sourceLang,
          nativeLang,
        },
      },
    });
    if (hit && Date.now() - hit.freshness.getTime() < STALE_MS) {
      try {
        const notes = JSON.parse(hit.notesJson) as CultureNote[];
        return Response.json({ notes, _cache: "hit" });
      } catch {
        /* fall through */
      }
    }
  } catch (err) {
    logger.warn({ err: String(err) }, "culture cache lookup failed");
  }

  // Miss → call AI.
  try {
    const notes = await culture({
      sourceMeta: { kind: "youtube", title: sourceTitle, lang: sourceLang },
      lines: markConfidential(lines),
      nativeLang,
      userId,
    });

    // Persist notes (not the lines). Note text is our own writing.
    try {
      await prisma.cultureNoteCache.upsert({
        where: {
          sourceId_lineHash_sourceLang_nativeLang: {
            sourceId,
            lineHash,
            sourceLang,
            nativeLang,
          },
        },
        update: {
          notesJson: JSON.stringify(notes),
          freshness: new Date(),
        },
        create: {
          sourceId,
          lineHash,
          sourceLang,
          nativeLang,
          notesJson: JSON.stringify(notes),
        },
      });
    } catch (err) {
      logger.warn({ err: String(err) }, "culture cache upsert failed");
    }

    return Response.json({ notes, _cache: "miss" });
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
          message: "Those notes were blocked by the content filter.",
        },
        { status: 422 },
      );
    }
    logger.error({ err: String(err) }, "culture route failed");
    return Response.json({ error: "AI_UPSTREAM_FAILED" }, { status: 500 });
  }
});
