"use client";

/**
 * FlashcardDeck — Wave 10 extension-parity deck component.
 *
 * Replaces the old grid-of-cards layout used by `/learn/slang` and
 * `/learn/tiny-lessons/[situation]`. Mirrors the extension's
 * "FLASHCARD DECK (Tiny Lessons + Slang Hang)" block in
 * docs/design-reference/extension-fun-learning.css:
 *   - Single `.flashcard` centered, max-width 560px, 340px tall (380px <560px)
 *   - 3D flip on tap, Space/Enter also flips
 *   - Prev/Next below the card (ArrowLeft / ArrowRight keyboard shortcuts)
 *   - Deck-head: title + "n / N" counter
 *   - Slim progress bar below the head
 *   - prefers-reduced-motion kills the flip transition (state still toggles)
 *
 * The outer trigger uses `<div role="button">` NOT `<button>` because the
 * BACK face renders a SlangAudioButton — a `<button>` inside a `<button>`
 * is invalid HTML and triggers a React hydration warning (fixed in the
 * commit this branch forks from).
 */

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./FlashcardDeck.module.css";

export interface FlashcardFaces {
  /** FRONT face content — rendered inside `.fcFront`. */
  front: ReactNode;
  /** BACK face content — rendered inside `.fcBack`. */
  back: ReactNode;
  /** ARIA label describing this card for the trigger element. */
  ariaLabel: string;
}

export interface FlashcardDeckProps {
  /** Deck title (left of the counter in `.deckHead`). */
  title: string;
  /** Optional subtitle/meta chip rendered above the deck-head. */
  heroMeta?: ReactNode;
  /** List of card face payloads, length = total deck size. */
  cards: FlashcardFaces[];
  /** Optional raw counter suffix ("n / N <suffix>"). Prefer `counterContext`. */
  counterSuffix?: string;
  /** Optional context name for a localised "n / N in <context>" counter
   *  (word order varies by locale, e.g. ja "<context>：n / N"). Wave 14. */
  counterContext?: string;
  /** Optional stable key per card — used so React resets state when the
   *  caller swaps the deck (e.g. a language switch). */
  deckKey?: string;
  /** Wave 15 — where Escape takes the learner (extension `te()` → `ae()`). */
  escapeHref?: string;
}

/** Extension `ye()` touchend threshold. */
export const SWIPE_THRESHOLD_PX = 60;

export function FlashcardDeck({
  title,
  heroMeta,
  cards,
  counterSuffix,
  counterContext,
  deckKey,
  escapeHref,
}: FlashcardDeckProps) {
  const t = useT();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Reset when the caller swaps the deck entirely.
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [deckKey, cards.length]);

  const total = cards.length;
  const safeIndex = Math.min(index, Math.max(0, total - 1));
  const current = cards[safeIndex];

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  // Wave 15 — extension `Se()` plays the paper-flick + 10 ms buzz on every
  // flip (click, Enter/Space).
  const toggleFlip = useCallback(() => {
    setFlipped((f) => !f);
    fx.flip();
  }, []);

  // Wave 15 — web-only "deck end" cue: the first time the learner lands on
  // the last card of this deck, play the success chime once. The extension
  // has no end-of-deck moment; we reuse its `correct` cue (see sound.ts).
  const endCuedRef = useRef(false);
  useEffect(() => {
    endCuedRef.current = false;
  }, [deckKey, total]);
  useEffect(() => {
    if (total > 1 && index === total - 1 && !endCuedRef.current) {
      endCuedRef.current = true;
      fx.complete();
    }
  }, [index, total]);

  // Wave 15 — extension swipe: touchstart/touchend on the card, |dx| > 60px
  // advances (left = next, right = prev). No sound, same as the extension.
  const touchX = useRef<number | null>(null);
  // A swipe ends with a synthetic click on touch devices — swallow it so the
  // card doesn't also flip.
  const swipedRef = useRef(false);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    const end = e.changedTouches[0]?.clientX;
    if (start == null || end == null) return;
    const dx = end - start;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      swipedRef.current = true;
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // Global keyboard shortcuts. ArrowLeft/Right advance; Space/Enter flip
  // the current card. Guard against the user typing in an input/textarea.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      if (e.key === "Escape" && escapeHref) {
        // Extension `te()`: Escape leaves the deck (lesson → situation grid,
        // slang → landing).
        e.preventDefault();
        router.push(escapeHref as never);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === " " || e.key === "Enter") {
        // Only flip when focus is on the deck or body — don't swallow
        // Enter on nav buttons (those have their own click handler).
        const active = document.activeElement as HTMLElement | null;
        if (active && (active.tagName === "BUTTON" || active.tagName === "A")) return;
        e.preventDefault();
        toggleFlip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, toggleFlip, escapeHref, router]);

  if (total === 0 || !current) return null;

  const progressPct = total > 1 ? ((safeIndex + 1) / total) * 100 : 100;
  const counterParams = { current: safeIndex + 1, total };
  const counterText = counterContext
    ? t("deck.counterIn", { ...counterParams, situation: counterContext })
    : counterSuffix && counterSuffix.length > 0
      ? `${t("deck.counter", counterParams)} ${counterSuffix}`
      : t("deck.counter", counterParams);

  return (
    <div className={styles.deck} data-testid="flashcard-deck">
      {heroMeta && <div>{heroMeta}</div>}
      <div className={styles.deckHead}>
        <h2 className={styles.deckTitle}>{title}</h2>
        <span className={styles.deckCounter} data-testid="deck-counter" aria-live="polite">
          {counterText}
        </span>
      </div>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={safeIndex + 1}
        aria-label={t("deck.cardAria", counterParams)}
      >
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        className={styles.flashcard}
        data-flipped={flipped ? "true" : "false"}
        data-testid="flashcard"
        aria-pressed={flipped}
        aria-label={current.ariaLabel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (swipedRef.current) {
            swipedRef.current = false;
            return;
          }
          // Taps on the inner 🔊 button (or anything marked no-flip)
          // mustn't trigger a flip.
          const target = e.target as HTMLElement;
          if (target.closest("[data-no-flip]")) return;
          toggleFlip();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            const target = e.target as HTMLElement;
            if (target.closest("[data-no-flip]")) return;
            e.preventDefault();
            toggleFlip();
          }
        }}
      >
        <div className={styles.fcInner}>
          <div className={`${styles.fcFace} ${styles.fcFront}`}>{current.front}</div>
          <div className={`${styles.fcFace} ${styles.fcBack}`}>{current.back}</div>
        </div>
      </div>

      <div className={styles.deckNav}>
        <span className={styles.deckHint} aria-hidden="true">
          {t("deck.hintText")}
        </span>
        <div className={styles.navBtns}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => {
              fx.tap();
              goPrev();
            }}
            disabled={safeIndex === 0}
            aria-label={t("deck.navPrevAria")}
            data-testid="deck-prev"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("deck.navPrev")}
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnPrimary}`}
            onClick={() => {
              fx.tap();
              goNext();
            }}
            disabled={safeIndex >= total - 1}
            aria-label={t("deck.navNextAria")}
            data-testid="deck-next"
          >
            {t("deck.navNext")}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Expose module class names so route-level components can place extension
 *  pieces (badges, hints, labels) inside the faces without re-defining the
 *  design-system styles. */
export { styles as flashcardDeckStyles };
