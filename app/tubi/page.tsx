import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("tubi");

export default function TubiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("tubi")) }}
      />
      <PlatformContent slug="tubi" guides={platformGuides("tubi")} />
    </>
  );
}
