"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// GA4 measurement ID for getfunlingo.com.
export const GA_MEASUREMENT_ID = "G-KPM2YQPLNQ";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __gaInitialPageViewSent?: boolean;
  }
}

/**
 * Loads gtag.js and reports a page_view on every client-side route change.
 *
 * Next.js App Router does NOT fire a fresh gtag page_view on soft (SPA)
 * navigations, so we send one manually when the pathname changes. The very
 * first page_view is handled by gtag's own `config` call on load, so we skip
 * it here to avoid a double count.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    // Skip the initial load — gtag config already sent that page_view.
    if (window.__gaInitialPageViewSent) {
      window.gtag("event", "page_view", {
        page_path: pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    } else {
      window.__gaInitialPageViewSent = true;
    }
  }, [pathname]);

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
