"use client";

/**
 * Review session runner — orchestrates the five drills (Flashcard, Guess,
 * Dictation, Shadow, Speaking), posts grades through `/api/review/grade`,
 * handles the end-of-session summary, and wires global keyboard shortcuts.
 *
 * Accessibility:
 *   - Every grade button carries `aria-label` and `aria-keyshortcuts`.
 *   - Dictation feedback is announced via `aria-live="polite"`.
 *   - Correct / wrong / missing have both colour and a glyph (✓ ✗ ·) so the
 *     signal is non-color.
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  GradeResponse,
  ReviewSessionCard,
  UiGrade,
} from "./types";
import { pickDrillFor } from "./types";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./ReviewRunner.module.css";
import { Flashcard } from "./drills/Flashcard";
import { GuessMeaning } from "./drills/GuessMeaning";
import { Dictation } from "./drills/Dictation";
import { Shadowing } from "./drills/Shadowing";
import { Speaking } from "./drills/Speaking";
import { langName } from "@/lib/i18n/langName";

interface Props {
  userId: string;
  lang: string;
  initialCards: ReviewSessionCard[];
  /**
   * Wave 9: when `true` AND the browser supports WASM/WebGPU, Speaking +
   * Shadowing drills use on-device Whisper + word-match instead of the
   * Groq text-vs-text scorer. Flows through from `Prefs.localPronunciation`.
   */
  localPronunciation?: boolean;
}

interface GradedCard {
  card: ReviewSessionCard;
  grade: UiGrade | "skip";
  response?: GradeResponse;
  format: string;
}

