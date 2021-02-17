import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  read,
  selectActivePost,
  selectPostsList,
  setActive,
} from "../state/reducers/posts";
import styles from "./PostDetail.module.scss";

interface PostsDetailProps {}

export const PostsDetail = ({}: PostsDetailProps) => {
  const { id } = useParams<{ id: string }>();

  let activeId = useSelector(selectActivePost);
  let posts = useSelector(selectPostsList);
  const dispatch = useDispatch();

  const post = posts.find((post) => post.id === activeId);

  useEffect(() => {
    dispatch(read(id));
    dispatch(setActive(id));
  }, [id]);

  if (!id || !post)
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
