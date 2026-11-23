import type { Metadata } from "next";
import CompareContent from "@/app/(en)/compare/funlingo-vs-trancy-vs-immersive-translate/content";
import { getStrings } from "@/app/i18n/pages/compare";
import { pageMetadata } from "@/app/i18n/page-metadata";

const PATH = "/compare/funlingo-vs-trancy-vs-immersive-translate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ path: PATH, locale, ...getStrings(locale).meta });
}

export default async function LocalizedComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = getStrings(locale);
  return <CompareContent s={s} />;
}
