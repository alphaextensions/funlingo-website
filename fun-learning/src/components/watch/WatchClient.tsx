"use client";

/**
 * The orchestrator for the /watch route. Mounts the YouTube player, dual
 * subtitles, culture panel, word card, and the keyboard shortcut dispatcher.
 *
 * Caption text lives in this component's state only. It is never sent to
 * our DB, never stored in localStorage, never passed to a route that
 * persists it. The LEGAL layer is enforced by:
 *   1. The server only receiving a line when the user explicitly asks for
 *      a translation or a word card (and those routes just forward to the
 *      AI module via Confidential<T>, no DB write of the line).
 *   2. The save-word route accepting a line only for user-submitted or
 *      non-DRM sources; for YouTube, it stores sourceId + timestamp + the
 *      word card instead (see /api/watch/saveWord).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { YouTubePlayer, YT_STATE, type YouTubePlayerHandle } from "./YouTubePlayer";
import { SubtitlePane } from "./SubtitlePane";
import { WordCardPopup } from "./WordCardPopup";
import { CulturePanel } from "./CulturePanel";
import { ModeSwitcher } from "./ModeSwitcher";
import { ShortcutHelp } from "./ShortcutHelp";
import { SpeedPanel, WatchSettingsPanel } from "./WatchSettingsPanel";
import type { DeckState } from "./WordCardPopup";
import { useWatchKeyboard } from "@/lib/watch/useKeyboard";
import type { Caption, WatchMode, WatchPageData } from "@/lib/watch/types";
import { demoTranslationsFor } from "@/lib/watch/demoBundle";
import {
  DEFAULT_PREFS,
  FLAG_HOVER_PAUSE_TOAST,
  FLAG_SAVED_TOOLTIP,
  FLAG_WORD_DISCOVERED,
  SIZE_MAX,
  SIZE_MIN,
  SPEED_PRESETS,
  loadPrefs,
  readFlag,
  sanitizePrefs,
  savePrefs,
  stepSpeed,
  writeFlag,
  type WatchPrefs,
} from "@/lib/watch/prefs";
import { buildW16 } from "@/lib/watch/strings";
import { useT } from "@/lib/i18n/client";
import { langName } from "@/lib/i18n/langName";
import styles from "./WatchClient.module.css";

export function WatchClient({ data }: { data: WatchPageData }) {
  const t = useT();
  const W16 = useMemo(() => buildW16(t), [t]);
  const captions: Caption[] = useMemo(
    () => data.source.meta.testCaptions ?? [],
    [data.source.meta.testCaptions],
  );
  const youtubeId = data.source.meta.youtubeId;
  const demoMode = data.source.meta.demoMode === true;
  const demoDurationSec = useMemo(
    () =>
      captions.length > 0
        ? Math.ceil(captions[captions.length - 1].endSec)
        : 30,
    [captions],
  );

  // -------- Core state --------
  const [mode, setMode] = useState<WatchMode>("default");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [translations, setTranslations] = useState<Record<number, string>>({});
  const [translating, setTranslating] = useState(false);
  // Caption indices whose translation hit a stream error or 15s timeout.
  const [translationErrors, setTranslationErrors] = useState<Record<number, boolean>>({});
  const [playing, setPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoPauseAfterLine, setAutoPauseAfterLine] = useState(false);
  const [loop, setLoop] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // -------- Wave 16: extension-parity player prefs (localStorage) --------
  // Loaded after mount so SSR markup matches; never holds caption text.
  const [prefs, setPrefs] = useState<WatchPrefs>(DEFAULT_PREFS);
  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);
  const patchPrefs = useCallback((p: Partial<WatchPrefs>) => {
    setPrefs((prev) => {
      const next = sanitizePrefs({ ...prev, ...p });
      savePrefs(next);
      return next;
    });
  }, []);
  const prefsRef = useRef(prefs);
  prefsRef.current = prefs;
  const [panel, setPanel] = useState<null | "subs" | "speed">(null);

  // -------- Wave 16: the learner's deck (lang-scoped) --------
  // lemma → state, from GET /api/watch/saved + this session's saves. Powers
  // saved-word highlight in every video + the card's saved / self-test state.
  const [deck, setDeck] = useState<Map<string, string>>(new Map());
  const savedWords = useMemo(() => {
    const s = new Set<string>();
    deck.forEach((state, lemma) => {
      if (state !== "known" && state !== "mastered") s.add(lemma);
    });
    return s;
  }, [deck]);
  const [justSaved, setJustSaved] = useState<string | null>(null);
  const [savedLines, setSavedLines] = useState<Set<number>>(new Set());
  const [savedTooltip, setSavedTooltip] = useState(false);
  // Toast state: either a plain string, or a `{ text, href, linkText }` for
  // actionable toasts like "Added to Review — see all →".
  type ToastValue = string | { text: string; href: string; linkText: string };
  const [toast, setToast] = useState<ToastValue | null>(null);
  // PM-polish fix 2: count every successful save (not distinct words) so a
  // user who re-saves the same lemma still fills the counter. The end-card
  // appears only when the counter is > 0 at player-end. Resets on every
  // navigation (component unmount) — never persisted.
  const [saveCount, setSaveCount] = useState(0);
  // End-of-video CTA state. `dismissed` sticks for this mount so re-ending
  // the demo clip (loop/replay) doesn't nag.
  const [endCardShown, setEndCardShown] = useState(false);
  const [endCardDismissed, setEndCardDismissed] = useState(false);

  // Word card popup state.
  const [wordCard, setWordCard] = useState<{
    word: string;
    captionIndex: number;
    captionText: string;
    tokenIndex?: number;
    rect: DOMRect | null;
  } | null>(null);

  // -------- Player handle --------
  const playerHandleRef = useRef<YouTubePlayerHandle | null>(null);

  useEffect(() => {
    if (!data.isSignedIn) return;
    const ctl = new AbortController();
    const qs = new URLSearchParams({ lang: data.user.activeLearningLang });
    if (!demoMode) qs.set("sourceId", data.sourceId);
    fetch(`/api/watch/saved?${qs.toString()}`, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { words?: { lemma: string; state: string }[]; savedLineTimes?: number[] } | null) => {
        if (!json) return;
        setDeck((prev) => {
          const next = new Map(prev);
          for (const w of json.words ?? []) if (!next.has(w.lemma)) next.set(w.lemma, w.state);
          return next;
        });
        const times = new Set(json.savedLineTimes ?? []);
        if (times.size > 0) {
          setSavedLines((prev) => {
            const next = new Set(prev);
            for (const c of captions) if (times.has(Math.floor(c.startSec))) next.add(c.index);
            return next;
          });
        }
      })
      .catch(() => undefined);
    return () => ctl.abort();
  }, [data.isSignedIn, data.user.activeLearningLang, data.sourceId, demoMode, captions]);

  const deckStateFor = useCallback(
    (lemma: string): DeckState => {
      const st = deck.get(lemma.toLowerCase());
      if (!st) return "none";
      return st === "known" || st === "mastered" ? "known" : "saved";
    },
    [deck],
  );

  // -------- Translation streaming --------
  // Streams natural translations of ±15 lines around the current position,
  // skipping any index we've already translated. Debounced to avoid thrash.
  const translationWindow = useRef<Set<number>>(new Set());
  const translateCtlRef = useRef<AbortController | null>(null);

  const startTranslatingAround = useCallback(
    async (centerIdx: number) => {
      if (captions.length === 0) return;
      const start = Math.max(0, centerIdx - 15);
      const end = Math.min(captions.length, centerIdx + 16);
      const needed: Caption[] = [];
      for (let i = start; i < end; i++) {
        if (!translationWindow.current.has(i) && !translations[i]) {
          needed.push(captions[i]);
          translationWindow.current.add(i);
        }
      }
      if (needed.length === 0) return;

      // Clear any prior error on captions we're about to re-attempt.
      setTranslationErrors((prev) => {
        if (needed.every((c) => !prev[c.index])) return prev;
        const next = { ...prev };
        needed.forEach((c) => delete next[c.index]);
        return next;
      });

      // Wave 13 BLOCKER-16: in demo mode, SKIP the AI call entirely —
      // every demo caption's translation is bundled next to DEMO_CAPTIONS
      // in `src/lib/watch/demoBundle.ts`. No auth, no DB write, no
      // idempotency key — a cold prospect gets instant translations.
      if (demoMode) {
        const demoTrack = demoTranslationsFor(data.user.nativeLang);
        setTranslations((prev) => {
          const next = { ...prev };
          for (const c of needed) {
            const line = demoTrack[c.index];
            if (typeof line === "string") next[c.index] = line;
          }
          return next;
        });
        return;
      }

      translateCtlRef.current?.abort();
      const ctl = new AbortController();
      translateCtlRef.current = ctl;
      setTranslating(true);

      // Blocker-fix: if we hit a 15s wall with no bytes, surface the error so
      // the UI can swap "Translating…" for a retry button instead of hanging
      // forever.
      const TRANSLATION_TIMEOUT_MS = 15_000;
      const timeoutId = setTimeout(() => {
        ctl.abort(new DOMException("TranslationTimeout", "AbortError"));
      }, TRANSLATION_TIMEOUT_MS);

      const flagErrors = () => {
        needed.forEach((c) => translationWindow.current.delete(c.index));
        setTranslationErrors((prev) => {
          const next = { ...prev };
          for (const c of needed) {
            if (!translations[c.index]) next[c.index] = true;
          }
          return next;
        });
      };

      try {
        const res = await fetch("/api/ai/translateLines", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `tr-${data.sourceId}-${needed[0].index}-${Date.now()}`,
          },
          body: JSON.stringify({
            lines: needed.map((c) => c.text),
            sourceLang: data.source.lang,
            targetLang: data.user.nativeLang,
            style: "natural",
          }),
          signal: ctl.signal,
        });
        if (!res.ok || !res.body) {
          flagErrors();
          return;
        }
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        let streamErrored = false;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let newlineIdx = buf.indexOf("\n");
          while (newlineIdx !== -1) {
            const line = buf.slice(0, newlineIdx).trim();
            buf = buf.slice(newlineIdx + 1);
            if (line.length > 0) {
              try {
                const obj = JSON.parse(line) as {
                  index?: number;
                  translation?: string;
                  error?: boolean;
                };
                if (obj.error) {
                  streamErrored = true;
                  break;
                }
                if (typeof obj.index === "number" && typeof obj.translation === "string") {
                  const captionIdx = needed[obj.index]?.index;
                  if (typeof captionIdx === "number") {
                    setTranslations((prev) => ({
                      ...prev,
                      [captionIdx]: obj.translation!,
                    }));
                  }
                }
              } catch {
                /* skip malformed line */
              }
            }
            newlineIdx = buf.indexOf("\n");
          }
          if (streamErrored) break;
        }
        if (streamErrored) flagErrors();
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          flagErrors();
        } else if ((e as DOMException).message === "TranslationTimeout") {
          flagErrors();
        } else {
          // User-initiated abort (window moved). Allow retry.
          needed.forEach((c) => translationWindow.current.delete(c.index));
        }
      } finally {
        clearTimeout(timeoutId);
        setTranslating(false);
      }
    },
    [captions, translations, data.sourceId, data.source.lang, data.user.nativeLang, demoMode],
  );

  // Exposed to SubtitlePane: let the user click a retry button when a line's
  // translation fell over.
  const retryTranslation = useCallback(
    (captionIdx: number) => {
      // Allow the window around this caption to re-fetch.
      translationWindow.current.delete(captionIdx);
      setTranslationErrors((prev) => {
        if (!prev[captionIdx]) return prev;
        const next = { ...prev };
        delete next[captionIdx];
        return next;
      });
      startTranslatingAround(captionIdx);
    },
    [startTranslatingAround],
  );

  // -------- Caption index tracking --------
  // Called ~every 250ms by the player.
  // Wave 16 — "Pause after replaying a line": armed by replayLine with the
  // cue's end time; the next tick past it pauses once.
  const replayEndRef = useRef<number | null>(null);
  const onPlayerTime = useCallback(
    (t: number) => {
      if (replayEndRef.current !== null && t >= replayEndRef.current) {
        replayEndRef.current = null;
        if (prefsRef.current.pauseAfterReplay) {
          if (demoMode) setPlaying(false);
          else playerHandleRef.current?.pause();
        }
      }
      // Fast linear scan — captions are sorted. For >10k lines, swap for
      // binary search.
      let newIdx = -1;
      for (let i = 0; i < captions.length; i++) {
        if (t >= captions[i].startSec && t < captions[i].endSec) {
          newIdx = i;
          break;
        }
      }
      setCurrentIndex((prev) => {
        if (prev === newIdx) return prev;
        // Auto-pause after line boundary
        if (autoPauseAfterLine && prev !== -1 && newIdx !== prev) {
          playerHandleRef.current?.pause();
        }
        // Loop (R): if we leave the current line while loop is on, seek back.
        if (loop && prev !== -1 && newIdx !== prev && captions[prev]) {
          playerHandleRef.current?.seekTo(captions[prev].startSec);
          return prev;
        }
        return newIdx;
      });
    },
    [captions, autoPauseAfterLine, loop, demoMode],
  );

  const onPlayerStateChange = useCallback((state: number) => {
    setPlaying(state === YT_STATE.PLAYING);
    // PM-polish fix 2: YouTube end-of-video → show the "N words saved,
    // review?" card below the player.
    if (state === YT_STATE.ENDED) {
      setEndCardShown(true);
    }
  }, []);

  // -------- Demo-mode local playback timer --------
  // When demoMode === true there's no YouTube iframe. We synthesize the
  // player's time ticks locally so the full watch surface (word-tap, caption
  // highlight, translation window, culture notes) still exercises its real
  // code paths. One-shot: resets to 0 if the user "plays" again after the
  // clip ends.
  const [demoSec, setDemoSec] = useState(0);
  // Wave 16: bumping this restarts the local clock from `demoSec`, so line
  // jumps / ±10 s / replay work in the demo too (they used to be no-ops).
  const [demoSeekNonce, setDemoSeekNonce] = useState(0);
  useEffect(() => {
    if (!demoMode || !playing) return;
    const started = performance.now() - demoSec * 1000;
    const h = window.setInterval(() => {
      const next = (performance.now() - started) / 1000;
      if (next >= demoDurationSec) {
        setDemoSec(demoDurationSec);
        setPlaying(false);
        onPlayerTime(demoDurationSec);
        // PM-polish fix 2: demo clip ended → show end-of-video CTA.
        setEndCardShown(true);
        return;
      }
      setDemoSec(next);
      onPlayerTime(next);
    }, 250);
    return () => window.clearInterval(h);
    // demoSec intentionally not in deps — captured on effect start as resume
    // offset, re-reads on next play.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoMode, playing, demoDurationSec, onPlayerTime, demoSeekNonce]);

  // Translate a window around the current caption as we move through.
  useEffect(() => {
    if (currentIndex < 0) return;
    startTranslatingAround(currentIndex);
  }, [currentIndex, startTranslatingAround]);

  // Prime translations for the first batch on load.
  useEffect(() => {
    if (captions.length > 0) startTranslatingAround(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captions.length]);

  // -------- Save session heartbeat --------
  // Writes sourceId + timestamp + progress to VideoSession every 15s.
  // NEVER includes caption text (LEGAL).
  useEffect(() => {
    if (!data.sourceId) return;
    // Wave 13 BLOCKER-16: skip the heartbeat on the demo for signed-out
    // viewers — the API 401s every 15 seconds otherwise, filling the
    // console with noise and leaving the learner nothing useful.
    if (demoMode && !data.isSignedIn) return;
    const beat = setInterval(() => {
      const positionSec = Math.floor(playerHandleRef.current?.getCurrentTime() ?? 0);
      fetch("/api/watch/session", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `vs-${data.sourceId}-${Math.floor(Date.now() / 15000)}`,
        },
        body: JSON.stringify({
          sourceId: data.sourceId,
          lang: data.user.activeLearningLang,
          positionSec,
          mode,
        }),
      }).catch(() => {
        /* best-effort; dev may have no auth */
      });
    }, 15_000);
    return () => clearInterval(beat);
  }, [data.sourceId, data.user.activeLearningLang, mode, demoMode, data.isSignedIn]);

  // -------- Shortcut handlers --------
  const seekTo = useCallback(
    (sec: number) => {
      const t = Math.max(0, sec);
      if (demoMode) {
        const clamped = Math.min(t, demoDurationSec);
        setDemoSec(clamped);
        setDemoSeekNonce((n) => n + 1);
        onPlayerTime(clamped);
        return;
      }
      playerHandleRef.current?.seekTo(t);
    },
    [demoMode, demoDurationSec, onPlayerTime],
  );

  const jumpToCaption = useCallback(
    (idx: number) => {
      const cap = captions[idx];
      if (!cap) return;
      seekTo(cap.startSec);
      setCurrentIndex(idx);
    },
    [captions, seekTo],
  );

  const pausePlayback = useCallback(() => {
    if (demoMode) setPlaying(false);
    else playerHandleRef.current?.pause();
  }, [demoMode]);
  const resumePlayback = useCallback(() => {
    if (demoMode) setPlaying(true);
    else playerHandleRef.current?.play();
  }, [demoMode]);

  // Wave 16 — extension replay button: seek to the cue start AND play.
  const replayLine = useCallback(
    (idx: number) => {
      const cap = captions[idx];
      if (!cap) return;
      jumpToCaption(idx);
      replayEndRef.current = cap.endSec;
      resumePlayback();
    },
    [captions, jumpToCaption, resumePlayback],
  );

  const seekBy = useCallback(
    (delta: number) => {
      const now = demoMode ? demoSec : (playerHandleRef.current?.getCurrentTime() ?? 0);
      seekTo(now + delta);
    },
    [demoMode, demoSec, seekTo],
  );

  // Wave 16 — remembered speed (extension `funlingo_playback_speed`).
  const applySpeed = useCallback(
    (rate: number) => {
      patchPrefs({ speed: rate });
      playerHandleRef.current?.setRate(rate);
      setToast(t("watch.speedToast", { rate: rate.toFixed(2) }));
    },
    [patchPrefs, t],
  );

  // -------- Wave 16: hover-pause on the active line --------
  const hoverPausedRef = useRef(false);
  const [hoverToast, setHoverToast] = useState(false);
  const onActiveHover = useCallback(
    (inside: boolean) => {
      if (inside) {
        if (!prefsRef.current.hoverPause || !playing || hoverPausedRef.current) return;
        hoverPausedRef.current = true;
        pausePlayback();
        if (!readFlag(FLAG_HOVER_PAUSE_TOAST)) setHoverToast(true);
      } else if (hoverPausedRef.current) {
        hoverPausedRef.current = false;
        resumePlayback();
      }
    },
    [playing, pausePlayback, resumePlayback],
  );
  useEffect(() => {
    if (!hoverToast) return;
    const t = setTimeout(() => setHoverToast(false), 7000);
    return () => clearTimeout(t);
  }, [hoverToast]);

  // -------- Wave 16: word-glow nudge --------
  // After 15 s of playback without ever tapping a word, the first word of
  // the active line pulses ("tap any word"). Stops for good after a tap.
  const [glow, setGlow] = useState(false);
  useEffect(() => {
    if (!playing || glow || readFlag(FLAG_WORD_DISCOVERED)) return;
    const t = setTimeout(() => setGlow(true), 15_000);
    return () => clearTimeout(t);
  }, [playing, glow]);

  const kb = useMemo(
    () => ({
      togglePlay: () => {
        // A deliberate play/pause cancels any hover-pause resume.
        hoverPausedRef.current = false;
        if (demoMode) {
          setPlaying((p) => !p);
          return;
        }
        const p = playerHandleRef.current;
        if (!p) return;
        if (playing) p.pause();
        else p.play();
      },
      prevLine: () => {
        const target = Math.max(0, (currentIndex === -1 ? 0 : currentIndex) - 1);
        jumpToCaption(target);
      },
      nextLine: () => {
        const target = Math.min(
          captions.length - 1,
          (currentIndex === -1 ? 0 : currentIndex) + 1,
        );
        jumpToCaption(target);
      },
      repeatLine: () => {
        if (currentIndex >= 0) replayLine(currentIndex);
      },
      toggleAutoPause: () => {
        setAutoPauseAfterLine((v) => !v);
        setToast(!autoPauseAfterLine ? t("watch.autoPauseOn") : t("watch.autoPauseOff"));
      },
      toggleMute: () => {
        playerHandleRef.current?.toggleMute();
      },
      speedCycle: () => {
        // J cycles the extension's presets (0.5× … 1.5×).
        const i = SPEED_PRESETS.indexOf(prefs.speed as (typeof SPEED_PRESETS)[number]);
        applySpeed(SPEED_PRESETS[(i + 1) % SPEED_PRESETS.length]);
      },
      slower: () => applySpeed(stepSpeed(prefs.speed, -1)),
      faster: () => applySpeed(stepSpeed(prefs.speed, 1)),
      toggleTranslation: () => {
        patchPrefs({ nativeMode: prefs.nativeMode === "hide" ? "show" : "hide" });
      },
      loop: () => {
        setLoop((v) => !v);
        setToast(!loop ? t("watch.loopOn") : t("watch.loopOff"));
      },
      setMode,
      fullscreen: () => {
        const el = document.querySelector("[data-fnl-yt-wrap]") as HTMLElement | null;
        if (!el) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else el.requestFullscreen().catch(() => undefined);
      },
      fontBigger: () =>
        patchPrefs({
          learningSize: Math.min(SIZE_MAX, prefs.learningSize + 1),
          nativeSize: Math.min(SIZE_MAX, prefs.nativeSize + 1),
        }),
      fontSmaller: () =>
        patchPrefs({
          learningSize: Math.max(SIZE_MIN, prefs.learningSize - 1),
          nativeSize: Math.max(SIZE_MIN, prefs.nativeSize - 1),
        }),
      toggleSidebar: () => setSidebarOpen((v) => !v),
      sidebarWider: () => setToast(t("watch.sidebarWiderToast")),
      sidebarNarrower: () => setToast(t("watch.sidebarNarrowerToast")),
      copyLine: () => {
        const line = captions[currentIndex]?.text;
        if (line) {
          navigator.clipboard?.writeText(line).catch(() => undefined);
          setToast(t("watch.lineCopied"));
        }
      },
      saveLine: () => {
        // Wave 16 fix: Cmd/Ctrl+S saves the LINE (it used to save the
        // line's first word).
        if (currentIndex >= 0) void saveLine(currentIndex);
      },
      openHelp: () => setHelpOpen((v) => !v),
      back10: () => seekBy(-10),
      forward10: () => seekBy(10),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playing, currentIndex, captions, jumpToCaption, autoPauseAfterLine, loop, prefs, demoMode, seekBy, replayLine, t],
  );
  useWatchKeyboard(kb);

  // Hide toast after 1.6s (3.5s if it carries a link — the user needs time
  // to read + click "see all →" after a word save).
  useEffect(() => {
    if (!toast) return;
    const ms = typeof toast === "string" ? 1600 : 3500;
    const t = setTimeout(() => setToast(null), ms);
    return () => clearTimeout(t);
  }, [toast]);

  // -------- Save word --------
  const saveWord = useCallback(
    async (lemma: string, line: string, captionIndex: number) => {
      // Wave 13 BLOCKER-16: a signed-out viewer tapping Save on the demo
      // used to hit a 401 and show a red "Could not save word" toast with
      // no recourse. Short-circuit the API call here and surface a
      // sign-in prompt the learner can act on.
      if (!data.isSignedIn) {
        setToast({
          text: t("watch.signInToSaveWord", { lemma }),
          href: "/account",
          linkText: t("watch.signInArrow"),
        });
        return;
      }
      try {
        const positionSec = captions[captionIndex]?.startSec ?? 0;
        const res = await fetch("/api/watch/saveWord", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `sw-${lemma}-${data.sourceId}-${captionIndex}`,
          },
          body: JSON.stringify({
            lemma,
            sourceId: data.sourceId,
            captionIndex,
            timestampSec: Math.floor(positionSec),
            // IMPORTANT: for YouTube the server drops `line`; see route.
            line,
            // Wave 13 B-17: ALWAYS the viewer's active learning language,
            // never the source's lang. The /watch/demo clip is in English
            // but a Spanish learner saves to their "es" deck so the home
            // Word Replay / Quick Quiz tiles can unlock.
            lang: data.user.activeLearningLang,
            sourceType: data.source.type,
          }),
        });
        if (res.ok) {
          const key = lemma.trim().toLowerCase();
          setDeck((d) => new Map(d).set(key, d.get(key) ?? "new"));
          setJustSaved(key);
          if (!readFlag(FLAG_SAVED_TOOLTIP)) setSavedTooltip(true);
          // PM-polish fix 2: feed the end-of-video card. Every successful
          // save ticks the counter — including repeat saves of the same
          // lemma — so the end card can say "you saved N words".
          setSaveCount((n) => n + 1);
          // Wire 5: nudge the learner into Review. The toast carries a link
          // so a save goes somewhere, not just into a silent list.
          setToast({
            text: t("watch.addedToReview", { lemma }),
            href: "/words",
            linkText: t("watch.seeAll"),
          });
        } else {
          const err = await res.json().catch(() => null);
          setToast(err?.message ?? t("watch.couldNotSaveWord"));
        }
      } catch {
        setToast(t("watch.couldNotSaveWordOffline"));
      }
    },
    [captions, data.sourceId, data.user.activeLearningLang, data.source.type, data.isSignedIn, t],
  );

  useEffect(() => {
    if (!justSaved) return;
    const t = setTimeout(() => setJustSaved(null), 1400);
    return () => clearTimeout(t);
  }, [justSaved]);

  // -------- Wave 16: word-card deck actions (remove / I know this) --------
  const setWordState = useCallback(
    async (lemma: string, action: "unsave" | "known") => {
      if (!data.isSignedIn) return;
      const key = lemma.trim().toLowerCase();
      const before = deck.get(key);
      setDeck((d) => {
        const next = new Map(d);
        if (action === "unsave") next.delete(key);
        else next.set(key, "known");
        return next;
      });
      try {
        const res = await fetch("/api/watch/wordState", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `ws-${action}-${key}-${data.user.activeLearningLang}-${Date.now()}`,
          },
          body: JSON.stringify({ lemma: key, lang: data.user.activeLearningLang, action }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setToast(action === "unsave" ? W16.removed(lemma) : W16.markedKnown);
      } catch {
        // Roll back the optimistic change so what's shown matches the deck.
        setDeck((d) => {
          const next = new Map(d);
          if (before) next.set(key, before);
          else next.delete(key);
          return next;
        });
        setToast(t("watch.couldNotUpdateWord"));
      }
    },
    [data.isSignedIn, data.user.activeLearningLang, deck, t, W16],
  );

  // -------- Wave 16: save the whole line (SPEC §6.4 heart / Cmd+S) --------
  // YouTube/streaming: the server keeps only the timestamp (LEGAL).
  const saveLine = useCallback(
    async (idx: number) => {
      const cap = captions[idx];
      if (!cap || savedLines.has(idx)) return;
      if (!data.isSignedIn) {
        setToast({ text: W16.signInToSaveLine, href: "/account", linkText: t("watch.signInArrow") });
        return;
      }
      setSavedLines((s) => new Set(s).add(idx));
      try {
        const res = await fetch("/api/watch/saveLine", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `sl-${data.sourceId}-${idx}-${data.user.activeLearningLang}`,
          },
          body: JSON.stringify({
            sourceId: data.sourceId,
            sourceType: data.source.type,
            lang: data.user.activeLearningLang,
            timestampSec: Math.floor(cap.startSec),
            line: cap.text,
            translation: translations[idx],
          }),
        });
        const json = (await res.json().catch(() => null)) as { kind?: string } | null;
        if (!res.ok) throw new Error(String(res.status));
        // feedback: line-saved (Wave 15 src/lib/feedback)
        if (json?.kind === "sentence") {
          setToast({ text: W16.lineSavedToast, href: "/sentences", linkText: t("watch.seeAll") });
        } else {
          setToast(W16.momentSavedToast);
        }
      } catch {
        setSavedLines((s) => {
          const next = new Set(s);
          next.delete(idx);
          return next;
        });
        setToast(W16.couldNotSaveLine);
      }
    },
    [captions, savedLines, data.isSignedIn, data.sourceId, data.source.type, data.user.activeLearningLang, translations, t, W16],
  );

  // -------- Wave 16: pause while the word card is open --------
  // Extension pauses on popup open ("word-hover") and resumes on close only
  // if it was playing.
  const resumeAfterCardRef = useRef(false);
  const openWordCard = useCallback(
    (p: { word: string; captionIndex: number; captionText: string; tokenIndex: number; rect: DOMRect }) => {
      if (!readFlag(FLAG_WORD_DISCOVERED)) writeFlag(FLAG_WORD_DISCOVERED);
      setGlow(false);
      if (playing && !resumeAfterCardRef.current) {
        resumeAfterCardRef.current = !hoverPausedRef.current;
        pausePlayback();
      } else if (hoverPausedRef.current) {
        // Card opened from a hover-paused line: resume when the card closes.
        resumeAfterCardRef.current = true;
      }
      hoverPausedRef.current = false;
      setWordCard({
        word: p.word,
        captionIndex: p.captionIndex,
        captionText: p.captionText,
        tokenIndex: p.tokenIndex,
        rect: p.rect,
      });
    },
    [playing, pausePlayback],
  );
  const closeWordCard = useCallback(() => {
    setWordCard(null);
    if (resumeAfterCardRef.current) {
      resumeAfterCardRef.current = false;
      resumePlayback();
    }
  }, [resumePlayback]);

  // -------- Render --------
  const noYT = !youtubeId;

  return (
    <div
      className={`${styles.root} ${styles[mode]} ${sidebarOpen ? "" : styles.noSidebar}`}
    >
      {/* Header: title + mode switcher. Lives ABOVE the player so it never
          overlaps the iframe. */}
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>
            {/* The demo's title is synthetic UI chrome, so localise it; a real
                video's title is content and stays as-is. */}
            {demoMode ? t("watch.demoTitle") : data.source.title}
          </h1>
          <p className={styles.sub}>
            {data.source.meta.channel ?? "YouTube"} · {langName(data.source.lang)}
            {translating && (
              <span className={styles.translating}>
                {" · "}
                {t("watch.translatingCount", {
                  done: Object.keys(translations).length,
                  total: captions.length,
                })}
              </span>
            )}
          </p>
        </div>
        <div className={styles.modeArea}>
          <ModeSwitcher mode={mode} onChange={setMode} />
          <button
            type="button"
            className={styles.help}
            aria-label={t("watch.ariaShortcuts")}
            onClick={() => setHelpOpen(true)}
          >
            ?
          </button>
        </div>
      </header>

      {/* Wave 13 B-16 / B-17 — demo banner. Only renders on /watch/demo.
          Explains that (a) this clip is in English and (b) a save still
          lands in the viewer's active-lang deck (so Spanish learners'
          home tiles unlock correctly). Sits ABOVE the player so it never
          overlaps the iframe (LEGAL #3). */}
      {demoMode && (
        <aside
          className={styles.demoBanner}
          role="note"
          aria-label={t("watch.demoNoteAria")}
          data-testid="watch-demo-banner"
        >
          <p className={styles.demoBannerCopy}>
            {data.isSignedIn ? (
              t("watch.demoSignedInBanner", {
                lang: langName(data.user.activeLearningLang),
              })
            ) : (
              <>
                <strong>{t("watch.demoTryTitle")}</strong> {t("watch.demoTryBody")}
              </>
            )}
          </p>
          {!data.isSignedIn && (
            <a href="/account" className={styles.demoBannerCta}>
              {t("watch.demoSignIn")}
            </a>
          )}
        </aside>
      )}

      <div className={styles.grid}>
        {/* Player column */}
        <section className={styles.playerCol} aria-label={t("watch.ariaVideoPlayer")}>
          {demoMode ? (
            <div
              className={styles.demoStage}
              role="img"
              aria-label={t("watch.demoSceneAria")}
            >
              <div className={styles.demoBrand}>
                <span className={styles.demoDot} aria-hidden="true" />
                {t("watch.demoLabel")}
              </div>
              <div className={styles.demoCaption}>
                {currentIndex >= 0 && captions[currentIndex]
                  ? captions[currentIndex].text
                  : t("watch.demoPressPlay")}
              </div>
              <button
                type="button"
                className={styles.demoPlayBtn}
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? t("watch.demoPause") : t("watch.demoPlay")}
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <div
                className={styles.demoProgress}
                aria-hidden="true"
                style={
                  {
                    "--pct": `${Math.min(100, (demoSec / demoDurationSec) * 100).toFixed(1)}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          ) : noYT ? (
            <div className={styles.noPlayer}>
              <p className={styles.noPlayerText}>
                {t("watch.noYtTitle")}
                <br />
                <small>{t("watch.noYtSub")}</small>
              </p>
            </div>
          ) : (
            <YouTubePlayer
              videoId={youtubeId}
              startSec={data.resumePositionSec}
              onReady={(h) => {
                playerHandleRef.current = h;
                // Wave 16: restore the remembered speed.
                if (prefsRef.current.speed !== 1) h.setRate(prefsRef.current.speed);
              }}
              onTime={onPlayerTime}
              onStateChange={onPlayerStateChange}
            />
          )}

          {/* Bottom control strip — SITS BELOW the player, never on it. */}
          <div className={styles.controls} aria-label={t("watch.ariaPlaybackControls")}>
            <span className={styles.counter}>
              {currentIndex >= 0 ? currentIndex + 1 : "—"} / {captions.length || "—"}
            </span>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-label={W16.back10}
              title={W16.back10}
              onClick={kb.back10}
            >
              −10s
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-label={t("watch.ariaPrevLine")}
              onClick={kb.prevLine}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-pressed={playing}
              aria-label={playing ? t("watch.ariaPause") : t("watch.ariaPlay")}
              onClick={kb.togglePlay}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-label={t("watch.ariaNextLine")}
              onClick={kb.nextLine}
            >
              ›
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-label={W16.fwd10}
              title={W16.fwd10}
              onClick={kb.forward10}
            >
              +10s
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-pressed={autoPauseAfterLine}
              aria-label={t("watch.ariaAutoPause")}
              onClick={kb.toggleAutoPause}
            >
              {t("watch.ctrlAutoPause")}
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-pressed={loop}
              aria-label={t("watch.ariaLoop")}
              onClick={kb.loop}
            >
              {t("watch.ctrlLoop")}
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-pressed={prefs.nativeMode !== "hide"}
              aria-label={t("watch.ariaToggleTranslation")}
              onClick={kb.toggleTranslation}
            >
              {t("watch.ctrlTranslation")}
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-pressed={prefs.learningMode !== "hide"}
              aria-label={t("watch.ariaToggleNative")}
              onClick={() =>
                patchPrefs({ learningMode: prefs.learningMode === "hide" ? "show" : "hide" })
              }
            >
              {prefs.learningMode !== "hide" ? t("watch.hideText") : t("watch.showText")}
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-label={`${W16.speed} (J / Shift+, / Shift+.)`}
              aria-expanded={panel === "speed"}
              onClick={() => setPanel((v) => (v === "speed" ? null : "speed"))}
            >
              {prefs.speed.toFixed(2)}×
            </button>
            <button
              type="button"
              className={styles.ctrlBtn}
              aria-label={W16.subtitleSettings}
              aria-expanded={panel === "subs"}
              onClick={() => setPanel((v) => (v === "subs" ? null : "subs"))}
              data-testid="watch-settings-toggle"
            >
              Aa
            </button>
          </div>

          {/* Wave 16 — subtitle settings / speed. Inline under the strip,
              never over the iframe (LEGAL #6). */}
          {panel === "subs" && (
            <WatchSettingsPanel
              prefs={prefs}
              onChange={patchPrefs}
              onClose={() => setPanel(null)}
              learningLang={data.source.lang}
            />
          )}
          {panel === "speed" && (
            <SpeedPanel speed={prefs.speed} onChange={applySpeed} onClose={() => setPanel(null)} />
          )}

          {savedTooltip && (
            <div className={styles.hintNote} role="status">
              <span>{W16.savedTooltip}</span>
              <button
                type="button"
                className={styles.hintDismiss}
                aria-label={W16.dismiss}
                onClick={() => {
                  writeFlag(FLAG_SAVED_TOOLTIP);
                  setSavedTooltip(false);
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* PM-polish fix 2: when the player ends and the learner saved at
              least one word this session, offer a one-tap into /review.
              Sits BELOW the player — never over the YouTube iframe (LEGAL #3).
              Dismissible; the dismissed flag survives for this mount. */}
          {endCardShown && !endCardDismissed && saveCount > 0 && (
            <div
              className={styles.endCard}
              role="status"
              aria-live="polite"
              data-testid="watch-end-card"
            >
              <div className={styles.endCardBody}>
                <span className={styles.endCardEyebrow}>{t("watch.endEyebrow")}</span>
                <p className={styles.endCardText}>
                  {t(saveCount === 1 ? "watch.endSavedSingular" : "watch.endSavedPlural", {
                    n: saveCount,
                  })}
                </p>
              </div>
              <div className={styles.endCardActions}>
                <a href="/review" className={styles.endCardCta}>
                  {t("watch.endOpenReview")}
                </a>
                <button
                  type="button"
                  className={styles.endCardDismiss}
                  onClick={() => setEndCardDismissed(true)}
                  aria-label={t("watch.endDismissAria")}
                >
                  {t("watch.endNotNow")}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Subtitle column — BESIDE the player, never over it. */}
        {mode !== "cinema" && (
          <section className={styles.subCol} aria-label={t("watch.ariaSubtitlesSection")}>
            <SubtitlePane
              captions={captions}
              currentIndex={currentIndex}
              translations={translations}
              translationErrors={translationErrors}
              onRetryTranslation={retryTranslation}
              mode={mode}
              onWordTap={openWordCard}
              onLineClick={jumpToCaption}
              savedWords={savedWords}
              justSaved={justSaved}
              prefs={prefs}
              savedLines={savedLines}
              onSaveLine={(i) => void saveLine(i)}
              onReplayLine={replayLine}
              onActiveHover={onActiveHover}
              glow={glow}
            />
          </section>
        )}

        {/* Side panel — only in Default + Focus. Cinema hides it per SPEC. */}
        {sidebarOpen && mode !== "cinema" && (
          <aside className={styles.panelCol} aria-label={t("watch.ariaCultureContext")}>
            <CulturePanel
              sourceId={data.sourceId}
              captions={captions}
              currentIndex={currentIndex}
              playing={playing}
              sourceLang={data.source.lang}
              nativeLang={data.user.nativeLang}
              sourceTitle={data.source.title}
              onJumpTo={jumpToCaption}
              demoMode={demoMode}
            />
          </aside>
        )}

        {/* Cinema mode: subtitles sit BELOW the player, in a band. */}
        {mode === "cinema" && (
          <section className={styles.cinemaBand} aria-label={t("watch.ariaSubtitlesSection")}>
            <SubtitlePane
              captions={captions}
              currentIndex={currentIndex}
              translations={translations}
              translationErrors={translationErrors}
              onRetryTranslation={retryTranslation}
              mode={mode}
              onWordTap={openWordCard}
              onLineClick={jumpToCaption}
              savedWords={savedWords}
              justSaved={justSaved}
              prefs={prefs}
              savedLines={savedLines}
              onSaveLine={(i) => void saveLine(i)}
              onReplayLine={replayLine}
              onActiveHover={onActiveHover}
              glow={glow}
            />
          </section>
        )}
      </div>

      {wordCard && (
        <WordCardPopup
          open
          word={wordCard.word}
          captionIndex={wordCard.captionIndex}
          captionText={wordCard.captionText}
          tokenIndex={wordCard.tokenIndex}
          anchorRect={wordCard.rect}
          sourceLang={data.source.lang}
          nativeLang={data.user.nativeLang}
          level={data.user.level}
          captions={captions}
          demoMode={demoMode}
          isSignedIn={data.isSignedIn}
          onJumpTo={(idx) => {
            jumpToCaption(idx);
          }}
          onSave={(lemma, line, idx) => {
            void saveWord(lemma, line, idx);
          }}
          onClose={closeWordCard}
          prefs={prefs}
          onPrefsChange={patchPrefs}
          deckStateFor={deckStateFor}
          onUnsave={data.isSignedIn ? (l) => void setWordState(l, "unsave") : undefined}
          onKnown={data.isSignedIn ? (l) => void setWordState(l, "known") : undefined}
        />
      )}

      <ShortcutHelp open={helpOpen} onClose={() => setHelpOpen(false)} />

      {hoverToast && (
        <div className={styles.hoverToast} role="status" aria-live="polite">
          <p className={styles.hoverToastTitle}>⏸ {W16.hoverPauseTitle}</p>
          <p className={styles.hoverToastBody}>{W16.hoverPauseBody}</p>
          <div className={styles.hoverToastActions}>
            <button
              type="button"
              className={styles.hintDismiss}
              onClick={() => {
                writeFlag(FLAG_HOVER_PAUSE_TOAST);
                setHoverToast(false);
              }}
            >
              {W16.neverShow}
            </button>
            <button
              type="button"
              className={styles.hintDismiss}
              aria-label={W16.dismiss}
              onClick={() => setHoverToast(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {typeof toast === "string" ? (
            toast
          ) : (
            <>
              <span>{toast.text} — </span>
              <a href={toast.href} className={styles.toastLink}>
                {toast.linkText}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
