import type { Metadata } from "next";
import RoadmapContent from "@/app/(en)/roadmap/roadmap-content";
import { getStrings } from "@/app/i18n/pages/roadmap";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ path: "/roadmap", locale, ...getStrings(locale).meta });
}

export default function LocalizedRoadmapContentPage() {
  return <RoadmapContent />;
}
