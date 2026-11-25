import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

/**
 * PageHeader — the heading block at the top of each content route.
 * Keeps the hero style for `/` separate; this is the compact in-app header.
 *
 * Design HIGH-D5: the eyebrow colour is canonicalised to --fl-accent and
 * ships with a small pulsing dot by default. Dense pages opt out with
 * `showDot={false}`.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  showDot = true,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  showDot?: boolean;
}) {
  return (
    <header className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.titleCol}>
          {eyebrow && (
            <span className={styles.eyebrow}>
              {showDot && <span className={styles.eyebrowDot} aria-hidden="true" />}
              {eyebrow}
            </span>
          )}
          <h1 className={styles.title}>{title}</h1>
          {lede && <p className={styles.lede}>{lede}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
}
