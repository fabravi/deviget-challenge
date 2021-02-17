import React from "react";
import styles from "./Post.module.scss";
import { Post as PostType } from "../types/types";
interface PostsProps {
  onClick: () => void;
}

export const Post = ({
  title,
  author,
  comments,
  thumbnail,
  read,
  ...props
}: PostsProps & PostType) => (
  <li className={styles.post} {...props}>
    <div className={styles.post_status}>
      {!read && <div className={styles.post_unread}></div>}
    </div>
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        {author} <span>Entry Date</span>
      </div>
      <div className={styles.post_body}>
        <h3 className={styles.post_title}>{title}</h3>
        {thumbnail && <img className={styles.post_thumbnail} src={thumbnail} />}
      </div>
      <div className={styles.post_footer}>{comments}</div>
    </div>
  </li>
);
