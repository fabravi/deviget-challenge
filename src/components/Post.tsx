import React from "react";
import styles from "./Post.module.scss";
import { Post as PostType } from "../types/types";
import { create } from "domain";
interface PostsProps {
  link: Function;
  dismiss: (id: string) => void;
}

export const Post = ({
  title,
  author,
  created,
  comments,
  thumbnail,
  read,
  link,
  dismiss,
  ...props
}: PostsProps & PostType) => (
  <div className={styles.post} {...props}>
    <div className={styles.post_status}>
      {!read && <div className={styles.post_unread}></div>}
    </div>
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        {author} <span>{created}</span>
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
  </div>
);
