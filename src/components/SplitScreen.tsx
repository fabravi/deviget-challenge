import React from "react";
import styles from "./SplitScreen.module.scss";

interface SplitScreen {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const SplitScreen = ({ left, right }: SplitScreen) => {
  return (
    <div className={styles.splitscreen}>
      <div className={styles.splitscreen_left}>{left}</div>
      <div className={styles.splitscreen_right}>{right}</div>
    </div>
  );
};
