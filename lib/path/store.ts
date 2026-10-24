import type { PathEvent } from "./events";
import { applyEvent, emptyState, type PathState } from "./progress";

// Guest progress lives in localStorage: the derived state plus an outbox of events
// that Phase 2 uploads to supabase apply_events(). Storage is optional — private
// windows and blocked site data fall back to memory without breaking the page.

export const OUTBOX_CAP = 2000;

type Storage = Pick<globalThis.Storage, "getItem" | "setItem">;
type Saved = { state: PathState; outbox: PathEvent[] };

export type PathStore = {
  getState(): PathState;
  getOutbox(): PathEvent[];
  record(events: PathEvent[]): void;
  subscribe(listener: () => void): () => void;
  reset(): void;
};

function load(storage: Storage | null, key: string): Saved {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return { state: emptyState(), outbox: [] };
    const saved = JSON.parse(raw) as Partial<Saved>;
    if (saved?.state?.v !== 1 || !Array.isArray(saved.outbox)) return { state: emptyState(), outbox: [] };
    return { state: { ...emptyState(), ...saved.state }, outbox: saved.outbox };
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

export function createStore(storage: Storage | null, key = "funlingo-path-v1"): PathStore {
  let { state, outbox } = load(storage, key);
  const listeners = new Set<() => void>();

  const commit = () => {
    try {
      storage?.setItem(key, JSON.stringify({ state, outbox }));
    } catch {
      // quota or blocked storage: keep going in memory
    }
    listeners.forEach((fn) => fn());
  };

  return {
    getState: () => state,
    getOutbox: () => outbox,
    record(events) {
      const fresh = events.filter((e) => !state.seen.includes(e.id));
      if (!fresh.length) return;
      state = fresh.reduce(applyEvent, state);
      outbox = capOutbox([...outbox, ...fresh]);
      commit();
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
