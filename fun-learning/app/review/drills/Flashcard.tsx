"use client";

/**
 * Flashcard drill — SPEC §11.
 *   front: lemma + part-of-speech + optional meaning blank
 *   back:  user's own saved line (autobiographical), source + date,
 *          plus the native-language gloss when we have one.
 *
 * The "autobiographical back" matters: the user remembers Netflix at 23:14
 * on Monday more than they'll remember a dictionary. We show the full
 * encounter line, the source title, and "You saved this N days ago."
 */

import { useState } from "react";
import type { ReviewSessionCard, UiGrade } from "../types";
import { GradeRow } from "./GradeRow";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./Flashcard.module.css";

export function Flashcard({
  card,
  onGrade,
  onSkip,
  disabled,
}: {
  card: ReviewSessionCard;
  onGrade: (g: UiGrade) => void;
  onSkip?: () => void;
  disabled?: boolean;
}) {
  const t = useT();
  const [revealed, setRevealed] = useState(false);
  const w = card.word;
  if (!w) return null;

  const encounter = w.encounter;
  const daysAgo = encounter
    ? Math.floor(
        (Date.now() - new Date(encounter.savedAt).getTime()) / 86_400_000,
      )
    : null;

  return (
    <article className={styles.card} data-revealed={revealed || undefined}>
      <div className={styles.front}>
        <div className={styles.lemma} translate="no">{w.lemma}</div>
        {w.pos && <div className={styles.pos}>{w.pos}</div>}
        {!revealed && (
          <>
            <p className={styles.hint}>{t("reviewDrill.flashHint")}</p>
            <button
              type="button"
              className={styles.revealBtn}
              onClick={() => {
                fx.flip();
                setRevealed(true);
              }}
              disabled={disabled}
              aria-label={t("reviewDrill.flashRevealAria")}
            >
              {t("reviewDrill.flashReveal")}
            </button>
            {onSkip && (
              <button
                type="button"
                className={styles.skipLink}
                onClick={onSkip}
                disabled={disabled}
                aria-label={t("reviewDrill.flashSkipAria")}
              >
                {t("quiz.skip")}
              </button>
            )}
          </>
        )}
      </div>

      {revealed && (
        <div className={styles.back}>
          {w.note && (
            <p className={styles.gloss}>
              <strong>{t("reviewDrill.flashMeaning")}</strong> {w.note}
            </p>
          )}
          {encounter ? (
            <aside className={styles.encounter} aria-label={t("reviewDrill.flashYourLineAria")}>
              <div className={styles.encounterHead}>
                <span className={styles.encounterChip}>{t("reviewDrill.flashYourLine")}</span>
                <span className={styles.encounterSource}>
                  {encounter.sourceTitle ?? t("reviewDrill.flashSavedLine")}
                  {daysAgo !== null &&
                    ` · ${
                      daysAgo === 0
                        ? t("reviewDrill.flashToday")
                        : t(
                            daysAgo === 1
                              ? "reviewDrill.flashDaysAgoSingular"
                              : "reviewDrill.flashDaysAgoPlural",
                            { n: daysAgo },
                          )
                    }`}
                </span>
              </div>
              <p className={styles.encounterLine}>
                {highlight(encounter.line, w.lemma)}
              </p>
              {encounter.translation && (
                <p className={styles.encounterTrans}>
                  {encounter.translation}
                </p>
              )}
              {rewatchHref(encounter) && (
                <a
                  className={styles.rewatchLink}
                  href={rewatchHref(encounter) as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("reviewDrill.flashRewatchAria", {
                    moment:
                      encounter.timestampSec != null
                        ? formatTimestamp(encounter.timestampSec)
                        : t("reviewDrill.flashRewatchMoment"),
                    inTitle: encounter.sourceTitle
                      ? t("reviewDrill.flashRewatchInTitle", { title: encounter.sourceTitle })
                      : "",
                  })}
                >
                  <span aria-hidden="true">▶</span>
                  {t("reviewDrill.flashRewatch")}
                  {encounter.timestampSec != null && (
                    <span className={styles.rewatchTime}>
                      {" "}
                      · {formatTimestamp(encounter.timestampSec)}
                    </span>
                  )}
                  <span aria-hidden="true"> →</span>
                </a>
              )}
            </aside>
          ) : (
            <p className={styles.encounterNone}>
              {t("reviewDrill.flashNoScene")}
            </p>
          )}
          <GradeRow onGrade={onGrade} disabled={disabled} />
        </div>
      )}
    </article>
  );
}

/**
 * Build the "Rewatch this scene" href when we have a non-demo sourceId.
 * Links to `/watch/<sourceId>?t=<timestampSec>`. Returns null for encounters
 * that lack a real Source (e.g. typed/book-reader saves) — the CTA then
 * does not render. We also skip the demo source and non-video source types
 * (book / upload / sentence_pack) since those routes don't play video.
 */
export function rewatchHref(e: {
  sourceId: string | null;
  sourceType: string | null;
  timestampSec: number | null;
}): string | null {
  if (!e.sourceId || e.sourceId === "demo") return null;
  const nonVideo = new Set(["book", "upload", "sentence_pack", "talk_lesson"]);
  if (e.sourceType && nonVideo.has(e.sourceType)) return null;
  const t = e.timestampSec ?? 0;
  return `/watch/${encodeURIComponent(e.sourceId)}?t=${Math.max(0, Math.floor(t))}`;
}

/** M:SS formatter for timestamp displays. */
export function formatTimestamp(sec: number | null | undefined): string {
  if (sec == null) return "";
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

/** Case-insensitive highlight of the lemma in a line. Never injects HTML. */
function highlight(line: string, lemma: string): React.ReactNode {
  if (!lemma) return line;
  const needle = lemma.toLowerCase();
  const chunks: React.ReactNode[] = [];
  let i = 0;
  const low = line.toLowerCase();
  while (i < line.length) {
    const found = low.indexOf(needle, i);
    if (found === -1) {
      chunks.push(line.slice(i));
      break;
    }
    if (found > i) chunks.push(line.slice(i, found));
    chunks.push(
      <mark key={found} className={styles.mark}>
        {line.slice(found, found + lemma.length)}
      </mark>,
    );
    i = found + lemma.length;
  }
  return <>{chunks}</>;
}
