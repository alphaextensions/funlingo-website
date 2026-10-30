// POST /api/read/position — upsert reading position (CFI + percent) for a
// book. Debounced on the client, idempotency-wrapped on the server.
//
// SPEC §16: ReadingPosition keyed by (userId, bookId).
// AGENT-PLAYBOOK rule 1: this is a write POST → wrapped with withIdempotency.

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { CLASSICS, GRADED_READERS } from "@/lib/read/catalog";

const schema = z.object({
  bookId: z.string().min(1).max(200),
  // "location" is a CFI string for EPUBs or a `graded:<key>:<page>` token for
  // the hard-coded graded readers.
  location: z.string().min(1).max(2_000),
  percent: z.number().min(0).max(100),
  // How many extra seconds of reading happened in this debounce window —
  // added to the running `secondsRead` tally for stats.
  secondsReadDelta: z.number().min(0).max(60 * 60).default(0),
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

  // Make sure the book exists — either in the catalog (classics/graded) or
  // in the DB (an uploaded book owned by this user). Also lazily create the
  // Book row for the catalog so FK constraints line up.
  const bookId = parsed.data.bookId;
  const bookRow = await prisma.book.findUnique({ where: { id: bookId } });
  if (!bookRow) {
    const classic = CLASSICS.find((c) => c.key === bookId);
    const graded = GRADED_READERS.find((g) => g.key === bookId);
    if (!classic && !graded) {
      return Response.json({ error: "UNKNOWN_BOOK" }, { status: 404 });
    }
    await prisma.book.upsert({
      where: { id: bookId },
      update: {},
      create: classic
        ? {
            id: classic.key,
            source: classic.source,
            title: classic.title,
            author: classic.author,
            lang: classic.lang,
            level: classic.level,
            licence: classic.licence,
            coverUrl: classic.coverUrl,
            sourceUrl: classic.streamUrl,
            credits: JSON.stringify(classic.credits),
            contentRef: classic.streamUrl,
          }
        : {
            id: graded!.key,
            source: "graded",
            title: graded!.title,
            author: graded!.author,
            lang: graded!.lang,
            level: graded!.level,
            licence: graded!.licence,
            contentRef: graded!.key,
          },
    });
  } else if (bookRow.source === "upload" && bookRow.ownerUserId !== userId) {
    return Response.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const position = await prisma.readingPosition.upsert({
    where: { userId_bookId: { userId, bookId } },
    update: {
      location: parsed.data.location,
      percent: parsed.data.percent,
      secondsRead: { increment: parsed.data.secondsReadDelta },
    },
    create: {
      userId,
      bookId,
      location: parsed.data.location,
      percent: parsed.data.percent,
      secondsRead: parsed.data.secondsReadDelta,
    },
  });

  return Response.json({
    bookId,
    location: position.location,
    percent: position.percent,
    secondsRead: position.secondsRead,
    updatedAt: position.updatedAt,
  });
});

export async function GET(req: Request) {
  // Keep this simple: GET /api/read/position?bookId=…
  const url = new URL(req.url);
  const bookId = url.searchParams.get("bookId");
  if (!bookId) return Response.json({ position: null });

  const { auth } = await import("@/server/auth");
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return Response.json({ position: null });

  const position = await prisma.readingPosition.findUnique({
    where: { userId_bookId: { userId, bookId } },
  });
  return Response.json({ position });
}
