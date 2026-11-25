"use client";

import type { ReactNode } from "react";
import styles from "./FilterChip.module.css";

/**
 * FilterChip — single filter pill.
 *
 * Selected state is announced via `aria-pressed` and has three non-color
 * signals: a ✓ glyph, heavier font weight, and an inner ring.
 */
export function FilterChip({
  selected,
  onToggle,
  children,
  "aria-label": ariaLabel,
}: {
  selected?: boolean;
  onToggle?: () => void;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      className={selected ? `${styles.chip} ${styles.selected}` : styles.chip}
      onClick={onToggle}
      aria-pressed={selected ? true : false}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export function FilterRow({
  label,
  children,
}: {
  label?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.row}>
      {label && <span className={styles.label}>{label}</span>}
      {children}
    </div>
  );
}
