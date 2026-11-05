import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("youtube");

export default function YouTubePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("youtube")) }}
      />
      <PlatformContent data={localizePlatform("youtube", "en")} guides={platformGuides("youtube")} />
    </>
  );
}
