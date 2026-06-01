import type { Metadata } from "next";
import ExportGoogleMeetAttendanceToSheetsContent from "./content";

export const metadata: Metadata = {
  title: "How to Export Google Meet Attendance to Google Sheets (Free, 2026)",
  description: "Free Google Meet has no built-in attendance export. Here's how to get your Meet roster into Google Sheets — the manual way, the paid Workspace way, and the free one-click way with Trackr (CSV, Sheets, or PDF, no signup, no bot).",
  keywords: "export google meet attendance to google sheets, google meet attendance report, google meet attendance export, how to export google meet attendance, google meet attendance csv, meet attendance to spreadsheet, google meet attendance sheet, save google meet attendance",
  alternates: { canonical: "/blog/export-google-meet-attendance-to-sheets" },
  openGraph: { title: "How to Export Google Meet Attendance to Google Sheets (Free, 2026)", description: "Get your Google Meet attendance into a sortable Google Sheet in one click — free, no signup, with the Trackr extension.", type: "article", url: "/blog/export-google-meet-attendance-to-sheets" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Export Google Meet Attendance to Google Sheets (Free, 2026)", "description": "Every way to export Google Meet attendance to Google Sheets — manual, paid Workspace, and the free one-click Trackr method.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-31", "dateModified": "2026-05-31", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "Can you export Google Meet attendance to Google Sheets for free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Free Google Meet has no native export, but the free Trackr Chrome extension logs attendance automatically and exports it to Google Sheets, CSV, or PDF in one click — no signup required." } },
  { "@type": "Question", "name": "Does Google Meet have a built-in attendance report?", "acceptedAnswer": { "@type": "Answer", "text": "Only on paid Workspace plans (Business Standard and above, plus Education and Enterprise tiers), and only when an admin enables it. It emails a static CSV after meetings of 5 or more people; it does not write to a live sheet." } },
  { "@type": "Question", "name": "Will attendees see that I'm tracking attendance?", "acceptedAnswer": { "@type": "Answer", "text": "No. Trackr runs in your browser and reads the participant panel locally. There is no bot in the meeting and nothing visible to other participants." } },
  { "@type": "Question", "name": "Where is my Google Meet attendance data stored?", "acceptedAnswer": { "@type": "Answer", "text": "Locally, in your browser. Trackr has no server and no account system. The export only leaves your device when you choose to send it to Google Sheets or download a CSV or PDF file." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ExportGoogleMeetAttendanceToSheetsContent />
    </>
  );
}
