"use client";

import { useState } from "react";
import FileUpload from "./components/FileUpload/FileUpload";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState<File>();

  console.log(file);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>CleanPic</h1>
      <p className={styles.description}>
        CleanPic is a free and open-source tool that allows you to remove EXIF
        metadata from photos and images. This helps to protect your privacy and
        reduce the image file size.
      </p>
      <FileUpload setFile={setFile} />
      {file && (
        <div className={styles.imageContainer}>
          <Image
            src={URL.createObjectURL(file)}
            alt="CleanPic"
            width={300}
            height={200}
            objectFit="contain"
          />
          <div className={styles.fileDetails}>
            <p>File: {file?.name}</p>
            <p>Size: {file?.size}</p>
            <p>Type: {file?.type}</p>
            <p>Last Modified: {file?.lastModified}</p>
          </div>
          <button>Download Cleared Image</button>
        </div>
      )}
      <div className={styles.howtouse}>
        <h2>How to remove EXIF metadata from your photos and images</h2>
        <ol>
          <li>Upload a photo or image file</li>
          <li>Download cleared photo</li>
        </ol>
      </div>
    </main>
  );
}
