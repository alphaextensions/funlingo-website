"use client";

/**
 * YouTube IFrame Player API embed.
 *
 * LEGAL hard rule (docs/LEGAL.md): nothing may be drawn OVER the iframe —
 * no overlays, no captions, no translucent panels on top of it. All UI
 * sits BESIDE or BELOW the iframe. The Playwright test
 * `tests/e2e/watch.spec.ts` asserts zero DOM overlap with the iframe rect
 * across every mode.
 *
 * The iframe is wrapped in a container of its own with `position: relative`
 * BUT no absolutely-positioned siblings inside it. All other components
 * (captions, panels, overlays) live outside this component's root.
 *
 * Note on measurement: YouTube's IFrame API fires `onReady` BEFORE the
 * iframe has layout width in some browsers (particularly when the player is
 * nested in a flex/grid parent that hasn't settled). The parent must not
 * try to measure the iframe inside `onReady` — measure on `resize` + a
 * `requestAnimationFrame` tick instead.
 */

import { useEffect, useRef } from "react";
import styles from "./YouTubePlayer.module.css";

// Minimal shape of the YouTube IFrame API we use. Keeps us free of the
// `@types/youtube` dep (which pulls in a global type conflict with Next).
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getPlaybackRate(): number;
  setPlaybackRate(rate: number): void;
  getCurrentTime(): number;
  getPlayerState(): number;
  destroy(): void;
}
type PlayerStateChange = { data: number };
type PlayerReady = { target: YTPlayer };
interface YTApi {
  Player: new (
    el: HTMLElement | string,
    config: {
      videoId: string;
      playerVars?: Record<string, unknown>;
      events?: {
        onReady?: (e: PlayerReady) => void;
        onStateChange?: (e: PlayerStateChange) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };
}

declare global {
  interface Window {
    YT?: YTApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** State values from the IFrame API. Mirrored here to avoid depending on
 *  `window.YT.PlayerState` from the parent (loaded async). */
export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export type YouTubePlayerHandle = {
  play(): void;
  pause(): void;
  seekTo(seconds: number): void;
  toggleMute(): void;
  isMuted(): boolean;
  getRate(): number;
  setRate(rate: number): void;
  getCurrentTime(): number;
};

let apiLoadingPromise: Promise<YTApi> | null = null;
function loadYouTubeApi(): Promise<YTApi> {
  if (typeof window === "undefined") return Promise.reject(new Error("window missing"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiLoadingPromise) return apiLoadingPromise;
  apiLoadingPromise = new Promise<YTApi>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-fnl-ytiframe]",
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.dataset.fnlYtiframe = "1";
      script.onerror = () => reject(new Error("YouTube iframe_api load failed"));
      document.head.appendChild(script);
    }
    // The YT script calls window.onYouTubeIframeAPIReady when loaded.
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
      else reject(new Error("YT missing after api ready"));
    };
    // Also poll in case the API was already loaded before our handler.
    const poll = setInterval(() => {
      if (window.YT?.Player) {
        clearInterval(poll);
        resolve(window.YT);
      }
    }, 50);
    setTimeout(() => clearInterval(poll), 15_000);
  });
  return apiLoadingPromise;
}

export interface YouTubePlayerProps {
  videoId: string;
  startSec?: number;
  /** Called with a handle on first ready. */
  onReady?: (handle: YouTubePlayerHandle) => void;
  /** Called with a time (seconds) every ~250ms while playing. */
  onTime?: (t: number) => void;
  /** YouTube IFrame API state (PLAYING, PAUSED, …). */
  onStateChange?: (state: number) => void;
  /**
   * Cinema mode shrinks the sidebars; this prop lets the parent force a
   * particular aspect/width stretch. The player itself never changes layout
   * — the parent styles its container.
   */
  className?: string;
}

export function YouTubePlayer({
  videoId,
  startSec = 0,
  onReady,
  onTime,
  onStateChange,
  className,
}: YouTubePlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const timePollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let localPlayer: YTPlayer | null = null;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !mountRef.current) return;
        localPlayer = new YT.Player(mountRef.current, {
          videoId,
          playerVars: {
            // Keep YouTube branding visible per LEGAL rules.
            modestbranding: 1,
            rel: 0,
            // We render our own subtitles beside the iframe. Hide YouTube's
            // native captions (not required but reduces visual clutter).
            cc_load_policy: 0,
            playsinline: 1,
            start: Math.max(0, Math.floor(startSec)),
          },
          events: {
            onReady: ({ target }) => {
              if (cancelled) return;
              playerRef.current = target;
              const handle: YouTubePlayerHandle = {
                play: () => target.playVideo(),
                pause: () => target.pauseVideo(),
                seekTo: (s) => target.seekTo(s, true),
                toggleMute: () => (target.isMuted() ? target.unMute() : target.mute()),
                isMuted: () => target.isMuted(),
                getRate: () => target.getPlaybackRate(),
                setRate: (r) => target.setPlaybackRate(r),
                getCurrentTime: () => target.getCurrentTime(),
              };
              // onReady fires BEFORE the iframe has layout width in some
              // browsers — the parent must NOT measure the player bounds in
              // this callback. Just forward the handle.
              onReady?.(handle);
            },
            onStateChange: ({ data }) => {
              onStateChange?.(data);
              if (data === YT_STATE.PLAYING) {
                if (!timePollRef.current && playerRef.current) {
                  timePollRef.current = setInterval(() => {
                    const t = playerRef.current?.getCurrentTime();
                    if (typeof t === "number") onTime?.(t);
                  }, 250);
                }
              } else if (timePollRef.current) {
                clearInterval(timePollRef.current);
                timePollRef.current = null;
              }
            },
          },
        });
      })
      .catch(() => {
        // API failed to load (offline, blocked). The parent still renders —
        // the subtitle pane and keyboard shortcuts remain functional, which
        // is better than a dead screen.
      });

    return () => {
      cancelled = true;
      if (timePollRef.current) {
        clearInterval(timePollRef.current);
        timePollRef.current = null;
      }
      localPlayer?.destroy?.();
      playerRef.current = null;
    };
    // Only re-init when the video id changes. startSec changes are handled
    // via `seekTo` from the parent through the handle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div className={`${styles.wrap} ${className ?? ""}`} data-fnl-yt-wrap>
      {/* The IFrame API replaces this div with the actual <iframe>. */}
      <div ref={mountRef} className={styles.mount} data-fnl-yt-mount />
    </div>
  );
}
