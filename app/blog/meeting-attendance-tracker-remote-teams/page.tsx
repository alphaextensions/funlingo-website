import type { Metadata } from "next";
import MeetingAttendanceTrackerRemoteTeamsContent from "./content";

export const metadata: Metadata = {
  title: "Meeting Attendance Tracker for Remote Teams (Free, No Bot Required)",
  description: "Track Google Meet attendance for remote-team standups and syncs without a creepy bot in the call. Trackr is a free Chrome extension — no recording, no signup, data stays on your laptop, and it tracks attendance patterns across recurring meetings.",
  keywords: "meeting attendance tracker, remote team attendance, google meet attendance for teams, standup attendance tracker, team meeting attendance, attendance tracker no bot, track meeting attendance google meet, recurring meeting attendance",
  alternates: { canonical: "/blog/meeting-attendance-tracker-remote-teams" },
  openGraph: { title: "Meeting Attendance Tracker for Remote Teams (Free, No Bot Required)", description: "Track Google Meet attendance for remote teams with no bot in the call — free, private, and built for recurring standups.", type: "article", url: "/blog/meeting-attendance-tracker-remote-teams" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Meeting Attendance Tracker for Remote Teams (Free, No Bot Required)", "description": "How remote teams can track Google Meet attendance across recurring standups and syncs — no bot, no recording, free and private with Trackr.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-31", "dateModified": "2026-05-31", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "What's the best free meeting attendance tracker for remote teams?", "acceptedAnswer": { "@type": "Answer", "text": "Trackr is a free Chrome extension that logs Google Meet attendance automatically with no bot in the call and no signup. It is built for recurring meetings, so it tracks attendance rates across standups and syncs." } },
  { "@type": "Question", "name": "Can I track attendance without a bot joining the meeting?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trackr reads the Google Meet participant panel from your browser locally. Nothing joins the call, so there is no extra participant and no recording-consent prompt for the team." } },
  { "@type": "Question", "name": "Does it track attendance across recurring standups?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trackr logs each session and builds per-person attendance rates over time, flagging repeated no-shows so you can spot disengagement early." } },
  { "@type": "Question", "name": "Is the attendance data private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Data is stored locally in your browser. Trackr has no server and no accounts; nothing leaves your device unless you export it to Google Sheets or download a file." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MeetingAttendanceTrackerRemoteTeamsContent />
    </>
  );
}
