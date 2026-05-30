import crypto from "node:crypto";

// Vercel serverless function. Lives at /api/ at the repo root rather than
// under app/api/ because next.config.ts uses `output: "export"` (static
// site), which strips Next.js route handlers at build time. Vercel still
// deploys files in /api/ as serverless functions alongside the static site.

// Hardcoded because the project owner has no Vercel dashboard access to set
// env vars. This file runs server-side only — the secret is never shipped
// to the browser. Rotate via a code change + redeploy.
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzMZtMZ95OBEvsG0EFD1Zt9fgXcwrVde5jSWjel_DNI2DCIkdYUC_gwNDDDXtTqzlKv/exec";
const SECRET_KEY = "FUNLINGO_SUPER_SECRET_2026";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  let params;
  try {
    params =
      req.body && typeof req.body === "object"
        ? req.body
        : JSON.parse(req.body || "{}");
  } catch {
    return res.status(400).json({ ok: false, error: "invalid_body" });
  }

  if (!params || !params.uid) {
    return res.status(400).json({ ok: false, error: "missing_uid" });
  }

  const payload = {
    eventType: "uninstall_redirect",
    timestamp: new Date().toISOString(),
    ...params,
  };

  const message = JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(message)
    .digest("base64");

  // Fire-and-forget. The browser tab is already gone (sendBeacon) — we
  // don't want a slow Apps Script to hold the function open.
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload, signature }),
  }).catch(() => {
    /* upstream logging is best-effort */
  });

  return res.status(200).json({ ok: true });
}
