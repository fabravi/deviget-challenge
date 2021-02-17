import React from "react";
import styles from "./Post.module.scss";
import { Post as PostType } from "../types/types";
interface PostsProps {
  link: Function;
  dismiss: (id: string) => void;
}

export const Post = ({
  title,
  author,
  comments,
  thumbnail,
  read,
  link,
  dismiss,
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
        {link(<h3 className={styles.post_title}>{title}</h3>)}
        {thumbnail && <img className={styles.post_thumbnail} src={thumbnail} />}
      </div>
      <div className={styles.post_footer}>
        {comments}
        <button
          className={styles.post_dismiss}
          onClick={() => dismiss(props.id)}
        >
          Dismiss
        </button>
      </div>
    </div>
  </li>
);
