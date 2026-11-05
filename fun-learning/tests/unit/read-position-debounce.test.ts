import { describe, it, expect, vi } from "vitest";
import {
  createPositionReporter,
  DEFAULT_DEBOUNCE_MS,
} from "@/lib/read/positionDebounce";

/**
 * Fake timer harness — we drive the reporter's debounce behaviour without
 * relying on real time, so the test runs in a few milliseconds instead of
 * seconds.
 */
function makeFakeClock() {
  type ScheduledTask = { id: number; fn: () => void; dueAt: number };
  const tasks = new Map<number, ScheduledTask>();
  let nextId = 1;
  let now = 0;

  return {
    now() {
      return now;
    },
    setTimeoutFn(fn: () => void, ms: number) {
      const id = nextId++;
      tasks.set(id, { id, fn, dueAt: now + ms });
      return id;
    },
    clearTimeoutFn(id: number) {
      tasks.delete(id);
    },
    async advance(ms: number) {
      now += ms;
      // Trigger any task whose dueAt is <= now, in order of due time.
      const due = [...tasks.values()]
        .filter((t) => t.dueAt <= now)
        .sort((a, b) => a.dueAt - b.dueAt);
      for (const t of due) {
        tasks.delete(t.id);
        t.fn();
      }
      // Give any awaited promises inside fn a tick to resolve.
      await Promise.resolve();
      await Promise.resolve();
    },
    pending() {
      return tasks.size;
    },
  };
}

describe("reading-position debounce", () => {
  it("collapses rapid reports into a single flush at DEFAULT_DEBOUNCE_MS", async () => {
    const onFlush = vi.fn();
    const clock = makeFakeClock();
    const r = createPositionReporter({
      onFlush,
      now: clock.now,
      setTimeoutFn: clock.setTimeoutFn,
      clearTimeoutFn: clock.clearTimeoutFn,
    });

    r.report({ cfi: "cfi:/1", percent: 10 });
    r.report({ cfi: "cfi:/2", percent: 20 });
    r.report({ cfi: "cfi:/3", percent: 30 });

    // Before the window elapses, no flush has fired.
    expect(onFlush).not.toHaveBeenCalled();
    await clock.advance(DEFAULT_DEBOUNCE_MS - 1);
    expect(onFlush).not.toHaveBeenCalled();

    await clock.advance(2);
    expect(onFlush).toHaveBeenCalledTimes(1);
    // Only the LAST position was flushed.
    expect(onFlush.mock.calls[0][0]).toMatchObject({ cfi: "cfi:/3", percent: 30 });
    // And the flush got a unique idempotency key.
    expect(typeof onFlush.mock.calls[0][0].clientRequestId).toBe("string");
    expect(onFlush.mock.calls[0][0].clientRequestId).toMatch(/^pos-/);
  });

  it("rapid-fire 20 reports still fire exactly one flush", async () => {
    const onFlush = vi.fn();
    const clock = makeFakeClock();
    const r = createPositionReporter({
      onFlush,
      now: clock.now,
      setTimeoutFn: clock.setTimeoutFn,
      clearTimeoutFn: clock.clearTimeoutFn,
    });

    for (let i = 0; i < 20; i++) {
      r.report({ cfi: `cfi:/${i}`, percent: i * 5 });
    }
    // Nothing fires until the window elapses.
    expect(onFlush).not.toHaveBeenCalled();
    await clock.advance(DEFAULT_DEBOUNCE_MS + 1);
    expect(onFlush).toHaveBeenCalledTimes(1);
    expect(onFlush.mock.calls[0][0]).toMatchObject({ cfi: "cfi:/19" });
  });

  it("flush() fires immediately and cancels any pending timer", async () => {
    const onFlush = vi.fn();
    const clock = makeFakeClock();
    const r = createPositionReporter({
      onFlush,
      now: clock.now,
      setTimeoutFn: clock.setTimeoutFn,
      clearTimeoutFn: clock.clearTimeoutFn,
    });

    r.report({ cfi: "cfi:/a", percent: 1 });
    expect(clock.pending()).toBe(1);
    await r.flush();
    expect(onFlush).toHaveBeenCalledTimes(1);
    expect(clock.pending()).toBe(0);

    // No more flushes should fire later.
    await clock.advance(DEFAULT_DEBOUNCE_MS * 3);
    expect(onFlush).toHaveBeenCalledTimes(1);
  });

  it("cancel() discards without flushing", async () => {
    const onFlush = vi.fn();
    const clock = makeFakeClock();
    const r = createPositionReporter({
      onFlush,
      now: clock.now,
      setTimeoutFn: clock.setTimeoutFn,
      clearTimeoutFn: clock.clearTimeoutFn,
    });

    r.report({ cfi: "cfi:/x", percent: 5 });
    r.cancel();
    await clock.advance(DEFAULT_DEBOUNCE_MS * 2);
    expect(onFlush).not.toHaveBeenCalled();
  });

  it("each flush uses a unique clientRequestId", async () => {
    const onFlush = vi.fn();
    const clock = makeFakeClock();
    const r = createPositionReporter({
      onFlush,
      now: clock.now,
      setTimeoutFn: clock.setTimeoutFn,
      clearTimeoutFn: clock.clearTimeoutFn,
    });

    r.report({ cfi: "cfi:/1", percent: 10 });
    await clock.advance(DEFAULT_DEBOUNCE_MS + 1);
    r.report({ cfi: "cfi:/2", percent: 20 });
    await clock.advance(DEFAULT_DEBOUNCE_MS + 1);

    expect(onFlush).toHaveBeenCalledTimes(2);
    const [a, b] = onFlush.mock.calls.map((c) => c[0].clientRequestId);
    expect(a).not.toBe(b);
  });
});
