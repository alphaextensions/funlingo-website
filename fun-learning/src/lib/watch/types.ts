/**
 * Watch-lane shared types.
 *
 * A `Caption` is a single caption cue (one subtitle line) with the raw text
 * in the source language. CAPTION TEXT MUST NEVER BE PERSISTED TO THE DB
 * — these live in client-session memory only (LEGAL.md).
 */

export interface Caption {
  /** Stable ordinal (0-based). */
  index: number;
  /** Start time in seconds. */
  startSec: number;
  /** End time in seconds. */
  endSec: number;
  /** Caption text in the source (learning) language. In-memory only. */
  text: string;
}

export type WatchMode = "default" | "focus" | "cinema";

export interface SourceMeta {
  /**
   * Demo-mode flag. When true, the player renders a branded placeholder
   * panel instead of a YouTube iframe, and the caption timeline advances
   * from a local timer. Used by /watch/demo so the first-run experience
   * doesn't require (or imply ownership of) any third-party video.
   */
  demoMode?: boolean;
  /** YouTube video id, e.g. "dQw4w9WgXcQ". */
  youtubeId?: string;
  /** Channel display name (not persisted beyond YouTube's 30-day refresh). */
  channel?: string;
  /** Thumbnail URL. */
  thumbnail?: string;
  /**
   * Scaffold-only: optional seed captions carried in Source.meta so the
   * player works end-to-end without the Chrome extension or a live caption
   * fetcher. Dev/test only; captions in prod come from the extension at
   * runtime via postMessage. These are PUBLIC TEST DATA, not scraped
   * third-party captions.
   */
  testCaptions?: Caption[];
}

export interface WatchPageData {
  sourceId: string;
  source: {
    id: string;
    type: string;
    title: string;
    lang: string;
    externalId: string | null;
    durationSec: number | null;
    meta: SourceMeta;
  };
  user: {
    id: string;
    nativeLang: string;
    activeLearningLang: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  };
  /** Last-known position from VideoSession (resume support). */
  resumePositionSec: number;
  /** Is the viewer signed in? Wave 13 BLOCKER-16 — the demo surface routes
   *  AI calls to the bundled demo data when `false` so a cold prospect
   *  never hits a 401. */
  isSignedIn: boolean;
}
