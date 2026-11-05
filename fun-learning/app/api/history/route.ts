/**
 * POST /api/history — upsert "I just opened this source" row.
 * Watch lane will call this when the player boots.
 */

import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";

interface Body {
  sourceId?: string;
}

export const POST = withIdempotency(async (req, { userId }) => {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "INVALID_JSON" }, { status: 400 });
  }
  if (!body.sourceId) {
    return Response.json({ error: "sourceId required" }, { status: 400 });
  }
  await prisma.historyEntry.upsert({
    where: { userId_sourceId: { userId, sourceId: body.sourceId } },
    create: { userId, sourceId: body.sourceId },
    update: { lastOpenedAt: new Date() },
  });
  return Response.json({ ok: true });
});

/**
 * DELETE /api/history — remove a history entry. Rate-limited by idempotency.
 */
export const DELETE = withIdempotency(async (req, { userId }) => {
  const { sourceId } = (await safeJson(req)) as { sourceId?: string };
  if (!sourceId) return Response.json({ error: "sourceId required" }, { status: 400 });
  await prisma.historyEntry.deleteMany({ where: { userId, sourceId } });
  return Response.json({ ok: true });
});

async function safeJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return {};
  }
}
