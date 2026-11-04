import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";

export const metadata = platformMetadata("udemy");

export default function UdemyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("udemy")) }}
      />
      <PlatformContent slug="udemy" guides={platformGuides("udemy")} />
    </>
  );
}
