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

  // Conversion tracking: fire `install_click` whenever any "Add to Chrome" /
  // Chrome Web Store link is clicked, anywhere on the site. Delegated once so
  // it covers the navbar, hero, footer, blog CTAs, and the extension page
  // without instrumenting every button. (gtag uses sendBeacon, so the event
  // still sends even when the link navigates away.)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.includes("chromewebstore.google.com")) return;
      if (typeof window.gtag === "function") {
        window.gtag("event", "install_click", {
          link_url: href,
          link_text: (anchor.textContent || "").trim().slice(0, 100),
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
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
