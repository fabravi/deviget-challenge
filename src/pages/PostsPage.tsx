import React, { useEffect, useState } from "react";
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
import { Post } from "../types/types";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatusMap);
  const activeId = useSelector(selectActivePost);
  const initializing = useSelector(selectFetching);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  let [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(read(id));
    dispatch(setActive(id));
  }, [id]);

  useEffect(() => {
    let post = posts.find((post) => post.id === activeId);
    if (!post) history.push("/");
    setPost(post || null);
  }, [activeId]);

  const onDismiss = (id: string) => {
    dispatch(dismiss(id));
  };

  const onDismissAll = () => {
    dispatch(dismissAll());
  };

  if (initializing) return <div>Loading</div>;

  if (status && status[id]?.dismiss) {
    history.push("/");
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
        closePanel={!!id}
      />
    </>
  );
};
