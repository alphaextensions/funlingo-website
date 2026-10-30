// POST /api/read/encounters — save a word encounter from a book.
//
// A user tapping a word in the reader creates:
//   1. A UserWord (lemma, lang, state="learning") if they don't already have
//      one for that lemma + lang.
//   2. An Encounter linking the UserWord to the Book (as a Source) with the
//      page/CFI as the "line" the word appeared in.
//
// The sentence line IS stored — SPEC §16: "The user's own saved line as a
// personal note, private to the user." That's explicitly carved out from the
// caption-text rule (LEGAL §User's saved lines). Books are our own text
// (uploads) or openly licensed (classics/graded) so there's no caption-text
// confidentiality concern either way.
//
// Idempotency: wrapped. A client retry with the same Idempotency-Key does
// not create a duplicate encounter.

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { CLASSICS, GRADED_READERS } from "@/lib/read/catalog";

const schema = z.object({
  bookId: z.string().min(1).max(200),
  lemma: z.string().min(1).max(200),
  // The CFI / page offset where the word was tapped — stored as the
  // encounter timestamp proxy. Reader uses this for jump-back.
  location: z.string().min(1).max(2_000),
  // The sentence containing the tapped word — the user's own saved line.
  line: z.string().min(1).max(2_000),
  translation: z.string().max(2_000).optional(),
  // Book language (same as UserWord.lang).
  lang: z.string().min(2).max(10),
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

  // Make sure the book exists in the DB (and belongs to the user if it's an
  // upload). Lazily seed the catalog books so FK constraints hold.
  const bookRow = await prisma.book.findUnique({ where: { id: parsed.data.bookId } });
  if (!bookRow) {
    const classic = CLASSICS.find((c) => c.key === parsed.data.bookId);
    const graded = GRADED_READERS.find((g) => g.key === parsed.data.bookId);
    if (!classic && !graded) {
      return Response.json({ error: "UNKNOWN_BOOK" }, { status: 404 });
    }
    await prisma.book.create({
      data: classic
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

  // Make / find a UserWord for this lemma+lang.
  const userWord = await prisma.userWord.findFirst({
    where: { userId, lemma: parsed.data.lemma, lang: parsed.data.lang },
  });
  const uw =
    userWord ??
    (await prisma.userWord.create({
      data: {
        userId,
        lemma: parsed.data.lemma,
        lang: parsed.data.lang,
        state: "learning",
      },
    }));

  // Make / find a Source row for this book so Encounter.sourceId resolves.
  const source = await prisma.source.upsert({
    where: { id: `book:${parsed.data.bookId}` },
    update: {},
    create: {
      id: `book:${parsed.data.bookId}`,
      type: "book",
      externalId: parsed.data.bookId,
      title: "", // filled in by a bookkeeping job later; not critical here
      lang: parsed.data.lang,
    },
  });

  const encounter = await prisma.encounter.create({
    data: {
      userWordId: uw.id,
      userId,
      sourceId: source.id,
      platform: "book",
      lang: parsed.data.lang,
      line: parsed.data.line,
      translation: parsed.data.translation ?? null,
    },
  });

  return Response.json({
    encounterId: encounter.id,
    userWordId: uw.id,
    savedAt: encounter.savedAt,
  });
});
