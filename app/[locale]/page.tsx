import type { Metadata } from "next";
import HomeContent from "@/app/home-content";
import { getDictionary } from "@/app/i18n/dictionaries";
import { alternateLanguages, localizedHref, getLocaleMeta } from "@/app/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const meta = getLocaleMeta(locale);
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
      title: `${dict.hero.title} | Funlingo`,
      description,
      url: localizedHref("/", locale),
      locale: meta.hreflang.replace("-", "_"),
    },
  };
}

export default function LocaleHomePage() {
  return <HomeContent />;
}
