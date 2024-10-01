import React, { useState } from "react";
import NextImage from "next/image"; // Import the Next.js Image component
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  file: File | null;
  onClearMetadata: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onClearMetadata,
}) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  if (!file) return null;

  const handleClearMetadata = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image(); // Use the native Image constructor
      img.src = e.target?.result as string;
      img.onload = () => {
        // Create a canvas to draw the image
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          // Convert the canvas to a Blob
          canvas.toBlob((blob) => {
            if (blob) {
              const newImgURL = URL.createObjectURL(blob);
              setDownloadUrl(newImgURL); // Set the download URL
              onClearMetadata(); // Call the parent's clear metadata function
              console.log("Cleared metadata for:", file.name);
            }
          }, "image/jpeg");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.imageContainer}>
      <NextImage
        src={URL.createObjectURL(file)}
        alt="CleanPic"
        width={300}
        height={400}
        objectFit="contain"
      />
      <div className={styles.fileDetails}>
        <p>File: {file.name}</p>
        <p>Size: {file.size} bytes</p>
        <p>Type: {file.type}</p>
        <p>Last Modified: {new Date(file.lastModified).toLocaleString()}</p>
      </div>
      <button className={styles.clearMetadata} onClick={handleClearMetadata}>
        Clear Metadata
      </button>
      {downloadUrl && (
        <a href={downloadUrl} download={file.name}>
          <button className={styles.downloadButton}>
            Download Cleaned Image
          </button>
        </a>
      )}
    </div>
  );
};

export default ImagePreview;
