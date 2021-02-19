import React from "react";
import styles from "./Empty.module.scss";

interface EmptyType {
  emoji: string;
  text: string;
}

export const Empty = ({ emoji, text }: EmptyType) => {
  return (
    <div className={styles.empty}>
      <span>{emoji}</span>
      <br />
      {text}
    </div>
  );
};
