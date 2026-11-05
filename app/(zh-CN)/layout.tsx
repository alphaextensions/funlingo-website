import type { Metadata } from "next";
import RootShell from "@/app/_components/RootShell";
import { siteMetadata } from "@/app/siteMetadata";

// Root layout for blog posts written in zh-CN (listed in app/i18n/page-lang.json),
// so their HTML says lang="zh-CN" instead of English.
export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="zh-CN">{children}</RootShell>;
}
