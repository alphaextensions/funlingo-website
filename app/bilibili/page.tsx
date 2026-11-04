import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("bilibili");

export default function BilibiliPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("bilibili")) }}
      />
      <PlatformContent slug="bilibili" guides={platformGuides("bilibili")} />
    </>
  );
}
