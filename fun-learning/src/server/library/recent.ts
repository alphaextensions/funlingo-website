/**
 * "Recently watched" loader — Wave 17 port of the extension popup's
 * Recent Watches list (last 3 items, "Watch again").
 *
 * Reads VideoSession, which is lang-scoped (AGENT-PLAYBOOK rule 4): an
 * EN+JP learner only sees what they watched while learning the active
 * language. Only metadata (title, channel, thumbnail) is read — no
 * caption text exists in these rows.
 */

import { prisma } from "@/server/db";

export interface RecentWatch {
  sourceId: string;
  title: string;
  channel: string | null;
  thumbnail: string | null;
  sourceType: string;
  percent: number; // 0..1
  lastWatchedAt: string; // ISO
}

const RECENT_LIMIT = 3;

export async function loadRecentWatches(userId: string, lang: string): Promise<RecentWatch[]> {
  const sessions = await prisma.videoSession.findMany({
    where: { userId, lang },
    orderBy: { lastPulseAt: "desc" },
    take: RECENT_LIMIT,
    include: { source: true },
  });
  return sessions.map((s) => {
    const meta = s.source.meta ? safeJson(s.source.meta) : null;
    return {
      sourceId: s.sourceId,
      title: s.source.title,
      channel: (meta?.channel as string | undefined) ?? null,
      thumbnail: (meta?.thumbnail as string | undefined) ?? null,
      sourceType: s.source.type,
      percent: Math.max(0, Math.min(1, s.percent || 0)),
      lastWatchedAt: s.lastPulseAt.toISOString(),
    };
  });
}

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}
