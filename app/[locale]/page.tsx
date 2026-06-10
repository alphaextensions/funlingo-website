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
  const title = `Funlingo — ${dict.hero.title}`;
  return {
    title,
    description: dict.hero.subtitle,
    alternates: {
      canonical: localizedHref("/", locale),
      languages: alternateLanguages("/"),
    },
    openGraph: {
      title,
      description: dict.hero.subtitle,
      url: localizedHref("/", locale),
      locale: meta.hreflang.replace("-", "_"),
    },
  };
}

export default function LocaleHomePage() {
  return <HomeContent />;
}
