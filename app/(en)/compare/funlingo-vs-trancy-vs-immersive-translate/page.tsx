import type { Metadata } from "next";
import CompareContent from "./content";
import { en } from "@/app/i18n/pages/compare";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/compare/funlingo-vs-trancy-vs-immersive-translate",
  locale: "en",
  ...en.meta,
  keywords: "funlingo vs trancy, funlingo vs immersive translate, best dual subtitle extension, free language learning extension comparison",
});

const schemaData = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Funlingo", "applicationCategory": "EducationalApplication", "operatingSystem": "Chrome", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "description": "Compare Funlingo vs Trancy vs Immersive Translate. Funlingo offers free dual subtitles and AI learning tools for Netflix and YouTube.", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "12" } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <CompareContent s={en} />
    </>
  );
}
