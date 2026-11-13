"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import type { ReactNode } from "react";
import { useT } from "@/lib/i18n/client";
import styles from "./IconRail.module.css";

interface RailItem {
  href: Route;
  /** Catalog key for the visible label (resolved in the viewer's native lang). */
  labelKey: string;
  iconName: string;
  icon: ReactNode;
}

/**
 * Nav icons — Wave 6 differentiated set.
 *
 * The pre-Wave-6 rail used generic stroke-based glyphs where Words and
 * Sentences both read as "horizontal lines" — hard to tell apart at a glance.
 * Each new icon is section-relevant and visually distinct at both 20px (rail)
 * and 22–24px (mobile tab). `currentColor` is preserved so the active-state
 * accent colour from Wave 1 still works.
 *
 * `data-icon-name` carries a stable id. The icon-rail-uniqueness test asserts
 * no two names clash (small regression guard).
 */
const STROKE_PROPS = {
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const HomeIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="home" aria-hidden="true">
    <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2V10z" />
  </svg>
);


// Library — stack of books with a bookmark ribbon on one, so it clearly
// differs from Read's "open book spread".
const LibraryIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="library" aria-hidden="true">
    <rect x="4" y="4" width="4" height="16" rx="1" />
    <rect x="10" y="4" width="4" height="16" rx="1" />
    <rect x="16" y="6" width="4" height="14" rx="1" />
    {/* Bookmark ribbon on the middle book. */}
    <path d="M11 4v6l1.4-1.1L13.4 10V4" fill="currentColor" stroke="none" opacity="0.9" />
  </svg>
);

// Talk — speech bubble with a mic dot inside (not just a bubble).
const TalkIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="talk" aria-hidden="true">
    <path d="M4 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4V5z" />
    <rect x="10.3" y="8" width="3.4" height="5.4" rx="1.7" fill="currentColor" stroke="none" />
    <path d="M8.5 11.6a3.5 3.5 0 0 0 7 0" />
  </svg>
);

// Read — open book with a visible page spread. Clearly different from
// Library's closed-books stack.
const ReadIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="read" aria-hidden="true">
    <path d="M3 5.5c3-1 6-1 9 .5v13c-3-1.5-6-1.5-9-.5V5.5z" />
    <path d="M21 5.5c-3-1-6-1-9 .5v13c3-1.5 6-1.5 9-.5V5.5z" />
    <path d="M6 9h3M6 12h3M15 9h3M15 12h3" />
  </svg>
);

// Words — a single flashcard with a highlight dot (not horizontal lines).
const WordsIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="words" aria-hidden="true">
    <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
    <path d="M7.5 11h5" />
    <circle cx="16.5" cy="10.5" r="1.3" fill="currentColor" stroke="none" />
    <path d="M7.5 14.4h7.5" opacity="0.5" />
  </svg>
);

// Sentences — multiple short lines forming a paragraph with a pencil
// underline (clearly a paragraph, not a flashcard).
const SentencesIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="sentences" aria-hidden="true">
    <path d="M4 5h16M4 9h12M4 13h14M4 17h7" />
    {/* Pencil underline on the last line. */}
    <path d="M12 20l1.3-2.4 5.3-5.3a1 1 0 0 1 1.4 0l.7.7a1 1 0 0 1 0 1.4L15.4 19.7 12 20z" />
  </svg>
);

// Review — a clock face with a cycle arrow (spaced-repetition metaphor).
const ReviewIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="review" aria-hidden="true">
    <circle cx="12" cy="12" r="7.5" />
    <path d="M12 8v4l2.6 1.6" />
    <path d="M19.5 5.5l-1.4 1.4M18.5 5.5h2v2" />
  </svg>
);

// Progress — ascending bar chart with a trend arrow (keep).
const ProgressIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="progress" aria-hidden="true">
    <path d="M4 20V13M10 20V9M16 20v-5M22 20H2" />
    <path d="M4 9l6-5 4 3 7-5" />
    <path d="M17 2h4v4" />
  </svg>
);

const MoreIcon = (
  <svg viewBox="0 0 24 24" stroke="currentColor" {...STROKE_PROPS} data-icon-name="more" aria-hidden="true">
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// "Home" and the old "/learn" item rendered the identical Fun Learning
// landing, which read as a broken duplicate (PM review 2026-10-25). Merged into
// the single Home entry (`/` renders LearnLanding). The /learn route still
// works for existing deep links; it just isn't a separate nav item.
const RAIL_ITEMS: RailItem[] = [
  { href: "/" as Route, labelKey: "nav.railHome", iconName: "home", icon: HomeIcon },
  { href: "/library" as Route, labelKey: "nav.railLibrary", iconName: "library", icon: LibraryIcon },
  { href: "/talk" as Route, labelKey: "nav.railTalk", iconName: "talk", icon: TalkIcon },
  { href: "/read" as Route, labelKey: "nav.railRead", iconName: "read", icon: ReadIcon },
  { href: "/words" as Route, labelKey: "nav.railWords", iconName: "words", icon: WordsIcon },
  { href: "/sentences" as Route, labelKey: "nav.railSentences", iconName: "sentences", icon: SentencesIcon },
  { href: "/review" as Route, labelKey: "nav.railReview", iconName: "review", icon: ReviewIcon },
  { href: "/progress" as Route, labelKey: "nav.railProgress", iconName: "progress", icon: ProgressIcon },
];

// Mobile bottom tabs — SPEC §2 keeps the five slots: Home / Library / Review
// / Talk / More. The Wave 6 /learn route is reachable from Home + from the
// desktop rail; the mobile tab bar stays the way it was so returning learners
// don't have to re-learn their primary nav.
const MOBILE_TABS: RailItem[] = [
  RAIL_ITEMS[0]!, // Home
  RAIL_ITEMS[1]!, // Library
  RAIL_ITEMS[6]!, // Review
  RAIL_ITEMS[2]!, // Talk
  { href: "/settings" as Route, labelKey: "nav.tabMore", iconName: "more", icon: MoreIcon },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function IconRail() {
  const pathname = usePathname() ?? "/";
  const t = useT();
  return (
    <aside className={styles.railWrap} aria-label={t("nav.ariaPrimary")}>
      {RAIL_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.iconName}
            href={item.href}
            className={`${styles.railLink} ${active ? styles.railLinkActive : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <span className={styles.railIcon}>{item.icon}</span>
            <span className={styles.railLabel}>{t(item.labelKey)}</span>
          </Link>
        );
      })}
    </aside>
  );
}

export function BottomTabs() {
  const pathname = usePathname() ?? "/";
  const t = useT();
  return (
    <nav className={styles.bottomTabs} aria-label={t("nav.ariaPrimaryMobile")}>
      {MOBILE_TABS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.iconName}
            href={item.href}
            className={`${styles.tabLink} ${active ? styles.tabLinkActive : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <span className={styles.tabIcon}>{item.icon}</span>
            <span>{t(item.labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// Export rail metadata for the uniqueness regression test.
export const __RAIL_ICONS_FOR_TEST__ = {
  all: [...RAIL_ITEMS, MOBILE_TABS[MOBILE_TABS.length - 1]!].map((i) => i.iconName),
};
