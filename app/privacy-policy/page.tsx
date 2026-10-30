import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Funlingo Privacy Policy. Learn how we handle your information when you use the Funlingo Chrome Extension and our website.",
  keywords: "funlingo privacy policy, data privacy, chrome extension privacy, language learning privacy",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Privacy Policy",
    description: "Funlingo Privacy Policy. Learn how we handle your information when you use the Funlingo Chrome Extension and our website.",
    url: "/privacy-policy",
  },
  twitter: {
    images: ["/og-image.jpg"],
    title: "Privacy Policy",
    description: "Funlingo Privacy Policy. Learn how we handle your information when you use the Funlingo Chrome Extension and our website.",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
