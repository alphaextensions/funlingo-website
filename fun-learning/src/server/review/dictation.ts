/**
 * Dictation grading — case/punctuation-insensitive diff for the Dictation
 * drill (SPEC §11 bullet "Type it", AGENT-PLAYBOOK veto test #3).
 *
 * Guarantees codified in `tests/unit/review/dictation.test.ts`:
 *   - Case and punctuation are ignored when deciding "correct".
 *   - `hint()` reveals ONLY letters the user is still missing — never
 *     letters they've already typed. Already-typed letters are returned as
 *     ".", so the UI can render them as a filled slot without colour-coding.
 *   - `firstErrorIndex(ref, typed)` finds the first character position in
 *     `typed` that doesn't match the normalised reference, so the UI can
 *     jump the cursor to it.
 */

/** Lower-case; strip anything that isn't a letter, digit or interior space. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\p{P}\p{S}]/gu, "") // strip punctuation + symbols
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Character-level normalised equality, ignoring case/punctuation/surrounding
 * whitespace. Used to decide "correct" in Dictation.
 */
export function dictationMatches(ref: string, typed: string): boolean {
  return normalize(ref) === normalize(typed);
}

/**
 * First index in `typed` (as the user sees it — unnormalised) where the
 * normalised stream diverges from `ref`'s normalised stream. Returns
 * `typed.length` if `typed` is a correct prefix.
 *
 * Both streams skip whitespace, punctuation and symbols, so "hello, world"
 * typed as "hello world" matches without flagging the comma as a diff.
 */
export function firstErrorIndex(ref: string, typed: string): number {
  const refSig = normalize(ref).replace(/\s+/g, "");
  const typedChars = [...typed];
  let ni = 0;
  for (let i = 0; i < typedChars.length; i++) {
    const ch = typedChars[i];
    const n = normalize(ch).replace(/\s+/g, "");
    if (n === "") continue; // typed punctuation/space — skip in both streams
    if (ni >= refSig.length) return i; // typed past the end
    if (n !== refSig[ni]) return i;
    ni++;
  }
  return typedChars.length;
}

/**
 * Build a hint string the same length as the reference (normalised view).
 * For each character in the normalised reference:
 *   - "." if the user already typed it correctly in sequence (don't reveal)
 *   - the actual character otherwise (reveal what's missing)
 *
 * The UI can show this as a scaffolded prompt without regressing on letters
 * the learner already knows.
 */
export function hint(ref: string, typed: string): string {
  const refN = normalize(ref);
  const typedN = normalize(typed);
  let matched = 0;
  for (let i = 0; i < Math.min(refN.length, typedN.length); i++) {
    if (refN[i] === typedN[i]) matched++;
    else break;
  }
  // The first `matched` chars have already been typed correctly — hide them.
  const out = new Array<string>(refN.length);
  for (let i = 0; i < refN.length; i++) {
    out[i] = i < matched ? "." : refN[i];
  }
  return out.join("");
}
