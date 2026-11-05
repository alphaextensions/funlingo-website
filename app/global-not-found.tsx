import type { Metadata } from "next";
import RootShell from "@/app/_components/RootShell";
import NotFoundContent from "@/app/_components/NotFoundContent";

// 404 for URLs that match no route. With two root layouts ((en) and
// [locale]) there's no single layout to render it in, so it brings its own.
export const metadata: Metadata = {
  title: "Page not found | Funlingo",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundContent />
    </RootShell>
  );
}
