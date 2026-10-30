/**
 * Wave 17 — "Recently watched" on /library (popup Recent Watches port):
 * top 3, newest first, lang-scoped.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { loadRecentWatches } from "@/server/library/recent";

describe("Wave 17 — loadRecentWatches", () => {
  let userId: string;
  const sourceIds: string[] = [];
  beforeEach(async () => {
    const u = await prisma.user.create({
      data: { email: `w17r-${Date.now()}-${Math.random()}@test.local` },
    });
    userId = u.id;
  });
  afterEach(async () => {
    await prisma.videoSession.deleteMany({ where: { userId } });
    await prisma.source.deleteMany({ where: { id: { in: sourceIds } } });
    await prisma.user.delete({ where: { id: userId } }).catch(() => {});
  });

  it("returns the 3 most recent sessions for the active language only", async () => {
    const base = Date.now();
    for (let i = 0; i < 5; i += 1) {
      const src = await prisma.source.create({
        data: {
          type: "youtube_video",
          title: `Video ${i}`,
          lang: i === 4 ? "ja" : "es",
          meta: JSON.stringify({ channel: "Chan", thumbnail: "https://i.ytimg.com/x.jpg" }),
        },
      });
      sourceIds.push(src.id);
      await prisma.videoSession.create({
        data: {
          userId,
          sourceId: src.id,
          lang: i === 4 ? "ja" : "es",
          percent: 0.5,
          lastPulseAt: new Date(base + i * 1000),
        },
      });
    }
    const rows = await loadRecentWatches(userId, "es");
    expect(rows.map((r) => r.title)).toEqual(["Video 3", "Video 2", "Video 1"]);
    expect(rows[0]).toMatchObject({ channel: "Chan", percent: 0.5, sourceType: "youtube_video" });
    const ja = await loadRecentWatches(userId, "ja");
    expect(ja.map((r) => r.title)).toEqual(["Video 4"]);
  });
});
