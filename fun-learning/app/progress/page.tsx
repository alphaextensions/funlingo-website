/**
 * /progress — stats + history (SPEC §12).
 */

import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { ActivityHeatmap, type HeatmapDay } from "@/components/progress/ActivityHeatmap";
import WeakAreas from "@/components/progress/WeakAreas";
import styles from "@/components/progress/Progress.module.css";

export const dynamic = "force-dynamic";

function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Best-effort pretty name for a BCP-47 / ISO-639-1 code — used in the
 * heatmap header to signal that the main chart is lang-scoped (non-negotiable
 * #4). Falls back to upper-cased code if the runtime doesn't support
 * Intl.DisplayNames (older Node) or the code is unknown.
 */
function langNameFor(code: string): string {
  try {
    const dn = new Intl.DisplayNames(["en"], { type: "language" });
    return dn.of(code) ?? code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

async function loadForUser(userId: string, lang: string) {
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
  fiveMonthsAgo.setDate(1);
  fiveMonthsAgo.setHours(0, 0, 0, 0);

  const [activities, streak, byLang, wordsAll, sentencesAll, wordsThisWeek] = await Promise.all([
    // Main heatmap: filter by the viewer's active lang — the headline chart
    // represents study in ONE language (non-negotiable #4). The per-language
    // card below (`byLang`) is where the user sees the cross-lang breakdown.
    prisma.activity.findMany({
      where: { userId, lang, date: { gte: fiveMonthsAgo } },
      orderBy: { date: "asc" },
    }),
    prisma.streak.findUnique({ where: { userId_lang: { userId, lang } } }),
    // cross-lang on purpose: `byLang` is the "By learning language" card
    // beneath the heatmap — it NEEDS to group across langs to show the split.
    prisma.userWord.groupBy({ by: ["lang"], _count: { _all: true }, where: { userId } }),
    // cross-lang on purpose: the "Words saved" headline stat is the user's
    // total deck across every language — the per-lang breakdown is in `byLang`.
    prisma.userWord.count({ where: { userId } }),
    // cross-lang on purpose: pairs with wordsAll for the "words saved" stat.
    prisma.sentence.count({ where: { userId } }),
    // Wave 17 (extension "N words this week" chip): words saved in the
    // active language over the last 7 days.
    prisma.userWord.count({
      where: { userId, lang, createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  const perDay: Map<string, HeatmapDay> = new Map();
  for (const a of activities) {
    const key = toKey(a.date);
    const existing = perDay.get(key)?.value ?? 0;
    const value =
      existing +
      (a.minutesWatch ?? 0) +
      (a.minutesRead ?? 0) +
      (a.minutesTalk ?? 0) +
      (a.reviews ?? 0);
    perDay.set(key, { date: key, value });
  }
  const heatmap: HeatmapDay[] = Array.from(perDay.values());

  const minutesThisWeek = sumSince(activities, 7, (a) => (a.minutesWatch ?? 0) + (a.minutesRead ?? 0) + (a.minutesTalk ?? 0));
  const minutesAllTime = activities.reduce(
    (sum, a) => sum + (a.minutesWatch ?? 0) + (a.minutesRead ?? 0) + (a.minutesTalk ?? 0),
    0,
  );
  const reviewsThisWeek = sumSince(activities, 7, (a) => a.reviews ?? 0);
  // Derive the 30-day count from the SAME activity source as the 7-day headline
  // so the two can never contradict (QA 2026-10-25: showed "66, 7d" above
  // "0 in last 30 days" because this came from reviewLog, a different table).
  const reviews30 = sumSince(activities, 30, (a) => a.reviews ?? 0);

  return {
    heatmap,
    streak,
    byLang,
    wordsAll,
    sentencesAll,
    reviews30,
    minutesThisWeek,
    minutesAllTime,
    reviewsThisWeek,
    wordsThisWeek,
  };
}

interface ActivityRow {
  date: Date;
  minutesWatch: number;
  minutesRead: number;
  minutesTalk: number;
  reviews: number;
}

function sumSince(
  rows: ActivityRow[],
  days: number,
  pick: (a: ActivityRow) => number,
): number {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return rows.filter((r) => r.date >= cutoff).reduce((s, r) => s + pick(r), 0);
}

export default async function ProgressPage() {
  const viewer = await getViewer();
  const t = getT(viewer);
  if (!viewer.userId) {
    return (
      <>
        <PageHeader eyebrow={t("progress.eyebrow")} title={t("progress.title")} />
        <EmptyState
          eyebrow={t("progress.signedOutEyebrow")}
          title={t("progress.signedOutTitle")}
          body={t("progress.signedOutBody")}
          actions={[{ href: "/account" as never, label: t("progress.signIn") }]}
        />
      </>
    );
  }
  const data = await loadForUser(viewer.userId, viewer.activeLang);
  const emptyAll = data.heatmap.length === 0 && (data.streak?.current ?? 0) === 0;
  const freezes = data.streak?.freezes ?? 0;

  return (
    <>
      <PageHeader
        eyebrow={t("progress.eyebrow")}
        title={t("progress.title")}
        lede={t("progress.lede")}
      />

      {emptyAll ? (
        <EmptyState
          eyebrow={t("progress.emptyEyebrow")}
          title={t("progress.emptyTitle")}
          body={t("progress.emptyBody")}
          actions={[
            { href: "/review" as never, label: t("progress.startReview") },
            { href: "/words" as never, label: t("progress.browseWords"), variant: "secondary" },
          ]}
        />
      ) : (
        <>
          <section className={styles.statGrid} aria-label={t("progress.headlineAria")}>
            <StatCard
              label={t("progress.currentStreak")}
              value={t("progress.streakValue", { n: data.streak?.current ?? 0 })}
              hint={t(freezes === 1 ? "progress.streakHintOne" : "progress.streakHintMany", {
                best: data.streak?.best ?? 0,
                freezes,
              })}
            />
            <StatCard
              label={t("progress.minutesWeek")}
              value={`${Math.round(data.minutesThisWeek)}`}
              hint={t("progress.minutesHint", { n: Math.round(data.minutesAllTime) })}
            />
            <StatCard
              label={t("progress.reviews7d")}
              value={String(data.reviewsThisWeek)}
              hint={t("progress.reviews30Hint", { n: data.reviews30 })}
            />
            <StatCard
              label={t("progress.wordsSaved")}
              value={String(data.wordsAll)}
              hint={
                data.wordsThisWeek > 0
                  ? data.wordsThisWeek === 1
                    ? t("progress.wordsHintWeekOne", { sentences: data.sentencesAll })
                    : t("progress.wordsHintWeekMany", { n: data.wordsThisWeek, sentences: data.sentencesAll })
                  : t("progress.wordsHintNoWeek", { sentences: data.sentencesAll })
              }
            />
          </section>

          <h2 className={styles.sectionTitle}>
            {t("progress.activityIn", { lang: langNameFor(viewer.activeLang) })}
          </h2>
          <ActivityHeatmap days={data.heatmap} />

          {/* Wire 4: top ~5 cards whose last 3 grades include ≥2 "Again" over
              the last 7d. Each row routes to /review?focus=weak which the
              scheduler biases toward these cards. Server component. */}
          <WeakAreas userId={viewer.userId} lang={viewer.activeLang} />

          {freezes > 0 && (data.streak?.current ?? 0) < 1 && (
            <div className={styles.freezeChip} role="status">
              <span aria-hidden="true">❄</span>{" "}
              {t(freezes === 1 ? "progress.freezeChipOne" : "progress.freezeChipMany", {
                n: freezes,
              })}
            </div>
          )}

          <h2 className={styles.sectionTitle}>{t("progress.byLanguage")}</h2>
          <section className={styles.langBreak} aria-label={t("progress.perLangAria")}>
            {data.byLang.length === 0 ? (
              <p className={styles.freezeChip}>{t("progress.saveWordForStats")}</p>
            ) : (
              data.byLang.map((row) => (
                <article key={row.lang} className={styles.langCard}>
                  <div className={styles.langRow}>
                    <strong style={{ textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11, color: "var(--fl-text-3)" }}>
                      {row.lang}
                    </strong>
                    <span>{t("progress.langWords", { n: row._count._all })}</span>
                  </div>
                </article>
              ))
            )}
          </section>
        </>
      )}
    </>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <article className={styles.statCard}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      {hint && <span className={styles.statDelta}>{hint}</span>}
    </article>
  );
}
