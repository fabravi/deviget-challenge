import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPostsList,
  selectStatusMap,
} from "../state/reducers/posts";
import { Post } from "./Post";
import { Link } from "react-router-dom";

import styles from "./Posts.module.scss";

interface PostProps {}

export const Posts = ({}: PostProps) => {
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatusMap);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <ul className={styles.posts}>
      {posts.map((item) => (
        <Post
          key={item.id}
          read={status[item.id]?.read}
          link={(element: React.ReactNode) => (
            <Link to={`/${item.id}`}>{element}</Link>
          )}
          {...item}
        />
      ))}
    </ul>
  );
};
