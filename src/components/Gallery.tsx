import React from "react";
import { Picture } from "../types/types";
import styles from "./Gallery.module.scss";

export const Gallery = ({
  pictures,
  removeFromGallery,
}: {
  pictures: Picture[];
  removeFromGallery: (id: string) => void;
}) => {
  console.log(pictures);
  return (
    <div className={styles.gallery}>
      <ul className={styles.gallery_items}>
        {pictures?.map((picture: any) => (
          <li
            className={styles.gallery_item}
            onClick={() => removeFromGallery(picture.id)}
          >
            <img className={styles.gallery_img} src={picture.url} />
          </li>
        ))}
      </ul>
    </div>
  );
};
