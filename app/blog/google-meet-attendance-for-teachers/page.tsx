import type { Metadata } from "next";
import GoogleMeetAttendanceForTeachersContent from "./content";

export const metadata: Metadata = {
  title: "Google Meet Attendance for Teachers: A No-Nonsense Guide (Free)",
  description: "A practical guide to taking attendance on Google Meet without disrupting class. Built for K-12 and higher-ed teachers — free Chrome extension, no IT ticket, no signup, 30-second setup.",
  keywords: "google meet attendance for teachers, attendance tracker for online classes, how to take attendance in google meet, google meet for teachers, free attendance tracker teachers, take attendance virtual class",
  alternates: { canonical: "/blog/google-meet-attendance-for-teachers" },
  openGraph: { title: "Google Meet Attendance for Teachers: A No-Nonsense Guide (Free)", description: "A practical guide to taking attendance on Google Meet without disrupting class. Built for K-12 and higher-ed teachers.", type: "article", url: "/blog/google-meet-attendance-for-teachers" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Google Meet Attendance for Teachers: A No-Nonsense Guide", "description": "A practical guide for K-12 and higher-ed teachers to track attendance on Google Meet without disrupting class.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-23", "dateModified": "2026-05-23", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "How do teachers take attendance on Google Meet?", "acceptedAnswer": { "@type": "Answer", "text": "The fastest way is a free Chrome extension like Trackr that auto-logs joins, leaves, and late arrivals. It runs in the background — no clicks during class, no roll-call interruption. Teachers click the extension icon after class to see the roster and export it to a grade book or parent-conference report." } },
  { "@type": "Question", "name": "Do I need my school's IT admin to enable attendance tracking?", "acceptedAnswer": { "@type": "Answer", "text": "Only if you want to use Google's native paid feature (Workspace Education Plus or Standard). A Chrome extension like Trackr installs on your personal browser with one click — no IT ticket, no admin permissions, no purchasing process." } },
  { "@type": "Question", "name": "Can students tell that I'm tracking their attendance?", "acceptedAnswer": { "@type": "Answer", "text": "No. Trackr runs entirely in your browser and doesn't add a bot to the meeting. Students see the standard Google Meet interface — no visible indicator that attendance is being logged." } },
  { "@type": "Question", "name": "Is Google Meet attendance data FERPA-compliant?", "acceptedAnswer": { "@type": "Answer", "text": "When you use Google's native Workspace Education attendance, the data is governed by your school's Workspace agreement — FERPA-friendly. When you use Trackr, the data stays on your laptop only with no cloud sync, which is also FERPA-friendly because there's no third-party data sharing involved." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GoogleMeetAttendanceForTeachersContent />
    </>
  );
}
