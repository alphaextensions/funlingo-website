/**
 * Logger wrapper around Pino that strips any value branded Confidential<T>
 * before it leaves the process. See `src/server/types/confidential.ts`.
 *
 * ANY future transport (Sentry, OpenTelemetry, …) MUST go through this
 * wrapper. Direct `console.*` calls are discouraged — ESLint can be
 * configured to flag them in a later lane.
 */

import pino from "pino";
import { isConfidential } from "@/server/types/confidential";

const REDACTED = "[CONFIDENTIAL_REDACTED]";

function scrub(value: unknown, seen: WeakSet<object> = new WeakSet()): unknown {
  if (value === null || value === undefined) return value;
  if (isConfidential(value)) return REDACTED;

  if (Array.isArray(value)) {
    return value.map((v) => scrub(v, seen));
  }

  if (typeof value === "object") {
    if (seen.has(value as object)) return "[Circular]";
    seen.add(value as object);
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = scrub(v, seen);
    }
    return out;
  }

  return value;
}

const base = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true, singleLine: true } }
      : undefined,
  formatters: {
    log: (obj) => scrub(obj) as Record<string, unknown>,
  },
});

type LogFn = (obj: Record<string, unknown> | string, msg?: string) => void;

export const logger = {
  trace: ((obj, msg) => base.trace(scrub(obj) as never, msg)) as LogFn,
  debug: ((obj, msg) => base.debug(scrub(obj) as never, msg)) as LogFn,
  info:  ((obj, msg) => base.info(scrub(obj) as never, msg)) as LogFn,
  warn:  ((obj, msg) => base.warn(scrub(obj) as never, msg)) as LogFn,
  error: ((obj, msg) => base.error(scrub(obj) as never, msg)) as LogFn,
  fatal: ((obj, msg) => base.fatal(scrub(obj) as never, msg)) as LogFn,
};

// Exposed for unit tests (`tests/unit/scrubber.test.ts` later).
export const __test__ = { scrub, REDACTED };
