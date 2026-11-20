import type { Metadata } from "next";
import FeedbackContent from "@/app/(en)/feedback/feedback-content";
import { getStrings } from "@/app/i18n/pages/feedback";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ path: "/feedback", locale, ...getStrings(locale).meta });
}

export default async function LocalizedFeedbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = getStrings(locale);
  return <FeedbackContent s={s} />;
}
