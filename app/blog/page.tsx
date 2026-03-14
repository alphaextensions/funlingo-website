import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "FunLingo Blog - Language Learning Tips & AI Insights",
  description: "Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with FunLingo.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "FunLingo Blog - Language Learning Tips & AI Insights",
    description: "Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with FunLingo.",
    url: "/blog",
  },
  twitter: {
    title: "FunLingo Blog - Language Learning Tips & AI Insights",
    description: "Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with FunLingo.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
