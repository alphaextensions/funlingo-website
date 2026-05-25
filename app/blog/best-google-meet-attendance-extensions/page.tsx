import type { Metadata } from "next";
import BestGoogleMeetAttendanceExtensionsContent from "./content";

export const metadata: Metadata = {
  title: "5 Best Google Meet Attendance Extensions (2026) — Free & Paid Compared",
  description: "Which Google Meet attendance extension is actually worth it? We tested 5 — Trackr (free), Meet Attendance, Vexa, Fellow, and Read.ai. Honest comparison with pricing, features, and verdict.",
  keywords: "best google meet attendance extension, google meet attendance chrome extension, free google meet attendance extension, meet attendance vs trackr, vexa alternative, google meet attendance tools",
  alternates: { canonical: "/blog/best-google-meet-attendance-extensions" },
  openGraph: { title: "5 Best Google Meet Attendance Extensions (2026) — Free & Paid Compared", description: "Which Google Meet attendance extension is actually worth it? We tested 5 — Trackr (free), Meet Attendance, Vexa, Fellow, and Read.ai. Honest comparison.", type: "article", url: "/blog/best-google-meet-attendance-extensions" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "5 Best Google Meet Attendance Extensions (2026) — Free & Paid Compared", "description": "Honest comparison of 5 Google Meet attendance extensions with pricing, features, and verdict.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-23", "dateModified": "2026-05-23", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "What is the best free Google Meet attendance extension?", "acceptedAnswer": { "@type": "Answer", "text": "Trackr is the best free option. It auto-logs joins, leaves, and late arrivals with bot filtering and multi-format export (CSV, PDF, Excel, Sheets), and stores everything locally on your laptop. No signup, no premium tier, no paywall." } },
  { "@type": "Question", "name": "Do I need an IT admin to install a Google Meet attendance extension?", "acceptedAnswer": { "@type": "Answer", "text": "No — Chrome extensions install on your personal browser with one click. You don't need admin permissions, IT approval, or organizational procurement. This is the main advantage over Google's native Workspace attendance feature." } },
  { "@type": "Question", "name": "Which Google Meet attendance extension is HIPAA-friendly?", "acceptedAnswer": { "@type": "Answer", "text": "Trackr is the only mainstream extension that stores attendance data locally on the user's laptop, with no cloud sync and no telemetry. This makes it suitable for HIPAA-sensitive contexts like group therapy and telehealth, where cloud-based competitors require a Business Associate Agreement." } },
  { "@type": "Question", "name": "Can I use Google Meet attendance extensions on Zoom or Microsoft Teams?", "acceptedAnswer": { "@type": "Answer", "text": "Not the ones reviewed here — they're built specifically for Google Meet. For Zoom or Teams attendance, look at platform-specific tools. Trackr has Zoom and Teams support on its roadmap but neither is shipped yet." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BestGoogleMeetAttendanceExtensionsContent />
    </>
  );
}
