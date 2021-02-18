import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FloatingButton } from "../components/FloatingButton";
import { PostsDetail } from "../components/PostDetail";
import { Posts } from "../components/Posts";
import { SplitScreen } from "../components/SplitScreen";
import {
  dismiss,
  dismissAll,
  fetchPosts,
  read,
  selectActivePost,
  selectFetching,
  selectPostsList,
  selectStatusMap,
  setActive,
} from "../state/reducers/posts";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatusMap);
  const activeId = useSelector(selectActivePost);
  const initializing = useSelector(selectFetching);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  let post;

  useEffect(() => {
    if (initializing) dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(read(id));
    dispatch(setActive(id));
  }, [id]);

  const onDismiss = (id: string) => {
    dispatch(dismiss(id));
  };

  const onDismissAll = () => {
    dispatch(dismissAll());
  };

  if (initializing) return <div>Loading</div>;

  if (status[id]?.dismiss) {
    history.push("/");
  }

  if (activeId) {
    post = posts.find((post) => post.id === activeId);
    if (!post) history.push("/");
  }

  const postProps = {
    posts,
    status,
    onDismiss,
    onDismissAll,
  };

  return (
    <>
      <SplitScreen
        left={<Posts {...postProps} />}
        right={<PostsDetail post={post} />}
      />
      <FloatingButton onClick={onDismissAll}>Dismiss All</FloatingButton>
    </>
  );
};
