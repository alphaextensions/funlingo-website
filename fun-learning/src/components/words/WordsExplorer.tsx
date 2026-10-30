"use client";

/**
 * WordsExplorer — the /words saved-word list.
 *
 * Wave 11 rebuilt it as the extension's vertical LIST:
 *   [POS badge]  [word + meaning]  [state badge]  [🔊 button]
 * Wave 17 ports the extension popup's saved-word behaviours
 * (docs/wave17-popup-parity.md §B, §D):
 *   - counts header "{total} saved · {known} known"
 *   - real meaning + up to 3 extra senses, CEFR, platform, "seen N times"
 *   - sort Recent (last seen → saved) / A–Z / Most seen
 *   - "All platforms" filter
 *   - "I know this" / "Reactivate"
 *   - remove with Undo, and a "Select" mode for bulk removal
 *   - export this language as CSV or an Anki-ready file
 *
 * Rules kept from Wave 11:
 *   - The clickable row is a <div role="button">, never a <button>, because
 *     the 🔊 SlangAudioButton is a real <button> (button-in-button = React
 *     hydration error). Action buttons live in the expanded panel, which is
 *     a SIBLING of the row body.
 *   - Keyboard: ArrowUp / ArrowDown / Home / End walk rows, Enter/Space
 *     expands (or toggles selection in Select mode), "/" focuses search.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { FilterChip, FilterRow } from "@/components/FilterChip";
import { EmptyState } from "@/components/EmptyState";
import { SegmentedToggle } from "@/components/SegmentedToggle";
import { SlangAudioButton } from "@/components/SlangAudioButton";
import { fx } from "@/lib/feedback";
import { isGraduated } from "@/lib/words/state";
import { sortWords, type SortKey, type WordRow } from "@/lib/words/view";

export type { WordRow } from "@/lib/words/view";
import { useT } from "@/lib/i18n/client";
import styles from "./Words.module.css";

/** DB state → chrome label key (Wave 14). Same labels as the filter chips;
 *  CSS uppercases the badge, so casing in the catalog doesn't matter. */
const STATE_LABEL_KEY: Record<string, string> = {
  new: "words.filterSaved",
  learning: "words.filterLearning",
  known: "words.filterKnown",
  mastered: "words.filterMastered",
};

const UNDO_MS = 8000;

interface WordsExplorerProps {
  rows: WordRow[];
  /** Viewer's active learning language — scopes writes, voice and export. */
  lang?: string;
}

