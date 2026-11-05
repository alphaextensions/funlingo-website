/**
 * Wave 15 — JS-behaviour parity: synthesized sounds, haptics, and the
 * drawer-pref store (localStorage + /api/settings persistence).
 *
 * Runs in the node environment: `window`, `localStorage`, `AudioContext`
 * and `navigator.vibrate` are stubbed per test.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_FEEDBACK_PREFS,
  FEEDBACK_PREFS_STORAGE_KEY,
  __resetFeedbackPrefsForTests,
  __setRemoteSaverForTests,
  getFeedbackPrefs,
  hydrateFeedbackPrefs,
  sanitizeFeedbackPrefs,
  setFeedbackPrefs,
} from "@/lib/feedback/prefs";
import { SOUND_SPECS, __resetSoundForTests, playSound } from "@/lib/feedback/sound";
import { HAPTIC_PATTERNS, vibrate } from "@/lib/feedback/haptics";
import { fx } from "@/lib/feedback";
import { FEEDBACK_STRINGS } from "@/lib/feedback/strings";
import { en } from "@/lib/i18n/catalog/en";
import { buildPrefsPatch, defaultPrefs, mergePrefsJson } from "@/server/prefs";

// ---------- stubs ----------------------------------------------------------

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
}

interface Call { node: string; method: string; args: unknown[] }

function param(log: Call[], node: string, name: string) {
  const rec = (method: string) => (...args: unknown[]) => { log.push({ node: `${node}.${name}`, method, args }); };
  return {
    value: 0,
    setValueAtTime: rec("setValueAtTime"),
    linearRampToValueAtTime: rec("linearRampToValueAtTime"),
    exponentialRampToValueAtTime: rec("exponentialRampToValueAtTime"),
  };
}

function makeCtxClass(log: Call[], created: { n: number }, state = "running") {
  let id = 0;
  return class FakeAudioContext {
    currentTime = 10;
    sampleRate = 48000;
    state = state;
    destination = { kind: "dest" };
    resumed = 0;
    constructor() { created.n += 1; }
    resume() { this.resumed += 1; log.push({ node: "ctx", method: "resume", args: [] }); return Promise.resolve(); }
    createOscillator() {
      const n = `osc${id++}`;
      const o = {
        _type: "",
        set type(v: string) { this._type = v; log.push({ node: n, method: "type", args: [v] }); },
        get type() { return this._type; },
        frequency: param(log, n, "frequency"),
        connect: () => {},
        start: (t: number) => log.push({ node: n, method: "start", args: [t] }),
        stop: (t: number) => log.push({ node: n, method: "stop", args: [t] }),
      };
      return o;
    }
    createGain() {
      const n = `gain${id++}`;
      return { gain: param(log, n, "gain"), connect: () => {} };
    }
    createBuffer(_ch: number, len: number) {
      log.push({ node: "buf", method: "createBuffer", args: [len] });
      const data = new Float32Array(len);
      return { getChannelData: () => data };
    }
    createBufferSource() {
      return { buffer: null, connect: () => {}, start: (t: number) => log.push({ node: "src", method: "start", args: [t] }) };
    }
    createBiquadFilter() {
      const f = { type: "", frequency: { value: 0 }, Q: { value: 0 }, connect: () => {} };
      log.push({ node: "filter", method: "create", args: [] });
      return new Proxy(f, {
        get: (t, k) => (t as Record<string | symbol, unknown>)[k],
        set: (t, k, v) => { (t as Record<string | symbol, unknown>)[k] = v; log.push({ node: "filter", method: String(k), args: [v] }); return true; },
      });
    }
  };
}

let log: Call[];
let created: { n: number };
let storage: MemStorage;
let vibrateSpy: ReturnType<typeof vi.fn>;

function installWindow(opts: { audio?: boolean; vibrate?: boolean; ctxState?: string } = {}) {
  log = [];
  created = { n: 0 };
  storage = new MemStorage();
  const win: Record<string, unknown> = { localStorage: storage };
  if (opts.audio !== false) win.AudioContext = makeCtxClass(log, created, opts.ctxState);
  vi.stubGlobal("window", win);
  vibrateSpy = vi.fn(() => true);
  vi.stubGlobal("navigator", opts.vibrate === false ? {} : { vibrate: vibrateSpy });
}

beforeEach(() => {
  __resetFeedbackPrefsForTests();
  __resetSoundForTests();
  installWindow();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ---------- prefs ----------------------------------------------------------

describe("feedback prefs — defaults match the extension (learn.js `I`)", () => {
  it("sound/haptics/motion on, rtl off, voice auto", () => {
    expect(DEFAULT_FEEDBACK_PREFS).toEqual({ sound: true, haptics: true, motion: true, rtl: false, voicePref: "auto" });
    expect(getFeedbackPrefs()).toEqual(DEFAULT_FEEDBACK_PREFS);
  });

  it("server defaultPrefs() carries the same defaults", () => {
    const d = defaultPrefs();
    expect(d.sound).toBe(true);
    expect(d.haptics).toBe(true);
    expect(d.motion).toBe(true);
    expect(d.rtl).toBe(false);
    expect(d.voicePref).toBe("auto");
  });

  it("sanitize drops wrong types (extension G() typeof guards)", () => {
    expect(sanitizeFeedbackPrefs({ sound: "no", haptics: false, voicePref: 3, junk: 1 })).toEqual({ haptics: false });
    expect(sanitizeFeedbackPrefs(null)).toEqual({});
  });
});

describe("feedback prefs — signed-out localStorage fallback", () => {
  it("hydrates from localStorage when signed out", () => {
    storage.setItem(FEEDBACK_PREFS_STORAGE_KEY, JSON.stringify({ sound: false, rtl: true }));
    const p = hydrateFeedbackPrefs(null, { signedIn: false });
    expect(p.sound).toBe(false);
    expect(p.rtl).toBe(true);
    expect(p.haptics).toBe(true);
  });

  it("corrupt localStorage falls back to defaults", () => {
    storage.setItem(FEEDBACK_PREFS_STORAGE_KEY, "{not json");
    expect(hydrateFeedbackPrefs(null, { signedIn: false })).toEqual(DEFAULT_FEEDBACK_PREFS);
  });

  it("toggle persists to localStorage and never hits the network", async () => {
    const saver = vi.fn(async () => true);
    __setRemoteSaverForTests(saver);
    hydrateFeedbackPrefs(null, { signedIn: false });
    await setFeedbackPrefs({ haptics: false });
    expect(JSON.parse(storage.getItem(FEEDBACK_PREFS_STORAGE_KEY)!).haptics).toBe(false);
    expect(saver).not.toHaveBeenCalled();
  });
});

describe("feedback prefs — signed-in Prefs.json persistence", () => {
  it("server prefs win over localStorage on boot", () => {
    storage.setItem(FEEDBACK_PREFS_STORAGE_KEY, JSON.stringify({ sound: false }));
    const p = hydrateFeedbackPrefs({ sound: true, haptics: false }, { signedIn: true });
    expect(p.sound).toBe(true);
    expect(p.haptics).toBe(false);
    // and the local cache is refreshed from the server copy
    expect(JSON.parse(storage.getItem(FEEDBACK_PREFS_STORAGE_KEY)!).sound).toBe(true);
  });

  it("toggle POSTs only the changed field", async () => {
    const saver = vi.fn(async () => true);
    __setRemoteSaverForTests(saver);
    hydrateFeedbackPrefs({}, { signedIn: true });
    const ok = await setFeedbackPrefs({ sound: false });
    expect(ok).toBe(true);
    expect(saver).toHaveBeenCalledWith({ sound: false });
    expect(getFeedbackPrefs().sound).toBe(false);
  });

  it("buildPrefsPatch keeps typed drawer fields only", () => {
    expect(
      buildPrefsPatch({ sound: false, haptics: "x", rtl: true, voicePref: "Samantha", name: "Jay", motion: false }),
    ).toEqual({ sound: false, rtl: true, voicePref: "Samantha", motion: false });
    expect(buildPrefsPatch({ voicePref: "" })).toEqual({});
  });

  it("mergePrefsJson preserves unknown keys and survives corrupt rows", () => {
    const merged = JSON.parse(mergePrefsJson(JSON.stringify({ localPronunciation: true, theme: "x" }), { sound: false }));
    expect(merged).toEqual({ localPronunciation: true, theme: "x", sound: false });
    expect(JSON.parse(mergePrefsJson("{bad", { haptics: false }))).toEqual({ haptics: false });
  });
});

// ---------- sound ----------------------------------------------------------

describe("sound — exact extension parameters", () => {
  it("tap: sine 700→1000 Hz over 70 ms, gain 0→0.05→1e-4, stop at +110 ms", () => {
    playSound("tap");
    const t = 10;
    expect(log).toContainEqual({ node: "osc0", method: "type", args: ["sine"] });
    expect(log).toContainEqual({ node: "osc0.frequency", method: "setValueAtTime", args: [700, t] });
    expect(log).toContainEqual({ node: "osc0.frequency", method: "exponentialRampToValueAtTime", args: [1000, t + 0.07] });
    expect(log).toContainEqual({ node: "gain1.gain", method: "linearRampToValueAtTime", args: [0.05, t + 0.005] });
    expect(log).toContainEqual({ node: "gain1.gain", method: "exponentialRampToValueAtTime", args: [1e-4, t + 0.07] });
    expect(log).toContainEqual({ node: "osc0", method: "stop", args: [t + 0.07 + 0.04] });
  });

  it("flip: 45 ms noise through a 2500 Hz Q9 bandpass", () => {
    playSound("flip");
    expect(log).toContainEqual({ node: "buf", method: "createBuffer", args: [Math.floor(0.045 * 48000)] });
    expect(log).toContainEqual({ node: "filter", method: "type", args: ["bandpass"] });
    expect(SOUND_SPECS.flip).toMatchObject({ freq: 2500, q: 9, gain: 0.06, decay: 0.18 });
  });

  it("correct: C5-E5-G5 sines + 2× triangle overtones, 35 ms stagger", () => {
    playSound("correct");
    const sets = log.filter((c) => c.method === "setValueAtTime" && c.node.endsWith(".frequency"));
    const freqs = sets.map((c) => c.args[0]);
    expect(freqs).toEqual([523.25, 1046.5, 659.25, 1318.5, 783.99, 1567.98]);
    const starts = sets.map((c) => Number((c.args[1] as number).toFixed(3)));
    expect(starts).toEqual([10, 10, 10.035, 10.035, 10.07, 10.07]);
    const types = log.filter((c) => c.method === "type").map((c) => c.args[0]);
    expect(types).toEqual(["sine", "triangle", "sine", "triangle", "sine", "triangle"]);
  });

  it("wrong: 220→165 + 110→82 Hz over 280 ms, stop at +360 ms", () => {
    playSound("wrong");
    expect(log).toContainEqual({ node: "osc0.frequency", method: "setValueAtTime", args: [220, 10] });
    expect(log).toContainEqual({ node: "osc0.frequency", method: "exponentialRampToValueAtTime", args: [165, 10 + 0.28] });
    expect(log).toContainEqual({ node: "osc2.frequency", method: "exponentialRampToValueAtTime", args: [82, 10 + 0.28] });
    const stops = log.filter((c) => c.method === "stop").map((c) => Number((c.args[0] as number).toFixed(3)));
    expect(stops).toEqual([10.36, 10.36]);
  });

  it("AudioContext is created lazily, once, and resumed when suspended", () => {
    __resetSoundForTests();
    installWindow({ ctxState: "suspended" });
    expect(created.n).toBe(0);
    playSound("tap");
    playSound("tap");
    expect(created.n).toBe(1);
    expect(log.filter((c) => c.method === "resume").length).toBe(2);
  });

  it("Sound toggle off → no AudioContext, no nodes", async () => {
    await setFeedbackPrefs({ sound: false });
    playSound("correct");
    expect(created.n).toBe(0);
    expect(log).toHaveLength(0);
  });

  it("unsupported browser is a silent no-op", () => {
    installWindow({ audio: false });
    expect(() => playSound("tap")).not.toThrow();
  });
});

// ---------- haptics --------------------------------------------------------

describe("haptics — extension vibrate patterns", () => {
  it("patterns match learn.js", () => {
    expect(HAPTIC_PATTERNS.tap).toBe(12);
    expect(HAPTIC_PATTERNS.flip).toBe(10);
    expect(HAPTIC_PATTERNS.correct).toEqual([15, 30, 15, 30, 20]);
    expect(HAPTIC_PATTERNS.wrong).toEqual([40, 50, 40]);
  });

  it("fx cues vibrate with the right pattern", () => {
    fx.tap();
    fx.wrong();
    expect(vibrateSpy).toHaveBeenNthCalledWith(1, 12);
    expect(vibrateSpy).toHaveBeenNthCalledWith(2, [40, 50, 40]);
  });

  it("Haptics toggle off → no vibrate, sound still plays", async () => {
    await setFeedbackPrefs({ haptics: false });
    fx.tap();
    expect(vibrateSpy).not.toHaveBeenCalled();
    expect(created.n).toBe(1);
  });

  it("no navigator.vibrate (iOS / desktop) → no-op", () => {
    installWindow({ vibrate: false });
    expect(vibrate("tap")).toBe(false);
  });
});

// ---------- wiring sentinels ----------------------------------------------

const src = (p: string) => readFileSync(resolve(__dirname, "../..", p), "utf8");

describe("Wave 15 wiring — every extension cue site has an fx call", () => {
  it("FlashcardDeck: flip, tap on prev/next, deck-end, swipe, Escape", () => {
    const f = src("src/components/learn/FlashcardDeck.tsx");
    expect(f).toContain("fx.flip()");
    expect(f.match(/fx\.tap\(\)/g)?.length).toBeGreaterThanOrEqual(2);
    expect(f).toContain("fx.complete()");
    expect(f).toContain("SWIPE_THRESHOLD_PX = 60");
    expect(f).toContain('e.key === "Escape"');
  });

  it("Quick Quiz: correct/wrong/tap/complete, keys 1–4, Skip", () => {
    const f = src("app/review/QuickQuizRunner.tsx");
    for (const c of ["fx.correct()", "fx.wrong()", "fx.tap()", "fx.complete()"]) expect(f).toContain(c);
    expect(f).toContain("/^[1-4]$/");
    expect(f).toContain("quick-quiz-skip");
  });

  it("/learn tiles tap; locked tiles toast", () => {
    const f = src("app/learn/LearnLanding.tsx");
    expect(f).toContain('data-fx="tap"');
    // Wave 14: the toast copy now comes from the i18n catalog (localised
    // to the learner's native language) — same extension English.
    expect(f).toContain('data-fx-toast={t("learn.saveToUnlock")}');
    expect(en["learn.saveToUnlock"]).toBe(FEEDBACK_STRINGS.saveToUnlock);
  });

  it("Review, Words and Talk are wired", () => {
    expect(src("app/review/drills/GradeRow.tsx")).toContain("fx.tap()");
    expect(src("app/review/drills/GuessMeaning.tsx")).toContain("fx.correct()");
    expect(src("src/components/words/WordsExplorer.tsx")).toContain("fx.tap()");
    expect(src("app/talk/[topicSlug]/[lessonSlug]/LessonChat.tsx")).toContain("fx.tap()");
  });

  it("Listen buttons respect the Sound toggle + voice pref", () => {
    const f = src("src/components/SlangAudioButton.tsx");
    // Sound gate stays. Voice preference moved from Wave 15's single
    // getFeedbackPrefs().voicePref to Wave 17's per-language preferredVoice()
    // (the model SlangAudioButton now reads), so assert that instead.
    expect(f).toContain("getFeedbackPrefs().sound");
    expect(f).toContain("preferredVoice(");
  });

  it("Animations toggle kills the deck flip transition", () => {
    expect(src("src/components/learn/FlashcardDeck.module.css")).toMatch(
      /body\[data-motion="off"\]\) \.fcInner/,
    );
  });
});
