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
  // This page sits in the same segment as its root layout, so that layout's
  // "%s | Funlingo" template doesn't reach it: add the brand here.
  const title = dict.hero.title;
  const description = dict.meta.description;
  return {
    title: { absolute: `${title} | Funlingo` },
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
