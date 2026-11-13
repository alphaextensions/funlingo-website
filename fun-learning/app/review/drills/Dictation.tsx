"use client";

/**
 * Dictation drill — SPEC §11 "Type it".
 *   - Audio plays via the browser's SpeechSynthesis API (no server call).
 *   - Case / punctuation ignored (`dictationMatches`).
 *   - Hint reveals ONLY missing letters (`hint()` returns "." for already-typed
 *     letters). Veto test #3.
 *   - Cursor jumps to first error on wrong submit (`firstErrorIndex`).
 *   - aria-live announces feedback.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewSessionCard, UiGrade } from "../types";
import { GradeRow } from "./GradeRow";
import {
  dictationMatches,
  firstErrorIndex,
  hint as dictationHint,
  normalize,
} from "@/server/review/dictation";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./Dictation.module.css";
import chipStyles from "@/components/DrillChip.module.css";

export function Dictation({
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
  const sentence = card.sentence?.text ?? "";
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState<null | "ok" | "wrong">(null);
  const [showHint, setShowHint] = useState(false);
  const [showText, setShowText] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(sentence);
    u.lang = toBcp47(card.lang);
    u.rate = 0.95;
    synth.speak(u);
  }, [sentence, card.lang]);

  useEffect(() => {
    // Autoplay once on mount so the drill feels responsive. Browsers block
    // speechSynthesis without user interaction on some setups — the Replay
    // button covers that case.
    const t = setTimeout(play, 150);
    return () => clearTimeout(t);
  }, [play]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (checked === "ok") return;
    if (dictationMatches(sentence, typed)) {
      fx.correct();
      setChecked("ok");
    } else {
      fx.wrong();
      setChecked("wrong");
      // Jump cursor to first error.
      const idx = firstErrorIndex(sentence, typed);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(idx, idx);
      });
    }
  }

  const hintStr = dictationHint(sentence, typed);
  const normalizedTarget = normalize(sentence);

  const feedbackText =
    checked === "ok"
      ? t("reviewDrill.dictCorrect")
      : checked === "wrong"
        ? t("reviewDrill.dictWrong")
        : "";

  if (!card.sentence) return null;

  const lettersRemaining = normalizedTarget.length - normalize(typed).length;

  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={chipStyles.chip}>{t("review.drillDictation")}</span>
        {card.sentence.sourceTitle && (
          <span className={styles.source}>{card.sentence.sourceTitle}</span>
        )}
      </header>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.playBtn}
          onClick={play}
          disabled={disabled}
          aria-label={t("reviewDrill.dictReplayAria")}
        >
          <span aria-hidden="true" className={styles.playGlyph}>▶</span>
          <span>{t("reviewDrill.dictReplay")}</span>
        </button>
        <button
          type="button"
          className={styles.hintBtn}
          onClick={() => setShowHint(true)}
          disabled={disabled || showHint}
          aria-label={t("reviewDrill.dictHintAria")}
        >
          {t("reviewDrill.dictHint")}
        </button>
      </div>

      {showHint && (
        <p
          className={styles.hint}
          aria-label={t("reviewDrill.dictHintDotsAria")}
          data-testid="dictation-hint"
        >
          {hintStr.split("").map((ch, i) => (
            <span
              key={i}
              className={ch === "." ? styles.hintDone : styles.hintMissing}
            >
              {ch === "." ? "·" : ch}
            </span>
          ))}
        </p>
      )}

      <form onSubmit={submit} className={styles.form}>
        <label htmlFor="dictation-input" className={styles.sr}>
          {t("reviewDrill.dictTypeLabel")}
        </label>
        <textarea
          id="dictation-input"
          ref={inputRef}
          className={styles.input}
          data-state={checked ?? undefined}
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value);
            if (checked === "wrong") setChecked(null);
          }}
          rows={3}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={disabled || checked === "ok"}
          placeholder={t("reviewDrill.dictPlaceholder")}
          aria-describedby="dictation-feedback"
        />
        <output
          id="dictation-feedback"
          className={styles.feedback}
          data-state={checked ?? undefined}
          aria-live="polite"
          aria-atomic="true"
        >
          <span aria-hidden="true" className={styles.feedbackGlyph}>
            {checked === "ok" ? "✓" : checked === "wrong" ? "✗" : "·"}
          </span>
          <span className={styles.feedbackText}>{feedbackText || " "}</span>
        </output>

        {checked === "ok" ? (
          <>
            <p className={styles.sentenceReveal}>{sentence}</p>
            {card.sentence.translation && (
              <p className={styles.translation}>{card.sentence.translation}</p>
            )}
            <GradeRow onGrade={onGrade} disabled={disabled} />
          </>
        ) : (
          <div className={styles.formRow}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={disabled || normalize(typed).length === 0}
            >
              {t("reviewDrill.dictCheck")}
            </button>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => setShowText((v) => !v)}
              disabled={disabled}
              aria-expanded={showText}
            >
              {showText ? t("reviewDrill.dictHideText") : t("reviewDrill.dictShowText")}
            </button>
            {onSkip && (
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={onSkip}
                disabled={disabled}
              >
                {t("quiz.skip")}
              </button>
            )}
          </div>
        )}
      </form>

      {showText && checked !== "ok" && (
        <p className={styles.sentenceReveal} data-reveal>
          {sentence}
        </p>
      )}

      <p className={styles.sr} aria-live="polite">
        {t(
          lettersRemaining === 1
            ? "reviewDrill.dictLettersRemainingSingular"
            : "reviewDrill.dictLettersRemainingPlural",
          { n: lettersRemaining },
        )}
      </p>
    </article>
  );
}

/** Rough BCP-47 mapping for SpeechSynthesis. */
function toBcp47(lang: string): string {
  const map: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    ja: "ja-JP",
    ko: "ko-KR",
    hi: "hi-IN",
    ar: "ar-SA",
    gu: "gu-IN",
    mr: "mr-IN",
  };
  return map[lang] ?? lang;
}
