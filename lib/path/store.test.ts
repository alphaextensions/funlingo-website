import { describe, expect, it, vi } from "vitest";
import { makeEvent } from "./events";
import { emptyState, sceneKey } from "./progress";
import { createStore, OUTBOX_CAP } from "./store";

const KEY = "funlingo-path-v1";

function memoryStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (k: string) => (k in data ? data[k] : null),
    setItem: (k: string, v: string) => {
      data[k] = v;
    },
  };
}

const done = (ref: string, score = 80) => makeEvent("scene_done", "en-es", ref, { score, content_version: 1 });

describe("createStore", () => {
  it("persists state and outbox and reads them back", () => {
    const storage = memoryStorage();
    const a = createStore(storage);
    const e = done("s1");
    a.record([e]);
    const b = createStore(storage);
    expect(b.getState().scenes[sceneKey("en-es", "s1")]).toMatchObject({ status: "done" });
    expect(b.getOutbox().map((x) => x.id)).toEqual([e.id]);
  });

  it("starts empty when the saved data is not JSON", () => {
    const store = createStore(memoryStorage({ [KEY]: "{not json" }));
    expect(store.getState()).toEqual(emptyState());
    expect(store.getOutbox()).toEqual([]);
  });

  it("starts empty when the saved data is from another version", () => {
    const store = createStore(memoryStorage({ [KEY]: JSON.stringify({ state: { v: 0 }, outbox: [] }) }));
    expect(store.getState()).toEqual(emptyState());
  });

  it("starts empty when the saved state has the wrong shape", () => {
    for (const state of [{ v: 1, scenes: null }, { v: 1, scenes: {}, finales: [], seen: [] }, { v: 1, scenes: {}, finales: {}, seen: "x" }]) {
      const store = createStore(memoryStorage({ [KEY]: JSON.stringify({ state, outbox: [] }) }));
      expect(store.getState()).toEqual(emptyState());
    }
  });

  it("loads progress saved before reviews existed, with an empty review log", () => {
    const old = { v: 1, scenes: { [sceneKey("en-es", "s1")]: { status: "done", bestScore: 80, attempts: 1, firstDoneAt: null } }, finales: {}, seen: [] };
    const store = createStore(memoryStorage({ [KEY]: JSON.stringify({ state: old, outbox: [] }) }));
    expect(store.getState().scenes[sceneKey("en-es", "s1")]).toMatchObject({ status: "done" });
    expect(store.getState().reviews).toEqual({});
  });

  it("keeps both tabs' progress when two tabs write in turn", () => {
    const storage = memoryStorage();
    const tabA = createStore(storage);
    const tabB = createStore(storage);
    const a = done("s1");
    const b = done("s2");
    tabB.record([b]);
    tabA.record([a]);
    const fresh = createStore(storage);
    expect(Object.keys(fresh.getState().scenes).sort()).toEqual([sceneKey("en-es", "s1"), sceneKey("en-es", "s2")]);
    expect(fresh.getOutbox().map((e) => e.id).sort()).toEqual([a.id, b.id].sort());
  });

  it("picks up another tab's writes on refresh", () => {
    const storage = memoryStorage();
    const tabA = createStore(storage);
    const tabB = createStore(storage);
    const fn = vi.fn();
    tabA.subscribe(fn);
    tabB.record([done("s2")]);
    tabA.refresh();
    expect(tabA.getState().scenes[sceneKey("en-es", "s2")]).toBeDefined();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("keeps working in memory when storage throws", () => {
    const storage = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("quota");
      },
    };
    const store = createStore(storage);
    store.record([done("s1")]);
    expect(store.getState().scenes[sceneKey("en-es", "s1")]).toBeDefined();
  });

  it("works with no storage at all", () => {
    const store = createStore(null);
    store.record([done("s1")]);
    expect(store.getOutbox()).toHaveLength(1);
  });

  it("drops the oldest take_done first when the outbox is full", () => {
    const store = createStore(memoryStorage());
    const firstTake = makeEvent("take_done", "en-es", "s1:0", { kind: "guess" });
    const fillers = Array.from({ length: OUTBOX_CAP - 1 }, (_, i) => done(`s${i}`));
    store.record([firstTake, ...fillers]);
    expect(store.getOutbox()).toHaveLength(OUTBOX_CAP);
    store.record([done("one-more")]);
    const ids = store.getOutbox().map((x) => x.id);
    expect(ids).toHaveLength(OUTBOX_CAP);
    expect(ids).not.toContain(firstTake.id);
  });

  it("evicts reviews before scene progress when the outbox is full", () => {
    const store = createStore(memoryStorage());
    const scene = done("s-first");
    const reviews = Array.from({ length: OUTBOX_CAP }, (_, i) => makeEvent("word_reviewed", "en-es", `w${i}`, { rating: 3, term: `t${i}` }));
    store.record([scene, ...reviews]);
    const ids = store.getOutbox().map((e) => e.id);
    expect(ids).toHaveLength(OUTBOX_CAP);
    expect(ids).toContain(scene.id);
    expect(store.getState().reviews["en-es/w0"]).toHaveLength(1); // still in state for a later upload
  });

  it("notifies subscribers and stops after unsubscribe", () => {
    const store = createStore(null);
    const fn = vi.fn();
    const off = store.subscribe(fn);
    store.record([done("s1")]);
    off();
    store.record([done("s2")]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("returns the same state object until something changes", () => {
    const store = createStore(null);
    expect(store.getState()).toBe(store.getState());
  });

  it("clears everything on reset", () => {
    const storage = memoryStorage();
    const store = createStore(storage);
    store.record([done("s1")]);
    store.reset();
    expect(createStore(storage).getState()).toEqual(emptyState());
  });
});
