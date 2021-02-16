import React from "react";
import styles from "./PostDetail.module.scss";

interface PostsDetailProps {}

export const PostsDetail = ({}: PostsDetailProps) => (
  <div className={styles.postdetail}>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptatem
      corporis incidunt libero asperiores perspiciatis quam eveniet, iusto alias
      cumque quasi laboriosam, error sapiente cupiditate enim consequatur
      facilis! Consequuntur, est.
    </div>
    <div>Author</div>
    <div>Entry Date</div>
    <div>Thumbnail</div>
    <div>Comments</div>
  </div>
);
