import Link from "next/link";
import type { Route } from "next";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./CtaButton.module.css";

/**
 * CtaButton — the signature pill call-to-action.
 *
 * Rolled out across Words, Read, Settings, Library pack-grids and anywhere
 * else that previously inlined a `linear-gradient(100deg, …)` style. One
 * component, one gradient, one hover rule.
 *
 * Design HIGH-D7 / MED.
 */
export type CtaVariant = "primary" | "secondary" | "danger";
export type CtaSize = "md" | "lg";

export interface CtaButtonLinkProps {
  href: Route | string;
  children: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  ariaLabel?: string;
  /** External link — adds target + rel. */
  external?: boolean;
}

export interface CtaButtonActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
}

function classesFor(variant: CtaVariant, size: CtaSize, extra?: string): string {
  const parts = [styles.cta];
  parts.push(size === "lg" ? styles.sizeLg : styles.sizeMd);
  if (variant === "primary") parts.push(styles.primary);
  else if (variant === "secondary") parts.push(styles.secondary);
  else parts.push(styles.danger);
  if (extra) parts.push(extra);
  return parts.join(" ");
}

export function CtaButton(props: CtaButtonLinkProps): JSX.Element {
  const {
    href,
    children,
    variant = "primary",
    size = "md",
    className,
    ariaLabel,
    external,
  } = props;
  const classes = classesFor(variant, size, className);
  // next/link is typed strictly; cast once at the boundary.
  if (external) {
    return (
      <a
        href={href as string}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function CtaAction(props: CtaButtonActionProps): JSX.Element {
  const { children, variant = "primary", size = "md", className, ...rest } = props;
  const classes = classesFor(variant, size, className);
  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
