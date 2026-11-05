import type { Metadata } from "next";
import RootShell from "@/app/_components/RootShell";
import { siteMetadata } from "@/app/siteMetadata";

// Root layout for blog posts written in zh-TW (listed in app/i18n/page-lang.json),
// so their HTML says lang="zh-TW" instead of English.
export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="zh-TW">{children}</RootShell>;
}
