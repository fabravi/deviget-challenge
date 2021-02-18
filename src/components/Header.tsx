import React from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";

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
          to={`/`}
          className={
            !location.pathname.startsWith("/gallery")
              ? styles.header_active
              : ""
          }
        >
          Top Posts
        </Link>
        <NavLink to="/gallery" activeClassName={styles.header_active}>
          Gallery
        </NavLink>
      </nav>
    </header>
  );
};
