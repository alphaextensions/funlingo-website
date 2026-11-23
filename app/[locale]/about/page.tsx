import type { Metadata } from "next";
import AboutContent from "@/app/(en)/about/about-content";
import { getStrings } from "@/app/i18n/pages/about";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ path: "/about", locale, ...getStrings(locale).meta });
}

export default function LocalizedAboutContentPage() {
  return <AboutContent />;
}
