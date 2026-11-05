import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("udemy");

export default function UdemyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("udemy")) }}
      />
      <PlatformContent data={localizePlatform("udemy", "en")} guides={platformGuides("udemy")} />
    </>
  );
}