export function ReviewRunner({
  userId,
  lang,
  initialCards,
  localPronunciation = false,
}: Props) {
  const t = useT();
  const [cards] = useState(initialCards);
  const [i, setI] = useState(0);
  const [graded, setGraded] = useState<GradedCard[]>([]);
  const [quitPrompt, setQuitPrompt] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sessionStart] = useState(() => Date.now());
  const cardStartRef = useRef<number>(Date.now());

  const current = cards[i];
  const drill = useMemo(() => (current ? pickDrillFor(current, i) : null), [current, i]);
  const done = i >= cards.length;

  // Reset per-card stopwatch whenever we advance.
  useEffect(() => {
    cardStartRef.current = Date.now();
  }, [i]);

  const postGrade = useCallback(
    async (grade: UiGrade) => {
      if (!current || !drill) return;
      const elapsedMs = Date.now() - cardStartRef.current;
      setBusy(true);
      try {
        const res = await fetch("/api/review/grade", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // TanStack-Query-safe idempotency key — same retry gets replayed.
            "idempotency-key": `grade:${current.cardType}:${current.cardId}:${cardStartRef.current}`,
            ...(process.env.NODE_ENV !== "production"
              ? { "x-dev-user-id": userId }
              : {}),
          },
          body: JSON.stringify({
            cardType: current.cardType,
            cardId: current.cardId,
            lang: current.lang,
            grade,
            elapsedMs,
            format: drill,
          }),
        });
        const data = (await res.json()) as GradeResponse;
        setGraded((g) => [
          ...g,
          { card: current, grade, response: data, format: drill },
        ]);
      } finally {
        setBusy(false);
        setI((n) => n + 1);
      }
    },
    [current, drill, userId],
  );

  const postSkip = useCallback(async () => {
    if (!current) return;
    const elapsedMs = Date.now() - cardStartRef.current;
    setBusy(true);
    try {
      await fetch("/api/review/skip", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `skip:${current.cardType}:${current.cardId}:${cardStartRef.current}`,
          ...(process.env.NODE_ENV !== "production"
            ? { "x-dev-user-id": userId }
            : {}),
        },
        body: JSON.stringify({
          cardType: current.cardType,
          cardId: current.cardId,
          lang: current.lang,
          elapsedMs,
        }),
      });
      setGraded((g) => [
        ...g,
        { card: current, grade: "skip", format: drill ?? "flashcard" },
      ]);
    } finally {
      setBusy(false);
      setI((n) => n + 1);
    }
  }, [current, drill, userId]);

  // Global keyboard handler. 1/2/3/4 = Again/Hard/Good/Easy. Esc = quit prompt.
  // Space = next card (for drills that auto-advance). We skip when focus is in
  // a <textarea> or type-text <input> so Dictation can accept normal typing.
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (done || busy || !current) return;
      const t = e.target as HTMLElement | null;
      const inField =
        t &&
        (t.tagName === "TEXTAREA" ||
          (t.tagName === "INPUT" &&
            ["text", "search", "number", "email"].includes(
              (t as HTMLInputElement).type,
            )));

      if (e.key === "Escape") {
        e.preventDefault();
        setQuitPrompt(true);
        return;
      }

      if (inField) return;

      if (e.key === "1") {
        e.preventDefault();
        void postGrade(1);
      } else if (e.key === "2") {
        e.preventDefault();
        void postGrade(2);
      } else if (e.key === "3") {
        e.preventDefault();
        void postGrade(3);
      } else if (e.key === "4") {
        e.preventDefault();
        void postGrade(4);
      } else if (e.key === " ") {
        e.preventDefault();
        void postSkip();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, done, busy, postGrade, postSkip]);

  if (cards.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.eyebrow}>{t("review.eyebrowShort")}</span>
        <h1 className={styles.emptyTitle}>{t("review.nothingDueTitle")}</h1>
        <p className={styles.emptyBody}>
          {t("review.nothingDueBody", { lang: langName(lang) })}
        </p>
      </div>
    );
  }

  if (done) {
    return <SessionSummary graded={graded} lang={lang} sessionStart={sessionStart} />;
  }

  return (
    <div className={styles.runner} data-busy={busy || undefined}>
      <SessionHeader
        index={i}
        total={cards.length}
        lang={lang}
        drill={drill ?? "flashcard"}
      />

      {quitPrompt && (
        <QuitPrompt
          onCancel={() => setQuitPrompt(false)}
          onConfirm={() => {
            // Jump straight to summary with what we have.
            // Simpler than "save progress" state — the grades we already
            // posted are already persisted.
            // Advance past the end so `done` becomes true.
            setI(cards.length);
            setQuitPrompt(false);
          }}
        />
      )}

      <div className={styles.drillArea} data-testid={`drill-${drill}`}>
        {current.cardType === "word" && drill === "flashcard" && (
          <Flashcard
            card={current}
            onGrade={(g) => void postGrade(g)}
            onSkip={() => void postSkip()}
            disabled={busy}
          />
        )}
        {current.cardType === "word" && drill === "guess" && (
          <GuessMeaning
            card={current}
            onGrade={(g) => void postGrade(g)}
            disabled={busy}
          />
        )}
        {current.cardType === "sentence" && drill === "dictation" && (
          <Dictation
            card={current}
            onGrade={(g) => void postGrade(g)}
            onSkip={() => void postSkip()}
            disabled={busy}
          />
        )}
        {current.cardType === "sentence" && drill === "shadow" && (
          <Shadowing
            card={current}
            onGrade={(g) => void postGrade(g)}
            onSkip={() => void postSkip()}
            userId={userId}
            disabled={busy}
            localPronunciation={localPronunciation}
          />
        )}
        {current.cardType === "sentence" && drill === "speaking" && (
          <Speaking
            card={current}
            onGrade={(g) => void postGrade(g)}
            onSkip={() => void postSkip()}
            userId={userId}
            disabled={busy}
            localPronunciation={localPronunciation}
          />
        )}
      </div>
    </div>
  );
}

function SessionHeader({
  index,
  total,
  lang,
  drill,
}: {
  index: number;
  total: number;
  lang: string;
  drill: string;
}) {
  const t = useT();
  const percent = Math.round((index / total) * 100);
  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <span className={styles.eyebrow}>{t("review.headerEyebrow", { lang: langName(lang) })}</span>
        <span className={styles.drillBadge} data-drill={drill}>
          {drillLabel(drill, t)}
        </span>
        <span className={styles.counter}>
          {Math.min(index + 1, total)} / {total}
        </span>
      </div>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.progressFill}
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}

function drillLabel(drill: string, t: (key: string, params?: Record<string, string | number>) => string): string {
  switch (drill) {
    case "flashcard":
      return t("review.drillFlashcard");
    case "guess":
      return t("review.drillGuess");
    case "dictation":
      return t("review.drillDictation");
    case "shadow":
      return t("review.drillShadow");
    case "speaking":
      return t("review.drillSpeaking");
    default:
      return drill;
  }
}

