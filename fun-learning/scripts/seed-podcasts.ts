/**
 * Wave 6 — seed curated podcast shows.
 *
 * Stored as Source rows with `type="podcast_show"`. externalId is the feed
 * URL (RSS/Atom). We NEVER download episodes (LEGAL rule 4). The podcasts
 * tab renders these rows and offers "Open feed" to the learner's own
 * podcast app.
 *
 * Idempotent: upserts on a deterministic `id` derived from the feed URL.
 *
 *   pnpm tsx scripts/seed-podcasts.ts
 */

import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";
import podcasts from "../data/seed/podcasts.json";

const prisma = new PrismaClient();

interface Entry {
  lang: string;
  categorySlug: string;
  title: string;
  feedUrl: string;
  coverUrl: string | null;
  description: string;
  verified: boolean;
}

interface Json {
  categories: Array<{ slug: string; label: string }>;
  entries: Entry[];
}

function stableId(feedUrl: string): string {
  const hash = createHash("sha1").update(feedUrl).digest("hex").slice(0, 16);
  return `podcast:${hash}`;
}

async function main() {
  const data = podcasts as unknown as Json;
  let created = 0;
  let updated = 0;
  for (const e of data.entries) {
    const id = stableId(e.feedUrl);
    const payload = {
      id,
      type: "podcast_show",
      externalId: e.feedUrl,
      title: e.title,
      lang: e.lang,
      meta: JSON.stringify({
        feedUrl: e.feedUrl,
        coverUrl: e.coverUrl,
        description: e.description,
        categorySlug: e.categorySlug,
        verified: e.verified,
      }),
    };
    const existing = await prisma.source.findUnique({ where: { id } });
    if (existing) {
      await prisma.source.update({ where: { id }, data: payload });
      updated += 1;
    } else {
      await prisma.source.create({ data: payload });
      created += 1;
    }
  }
  console.log(`[seed-podcasts] total=${data.entries.length} created=${created} updated=${updated}`);
}

main()
  .catch((err) => {
    console.error("[seed-podcasts] failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
