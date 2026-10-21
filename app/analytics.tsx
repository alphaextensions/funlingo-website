"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// GA4 measurement ID for getfunlingo.com.
export const GA_MEASUREMENT_ID = "G-KPM2YQPLNQ";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Session key holding how the visitor first arrived (see readFirstTouch).
const FIRST_TOUCH_KEY = "fl_first_touch";

type Touch = { source: string; medium: string; campaign: string };

/** `/blog/foo` -> `blog-foo`, `/` -> `home`. Used for utm_campaign/utm_content. */
function pageSlug(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  return trimmed ? trimmed.replace(/\//g, "-") : "home";
}

/**
 * The channel that brought the visitor here, remembered for the whole session.
 *
 * Google Ads tags the landing URL, but SPA navigation drops that query string —
 * so without this, someone who arrives from a paid ad and installs two pages
 * later gets counted as organic, which is exactly the paid-vs-organic split we
 * are trying to measure. Returns null when the visit was untagged.
 */
function readFirstTouch(): Touch | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    if (source) {
      const touch: Touch = {
        source,
        medium: params.get("utm_medium") || "referral",
        campaign: params.get("utm_campaign") || "",
      };
      sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
      return touch;
    }
    const stored = sessionStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? (JSON.parse(stored) as Touch) : null;
  } catch {
    return null; // private mode / storage blocked — fall back to organic
  }
}

/**
 * Loads gtag.js and reports a page_view on every client-side route change.
 *
 * Next.js App Router does NOT fire a fresh gtag page_view on soft (SPA)
 * navigations, so we send one manually when the pathname changes. The very
 * first page_view is handled by gtag's own `config` call on load, so we skip
 * it by tracking the previous pathname (initialized to the first one) — this
 * is independent of when gtag.js finishes loading (afterInteractive), so no
 * navigation's page_view is ever dropped.
 */
export default function Analytics() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Initial render: gtag's `config` call already counted this page_view.
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    // Real SPA navigation: send a manual page_view (gtag is loaded by now).
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);

  // Conversion tracking: whenever any "Add to Chrome" / Chrome Web Store link
  // is clicked, anywhere on the site, UTM-tag the outbound URL and report the
  // intent. Delegated once so it covers the navbar, hero, footer, blog CTAs,
  // and the extension page without instrumenting every button — which also
  // means the shared navbar/footer get the *current* page's slug rather than a
  // single hardcoded one. (gtag uses sendBeacon, so the event still sends even
  // as the link navigates away.)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.includes("chromewebstore.google.com")) return;

      const slug = pageSlug(window.location.pathname);
      const touch = readFirstTouch();
      const utm = {
        utm_source: touch?.source || "funlingo-web",
        utm_medium: touch?.medium || "organic",
        utm_campaign: touch?.campaign || slug,
        utm_content: slug,
      };

      // Rewrite the href in place so the Chrome Web Store sees the tags. Skip
      // any link an author tagged deliberately rather than clobbering it.
      let taggedUrl = href;
      try {
        const url = new URL(href, window.location.origin);
        if (!url.searchParams.has("utm_source")) {
          for (const [k, v] of Object.entries(utm)) url.searchParams.set(k, v);
          taggedUrl = url.toString();
          anchor.href = taggedUrl;
        }
      } catch {
        // Malformed href — still report the click, just untagged.
      }

      if (typeof window.gtag === "function") {
        const link_text = (anchor.textContent || "").trim().slice(0, 100);
        // Canonical event per the SEO brief: our proxy for an actual install,
        // since the Chrome Web Store exposes no install callback.
        window.gtag("event", "chrome_install_intent", {
          ...utm,
          link_url: taggedUrl,
          link_text,
          page_path: window.location.pathname,
        });
        // Legacy name, kept so existing GA reports and audiences built on it
        // don't go flat the day this ships. Safe to retire once they migrate.
        window.gtag("event", "install_click", {
          link_url: taggedUrl,
          link_text,
          page_path: window.location.pathname,
        });
      }
    };
    // `auxclick` covers middle-click "open in new tab", which never fires `click`.
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
