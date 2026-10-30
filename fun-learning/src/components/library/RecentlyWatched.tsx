/**
 * RecentlyWatched — Wave 17 port of the extension popup's "Recent Watches"
 * (top 3, thumbnail, "Watch again"). Server component; renders nothing
 * when the learner hasn't watched anything in this language yet.
 */

import Link from "next/link";
import type { RecentWatch } from "@/server/library/recent";
import styles from "./Library.module.css";

/** English copy (Wave 14 owns the catalog — listed in the playbook). */
export const RECENT_STR = {
  title: "Recently watched",
  sub: "Pick up where you left off.",
  watchAgain: "Watch again",
  resume: (pct: number) => `Resume · ${pct}% watched`,
} as const;

const SOURCE_LABEL: Record<string, string> = {
  youtube_video: "YouTube",
  podcast_episode: "Podcast",
  upload: "Your upload",
};

export function RecentlyWatched({ items }: { items: RecentWatch[] }) {
  if (items.length === 0) return null;
  return (
    <section className={styles.recentSection} aria-labelledby="recent-watches">
      <div className={styles.recHeader}>
        <h2 id="recent-watches">{RECENT_STR.title}</h2>
        <p>{RECENT_STR.sub}</p>
      </div>
      <div className={styles.grid}>
        {items.map((v) => {
          const pct = Math.round(v.percent * 100);
          const finished = pct >= 95;
          const source = SOURCE_LABEL[v.sourceType] ?? null;
          return (
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
                  <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={{ margin: "auto", display: "block", height: "100%" }}>
                    <path d="M8 5l12 7-12 7z" />
                  </svg>
                )}
                {pct > 0 && (
                  <span
                    className={styles.vProgress}
                    style={{ inlineSize: `${pct}%` }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className={styles.vMeta}>
                <span className={styles.vTitle}>{v.title}</span>
                <span className={styles.vSub}>
                  {[v.channel, source].filter(Boolean).join(" · ")}
                </span>
                <span className={styles.vSub}>
                  {finished || pct === 0 ? RECENT_STR.watchAgain : RECENT_STR.resume(pct)} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
