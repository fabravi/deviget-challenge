import styles from "./FloatingButton.module.scss";

export const FloatingButton = ({ children, ...props }: any) => (
  <button className={styles.floatingbutton} {...props}>
    {children}
  </button>
);
