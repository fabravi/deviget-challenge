import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Empty } from "../components/Empty";
import { PostsDetail } from "../components/PostDetail";
import { Posts } from "../components/Posts";
import { SplitScreen } from "../components/SplitScreen";
import {
  dismiss,
  dismissAll,
  fetchPosts,
  read,
  selectAllDismissed,
  selectFetching,
  selectPostsList,
  selectStatusMap,
} from "../state/reducers/posts";
import { Post } from "../types/types";
import { allPostsDismissed } from "../utils/utils";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatusMap);
  const initializing = useSelector(selectFetching);
  const allDismissed = useSelector(selectAllDismissed);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  let [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
    if (allPostsDismissed(posts, status)) onDismissAll();
  }, []);

  useEffect(() => {
    dispatch(read(id));
  }, [id]);

  useEffect(() => {
    let post = posts.find((post) => post.id === id);
    if (!post) history.push("/");
    setPost(post || null);
  }, [id]);

  const onDismiss = (id: string) => {
    dispatch(dismiss(id));
  };

  const onDismissAll = () => {
    dispatch(dismissAll());
  };

  if (initializing)
    return <Empty emoji={"💆"} text={"Relax while this loads..."} />;

  if (status && status[id]?.dismiss) {
    return <Redirect to="/" />;
  }

  const postProps = {
    posts,
    status,
    allDismissed,
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
