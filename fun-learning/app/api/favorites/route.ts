/**
 * POST /api/favorites — toggle favorite on a Source for the current user.
 * Idempotent via Idempotency-Key header.
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
  const existing = await prisma.favorite.findUnique({
    where: { userId_sourceId: { userId, sourceId: body.sourceId } },
  });
  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return Response.json({ ok: true, favorited: false });
  }
  await prisma.favorite.create({ data: { userId, sourceId: body.sourceId } });
  return Response.json({ ok: true, favorited: true });
});
