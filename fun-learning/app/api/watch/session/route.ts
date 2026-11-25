/**
 * POST /api/watch/session
 *
 * Upserts the user's VideoSession row for this (userId, sourceId, lang).
 * Called every 15s by the client as a progress heartbeat. No caption text.
 */

import { z } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  sourceId: z.string().min(1).max(200),
  lang: z.string().min(2).max(10),
  positionSec: z.number().int().min(0),
  mode: z.enum(["default", "focus", "cinema"]).default("default"),
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

  const { sourceId, lang, positionSec, mode } = parsed.data;

  // Only persist for real sources (demo is in-memory).
  if (sourceId === "demo") {
    return Response.json({ ok: true, persisted: false });
  }

  try {
    const existing = await prisma.videoSession.findFirst({
      where: { userId, sourceId, lang },
      orderBy: { lastPulseAt: "desc" },
    });
    if (existing) {
      await prisma.videoSession.update({
        where: { id: existing.id },
        data: {
          positionSec,
          mode,
          lastPulseAt: new Date(),
          percent:
            existing.durationSec && existing.durationSec > 0
              ? Math.min(1, positionSec / existing.durationSec)
              : existing.percent,
        },
      });
    } else {
      await prisma.videoSession.create({
        data: { userId, sourceId, lang, positionSec, mode },
      });
    }
    return Response.json({ ok: true });
  } catch (err) {
    logger.error({ err: String(err) }, "watch session upsert failed");
    return Response.json({ error: "UPSERT_FAILED" }, { status: 500 });
  }
});