function idemKey(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${rand}`;
}

export function WordsExplorer({ rows: initialRows, lang = "en" }: WordsExplorerProps) {
  const [rows, setRows] = useState<WordRow[]>(initialRows);
  const [stateFilter, setStateFilter] = useState<Record<string, boolean>>({});
  const [platform, setPlatform] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("recent");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [focusIdx, setFocusIdx] = useState<number>(0);
  // Chrome = viewer's native lang. Wave 19 moved the old Wave 17 WORDS_STR
  // copy into the i18n catalog (words.* keys); this reads it via useT().
  const t = useT();
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<{ ids: string[]; label: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<string[] | null>(null);
  const rowsRef = useRef<WordRow[]>(initialRows);
  rowsRef.current = rows;

  useEffect(() => setRows(initialRows), [initialRows]);

  // ---- delete with undo -------------------------------------------------
  // Removal is optimistic: rows hide at once, the request is held for
  // UNDO_MS so "Undo" can cancel it, then it's sent. A failed request puts
  // the rows back and says so.
  const commitDelete = useCallback(
    (ids: string[], keepalive = false) => {
      const removed = rowsRef.current.filter((r) => ids.includes(r.id));
      setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
      void fetch("/api/words/delete", {
        method: "POST",
        keepalive,
        headers: {
          "content-type": "application/json",
          "idempotency-key": idemKey("words-delete"),
        },
        body: JSON.stringify({ wordIds: ids, lang }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
        })
        .catch(() => {
          if (keepalive) return;
          setRows((prev) => [...prev, ...removed.filter((r) => !prev.some((p) => p.id === r.id))]);
          setError(t("words.actionFailed"));
        });
    },
    [lang, t],
  );

  const flushPending = useCallback(
    (keepalive = false) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      const ids = pendingRef.current;
      pendingRef.current = null;
      if (ids && ids.length) commitDelete(ids, keepalive);
    },
    [commitDelete],
  );

  // If the learner leaves within the undo window, still send the delete.
  useEffect(() => {
    const onHide = () => flushPending(true);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      flushPending(true);
    };
  }, [flushPending]);

  const scheduleDelete = (ids: string[], label: string) => {
    // A second removal while one is pending commits the first right away.
    flushPending();
    setError(null);
    pendingRef.current = ids;
    setPendingDelete({ ids, label });
    setExpandedId(null);
    timerRef.current = setTimeout(() => {
      flushPending();
      setPendingDelete(null);
    }, UNDO_MS);
  };

  const undoDelete = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    pendingRef.current = null;
    setPendingDelete(null);
  };

  // ---- graduate / reactivate -------------------------------------------
  const setWordState = async (row: WordRow, next: "known" | "learning") => {
    const prev = row.state;
    setError(null);
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, state: next } : r)));
    try {
      const res = await fetch("/api/words/state", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": idemKey("words-state"),
        },
        body: JSON.stringify({ wordId: row.id, lang, state: next }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, state: prev } : r)));
      setError(t("words.actionFailed"));
    }
  };

  // ---- derived ----------------------------------------------------------
  const hidden = useMemo(() => new Set(pendingDelete?.ids ?? []), [pendingDelete]);
  const visibleRows = useMemo(() => rows.filter((r) => !hidden.has(r.id)), [rows, hidden]);

  const knownCount = visibleRows.filter((r) => isGraduated(r.state)).length;

  const platforms = useMemo(() => {
    const s = new Set<string>();
    visibleRows.forEach((r) => r.sourcePlatform && s.add(r.sourcePlatform));
    return Array.from(s).sort();
  }, [visibleRows]);

  const filtered = useMemo(() => {
    let out = visibleRows;
    const chosen = Object.entries(stateFilter)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (chosen.length > 0) out = out.filter((r) => chosen.includes(r.state));
    if (platform) out = out.filter((r) => r.sourcePlatform === platform);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (r) =>
          r.lemma.toLowerCase().includes(q) ||
          (r.gloss ?? "").toLowerCase().includes(q) ||
          (r.senses ?? []).some((s) => s.toLowerCase().includes(q)) ||
          (r.sceneLine ?? "").toLowerCase().includes(q),
      );
    }
    return sortWords(out, sort);
  }, [visibleRows, stateFilter, platform, query, sort]);

  // Wave 15 — filter chips tap like the extension's platform filter items.
  const toggleState = (s: string) => {
    fx.tap();
    setStateFilter((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  const clearFilters = () => {
    setStateFilter({});
    setPlatform(null);
    setQuery("");
  };

  const toggleSelected = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const exitSelect = () => {
    setSelectMode(false);
    setSelected(new Set());
  };

  const removeSelected = () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const label =
      ids.length === 1
        ? t("words.removedOne", { w: rows.find((r) => r.id === ids[0])?.lemma ?? "" })
        : t("words.removedMany", { n: ids.length });
    scheduleDelete(ids, label);
    exitSelect();
  };

  // ---- keyboard ---------------------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const inField =
        t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable;
      if (!inField && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
      if (e.key === "Escape" && selectMode) exitSelect();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectMode]);

  const onListKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (filtered.length === 0) return;
      const t = e.target as HTMLElement;
      if (!t.hasAttribute("data-row-idx")) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusIdx(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setFocusIdx(filtered.length - 1);
      }
    },
    [filtered.length],
  );

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-row-idx="${focusIdx}"]`,
    );
    el?.focus();
  }, [focusIdx]);

  const exportHref = (format: "csv" | "anki") =>
    `/api/export?what=words&format=${format}&lang=${encodeURIComponent(lang)}`;

  return (
    <>
      <div className={styles.headerRow}>
        <p className={styles.counts} data-testid="words-counts">
          {t("words.countsHeader", { total: visibleRows.length, known: knownCount })}
        </p>
        {visibleRows.length > 0 && (
          <div className={styles.headerActions}>
            <a className={styles.ghostBtn} href={exportHref("csv")} download>
              {t("words.exportCsv")}
            </a>
            <a className={styles.ghostBtn} href={exportHref("anki")} download>
              {t("words.exportAnki")}
            </a>
            <button
              type="button"
              className={styles.ghostBtn}
              aria-pressed={selectMode}
              onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
            >
              {selectMode ? t("words.actionCancel") : t("words.actionSelect")}
            </button>
          </div>
        )}
      </div>

      <div className={styles.searchWrap}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref={searchRef}
          type="search"
          className={styles.searchInput}
          placeholder={t("words.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t("words.searchAria")}
        />
      </div>

      <FilterRow label={t("words.filterLabel")}>
        <FilterChip selected={!!stateFilter.new} onToggle={() => toggleState("new")}>{t("words.filterSaved")}</FilterChip>
        <FilterChip selected={!!stateFilter.learning} onToggle={() => toggleState("learning")}>{t("words.filterLearning")}</FilterChip>
        <FilterChip selected={!!stateFilter.known} onToggle={() => toggleState("known")}>{t("words.filterKnown")}</FilterChip>
        <FilterChip selected={!!stateFilter.mastered} onToggle={() => toggleState("mastered")}>{t("words.filterMastered")}</FilterChip>
      </FilterRow>

      {platforms.length > 1 && (
        <FilterRow label={t("words.platformLabel")}>
          <FilterChip selected={platform === null} onToggle={() => setPlatform(null)}>
            {t("words.allPlatforms")}
          </FilterChip>
          {platforms.map((p) => (
            <FilterChip
              key={p}
              selected={platform === p}
              onToggle={() => setPlatform((prev) => (prev === p ? null : p))}
            >
              {platformLabel(p)}
            </FilterChip>
          ))}
        </FilterRow>
      )}

      <div className={styles.listToolbar}>
        <p className={styles.countNote} aria-live="polite">
          {filtered.length === visibleRows.length
              ? visibleRows.length === 1
                ? t("words.countSingular", { n: visibleRows.length })
                : t("words.countPlural", { n: visibleRows.length })
              : t("words.countFiltered", { filtered: filtered.length, total: visibleRows.length })}
        </p>
        <SegmentedToggle<SortKey>
          value={sort}
          onChange={setSort}
          ariaLabel={t("words.sortLabel")}
          options={[
            { value: "recent", label: t("words.sortRecent") },
            { value: "alpha", label: t("words.sortAlpha") },
            { value: "seen", label: t("words.sortSeen") },
          ]}
        />
      </div>

      {error && (
        <p className={styles.errorNote} role="alert">
          {error}
        </p>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          inline
          eyebrow={visibleRows.length === 0 ? t("words.emptyNothingSavedEyebrow") : t("words.emptyNoMatchesEyebrow")}
          title={visibleRows.length === 0 ? t("words.emptySavedTitle") : t("words.emptyNoMatchesTitle")}
          body={visibleRows.length === 0 ? t("words.emptySavedBody") : t("words.emptyNoMatchesBody")}
          actions={
            visibleRows.length === 0
              ? [
                  { href: "/library" as never, label: t("words.actionBrowseLibrary") },
                  {
                    href: "/settings" as never,
                    label: t("words.actionGetExtension"),
                    variant: "secondary",
                  },
                ]
              : [{ label: t("words.actionClearFilters"), onClick: clearFilters }]
          }
        />
      ) : (
        <ul
          ref={listRef}
          className={styles.list}
          role="list"
          onKeyDown={onListKeyDown}
          data-testid="words-list"
        >
          {filtered.map((w, idx) => (
            <WordListRow
              key={w.id}
              row={w}
              idx={idx}
              lang={lang}
              selectMode={selectMode}
              selected={selected.has(w.id)}
              expanded={!selectMode && expandedId === w.id}
              onToggle={() => {
                // Wave 15 — tap cue like every ext button, on both paths.
                fx.tap();
                if (selectMode) {
                  toggleSelected(w.id);
                } else {
                  setExpandedId((prev) => (prev === w.id ? null : w.id));
                }
              }}
              onGraduate={() => setWordState(w, "known")}
              onReactivate={() => setWordState(w, "learning")}
              onRemove={() => scheduleDelete([w.id], t("words.removedOne", { w: w.lemma }))}
            />
          ))}
        </ul>
      )}

      {selectMode && (
        <div className={styles.selectBar} role="region" aria-label={t("words.selectedBarAria")}>
          <span>{selected.size > 0 ? t("words.selectedCount", { n: selected.size }) : t("words.selectHint")}</span>
          <button type="button" className={styles.ghostBtn} onClick={exitSelect}>
            {t("words.actionCancel")}
          </button>
          <button
            type="button"
            className={styles.dangerBtn}
            onClick={removeSelected}
            disabled={selected.size === 0}
          >
            {selected.size === 0 ? t("words.deleteSelectedZero") : selected.size === 1 ? t("words.deleteSelectedOne") : t("words.deleteSelectedMany", { n: selected.size })}
          </button>
        </div>
      )}

      {pendingDelete && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span>{pendingDelete.label}</span>
          <button type="button" className={styles.toastBtn} onClick={undoDelete}>
            {t("words.actionUndo")}
          </button>
        </div>
      )}
    </>
  );
}

