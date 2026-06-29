// Tiny GA4 event helper. gtag is loaded by app/analytics.tsx; this is a safe
// no-op until it's ready (and on the server). Use for engagement events —
// install conversions are already tracked globally via the delegated
// `install_click` handler in analytics.tsx.
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params || {});
  }
}
