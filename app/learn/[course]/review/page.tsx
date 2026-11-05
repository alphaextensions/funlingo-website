import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, loadCourses } from "@/lib/path/catalog";
import ReviewRunner from "../../_components/ReviewRunner";

type Params = { course: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return loadCourses().map((c) => ({ course: c.id }));
}

export const metadata: Metadata = {
  title: "Review deck",
  robots: { index: false, follow: false },
};

export default async function ReviewPage({ params }: { params: Promise<Params> }) {
  const course = getCourse((await params).course);
  if (!course) notFound();
  return <ReviewRunner course={course} />;
}
