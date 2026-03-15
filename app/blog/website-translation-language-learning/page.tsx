import type { Metadata } from "next";
import WebsiteTranslationContent from "./content";

export const metadata: Metadata = {
  title: "AI Website Translation for Language Learning | FunLingo Bilingual Browsing",
  description: "Discover how FunLingo's website translation extension helps you learn languages while browsing. Read websites in two languages, understand words in context, and improve vocabulary naturally.",
  keywords: "website translation for language learning, bilingual website reading, FunLingo, AI language learning extension",
  alternates: { canonical: "/blog/website-translation-language-learning" },
  openGraph: { title: "AI Website Translation for Language Learning", description: "Discover how FunLingo's website translation extension helps you learn languages while browsing.", type: "article", url: "/blog/website-translation-language-learning" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Website Translation for Language Learning: Read Any Website in Two Languages with FunLingo", "description": "Discover how FunLingo's website translation extension helps you learn languages while browsing.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-07", "dateModified": "2026-03-07", "image": "https://getfunlingo.com/og-image.jpg" };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <WebsiteTranslationContent />
    </>
  );
}
