import type { ReactNode, HTMLAttributes } from "react";
import styles from "./Card.module.css";

type CardElementProps = Omit<HTMLAttributes<HTMLDivElement>, "title">;

export interface CardProps extends CardElementProps {
  /** Hover lift + glow. Automatically on for `role="button"`. */
  interactive?: boolean;
  /** Removes the glass background + shadow. Still carries the border. */
  flat?: boolean;
  /** Tighter padding — use for list rows and nested cards. */
  compact?: boolean;
  /** Optional eyebrow (small, uppercase label above the title). */
  eyebrow?: ReactNode;
  /** Optional title rendered as an h3. */
  title?: ReactNode;
  /** Trailing adornment inside the header row (e.g. a Count badge). */
  trailing?: ReactNode;
}

/**
 * Card — the universal glass surface used for every content tile.
 *
 * Use `role="button"` + `tabIndex={0}` for clickable cards; the module
 * adds the lift/glow automatically. Icon-only children must carry their
 * own `aria-label` (QA rule).
 */
export function Card({
  interactive,
  flat,
  compact,
  eyebrow,
  title,
  trailing,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [styles.card];
  if (interactive) classes.push(styles.interactive);
  if (flat) classes.push(styles.flat);
  if (compact) classes.push(styles.compact);
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")} {...rest}>
      {(eyebrow || title || trailing) && (
        <header className={styles.cardHeader}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {eyebrow && <span className={styles.cardEyebrow}>{eyebrow}</span>}
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
          </div>
          {trailing}
        </header>
      )}
      {children}
    </div>
  );
}
