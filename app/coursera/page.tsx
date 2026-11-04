import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("coursera");

export default function CourseraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("coursera")) }}
      />
      <PlatformContent slug="coursera" guides={platformGuides("coursera")} />
    </>
  );
}
