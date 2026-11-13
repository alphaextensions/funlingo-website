/**
 * WeakAreas — Wire 4 (cross-feature wiring), tone softened in Wave 4.
 *
 * Surfaces the ~5 cards whose last 3 grades (over the last 7 days) include
 * two or more "Again" (grade=1) — the cards the learner struggles with.
 * Each row deep-links back to `/review?focus=weak`, which the Review
 * scheduler biases toward the same keys.
 *
 * Server component — the data query runs on the request, no client state
 * beyond the row-level anchor and keyboard focus-ring the browser gives us
 * for free. Shift-Tab navigates between rows just as it does across any
 * list of anchor elements (document order).
 *
 * The heuristic itself lives in `src/server/review/weakAreas.ts` — both
 * this component and `cardsDueNow(..., focus:"weak")` call through there,
 * so the surfaced list and the biased queue cannot drift apart.
 *
 * Voice: no shame, no red. "Could use another pass" + "give these another
 * try" — the learner isn't failing, they're mid-learning. We also keep the
 * card visible on zero rows with a positive one-liner so the user knows
 * the system is watching.
 *
 * A sibling `<WeakAreasSkeleton />` is exported for consumers that wrap
 * this server component in `<Suspense>` for streaming.
 */

import { prisma } from "@/server/db";
import Link from "next/link";
import { weakAreas } from "@/server/review/weakAreas";
import styles from "./WeakAreas.module.css";

interface WeakRowView {
  cardType: "word" | "sentence";
  cardId: string;
  recentLapses: number;
  totalRecentGrades: number;
  label: string;
  sublabel: string | null;
}

/**
 * Resolve weak-card IDs into row views (label + source). Hits the shared
 * `weakAreas` helper first, then batches the label lookups so the UI stays
 * cheap even as the user's log grows. Top 5 by lapse count.
 */
export async function loadWeakCards(
  userId: string,
  lang: string,
  limit = 5,
): Promise<WeakRowView[]> {
  const { rows: weakRaw } = await weakAreas(userId, lang);
  const top = weakRaw.slice(0, limit);
  if (top.length === 0) return [];

  // Resolve labels (lemma / sentence text + source title) in two batched
  // queries so this stays cheap even as the user's log grows.
  const wordIds = top.filter((r) => r.cardType === "word").map((r) => r.cardId);
  const sentIds = top.filter((r) => r.cardType === "sentence").map((r) => r.cardId);
  const [words, sentences] = await Promise.all([
    wordIds.length
      ? prisma.userWord.findMany({
          where: { id: { in: wordIds }, userId, lang },
          select: {
            id: true,
            lemma: true,
            encounters: {
              orderBy: { savedAt: "desc" },
              take: 1,
              select: { source: { select: { title: true } } },
            },
          },
        })
      : Promise.resolve([]),
    sentIds.length
      ? prisma.sentence.findMany({
          where: { id: { in: sentIds }, userId, lang },
          select: {
            id: true,
            text: true,
            source: { select: { title: true } },
          },
        })
      : Promise.resolve([]),
  ]);
  const wordMap = new Map(words.map((w) => [w.id, w]));
  const sentMap = new Map(sentences.map((s) => [s.id, s]));

  const rows: WeakRowView[] = [];
  for (const r of top) {
    if (r.cardType === "word") {
      const w = wordMap.get(r.cardId);
      if (!w) continue;
      rows.push({
        ...r,
        label: w.lemma,
        sublabel: w.encounters[0]?.source?.title ?? null,
      });
    } else {
      const s = sentMap.get(r.cardId);
      if (!s) continue;
      // Keep a short snippet so the row renders in one line.
      const snippet = s.text.length > 72 ? `${s.text.slice(0, 69)}…` : s.text;
      rows.push({
        ...r,
        label: snippet,
        sublabel: s.source?.title ?? null,
      });
    }
  }
  return rows;
}

/**
 * Three-row ghost shown while the server component is still streaming its
 * data under `<Suspense>`. The pulse animation is gated under
 * `prefers-reduced-motion`.
 */
export function WeakAreasSkeleton() {
  return (
    <section
      className={styles.wrap}
      aria-labelledby="weak-areas-h"
      aria-busy="true"
    >
      <header className={styles.head}>
        <div>
          <span className={styles.eyebrow}>In your focus list</span>
          <h2 id="weak-areas-h" className={styles.title}>
            Could use another pass
          </h2>
        </div>
      </header>
      <ol className={styles.list} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <li key={i} className={styles.row}>
            <div className={`${styles.rowLink} ${styles.rowGhost}`}>
              <span className={styles.rowBullet} />
              <span className={styles.rowBody}>
                <span className={`${styles.rowLabel} ${styles.ghostBar}`} />
                <span className={`${styles.rowSublabel} ${styles.ghostBarShort}`} />
              </span>
              <span className={`${styles.rowCount} ${styles.ghostChip}`} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function WeakAreas({
  userId,
  lang,
}: {
  userId: string;
  lang: string;
}) {
  const rows = await loadWeakCards(userId, lang, 5);

  if (rows.length === 0) {
    // Zero-state is a POSITIVE one-liner, not a hidden section — the
    // learner should see that the system is still watching.
    return (
      <section className={styles.wrap} aria-labelledby="weak-areas-h">
        <header className={styles.head}>
          <div>
            <span className={styles.eyebrow}>In your focus list</span>
            <h2 id="weak-areas-h" className={styles.title}>
              Could use another pass
            </h2>
          </div>
        </header>
        <p className={styles.empty}>
          No weak spots this week — nice.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.wrap} aria-labelledby="weak-areas-h">
      <header className={styles.head}>
        <div>
          <span className={styles.eyebrow}>In your focus list</span>
          <h2 id="weak-areas-h" className={styles.title}>
            Could use another pass
          </h2>
        </div>
        <Link
          href={{ pathname: "/review", query: { focus: "weak" } }}
          className={styles.primaryLink}
        >
          Give these another try →
        </Link>
      </header>
      <ol className={styles.list} aria-label={`${rows.length} cards in your focus list`}>
        {rows.map((r) => (
          <li key={`${r.cardType}:${r.cardId}`} className={styles.row}>
            <Link
              href={{ pathname: "/review", query: { focus: "weak" } }}
              className={styles.rowLink}
              aria-label={`${r.label} — tripped you up ${r.recentLapses} of ${r.totalRecentGrades} recent reviews. Give it another try.`}
            >
              <span className={styles.rowBullet} aria-hidden="true">
                {r.cardType === "word" ? "W" : "S"}
              </span>
              <span className={styles.rowBody}>
                <span className={styles.rowLabel} translate="no">
                  {r.label}
                </span>
                {r.sublabel ? (
                  <span className={styles.rowSublabel}>{r.sublabel}</span>
                ) : null}
              </span>
              <span className={styles.rowCount}>
                {r.recentLapses} × hard
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
