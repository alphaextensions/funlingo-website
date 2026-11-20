import type { Metadata } from "next";
import ChromeExtensionContent from "@/app/(en)/chrome-extension/content";
import { getStrings } from "@/app/i18n/pages/chromeExtension";
import { chromeExtensionFaqSchema } from "@/app/i18n/pages/chromeExtension/schema";
import { pageMetadata } from "@/app/i18n/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    path: "/chrome-extension",
    locale,
    ...getStrings(locale).meta,
  });
}

export default async function LocalizedChromeExtensionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = getStrings(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(chromeExtensionFaqSchema(s)),
        }}
      />
      <ChromeExtensionContent s={s} />
    </>
  );
}
