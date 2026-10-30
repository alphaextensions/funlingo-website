import type { Metadata } from "next";
import { loadCourses } from "@/lib/path/catalog";
import LearnHome from "./_components/LearnHome";

// Draft content: kept out of search until native-speaker review (plan §4, Phase 1).
export const metadata: Metadata = {
  title: "Learning path",
  description: "Learn a language one short scene at a time, with real conversations and dual subtitles.",
  alternates: { canonical: "/learn" },
  robots: { index: false, follow: false },
};

export default function LearnPage() {
  return <LearnHome courses={loadCourses()} />;
}
