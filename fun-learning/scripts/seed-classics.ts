/**
 * Wave 6 — seed Classics into Prisma Book rows.
 *
 * Idempotent: upserts on `id` (we use the entry's `key` so re-running the
 * script never duplicates). No book text ever lives in the DB (LEGAL) —
 * only the metadata and the public streamUrl.
 *
 *   pnpm tsx scripts/seed-classics.ts
 */

import { PrismaClient } from "@prisma/client";
import classics from "../data/seed/classics.json";

const prisma = new PrismaClient();

interface Entry {
  key: string;
  title: string;
  author: string;
  lang: string;
  level: string;
  genre?: string;
  licence: string;
  source: string;
  streamUrl: string;
  coverUrl: string | null;
  credits: { publisher: string; publisherUrl: string };
  verified?: boolean;
}

interface Json {
  _about?: string;
  entries: Entry[];
}

async function main() {
  const data = classics as unknown as Json;
  let created = 0;
  let updated = 0;
  for (const e of data.entries) {
    const existing = await prisma.book.findUnique({ where: { id: e.key } });
    const payload = {
      id: e.key,
      source: "classics",
      title: e.title,
      author: e.author,
      lang: e.lang,
      level: e.level,
      licence: e.licence,
      credits: JSON.stringify({
        publisher: e.credits.publisher,
        publisherUrl: e.credits.publisherUrl,
        genre: e.genre ?? null,
      }),
      coverUrl: e.coverUrl,
      sourceUrl: e.streamUrl,
      // contentRef is the SAME public URL — the reader streams from here at
      // render time. We NEVER cache or copy the book's text.
      contentRef: e.streamUrl,
    };
    if (existing) {
      await prisma.book.update({ where: { id: e.key }, data: payload });
      updated += 1;
    } else {
      await prisma.book.create({ data: payload });
      created += 1;
    }
  }
  console.log(`[seed-classics] total=${data.entries.length} created=${created} updated=${updated}`);
}

main()
  .catch((err) => {
    console.error("[seed-classics] failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
