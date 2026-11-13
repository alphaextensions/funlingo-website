import Link from "next/link";
import type { Route } from "next";
import { TALK_TOPICS, type TalkTopic } from "@/lib/talk/topics";
import { SEEDED_TOPICS } from "@/lib/talk/seedCatalog";
import { GlassCard } from "@/components/talk-read/GlassCard";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import {
  localizeTalkCategory,
  localizeTalkBlurb,
  localizeLessonTitle,
} from "@/lib/i18n/contentLocalize";
import { prisma } from "@/server/db";
import styles from "./page.module.css";

export async function generateMetadata() {
  const t = getT(await getViewer());
  return { title: t("talk.metaTitle"), description: t("talk.metaDesc") };
}

export const dynamic = "force-dynamic";

interface TalkPageProps {
  searchParams: Promise<{ words?: string; dev_user?: string; lang?: string }>;
}

export default async function TalkIndexPage({ searchParams }: TalkPageProps) {
  const sp = await searchParams;
  // Dev-only bypass mirroring the Review pattern (app/review/page.tsx:197):
  // ?dev_user=<cuid>&lang=<xx> lets us walk the signed-in experience in
  // local dev without wiring Google OAuth. Ignored in production.
  let viewer = await getViewer();
  if (
    !viewer.userId &&
    process.env.NODE_ENV !== "production" &&
    typeof sp.dev_user === "string" &&
    sp.dev_user.length > 0
  ) {
    const devUser = await prisma.user.findUnique({ where: { id: sp.dev_user } });
    if (devUser) {
      viewer = {
        userId: devUser.id,
        user: devUser,
        activeLang: sp.lang ?? devUser.activeLearningLang ?? "en",
        nativeLang: devUser.nativeLang ?? "en",
      };
    }
  }

  // ?words=foo,bar,baz — comma-joined lemmas the learner just reviewed. Rendered
  // as a banner so the Review summary's "Talk about today's words →" promise is
  // honoured. Shape is best-effort: unknown input is ignored, capped at 10.
  const seededWords = (sp.words ?? "")
    .split(",")
    .map((w) => w.trim())
    .filter((w) => w.length > 0 && w.length <= 32)
    .slice(0, 10);

  // Wave 5 content seeding: prefer Prisma-seeded topics (lang-scoped). If the
  // seed hasn't run yet (or the viewer's active lang has no rows), fall back
  // to the in-memory TALK_TOPICS catalog (hard-coded + compiled JSON seed) so
  // the Talk index is never empty.
  const topicsForLang = await loadTopicsFromDb(viewer.activeLang);
  const topics: TalkTopic[] = topicsForLang.length > 0 ? topicsForLang : TALK_TOPICS;

  // Chrome follows the viewer's NATIVE language; the topic/lesson content
  // above follows viewer.activeLang. Never swap these.
  const t = getT(viewer);

  if (!viewer.userId) {
    return (
      <>
        <PageHeader eyebrow={t("talk.eyebrow")} title={t("talk.title")} />
        <EmptyState
          eyebrow={t("talk.signedOutEyebrow")}
          title={t("talk.signedOutTitle")}
          body={t("talk.signedOutBody")}
          actions={[
            { href: "/account" as never, label: t("talk.actionSignIn") },
            { href: "/library" as never, label: t("talk.actionBrowseLibrary"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{t("talk.eyebrow")}</span>
        <h1 className={styles.title}>{t("talk.title")}</h1>
        <p className={styles.lede}>{t("talk.lede")}</p>
      </header>

      {seededWords.length > 0 && (
        <aside className={styles.seededBanner} aria-label={t("talk.seededAria")}>
          <span className={styles.seededEyebrow}>{t("talk.seededEyebrow")}</span>
          <p className={styles.seededCopy}>{t("talk.seededCopy")}</p>
          <ul className={styles.seededList}>
            {seededWords.map((w) => (
              <li key={w} className={styles.seededChip}>{w}</li>
            ))}
          </ul>
        </aside>
      )}

      <div className={styles.grid}>
        {topics.map((topic) => (
          <GlassCard key={topic.id} as="section" className={styles.topicCard}>
            <div className={styles.topicHead}>
              <span className={styles.emoji} aria-hidden="true">
                {topic.emoji}
              </span>
              <div>
                <h2 className={styles.topicTitle}>{topic.title}</h2>
                <p className={styles.topicCategory}>{localizeTalkCategory(t, topic.category)}</p>
              </div>
            </div>
            <p className={styles.topicBlurb}>{localizeTalkBlurb(t, topic.id, topic.blurb)}</p>
            <ul className={styles.lessonList}>
              {topic.lessons.map((l) => {
                const href = `/talk/${topic.slug}/${l.slug}` as Route;
                return (
                  <li key={l.id}>
                    <Link href={href} className={styles.lessonLink}>
                      <span className={styles.lessonTitle}>
                        {localizeLessonTitle(t, topic.id, l.slug, l.title)}
                      </span>
                      <span className={styles.lessonMeta}>
                        {l.tasks.length === 1
                          ? t("talk.taskCountSingular")
                          : t("talk.taskCountPlural", { n: l.tasks.length })}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/**
 * Loads Talk topics seeded by `scripts/seed-talk.ts` and shapes them into the
 * same `TalkTopic` form the hard-coded catalog uses. Returns an empty array
 * when the seed hasn't run or the Prisma call fails — the caller then falls
 * back to the in-memory catalog so Talk is never blank.
 *
 * Lang-scoped per AGENT-PLAYBOOK rule 4 (TalkTopic.lang is set at seed time).
 */
async function loadTopicsFromDb(lang: string): Promise<TalkTopic[]> {
  try {
    const rows = await prisma.talkTopic.findMany({
      where: { lang },
      orderBy: [{ order: "asc" }, { title: "asc" }],
      include: { lessons: { orderBy: [{ order: "asc" }, { slug: "asc" }] } },
    });

    // Blurb lives at compile-time (keyed on the compiled topic id) so the
    // Prisma schema can stay untouched. If a row's id isn't in the compiled
    // catalog, we fall back to a short category-based blurb.
    const seedBlurbById = new Map<string, string>(
      SEEDED_TOPICS.map((t) => [t.id, t.blurb]),
    );

    // Wave 13 B-22: openers aren't stored on the Prisma TalkLesson model;
    // look them up by lesson id against the compiled seed catalog so the
    // in-memory and DB-sourced paths both end up with a real line.
    const seedOpenerById = new Map<string, string>();
    for (const t of SEEDED_TOPICS) {
      for (const l of t.lessons) seedOpenerById.set(l.id, l.opener);
    }

    // Collapse regional variants. The seed intentionally stores one topic per
    // source locale (es-ES / es-LA / es; en-US / en-GB / en), so a single
    // lang-scoped index showed the same situation 2-3× — e.g. "En el Doctor"
    // AND "En el Médico". Keep ONE canonical topic per situation, preferring
    // the base-locale variant (tag === lang) then the shortest tag. The id is
    // `topic:v2:{localeTag}:{situationSlug}`. Seeded rows are left untouched,
    // and every variant's slug still resolves directly. (QA 2026-10-25.)
    const tagOf = (id: string): string => id.split(":")[2] ?? "";
    const situationOf = (id: string): string => id.split(":").slice(3).join(":") || id;
    const variantScore = (tag: string): number =>
      (tag === lang ? 100 : 0) + (tag.length > 0 ? 10 / tag.length : 0);
    const bestBySituation = new Map<string, (typeof rows)[number]>();
    for (const row of rows) {
      const sit = situationOf(row.id);
      const existing = bestBySituation.get(sit);
      if (!existing || variantScore(tagOf(row.id)) > variantScore(tagOf(existing.id))) {
        bestBySituation.set(sit, row);
      }
    }

    return Array.from(bestBySituation.values()).map((row) => {
      const lessons = row.lessons.map((l) => {
        const roles = safeJson(l.roles) as { ai?: string; user?: string } | null;
        return {
          id: l.id,
          slug: l.slug,
          topicSlug: row.slug,
          title: l.title,
          scene: l.scene,
          aiRole: roles?.ai ?? "A patient conversation partner.",
          userRole: roles?.user ?? "A learner practising this scene.",
          tasks: (safeJson(l.tasks) as string[] | null) ?? [],
          shadowSentences: (safeJson(l.shadowSentences) as string[] | null) ?? [],
          opener: seedOpenerById.get(l.id) ?? "Hi there — ready to start?",
        };
      });
      return {
        id: row.id,
        slug: row.slug,
        category: row.category,
        title: row.title,
        emoji: row.emoji ?? "💬",
        blurb: seedBlurbById.get(row.id) ?? `${row.category} — short, real conversations.`,
        lessons,
      } satisfies TalkTopic;
    });
  } catch {
    return [];
  }
}

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
