import type { Metadata } from "next";
import FeedbackContent from "./feedback-content";
import { en } from "@/app/i18n/pages/feedback";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/feedback",
  locale: "en",
  ...en.meta,
  keywords: "funlingo feedback, language learning feedback, feature request, bug report",
});

export default function FeedbackPage() {
  return <FeedbackContent s={en} />;
}
