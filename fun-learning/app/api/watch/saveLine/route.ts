/**
 * POST /api/watch/saveLine
 *
 * Wave 16 — "Save this line" (SPEC §6.4 heart / §6.6 Cmd/Ctrl+S). Before
 * this wave the shortcut saved the line's FIRST WORD.
 *
 * LEGAL split (same gate as /api/watch/saveWord, `src/lib/watch/drm.ts`):
 *   - YouTube / streaming / podcast sources: we store ONLY sourceId +
 *     timestamp as a word-less Encounter ("saved moment"). The caption text
 *     is dropped on the floor here, even though the client sends it.
 *   - Our own / openly licensed sources (demo, packs, uploads): a private
 *     `Sentence` row with the text, in the user's "favorite" list.
 *
 * Lang-scoped + idempotency-wrapped. Re-saving the same moment is a no-op.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";
import { mayPersistLine } from "@/lib/watch/drm";

const schema = z.object({
  sourceId: z.string().min(1).max(200),
  sourceType: z.string().min(1).max(40),
  lang: z.string().min(2).max(10),
  timestampSec: z.number().int().min(0),
  line: z.string().min(1).max(2000),
  translation: z.string().max(2000).optional(),
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
  const { sourceId, sourceType, lang, timestampSec, line, translation } = parsed.data;
  const isDemo = sourceId === "demo";

  try {
    if (!isDemo) {
      const src = await prisma.source.findUnique({ where: { id: sourceId }, select: { id: true } });
      if (!src) return Response.json({ error: "SOURCE_NOT_FOUND" }, { status: 404 });
    }

    if (!mayPersistLine(sourceType)) {
      // Third-party captions: timestamp only, NEVER the text.
      const existing = await prisma.encounter.findFirst({
        where: { userId, lang, sourceId, timestampSec, userWordId: null },
        select: { id: true },
      });
      if (existing) return Response.json({ ok: true, kind: "moment", id: existing.id, storedLine: false });
      const row = await prisma.encounter.create({
        data: {
          userId,
          sourceId,
          lang,
          platform: sourceType,
          timestampSec,
          userWordId: null,
          line: "",
          translation: null,
        },
        select: { id: true },
      });
      return Response.json({ ok: true, kind: "moment", id: row.id, storedLine: false });
    }

    const sentenceSourceId = isDemo ? null : sourceId;
    const existing = await prisma.sentence.findFirst({
      where: { userId, lang, sourceId: sentenceSourceId, text: line },
      select: { id: true },
    });
    if (existing) return Response.json({ ok: true, kind: "sentence", id: existing.id, storedLine: true });
    const row = await prisma.sentence.create({
      data: {
        userId,
        sourceId: sentenceSourceId,
        lang,
        text: line,
        translation: translation ?? null,
        timestampSec,
        lists: "favorite",
      },
      select: { id: true },
    });
    return Response.json({ ok: true, kind: "sentence", id: row.id, storedLine: true });
  } catch (err) {
    logger.error({ err: String(err) }, "saveLine failed");
    return Response.json({ error: "SAVE_LINE_FAILED" }, { status: 500 });
  }
});
