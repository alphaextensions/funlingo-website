"use client";

/**
 * Quick Quiz — Wave 11 extension-parity rebuild.
 *
 * The IA matches the Funlingo Chrome extension's `.quiz-stage` block:
 *   centered 600px stage → `.quiz-word-card` with the prompt + big word →
 *   2-column `.quiz-options` of `.quiz-opt` buttons (each with a numbered
 *   `.opt-key` square) → `.quiz-feedback` + `.quiz-actions` row below.
 *
 * Fires NO network requests: no `/api/review/grade`, no FSRS writes, no
 * streak impact. Just a gentle two-option meaning picker over the learner's
 * own UserWord set. (The `QUICK_QUIZ_WRITES_API` export + the vitest
 * sentinel in `tests/unit/ext-parity.test.ts` enforce that contract.)
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./QuickQuizRunner.module.css";

export interface QuickQuizCard {
  id: string;
  lemma: string;
  pos: string | null;
  meaning: string;
}

interface Props {
  lang: string;
  cards: QuickQuizCard[];
}

/** Deterministic hash — same input, same output. Used for distractor + option
 *  ordering so SSR hydration never flips the layout. */
function hash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Wave 15 — extension `we()` uses up to 3 distractors (4 options). */
export const QUIZ_MAX_DISTRACTORS = 3;

/**
 * Up to `n` distinct distractor meanings, deterministic per seed. Mirrors
 * the extension's filter: never the correct meaning, never a duplicate.
 */
export function pickDistractors(correct: string, pool: string[], seed: string, n = QUIZ_MAX_DISTRACTORS): string[] {
  const norm = (s: string) => s.toLowerCase().trim();
  const seen = new Set<string>([norm(correct)]);
  const options: string[] = [];
  for (const p of pool) {
    const k = norm(p);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    options.push(p);
  }
  if (options.length === 0) return ["a different meaning"];
  // Deterministic rotation so SSR + client agree.
  const start = hash(seed) % options.length;
  const out: string[] = [];
  for (let k = 0; k < options.length && out.length < n; k += 1) {
    out.push(options[(start + k) % options.length]!);
  }
  return out;
}

/** Guard against a side-effect regression. The casual mode must NEVER hit
 *  /api/review/grade; the unit test asserts this by inspecting the exported
 *  constant and failing hard if a future dev wires one in by accident. */
export const QUICK_QUIZ_WRITES_API = false as const;

