import type { Metadata } from "next";
import AboutContent from "./about-content";
import { en } from "@/app/i18n/pages/about";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  locale: "en",
  ...en.meta,
  keywords: "about funlingo, free language learning mission, dual subtitles technology, language education, free alternative",
});

export default function AboutPage() {
  return <AboutContent />;
}
