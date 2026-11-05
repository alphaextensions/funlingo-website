// GET  /api/read/books — list classics, graded readers, and the user's own
//                        uploaded books (metadata only).
//
// Classics + graded readers come from the hard-coded catalog
// (src/lib/read/catalog.ts). The user's uploaded books live in the DB with
// contentRef pointing at a filesystem path — the actual EPUB bytes stay out
// of the DB.

import { prisma } from "@/server/db";
import { auth } from "@/server/auth";
import { CLASSICS, GRADED_READERS } from "@/lib/read/catalog";

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  const url = new URL(req.url);
  const lang = url.searchParams.get("lang");

  // Public catalog is always visible, filtered by learning language when
  // requested.
  const classics = CLASSICS
    .filter((c) => !lang || c.lang === lang)
    .map((c) => ({
      bookId: c.key,
      source: "classics",
      title: c.title,
      author: c.author,
      lang: c.lang,
      level: c.level,
      licence: c.licence,
      coverUrl: c.coverUrl,
      publisher: c.credits.publisher,
    }));

  const graded = GRADED_READERS
    .filter((g) => !lang || g.lang === lang)
    .map((g) => ({
      bookId: g.key,
      source: "graded",
      title: g.title,
      author: g.author,
      lang: g.lang,
      level: g.level,
      licence: g.licence,
      coverUrl: null,
      publisher: "Funlingo",
    }));

  // User uploads (My shelf) — only when authed.
  let myShelf: unknown[] = [];
  if (userId) {
    const rows = await prisma.book.findMany({
      where: { ownerUserId: userId, source: "upload" },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        positions: { where: { userId }, select: { percent: true, updatedAt: true } },
      },
    });
    myShelf = rows.map((b) => ({
      bookId: b.id,
      source: "upload",
      title: b.title,
      author: b.author,
      lang: b.lang,
      level: b.level,
      licence: b.licence,
      coverUrl: b.coverUrl,
      percent: b.positions[0]?.percent ?? 0,
      updatedAt: b.positions[0]?.updatedAt ?? b.createdAt,
    }));
  }

  return Response.json({ myShelf, classics, graded });
}
