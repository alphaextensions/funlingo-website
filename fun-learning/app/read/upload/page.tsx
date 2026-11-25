import { UploadClient } from "./UploadClient";
import styles from "./upload.module.css";

export const metadata = {
  title: "Upload a book — Fun Learning",
};

export default function UploadPage() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Read / Upload</span>
        <h1 className={styles.title}>Bring your own book.</h1>
        <p className={styles.lede}>
          Drop an EPUB. We only store the metadata (title, author, cover) and
          a copy of the file on this machine — nothing goes to the cloud, and
          the text never touches our database.
        </p>
      </header>
      <UploadClient />
    </div>
  );
}
