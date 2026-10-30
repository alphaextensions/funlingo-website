"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { useT } from "@/lib/i18n/client";
import styles from "./ShelfTabs.module.css";

type ShelfItem = {
  bookId: string;
  title: string;
  author: string | null;
  lang: string;
  level?: string | null;
  coverUrl?: string | null;
  publisher?: string;
  percent?: number;
};

type Tab = "my" | "classics" | "graded";

export function ShelfTabs({
  myShelf,
  classics,
  graded,
  isAuthed,
  signedOutState,
}: {
  myShelf: ShelfItem[];
  classics: ShelfItem[];
  graded: ShelfItem[];
  isAuthed: boolean;
  /** Rendered inside the "My shelf" tab when the viewer is signed out. */
  signedOutState?: ReactNode;
}) {
  const [tab, setTab] = useState<Tab>(myShelf.length > 0 ? "my" : "classics");
  const t = useT();
  const items = tab === "my" ? myShelf : tab === "classics" ? classics : graded;

  return (
    <section>
      <div
        role="tablist"
        aria-label={t("read.ariaShelves")}
        className={styles.tabs}
      >
        <TabButton active={tab === "my"} onClick={() => setTab("my")}>
          {t("read.tabMyShelf")}
        </TabButton>
        <TabButton active={tab === "classics"} onClick={() => setTab("classics")}>
          {t("read.tabClassics")}
        </TabButton>
        <TabButton active={tab === "graded"} onClick={() => setTab("graded")}>
          {t("read.tabGraded")}
        </TabButton>
      </div>

      {tab === "my" && !isAuthed ? (
        signedOutState ?? (
          <div className={styles.empty}>{t("read.signInToSee")}</div>
        )
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          {tab === "my"
            ? t("read.emptyUploads")
            : t("read.emptyBooks")}
        </div>
      ) : (
        <ul className={styles.grid}>
          {items.map((b) => {
            const href = `/read/${encodeURIComponent(b.bookId)}` as Route;
            return (
              <li key={b.bookId}>
                <Link href={href} className={styles.cardLink}>
                  <div className={styles.cover}>
                    {b.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.coverUrl} alt="" loading="lazy" />
                    ) : (
                      <div className={styles.coverFallback} aria-hidden="true">
                        {b.title.charAt(0)}
                      </div>
                    )}
                    {typeof b.percent === "number" && b.percent > 0 ? (
                      <div className={styles.progressBar}>
                        <div style={{ width: `${Math.min(100, b.percent)}%` }} />
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.meta}>
                    <h3>{b.title}</h3>
                    <p>{b.author ?? t("read.unknownAuthor")}</p>
                    <div className={styles.badges}>
                      {b.level ? <span className={styles.badge}>{b.level}</span> : null}
                      <span className={styles.badge}>{b.lang.toUpperCase()}</span>
                      {b.publisher ? (
                        <span className={styles.badgeMuted}>{b.publisher}</span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
