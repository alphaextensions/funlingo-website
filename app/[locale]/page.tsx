import type { Metadata } from "next";
import HomeContent from "@/app/home-content";
import { getDictionary } from "@/app/i18n/dictionaries";
import { alternateLanguages, localizedHref, ogLocale } from "@/app/i18n/config";
import { localizedSchema } from "@/app/softwareSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  // Title: just the (translated) hero title — the root layout template appends
  // " | Funlingo", so we avoid duplicating the brand here.
  const title = dict.hero.title;
  const description = dict.meta.description;
  return {
    title,
    description,
    alternates: {
      canonical: localizedHref("/", locale),
      languages: alternateLanguages("/"),
    },
    openGraph: {
      images: ["/og-image.jpg"],
      title: `${dict.hero.title} | Funlingo`,
      description,
      url: localizedHref("/", locale),
      locale: ogLocale(locale),
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const schema = localizedSchema(locale, getDictionary(locale).meta.description);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeContent />
    </>
  );
}
