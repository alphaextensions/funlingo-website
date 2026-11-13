/**
 * Watch-player preferences (Wave 16 — extension parity).
 *
 * Mirrors the extension's in-player settings (`subtitleSettings`,
 * `wordHoverSettings`, `funlingoSubtitlePlus`, `funlingoReplayPauseAfter`,
 * `funlingoSpeakOnHover`, `funlingo_playback_speed`, voice pref). Values are
 * per-viewer conveniences, so they live in localStorage — every read/write
 * is wrapped in try/catch and the page works with nothing stored.
 *
 * NEVER put caption text in here (LEGAL): only numbers, booleans and enum
 * strings. `sanitizePrefs` drops anything it doesn't recognise.
 */

export type TrackMode = "show" | "blur" | "hide";
export type CaptionColor = "default" | "accent" | "warning" | "success" | "muted";
export type CaptionWeight = 0 | 400 | 600 | 800;

export interface WatchPrefs {
  /** Learning-language line (extension `learningSize`, YouTube default 19). */
  learningSize: number;
  /** Native-language line (extension `nativeSize`, YouTube default 17). */
  nativeSize: number;
  learningMode: TrackMode;
  nativeMode: TrackMode;
  learningColor: CaptionColor;
  nativeColor: CaptionColor;
  /** 0 = inherit (extension "weight: 0"). */
  weight: CaptionWeight;
  /** Line height ×100 (extension `lineHeight`, default 135 → 1.35). */
  lineHeight: number;
  /** Hide [music], (laughs)… (extension `removeBrackets`, default off). */
  removeBrackets: boolean;
  /** Speak the word when the card opens (`enableTTS` / `funlingoSpeakOnHover`). */
  pronounceOnOpen: boolean;
  /** How many senses the card shows (extension `numTranslations` 1..3). */
  numTranslations: number;
  /** Card scale % (extension `popupSize` 50..150, default 130 there; 100 here
   *  because our card is already sized for a side column). */
  cardSize: number;
  /** Pause after replaying a line (`funlingoReplayPauseAfter`, default off). */
  pauseAfterReplay: boolean;
  /** Pause while hovering the current line (extension default behaviour). */
  hoverPause: boolean;
  /** Browser voice name, or "auto" for the best-scored voice. */
  voice: string;
  /** Remembered playback speed (`funlingo_playback_speed`, default 1). */
  speed: number;
}

export const SIZE_MIN = 12;
export const SIZE_MAX = 36;
export const LINE_HEIGHT_MIN = 100;
export const LINE_HEIGHT_MAX = 220;
export const CARD_SIZE_MIN = 50;
export const CARD_SIZE_MAX = 150;
export const SPEED_MIN = 0.25;
export const SPEED_MAX = 2;
/** YouTube's IFrame player accepts these rates. */
export const SPEED_STEPS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;
/** The extension's popover shows presets between 0.5× and 1.5×. */
export const SPEED_PRESETS = SPEED_STEPS.filter((s) => s >= 0.5 && s <= 1.5);

export const DEFAULT_PREFS: WatchPrefs = {
  learningSize: 19,
  nativeSize: 17,
  learningMode: "show",
  nativeMode: "show",
  learningColor: "default",
  nativeColor: "default",
  weight: 0,
  lineHeight: 135,
  removeBrackets: false,
  pronounceOnOpen: true,
  numTranslations: 3,
  cardSize: 100,
  pauseAfterReplay: false,
  hoverPause: true,
  voice: "auto",
  speed: 1,
};

export const STORAGE_KEY = "fnl.watch.prefs.v1";

const MODES: TrackMode[] = ["show", "blur", "hide"];
const COLORS: CaptionColor[] = ["default", "accent", "warning", "success", "muted"];
const WEIGHTS: CaptionWeight[] = [0, 400, 600, 800];

