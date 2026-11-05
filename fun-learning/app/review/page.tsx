/**
 * /review — daily spaced-repetition session.
 *
 * The server page resolves the user, loads the session cards for the active
 * learning language, and hands them to the client runner. Lang scoping is
 * enforced here (and again in `cardsDueNow`) so a JP user with active EN sees
 * zero JP cards — closes veto test #8.
 */

import { prisma } from "@/server/db";
import { auth } from "@/server/auth";
import { getViewer } from "@/server/session";
import { getT, chromeLocale } from "@/server/i18n";
import { pageClientSlice, REVIEW_DRILL_KEY_PREFIXES } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";
import { getPrefs } from "@/server/prefs";
import { cardsDueNow, weakAreaCardKeys } from "@/server/review/scheduler";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { ReviewRunner } from "./ReviewRunner";
import { QuickQuizRunner, type QuickQuizCard } from "./QuickQuizRunner";
import type { ReviewSessionCard } from "./types";
import styles from "./page.module.css";

/** Wave 6 casual-quiz loader — reads directly from UserWord, lang-scoped.
 *  No scheduler, no FSRS, no streak writes. The casual quiz does not go
 *  through `cardsDueNow` (which filters by due-time + state); the learner
 *  gets 10 of their own saved words, newest first. */
async function loadQuickQuizCards(
  userId: string,
  lang: string,
): Promise<QuickQuizCard[]> {
  const words = await prisma.userWord.findMany({
    where: { userId, lang },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      encounters: {
        orderBy: { savedAt: "desc" },
        take: 1,
      },
    },
  });
  return words
    .map((w) => {
      const meaning =
        (w.note?.trim() || w.encounters[0]?.translation?.trim() || "").trim();
      if (!meaning) return null;
      return {
        id: w.id,
        lemma: w.lemma,
        pos: w.pos,
        meaning,
      } as QuickQuizCard;
    })
    .filter((c): c is QuickQuizCard => c !== null);
}

