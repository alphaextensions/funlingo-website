/**
 * /library — YouTube feed (SPEC §5.1).
 *
 * Default tab under /library. The three sibling tabs are podcasts,
 * show-packs, and sentence-packs.
 */

import Link from "next/link";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT, chromeLocale } from "@/server/i18n";
import { pageClientSlice, LIBRARY_KEY_PREFIXES } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";
import { PageHeader } from "@/components/PageHeader";
import { LibraryTabs } from "@/components/library/LibraryTabs";
import { YouTubePaste } from "@/components/library/YouTubePaste";
import { LibraryEmptyActions } from "@/components/library/LibraryEmptyActions";
import { EmptyState } from "@/components/EmptyState";
import { ChannelRecommendations } from "@/components/library/ChannelRecommendations";
import { RecentlyWatched } from "@/components/library/RecentlyWatched";
import { loadRecentWatches } from "@/server/library/recent";
import ytChannelsJson from "../../data/seed/yt-channels.json";
import styles from "@/components/library/Library.module.css";

export const dynamic = "force-dynamic";

interface VideoCard {
  sourceId: string;
  title: string;
  channel: string;
  thumbnail: string | null;
  durationSec: number | null;
  level: string | null;
}

async function loadFollowedVideos(userId: string, lang: string): Promise<VideoCard[]> {
  // v1: videos are stored as Source rows (type youtube_video) with meta JSON
  // carrying the channel name + thumbnail. The extension handoff lane will
  // populate these on the user's behalf.
  const sources = await prisma.source.findMany({
    where: { type: "youtube_video", lang },
    orderBy: { createdAt: "desc" },
    take: 24,
  });
  // Scope: the "followed" cut uses Follow(kind=youtube_channel).
  const follows = await prisma.follow.findMany({
    where: { userId, kind: "youtube_channel" },
    select: { externalId: true },
  });
  const followedChannels = new Set(follows.map((f) => f.externalId));
  const picked = sources.filter((s) => {
    if (followedChannels.size === 0) return true;
    const meta = s.meta ? safeJson(s.meta) : null;
    const channelId = meta?.channelId as string | undefined;
    return channelId ? followedChannels.has(channelId) : true;
  });
  return picked.map((s) => {
    const meta = s.meta ? safeJson(s.meta) : null;
    return {
      sourceId: s.id,
      title: s.title,
      channel: (meta?.channel as string | undefined) ?? "Unknown channel",
      thumbnail: (meta?.thumbnail as string | undefined) ?? null,
      durationSec: s.durationSec,
      level: s.level,
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

function fmtDuration(sec: number | null): string {
  if (!sec) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface YtChannelJson {
  categories: Array<{ slug: string; label: string }>;
  entries: Array<{
    lang: string;
    categorySlug: string;
    channelId: string;
    handle: string | null;
    displayName: string;
    blurb: string;
    subscriberBand: string | null;
    verified: boolean;
  }>;
}

async function loadChannelRecs(lang: string, userId: string | null) {
  // Prefer the DB (seeded by scripts/seed-yt-channels.ts) so a future
  // dashboard can edit titles / blurbs without a redeploy. Fall back to the
  // bundled JSON if seeding hasn't run yet (e.g. a fresh clone).
  const client = prisma as unknown as {
    ytChannelRec?: {
      findMany: (args: unknown) => Promise<Array<{
        channelId: string;
        categorySlug: string;
        handle: string | null;
        displayName: string;
        blurb: string;
        subscriberBand: string | null;
        verified: boolean;
      }>>;
    };
  };
  const seeded = client.ytChannelRec;
  let channels: Array<{
    channelId: string;
    categorySlug: string;
    handle: string | null;
    displayName: string;
    blurb: string;
    subscriberBand: string | null;
    verified: boolean;
  }> = [];
  try {
    if (seeded) {
      channels = await seeded.findMany({
        where: { lang },
        orderBy: [{ categorySlug: "asc" }, { order: "asc" }, { displayName: "asc" }],
      });
    }
  } catch {
    channels = [];
  }
  if (channels.length === 0) {
    const data = ytChannelsJson as unknown as YtChannelJson;
    channels = data.entries.filter((e) => e.lang === lang).map((e) => ({
      channelId: e.channelId,
      categorySlug: e.categorySlug,
      handle: e.handle,
      displayName: e.displayName,
      blurb: e.blurb,
      subscriberBand: e.subscriberBand,
      verified: e.verified,
    }));
  }
  let followedIds: string[] = [];
  if (userId) {
    const follows = await prisma.follow.findMany({
      where: { userId, kind: "youtube_channel" },
      select: { externalId: true },
    });
    followedIds = follows.map((f) => f.externalId);
  }
  const categories = (ytChannelsJson as unknown as YtChannelJson).categories;
  return { channels, categories, followedIds };
}

export default async function LibraryYouTubePage() {
  const viewer = await getViewer();
  const t = getT(viewer);
  const videos = viewer.userId ? await loadFollowedVideos(viewer.userId, viewer.activeLang) : [];
  const recs = await loadChannelRecs(viewer.activeLang, viewer.userId);
  const recent = viewer.userId ? await loadRecentWatches(viewer.userId, viewer.activeLang) : [];

  // Lead-QA P1 — the default "YouTube" discovery tab renders client
  // sub-components (YouTubePaste, ChannelRecommendations, LibraryEmptyActions)
  // whose chrome keys on the viewer's NATIVE language. They read library.*
  // via this page-scoped provider (mirrors /settings) so the big library.*
  // slice never bloats the global one every other page carries.
  const locale = chromeLocale(viewer);
  const slice = pageClientSlice(locale, LIBRARY_KEY_PREFIXES);
  const nativeLang = viewer.user?.nativeLang ?? viewer.nativeLang ?? null;

  return (
    <I18nProvider locale={locale} nativeLang={nativeLang} slice={slice}>
      <PageHeader
        eyebrow={t("library.eyebrow")}
        title={t("library.videosTitle")}
        lede={t("library.videosLede")}
      />
      <LibraryTabs />

      <RecentlyWatched items={recent} />

      <YouTubePaste />

      {videos.length === 0 ? (
        <EmptyState
          eyebrow={t("library.videosEmptyEyebrow")}
          title={t("library.videosEmptyTitle")}
          body={t("library.videosEmptyBody")}
          actionsSlot={<LibraryEmptyActions />}
        />
      ) : (
        <section className={styles.grid} aria-label={t("library.videosAria")}>
          {videos.map((v) => (
            <Link
              key={v.sourceId}
              href={{ pathname: `/watch/${v.sourceId}` } as never}
              className={styles.videoCard}
            >
              <div className={styles.vThumb}>
                {v.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail} alt="" />
                ) : (
                  <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={{ margin: "auto", display: "block" }}>
                    <path d="M8 5l12 7-12 7z" />
                  </svg>
                )}
                {v.level && <span className={styles.vThumbBadge}>{v.level}</span>}
                {v.durationSec && <span className={styles.vThumbTime}>{fmtDuration(v.durationSec)}</span>}
              </div>
              <div className={styles.vMeta}>
                <span className={styles.vTitle}>{v.title}</span>
                <span className={styles.vSub}>{v.channel}</span>
              </div>
            </Link>
          ))}
        </section>
      )}

      <ChannelRecommendations
        channels={recs.channels}
        categories={recs.categories}
        followedIds={recs.followedIds}
        lang={viewer.activeLang}
        isAuthed={Boolean(viewer.userId)}
      />
    </I18nProvider>
  );
}
