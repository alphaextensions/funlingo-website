/**
 * Wave 15 — synthesized UI sounds, ported 1:1 from the extension's
 * `learn.js` (`$e.tap/flip/correct/wrong` + `Xe()` context getter).
 *
 * Every number below is copied from the extension bundle — do not "tidy"
 * them. Exported as `SOUND_SPECS` so the unit test can pin them.
 *
 * AudioContext is created lazily on the FIRST cue (cues only fire from user
 * gestures, which satisfies the browser autoplay policy) and resumed if the
 * browser suspended it. With the Sound toggle off nothing is created at all.
 */

import { getFeedbackPrefs } from "./prefs";

export type SoundEvent = "tap" | "flip" | "correct" | "wrong" | "complete";

export const SOUND_SPECS = {
  /** Sine chirp 700→1000 Hz (exp ramp) over 70 ms; gain 0→0.05 in 5 ms,
   *  exp decay to 1e-4 at 70 ms; osc stops at 110 ms. */
  tap: { type: "sine", from: 700, to: 1000, dur: 0.07, peak: 0.05, attack: 0.005, tail: 0.04 },
  /** 45 ms white-noise burst, envelope exp(-i / (0.18·N)), bandpass 2500 Hz
   *  Q 9, flat gain 0.06 — a paper "flick". */
  flip: { noiseDur: 0.045, decay: 0.18, filter: "bandpass", freq: 2500, q: 9, gain: 0.06 },
  /** C5-E5-G5 arpeggio, notes 35 ms apart. Each note: sine fundamental
   *  (peak 0.055, decay to 220 ms) + triangle at 2× (peak 0.012, decay to
   *  154 ms); attack 6 ms; both stop at start + 270 ms. */
  correct: {
    notes: [523.25, 659.25, 783.99],
    stagger: 0.035,
    attack: 0.006,
    fundamental: { type: "sine", peak: 0.055, decay: 0.22 },
    overtone: { type: "triangle", mult: 2, peak: 0.012, decay: 0.154 },
    stopAfter: 0.27,
  },
  /** Two falling sines: 220→165 Hz (peak 0.05, attack 12 ms) and
   *  110→82 Hz (peak 0.03, attack 15 ms) over 280 ms; both decay to 1e-4 at
   *  320 ms and stop at 360 ms. */
  wrong: {
    dur: 0.28,
    high: { type: "sine", from: 220, to: 165, peak: 0.05, attack: 0.012 },
    low: { type: "sine", from: 110, to: 82, peak: 0.03, attack: 0.015 },
    release: 0.04,
    stopTail: 0.08,
  },
} as const;

type Ctx = AudioContext;

let ctx: Ctx | null = null;

/** Test seam — drop the cached context. */
export function __resetSoundForTests(): void {
  ctx = null;
}

/** Mirrors the extension's `Xe()`: null when sound is off or unsupported. */
export function getAudioContext(): Ctx | null {
  if (!getFeedbackPrefs().sound) return null;
  if (!ctx) {
    try {
      if (typeof window === "undefined") return null;
      const w = window as unknown as {
        AudioContext?: new () => Ctx;
        webkitAudioContext?: new () => Ctx;
      };
      const Ctor = w.AudioContext ?? w.webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    } catch {
      ctx = null;
    }
  }
  if (!ctx) return null;
  if (ctx.state === "suspended") {
    try {
      void ctx.resume();
    } catch {
      /* noop */
    }
  }
  return ctx;
}

function playTap(c: Ctx): void {
  const s = SOUND_SPECS.tap;
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = s.type;
  osc.frequency.setValueAtTime(s.from, t);
  osc.frequency.exponentialRampToValueAtTime(s.to, t + s.dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(s.peak, t + s.attack);
  g.gain.exponentialRampToValueAtTime(1e-4, t + s.dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t);
  osc.stop(t + s.dur + s.tail);
}

function playFlip(c: Ctx): void {
  const s = SOUND_SPECS.flip;
  const t = c.currentTime;
  const n = Math.floor(s.noiseDur * c.sampleRate);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < n; i += 1) {
    data[i] = (2 * Math.random() - 1) * Math.exp(-i / (s.decay * n));
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = s.filter;
  f.frequency.value = s.freq;
  f.Q.value = s.q;
  const g = c.createGain();
  g.gain.value = s.gain;
  src.connect(f);
  f.connect(g);
  g.connect(c.destination);
  src.start(t);
}

function playCorrect(c: Ctx): void {
  const s = SOUND_SPECS.correct;
  const t0 = c.currentTime;
  s.notes.forEach((freq, idx) => {
    const t = t0 + s.stagger * idx;
    const stop = t + s.stopAfter;
    const o1 = c.createOscillator();
    o1.type = s.fundamental.type;
    o1.frequency.setValueAtTime(freq, t);
    const o2 = c.createOscillator();
    o2.type = s.overtone.type;
    o2.frequency.setValueAtTime(freq * s.overtone.mult, t);
    const g1 = c.createGain();
    g1.gain.setValueAtTime(0, t);
    g1.gain.linearRampToValueAtTime(s.fundamental.peak, t + s.attack);
    g1.gain.exponentialRampToValueAtTime(1e-4, t + s.fundamental.decay);
    const g2 = c.createGain();
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(s.overtone.peak, t + s.attack);
    g2.gain.exponentialRampToValueAtTime(1e-4, t + s.overtone.decay);
    o1.connect(g1);
    o2.connect(g2);
    g1.connect(c.destination);
    g2.connect(c.destination);
    o1.start(t);
    o2.start(t);
    o1.stop(stop);
    o2.stop(stop);
  });
}

function playWrong(c: Ctx): void {
  const s = SOUND_SPECS.wrong;
  const t = c.currentTime;
  const voices = [s.high, s.low].map((v) => {
    const o = c.createOscillator();
    o.type = v.type;
    o.frequency.setValueAtTime(v.from, t);
    o.frequency.exponentialRampToValueAtTime(v.to, t + s.dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v.peak, t + v.attack);
    g.gain.exponentialRampToValueAtTime(1e-4, t + s.dur + s.release);
    o.connect(g);
    g.connect(c.destination);
    return o;
  });
  for (const o of voices) o.start(t);
  for (const o of voices) o.stop(t + s.dur + s.stopTail);
}

const PLAYERS: Record<SoundEvent, (c: Ctx) => void> = {
  tap: playTap,
  flip: playFlip,
  correct: playCorrect,
  wrong: playWrong,
  // Web-only surface (quiz finish / deck end / review done): the extension
  // has no "complete" cue, so we reuse its success chime verbatim rather
  // than inventing a new tone.
  complete: playCorrect,
};

/** Play a cue. Silent no-op when Sound is off, unsupported, or throws. */
export function playSound(event: SoundEvent): void {
  const c = getAudioContext();
  if (!c) return;
  try {
    PLAYERS[event](c);
  } catch {
    /* never let a sound failure break the interaction */
  }
}
