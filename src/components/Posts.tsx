import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  read,
  selectPostsList,
  selectStatusMap,
} from "../state/reducers/posts";
import { Post } from "./Post";

import styles from "./Posts.module.scss";

interface PostProps {}

export const Posts = ({}: PostProps) => {
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatusMap);
  const dispatch = useDispatch();

  return (
    <ul className={styles.posts}>
      {posts.map((item) => (
        <Post
          key={item.id}
          read={status[item.id]?.read}
          onClick={() => dispatch(read(item.id))}
        />
      ))}
    </ul>
  );
};
