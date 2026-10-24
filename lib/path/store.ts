import type { PathEvent } from "./events";
import { applyEvent, emptyState, type PathState } from "./progress";

// Guest progress lives in localStorage: the derived state plus an outbox of events
// that Phase 2 uploads to supabase apply_events(). Storage is optional — private
// windows and blocked site data fall back to memory without breaking the page.

export const OUTBOX_CAP = 2000;
export const STORE_KEY = "funlingo-path-v1";

type Storage = Pick<globalThis.Storage, "getItem" | "setItem">;
type Saved = { state: PathState; outbox: PathEvent[] };

export type PathStore = {
  getState(): PathState;
  getOutbox(): PathEvent[];
  record(events: PathEvent[]): void;
  /** Re-reads storage, e.g. after another tab saved. */
  refresh(): void;
  subscribe(listener: () => void): () => void;
  reset(): void;
};

const isRecord = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

/** The saved blob, or an empty one when nothing valid is saved; null when storage can't be read. */
function read(storage: Storage | null, key: string): Saved | null {
  let raw: string | null;
  try {
    raw = storage ? storage.getItem(key) : null;
  } catch {
    return null;
  }
  try {
    const saved: unknown = raw ? JSON.parse(raw) : null;
    if (!isRecord(saved) || !isRecord(saved.state) || !Array.isArray(saved.outbox)) throw new Error("shape");
    const st = saved.state;
    if (st.v !== 1 || !isRecord(st.scenes) || !isRecord(st.finales) || !Array.isArray(st.seen)) throw new Error("shape");
    if (st.reviews !== undefined && !isRecord(st.reviews)) throw new Error("shape");
    // Saved before the review deck existed: same version, no reviews yet.
    return { state: { ...(st as PathState), reviews: (st.reviews as PathState["reviews"]) ?? {} }, outbox: saved.outbox as PathEvent[] };
  } catch {
    return { state: emptyState(), outbox: [] };
  }
}

function capOutbox(outbox: PathEvent[]): PathEvent[] {
  const next = [...outbox];
  while (next.length > OUTBOX_CAP) {
    const take = next.findIndex((e) => e.kind === "take_done");
    next.splice(take >= 0 ? take : 0, 1);
  }
  return next;
}

export function createStore(storage: Storage | null, key = STORE_KEY): PathStore {
  let { state, outbox } = read(storage, key) ?? { state: emptyState(), outbox: [] };
  // True while storage holds everything we know. Then re-reading it is safe and picks
  // up other tabs' writes; once a write fails, memory is the only full copy.
  let inSync = storage !== null;
  const listeners = new Set<() => void>();

  const sync = () => {
    if (!inSync) return;
    const saved = read(storage, key);
    if (saved) ({ state, outbox } = saved);
  };

  const commit = () => {
    try {
      storage?.setItem(key, JSON.stringify({ state, outbox }));
    } catch {
      inSync = false; // quota or blocked storage: keep going in memory
    }
    listeners.forEach((fn) => fn());
  };

  return {
    getState: () => state,
    getOutbox: () => outbox,
    record(events) {
      sync(); // another tab may have written since we last read
      const fresh = events.filter((e) => !state.seen.includes(e.id));
      if (!fresh.length) return;
      state = fresh.reduce(applyEvent, state);
      outbox = capOutbox([...outbox, ...fresh]);
      commit();
    },
    refresh() {
      sync();
      listeners.forEach((fn) => fn());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset() {
      state = emptyState();
      outbox = [];
      commit();
    },
  };
}
