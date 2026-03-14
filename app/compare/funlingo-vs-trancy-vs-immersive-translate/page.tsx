import type { Metadata } from "next";
import CompareContent from "./content";

export const metadata: Metadata = {
  title: "Funlingo vs Trancy vs Immersive Translate - Best Dual Subtitle Tool Comparison",
  description: "Detailed feature comparison of Funlingo, Trancy, and Immersive Translate. Discover why Funlingo is the best free alternative for dual subtitles on Netflix & YouTube.",
  keywords: "funlingo vs trancy, funlingo vs immersive translate, best dual subtitle extension, free language learning extension comparison",
  alternates: { canonical: "/compare/funlingo-vs-trancy-vs-immersive-translate/" },
  openGraph: { title: "Funlingo vs Trancy vs Immersive Translate - Best Dual Subtitle Tool Comparison", description: "Detailed feature comparison of Funlingo, Trancy, and Immersive Translate.", url: "/compare/funlingo-vs-trancy-vs-immersive-translate/" },
};

const schemaData = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Funlingo", "applicationCategory": "EducationalApplication", "operatingSystem": "Chrome", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "description": "Compare Funlingo vs Trancy vs Immersive Translate. Funlingo offers free dual subtitles and AI learning tools for Netflix and YouTube.", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.92", "ratingCount": "12" } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <CompareContent />
    </>
  );
}
