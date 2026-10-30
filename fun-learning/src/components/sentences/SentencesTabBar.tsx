"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import styles from "@/components/TabBar.module.css";

const TABS = [
  { key: "favorite", labelKey: "sentences.tabFavorite" },
  { key: "dictation", labelKey: "sentences.tabDictation" },
  { key: "speaking", labelKey: "sentences.tabSpeaking" },
] as const;

/**
 * Sentences uses a `?tab=` query param rather than nested routes
 * so a single server component can fetch the data once and tab in
 * memory. This tab bar reads `useSearchParams()` to decide active.
 */
export function SentencesTabBar({
  counts,
}: {
  counts: Record<"favorite" | "dictation" | "speaking", number>;
}) {
  const tr = useT();
  const sp = useSearchParams();
  const current = (sp.get("tab") ?? "favorite").toLowerCase();
  return (
    <nav className={styles.wrap} aria-label={tr("sentences.tabsAria")} role="tablist">
      {TABS.map((tab) => {
        const active = current === tab.key;
        return (
          <Link
            key={tab.key}
            href={{ pathname: "/sentences", query: { tab: tab.key } }}
            className={active ? `${styles.tab} ${styles.active}` : styles.tab}
            role="tab"
            aria-selected={active}
            aria-current={active ? "page" : undefined}
          >
            {tr(tab.labelKey)}
            <span className={styles.count} aria-label={tr("sentences.itemsAria", { n: counts[tab.key] })}>
              {counts[tab.key]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
