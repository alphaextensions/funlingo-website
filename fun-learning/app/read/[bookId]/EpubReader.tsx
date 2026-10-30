"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createPositionReporter,
  type DebouncedReporter,
} from "@/lib/read/positionDebounce";
import { WordCardPopover, extractWordAtPoint } from "./WordCardPopover";
import styles from "./reader.module.css";

/**
 * EpubReader — hosts an epubjs renderer in a <div>. Classics stream from the
 * publisher's CORS-enabled URL; uploads come from /api/read/books/[id]/file.
 *
 * ReadingPosition stores the CFI; keyboard arrows + Esc; S saves a selected
 * word via /api/read/encounters.
 *
 * epubjs is a BROWSER library — this component is "use client" and the import
 * lives inside a useEffect so Next's server bundler doesn't try to execute it.
 */
export function EpubReader({
  bookId,
  epubUrl,
  lang,
}: {
  bookId: string;
  epubUrl: string;
  lang: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<unknown>(null);
  const renditionRef = useRef<unknown>(null);
  const reporterRef = useRef<DebouncedReporter | null>(null);
  const [spreadWidth, setSpreadWidth] = useState<"single" | "double">("double");
  const [percent, setPercent] = useState(0);
  const [selected, setSelected] = useState<
    | null
    | { word: string; line: string; rect: { x: number; y: number } }
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Reporter wiring.
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

  // Mount epubjs + hydrate position.
  useEffect(() => {
    let cancelled = false;
    let detachResize: (() => void) | null = null;

    (async () => {
      try {
        // epubjs's bundled .d.ts narrows `resize` to numeric args, but at
        // runtime it accepts strings too (and "100%" is what the library's
        // own examples use). Cast via unknown so we keep our own loose shape.
        const ePubModule = (await import("epubjs")) as unknown as {
          default: (url: string) => EpubBookLike;
        };
        const ePub = ePubModule.default;
        if (cancelled) return;
        const node = containerRef.current;
        if (!node) return;

        const book = ePub(epubUrl);
        bookRef.current = book;
        const spread = spreadWidth === "double" ? "always" : "none";
        const rendition = book.renderTo(node, {
          width: "100%",
          height: "100%",
          spread,
          flow: "paginated",
        });
        renditionRef.current = rendition;

        // Register themes once the book is ready so colours match tokens.
        // Read brand hex from the running CSS variables so the EPUB iframe
        // tracks the active theme (dark/light) and future palette changes
        // without any hex drifting into source.
        const rootStyle = getComputedStyle(document.documentElement);
        const token = (name: string, fallback: string) =>
          rootStyle.getPropertyValue(name).trim() || fallback;
        rendition.themes.register("fl-dark", {
          body: {
            background: "transparent",
            color: token("--fl-text", "#F6EFFB"),
            "font-family": "inherit",
            "line-height": "1.65",
            padding: "0 20px",
          },
          a: { color: token("--fl-accent", "#E0319E") },
          "::selection": {
            background: token("--fl-accent-glow", "rgba(224,49,158,0.35)"),
          },
        });
        rendition.themes.select("fl-dark");

        // Load saved position before rendering, if we have one.
        let locator: string | null = null;
        try {
          const res = await fetch(
            `/api/read/position?bookId=${encodeURIComponent(bookId)}`,
          );
          const data = (await res.json()) as {
            position: { location: string } | null;
          };
          locator = data.position?.location ?? null;
        } catch {
          /* ignore */
        }

        await rendition.display(locator ?? undefined);
        setLoading(false);

        rendition.on("relocated", (...args) => {
          const loc = args[0] as EpubLocation;
          const cfi = loc?.start?.cfi ?? "";
          const pct = Math.round((loc?.start?.percentage ?? 0) * 100);
          setPercent(pct);
          if (cfi) {
            reporterRef.current?.report({ cfi, percent: pct });
          }
        });

        rendition.on("rendered", (...args) => {
          const iframeView = args[1] as EpubIframeView | undefined;
          const doc = iframeView?.document ?? iframeView?.window?.document;
          if (!doc) return;
          doc.addEventListener("click", (ev) => {
            const target = ev.target as HTMLElement | null;
            if (!target) return;
            const mouseEv = ev as unknown as MouseEvent;
            const picked = extractWordAtPoint(target, mouseEv.clientX, mouseEv.clientY);
            if (!picked) return;
            const iframe = node.querySelector("iframe");
            const rect = iframe?.getBoundingClientRect();
            setSelected({
              word: picked.word,
              line: picked.line,
              rect: {
                x: (rect?.left ?? 0) + mouseEv.clientX,
                y: (rect?.top ?? 0) + mouseEv.clientY,
              },
            });
          });
        });

        const onResize = () => {
          try {
            rendition.resize("100%", "100%");
          } catch {
            /* ignore */
          }
        };
        window.addEventListener("resize", onResize);
        detachResize = () => window.removeEventListener("resize", onResize);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : "Couldn't load the book. It may be hosted somewhere our browser can't reach.",
          );
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      detachResize?.();
      try {
        const r = renditionRef.current as { destroy?: () => void } | null;
        r?.destroy?.();
      } catch {
        /* ignore */
      }
    };
  }, [bookId, epubUrl, spreadWidth]);

  // Keyboard: ← / → / S / Esc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
      const rendition = renditionRef.current as EpubRenditionLike | null;
      if (!rendition) return;
      if (e.key === "ArrowLeft") {
        void rendition.prev();
      } else if (e.key === "ArrowRight") {
        void rendition.next();
      } else if (e.key === "Escape") {
        setSelected(null);
      } else if ((e.key === "s" || e.key === "S") && selected) {
        void saveWord(bookId, selected.word, selected.line, lang);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookId, lang, selected]);

  const toggleSpread = useCallback(() => {
    setSpreadWidth((s) => (s === "double" ? "single" : "double"));
  }, []);

  return (
    <div className={styles.reader}>
      <div className={styles.progressBar} aria-hidden="true">
        <div style={{ width: `${percent}%` }} />
      </div>
      <div className={styles.epubHost} ref={containerRef}>
        {loading && !error ? <div className={styles.loading}>Loading book…</div> : null}
        {error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <p className={styles.errorHint}>
              Classics stream from the publisher&apos;s site — some servers block
              cross-origin loads. Try the publisher&apos;s own reader via the
              link in the credits panel.
            </p>
          </div>
        ) : null}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => (renditionRef.current as EpubRenditionLike | null)?.prev()}
          aria-label="Previous page (←)"
        >
          ← Prev
        </button>
        <span className={styles.pageCount}>{percent}%</span>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => (renditionRef.current as EpubRenditionLike | null)?.next()}
          aria-label="Next page (→)"
        >
          Next →
        </button>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={toggleSpread}
          aria-label={spreadWidth === "double" ? "Switch to single page" : "Switch to two pages"}
        >
          {spreadWidth === "double" ? "Single page" : "Two pages"}
        </button>
      </div>

      {selected ? (
        <WordCardPopover
          anchor={selected.rect}
          word={selected.word}
          line={selected.line}
          bookId={bookId}
          lang={lang}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}

async function saveWord(bookId: string, word: string, line: string, lang: string) {
  const idemKey = `encounter-${bookId}-${word}-${Date.now()}`;
  await fetch("/api/read/encounters", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": idemKey,
    },
    body: JSON.stringify({ bookId, lemma: word.toLowerCase(), location: "cfi:unknown", line, lang }),
  });
}

// ---------- Loose shape of the epubjs API we actually touch ----------
interface EpubRenditionLike {
  display(target?: string): Promise<unknown>;
  resize(w: string, h: string): void;
  on(event: string, handler: (...args: unknown[]) => void): void;
  prev(): Promise<unknown>;
  next(): Promise<unknown>;
  destroy?: () => void;
  themes: {
    register(name: string, rules: Record<string, Record<string, string>>): void;
    select(name: string): void;
  };
}
interface EpubBookLike {
  renderTo(
    node: HTMLElement,
    opts: { width: string; height: string; spread: string; flow: string },
  ): EpubRenditionLike;
}
interface EpubLocation {
  start?: { cfi?: string; percentage?: number };
}
interface EpubIframeView {
  document?: Document;
  window?: Window;
}
