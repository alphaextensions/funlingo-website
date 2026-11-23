import type { Metadata } from "next";
import UninstallContent from "./uninstall-content";
import { en } from "@/app/i18n/pages/uninstall";
import { pageMetadata } from "@/app/i18n/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/uninstall",
  locale: "en",
  ...en.meta,
  noindex: true,
});

export default function UninstallPage() {
  return <UninstallContent s={en} />;
}
