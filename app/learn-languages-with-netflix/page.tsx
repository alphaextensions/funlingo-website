import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("netflix");

export default function NetflixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("netflix")) }}
      />
      <PlatformContent slug="netflix" guides={platformGuides("netflix")} />
    </>
  );
}
