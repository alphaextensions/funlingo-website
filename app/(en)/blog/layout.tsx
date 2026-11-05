import TableOfContents from "./_components/TableOfContents";
import ReadingProgress from "./_components/ReadingProgress";
import ArticleEnd from "./_components/ArticleEnd";
import ArticleCover from "./_components/ArticleCover";
import { readBlogMeta } from "./blogMeta";

// Wraps the blog index and every post. Each enhancement renders itself only
// when an article with content is present, so they are no-ops on the index.
// Per the redesign, posts carry no share buttons: the Chrome Store buttons are
// the only calls to action.
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const meta = readBlogMeta();
  return (
    <>
      <ReadingProgress />
      {children}
      <ArticleCover photos={meta.photos} />
      <TableOfContents />
      <ArticleEnd read={meta.read} />
    </>
  );
}
