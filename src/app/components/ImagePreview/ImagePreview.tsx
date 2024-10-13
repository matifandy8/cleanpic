import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import styles from "./ImagePreview.module.css";
import EXIF from "exif-js";

interface ImagePreviewProps {
  file: File | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraInfo, setCameraInfo] = useState<{
    make: string;
    model: string;
  } | null>(null);

  if (!file) return null;

  const handleClearMetadata = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);
          setIsProcessing(true);

          canvas.toBlob((blob) => {
            if (blob) {
              const newImgURL = URL.createObjectURL(blob);
              setDownloadUrl(newImgURL);
            }
            setIsProcessing(false);
          }, "image/jpeg");
        }
      };
    };
    reader.readAsDataURL(file);
  };
  const extractCameraInfo = () => {
    EXIF.getData(file, () => {
      const make = EXIF.getTag(file, "Make");
      const model = EXIF.getTag(file, "Model");
      setCameraInfo({ make: make || "", model: model || "" });
    });
  };

  useEffect(() => {
    extractCameraInfo();
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [file, downloadUrl]);

  return (
    <div className={styles.imageContainer}>
      <NextImage
        src={URL.createObjectURL(file)}
        alt="Preview"
        width={300}
        height={400}
        objectFit="contain"
      />
      <div className={styles.fileDetails}>
        <p>File: {file.name}</p>
        <p>Size: {file.size} bytes</p>
        <p>Type: {file.type}</p>
        <p>Last Modified: {new Date(file.lastModified).toLocaleString()}</p>
        {cameraInfo && (
          <>
            <p>Camera Make: {cameraInfo.make ? cameraInfo.make : "N/A"}</p>
            <p>Camera Model: {cameraInfo.model ? cameraInfo.model : "N/A"}</p>
          </>
        )}
      </div>
      <button
        className={styles.clearMetadata}
        onClick={handleClearMetadata}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Clear Metadata"}
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
