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
import { Transition } from "react-transition-group";

import styles from "./Posts.module.scss";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

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
            return (
              <Transition
                in={!status[item.id]?.dismiss}
                enter={false}
                timeout={duration}
                unmountOnExit={true}
              >
                {(state: "entering" | "entered" | "exiting" | "exited") => (
                  <li
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    <Post
                      key={item.id}
                      read={status[item.id]?.read}
                      dismiss={onDismiss}
                      link={(element: React.ReactNode) => (
                        <Link to={`/${item.id}`}>{element}</Link>
                      )}
                      {...item}
                    />
                  </li>
                )}
              </Transition>
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
