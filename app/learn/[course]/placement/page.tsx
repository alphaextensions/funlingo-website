import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, loadCourses } from "@/lib/path/catalog";
import PlacementRunner from "../../_components/PlacementRunner";

type Params = { course: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return loadCourses().map((c) => ({ course: c.id }));
}

export const metadata: Metadata = {
  title: "Find your starting point",
  robots: { index: false, follow: false },
};

export default async function PlacementPage({ params }: { params: Promise<Params> }) {
  const course = getCourse((await params).course);
  if (!course) notFound();
  return <PlacementRunner course={course} />;
}
