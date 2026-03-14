import type { Metadata } from "next";
import SupportContent from "./support-content";

export const metadata: Metadata = {
  title: "Get Help & Support",
  description: "Get help and support from the Funlingo team. Report issues, request features, or ask questions about our language learning extension.",
  keywords: "funlingo support, language learning help, technical support, feature request, bug report",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "Get Help & Support",
    description: "Get help and support from the Funlingo team. Report issues, request features, or ask questions about our language learning extension.",
    url: "/support",
  },
  twitter: {
    title: "Get Help & Support",
    description: "Get help and support from the Funlingo team. Report issues, request features, or ask questions about our language learning extension.",
  },
};

export default function SupportPage() {
  return <SupportContent />;
}
