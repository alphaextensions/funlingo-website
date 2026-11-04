import PlatformContent from "@/sections/platform/PlatformContent";
import { platformMetadata, platformSchemas, platformGuides } from "@/sections/platform/platformPage";
import { localizePlatform } from "@/sections/platform/platformLocale";

export const metadata = platformMetadata("bilibili");

export default function BilibiliPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchemas("bilibili")) }}
      />
      <PlatformContent data={localizePlatform("bilibili", "en")} guides={platformGuides("bilibili")} />
    </>
  );
}
