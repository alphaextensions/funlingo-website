/**
 * POST /api/watch/saveWord
 *
 * Create (or no-op) a UserWord + an Encounter for the saved word.
 *
 * LEGAL rule (SPEC §6.3 + LEGAL): for YouTube/streaming the Encounter stores
 *   sourceId + timestamp + the cached WordCard — NOT the raw line.
 * For user-submitted or openly licensed sources (upload, pack, book, show
 *   pack) the Encounter may store the line as the user's own saved note.
 *
 * UserWord is `lang`-scoped per AGENT-PLAYBOOK rule 4 — set from the
 * caller's `activeLearningLang`.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";
import { DRM_SOURCE_TYPES } from "@/lib/watch/drm";

const schema = z.object({
  lemma: z.string().min(1).max(200),
  sourceId: z.string().min(1).max(200),
  captionIndex: z.number().int().min(0),
  timestampSec: z.number().int().min(0),
  line: z.string().min(1).max(2000),
  lang: z.string().min(2).max(10),
  sourceType: z.string().min(1).max(40),
});

// Wave 16: moved to `src/lib/watch/drm.ts` so `/api/watch/saveLine` shares
// the exact same gate.

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

  const { lemma, sourceId, timestampSec, line, lang, sourceType } = parsed.data;
  const lemmaKey = lemma.trim().toLowerCase();
  const persistLine = !DRM_SOURCE_TYPES.has(sourceType);

  try {
    // Verify the source exists so we don't dangle an FK.
    // The /watch route lazy-creates the Source on resolve, but we re-check
    // defensively here (demo source skips the check).
    if (sourceId !== "demo") {
      const srcExists = await prisma.source.findUnique({ where: { id: sourceId } });
      if (!srcExists) {
        return Response.json({ error: "SOURCE_NOT_FOUND" }, { status: 404 });
      }
    }

    const existing = await prisma.userWord.findFirst({
      where: { userId, lemma: lemmaKey, lang },
    });
    const userWord = existing
      ? existing
      : await prisma.userWord.create({
          data: { userId, lemma: lemmaKey, lang, state: "new" },
        });

    // Create the encounter.
    if (sourceId !== "demo") {
      await prisma.encounter.create({
        data: {
          userId,
          sourceId,
          userWordId: userWord.id,
          lang,
          platform: sourceType,
          timestampSec,
          // Line text ONLY when the source isn't streaming/DRM (LEGAL).
          line: persistLine ? line : "",
          translation: null,
        },
      });
    }

    return Response.json({
      ok: true,
      userWordId: userWord.id,
      storedLine: persistLine,
    });
  } catch (err) {
    logger.error({ err: String(err) }, "saveWord failed");
    return Response.json({ error: "SAVE_FAILED" }, { status: 500 });
  }
});
