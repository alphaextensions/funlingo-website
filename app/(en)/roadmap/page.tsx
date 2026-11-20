import type { Metadata } from "next";
import RoadmapContent from "./roadmap-content";
import { en } from "@/app/i18n/pages/roadmap";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/roadmap",
  locale: "en",
  ...en.meta,
  keywords: "funlingo roadmap, language learning features, future updates, language tools development",
});

export default function RoadmapPage() {
  return <RoadmapContent />;
}