/** Maps a colour choice to a design token (no raw hex — DESIGN rule). */
export const COLOR_TOKENS: Record<CaptionColor, string> = {
  default: "var(--fl-text)",
  accent: "var(--fl-accent)",
  warning: "var(--fl-warning)",
  success: "var(--fl-success)",
  muted: "var(--fl-text-2)",
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function num(v: unknown, fallback: number, lo: number, hi: number): number {
  return typeof v === "number" && Number.isFinite(v) ? clamp(v, lo, hi) : fallback;
}

/** Snap any rate to the nearest rate YouTube supports. */
export function snapSpeed(rate: number): number {
  if (!Number.isFinite(rate)) return 1;
  let best: number = SPEED_STEPS[0];
  for (const s of SPEED_STEPS) {
    if (Math.abs(s - rate) < Math.abs(best - rate)) best = s;
  }
  return best;
}

/** Step the speed by `dir` (+1 / -1) along the supported rates. */
export function stepSpeed(rate: number, dir: 1 | -1): number {
  const i = SPEED_STEPS.indexOf(snapSpeed(rate) as (typeof SPEED_STEPS)[number]);
  const next = clamp(i + dir, 0, SPEED_STEPS.length - 1);
  return SPEED_STEPS[next];
}

/** Validate an untrusted blob (localStorage) into a full prefs object. */
export function sanitizePrefs(raw: unknown): WatchPrefs {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = DEFAULT_PREFS;
  return {
    learningSize: Math.round(num(r.learningSize, d.learningSize, SIZE_MIN, SIZE_MAX)),
    nativeSize: Math.round(num(r.nativeSize, d.nativeSize, SIZE_MIN, SIZE_MAX)),
    learningMode: MODES.includes(r.learningMode as TrackMode) ? (r.learningMode as TrackMode) : d.learningMode,
    nativeMode: MODES.includes(r.nativeMode as TrackMode) ? (r.nativeMode as TrackMode) : d.nativeMode,
    learningColor: COLORS.includes(r.learningColor as CaptionColor) ? (r.learningColor as CaptionColor) : d.learningColor,
    nativeColor: COLORS.includes(r.nativeColor as CaptionColor) ? (r.nativeColor as CaptionColor) : d.nativeColor,
    weight: WEIGHTS.includes(r.weight as CaptionWeight) ? (r.weight as CaptionWeight) : d.weight,
    lineHeight: Math.round(num(r.lineHeight, d.lineHeight, LINE_HEIGHT_MIN, LINE_HEIGHT_MAX)),
    removeBrackets: typeof r.removeBrackets === "boolean" ? r.removeBrackets : d.removeBrackets,
    pronounceOnOpen: typeof r.pronounceOnOpen === "boolean" ? r.pronounceOnOpen : d.pronounceOnOpen,
    numTranslations: Math.round(num(r.numTranslations, d.numTranslations, 1, 3)),
    cardSize: Math.round(num(r.cardSize, d.cardSize, CARD_SIZE_MIN, CARD_SIZE_MAX) / 10) * 10,
    pauseAfterReplay: typeof r.pauseAfterReplay === "boolean" ? r.pauseAfterReplay : d.pauseAfterReplay,
    hoverPause: typeof r.hoverPause === "boolean" ? r.hoverPause : d.hoverPause,
    voice: typeof r.voice === "string" && r.voice.length > 0 && r.voice.length <= 200 ? r.voice : d.voice,
    speed: snapSpeed(num(r.speed, d.speed, SPEED_MIN, SPEED_MAX)),
  };
}

export function loadPrefs(): WatchPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return sanitizePrefs(raw ? JSON.parse(raw) : {});
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function savePrefs(p: WatchPrefs): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizePrefs(p)));
  } catch {
    /* private window / blocked storage — prefs just don't persist */
  }
}

/** One-time flags (tooltips, toasts, nudges). */
export function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}
export function writeFlag(key: string): void {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    /* noop */
  }
}

export const FLAG_HOVER_PAUSE_TOAST = "fnl.watch.hoverPauseToastDismissed";
export const FLAG_SAVED_TOOLTIP = "fnl.watch.savedTooltipDismissed";
export const FLAG_WORD_DISCOVERED = "fnl.watch.wordTapDiscovered";