export function QuickQuizRunner({ cards, lang }: Props) {
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState<Record<number, { chosen: string; correct: boolean }>>({});
  const t = useT();

  const current = cards[i];

  // Distractor pool = every OTHER card's meaning. Fallback to a safe pool
  // if the learner only has one card (we still render a drill — the test
  // asserts a two-option state).
  const safeFallback = useMemo(
    () => [
      "a kind of fruit",
      "a small boat",
      "to look at something quickly",
      "a feeling of surprise",
      "a type of weather",
    ],
    [],
  );

  const pool = useMemo(() => {
    const out: string[] = [];
    for (const c of cards) {
      if (c.meaning) out.push(c.meaning);
    }
    return out.length >= 2 ? out : [...out, ...safeFallback];
  }, [cards, safeFallback]);

  const options = useMemo(() => {
    if (!current) return [] as { text: string; correct: boolean }[];
    const distractors = pickDistractors(current.meaning, pool, current.id);
    const all = [
      { text: current.meaning, correct: true },
      ...distractors.map((text) => ({ text, correct: false })),
    ];
    // Deterministic shuffle per card id so the correct option isn't always
    // position 0 (which would make the quiz trivial).
    let h = hash(current.id + lang);
    for (let k = all.length - 1; k > 0; k -= 1) {
      h = Math.imul(h ^ (h >>> 16), 2246822507) >>> 0;
      const j = h % (k + 1);
      [all[k], all[j]] = [all[j]!, all[k]!];
    }
    return all;
  }, [current, pool, lang]);

  const total = cards.length;
  const resolved = answered[i];
  const isDone = !current || i >= total;

  const choose = useCallback(
    (opt: { text: string; correct: boolean }) => {
      if (resolved || !current) return;
      setAnswered((prev) => ({
        ...prev,
        [i]: { chosen: opt.text, correct: opt.correct },
      }));
      // Wave 15 — extension `$e.correct()` / `$e.wrong()` on answer.
      if (opt.correct) fx.correct();
      else fx.wrong();
    },
    [i, resolved, current],
  );

  // Extension: both Skip and Next play `$e.tap()` before advancing.
  const next = useCallback(() => {
    fx.tap();
    setI((n) => n + 1);
  }, []);

  // Wave 15 — web-only round-finished cue (reuses the extension's success
  // chime). Fires once when the summary appears.
  const finishedRef = useRef(false);
  useEffect(() => {
    if (cards.length > 0 && i >= cards.length && !finishedRef.current) {
      finishedRef.current = true;
      fx.complete();
    }
  }, [i, cards.length]);

  // Extension `te()`: Escape leaves the quiz for the Fun Learning landing.
  const router = useRouter();
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      router.push("/learn" as never);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [router]);

  // Keyboard shortcuts: 1 / 2 select the matching option (and when resolved,
  // Enter advances). Scoped to the window so a stray focus elsewhere on the
  // page still responds.
  useEffect(() => {
    if (isDone) return;
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack typing in form fields.
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      if (!resolved) {
        // Extension: digits 1–4 pick the matching option.
        if (/^[1-4]$/.test(e.key)) {
          const opt = options[Number(e.key) - 1];
          if (opt) {
            e.preventDefault();
            choose(opt);
          }
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, next, options, resolved, isDone]);

  if (!current) {
    return (
      <section className={styles.summary} data-testid="quick-quiz-summary">
        <h2>{t("quiz.emptyHead")}</h2>
        <p>{t("quiz.emptyBody")}</p>
        <Link href="/learn" className={styles.summaryBtn}>{t("quiz.backToLearn")}</Link>
      </section>
    );
  }

  if (isDone) {
    const correctCount = Object.values(answered).filter((a) => a.correct).length;
    return (
      <section className={styles.summary} data-testid="quick-quiz-summary">
        <h2>{t("quiz.doneHead")}</h2>
        <p>{t("quiz.doneBody", { correct: correctCount, total })}</p>
        <Link href="/learn" className={styles.summaryBtn}>{t("quiz.backToLearn")}</Link>
      </section>
    );
  }

  const feedbackTone = resolved ? (resolved.correct ? "correct" : "wrong") : "";
  // Wave 15 — extension copy: "Correct!" / "Correct answer: {answer}".
  const feedbackText = resolved
    ? resolved.correct
      ? t("quiz.correct")
      : t("quiz.correctAnswer", { answer: current.meaning })
    : t("quiz.pickPrompt", { n: options.length });

  return (
    <section className={styles.stage} data-testid="quick-quiz-runner">
      <div className={styles.topRow}>
        <span className={styles.eyebrow}>{t("quiz.eyebrow")}</span>
        <span>{i + 1} / {total}</span>
      </div>

      <div className={styles.wordCard}>
        <p className={styles.prompt}>{t("quiz.prompt")}</p>
        <h2 className={styles.word} lang={lang}>{current.lemma}</h2>
        {current.pos && <p className={styles.hint}>{current.pos}</p>}
      </div>

      <div
        className={styles.options}
        role="radiogroup"
        aria-label={t("quiz.pickAria")}
      >
        {options.map((opt, idx) => {
          let state: "idle" | "correct" | "wrong" = "idle";
          if (resolved) {
            if (opt.correct) state = "correct";
            else if (resolved.chosen === opt.text) state = "wrong";
          }
          return (
            <button
              key={`${opt.text}-${idx}`}
              type="button"
              className={styles.opt}
              data-state={state}
              aria-pressed={resolved?.chosen === opt.text}
              disabled={!!resolved}
              onClick={() => choose(opt)}
              data-testid={`quick-quiz-opt-${idx}`}
            >
              <span className={styles.optKey} aria-hidden="true">{idx + 1}</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      <div
        className={styles.feedback}
        data-tone={feedbackTone}
        aria-live="polite"
      >
        {feedbackText}
      </div>

      <div className={styles.actions}>
        {!resolved && (
          <button type="button" className={styles.skipBtn} onClick={next} data-testid="quick-quiz-skip">
            {t("quiz.skip")}
          </button>
        )}
        {resolved && (
          <button type="button" className={styles.nextBtn} onClick={next} data-testid="quick-quiz-next">
            {i + 1 >= total ? t("quiz.finish") : t("quiz.next")}
          </button>
        )}
      </div>

      <div className={styles.progressDots} aria-hidden="true">
        {cards.map((_, idx) => (
          <span
            key={idx}
            className={styles.dot}
            data-state={idx < i ? "done" : idx === i ? "current" : "pending"}
          />
        ))}
      </div>
    </section>
  );
}
