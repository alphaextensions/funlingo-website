import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("apple-tv");

export default function AppleTvPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("apple-tv")) }}
      />
      <PlatformContent data={localizePlatform("apple-tv", "en")} guides={platformGuides("apple-tv")} />
    </>
  );
}
