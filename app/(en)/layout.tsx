import type { Metadata } from "next";
import RootShell from "@/app/_components/RootShell";
import { siteMetadata } from "@/app/siteMetadata";

// Root layout for the English, un-prefixed pages (/, /netflix, /blog …).
// Language pages (/fr, /nl/netflix …) have their own in app/[locale].
export const metadata: Metadata = siteMetadata;

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
