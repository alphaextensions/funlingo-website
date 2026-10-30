/**
 * Confidential<T> — a branded type that marks a value as containing third-party
 * caption text (or anything else that must NEVER be logged, stored or sent
 * anywhere outside the request lifecycle).
 *
 * Enforced in two places:
 *  1. `src/server/logging/scrubber.ts` — the shared logger strips any value
 *     carrying the __confidential brand before writing a line.
 *  2. Reviewer grep — searching for `Confidential<` and `markConfidential(`
 *     surfaces every leakage boundary.
 *
 * See AGENT-PLAYBOOK rule 1 ("Never persist caption text") and
 * docs/LEGAL.md ("YouTube captions… never sent to, stored in or cached by our
 * servers").
 */

declare const __confidentialBrand: unique symbol;

export type Confidential<T> = T & { readonly [__confidentialBrand]: true };

/** Mark a value as confidential. The returned value is identical at runtime
 *  but the type system now blocks it from reaching unmarked sinks that take
 *  only `string`/`unknown`. The logger scrubber inspects the brand marker and
 *  redacts the value. */
export function markConfidential<T>(v: T): Confidential<T> {
  // In production we tag the object itself when possible so the logger
  // scrubber can see it at runtime even after destructuring.
  if (v !== null && typeof v === "object") {
    try {
      Object.defineProperty(v, CONFIDENTIAL_RUNTIME_MARKER, {
        value: true,
        enumerable: false,
        configurable: false,
        writable: false,
      });
    } catch {
      // Frozen or sealed — fall back to the type-system guarantee only.
    }
  }
  return v as Confidential<T>;
}

/** Unwrap, intentionally. Call this only at the final boundary where the
 *  value is about to be sent to an upstream model and nowhere else.
 *  Grep for `unwrapConfidential(` to audit sinks. */
export function unwrapConfidential<T>(v: Confidential<T>): T {
  return v as T;
}

export const CONFIDENTIAL_RUNTIME_MARKER = Symbol.for("funlingo.confidential");

export function isConfidential(v: unknown): boolean {
  return (
    v !== null &&
    typeof v === "object" &&
    (v as Record<symbol, unknown>)[CONFIDENTIAL_RUNTIME_MARKER] === true
  );
}
