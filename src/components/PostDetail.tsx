import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { read } from "../state/reducers/posts";
import styles from "./PostDetail.module.scss";

interface PostsDetailProps {}

export const PostsDetail = ({}: PostsDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(read(id));
  }, [id]);

  if (!id)
    return (
      <div className={styles.postdetail}>
        Click on a post to see its detail.
      </div>
    );

  return (
    <div className={styles.postdetail}>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
        voluptatem corporis incidunt libero asperiores perspiciatis quam
        eveniet, iusto alias cumque quasi laboriosam, error sapiente cupiditate
        enim consequatur facilis! Consequuntur, est.
      </div>
      <div>Author</div>
      <div>Entry Date</div>
      <div>Thumbnail</div>
      <div>Comments</div>
    </div>
  );
};
