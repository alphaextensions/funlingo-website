/**
 * Wave 6 — seed external CC-licensed graded readers into Prisma.
 *
 * Idempotent: upserts on `id` (the entry's `key`). We store ONLY metadata
 * (title, author, publisher, cover URL, source URL) — the book itself stays
 * on the publisher's own reader. The reader page's external-graded branch
 * (app/read/[bookId]/page.tsx) renders a labelled card + "Open at publisher"
 * link, satisfying CC-BY attribution.
 *
 *   pnpm tsx scripts/seed-graded.ts
 */

import { PrismaClient } from "@prisma/client";
import graded from "../data/seed/graded.json";

const prisma = new PrismaClient();

interface Entry {
  key: string;
  title: string;
  author: string;
  illustrator: string | null;
  lang: string;
  level: string;
  licence: string;
  publisher: string;
  publisherUrl: string;
  sourceUrl: string;
  coverUrl: string | null;
  summary: string;
  verified?: boolean;
}

interface Json {
  _about?: string;
  entries: Entry[];
}

async function main() {
  const data = graded as unknown as Json;
  let created = 0;
  let updated = 0;
  for (const e of data.entries) {
    const payload = {
      id: e.key,
      source: "graded",
      title: e.title,
      author: e.author,
      illustrator: e.illustrator,
      lang: e.lang,
      level: e.level,
      licence: e.licence,
      credits: JSON.stringify({
        publisher: e.publisher,
        publisherUrl: e.publisherUrl,
        illustrator: e.illustrator,
        summary: e.summary,
        verified: e.verified ?? false,
      }),
      coverUrl: e.coverUrl,
      sourceUrl: e.sourceUrl,
      contentRef: e.sourceUrl,
    };
    const existing = await prisma.book.findUnique({ where: { id: e.key } });
    if (existing) {
      await prisma.book.update({ where: { id: e.key }, data: payload });
      updated += 1;
    } else {
      await prisma.book.create({ data: payload });
      created += 1;
    }
  }
  console.log(`[seed-graded] total=${data.entries.length} created=${created} updated=${updated}`);
}

main()
  .catch((err) => {
    console.error("[seed-graded] failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
