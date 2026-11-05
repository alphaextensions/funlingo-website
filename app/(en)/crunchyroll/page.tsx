import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("crunchyroll");

export default function CrunchyrollPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("crunchyroll")) }}
      />
      <PlatformContent data={localizePlatform("crunchyroll", "en")} guides={platformGuides("crunchyroll")} />
    </>
  );
}
