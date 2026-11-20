import type { Metadata } from "next";
import SupportContent from "@/app/(en)/support/support-content";
import { getStrings } from "@/app/i18n/pages/support";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ path: "/support", locale, ...getStrings(locale).meta });
}

export default async function LocalizedSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = getStrings(locale);
  return <SupportContent s={s} />;
}
