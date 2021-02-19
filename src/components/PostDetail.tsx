import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../types/types";
import { Empty } from "./Empty";
import styles from "./PostDetail.module.scss";

interface PostsDetailProps {
  post: Post | null;
}

export const PostsDetail = ({ post }: PostsDetailProps) => {
  if (!post)
    return <Empty emoji={"🧑‍💻"} text={"Go ahead and tap on something."} />;

  return (
    <>
      <Link className={styles.postdetail_back} to="/">
        Back
      </Link>
      <div className={styles.postdetail}>
        <div className={styles.postdetail_header}>
          <span>{post.author}</span>
          <span>{post.created}</span>
        </div>
        <h2>{post.title}</h2>
        <div></div>
        <div className={styles.postdetail_image}>
          {post.image ? (
            <Link to={`/gallery/${post.id}`}>
              <img
                className={styles.postdetail_image}
                src={post.image}
                alt={post.title}
              />
            </Link>
          ) : null}
        </div>
        <div className={styles.postdetail_footer}>{post.comments} Comments</div>
      </div>
    </>
  );
};
