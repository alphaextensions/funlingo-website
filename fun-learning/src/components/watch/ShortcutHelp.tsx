"use client";

import { useEffect } from "react";
import { SHORTCUT_HELP } from "@/lib/watch/useKeyboard";
import { useT } from "@/lib/i18n/client";
import styles from "./ShortcutHelp.module.css";

export function ShortcutHelp({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useT();
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className={styles.scrim}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("watch.shortcutsTitle")}
    >
      <div className={styles.card} onClick={(e) => e.stopPropagation()} data-fnl-wordcard>
        <header className={styles.head}>
          <h2 className={styles.title}>{t("watch.shortcutsTitle")}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label={t("watch.shortcutsCloseAria")}
            onClick={onClose}
            autoFocus
          >
            ×
          </button>
        </header>
        <dl className={styles.list}>
          {SHORTCUT_HELP.map((s) => (
            <div key={s.key} className={styles.row}>
              <dt className={styles.key}>
                <kbd className={styles.kbd}>{s.key}</kbd>
              </dt>
              <dd className={styles.label}>{t(s.labelKey)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
