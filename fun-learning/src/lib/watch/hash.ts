/**
 * SHA-256 of a caption line, used as a CACHE KEY only.
 *
 * LEGAL rule: caption text never persists. Hashing is one-way, which is fine
 * for cache lookup. Future callers writing to `CultureNoteCache` must only
 * send the hash, never the raw line.
 *
 * Works in both Node (crypto.subtle via node:crypto) and the browser.
 */

export async function sha256Hex(input: string): Promise<string> {
  // Prefer the Web Crypto API — available in Node 18+, Edge runtime, and all
  // modern browsers. Keeps a single implementation that scrubs the input the
  // same way on client and server.
  const subtle: SubtleCrypto | undefined =
    typeof globalThis.crypto !== "undefined" ? globalThis.crypto.subtle : undefined;
  if (subtle) {
    const data = new TextEncoder().encode(input);
    const digest = await subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Fallback for ancient runtimes.
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(input).digest("hex");
}
