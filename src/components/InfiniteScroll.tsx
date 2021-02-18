import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import {
  fetchPosts,
  selectAfter,
  selectFetching,
  selectPostsList,
} from "../state/reducers/posts";

export const InfiniteScroll: FC = ({ children }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const after = useSelector(selectAfter);
  const posts = useSelector(selectPostsList);
  const fetching = useSelector(selectFetching);

  const dispatch = useDispatch();

  const [isVisible] = useIntersectionObserver({
    elementRef: divRef,
  });

  useEffect(() => {
    if (isVisible && !fetching)
      dispatch(
        fetchPosts({
          after: after || undefined,
          limit: 10,
        })
      );
  }, [isVisible]);

  return (
    <>
      {children}
      {posts.length < 50 && (
        <div ref={divRef} style={{ background: "red" }}>
          Loading
        </div>
      )}
    </>
  );
};
