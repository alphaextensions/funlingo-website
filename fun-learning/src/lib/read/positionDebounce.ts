/**
 * Debounced reading-position reporter.
 *
 * SPEC §8.2 reader: on every page turn, we POST the new CFI to
 * `/api/read/position`. Doing this synchronously on every arrow-key press
 * would spam the API, so we debounce. The spec calls for "debounced +
 * idempotency-wrapped" writes — this helper handles the debounce; the server
 * `/api/read/position/route.ts` adds the Idempotency-Key header per POST.
 *
 * Design:
 *   - Each page turn calls `report(cfi, percent)` from the Reader component.
 *   - The reporter buffers the latest position and flushes it after
 *     `delayMs` quiet time, or immediately on `flush()` (used when the user
 *     closes the reader or the tab navigates away).
 *   - Each flush generates a stable `clientRequestId` the server uses as the
 *     idempotency key.
 *
 * Keeps DOM / Prisma out of the function so it unit-tests cleanly.
 */

export interface PositionReport {
  cfi: string;
  percent: number;
}

export interface DebouncedReporterOptions {
  delayMs?: number;
  /** Called when a flush actually fires. Should perform the POST. */
  onFlush: (report: PositionReport & { clientRequestId: string }) => Promise<void> | void;
  /** Injectable clock for tests. */
  now?: () => number;
  /** Injectable timer so tests can run without real time. */
  setTimeoutFn?: (fn: () => void, ms: number) => number;
  clearTimeoutFn?: (handle: number) => void;
}

export interface DebouncedReporter {
  report(r: PositionReport): void;
  /** Flush any pending report immediately. */
  flush(): Promise<void>;
  /** Discard pending without flushing. */
  cancel(): void;
}

export const DEFAULT_DEBOUNCE_MS = 800;

export function createPositionReporter(
  opts: DebouncedReporterOptions,
): DebouncedReporter {
  const delayMs = opts.delayMs ?? DEFAULT_DEBOUNCE_MS;
  const nowFn = opts.now ?? Date.now;
  const setTimeoutImpl: (fn: () => void, ms: number) => number =
    opts.setTimeoutFn ?? ((fn, ms) => setTimeout(fn, ms) as unknown as number);
  const clearTimeoutImpl: (h: number) => void =
    opts.clearTimeoutFn ?? ((h) => clearTimeout(h as unknown as ReturnType<typeof setTimeout>));

  let pending: PositionReport | null = null;
  let timer: number | null = null;
  let seq = 0;

  const doFlush = async () => {
    timer = null;
    if (!pending) return;
    const toSend = pending;
    pending = null;
    seq += 1;
    const clientRequestId = `pos-${nowFn()}-${seq}`;
    await opts.onFlush({ ...toSend, clientRequestId });
  };

  return {
    report(r) {
      pending = r;
      if (timer !== null) clearTimeoutImpl(timer);
      timer = setTimeoutImpl(doFlush, delayMs);
    },
    async flush() {
      if (timer !== null) {
        clearTimeoutImpl(timer);
        timer = null;
      }
      await doFlush();
    },
    cancel() {
      if (timer !== null) {
        clearTimeoutImpl(timer);
        timer = null;
      }
      pending = null;
    },
  };
}
