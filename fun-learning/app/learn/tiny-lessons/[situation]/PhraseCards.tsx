"use client";

/**
 * PhraseCards — single-card deck for /learn/tiny-lessons/[situation].
 *
 * Wave 10 established the layout. Wave 12B parity sweep (triggered by Jay's
 * Slang Hang audit) also updated this deck, because the extension's shared
 * `he()` renderer in `learn.js` paints the FRONT face identically for
 * slang and tiny-lesson decks: era (slang-only), phrase, romanization,
 * big 🔊, then a `.fc-hint` with a hand-tap SVG.
 *
 * The 🔊 lives on BOTH faces (Wave 12B + 12C):
 *   - FRONT: large (52×52) — speaks the phrase before learner commits to flip
 *   - BACK: standard — speaks the phrase again
 *
 * Back face order (12C): meaning → usage → literal → divider → audio → hint.
 *
 * Hint lines carry the extension's `.fc-hint svg` hand-tap glyph.
 *
 * The outer flip-trigger is a `<div role="button">`, NOT a `<button>` — the
 * SlangAudioButton is a real `<button>` and nesting them is invalid HTML +
 * React hydration error (Wave 10 lesson, re-asserted in ext-parity tests).
 * Audio wrappers carry `data-no-flip` so audio taps don't bubble into a flip.
 */

import { useMemo } from "react";
import type { PhraseCard } from "@/lib/learn/content";
import { FlashcardDeck, flashcardDeckStyles as fc } from "@/components/learn/FlashcardDeck";
import { SlangAudioButton } from "@/components/SlangAudioButton";
import { useT } from "@/lib/i18n/client";

export interface PhraseCardsProps {
  lang: string;
  phrases: PhraseCard[];
  situationTitle?: string;
}

/** Hand-tap glyph the extension prints before each `.fc-hint`. Copied
 *  verbatim from `learn.js`. */
const TapHintIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 11V6a2 2 0 114 0v5m0 0V9a2 2 0 114 0v4m0-1a2 2 0 114 0v3a6 6 0 01-6 6h-2a6 6 0 01-5-3l-3-5a2 2 0 013-2l2 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PhraseCards({ lang, phrases, situationTitle }: PhraseCardsProps) {
  const t = useT();
  const cards = useMemo(
    () =>
      phrases.map((p) => ({
        ariaLabel: t("deck.phraseAriaFront", { phrase: p.phrase, meaning: p.meaning }),
        front: (
          <>
            <h3 className={fc.fcPhrase} lang={lang}>
              {p.phrase}
            </h3>
            {p.romanization && (
              <p className={fc.fcRoman}>{p.romanization}</p>
            )}
            <span className={fc.fcFrontAudio} data-no-flip>
              <SlangAudioButton
                text={p.phrase}
                lang={lang}
                size="lg"
                ariaLabel={`Hear "${p.phrase}"`}
              />
            </span>
            <span className={fc.fcHint}>
              {TapHintIcon}
              <span>{t("deck.tapForMeaning")}</span>
            </span>
          </>
        ),
        back: (
          <>
            <p className={fc.bMean}>{p.meaning}</p>
            {p.usage && <p className={fc.bUsage}>{p.usage}</p>}
            {p.literal && (
              <p className={fc.bLiteral}>{t("deck.literally", { text: p.literal })}</p>
            )}
            <div className={fc.bDivider} aria-hidden="true" />
            <div className={fc.bAudioRow} data-no-flip>
              <SlangAudioButton
                text={p.phrase}
                lang={lang}
                ariaLabel={`Hear "${p.phrase}"`}
              />
              <span className={fc.bAudioLabel}>{t("deck.hearPhrase")}</span>
            </div>
            <span className={fc.fcHint}>
              {TapHintIcon}
              <span>{t("deck.tapToFlipBack")}</span>
            </span>
          </>
        ),
      })),
    [phrases, lang, t],
  );

  return (
    <FlashcardDeck
      title={t("deck.lessonsTitle")}
      cards={cards}
      counterContext={situationTitle}
      deckKey={`${lang}-${phrases.length}-${situationTitle ?? ""}`}
      escapeHref="/learn/tiny-lessons"
    />
  );
}
