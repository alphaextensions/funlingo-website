import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, loadCourses } from "@/lib/path/catalog";
import { langName } from "@/lib/path/langs";
import CourseMap from "../_components/CourseMap";

type Params = { course: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return loadCourses().map((c) => ({ course: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const course = getCourse((await params).course);
  const name = course ? langName(course.target) : "Course";
  return {
    title: `Learn ${name}: season guide`,
    description: `Every episode of the ${name} learning path, with your progress.`,
    robots: { index: false, follow: false },
  };
}

export default async function CoursePage({ params }: { params: Promise<Params> }) {
  const course = getCourse((await params).course);
  if (!course) notFound();
  return <CourseMap course={course} />;
}
