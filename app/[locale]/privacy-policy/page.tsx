import type { Metadata } from "next";
import PrivacyContent from "@/app/(en)/privacy-policy/privacy-content";
import { getStrings } from "@/app/i18n/pages/privacy";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    path: "/privacy-policy",
    locale,
    ...getStrings(locale).meta,
  });
}

export default async function LocalizedPrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = getStrings(locale);
  return <PrivacyContent s={s} />;
}
