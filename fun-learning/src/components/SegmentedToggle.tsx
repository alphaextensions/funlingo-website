"use client";

import type { ReactNode } from "react";
import styles from "./SegmentedToggle.module.css";

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  "aria-label"?: string;
}

/**
 * SegmentedToggle — single-select switch. Non-color state signals: the
 * active segment has heavier font weight + an inner ring (QA rule).
 */
export function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
  ariaLabel = "View",
}: {
  value: T;
  onChange: (next: T) => void;
  options: SegmentedOption<T>[];
  ariaLabel?: string;
}) {
  return (
    <div className={styles.wrap} role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={styles.seg}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          aria-label={o["aria-label"]}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* Convenience icons used in Words/Sentences */

export const IconGrid = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="4" y="13" width="7" height="7" rx="1" />
    <rect x="13" y="13" width="7" height="7" rx="1" />
  </svg>
);

export const IconList = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
