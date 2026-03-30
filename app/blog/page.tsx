import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Funlingo Blog - Language Learning Tips & AI Insights",
  description: "Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with Funlingo.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Funlingo Blog - Language Learning Tips & AI Insights",
    description: "Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with Funlingo.",
    url: "/blog",
  },
  twitter: {
    title: "Funlingo Blog - Language Learning Tips & AI Insights",
    description: "Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with Funlingo.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
