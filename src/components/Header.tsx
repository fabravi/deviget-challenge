import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => (
  <header className={styles.header}>
    <h1>Top posts</h1>
  </header>
);
