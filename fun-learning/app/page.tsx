/**
 * Home — the extension's view-landing, now at `/`.
 *
 * Wave 8 parity rebuild: the invented autobiographical dashboard that
 * used to live here is gone. The web app's front door now IS the
 * extension's five-tile experience grid, so a learner opening the
 * extension and clicking any extension-to-web handoff lands on the
 * same surface they already recognise.
 *
 * The old dashboard surfaces didn't carry roadmap-critical state that
 * other routes lack — see `docs/wave8-parity-audit.md` for the full
 * before/after, including which route now owns each former surface
 * (library / progress / review / words).
 */

import { redirect } from "next/navigation";
import { needsWelcome } from "@/server/onboarding";
import { LearnLanding } from "./learn/LearnLanding";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Wave 18 — first visit goes through `/welcome` once (extension parity:
  // the first-run onboarding modal). Only `/` gates; deep links never do.
  if (await needsWelcome()) redirect("/welcome");
  return <LearnLanding />;
}
