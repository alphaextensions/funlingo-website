"use client";

/**
 * The "paste a YouTube link" row at the top of /library.
 *
 * - Parses the pasted URL for the 11-char video id.
 * - Navigates to `/watch/<videoId>` on success — `/watch/[sourceId]` already
 *   lazy-creates a Source row for a bare YT id, so no `/api/library/youtube/
 *   resolve` write is needed.
 * - Falls back to inline error copy if nothing parses, and auto-clears the
 *   error on the next keystroke.
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { parseYouTubeId } from "@/lib/library/youtube";
import { useT } from "@/lib/i18n/client";
import styles from "./Library.module.css";

export function YouTubePaste() {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // PM-polish fix 4: Home's "Last night" empty-state secondary CTA deep-links
  // to `/library?paste=1`. Autofocus (and scroll into view) when that query
  // is present. Runs once per paste=1 landing.
  useEffect(() => {
    if (searchParams?.get("paste") !== "1") return;
    const el = inputRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    window.requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, [searchParams]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = parseYouTubeId(value);
    if (!id) {
      setError(t("library.ytPasteError"));
      return;
    }
    setError(null);
    setLoading(true);
    // /watch/[sourceId] lazy-creates the Source row for an unknown YT id.
    router.push(`/watch/${id}` as never);
  }

  return (
    <form className={styles.pasteRow} onSubmit={submit} aria-label={t("library.ytPasteAria")}>
      <label htmlFor="yt-paste" className="hidden">
        {t("library.ytPasteAria")}
      </label>
      <input
        id="yt-paste"
        ref={inputRef}
        type="url"
        placeholder={t("library.ytPastePlaceholder")}
        inputMode="url"
        autoComplete="off"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError(null);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "yt-paste-error" : "yt-paste-hint"}
      />
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? t("library.ytPasteOpening") : t("library.ytPasteOpen")}
      </button>
      <p id="yt-paste-hint" className={styles.pasteHint}>
        {t("library.ytPasteHint")}
      </p>
      {error ? (
        <p
          id="yt-paste-error"
          className={styles.pasteHint}
          role="alert"
          style={{ color: "var(--fl-danger)" }}
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
