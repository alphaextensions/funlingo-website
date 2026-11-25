import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findEpisode, getCourse, loadCourses } from "@/lib/path/catalog";
import FinaleRunner from "../../../_components/FinaleRunner";

type Params = { course: string; episode: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return loadCourses().flatMap((c) =>
    c.seasons.flatMap((s) => s.episodes.map((e) => ({ course: c.id, episode: e.id }))),
  );
}

export const metadata: Metadata = {
  title: "Finale",
  robots: { index: false, follow: false },
};

export default async function FinalePage({ params }: { params: Promise<Params> }) {
  const { course: courseId, episode: episodeId } = await params;
  const course = getCourse(courseId);
  if (!course || !findEpisode(course, episodeId)) notFound();
  return <FinaleRunner course={course} episodeId={episodeId} />;
}
