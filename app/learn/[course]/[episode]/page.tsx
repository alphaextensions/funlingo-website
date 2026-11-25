import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findEpisode, getCourse, loadCourses } from "@/lib/path/catalog";
import EpisodePath from "../../_components/EpisodePath";

type Params = { course: string; episode: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return loadCourses().flatMap((c) =>
    c.seasons.flatMap((s) => s.episodes.map((e) => ({ course: c.id, episode: e.id }))),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { course: courseId, episode: episodeId } = await params;
  const course = getCourse(courseId);
  const found = course && findEpisode(course, episodeId);
  return {
    title: `${found ? found.episode.title : "Episode"}`,
    robots: { index: false, follow: false },
  };
}

export default async function EpisodePage({ params }: { params: Promise<Params> }) {
  const { course: courseId, episode: episodeId } = await params;
  const course = getCourse(courseId);
  if (!course || !findEpisode(course, episodeId)) notFound();
  return <EpisodePath course={course} episodeId={episodeId} />;
}
