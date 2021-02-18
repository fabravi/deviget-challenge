import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  read,
  selectActivePost,
  selectPostsList,
  setActive,
} from "../state/reducers/posts";
import styles from "./PostDetail.module.scss";

interface PostsDetailProps {
  post: any;
}

export const PostsDetail = ({ post }: PostsDetailProps) => {
  if (!post)
    return (
      <div className={styles.postdetail}>
        Click on a post to see its detail.
      </div>
    );

  return (
    <div className={styles.postdetail}>
      <h2>{post.title}</h2>
      <div>Author</div>
      <div>Entry Date</div>
      <div>Thumbnail</div>
      <div>Comments</div>
    </div>
  );
};
