import type { ReactNode } from "react";
import styles from "./GlassCard.module.css";

/**
 * Reusable glass-surface card. Both /talk and /read use variants of it — a
 * container with the vibe principles baked in (bg-glass + border + el-2
 * shadow + hover glow when `interactive` is true).
 */
export function GlassCard({
  children,
  interactive,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  interactive?: boolean;
  as?: "div" | "section" | "article";
  className?: string;
}) {
  const classes = [styles.card, interactive && styles.interactive, className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
