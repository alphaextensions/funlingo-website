import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("crunchyroll");

export default function CrunchyrollPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("crunchyroll")) }}
      />
      <PlatformContent slug="crunchyroll" guides={platformGuides("crunchyroll")} />
    </>
  );
}
