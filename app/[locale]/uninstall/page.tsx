import type { Metadata } from "next";
import UninstallContent from "@/app/(en)/uninstall/uninstall-content";
import { getStrings } from "@/app/i18n/pages/uninstall";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ path: "/uninstall", locale, ...getStrings(locale).meta, noindex: true });
}

export default async function LocalizedUninstallPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = getStrings(locale);
  return <UninstallContent s={s} />;
}
