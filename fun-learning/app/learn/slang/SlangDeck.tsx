"use client";

/**
 * SlangDeck — single-card deck for /learn/slang.
 *
 * Wave 10 established the layout. Wave 12B closed four parity misses Jay
 * flagged from a side-by-side with the live extension:
 *   1. FRONT face now carries a large 🔊 that speaks the slang phrase
 *      (centered below the phrase, before the hint). The extension does
 *      the same via `<button class="listen-btn lg">` injected by the
 *      shared deck renderer in `learn.js`.
 *   2. Both face hints now lead with the hand-tap SVG from
 *      `extension-fun-learning.css` line 745.
 *   3. Era badge now matches the extension's casing (`.badge-pill` has
 *      no `text-transform`, so "everyday" stays lowercase, as it ships
 *      in the data).
 *   4. (Not here — in FlashcardDeck.) Next is the brand-gradient primary
 *      pill; Prev is the muted secondary.
 *
 * Wave 14 closed the Wave 12B i18n gap: the "Slang Hang" title and all
 * deck chrome now come from the UI-text catalog (`deck.*`, keyed on the
 * viewer's NATIVE language via useT()). Card content (phrase, meaning,
 * example) stays in the learning language / pack data.
 *
 * The SlangAudioButton is still outside the `<button>` tag — the flip
 * trigger is `<div role="button">` so a `<button>` isn't nested. Front
 * + back wrappers both carry `data-no-flip` so taps on 🔊 can't flip.
 */

import { useMemo } from "react";
import type { SlangCard } from "@/lib/learn/content";
import { FlashcardDeck, flashcardDeckStyles as fc } from "@/components/learn/FlashcardDeck";
import { SlangAudioButton } from "@/components/SlangAudioButton";
import { useT } from "@/lib/i18n/client";

export interface SlangDeckProps {
  lang: string;
  localeLabel: string;
  expressions: SlangCard[];
}

/** Hand-tap glyph the extension prints before each hint. The exact path is
 *  copied verbatim from `learn.js` (search for `fc-hint`). Kept inline here
 *  because the icon never changes with locale and lives inside the <span>. */
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

export function SlangDeck({ lang, localeLabel, expressions }: SlangDeckProps) {
  const t = useT();
  const cards = useMemo(
    () =>
      expressions.map((s) => ({
        ariaLabel: t("deck.slangAriaFront", { phrase: s.phrase, meaning: s.meaning }),
        front: (
          <>
            {s.era && <span className={fc.fcEra}>{s.era}</span>}
            <h3 className={fc.fcPhrase} lang={lang}>
              {s.phrase}
            </h3>
            {s.romanization && (
              <p className={fc.fcRoman}>{s.romanization}</p>
            )}
            {/* Large 🔊 directly below the phrase — matches the extension's
                `.listen-btn.lg`. `data-no-flip` on the wrapper so the card
                doesn't flip when the audio button is tapped. */}
            <span className={fc.fcFrontAudio} data-no-flip>
              <SlangAudioButton
                text={s.phrase}
                lang={lang}
                size="lg"
                ariaLabel={t("deck.hearAria", { text: s.phrase })}
              />
            </span>
            <span className={fc.fcHint}>
              {TapHintIcon}
              <span>{t("deck.tapToSeeMeaning")}</span>
            </span>
          </>
        ),
        back: (
          <>
            {s.register && (
              <span className={fc.fcRegister}>{s.register}</span>
            )}
            <p className={fc.bMean}>{s.meaning}</p>
            <div className={fc.bDivider} aria-hidden="true" />
            {s.example && (
              <p className={fc.bExample} lang={lang}>
                <span className={fc.lbl}>{t("deck.inContext")}</span>
                {s.example}
              </p>
            )}
            <div className={fc.bAudioRow} data-no-flip>
              <SlangAudioButton
                text={s.example ?? s.phrase}
                lang={lang}
                ariaLabel={s.example ? t("deck.hearAriaExample") : t("deck.hearAriaSlang")}
              />
              <span className={fc.bAudioLabel}>
                {s.example ? t("deck.hearInContext") : t("deck.hearPhrase")}
              </span>
            </div>
            <span className={fc.fcHint}>
              {TapHintIcon}
              <span>{t("deck.tapToFlipBack")}</span>
            </span>
          </>
        ),
      })),
    [expressions, lang, t],
  );

  const heroMeta = (
    <span className={fc.heroMeta}>
      <span>{localeLabel}</span>
      <span aria-hidden="true">·</span>
      <span>{t("deck.expressionsPlural", { n: expressions.length })}</span>
    </span>
  );

  return (
    <FlashcardDeck
      title={t("deck.slangTitle")}
      heroMeta={heroMeta}
      cards={cards}
      deckKey={`${lang}-${expressions.length}`}
      escapeHref="/learn"
    />
  );
}
