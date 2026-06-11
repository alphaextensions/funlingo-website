import TableOfContents from "./_components/TableOfContents";
import ReadingProgress from "./_components/ReadingProgress";
import ArticleEnd from "./_components/ArticleEnd";
import { ShareRail } from "./_components/share";

// Wraps the blog index and every post. Each enhancement renders itself only
// when an article with content is present, so they are no-ops on the index.
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReadingProgress />
      {children}
      <TableOfContents />
      <ShareRail />
      <ArticleEnd />
    </>
  );
}
