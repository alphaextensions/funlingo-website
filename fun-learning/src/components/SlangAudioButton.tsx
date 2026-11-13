"use client";

/**
 * SlangAudioButton — Wave 6 web port of the extension's slang-audio.js.
 *
 * Renders a small 🔊 play/pause button that speaks a phrase via
 * `window.speechSynthesis.speak()` in the given learning language. Scores
 * available voices the same way the extension does:
 *   Google / Natural / Neural / Online / Premium / Enhanced  (+16)
 *   Microsoft                                                (+8)
 *   Exact BCP-47 match                                       (+6)
 *   localService === false                                   (+4)
 *   default                                                  (+3)
 *   compact / eloquence / novelty / espeak                   (-20)
 * A voice the learner picked in Settings › Voice (per language, see
 * src/lib/voice/prefs.ts) wins over the score when it's installed.
 *
 * Fail-safe behaviour:
 *   - On SSR / no SpeechSynthesis → disabled button, no crash.
 *   - Pulse animation is gated via `prefers-reduced-motion` in the module CSS.
 *   - Only one utterance plays at a time (cancels any previous).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeToBCP47 } from "@/lib/i18n/speechLang";
import { getFeedbackPrefs } from "@/lib/feedback/prefs";
import { preferredVoice } from "@/lib/voice/prefs";
import styles from "./SlangAudioButton.module.css";

export interface SlangAudioButtonProps {
  /** Text to speak. */
  text: string;
  /** Short lang code ("ja") or BCP-47 tag ("ja-JP"). */
  lang: string;
  /** Overrides the auto-generated aria-label. */
  ariaLabel?: string;
  /** Compact class override hook. */
  className?: string;
  /** Visual size. `"lg"` mirrors the extension's `.listen-btn.lg` 52×52
   *  variant used on the FRONT face of the slang / tiny-lesson deck. */
  size?: "md" | "lg";
}

const PlayIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
    <path d="M16.5 8.5a5 5 0 010 7M19 6a8 8 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StopIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="7" y="7" width="10" height="10" rx="1.8" fill="currentColor" />
  </svg>
);

/**
 * Score a voice against a BCP-47 tag — picks the most natural-sounding voice
 * available. The audio sounded robotic because the browser's DEFAULT voice (a
 * low-quality local/compact engine) was winning; this leans hard on the
 * neural/online voices (Chrome "Google …", Edge "Microsoft … Online (Natural)",
 * macOS "(Enhanced)"/"(Premium)") and buries the novelty/compact ones.
 */
const NATURAL_RE = /google|natural|neural|online|premium|enhanced|siri/;
const ROBOTIC_RE =
  /compact|eloquence|novelty|espeak|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|jester|organ|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|superstar/;

function scoreVoice(voice: SpeechSynthesisVoice, target: string): number {
  const vlang = (voice.lang || "").toLowerCase();
  const vprimary = vlang.split("-")[0] ?? vlang;
  const tprimary = target.toLowerCase().split("-")[0] ?? target.toLowerCase();
  if (vprimary !== tprimary) return -Infinity;
  const name = (voice.name || "").toLowerCase();
  let score = 0;
  if (vlang === target.toLowerCase()) score += 6; // exact region match
  if (NATURAL_RE.test(name)) score += 40; // neural/online — the big win
  if (voice.localService === false) score += 20; // remote = almost always neural
  if (/microsoft/.test(name)) score += 8;
  if (voice.default) score += 2;
  if (ROBOTIC_RE.test(name)) score -= 60; // never pick a novelty/compact voice
  return score;
}

function pickVoice(voices: SpeechSynthesisVoice[], target: string): SpeechSynthesisVoice | null {
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -Infinity;
  for (const v of voices) {
    const s = scoreVoice(v, target);
    if (s > bestScore) {
      bestScore = s;
      best = v;
    }
  }
  return bestScore > -Infinity ? best : null;
}

type State = "idle" | "loading" | "playing";

