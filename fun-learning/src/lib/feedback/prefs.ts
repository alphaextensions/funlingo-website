/**
 * Wave 15 — client-side store for the extension's settings-drawer prefs.
 *
 * Mirrors the extension's `funLearningPrefs` blob (learn.js `I.sound`,
 * `I.haptics`, `I.motion`, `I.rtl`, `I.voicePref`) with the SAME defaults:
 *   sound: true, haptics: true, motion: true, rtl: false, voicePref: "auto".
 *
 * Persistence:
 *   - Always mirrored to `localStorage["funLearningPrefs"]` (same key as the
 *     extension's chrome.storage entry) — that's the signed-out store and a
 *     fast cache for signed-in viewers.
 *   - When signed in, every change is also POSTed to `/api/settings`, which
 *     merges the field into `Prefs.json`.
 *
 * Precedence on boot: signed-in → server prefs (rendered by the layout);
 * signed-out → localStorage → defaults.
 *
 * No React dependency so the sound/haptics modules (and unit tests) can read
 * it synchronously from any event handler.
 */

export interface FeedbackPrefs {
  sound: boolean;
  haptics: boolean;
  motion: boolean;
  rtl: boolean;
  voicePref: string;
}

export const FEEDBACK_PREFS_STORAGE_KEY = "funLearningPrefs";

export const DEFAULT_FEEDBACK_PREFS: Readonly<FeedbackPrefs> = Object.freeze({
  sound: true,
  haptics: true,
  motion: true,
  rtl: false,
  voicePref: "auto",
});

type Listener = (prefs: FeedbackPrefs) => void;

let current: FeedbackPrefs = { ...DEFAULT_FEEDBACK_PREFS };
let signedIn = false;
const listeners = new Set<Listener>();

/** Keep only well-typed known fields — same guard as the extension's G(). */
export function sanitizeFeedbackPrefs(raw: unknown): Partial<FeedbackPrefs> {
  if (!raw || typeof raw !== "object") return {};
  const r = raw as Record<string, unknown>;
  const out: Partial<FeedbackPrefs> = {};
  if (typeof r.sound === "boolean") out.sound = r.sound;
  if (typeof r.haptics === "boolean") out.haptics = r.haptics;
  if (typeof r.motion === "boolean") out.motion = r.motion;
  if (typeof r.rtl === "boolean") out.rtl = r.rtl;
  if (typeof r.voicePref === "string" && r.voicePref.length > 0) out.voicePref = r.voicePref;
  return out;
}

function getStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

export function readLocalFeedbackPrefs(): Partial<FeedbackPrefs> {
  const ls = getStorage();
  if (!ls) return {};
  try {
    const raw = ls.getItem(FEEDBACK_PREFS_STORAGE_KEY);
    return raw ? sanitizeFeedbackPrefs(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

function writeLocal(prefs: FeedbackPrefs): void {
  const ls = getStorage();
  if (!ls) return;
  try {
    ls.setItem(FEEDBACK_PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* quota / private mode — the in-memory value still applies */
  }
}

function emit(): void {
  for (const l of listeners) {
    try {
      l(current);
    } catch {
      /* a broken subscriber must not block the others */
    }
  }
}

export function getFeedbackPrefs(): FeedbackPrefs {
  return current;
}

export function isSignedInForPrefs(): boolean {
  return signedIn;
}

/**
 * Boot the store. `server` is the viewer's Prefs.json subset (signed in) or
 * `null` (signed out → fall back to localStorage).
 */
export function hydrateFeedbackPrefs(
  server: Partial<FeedbackPrefs> | null,
  opts: { signedIn: boolean },
): FeedbackPrefs {
  signedIn = opts.signedIn;
  const base = opts.signedIn && server
    ? sanitizeFeedbackPrefs(server)
    : readLocalFeedbackPrefs();
  current = { ...DEFAULT_FEEDBACK_PREFS, ...base };
  if (opts.signedIn) writeLocal(current);
  emit();
  return current;
}

export type RemoteSaver = (patch: Partial<FeedbackPrefs>) => Promise<boolean>;

/** Default remote saver — merges the patch into Prefs.json. */
export const postFeedbackPrefs: RemoteSaver = async (patch) => {
  try {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": `feedback-prefs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      },
      body: JSON.stringify(patch),
    });
    return res.ok;
  } catch {
    return false;
  }
};

let remoteSaver: RemoteSaver = postFeedbackPrefs;

/** Test seam. */
export function __setRemoteSaverForTests(fn: RemoteSaver | null): void {
  remoteSaver = fn ?? postFeedbackPrefs;
}

/** Test seam — reset module state between tests. */
export function __resetFeedbackPrefsForTests(): void {
  current = { ...DEFAULT_FEEDBACK_PREFS };
  signedIn = false;
  listeners.clear();
  remoteSaver = postFeedbackPrefs;
}

/**
 * Update one or more prefs. Writes localStorage immediately; when signed in
 * also persists to Prefs.json. Resolves to whether the remote save worked
 * (`true` for signed-out, since localStorage is the store of record there).
 */
export async function setFeedbackPrefs(patch: Partial<FeedbackPrefs>): Promise<boolean> {
  const clean = sanitizeFeedbackPrefs(patch);
  if (Object.keys(clean).length === 0) return true;
  current = { ...current, ...clean };
  writeLocal(current);
  emit();
  if (!signedIn) return true;
  return remoteSaver(clean);
}

export function subscribeFeedbackPrefs(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
