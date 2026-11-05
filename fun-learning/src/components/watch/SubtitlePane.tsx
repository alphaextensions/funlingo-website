"use client";

/**
 * Dual-subtitle pane that sits BESIDE the YouTube iframe (never over it).
 *
 * - Streams natural translations via /api/ai/translateLines (NDJSON).
 * - Viewport-windowed: only lines in the current slice (±15 around current)
 *   are kept rendered for layout — matches LEGAL's "no server-side caption
 *   caching" by never attempting to buffer the full caption track on screen.
 * - Word tap → inline WordCard (handled by parent via `onWordTap`).
 * - Clickable timestamps jump the player via `onLineClick`.
 *
 * Wave 16 (extension parity): per-track Show / Blur / Hide + size + colour,
 * weight + line spacing, "hide bracket cues", saved words highlighted from
 * the whole deck (lemma-aware), save-line heart, replay button + hover-pause
 * on the active line, and the word-glow "tap any word" nudge.
 *
 * Keyboard: ↑ / ↓ (or A / D) step one caption at a time (handled by parent;
 * the pane just reflects `currentIndex`).
 */

import { useEffect, useMemo, useRef } from "react";
import type { Caption } from "@/lib/watch/types";
import { tokenize } from "@/lib/watch/tokenize";
import { matchSavedLemma, stripBracketCues } from "@/lib/watch/captionText";
import { COLOR_TOKENS, DEFAULT_PREFS, type WatchPrefs } from "@/lib/watch/prefs";
import { buildW16 } from "@/lib/watch/strings";
import { useT } from "@/lib/i18n/client";
import styles from "./SubtitlePane.module.css";

export { tokenize };

export interface WordTapPayload {
  word: string;
  captionIndex: number;
  captionText: string;
  /** Index of the tapped token inside `tokenize(captionText)`. */
  tokenIndex: number;
  rect: DOMRect;
}

export interface SubtitlePaneProps {
  captions: Caption[];
  /** Index of the currently active (playing) caption, or -1. */
  currentIndex: number;
  /** Learning-language → native-language translations by caption index.
   *  Streams in, so a missing entry means "not translated yet". */
  translations: Record<number, string>;
  /** Caption indices whose translation hit a stream error or 15s timeout.
   *  Rendered as a retry button instead of "Translating…". */
  translationErrors?: Record<number, boolean>;
  /** Called when the user taps the retry button on a failed translation. */
  onRetryTranslation?: (captionIndex: number) => void;
  /** When "focus" or "cinema", layout is wider / larger. */
  mode: "default" | "focus" | "cinema";
  /** Called when any WORD is tapped. The parent opens the WordCard. */
  onWordTap: (payload: WordTapPayload) => void;
  /** Called when a line's timestamp is clicked (jump to time). */
  onLineClick: (captionIndex: number) => void;
  /** Lowercased lemmas the learner has saved (whole deck + this session). */
  readonly savedWords?: ReadonlySet<string>;
  /** Lemma saved a moment ago — plays the underline sweep once. */
  justSaved?: string | null;
  /** Display prefs (sizes, Show/Blur/Hide, colours…). */
  prefs?: WatchPrefs;
  /** Caption indices the learner saved as lines. */
  readonly savedLines?: ReadonlySet<number>;
  onSaveLine?: (captionIndex: number) => void;
  onReplayLine?: (captionIndex: number) => void;
  /** Hover-pause hook: pointer entered / left the ACTIVE line's text. */
  onActiveHover?: (inside: boolean) => void;
  /** Word-glow nudge: pulse the first word of the active line. */
  glow?: boolean;
}

