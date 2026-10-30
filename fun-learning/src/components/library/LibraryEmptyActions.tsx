"use client";

/**
 * PM-polish fix 3: Library empty-state actions.
 *
 * The primary action browses Show Packs. The secondary (previously "Get the
 * extension") now focuses the paste-a-YouTube-link input at the top of the
 * page — a tighter next step for a learner who's never followed a channel.
 *
 * The focused element lives in `YouTubePaste` (`#yt-paste`); we grab it via
 * `document.getElementById` and scroll it into view before focusing so a
 * learner on a small screen sees it move.
 */

import Link from "next/link";
import { useT } from "@/lib/i18n/client";
import styles from "./Library.module.css";

export function LibraryEmptyActions(): JSX.Element {
  const t = useT();
  function focusPasteInput() {
    const el = document.getElementById("yt-paste") as HTMLInputElement | null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // Delay the focus a frame so the scroll animation doesn't fight the
    // caret jump on Safari.
    window.requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }

  return (
    <>
      <Link
        href={{ pathname: "/library/show-packs" }}
        className={styles.emptyPrimary}
      >
        {t("library.emptyBrowseShowPacks")}
      </Link>
      <button
        type="button"
        className={styles.emptySecondary}
        onClick={focusPasteInput}
      >
        {t("library.emptyPasteYt")}
      </button>
    </>
  );
}
