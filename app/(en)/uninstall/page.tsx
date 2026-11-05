import type { Metadata } from "next";
import UninstallContent from "./uninstall-content";

export const metadata: Metadata = {
  title: "Sorry to see you go",
  description: "Tell us why you uninstalled Funlingo. Your feedback helps us build a better language learning experience.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/uninstall",
  },
};

export default function UninstallPage() {
  return <UninstallContent />;
}
