import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("netflix");

export default function NetflixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("netflix")) }}
      />
      <PlatformContent data={localizePlatform("netflix", "en")} guides={platformGuides("netflix")} />
    </>
  );
}
