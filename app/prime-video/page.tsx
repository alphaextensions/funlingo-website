import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("prime-video");

export default function PrimeVideoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("prime-video")) }}
      />
      <PlatformContent data={localizePlatform("prime-video", "en")} guides={platformGuides("prime-video")} />
    </>
  );
}
