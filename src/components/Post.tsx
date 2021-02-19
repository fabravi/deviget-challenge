import React from "react";
import styles from "./Post.module.scss";
import { Post as PostType } from "../types/types";
import { Link } from "react-router-dom";
import { ChatBubble } from "@material-ui/icons";
interface PostsProps {
  dismiss: (id: string) => void;
}

export const Post = ({
  title,
  author,
  created,
  comments,
  thumbnail,
  image,
  read,
  dismiss,
  ...props
}: PostsProps & PostType) => {
  const img =
    thumbnail &&
    (image ? (
      <Link to={`gallery/${props.id}`} className={styles.post_thumbnail_link}>
        <img className={styles.post_thumbnail} src={thumbnail} />
      </Link>
    ) : (
      <img className={styles.post_thumbnail} src={thumbnail} />
    ));

  return (
    <div className={styles.post} {...props}>
      <div className={styles.post_status}>
        {!read && <div className={styles.post_unread}></div>}
      </div>
      <div className={styles.post_container}>
        <div className={styles.post_header}>
          {author} <span>{created}</span>
        </div>
        <div className={styles.post_body}>
          <Link to={`/${props.id}`} className={styles.post_title}>
            <h3>{title}</h3>
          </Link>
          {img}
        </div>
        <div className={styles.post_footer}>
          <span>
            <ChatBubble /> {comments} Comments
          </span>
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
};
