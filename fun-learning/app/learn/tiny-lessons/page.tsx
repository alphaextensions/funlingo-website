/**
 * /learn/tiny-lessons — Wave 11 extension-parity Tiny Lessons picker.
 *
 * The picker IA now mirrors the Funlingo extension's `.sit-grid` + `.sit-tile`
 * block: an emoji on top (bouncy on hover), a bold title with a native-script
 * sub, and a phrase count line. Grid: 4-col default, 2-col at 880px, 1-col
 * at 480px (matches the extension exactly).
 *
 * Each tile routes to `/learn/tiny-lessons/<slug>` where the learner flips
 * through the Wave-10-owned phrase cards. No scoring, no streak, no FSRS
 * writes — pure practice.
 */

import Link from "next/link";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { listSituations } from "@/lib/learn/content";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { EscapeTo } from "@/components/feedback/EscapeTo";
import styles from "./tinyLessons.module.css";

export const dynamic = "force-dynamic";
export async function generateMetadata() {
  return { title: getT(await getViewer())("tinyLessons.metaTitle") };
}

export default async function TinyLessonsIndex() {
  const viewer = await getViewer();
  const situations = listSituations(viewer.activeLang);
  // Chrome = native lang; situations (content) = learning lang.
  const t = getT(viewer);
  const header = (
    <PageHeader
      eyebrow={t("tinyLessons.eyebrow")}
      title={t("tinyLessons.title")}
      lede={t("tinyLessons.lede")}
    />
  );

  if (situations.length === 0) {
    return (
      <>
        {header}
        <EmptyState
          eyebrow={t("tinyLessons.emptyEyebrow")}
          title={t("tinyLessons.emptyTitle")}
          body={t("tinyLessons.emptyBody")}
          actions={[
            { href: "/learn" as never, label: t("tinyLessons.emptyBack"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  return (
    <>
      {header}
      <EscapeTo href="/learn" />
      <section className={styles.sitGrid} aria-label={t("tinyLessons.ariaGrid")} data-testid="tiny-lessons-grid">
        {situations.map((s) => {
          const nativeTitle = s.title && s.titleEn && s.title !== s.titleEn ? s.title : null;
          const sub = nativeTitle ?? t("tinyLessons.everydayPhrases");
          return (
            <Link
              key={s.slug}
              href={{ pathname: `/learn/tiny-lessons/${s.slug}` } as never}
              className={styles.sitTile}
              data-testid={`tiny-lesson-${s.slug}`}
              data-fx="tap"
            >
              <span className={styles.sitEmoji} aria-hidden="true">{s.icon}</span>
              <span className={styles.sitTitle}>{s.titleEn ?? s.title}</span>
              <span className={styles.sitSub} lang={nativeTitle ? s.lang : undefined}>{sub}</span>
              <span className={styles.sitCount}>
                {s.phrases.length === 1
                  ? t("tinyLessons.phrasesSingular")
                  : t("tinyLessons.phrasesPlural", { n: s.phrases.length })}
              </span>
            </Link>
          );
        })}
      </section>
    </>
  );
}