export function SlangAudioButton({ text, lang, ariaLabel, className, size = "md" }: SlangAudioButtonProps) {
  const [state, setState] = useState<State>("idle");
  const [supported, setSupported] = useState(false);
  // Track voices so we re-render when the browser loads them async.
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const refresh = () => {
      try {
        voicesRef.current = window.speechSynthesis.getVoices() ?? [];
      } catch {
        voicesRef.current = [];
      }
    };
    refresh();
    // Chrome fires `voiceschanged` once voices load. Safari may never fire it,
    // but getVoices() returns immediately there.
    window.speechSynthesis.addEventListener?.("voiceschanged", refresh);

    const stopOnHide = () => {
      if (document.hidden) {
        try { window.speechSynthesis.cancel(); } catch { /* noop */ }
      }
    };
    document.addEventListener("visibilitychange", stopOnHide);
    window.addEventListener("pagehide", () => {
      try { window.speechSynthesis.cancel(); } catch { /* noop */ }
    });

    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
      document.removeEventListener("visibilitychange", stopOnHide);
      try {
        window.speechSynthesis.cancel();
      } catch { /* noop */ }
    };
  }, []);

  const stop = useCallback(() => {
    try {
      window.speechSynthesis.cancel();
    } catch { /* noop */ }
    setState("idle");
  }, []);

  const mutedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (mutedTimer.current) clearTimeout(mutedTimer.current);
  }, []);

  const speak = useCallback(() => {
    if (!supported || !text) return;
    // Wave 15 — extension parity: with "Sound effects" off, Listen buttons
    // stay silent (learn.js `if (!I.sound) return`); slang-audio.js flashes
    // the loading state for 180 ms so the tap still visibly registers.
    if (!getFeedbackPrefs().sound) {
      setState("loading");
      if (mutedTimer.current) clearTimeout(mutedTimer.current);
      mutedTimer.current = setTimeout(() => setState("idle"), 180);
      return;
    }
    // Starting a new speech cancels any ongoing one.
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }

    const target = normalizeToBCP47(lang);

    const speakWith = (voices: SpeechSynthesisVoice[]) => {
      // Wave 17: honour the learner's Settings › Voice choice for this language
      // when that voice exists in this browser; else auto-pick the most natural.
      const voice =
        preferredVoice(voices, target) ?? pickVoice(voices, target);
      const utter = new SpeechSynthesisUtterance(text);
      // Pin the utterance to the chosen voice's exact locale so the engine
      // doesn't silently swap back to its default voice.
      utter.lang = voice?.lang || target;
      utter.rate = 0.95;
      utter.pitch = 1;
      if (voice) utter.voice = voice;
      utter.onstart = () => setState("playing");
      const done = () => setState("idle");
      utter.onend = done;
      utter.onerror = done;
      utterRef.current = utter;
      try {
        window.speechSynthesis.speak(utter);
      } catch {
        setState("idle");
      }
    };

    setState("loading");

    // Re-read voices at speak time: Chrome returns [] until the async
    // `voiceschanged` fires, and speaking then would fall back to the robotic
    // default voice. If they're not ready, wait for them (once) before
    // speaking so the natural voice is actually applied.
    let voices = window.speechSynthesis.getVoices() ?? [];
    if (voices.length > 0) {
      voicesRef.current = voices;
    } else {
      voices = voicesRef.current;
    }
    if (voices.length > 0) {
      speakWith(voices);
      return;
    }
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      window.speechSynthesis.removeEventListener?.("voiceschanged", go);
      const ready = window.speechSynthesis.getVoices() ?? [];
      if (ready.length > 0) voicesRef.current = ready;
      speakWith(ready);
    };
    window.speechSynthesis.addEventListener?.("voiceschanged", go);
    // Safari may never fire voiceschanged — retry shortly regardless.
    setTimeout(go, 300);
  }, [lang, text, supported]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      // Stop bubbling so a surrounding card-click handler (e.g. the flip card)
      // doesn't react to the audio button press.
      e.stopPropagation();
      e.preventDefault();
      if (state === "playing" || state === "loading") stop();
      else speak();
    },
    [state, stop, speak],
  );

  const isActive = state === "playing" || state === "loading";
  const label =
    ariaLabel ??
    (isActive ? "Stop playback" : `Hear "${text.slice(0, 40)}"`);

  const classes = [
    styles.btn,
    size === "lg" ? styles.sizeLg : "",
    state === "playing" ? styles.playing : "",
    state === "loading" ? styles.loading : "",
    !supported ? styles.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={!supported}
      aria-pressed={isActive}
      aria-label={label}
      title={label}
      data-testid="slang-audio-btn"
    >
      {isActive ? StopIcon : PlayIcon}
    </button>
  );
}
