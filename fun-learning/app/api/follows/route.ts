/**
 * POST /api/follows — add or remove a follow (channel, podcast, show).
 */

import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";

interface Body {
  kind?: "youtube_channel" | "podcast_show" | "show";
  externalId?: string;
  title?: string;
  avatarUrl?: string;
  lang?: string;
  remove?: boolean;
}

export const POST = withIdempotency(async (req, { userId }) => {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "INVALID_JSON" }, { status: 400 });
  }
  if (!body.kind || !body.externalId) {
    return Response.json({ error: "kind + externalId required" }, { status: 400 });
  }

  if (body.remove) {
    await prisma.follow.deleteMany({
      where: { userId, kind: body.kind, externalId: body.externalId },
    });
    return Response.json({ ok: true, following: false });
  }

  await prisma.follow.upsert({
    where: {
      userId_kind_externalId: {
        userId,
        kind: body.kind,
        externalId: body.externalId,
      },
    },
    create: {
      userId,
      kind: body.kind,
      externalId: body.externalId,
      title: body.title,
      avatarUrl: body.avatarUrl,
      lang: body.lang,
    },
    update: {
      title: body.title,
      avatarUrl: body.avatarUrl,
      lang: body.lang,
    },
  });
  return Response.json({ ok: true, following: true });
});
