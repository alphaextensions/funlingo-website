"use client";

import { useState } from "react";
import { CtaAction } from "@/components/CtaButton";

/**
 * Client-side CTA that fires `/api/packs/[packId]/import`. The route is
 * idempotent (idempotency-key header) and now really creates Sentence rows,
 * so we surface the exact imported-count the server returns.
 */
export function AddPackToReviewButton({ packId }: { packId: string }) {
  const [state, setState] = useState<"idle" | "pending" | "ok" | "already" | "error">("idle");
  const [message, setMessage] = useState("");

  const onClick = async () => {
    if (state === "pending") return;
    setState("pending");
    setMessage("Adding ten sentences…");
    try {
      const res = await fetch(`/api/packs/${encodeURIComponent(packId)}/import`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // Fresh key per click intent so a retry after a transient error can
          // actually re-import, and a within-session double-click is dedupe'd
          // by the self-dedupe lookup on the server (lists contains pack:…).
          "idempotency-key": `pack-import-${packId}-${Date.now()}`,
        },
        body: JSON.stringify({ count: 10 }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        message?: string;
        imported?: number;
      };
      if (res.ok) {
        if ((body.imported ?? 0) === 0) {
          setState("already");
          setMessage(body.message ?? "You already have these sentences in Review.");
        } else {
          setState("ok");
          setMessage(body.message ?? `Added ${body.imported} to Review.`);
        }
      } else {
        setState("error");
        setMessage(body.message ?? "Couldn’t add the pack. Try again in a moment.");
      }
    } catch {
      setState("error");
      setMessage("Couldn’t add the pack. Try again in a moment.");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <CtaAction onClick={onClick} aria-disabled={state === "pending"}>
        {state === "pending" ? "Adding…" : "Add 10 to Review"}
      </CtaAction>
      <span
        aria-live="polite"
        style={{
          fontSize: 12,
          color: state === "error" ? "var(--fl-danger)" : "var(--fl-text-3)",
          minHeight: "1em",
        }}
      >
        {message}
      </span>
    </div>
  );
}
