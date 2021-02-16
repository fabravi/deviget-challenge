import React from "react";
import styles from "./Post.module.scss";

interface PostsProps {
  read: boolean | undefined;
  onClick: () => void;
}

export const Post = ({ read, ...props }: PostsProps) => (
  <li className={styles.post} {...props}>
    <div className={styles.post_status}>
      {!read && <div className={styles.post_unread}></div>}
    </div>
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        Author <span>Entry Date</span>
      </div>
      <div className={styles.post_body}>
        <h3 className={styles.post_title}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
          voluptatem corporis incidunt libero asperiores perspiciatis quam
          eveniet, iusto alias cumque quasi laboriosam, error sapiente
          cupiditate enim consequatur facilis! Consequuntur, est.
        </h3>
        <div>Thumbnail</div>
      </div>
      <div className={styles.post_footer}>Comments</div>
    </div>
  </li>
);
