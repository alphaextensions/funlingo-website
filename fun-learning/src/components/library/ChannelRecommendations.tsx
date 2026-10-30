"use client";

/**
 * Wave 6 — curated YouTube channel recommendation grid.
 *
 * Rows come from the YtChannelRec table (seeded from data/seed/yt-channels.json)
 * filtered by the learner's active language. Server component passes the rows
 * + a Set of already-followed channel ids; this client component renders the
 * category chips + per-channel Follow buttons that POST to /api/follows.
 *
 * No data lives in the client until the user acts — the server has already
 * done the lang scoping (non-negotiable #4).
 */

import { useMemo, useState } from "react";
import { useT } from "@/lib/i18n/client";
import styles from "./Library.module.css";
import { langName } from "@/lib/i18n/langName";
import { localizeLibraryCategory } from "@/lib/i18n/contentLocalize";

export interface ChannelRow {
  channelId: string;
  categorySlug: string;
  handle: string | null;
  displayName: string;
  blurb: string;
  subscriberBand: string | null;
  verified: boolean;
}

export interface CategoryRow {
  slug: string;
  label: string;
}

interface Props {
  channels: ChannelRow[];
  categories: CategoryRow[];
  followedIds: string[];
  lang: string;
  isAuthed: boolean;
}

export function ChannelRecommendations({
  channels,
  categories,
  followedIds,
  lang,
  isAuthed,
}: Props) {
  const t = useT();
  const [selected, setSelected] = useState<string>("all");
  const [followed, setFollowed] = useState<Set<string>>(new Set(followedIds));
  const [pending, setPending] = useState<Set<string>>(new Set());

  const visible = useMemo(() => {
    if (selected === "all") return channels;
    return channels.filter((c) => c.categorySlug === selected);
  }, [selected, channels]);

  const usedCategorySlugs = useMemo(() => {
    const set = new Set(channels.map((c) => c.categorySlug));
    return categories.filter((c) => set.has(c.slug));
  }, [channels, categories]);

  async function toggleFollow(ch: ChannelRow) {
    if (!isAuthed) {
      window.location.href = "/account";
      return;
    }
    if (pending.has(ch.channelId)) return;
    const isFollowing = followed.has(ch.channelId);
    setPending((p) => new Set(p).add(ch.channelId));
    try {
      const res = await fetch("/api/follows", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `follow:${ch.channelId}:${isFollowing ? "off" : "on"}:${Date.now()}`,
        },
        body: JSON.stringify({
          kind: "youtube_channel",
          externalId: ch.channelId,
          title: ch.displayName,
          lang,
          remove: isFollowing,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setFollowed((f) => {
        const next = new Set(f);
        if (isFollowing) next.delete(ch.channelId);
        else next.add(ch.channelId);
        return next;
      });
    } catch {
      // Non-fatal: keep the UI consistent with server truth on next load.
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(ch.channelId);
        return next;
      });
    }
  }

  if (channels.length === 0) return null;

  return (
    <section className={styles.recSection} aria-label={t("library.channelsTitle")}>
      <header className={styles.recHeader}>
        <h2>{t("library.channelsTitle")}</h2>
        <p>{t("library.channelsLede", { lang: langName(lang) })}</p>
      </header>
      <nav className={styles.chipRow} aria-label={t("library.channelsFilterAria")}>
        <button
          type="button"
          className={selected === "all" ? `${styles.chip} ${styles.chipActive}` : styles.chip}
          onClick={() => setSelected("all")}
          aria-pressed={selected === "all"}
        >
          {t("library.channelsAll")}
        </button>
        {usedCategorySlugs.map((cat) => (
          <button
            type="button"
            key={cat.slug}
            className={selected === cat.slug ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            onClick={() => setSelected(cat.slug)}
            aria-pressed={selected === cat.slug}
          >
            {localizeLibraryCategory(t, cat.slug, cat.label)}
          </button>
        ))}
      </nav>
      <ul className={styles.recGrid}>
        {visible.map((ch) => {
          const isFollowing = followed.has(ch.channelId);
          const isPending = pending.has(ch.channelId);
          return (
            <li key={ch.channelId} className={styles.recCard}>
              <div className={styles.recCardHead}>
                <div className={styles.recAvatar} aria-hidden="true">
                  {ch.displayName.charAt(0)}
                </div>
                <div className={styles.recMeta}>
                  <h3>{ch.displayName}</h3>
                  <div className={styles.recSub}>
                    {ch.handle ?? ""}
                    {ch.subscriberBand ? (
                      <span className={styles.recDot} aria-hidden="true">·</span>
                    ) : null}
                    {ch.subscriberBand ? <span>{ch.subscriberBand}</span> : null}
                    {!ch.verified ? (
                      <span className={styles.recUnverified} title={t("library.podcastsUnverified")}>
                        {t("library.podcastsUnverifiedBadge")}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              <p className={styles.recBlurb}>{ch.blurb}</p>
              <div className={styles.recActions}>
                <button
                  type="button"
                  className={isFollowing ? styles.recFollowing : styles.recFollow}
                  onClick={() => toggleFollow(ch)}
                  disabled={isPending}
                  aria-pressed={isFollowing}
                >
                  {isPending ? "…" : isFollowing ? t("library.channelFollowing") : t("library.channelFollow")}
                </button>
                <a
                  className={styles.recVisit}
                  href={`https://www.youtube.com/channel/${encodeURIComponent(ch.channelId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("library.channelVisit")}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
