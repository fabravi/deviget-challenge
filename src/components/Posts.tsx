import React from "react";
import { Post as PostType, PostsStatus } from "../types/types";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

import styles from "./Posts.module.scss";
import { InfiniteScroll } from "./InfiniteScroll";
import { Post } from "./Post";

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

interface PostProps {
  posts: PostType[];
  status: PostsStatus;
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
  onFetchPosts?: () => void;
}

export const Posts = ({
  posts,
  status,
  onDismiss,
  onDismissAll,
}: PostProps) => {
  return (
    <>
      {posts.length ? (
        <ul className={styles.posts}>
          <InfiniteScroll>
            {posts.map((item) => {
              return (
                <Transition
                  key={item.id}
                  in={status && !status[item.id]?.dismiss}
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
                        read={status && status[item.id]?.read}
                        dismiss={(id) => onDismiss(id)}
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
          </InfiniteScroll>
        </ul>
      ) : null}
    </>
  );
};
