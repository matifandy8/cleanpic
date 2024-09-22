"use client";

import React from "react";
import { ChangeEvent, Dispatch, useState } from "react";
import styles from "./FileUpload.module.css";

const FileUpload = ({ setFile }: { setFile: Dispatch<File> }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!isValidFileType(file)) {
        setError("Unsupported file type. Please upload an image or PDF.");
        return;
      }
      setFile(file);
      setSuccessMessage("File uploaded successfully!");
      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (event.dataTransfer.files.length > 1) {
      setError("Only one file can be uploaded at a time.");
      return;
    }
    if (file) {
      if (!isValidFileType(file)) {
        setError("Unsupported file type. Please upload an image.");
        return;
      }
      setFile(file);
      setSuccessMessage("File uploaded successfully!");
      setError(null);
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "image/bmp",
      "image/heic",
      "image/tif",
      "image/tiff",
      "image/gif",
    ];
    return validTypes.includes(file.type);
  };

  return (
    <div>
      <div
        role="region"
        tabIndex={0}
        className={`${styles.input} ${isDragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          className={styles.inputFile}
          type="file"
          aria-label="upload"
          name="file"
          accept=".png, .jpg, .jpeg, .pdf, .webp, .bmp, .heic, .tif, .tiff, .gif"
          id="fileInput"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </div>
  );
};

export default FileUpload;
