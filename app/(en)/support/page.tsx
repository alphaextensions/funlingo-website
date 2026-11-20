import type { Metadata } from "next";
import SupportContent from "./support-content";
import { en } from "@/app/i18n/pages/support";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/support",
  locale: "en",
  ...en.meta,
  keywords: "funlingo support, language learning help, technical support, feature request, bug report",
});

export default function SupportPage() {
  return <SupportContent s={en} />;
}
