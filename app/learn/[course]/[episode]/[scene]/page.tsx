import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findEpisode, getCourse, loadCourses } from "@/lib/path/catalog";
import SceneRunner from "../../../_components/SceneRunner";

type Params = { course: string; episode: string; scene: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return loadCourses().flatMap((c) =>
    c.seasons.flatMap((s) =>
      s.episodes.flatMap((e) => e.scenes.map((sc) => ({ course: c.id, episode: e.id, scene: sc.id }))),
    ),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { course: courseId, episode: episodeId, scene: sceneId } = await params;
  const course = getCourse(courseId);
  const scene = course && findEpisode(course, episodeId)?.episode.scenes.find((s) => s.id === sceneId);
  return {
    title: `${scene ? scene.title : "Scene"}`,
    robots: { index: false, follow: false },
  };
}

export default async function ScenePage({ params }: { params: Promise<Params> }) {
  const { course: courseId, episode: episodeId, scene: sceneId } = await params;
  const course = getCourse(courseId);
  const found = course && findEpisode(course, episodeId);
  if (!course || !found || !found.episode.scenes.some((s) => s.id === sceneId)) notFound();
  return <SceneRunner course={course} episodeId={episodeId} sceneId={sceneId} />;
}
