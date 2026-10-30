/**
 * /library/podcasts — podcast feed (SPEC §5.2).
 *
 * Wave 6: this tab now surfaces hand-curated podcast *shows* (RSS feeds)
 * seeded from data/seed/podcasts.json. We never download episodes — the
 * card hands the learner the feed URL + "Open in your podcast app" so they
 * play audio in their own player (LEGAL rule 4: no episode downloads).
 *
 * Follow table remains the source of truth for who follows what.
 */

import Link from "next/link";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { LibraryTabs } from "@/components/library/LibraryTabs";
import { EmptyState } from "@/components/EmptyState";
import styles from "@/components/library/Library.module.css";
import podcastsJson from "../../../data/seed/podcasts.json";
import { langName } from "@/lib/i18n/langName";
import { localizeLibraryCategory } from "@/lib/i18n/contentLocalize";

export const dynamic = "force-dynamic";

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

interface PodcastsJson {
  categories: Array<{ slug: string; label: string }>;
  entries: Array<{
    lang: string;
    categorySlug: string;
    title: string;
    feedUrl: string;
    coverUrl: string | null;
    description: string;
    verified: boolean;
  }>;
}

async function loadRecShows(lang: string) {
  // Shows live in Source rows (type="podcast_show") seeded by scripts/
  // seed-podcasts.ts. If seeding hasn't run yet (fresh clone), fall back to
  // the bundled JSON so the tab still populates.
  const dbShows = await prisma.source
    .findMany({
      where: { type: "podcast_show", lang },
      orderBy: { createdAt: "asc" },
    })
    .catch(() => []);
  if (dbShows.length > 0) {
    return dbShows.map((s) => {
      const meta = s.meta ? safeJson(s.meta) : null;
      return {
        externalId: s.externalId ?? s.id,
        title: s.title,
        description: (meta?.description as string | undefined) ?? "",
        feedUrl: (meta?.feedUrl as string | undefined) ?? "",
        coverUrl: (meta?.coverUrl as string | undefined) ?? null,
        categorySlug: (meta?.categorySlug as string | undefined) ?? "other",
        verified: Boolean(meta?.verified),
      };
    });
  }
  const data = podcastsJson as unknown as PodcastsJson;
  return data.entries
    .filter((e) => e.lang === lang)
    .map((e) => ({
      externalId: e.feedUrl,
      title: e.title,
      description: e.description,
      feedUrl: e.feedUrl,
      coverUrl: e.coverUrl,
      categorySlug: e.categorySlug,
      verified: e.verified,
    }));
}

export default async function LibraryPodcastsPage() {
  const viewer = await getViewer();
  const t = getT(viewer);
  const episodes = viewer.userId
    ? await prisma.source.findMany({
        where: { type: "podcast_episode", lang: viewer.activeLang },
        orderBy: { createdAt: "desc" },
        take: 24,
      })
    : [];
  const shows = await loadRecShows(viewer.activeLang);
  const categories = (podcastsJson as unknown as PodcastsJson).categories;
  const categoryLabelBySlug = new Map(categories.map((c) => [c.slug, c.label]));
  const shownCategorySlugs = new Set(shows.map((s) => s.categorySlug));
  const visibleCategories = categories.filter((c) => shownCategorySlugs.has(c.slug));

  return (
    <>
      <PageHeader
        eyebrow={t("library.eyebrow")}
        title={t("library.podcastsTitle")}
        lede={t("library.podcastsLede")}
      />
      <LibraryTabs />

      <section className={styles.pasteRow} aria-label={t("library.podcastsPasteAria")}>
        <label htmlFor="pod-paste" className="hidden">
          {t("library.podcastsPasteAria")}
        </label>
        <input
          id="pod-paste"
          type="url"
          placeholder={t("library.podcastsPastePlaceholder")}
          inputMode="url"
          autoComplete="off"
        />
        <button type="button">{t("library.podcastsOpenShow")}</button>
      </section>

      {episodes.length === 0 ? (
        <EmptyState
          eyebrow={t("library.podcastsEmptyEyebrow")}
          title={t("library.podcastsEmptyTitle")}
          body={t("library.podcastsEmptyBody")}
          actions={[{ href: "/library" as never, label: t("library.podcastsBackToVideos"), variant: "secondary" }]}
        />
      ) : (
        <section className={styles.grid} aria-label={t("library.podcastsEpisodesAria")}>
          {episodes.map((s) => {
            const meta = s.meta ? safeJson(s.meta) : null;
            const show = (meta?.show as string | undefined) ?? "Podcast";
            const art = (meta?.art as string | undefined) ?? null;
            return (
              <Link
                key={s.id}
                href={{ pathname: `/watch/${s.id}` } as never}
                className={styles.videoCard}
              >
                <div className={styles.vThumb}>
                  {art && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={art} alt="" />
                  )}
                  {s.level && <span className={styles.vThumbBadge}>{s.level}</span>}
                </div>
                <div className={styles.vMeta}>
                  <span className={styles.vTitle}>{s.title}</span>
                  <span className={styles.vSub}>{show}</span>
                </div>
              </Link>
            );
          })}
        </section>
      )}

      {shows.length > 0 ? (
        <section className={styles.recSection} aria-label={t("library.podcastsRecommendedAria")}>
          <header className={styles.recHeader}>
            <h2>{t("library.podcastsRecommendedTitle", { lang: langName(viewer.activeLang) })}</h2>
            <p>{t("library.podcastsRecommendedLede")}</p>
          </header>
          <nav className={styles.chipRow} aria-label={t("library.podcastsCategoriesAria")}>
            {visibleCategories.map((cat) => (
              <span key={cat.slug} className={styles.chip}>
                {localizeLibraryCategory(t, cat.slug, cat.label)}
              </span>
            ))}
          </nav>
          <ul className={styles.recGrid}>
            {shows.map((s) => (
              <li key={s.externalId} className={styles.recCard}>
                <div className={styles.recCardHead}>
                  <div className={styles.recAvatar} aria-hidden="true">
                    {s.title.charAt(0)}
                  </div>
                  <div className={styles.recMeta}>
                    <h3>{s.title}</h3>
                    <div className={styles.recSub}>
                      <span>
                        {localizeLibraryCategory(
                          t,
                          s.categorySlug,
                          categoryLabelBySlug.get(s.categorySlug) ?? s.categorySlug,
                        )}
                      </span>
                      {!s.verified ? (
                        <span className={styles.recUnverified} title={t("library.podcastsUnverified")}>
                          {t("library.podcastsUnverifiedBadge")}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className={styles.recBlurb}>{s.description}</p>
                <div className={styles.recActions}>
                  <a
                    className={styles.recFollow}
                    href={s.feedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("library.podcastsOpenFeed")}
                  </a>
                  <a
                    className={styles.recVisit}
                    href={`https://podcasts.apple.com/search?term=${encodeURIComponent(s.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("library.podcastsFindApple")}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
