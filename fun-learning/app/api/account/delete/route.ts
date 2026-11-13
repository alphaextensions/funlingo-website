/**
 * POST /api/account/delete — soft-delete; actual purge runs within 7 days
 * per SPEC §13 account settings.
 */

import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";

export const POST = withIdempotency(async (_req, { userId }) => {
  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  });
  return Response.json({ ok: true, deletedAt: new Date().toISOString() });
});
