"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./TabBar.module.css";

export interface Tab {
  href: Route;
  label: ReactNode;
  count?: number;
  /** When set, the tab is active for any path starting with `matchPrefix`. */
  matchPrefix?: boolean;
}

/**
 * TabBar — route-based tab navigation (e.g. /library tabs, /words tabs).
 *
 * Active state is determined from `usePathname()`. Each tab is a <Link>
 * so navigation uses the full Next.js prefetch stack.
 *
 * a11y: the active tab's non-color signal is a heavier font weight + a
 * gradient underline (QA rule — never color-only).
 */
export function TabBar({
  tabs,
  ariaLabel = "Section tabs",
}: {
  tabs: Tab[];
  ariaLabel?: string;
}) {
  const pathname = usePathname();
  // Edge-fade affordance: when the strip overflows (e.g. the 4 Library tabs at
  // 375px) fade whichever side has hidden tabs, so it's clear it scrolls. No
  // fade when everything fits (e.g. the 2-tab /words bar). Design review P2.
  const ref = useRef<HTMLElement | null>(null);
  const [fade, setFade] = useState({ l: false, r: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const l = el.scrollLeft > 1;
      const r = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setFade((prev) => (prev.l === l && prev.r === r ? prev : { l, r }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [tabs.length]);
  return (
    <nav
      ref={ref}
      className={styles.wrap}
      aria-label={ariaLabel}
      role="tablist"
      data-fade-left={fade.l}
      data-fade-right={fade.r}
    >
      {tabs.map((tab) => {
        const href = tab.href as string;
        const active = tab.matchPrefix
          ? pathname === href || pathname.startsWith(href + "/")
          : pathname === href;
        return (
          <Link
            key={href}
            href={tab.href}
            className={active ? `${styles.tab} ${styles.active}` : styles.tab}
            role="tab"
            aria-selected={active}
            aria-current={active ? "page" : undefined}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className={styles.count} aria-label={`${tab.count} items`}>
                {tab.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
