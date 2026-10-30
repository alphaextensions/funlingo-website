import type { Metadata } from "next";
import { posts } from "@/app/blog/posts";
import { readBlogMeta } from "@/app/blog/blogMeta";
import { platformBySlug, platformPath, fillName, PLATFORM_LABELS } from "./platforms";
import type { Guide } from "./PlatformContent";

// Server-side half of a platform page: metadata, structured data and the
// related blog guides, so all of it is in the HTML crawlers receive.
// Server components only (reads the blog folder for reading times).

const SITE = "https://getfunlingo.com";

export function platformMetadata(slug: string): Metadata {
  const p = platformBySlug(slug);
  const url = platformPath(p.slug);
  return {
    // The title already carries the brand, so skip the " | Funlingo" template.
    title: { absolute: p.title },
    description: p.desc,
    alternates: { canonical: url },
    openGraph: { images: ["/og-image.jpg"], title: p.title, description: p.desc, url },
    twitter: { images: ["/og-image.jpg"], title: p.title, description: p.desc },
  };
}

export function platformSchemas(slug: string) {
  const p = platformBySlug(slug);
  const url = `${SITE}${platformPath(p.slug)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "en",
      mainEntity: p.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Funlingo", item: SITE },
        { "@type": "ListItem", position: 2, name: fillName(PLATFORM_LABELS.forX, p.name), item: url },
      ],
    },
    // No rating here: the design asks for one only if it is the real
    // Chrome Web Store count.
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Funlingo",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Chrome",
      url,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ];
}

/** Up to three English blog posts about the platform, with reading times. */
export function platformGuides(slug: string): Guide[] {
  const p = platformBySlug(slug);
  const { read } = readBlogMeta();
  const isZh = (s: string, title: string) => /-zh$/.test(s) || /[一-鿿]/.test(title);
  return posts
    .filter((x) => p.kw.some((k) => `${x.slug} ${x.title}`.toLowerCase().includes(k)))
    .filter((x) => !isZh(x.slug, x.title))
    .slice(0, 3)
    .map((x) => ({ slug: x.slug, title: x.title, category: x.category, read: read[x.slug.split("/").pop() ?? ""] }));
}
