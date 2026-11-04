import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("disney-hotstar");

export default function DisneyHotstarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("disney-hotstar")) }}
      />
      <PlatformContent slug="disney-hotstar" guides={platformGuides("disney-hotstar")} />
    </>
  );
}
