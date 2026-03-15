import type { Metadata } from "next";
import FeedbackContent from "./feedback-content";

export const metadata: Metadata = {
  title: "Feedback - Share Your Thoughts",
  description: "Share your feedback with the Funlingo team. Help us build a better language learning experience for everyone.",
  keywords: "funlingo feedback, language learning feedback, feature request, bug report",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Feedback - Share Your Thoughts",
    description: "Share your feedback with the Funlingo team. Help us build a better language learning experience for everyone.",
    url: "/feedback",
  },
  twitter: {
    title: "Feedback - Share Your Thoughts",
    description: "Share your feedback with the Funlingo team. Help us build a better language learning experience for everyone.",
  },
};

export default function FeedbackPage() {
  return <FeedbackContent />;
}
