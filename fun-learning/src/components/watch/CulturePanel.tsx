"use client";

/**
 * Culture Context Engine panel.
 *
 * - Fetches /api/watch/culture with the CURRENT line + N surrounding lines.
 * - DEBOUNCED (does not fire on every subtitle change — fires on pause OR
 *   explicit "Explain this line" tap).
 * - The server-side cache keys notes by (sourceId, SHA256(line), langPair);
 *   raw caption text never persists.
 * - Each note has an optional timestamp anchor the user can click to jump
 *   back to.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { Caption } from "@/lib/watch/types";
import type { CultureNote } from "@/lib/ai";
import { useT } from "@/lib/i18n/client";
import styles from "./CulturePanel.module.css";

interface Props {
  sourceId: string;
  captions: Caption[];
  currentIndex: number;
  playing: boolean;
  sourceLang: string;
  nativeLang: string;
  sourceTitle: string;
  onJumpTo: (captionIndex: number) => void;
  /** Wave 13 BLOCKER-16: when true, suppress the `/api/watch/culture` call
   *  and render a static "Sign in to see live culture notes" empty state
   *  so the demo page never 401s. */
  demoMode?: boolean;
}

const CONTEXT_WINDOW = 3; // ±3 lines around current

export function CulturePanel({
  sourceId,
  captions,
  currentIndex,
  playing,
  sourceLang,
  nativeLang,
  sourceTitle,
  onJumpTo,
  demoMode = false,
}: Props) {
  const t = useT();
  const [notes, setNotes] = useState<CultureNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedIndex, setLastFetchedIndex] = useState<number | null>(null);
  const inFlightRef = useRef<AbortController | null>(null);

  const fetchFor = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= captions.length) return;
      // Wave 13 BLOCKER-16: never hit the AI route from the demo path —
      // signed-out visitors would 401 and get a red error band. The panel
      // keeps rendering its empty-state copy, which already reads as a
      // reasonable "pause and we'll explain this line" promise.
      if (demoMode) return;
      // Only re-fetch if the current index drifted far from last fetched.
      if (lastFetchedIndex !== null && Math.abs(idx - lastFetchedIndex) < 2) return;
      inFlightRef.current?.abort();
      const ctrl = new AbortController();
      inFlightRef.current = ctrl;

      const start = Math.max(0, idx - CONTEXT_WINDOW);
      const end = Math.min(captions.length, idx + CONTEXT_WINDOW + 1);
      const lines = captions.slice(start, end).map((c) => ({
        index: c.index,
        text: c.text,
        timestampSec: Math.floor(c.startSec),
      }));

      setLoading(true);
      setError(null);
      fetch("/api/watch/culture", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `culture-${sourceId}-${idx}-${Date.now()}`,
        },
        body: JSON.stringify({
          sourceId,
          sourceLang,
          nativeLang,
          sourceTitle,
          triggerLineIndex: idx,
          lines,
        }),
        signal: ctrl.signal,
      })
        .then(async (r) => {
          const json = await r.json();
          if (!r.ok) throw new Error(json?.message ?? r.statusText);
          setNotes(json.notes ?? []);
          setLastFetchedIndex(idx);
        })
        .catch((e: unknown) => {
          if ((e as Error).name === "AbortError") return;
          setError((e as Error).message || t("watch.cultureLoadError"));
        })
        .finally(() => setLoading(false));
    },
    [captions, lastFetchedIndex, sourceId, sourceLang, nativeLang, sourceTitle, demoMode, t],
  );

  // Debounce behaviour: fire on pause, and separately on explicit "Explain"
  // button taps. Do NOT fire on every subtitle change while playing.
  useEffect(() => {
    if (playing) return;
    if (currentIndex < 0) return;
    const t = setTimeout(() => fetchFor(currentIndex), 500);
    return () => clearTimeout(t);
  }, [playing, currentIndex, fetchFor]);

  return (
    <aside className={styles.panel} aria-label={t("watch.cultureAria")}>
      <header className={styles.head}>
        <h2 className={styles.title}>{t("watch.cultureTitle")}</h2>
        <button
          type="button"
          className={styles.explainBtn}
          onClick={() => fetchFor(currentIndex)}
          disabled={loading || currentIndex < 0}
          aria-label={t("watch.explainAria")}
        >
          {loading ? t("watch.thinking") : t("watch.explainThis")}
        </button>
      </header>

      {error && <p className={styles.error}>{error}</p>}

      {notes.length === 0 && !loading && !error && (
        <p className={styles.empty}>
          {demoMode ? t("watch.cultureEmptyDemo") : t("watch.cultureEmpty")}
        </p>
      )}

      <ul className={styles.list}>
        {notes.map((n, i) => (
          <li key={i} className={styles.note}>
            <div className={styles.noteHead}>
              <span className={`${styles.kind} ${styles[`kind_${n.kind}`] ?? ""}`}>
                {kindLabel(n.kind, t)}
              </span>
              {n.anchor?.lineIndex !== undefined && (
                <button
                  type="button"
                  className={styles.anchor}
                  onClick={() => onJumpTo(n.anchor!.lineIndex!)}
                  aria-label={t("watch.jumpToLine", { n: n.anchor.lineIndex! + 1 })}
                >
                  {t("watch.jump")}
                </button>
              )}
            </div>
            <p className={styles.body}>{n.text}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function kindLabel(kind: string, t: (key: string) => string): string {
  switch (kind) {
    case "idiom": return t("watch.kindIdiom");
    case "reference": return t("watch.kindReference");
    case "humour": return t("watch.kindHumour");
    case "register": return t("watch.kindRegister");
    default: return t("watch.kindNote");
  }
}
