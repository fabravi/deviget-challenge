import React from "react";
import { Post } from "./Post";

import styles from "./Posts.module.scss";

interface PostProps {}

export const Posts = ({}: PostProps) => (
  <ul className={styles.posts}>
    {[...Array(10)].map((item) => (
      <Post />
    ))}
  </ul>
);
