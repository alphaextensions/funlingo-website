import type { Metadata } from "next";
import RoadmapContent from "./roadmap-content";

export const metadata: Metadata = {
  title: "Funlingo Product Roadmap - Future of Language Learning",
  description: "Explore the future of Funlingo. See our planned features including mobile apps, more streaming platforms support, and advanced learning tools.",
  keywords: "funlingo roadmap, language learning features, future updates, language tools development",
  alternates: {
    canonical: "/roadmap",
  },
  openGraph: {
    title: "Funlingo Product Roadmap - Future of Language Learning",
    description: "Explore the future of Funlingo. See our planned features including mobile apps, more streaming platforms support, and advanced learning tools.",
    url: "/roadmap",
  },
  twitter: {
    title: "Funlingo Product Roadmap - Future of Language Learning",
    description: "Explore the future of Funlingo. See our planned features including mobile apps, more streaming platforms support, and advanced learning tools.",
  },
};

export default function RoadmapPage() {
  return <RoadmapContent />;
}
