"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GradedReader as GradedReaderDoc } from "@/lib/read/catalog";
import {
  createPositionReporter,
  type DebouncedReporter,
} from "@/lib/read/positionDebounce";
import { WordCardPopover, extractWordAtPoint } from "./WordCardPopover";
import styles from "./reader.module.css";

/**
 * GradedReader — paginates the Funlingo-authored bundled text into spreads.
 * Each page has an on-tap handler that creates a WordCard inline (same
 * contract as the Watch lane's inline card, built from scratch here so the
 * Talk+Read lane doesn't block on Watch landing).
 */
export function GradedReader({
  bookId,
  reader,
}: {
  bookId: string;
  reader: GradedReaderDoc;
}) {
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [selected, setSelected] = useState<
    | null
    | {
        word: string;
        line: string;
        rect: { x: number; y: number };
      }
  >(null);

  const total = reader.pages.length;
  const spread = reader.pages[spreadIdx];

  // ReadingPosition — "graded:<key>:<pageIdx>" as the location string.
  const reporterRef = useRef<DebouncedReporter | null>(null);
  useEffect(() => {
    reporterRef.current = createPositionReporter({
      onFlush: async ({ cfi, percent, clientRequestId }) => {
        try {
          await fetch("/api/read/position", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "idempotency-key": clientRequestId,
            },
            body: JSON.stringify({ bookId, location: cfi, percent, secondsReadDelta: 10 }),
          });
        } catch {
          /* best-effort */
        }
      },
    });
    return () => {
      reporterRef.current?.flush();
    };
  }, [bookId]);

  const reportPosition = useCallback(
    (idx: number) => {
      const percent = total > 0 ? Math.round(((idx + 1) / total) * 100) : 0;
      reporterRef.current?.report({
        cfi: `graded:${bookId}:${idx}`,
        percent,
      });
    },
    [bookId, total],
  );

  // Hydrate the saved position on mount.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/read/position?bookId=${encodeURIComponent(bookId)}`,
        );
        const data = (await res.json()) as {
          position: { location: string } | null;
        };
        const loc = data.position?.location;
        if (loc && loc.startsWith(`graded:${bookId}:`)) {
          const idx = Number(loc.split(":").pop());
          if (!Number.isNaN(idx) && idx >= 0 && idx < total) {
            setSpreadIdx(idx);
          }
        }
      } catch {
        /* ignore */
      }
    })();
  }, [bookId, total]);

  // Keyboard navigation: ← / → and Esc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        setSpreadIdx((i) => {
          const next = Math.max(0, i - 1);
          if (next !== i) reportPosition(next);
          return next;
        });
      } else if (e.key === "ArrowRight") {
        setSpreadIdx((i) => {
          const next = Math.min(total - 1, i + 1);
          if (next !== i) reportPosition(next);
          return next;
        });
      } else if (e.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reportPosition, total]);

  const onPageClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>, body: string) => {
      const target = ev.target as HTMLElement;
      const picked = extractWordAtPoint(target, ev.clientX, ev.clientY);
      if (!picked) return;
      setSelected({
        word: picked.word,
        line: body,
        rect: { x: ev.clientX, y: ev.clientY },
      });
    },
    [],
  );

  // Progress percent for the ambient top bar.
  const percent = useMemo(
    () => (total > 0 ? Math.round(((spreadIdx + 1) / total) * 100) : 0),
    [spreadIdx, total],
  );

  return (
    <div className={styles.reader}>
      <div className={styles.progressBar} aria-hidden="true">
        <div style={{ width: `${percent}%` }} />
      </div>
      <div className={styles.spread}>
        <article
          className={styles.page}
          onClick={(e) => onPageClick(e, spread.body)}
          lang={reader.lang}
        >
          {spread.heading ? <h2>{spread.heading}</h2> : null}
          <RenderBody body={spread.body} />
        </article>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => {
            setSpreadIdx((i) => {
              const next = Math.max(0, i - 1);
              if (next !== i) reportPosition(next);
              return next;
            });
          }}
          disabled={spreadIdx === 0}
          aria-label="Previous page (←)"
        >
          ← Prev
        </button>
        <span className={styles.pageCount}>
          {spreadIdx + 1} / {total}
        </span>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => {
            setSpreadIdx((i) => {
              const next = Math.min(total - 1, i + 1);
              if (next !== i) reportPosition(next);
              return next;
            });
          }}
          disabled={spreadIdx >= total - 1}
          aria-label="Next page (→)"
        >
          Next →
        </button>
      </div>

      {selected ? (
        <WordCardPopover
          anchor={selected.rect}
          word={selected.word}
          line={selected.line}
          bookId={bookId}
          lang={reader.lang}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}

function RenderBody({ body }: { body: string }) {
  // Split into tokens so each word is tappable, but keep punctuation inline.
  // Keeps DOM lightweight — ~a dozen spans per page.
  const parts = body.split(/(\s+)/);
  return (
    <p>
      {parts.map((p, i) =>
        /^\s+$/.test(p) ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} data-word={cleanLemma(p)} className={styles.word}>
            {p}
          </span>
        ),
      )}
    </p>
  );
}

function cleanLemma(raw: string): string {
  return raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").toLowerCase();
}
