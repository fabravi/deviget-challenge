import React from "react";
import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner_rect1}></div>
      <div className={styles.spinner_rect2}></div>
      <div className={styles.spinner_rect3}></div>
      <div className={styles.spinner_rect4}></div>
      <div className={styles.spinner_rect5}></div>
    </div>
  );
};
