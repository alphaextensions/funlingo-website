"use client";

import * as React from "react";
import type { PathEvent } from "@/lib/path/events";
import { emptyState, type PathState } from "@/lib/path/progress";
import { createStore, type PathStore, STORE_KEY } from "@/lib/path/store";

let store: PathStore | null = null;
const SERVER_STATE = emptyState();

function getStore(): PathStore {
  if (!store) {
    let storage: Storage | null = null;
    try {
      storage = window.localStorage;
    } catch {
      // blocked site data: progress lives in memory for this visit
    }
    store = createStore(storage);
    window.addEventListener("storage", (e) => {
      if (e.key === STORE_KEY) store?.refresh();
    });
  }
  return store;
}

const noopSubscribe = () => () => {};

/** Guest progress from localStorage. Renders empty on the server and hydrates on the client;
 * `hydrated` turns true once the saved progress has been read. */
export function usePath(): { state: PathState; hydrated: boolean; record: (events: PathEvent[]) => void } {
  const state = React.useSyncExternalStore(
    (fn) => getStore().subscribe(fn),
    () => getStore().getState(),
    () => SERVER_STATE,
  );
  const hydrated = React.useSyncExternalStore(noopSubscribe, () => true, () => false);
  const record = React.useCallback((events: PathEvent[]) => getStore().record(events), []);
  return { state, hydrated, record };
}
