import type { Metadata } from "next";
import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";
import { PLATFORM_LINKS } from "@/sections/platform/platformLinks";

// /fr/netflix, /ja/crunchyroll … — every platform page in every site language.
// The [locale] layout supplies the locales; English lives at /netflix etc.
export function generateStaticParams() {
  return PLATFORM_LINKS.map((p) => ({ platform: p.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ locale: string; platform: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, platform } = await params;
  return platformMetadata(platform, locale);
}

export default async function LocalePlatformPage({ params }: Params) {
  const { locale, platform } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas(platform, locale)) }}
      />
      <PlatformContent data={localizePlatform(platform, locale)} guides={platformGuides(platform)} />
    </>
  );
}
