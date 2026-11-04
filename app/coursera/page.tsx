import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("coursera");

export default function CourseraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("coursera")) }}
      />
      <PlatformContent data={localizePlatform("coursera", "en")} guides={platformGuides("coursera")} />
    </>
  );
}
