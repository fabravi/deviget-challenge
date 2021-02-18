import React from "react";
import styles from "./Picture.module.scss";

export const Picture = ({ url, addToGallery }: any) => {
  return (
    <div className={styles.picture}>
      <div className={styles.picture_container}>
        <div className={styles.picture_header}>
          <button className={styles.picture_add} onClick={addToGallery}>
            Add to gallery
          </button>
        </div>
        <img className={styles.picture_img} src={url} />
      </div>
    </div>
  );
};
