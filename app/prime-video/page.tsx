import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("prime-video");

export default function PrimeVideoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("prime-video")) }}
      />
      <PlatformContent slug="prime-video" guides={platformGuides("prime-video")} />
    </>
  );
}
