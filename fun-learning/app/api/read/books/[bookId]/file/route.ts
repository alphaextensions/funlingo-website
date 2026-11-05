// GET /api/read/books/[bookId]/file — serve the raw EPUB bytes for an
// uploaded book owned by the requesting user. Classics are NOT served here —
// the reader fetches those directly from the publisher URL in the client, so
// the bytes never pass through our server (keeps us out of a redistribution
// posture, LEGAL §openly-licensed-books).

import { readFile, stat } from "node:fs/promises";
import { prisma } from "@/server/db";
import { auth } from "@/server/auth";

export async function GET(
  req: Request,
  context: { params: Promise<{ bookId: string }> },
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }
  const { bookId } = await context.params;

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.source !== "upload" || book.ownerUserId !== userId) {
    return Response.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  try {
    await stat(book.contentRef);
  } catch {
    return Response.json({ error: "FILE_MISSING" }, { status: 410 });
  }
  const bytes = await readFile(book.contentRef);
  return new Response(bytes, {
    status: 200,
    headers: {
      "content-type": "application/epub+zip",
      "cache-control": "private, max-age=3600",
    },
  });
}