function QuitPrompt({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const t = useT();
  return (
    <div
      className={styles.quit}
      role="alertdialog"
      aria-labelledby="quit-title"
      aria-describedby="quit-body"
    >
      <div className={styles.quitCard}>
        <h2 id="quit-title" className={styles.quitTitle}>
          {t("review.quitTitle")}
        </h2>
        <p id="quit-body" className={styles.quitBody}>
          {t("review.quitBody")}
        </p>
        <div className={styles.quitRow}>
          <button
            type="button"
            onClick={onCancel}
            className={`${styles.quitBtn} ${styles.quitBtnGhost}`}
          >
            {t("review.quitKeep")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`${styles.quitBtn} ${styles.quitBtnPrimary}`}
          >
            {t("review.quitConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionSummary({
  graded,
  lang,
  sessionStart,
}: {
  graded: GradedCard[];
  lang: string;
  sessionStart: number;
}) {
  const t = useT();
  // Wave 15 — web-only session-finished cue (extension success chime).
  useEffect(() => {
    if (graded.length > 0) fx.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const total = graded.length;
  const correct = graded.filter(
    (g) => typeof g.grade === "number" && g.grade >= 3,
  ).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const minutes = Math.max(1, Math.round((Date.now() - sessionStart) / 60_000));

  const nextDue = graded
    .map((g) => g.response?.due)
    .filter(Boolean)
    .map((s) => new Date(s as string))
    .sort((a, b) => a.getTime() - b.getTime())[0];

  const dueTomorrow = graded.filter((g) => {
    if (!g.response) return false;
    const due = new Date(g.response.due);
    const now = new Date();
    const diffDays = (due.getTime() - now.getTime()) / 86_400_000;
    return diffDays >= 0.5 && diffDays <= 1.5;
  }).length;

  return (
    <div className={styles.summary} data-testid="review-summary">
      <span className={styles.eyebrow}>{t("review.sessionDone")}</span>
      <h1 className={styles.summaryTitle}>{t("review.summaryTitle")}</h1>
      <p className={styles.summaryBody}>
        {t("review.summaryBody", {
          total,
          cardWord: t(total === 1 ? "review.cardSingular" : "review.cardPlural"),
          lang: langName(lang),
          accuracy,
          minutes,
          minuteWord: t(minutes === 1 ? "review.minuteSingular" : "review.minutePlural"),
        })}
      </p>
      <dl className={styles.summaryGrid}>
        <div className={styles.summaryCell}>
          <dt>{t("review.labelReviewed")}</dt>
          <dd>{total}</dd>
        </div>
        <div className={styles.summaryCell}>
          <dt>{t("review.labelAccuracy")}</dt>
          <dd>{accuracy}%</dd>
        </div>
        <div className={styles.summaryCell}>
          <dt>{t("review.labelDueTomorrow")}</dt>
          <dd>{dueTomorrow}</dd>
        </div>
        <div className={styles.summaryCell}>
          <dt>{t("review.labelNextUp")}</dt>
          <dd>{nextDue ? nextDue.toLocaleDateString() : "—"}</dd>
        </div>
      </dl>
      <p className={styles.summaryFoot}>
        {t("review.summaryFoot", { n: Math.max(5, Math.round(total * 0.9)) })}
      </p>

      {/* PM-polish fix 1: three-button action footer so the session doesn't
          dead-end on stats. Primary → library, secondary → talk (seeded with
          today's lemmas when easy), tertiary → words. */}
      <SummaryActions graded={graded} />
    </div>
  );
}

/**
 * Action footer rendered under the session summary. Links out to the next
 * useful surface so a learner finishing a session has somewhere to go.
 *
 * Talk accepts a `?words=` querystring (today's lemmas, comma-joined, capped
 * at 10) so a lesson can prime its context — the Talk route reads it best-
 * effort and ignores it on unknown shape.
 */
function SummaryActions({ graded }: { graded: GradedCard[] }): JSX.Element {
  const t = useT();
  const lemmas = useMemo(() => {
    const out: string[] = [];
    for (const g of graded) {
      if (g.card.cardType === "word" && g.card.word?.lemma) {
        out.push(g.card.word.lemma);
        if (out.length >= 10) break;
      }
    }
    return out;
  }, [graded]);
  const talkHref = lemmas.length > 0
    ? ({ pathname: "/talk", query: { words: lemmas.join(",") } } as const)
    : ({ pathname: "/talk" } as const);
  return (
    <div className={styles.summaryActions} data-testid="review-summary-actions">
      <Link
        href={{ pathname: "/library" }}
        className={styles.summaryBtnPrimary}
      >
        {t("review.browseLibraryArrow")}
      </Link>
      <Link
        href={talkHref as never}
        className={styles.summaryBtnSecondary}
      >
        {t("review.talkAboutWords")}
      </Link>
      <Link
        href={{ pathname: "/words" }}
        className={styles.summaryBtnText}
      >
        {t("review.seeAllWords")}
      </Link>
    </div>
  );
}
