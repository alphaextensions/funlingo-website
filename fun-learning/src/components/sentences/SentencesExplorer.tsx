"use client";

import { useMemo, useState } from "react";
import { FilterChip, FilterRow } from "@/components/FilterChip";
import { SegmentedToggle, IconGrid, IconList } from "@/components/SegmentedToggle";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { SlangAudioButton } from "@/components/SlangAudioButton";
import { useT } from "@/lib/i18n/client";
import styles from "./Sentences.module.css";

type Translate = (key: string, params?: Record<string, string | number>) => string;

export interface SentenceRow {
  id: string;
  text: string;
  /** Rendered translation — the `[talk:<id>]` trace prefix has already been
   *  stripped upstream. The stored row still carries it so a future "jump
   *  back to Talk" wire can parse it. */
  translation: string | null;
  lists: string[];
  createdAt: string;
  timestampSec: number | null;
  sourceTitle: string | null;
  sourcePlatform: string | null;
  thumbnail: string | null;
  /** True when the row originated in a Talk correction (saved from a
   *  TurnBubble). Drives the small "From Talk" chip. */
  fromTalk?: boolean;
}

export type SentenceList = "favorite" | "dictation" | "speaking";

type SView = "cards" | "list";

export function SentencesExplorer({
  rows,
  mode,
  lang = "en",
}: {
  rows: SentenceRow[];
  mode: SentenceList;
  /** Active learning language — voice for the Listen button. */
  lang?: string;
}) {
  const t = useT();
  const [view, setView] = useState<SView>("list");
  const [reveal, setReveal] = useState(true);
  const [source, setSource] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"date" | "alpha" | "source">("date");
  const [shuffled, setShuffled] = useState(false);

  const sources = useMemo(() => {
    const s = new Set<string>();
    rows.forEach((r) => {
      if (r.sourcePlatform) s.add(r.sourcePlatform);
    });
    return Array.from(s);
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows.filter((r) => r.lists.includes(mode));
    if (source) out = out.filter((r) => r.sourcePlatform === source);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (r) => r.text.toLowerCase().includes(q) || (r.translation ?? "").toLowerCase().includes(q),
      );
    }
    const sorted = [...out].sort((a, b) => {
      if (sort === "alpha") return a.text.localeCompare(b.text);
      if (sort === "source") return (a.sourceTitle ?? "").localeCompare(b.sourceTitle ?? "");
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    if (shuffled) {
      for (let i = sorted.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
    }
    return sorted;
  }, [rows, mode, source, query, sort, shuffled]);

  // Wave 17: this used to be a dead <button> ("Practise dictation" /
  // "Open in player") with no handler. Saved sentences join the daily
  // review, so the honest action is a link there.
  const practiceLabel = t("sentences.practiceLabel");

  return (
    <>
      <div className={styles.toolbar}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder={t("sentences.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t("sentences.searchAria")}
        />
        <SegmentedToggle<SView>
          value={view}
          onChange={setView}
          ariaLabel={t("sentences.viewAria")}
          options={[
            { value: "list", label: <>{IconList} {t("sentences.viewList")}</>, "aria-label": t("sentences.viewListAria") },
            { value: "cards", label: <>{IconGrid} {t("sentences.viewCards")}</>, "aria-label": t("sentences.viewCardsAria") },
          ]}
        />
        <SegmentedToggle
          value={sort}
          onChange={setSort}
          ariaLabel={t("sentences.sortAria")}
          options={[
            { value: "date", label: t("sentences.sortNewest") },
            { value: "alpha", label: t("sentences.sortAlpha") },
            { value: "source", label: t("sentences.sortSource") },
          ]}
        />
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => setReveal((r) => !r)}
          aria-pressed={!reveal}
          aria-label={reveal ? t("sentences.hideTranslations") : t("sentences.revealTranslations")}
          title={reveal ? t("sentences.hideTranslations") : t("sentences.revealTranslations")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => setShuffled((s) => !s)}
          aria-pressed={shuffled}
          aria-label={t("sentences.shuffle")}
          title={t("sentences.shuffle")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
          </svg>
        </button>
      </div>

      {sources.length > 0 && (
        <FilterRow label={t("sentences.sourceLabel")}>
          <FilterChip selected={source === null} onToggle={() => setSource(null)}>
            {t("sentences.sourceEverywhere")}
          </FilterChip>
          {sources.map((s) => (
            <FilterChip
              key={s}
              selected={source === s}
              onToggle={() => setSource((prev) => (prev === s ? null : s))}
            >
              {s}
            </FilterChip>
          ))}
        </FilterRow>
      )}

      <p className={styles.countNote} aria-live="polite">
        {filtered.length === 0
          ? t("sentences.emptyEyebrow")
          : filtered.length === 1
            ? t("sentences.countOne")
            : t("sentences.countMany", { n: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          inline
          eyebrow={t("sentences.emptyEyebrow")}
          title={emptyTitleFor(mode, t)}
          body={emptyBodyFor(mode, t)}
          actions={[
            { href: "/library/sentence-packs" as never, label: t("sentences.browseSentencePacks") },
            {
              href: "/library" as never,
              label: t("sentences.saveOneWhileWatching"),
              variant: "secondary",
            },
          ]}
        />
      ) : view === "list" ? (
        <SentenceListView rows={filtered} reveal={reveal} practiceLabel={practiceLabel} lang={lang} />
      ) : (
        <SentenceCardView rows={filtered} reveal={reveal} />
      )}
    </>
  );
}

function emptyTitleFor(mode: SentenceList, t: Translate): string {
  if (mode === "dictation") return t("sentences.emptyTitleDictation");
  if (mode === "speaking") return t("sentences.emptyTitleSpeaking");
  return t("sentences.emptyTitleFavorite");
}
function emptyBodyFor(mode: SentenceList, t: Translate): string {
  if (mode === "dictation") return t("sentences.emptyBodyDictation");
  if (mode === "speaking") return t("sentences.emptyBodySpeaking");
  return t("sentences.emptyBodyFavorite");
}

function SentenceListView({
  rows,
  reveal,
  practiceLabel,
  lang,
}: {
  rows: SentenceRow[];
  reveal: boolean;
  practiceLabel: string;
  lang: string;
}) {
  const t = useT();
  return (
    <ul className={styles.wrap} role="list">
      {rows.map((s) => (
        <li key={s.id} className={styles.row}>
          <div className={styles.rowThumb} aria-hidden="true">
            {s.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.thumbnail} alt="" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={{ width: "100%", height: "100%", padding: 20 }}>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M9 10l5 3-5 3z" />
              </svg>
            )}
          </div>
          <div className={styles.rowBody}>
            <p className={styles.scene} lang={lang}>{s.text}</p>
            {s.translation && (
              <span className={styles.gloss} data-hidden={reveal ? "false" : "true"}>
                {s.translation}
              </span>
            )}
            {s.sourceTitle ? (
              <span className={styles.sourceLine}>
                {s.sourcePlatform ? `${s.sourcePlatform} · ` : ""}
                {s.sourceTitle}
                {typeof s.timestampSec === "number" ? ` · ${formatTs(s.timestampSec)}` : ""}
                {s.fromTalk ? <TalkChip /> : null}
              </span>
            ) : s.fromTalk ? (
              <span className={styles.sourceLine}>
                <TalkChip />
              </span>
            ) : null}
          </div>
          <div className={styles.rowActions}>
            <SlangAudioButton text={s.text} lang={lang} ariaLabel={t("sentences.listenAria")} />
            <Link
              href={"/review" as never}
              className={styles.iconBtn}
              aria-label={practiceLabel}
              title={practiceLabel}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SentenceCardView({ rows, reveal }: { rows: SentenceRow[]; reveal: boolean }) {
  return (
    <ul className={styles.grid} role="list">
      {rows.map((s) => (
        <li key={s.id} className={styles.card}>
          <p className={styles.scene}>{s.text}</p>
          {s.translation && (
            <span className={styles.gloss} data-hidden={reveal ? "false" : "true"}>
              {s.translation}
            </span>
          )}
          {s.sourceTitle ? (
            <span className={styles.sourceLine}>
              {s.sourcePlatform ? `${s.sourcePlatform} · ` : ""}
              {s.sourceTitle}
              {s.fromTalk ? <TalkChip /> : null}
            </span>
          ) : s.fromTalk ? (
            <span className={styles.sourceLine}>
              <TalkChip />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Small inline chip marking a row that came from a Talk correction. The
 *  trace prefix lives in the stored translation so it can still be parsed
 *  server-side; the chip is the human-visible counterpart. */
function TalkChip() {
  const t = useT();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        marginLeft: 8,
        padding: "2px 8px",
        borderRadius: "var(--r-pill)",
        background: "var(--fl-surface-2)",
        border: "1px solid var(--fl-border)",
        color: "var(--fl-text-2)",
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        verticalAlign: "baseline",
      }}
      aria-label={t("sentences.fromTalkAria")}
      title={t("sentences.fromTalkAria")}
    >
      <span aria-hidden="true">{"\u{1F4AC}"}</span>
      {t("sentences.fromTalk")}
    </span>
  );
}

function formatTs(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
