"use client";

/**
 * Guess-the-meaning drill — 4 options. Correct = auto Good (3). Wrong = auto
 * Hard (2). We synthesise 3 distractors from a small built-in pool of generic
 * meanings — the AI module's `wordCard` could later supply richer distractors
 * from the user's own saved lemmas; for v1 the pool is enough to drive the
 * drill without a model call per card.
 *
 * Non-color signal: correct chip shows ✓, wrong shows ✗.
 */

import { useMemo, useState } from "react";
import type { ReviewSessionCard, UiGrade } from "../types";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./GuessMeaning.module.css";

// Pool keys for harmless, generic placeholder meanings so the drill works even
// before the AI module backfills real distractors. Content-filter-safe (nouns
// of everyday objects / concepts). Localized to the learner's native language
// (see reviewDrill.guessPool* in the catalog) so they read naturally next to the
// native-language correct meaning.
const DISTRACTOR_POOL_KEYS = Array.from(
  { length: 12 },
  (_, i) => `reviewDrill.guessPool${i + 1}`,
);

function pickDistractors(
  correct: string,
  n: number,
  seed: string,
  pool: string[],
): string[] {
  // Deterministic shuffle by seed hash — avoids SSR hydration mismatches.
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const filtered = pool.filter(
    (p) => p.toLowerCase() !== correct.toLowerCase(),
  );
  const result: string[] = [];
  const used = new Set<number>();
  while (result.length < n) {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    const idx = (h >>> 0) % filtered.length;
    if (used.has(idx)) continue;
    used.add(idx);
    result.push(filtered[idx]);
    if (used.size >= filtered.length) break;
  }
  return result;
}

export function GuessMeaning({
  card,
  onGrade,
  disabled,
}: {
  card: ReviewSessionCard;
  onGrade: (g: UiGrade) => void;
  disabled?: boolean;
}) {
  const t = useT();
  const w = card.word;
  const correct =
    w?.note?.trim() || w?.encounter?.translation?.trim() || t("reviewDrill.guessFallbackMeaning");

  const pool = useMemo(
    () => DISTRACTOR_POOL_KEYS.map((k) => t(k)),
    [t],
  );

  const options = useMemo(() => {
    const distractors = pickDistractors(correct, 3, card.cardId, pool);
    const all = [correct, ...distractors];
    // Deterministic shuffle (seed = cardId reversed) for stable render.
    let h = 2166136261 >>> 0;
    for (let i = 0; i < card.cardId.length; i++) {
      h ^= card.cardId.charCodeAt(card.cardId.length - 1 - i);
      h = Math.imul(h, 16777619);
    }
    for (let i = all.length - 1; i > 0; i--) {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      const j = (h >>> 0) % (i + 1);
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, [correct, card.cardId, pool]);

  const [choice, setChoice] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  function choose(opt: string) {
    if (choice || disabled) return;
    setChoice(opt);
    // Wave 15 — same cues as the extension's quiz answer.
    if (opt === correct) fx.correct();
    else fx.wrong();
    if (opt === correct) {
      // Delay slightly so the user sees the ✓ before the next card loads.
      setTimeout(() => onGrade(3), 450);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      // Reveal the correct answer by re-painting state, then grade Hard.
      setTimeout(() => onGrade(2), 950);
    }
  }

  if (!w) return null;

  return (
    <article
      className={styles.card}
      data-shaking={shaking || undefined}
    >
      <div className={styles.lemma} translate="no">{w.lemma}</div>
      {w.encounter?.line && (
        <p className={styles.scene}>&ldquo;{w.encounter.line}&rdquo;</p>
      )}
      <ul
        className={styles.options}
        role="radiogroup"
        aria-label={t("quiz.pickAria")}
      >
        {options.map((opt) => {
          const isCorrect = choice && opt === correct;
          const isWrong = choice === opt && opt !== correct;
          const show = choice && (opt === correct || opt === choice);
          return (
            <li key={opt}>
              <button
                type="button"
                className={styles.option}
                data-state={
                  isCorrect ? "correct" : isWrong ? "wrong" : show ? "muted" : undefined
                }
                onClick={() => choose(opt)}
                disabled={disabled || Boolean(choice)}
                aria-pressed={choice === opt}
              >
                <span className={styles.optionGlyph} aria-hidden="true">
                  {isCorrect ? "✓" : isWrong ? "✗" : "·"}
                </span>
                <span className={styles.optionText}>{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
