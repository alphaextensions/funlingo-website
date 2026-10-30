"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { extractEpubMetadata } from "@/lib/read/epubMetadata";
import styles from "./upload.module.css";

export function UploadClient() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{
    title: string;
    author: string | null;
    language: string | null;
    coverSrc: string | null;
    file: File;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = async (f: File) => {
    setError(null);
    try {
      const buf = await f.arrayBuffer();
      const meta = await extractEpubMetadata(buf);
      setPreview({
        title: meta.title,
        author: meta.author,
        language: meta.language,
        coverSrc:
          meta.coverBase64 && meta.coverMime
            ? `data:${meta.coverMime};base64,${meta.coverBase64}`
            : null,
        file: f,
      });
    } catch (e) {
      setPreview(null);
      setError(e instanceof Error ? e.message : "Could not read this EPUB.");
    }
  };

  const onConfirm = async () => {
    if (!preview) return;
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", preview.file);
      if (preview.language) form.set("lang", preview.language);
      const res = await fetch("/api/read/upload", {
        method: "POST",
        headers: {
          "idempotency-key": `upload-${preview.file.name}-${preview.file.size}`,
        },
        body: form,
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? `HTTP ${res.status}`);
        return;
      }
      const data = (await res.json()) as { bookId: string };
      router.push(`/read/${encodeURIComponent(data.bookId)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.panel}>
      <input
        ref={fileRef}
        type="file"
        accept=".epub,application/epub+zip"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        }}
      />
      <div
        className={styles.drop}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) onPick(f);
        }}
      >
        <p>Drag an .epub here, or</p>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => fileRef.current?.click()}
        >
          Choose a file
        </button>
      </div>

      {preview ? (
        <div className={styles.preview}>
          <div className={styles.previewCover}>
            {preview.coverSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.coverSrc} alt="" />
            ) : (
              <div className={styles.coverFallback}>{preview.title.charAt(0)}</div>
            )}
          </div>
          <div className={styles.previewMeta}>
            <h2>{preview.title}</h2>
            <p>{preview.author ?? "Unknown author"}</p>
            <p className={styles.previewLang}>
              Language:{" "}
              <strong>{preview.language ?? "unknown"}</strong>
            </p>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={onConfirm}
              disabled={busy}
            >
              {busy ? "Uploading…" : "Add to my shelf"}
            </button>
          </div>
        </div>
      ) : null}

      {error ? <p className={styles.err}>{error}</p> : null}
    </div>
  );
}
