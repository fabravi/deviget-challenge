import React from "react";
import styles from "./SplitScreen.module.scss";

interface SplitScreen {
  left: React.ReactNode;
  right: React.ReactNode;
  closePanel: boolean;
}

export const SplitScreen = ({ left, right, closePanel }: SplitScreen) => {
  return (
    <div className={styles.splitscreen}>
      <div
        className={`${styles.splitscreen_left} ${
          closePanel ? styles.splitscreen_left_closed : ""
        }`}
      >
        {left}
      </div>
      <div className={styles.splitscreen_right}>{right}</div>
    </div>
  );
};
