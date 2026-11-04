import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("apple-tv");

export default function AppleTvPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("apple-tv")) }}
      />
      <PlatformContent slug="apple-tv" guides={platformGuides("apple-tv")} />
    </>
  );
}
