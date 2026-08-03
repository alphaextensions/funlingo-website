// Site-wide constants shared across the blog, support, and programmatic pages.
//
// The install URL intentionally mirrors the canonical Chrome Web Store link
// used elsewhere on the site (101+ call sites). Keeping it identical means the
// delegated `install_click` analytics handler in app/analytics.tsx tracks every
// CTA added here automatically — no per-button instrumentation required.

/** Canonical Chrome Web Store listing for the Funlingo extension. */
export const INSTALL_URL =
  "https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en";

/** Production origin, without a trailing slash. */
export const SITE_URL = "https://getfunlingo.com";