interface RowProps {
  row: WordRow;
  idx: number;
  lang: string;
  expanded: boolean;
  selectMode: boolean;
  selected: boolean;
  onToggle: () => void;
  onGraduate: () => void;
  onReactivate: () => void;
  onRemove: () => void;
}

function WordListRow({
  row,
  idx,
  lang,
  expanded,
  selectMode,
  selected,
  onToggle,
  onGraduate,
  onReactivate,
  onRemove,
}: RowProps) {
  const t = useT();
  const onRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      const target = e.target as HTMLElement;
      if (target.closest("[data-no-expand]")) return;
      e.preventDefault();
      onToggle();
    }
  };

  const onRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-expand]")) return;
    onToggle();
  };

  const graduated = isGraduated(row.state);
  const seen = row.seenCount ?? 0;

  return (
    <li
      className={styles.row}
      data-expanded={expanded ? "true" : "false"}
      data-selected={selected ? "true" : "false"}
      data-graduated={graduated ? "true" : "false"}
    >
      <div
        className={styles.rowBody}
        role={selectMode ? "checkbox" : "button"}
        tabIndex={0}
        aria-expanded={selectMode ? undefined : expanded}
        aria-checked={selectMode ? selected : undefined}
        aria-label={selectMode ? t("words.selectAria", { word: row.lemma }) : undefined}
        data-row-idx={idx}
        onClick={onRowClick}
        onKeyDown={onRowKeyDown}
      >
        {selectMode ? (
          <span className={styles.check} data-checked={selected ? "true" : "false"} aria-hidden="true">
            {selected ? "✓" : ""}
          </span>
        ) : row.pos ? (
          <span className={styles.posBadge} aria-label={t("words.rowPosAria", { pos: row.pos })}>
            {row.pos}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <div className={styles.lemmaCol}>
          <span className={styles.lemma} lang={lang}>{row.lemma}</span>
          {row.gloss && <span className={styles.gloss}>{row.gloss}</span>}
          <span className={styles.metaLine}>
            {row.cefr && <span className={styles.metaBadge}>{row.cefr}</span>}
            {row.sourcePlatform && (
              <span className={styles.metaBadge}>{platformLabel(row.sourcePlatform)}</span>
            )}
            {seen > 0 && <span>{seen === 1 ? t("words.seenOnce") : t("words.seenTimes", { n: seen })}</span>}
          </span>
        </div>
        <span className={styles.state} data-state={row.state}>
          {STATE_LABEL_KEY[row.state] ? t(STATE_LABEL_KEY[row.state]!) : row.state}
        </span>
        <div className={styles.audioSlot} data-no-expand>
          <SlangAudioButton
            text={row.lemma}
            lang={lang}
            ariaLabel={t("words.hearAria", { text: row.lemma })}
          />
        </div>
      </div>

      {expanded && (
        <div className={styles.expanded} role="region" aria-label={t("words.rowDetailsAria", { word: row.lemma })}>
          {row.senses && row.senses.length > 0 && (
            <p className={styles.senses}>
              <span className={styles.sceneLabel}>{t("words.alsoMeans")}</span>
              {row.senses.map((s) => (
                <span key={s} className={styles.senseChip}>{s}</span>
              ))}
            </p>
          )}
          {row.sceneLine && (
            <p className={styles.scene}>
              <span className={styles.sceneLabel}>{t("words.rowFrom")}</span>
              {renderWithLemma(row.sceneLine, row.lemma)}
            </p>
          )}
          <p className={styles.source}>
            {[
              row.sourcePlatform ? platformLabel(row.sourcePlatform) : null,
              row.sourceTitle,
              t("words.savedOn", { d: formatDate(row.createdAt) }),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {!row.sceneLine && !row.sourceTitle && (
            <p className={styles.sceneEmpty}>
              {t("words.rowNoScene")}
            </p>
          )}
          {graduated && <p className={styles.sceneEmpty}>{t("words.knownHint")}</p>}
          <div className={styles.expandedActions}>
            {!graduated && (
              <Link
                href={{ pathname: "/review", query: { focus: "weak" } } as never}
                className={styles.reviewLink}
              >
                {t("words.rowReviewLink")}
              </Link>
            )}
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={graduated ? onReactivate : onGraduate}
            >
              {graduated ? t("words.actionReactivate") : t("words.actionIKnowThis")}
            </button>
            <button type="button" className={styles.ghostBtnDanger} onClick={onRemove}>
              {t("words.actionRemove")}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

const PLATFORM_LABELS: Record<string, string> = {
  youtube: "YouTube",
  youtube_video: "YouTube",
  netflix: "Netflix",
  prime: "Prime Video",
  hotstar: "Hotstar",
  appletv: "Apple TV",
  coursera: "Coursera",
  udemy: "Udemy",
  crunchyroll: "Crunchyroll",
  tubi: "Tubi",
  bilibili: "Bilibili",
  podcast_episode: "Podcast",
  book: "Book",
  upload: "Upload",
  sentence_pack: "Sentence Pack",
  show: "Show Pack",
  talk_lesson: "Talk",
};

function platformLabel(p: string): string {
  return PLATFORM_LABELS[p] ?? p;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

function renderWithLemma(line: string, lemma: string) {
  const idx = line.toLowerCase().indexOf(lemma.toLowerCase());
  if (!lemma || idx < 0) return line;
  return (
    <>
      {line.slice(0, idx)}
      <mark>{line.slice(idx, idx + lemma.length)}</mark>
      {line.slice(idx + lemma.length)}
    </>
  );
}
