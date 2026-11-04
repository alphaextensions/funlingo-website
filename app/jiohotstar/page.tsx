import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("jiohotstar");

export default function JioHotstarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("jiohotstar")) }}
      />
      <PlatformContent data={localizePlatform("jiohotstar", "en")} guides={platformGuides("jiohotstar")} />
    </>
  );
}
