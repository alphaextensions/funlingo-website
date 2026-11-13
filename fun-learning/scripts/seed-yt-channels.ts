/**
 * Wave 6 — seed curated YouTube channel recommendations.
 *
 * Idempotent: upserts on the composite unique (lang, channelId). A single
 * channel can appear in more than one language (e.g. Easy Spanish may serve
 * both es and en learners), so lang is part of the key.
 *
 *   pnpm tsx scripts/seed-yt-channels.ts
 */

import { PrismaClient } from "@prisma/client";
import ytc from "../data/seed/yt-channels.json";

const prisma = new PrismaClient();

interface Entry {
  lang: string;
  categorySlug: string;
  channelId: string;
  handle: string | null;
  displayName: string;
  blurb: string;
  subscriberBand: string | null;
  verified: boolean;
}

interface Json {
  categories: Array<{ slug: string; label: string }>;
  entries: Entry[];
}

async function main() {
  const data = ytc as unknown as Json;
  let created = 0;
  let updated = 0;
  // Use `any` for the dynamically-added client — the compiler sees the
  // client regenerate during build, but a fresh clone may not yet have it.
  // The seed script is for environments where migrate has already run.
  const client = prisma as unknown as {
    ytChannelRec: {
      findUnique: (args: unknown) => Promise<unknown>;
      create: (args: unknown) => Promise<unknown>;
      update: (args: unknown) => Promise<unknown>;
    };
  };
  for (let i = 0; i < data.entries.length; i += 1) {
    const e = data.entries[i];
    const existing = await client.ytChannelRec.findUnique({
      where: { lang_channelId: { lang: e.lang, channelId: e.channelId } },
    });
    const payload = {
      lang: e.lang,
      categorySlug: e.categorySlug,
      channelId: e.channelId,
      handle: e.handle,
      displayName: e.displayName,
      blurb: e.blurb,
      subscriberBand: e.subscriberBand,
      verified: e.verified,
      order: i,
    };
    if (existing) {
      await client.ytChannelRec.update({
        where: { lang_channelId: { lang: e.lang, channelId: e.channelId } },
        data: payload,
      });
      updated += 1;
    } else {
      await client.ytChannelRec.create({ data: payload });
      created += 1;
    }
  }
  console.log(`[seed-yt-channels] total=${data.entries.length} created=${created} updated=${updated}`);
}

main()
  .catch((err) => {
    console.error("[seed-yt-channels] failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
