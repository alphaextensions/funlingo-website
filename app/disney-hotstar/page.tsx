import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("disney-hotstar");

export default function DisneyHotstarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("disney-hotstar")) }}
      />
      <PlatformContent data={localizePlatform("disney-hotstar", "en")} guides={platformGuides("disney-hotstar")} />
    </>
  );
}
