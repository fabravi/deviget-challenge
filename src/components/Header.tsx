import React from "react";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to={`/`}>
        <h1>Reddit Client</h1>
      </Link>
      <nav className={styles.header_nav}>
        <Link
          className={
            location.pathname !== "/gallery" ? styles.header_active : ""
          }
          to={`/`}
        >
          Top Posts
        </Link>
        <Link
          className={
            location.pathname === "/gallery" ? styles.header_active : ""
          }
          to={`/gallery`}
        >
          Gallery
        </Link>
      </nav>
    </header>
  );
};
