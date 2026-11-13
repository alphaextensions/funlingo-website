import type { Route } from "next";
import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";
import { CtaAction, CtaButton } from "./CtaButton";

export interface EmptyStateAction {
  href?: Route;
  onClick?: () => void;
  label: string;
  variant?: "primary" | "secondary";
}

export interface EmptyStateProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  actions?: EmptyStateAction[];
  /** Rendered after the auto-built actions row. Use for form-POST buttons
   *  (e.g. Auth.js sign-in) or any custom control the actions[] shape can't
   *  express. */
  actionsSlot?: ReactNode;
  /** Reduced-chrome variant for inline use inside a list. */
  inline?: boolean;
  /** Optional illustration slot — defaults to a sparkle. */
  illustration?: ReactNode;
}

// A filled two-star sparkle. The previous glyph was 8 radial spokes inside a
// bordered circle, which read as a loading spinner (QA/Design 2026-10-25, 5
// surfaces). A filled sparkle says "fresh / start here", never "loading".
const DefaultIllustration = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13 2c.3 3.2 1.3 4.9 2.6 6.1C16.9 9.4 18.7 10.4 22 10.7c-3.3.3-5.1 1.3-6.4 2.6-1.3 1.3-2.3 3-2.6 6.1-.3-3.2-1.3-4.9-2.6-6.1C8.1 12 6.3 11 3 10.7c3.3-.3 5.1-1.3 6.4-2.6C10.7 6.9 11.7 5.2 13 2Z" />
    <path d="M6 15c.15 1.5.6 2.3 1.2 2.9.6.6 1.4 1 2.9 1.2-1.5.15-2.3.6-2.9 1.2-.6.6-1 1.4-1.2 2.9-.15-1.5-.6-2.3-1.2-2.9-.6-.6-1.4-1-2.9-1.2 1.5-.15 2.3-.6 2.9-1.2C5.4 17.3 5.8 16.5 6 15Z" />
  </svg>
);

/**
 * EmptyState — the warm first-use card that every list page shows when
 * there's nothing to display. SPEC §4 Home empty state inspired the voice:
 * explain what the user does, don't just say "no data".
 *
 * Wave 4 design-polish: the primary / secondary actions now render through
 * the shared `<CtaButton>` / `<CtaAction>` so the gradient pill, the glow,
 * and (crucially) the `prefers-reduced-motion` gating on the hover-lift all
 * live in one place.
 */
export function EmptyState({
  eyebrow,
  title,
  body,
  actions,
  actionsSlot,
  inline,
  illustration = DefaultIllustration,
}: EmptyStateProps) {
  const hasActions = (actions && actions.length > 0) || actionsSlot;
  return (
    <section
      className={inline ? `${styles.wrap} ${styles.inline}` : styles.wrap}
      role="status"
    >
      {illustration && <div className={styles.illustration} aria-hidden="true">{illustration}</div>}
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {body && <p className={styles.body}>{body}</p>}
      {hasActions && (
        <div className={styles.actions}>
          {actions?.map((action) => {
            const variant = action.variant === "secondary" ? "secondary" : "primary";
            if (action.href) {
              return (
                <CtaButton
                  key={action.label}
                  href={action.href}
                  variant={variant}
                >
                  {action.label}
                </CtaButton>
              );
            }
            return (
              <CtaAction
                key={action.label}
                variant={variant}
                onClick={action.onClick}
              >
                {action.label}
              </CtaAction>
            );
          })}
          {actionsSlot}
        </div>
      )}
    </section>
  );
}
