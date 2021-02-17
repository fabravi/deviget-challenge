import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dismiss,
  dismissAll,
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

  const onDismiss = (id: string) => {
    dispatch(dismiss(id));
  };

  return (
    <>
      {posts.length ? (
        <ul className={styles.posts}>
          {posts.map((item) => {
            if (status[item.id]?.dismiss) return null;
            return (
              <Post
                key={item.id}
                read={status[item.id]?.read}
                dismiss={onDismiss}
                link={(element: React.ReactNode) => (
                  <Link to={`/${item.id}`}>{element}</Link>
                )}
                {...item}
              />
            );
          })}
        </ul>
      ) : null}
      <div
        className={styles.posts_dismissAll}
        onClick={() => dispatch(dismissAll())}
      >
        Dismiss all
      </div>
    </>
  );
};
