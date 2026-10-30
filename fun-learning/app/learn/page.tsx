/**
 * /learn — extension-parity landing. Thin re-export of `LearnLanding` so
 * `/` and `/learn` render the same five-tile experience grid (per
 * Wave 8 parity audit — the extension's view-landing IS the home page,
 * not a separate route). A long-time extension user lands here from any
 * extension-to-web handoff and sees exactly the surface they already
 * know.
 */

import { LearnLanding } from "./LearnLanding";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fun Learning" };

export default async function LearnPage() {
  return <LearnLanding />;
}
