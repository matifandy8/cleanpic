import FileUpload from "./components/FileUpload/FileUpload";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>CleanPic</h1>
      <p className={styles.description}>
        CleanPic is a free and open-source tool that allows you to remove EXIF
        metadata from photos and images. This helps to protect your privacy and
        reduce the image file size.
      </p>
      <FileUpload />
    </main>
  );
}
