import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTitleSlugs, getTitleBySlug } from "@/app/data/movies";
import { SITE_URL } from "@/lib/site";
import WatchContent from "./content";

// Static export: every /watch page is pre-rendered at build time from the movie
// catalogue. No ISR, no runtime data fetching — the data is baked in.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTitleSlugs().map((slug) => ({ slug }));
}

/** "A, B, and C" — used in the FAQ copy and its matching structured data. */
function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function buildFaqs(slug: string) {
  const t = getTitleBySlug(slug);
  if (!t) return [];
  return [
    {
      q: `Where can I watch ${t.title}?`,
      a: `${t.title} is commonly available to stream on ${formatList(
        t.platforms,
      )}. Streaming rights change over time and vary by country, so check the service available in your region.`,
    },
    {
      q: `Can I watch ${t.title} with dual subtitles?`,
      a: `Yes. Install the free Funlingo Chrome extension, open ${t.title} on ${t.platforms[0]}, and turn on dual subtitles to see ${t.language} and your own language at the same time. There are no subtitle files to download or sync.`,
    },
    {
      q: `Is ${t.title} good for learning ${t.language}?`,
      a: `${t.title} is a popular pick for ${t.language} learners. With Funlingo you can click any word for an instant translation, hear its pronunciation, and save it to review later.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTitleBySlug(slug);
  if (!t) return {};

  const title = `Watch ${t.title} with Dual Subtitles (${t.language} + Any Language)`;
  const description = `Where to stream ${t.title} and how to turn on free dual ${t.language} subtitles with Funlingo — no downloads, no SRT files. ${t.synopsis}`;
  const url = `/watch/${t.slug}`;

  return {
    title,
    description,
    keywords: `watch ${t.title} with subtitles, ${t.title} ${t.language} subtitles, ${t.title} dual subtitles, ${t.title} english subtitles, learn ${t.language} with ${t.title}`,
    alternates: { canonical: url },
    openGraph: { title, description, type: "article", url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) notFound();

  const faqs = buildFaqs(slug);

  const workSchema = {
    "@context": "https://schema.org",
    "@type": title.type === "movie" ? "Movie" : "TVSeries",
    name: title.title,
    ...(title.originalTitle ? { alternateName: title.originalTitle } : {}),
    description: title.synopsis,
    inLanguage: title.language,
    genre: title.genres,
    datePublished: String(title.year),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Watch with Subtitles", item: `${SITE_URL}/watch` },
      { "@type": "ListItem", position: 3, name: title.title, item: `${SITE_URL}/watch/${title.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WatchContent title={title} faqs={faqs} />
    </>
  );
}
