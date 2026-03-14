import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About Funlingo - Our Mission in Free Language Learning",
  description: "Learn about Funlingo's mission to provide a free dual subtitle alternative for language learners. We make immersive learning accessible to everyone.",
  keywords: "about funlingo, free language learning mission, dual subtitles technology, language education, free alternative",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Funlingo - Our Mission in Free Language Learning",
    description: "Learn about Funlingo's mission to provide a free dual subtitle alternative for language learners. We make immersive learning accessible to everyone.",
    url: "/about",
  },
  twitter: {
    title: "About Funlingo - Our Mission in Free Language Learning",
    description: "Learn about Funlingo's mission to provide a free dual subtitle alternative for language learners. We make immersive learning accessible to everyone.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
