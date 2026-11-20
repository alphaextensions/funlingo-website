// JSON-LD FAQPage schema for /chrome-extension, built from the page strings so
// each localized route can emit it in its own language.
import type { Strings } from "./index";

export function chromeExtensionFaqSchema(s: Strings) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": s.faq.items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}
