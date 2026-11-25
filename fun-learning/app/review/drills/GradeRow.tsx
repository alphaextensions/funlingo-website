"use client";

/**
 * Shared "Again / Hard / Good / Easy" row of grade buttons used by every
 * drill that goes to a reveal state. Each button carries a visible shortcut
 * (1-4), an aria-label, and an aria-keyshortcuts hint. The buttons are
 * non-color-distinguished too: each uses a glyph (× - ✓ ★) so a grey-scale
 * display still conveys the grade.
 */

import type { UiGrade } from "../types";
import { fx } from "@/lib/feedback";
import { useT } from "@/lib/i18n/client";
import styles from "./GradeRow.module.css";

export function GradeRow({
  onGrade,
  disabled,
  layout = "row",
}: {
  onGrade: (g: UiGrade) => void;
  disabled?: boolean;
  layout?: "row" | "stack";
}) {
  const t = useT();
  const grades: { g: UiGrade; key: string; shortcut: string; glyph: string; tone: string }[] = [
    { g: 1, key: "reviewDrill.gradeAgain", shortcut: "1", glyph: "×", tone: "again" },
    { g: 2, key: "reviewDrill.gradeHard", shortcut: "2", glyph: "–", tone: "hard" },
    { g: 3, key: "reviewDrill.gradeGood", shortcut: "3", glyph: "✓", tone: "good" },
    { g: 4, key: "reviewDrill.gradeEasy", shortcut: "4", glyph: "★", tone: "easy" },
  ];
  return (
    <div
      className={styles.row}
      data-layout={layout}
      role="group"
      aria-label={t("reviewDrill.gradeGroupAria")}
    >
      {grades.map((item) => {
        const label = t(item.key);
        return (
          <GradeBtn
            key={item.g}
            onClick={() => onGrade(item.g)}
            disabled={disabled}
            label={label}
            ariaLabel={t("reviewDrill.gradeBtnAria", { label, shortcut: item.shortcut })}
            shortcut={item.shortcut}
            glyph={item.glyph}
            tone={item.tone}
          />
        );
      })}
    </div>
  );
}

function GradeBtn({
  onClick,
  disabled,
  label,
  ariaLabel,
  shortcut,
  glyph,
  tone,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  ariaLabel: string;
  shortcut: string;
  glyph: string;
  tone: string;
}) {
  return (
    <button
      type="button"
      className={styles.btn}
      data-tone={tone}
      aria-label={ariaLabel}
      aria-keyshortcuts={shortcut}
      onClick={() => {
        // Wave 15 — web-only surface; extension buttons all fire `$e.tap()`.
        fx.tap();
        onClick();
      }}
      disabled={disabled}
    >
      <span className={styles.glyph} aria-hidden="true">{glyph}</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.shortcut} aria-hidden="true">{shortcut}</span>
    </button>
  );
}
