import type { Metadata } from "next";
import AttendanceTrackerForOnlineClassesContent from "./content";

export const metadata: Metadata = {
  title: "Best Attendance Tracker for Online Classes (2026) — Free, No Signup",
  description: "Online classes need a different kind of attendance tracker. Compare the best free + paid options for instructors running classes on Google Meet, Zoom, and Teams — with side-by-side features, pricing, and the one extension that actually works for free.",
  keywords: "attendance tracker for online classes, online class attendance tracker, attendance tracker online learning, google meet attendance online classes, free attendance tracker for online teaching, cohort course attendance, bootcamp attendance tracker, attendance tracker for instructors",
  alternates: { canonical: "/blog/attendance-tracker-for-online-classes" },
  openGraph: { title: "Best Attendance Tracker for Online Classes (2026) — Free, No Signup", description: "Online classes need a different kind of attendance tracker. Compare the best free + paid options for instructors running classes on Google Meet, Zoom, and Teams.", type: "article", url: "/blog/attendance-tracker-for-online-classes" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Best Attendance Tracker for Online Classes (2026) — Free, No Signup", "description": "Online classes need a different kind of attendance tracker. Compare the best free and paid options for instructors running classes on Google Meet, Zoom, and Teams.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-26", "dateModified": "2026-05-26", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "What is the best free attendance tracker for online classes?", "acceptedAnswer": { "@type": "Answer", "text": "Trackr is the best free option. It auto-logs every join, leave, and late arrival in Google Meet sessions, filters out transcription bots, and exports your roster to CSV, PDF, Excel, or Google Sheets. There's no signup, no premium tier, and the data stays on your laptop — making it safe for FERPA-sensitive online class contexts." } },
  { "@type": "Question", "name": "Does Google Classroom track attendance for live sessions?", "acceptedAnswer": { "@type": "Answer", "text": "Google Classroom itself does not track live-session attendance. It tracks assignment submissions and class engagement, but for live Google Meet sessions you need either paid Workspace Education Plus (which sends an attendance email after each meeting) or a free Chrome extension like Trackr that logs participants automatically." } },
  { "@type": "Question", "name": "How do I track attendance in a cohort-based course?", "acceptedAnswer": { "@type": "Answer", "text": "For cohort-based courses on Google Meet, install Trackr. It auto-logs every live session, surfaces cross-session patterns (e.g., students who repeatedly miss sessions), and exports cleanly to Google Sheets so you can tie attendance to certificate eligibility. Free forever, no signup, no IT involvement." } },
  { "@type": "Question", "name": "Can I track attendance in online classes without my students knowing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Trackr runs in your browser only and does not add a visible bot to the meeting. From the student side, there's no indicator that attendance is being logged. Whether to disclose this in your syllabus is a teaching judgment call, not a technical one." } },
  { "@type": "Question", "name": "Which is better for online classes — LMS attendance or a Chrome extension?", "acceptedAnswer": { "@type": "Answer", "text": "LMS attendance (Canvas, Blackboard, Moodle) tracks engagement with course materials — submissions, quiz attempts, video views. It does NOT track who attended your live Meet/Zoom session unless you wire up a separate integration. A Chrome extension like Trackr covers live-session attendance specifically, and you can paste the export into your LMS gradebook for participation grades." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AttendanceTrackerForOnlineClassesContent />
    </>
  );
}
