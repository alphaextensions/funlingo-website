import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";
import { en } from "@/app/i18n/pages/privacy";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/privacy-policy",
  locale: "en",
  ...en.meta,
  keywords: "funlingo privacy policy, data privacy, chrome extension privacy, language learning privacy",
});

export default function PrivacyPolicyPage() {
  return <PrivacyContent s={en} />;
}
