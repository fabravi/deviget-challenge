import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { PostsDetail } from "../components/PostDetail";
import { Posts } from "../components/Posts";
import { SplitScreen } from "../components/SplitScreen";
import {
  dismiss,
  dismissAll,
  fetchPosts,
  read,
  selectFetching,
  selectPostsList,
  selectStatusMap,
} from "../state/reducers/posts";
import { Post } from "../types/types";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatusMap);
  const initializing = useSelector(selectFetching);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  let [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(read(id));
  }, [id]);

  useLayoutEffect(() => {
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

  if (initializing) return <div>Loading</div>;

  if (status && status[id]?.dismiss) {
    return <Redirect to="/" />;
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
