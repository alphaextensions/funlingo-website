/**
 * BreadcrumbList structured data for a post (Home › Blog › post), rendered on
 * the server so it is in the static HTML search engines read.
 */
export default function BreadcrumbSchema({ slug, title }: { slug: string; title: string }) {
  const site = "https://getfunlingo.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${site}${slug}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
