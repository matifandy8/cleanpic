// components/FileUpload.js

import React from "react";
import styles from "./FileUpload.module.css";

const FileUpload = () => {
  return (
    <div className={styles.input}>
      <input
        className={styles.inputFile}
        type="file"
        aria-label="upload"
        name="file"
        accept=".png, .jpg, .jpeg, .pdf, .webp, .bmp, .heic, .tif, .tiff, .gif"
        id="fileInput"
      />
    </div>
  );
};

export default FileUpload;
