/**
 * Right-to-left language detection.
 *
 * Used by `app/layout.tsx` to set `<html dir>` from the viewer's UI locale, so
 * Arabic/Hebrew/Persian/Urdu learners get real RTL layout instead of a
 * hard-coded `dir="ltr"`.
 *
 * The language code is matched case-insensitively against the leading BCP-47
 * primary tag — `ar-EG`, `ar_eg`, `ARABIC` → `"ar"` for the purposes of this
 * check. Unknown codes are LTR by default.
 */

const RTL_PRIMARY_TAGS = new Set(["ar", "he", "fa", "ur", "yi", "ps", "sd", "dv"]);

export function isRtl(code: string | null | undefined): boolean {
  if (!code) return false;
  const normalized = code.trim().toLowerCase();
  if (!normalized) return false;
  // Keep only the primary language subtag (`ar-EG` → `ar`).
  const primary = normalized.split(/[-_]/)[0];
  return RTL_PRIMARY_TAGS.has(primary);
}