export function SubtitlePane({
  captions,
  currentIndex,
  translations,
  translationErrors,
  onRetryTranslation,
  mode,
  onWordTap,
  onLineClick,
  savedWords,
  justSaved,
  prefs = DEFAULT_PREFS,
  savedLines,
  onSaveLine,
  onReplayLine,
  onActiveHover,
  glow = false,
}: SubtitlePaneProps) {
  const t = useT();
  const W16 = buildW16(t);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active line into view.
  useEffect(() => {
    const active = activeRef.current;
    if (!active) return;
    active.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex]);

  // Keep a viewport-windowed slice: ±15 lines around current. The rest are
  // rendered as spacers (just a sized <div>) so the scroll offset stays sane
  // but we never DOM-paint the full caption track at once.
  const WINDOW = 15;
  const slice = useMemo(() => {
    if (captions.length === 0) return { start: 0, end: 0, items: [] as Caption[] };
    const cur = Math.max(0, currentIndex === -1 ? 0 : currentIndex);
    const start = Math.max(0, cur - WINDOW);
    const end = Math.min(captions.length, cur + WINDOW + 1);
    return { start, end, items: captions.slice(start, end) };
  }, [captions, currentIndex]);

  if (captions.length === 0) {
    return (
      <div className={`${styles.pane} ${styles[mode]}`} aria-label={t("watch.ariaSubtitles")}>
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>{t("watch.noCaptions")}</p>
          <p className={styles.emptyBody}>{t("watch.noCaptionsBody")}</p>
        </div>
      </div>
    );
  }

  // Focus mode keeps its bigger stage type: scale the learner's sizes up.
  const stageScale = mode === "focus" ? 1.25 : 1;
  const paneStyle = {
    "--fnl-learn-size": `${Math.round(prefs.learningSize * stageScale)}px`,
    "--fnl-native-size": `${Math.round(prefs.nativeSize * stageScale)}px`,
    "--fnl-learn-color": COLOR_TOKENS[prefs.learningColor],
    "--fnl-native-color":
      prefs.nativeColor === "default" ? "var(--fl-text-2)" : COLOR_TOKENS[prefs.nativeColor],
    "--fnl-weight": prefs.weight === 0 ? (mode === "focus" ? 600 : 500) : prefs.weight,
    "--fnl-lh": (prefs.lineHeight / 100).toFixed(2),
  } as React.CSSProperties;

  const learnMode = prefs.learningMode;
  const nativeMode = prefs.nativeMode;

  return (
    <div
      className={`${styles.pane} ${styles[mode]}`}
      ref={scrollerRef}
      role="list"
      aria-label={t("watch.ariaDualSubtitles")}
      style={paneStyle}
    >
      {slice.start > 0 && <div style={{ height: slice.start * 32 }} aria-hidden="true" />}
      {slice.items.map((cap) => {
        const display = prefs.removeBrackets ? stripBracketCues(cap.text) : cap.text;
        // An all-cue line ("[Music]") disappears entirely when the filter is on.
        if (display === null) return null;
        const isActive = cap.index === currentIndex;
        const translation = translations[cap.index];
        const lineSaved = savedLines?.has(cap.index) ?? false;
        const tokens = tokenize(display);
        // Token indices refer to the DISPLAYED text (what the learner sees),
        // which is also what we hand the word card for phrase extension.
        let firstWordSeen = false;
        return (
          <div
            key={cap.index}
            ref={isActive ? activeRef : undefined}
            role="listitem"
            className={`${styles.line} ${isActive ? styles.active : ""}`}
            data-fnl-caption-idx={cap.index}
            data-fnl-active={isActive || undefined}
          >
            <button
              type="button"
              className={styles.ts}
              aria-label={t("watch.jumpToTs", { ts: formatTs(cap.startSec) })}
              onClick={() => onLineClick(cap.index)}
            >
              {formatTs(cap.startSec)}
            </button>
            <div
              className={styles.text}
              onMouseEnter={isActive ? () => onActiveHover?.(true) : undefined}
              onMouseLeave={isActive ? () => onActiveHover?.(false) : undefined}
            >
              {learnMode === "hide" ? (
                <p className={styles.hiddenLine} aria-label={t("watch.learningLineHidden")}>
                  · · ·
                </p>
              ) : (
                <p
                  className={`${styles.native} ${learnMode === "blur" ? styles.blurred : ""}`}
                  tabIndex={learnMode === "blur" ? 0 : undefined}
                >
                  {tokens.map((tok, i) => {
                    if (!tok.isWord) return <span key={i}>{tok.word}</span>;
                    const savedLemma = savedWords ? matchSavedLemma(tok.word, savedWords) : null;
                    const isGlow = glow && isActive && !firstWordSeen;
                    firstWordSeen = true;
                    return (
                      <button
                        key={i}
                        type="button"
                        className={[
                          styles.word,
                          savedLemma ? styles.saved : "",
                          savedLemma && justSaved && savedLemma === justSaved ? styles.justSaved : "",
                          isGlow ? styles.glow : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        title={isGlow ? W16.glowHint : undefined}
                        aria-description={savedLemma ? "saved word" : undefined}
                        onClick={(ev) => {
                          const rect = (ev.currentTarget as HTMLButtonElement).getBoundingClientRect();
                          onWordTap({
                            word: tok.word,
                            captionIndex: cap.index,
                            captionText: display,
                            tokenIndex: i,
                            rect,
                          });
                        }}
                      >
                        {tok.word}
                      </button>
                    );
                  })}
                </p>
              )}
              {nativeMode !== "hide" && (
                <p
                  className={`${styles.translation} ${nativeMode === "blur" ? styles.blurred : ""}`}
                  tabIndex={nativeMode === "blur" && translation ? 0 : undefined}
                  aria-live={isActive ? "polite" : "off"}
                  aria-busy={!translation && !translationErrors?.[cap.index] ? true : undefined}
                >
                  {translation ? (
                    translation
                  ) : translationErrors?.[cap.index] ? (
                    <button
                      type="button"
                      className={styles.retryBtn}
                      onClick={() => onRetryTranslation?.(cap.index)}
                      aria-label={t("watch.translationRetry")}
                    >
                      {t("watch.translationRetry")}
                    </button>
                  ) : (
                    <span className={styles.translating}>{t("watch.translatingEllipsis")}</span>
                  )}
                </p>
              )}
            </div>
            <div className={styles.lineActions}>
              {onSaveLine && (
                <button
                  type="button"
                  className={`${styles.lineBtn} ${lineSaved ? styles.lineBtnOn : ""}`}
                  aria-pressed={lineSaved}
                  aria-label={lineSaved ? W16.lineSaved : W16.saveLine}
                  title={lineSaved ? W16.lineSaved : `${W16.saveLine} (Cmd/Ctrl+S)`}
                  onClick={() => onSaveLine(cap.index)}
                  disabled={lineSaved}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"
                      fill={lineSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              {isActive && onReplayLine && (
                <button
                  type="button"
                  className={styles.lineBtn}
                  aria-label={`${W16.replayLine} (S)`}
                  title={`${W16.replayLine} (S)`}
                  onClick={() => onReplayLine(cap.index)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 5V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" fill="currentColor" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}
      {slice.end < captions.length && (
        <div style={{ height: (captions.length - slice.end) * 32 }} aria-hidden="true" />
      )}
    </div>
  );
}

function formatTs(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
