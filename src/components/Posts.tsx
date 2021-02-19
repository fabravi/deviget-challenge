import React, { useState } from "react";
import { Post as PostType, PostsStatus } from "../types/types";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

import styles from "./Posts.module.scss";
import { InfiniteScroll } from "./InfiniteScroll";
import { Post } from "./Post";
import { FloatingButton } from "./FloatingButton";
import { Empty } from "./Empty";

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, transform: "translateX(-300px)" },
  exited: { opacity: 0 },
};

interface PostProps {
  posts: PostType[];
  status: PostsStatus;
  allDismissed: boolean;
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
  onFetchPosts?: () => void;
}

export const Posts = ({
  posts,
  status,
  allDismissed,
  onDismiss,
  onDismissAll,
}: PostProps) => {
  const handleDismissAllClick = () => {
    onDismissAll();
  };

  return (
    <>
      <ul className={styles.posts}>
        <InfiniteScroll allDismissed={allDismissed}>
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
                      {...item}
                    />
                  </li>
                )}
              </Transition>
            );
          })}
        </InfiniteScroll>
      </ul>
      {!allDismissed ? (
        <FloatingButton onClick={handleDismissAllClick}>
          Dismiss All
        </FloatingButton>
      ) : (
        <Transition
          in={allDismissed}
          enter={false}
          timeout={duration}
          unmountOnExit={true}
        >
          <div className={styles.posts_fullscreen}>
            <Empty
              emoji={"🤙"}
              text={"All posts have been dismissed. Check again later."}
            />
          </div>
        </Transition>
      )}
    </>
  );
};
