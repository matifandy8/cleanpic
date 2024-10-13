"use client";

import { useState } from "react";
import FileUpload from "./components/FileUpload/FileUpload";
import styles from "./page.module.css";
import ImagePreview from "./components/ImagePreview/ImagePreview";

export default function Home() {
  const [file, setFile] = useState<File>();
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>CleanPic</h1>
      <p className={styles.description}>
        CleanPic is a free and open-source tool that allows you to remove EXIF
        metadata from photos and images. This helps to protect your privacy and
        reduce the image file size.
      </p>
      <FileUpload setFile={setFile} />
      {file && <ImagePreview file={file} />}
      <div className={styles.howtouse}>
        <h2 className={styles.howtouseTitle}>
          How to use CleanPic to remove EXIF metadata from your photos and
          images
        </h2>
        <ol className={styles.howtouseList}>
          <li className={styles.howtouseListItem}>
            Upload your photo or image file
          </li>
          <li className={styles.howtouseListItem}>Download cleared photo</li>
        </ol>
      </div>
    </main>
  );
}
