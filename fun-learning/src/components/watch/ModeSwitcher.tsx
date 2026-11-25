"use client";

/**
 * Layout mode switcher (Default / Focus / Cinema).
 *
 * - Keyboard: 1 / 2 / 3 (handled by the parent's shortcut hook).
 * - aria-pressed on each toggle for assistive tech.
 * - Non-color signal: active mode shows a filled pill with heavier weight
 *   AND a 2px underline bar — not just a color change.
 */

import type { WatchMode } from "@/lib/watch/types";
import { useT } from "@/lib/i18n/client";
import styles from "./ModeSwitcher.module.css";

const MODES: { value: WatchMode; labelKey: string; key: string }[] = [
  { value: "default", labelKey: "watch.modeDefault", key: "1" },
  { value: "focus", labelKey: "watch.modeFocus", key: "2" },
  { value: "cinema", labelKey: "watch.modeCinema", key: "3" },
];

export function ModeSwitcher({
  mode,
  onChange,
}: {
  mode: WatchMode;
  onChange: (next: WatchMode) => void;
}) {
  const t = useT();
  return (
    <div className={styles.wrap} role="group" aria-label={t("watch.modeGroupAria")}>
      {MODES.map((m) => {
        const label = t(m.labelKey);
        return (
        <button
          key={m.value}
          type="button"
          aria-pressed={mode === m.value}
          aria-label={t("watch.modeAria", { label, key: m.key })}
          className={`${styles.btn} ${mode === m.value ? styles.active : ""}`}
          onClick={() => onChange(m.value)}
        >
          <span className={styles.label}>{label}</span>
          <kbd className={styles.kbd}>{m.key}</kbd>
        </button>
        );
      })}
    </div>
  );
}
