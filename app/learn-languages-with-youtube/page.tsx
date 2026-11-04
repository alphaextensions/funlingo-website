import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("youtube");

export default function YouTubePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("youtube")) }}
      />
      <PlatformContent slug="youtube" guides={platformGuides("youtube")} />
    </>
  );
}
