import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useParams } from "react-router-dom";
import { Gallery } from "../components/Gallery";
import { Picture } from "../components/Picture";
import { add, remove, selectGallery } from "../state/reducers/gallery";
import { selectPostsList } from "../state/reducers/posts";

export const GalleryPage = () => {
  const dispatch = useDispatch();

  const pictures = useSelector(selectGallery);
  const posts = useSelector(selectPostsList);
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let post = posts.find((post) => post.id === id);
    setUrl(post?.image || "");
  }, [id]);

  const addToGallery = () => {
    if (url) dispatch(add({ id, url }));
  };

  const removeFromGallery = (id: string) => {
    dispatch(remove(id));
  };

  if (id) return <Picture url={url} addToGallery={addToGallery} />;

  return <Gallery pictures={pictures} removeFromGallery={removeFromGallery} />;
};