async function loadSession(
  userId: string,
  lang: string,
  focus: "weak" | null = null,
): Promise<ReviewSessionCard[]> {
  const refs = await cardsDueNow(userId, lang, 20);
  if (refs.length === 0) return [];

  // Wire 4: ?focus=weak lifts cards whose last 3 grades include ≥2 "Again"
  // (grade=1) over the last 7 days to the top of the session, keeping the
  // overall cardsDueNow cap. Non-weak cards still appear below so a sparse
  // weak list doesn't produce an empty session.
  if (focus === "weak") {
    const weakKeys = await weakAreaCardKeys(userId, lang);
    if (weakKeys.size > 0) {
      refs.sort((a, b) => {
        const aw = weakKeys.has(`${a.cardType}:${a.cardId}`) ? 1 : 0;
        const bw = weakKeys.has(`${b.cardType}:${b.cardId}`) ? 1 : 0;
        if (aw !== bw) return bw - aw;
        return a.due.getTime() - b.due.getTime();
      });
    }
  }

  const wordIds = refs.filter((r) => r.cardType === "word").map((r) => r.cardId);
  const sentenceIds = refs
    .filter((r) => r.cardType === "sentence")
    .map((r) => r.cardId);

  const [words, sentences] = await Promise.all([
    wordIds.length
      ? prisma.userWord.findMany({
          where: { id: { in: wordIds }, userId, lang },
          include: {
            encounters: {
              orderBy: { savedAt: "desc" },
              take: 1,
              include: {
                source: { select: { id: true, title: true, type: true } },
              },
            },
          },
        })
      : Promise.resolve([]),
    sentenceIds.length
      ? prisma.sentence.findMany({
          where: { id: { in: sentenceIds }, userId, lang },
          include: {
            source: { select: { title: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  const wordMap = new Map(words.map((w) => [w.id, w]));
  const sentenceMap = new Map(sentences.map((s) => [s.id, s]));

  const cards: ReviewSessionCard[] = [];
  for (const ref of refs) {
    if (ref.cardType === "word") {
      const w = wordMap.get(ref.cardId);
      if (!w) continue;
      const enc = w.encounters[0];
      cards.push({
        cardType: "word",
        cardId: ref.cardId,
        lang: ref.lang,
        due: ref.due.toISOString(),
        reps: ref.reps,
        state: ref.state,
        word: {
          lemma: w.lemma,
          pos: w.pos,
          note: w.note,
          encounter: enc
            ? {
                line: enc.line,
                translation: enc.translation,
                timestampSec: enc.timestampSec,
                savedAt: enc.savedAt.toISOString(),
                sourceTitle: enc.source?.title ?? null,
                sourceId: enc.source?.id ?? enc.sourceId ?? null,
                sourceType: enc.source?.type ?? null,
              }
            : undefined,
        },
      });
    } else {
      const s = sentenceMap.get(ref.cardId);
      if (!s) continue;
      cards.push({
        cardType: "sentence",
        cardId: ref.cardId,
        lang: ref.lang,
        due: ref.due.toISOString(),
        reps: ref.reps,
        state: ref.state,
        sentence: {
          text: s.text,
          translation: s.translation,
          timestampSec: s.timestampSec,
          sourceTitle: s.source?.title ?? null,
        },
      });
    }
  }
  return cards;
}

async function resolveSsrUser(): Promise<{ id: string; lang: string } | null> {
  try {
    const session = await auth();
    const id = (session?.user as { id?: string } | undefined)?.id;
    if (!id) return null;
    const u = await prisma.user.findUnique({
      where: { id },
      select: { id: true, activeLearningLang: true },
    });
    if (!u) return null;
    return { id: u.id, lang: u.activeLearningLang ?? "en" };
  } catch {
    return null;
  }
}

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    dev_user?: string;
    focus?: string;
    mode?: string;
  }>;
}) {
  const sp = await searchParams;
  // Chrome (headers, empty states) keys on the viewer's NATIVE language — the
  // fl_native cookie for signed-out visitors. Study content stays in the
  // learning language. getViewer() is request-cached, so this is cheap even
  // alongside resolveSsrUser().
  const viewer = await getViewer();
  const t = getT(viewer);
  let user = await resolveSsrUser();

  // Dev fallback: when the page is opened with ?dev_user=<id>&lang=<xx> and
  // we're not in production, use that identity. Mirrors
  // `resolveReviewUserId` on the API side. Lets Playwright and local dev
  // drive the UI without wiring Auth.js first.
  if (!user && process.env.NODE_ENV !== "production" && sp.dev_user) {
    user = { id: sp.dev_user, lang: sp.lang ?? "en" };
  }

  if (!user) {
    return (
      <>
        <PageHeader eyebrow={t("review.eyebrow")} title={t("review.dailySessionTitle")} />
        <EmptyState
          eyebrow={t("review.signedOutEyebrow")}
          title={t("review.signedOutTitle")}
          body={t("review.signedOutBody")}
          actions={[
            { href: "/account" as never, label: t("review.signIn") },
            { href: "/library" as never, label: t("review.browseLibrary"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  const lang = sp.lang ?? user.lang;
  const focus = sp.focus === "weak" ? "weak" : null;

  // Wave 6 casual-quiz branch: /review?mode=quiz(&focus=casual) reads straight
  // from UserWord (not the FSRS scheduler), renders a 2-option meaning picker,
  // and never writes anything. Streak + FSRS state are untouched by design.
  if (sp.mode === "quiz") {
    const quizCards = await loadQuickQuizCards(user.id, lang);
    if (quizCards.length === 0) {
      return (
        <>
          <PageHeader
            eyebrow={t("review.quizEyebrow")}
            title={t("review.quizEmptyTitle")}
            lede={t("review.quizEmptyLede")}
          />
          <EmptyState
            eyebrow={t("review.quizDeckEyebrow")}
            title={t("review.quizDeckTitle")}
            body={t("review.quizDeckBody")}
            actions={[
              { href: "/watch/demo" as never, label: t("review.tryOnVideo") },
              { href: "/learn" as never, label: t("review.backToFunLearning"), variant: "secondary" },
            ]}
          />
        </>
      );
    }
    return (
      <section className={styles.wrap}>
        <QuickQuizRunner lang={lang} cards={quizCards} />
      </section>
    );
  }

  const cards = await loadSession(user.id, lang, focus);
  const prefs = await getPrefs(user.id);

  // The drill components (GradeRow + the five drills) read reviewDrill.* keys,
  // which are kept out of the global slice (see REVIEW_DRILL_KEY_PREFIXES).
  // This page-scoped provider carries the global chrome PLUS reviewDrill.* so
  // ReviewRunner's own review.* labels and the drills both resolve in the
  // learner's native language.
  const uiLocale = chromeLocale(viewer);
  const drillSlice = pageClientSlice(uiLocale, REVIEW_DRILL_KEY_PREFIXES);

  return (
    <section className={styles.wrap}>
      <I18nProvider
        locale={uiLocale}
        nativeLang={viewer.user?.nativeLang ?? viewer.nativeLang ?? null}
        slice={drillSlice}
      >
        <ReviewRunner
          userId={user.id}
          lang={lang}
          initialCards={cards}
          localPronunciation={prefs.localPronunciation ?? false}
        />
      </I18nProvider>
    </section>
  );
}
