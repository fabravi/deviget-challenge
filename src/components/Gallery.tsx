import { CheckCircle, Delete } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Picture } from "../types/types";
import styles from "./Gallery.module.scss";

export const Gallery = ({
  pictures,
  removeFromGallery,
}: {
  pictures: Picture[];
  removeFromGallery: (id: string) => void;
}) => {
  return (
    <div className={styles.gallery}>
      <ul className={styles.gallery_items}>
        {pictures.length ? (
          pictures?.map((picture: any) => (
            <li key={picture.id} className={styles.gallery_item}>
              <button
                className={styles.gallery_remove}
                onClick={() => removeFromGallery(picture.id)}
              >
                <Delete />
              </button>
              <Link to={`/gallery/${picture.id}`}>
                <img className={styles.gallery_img} src={picture.url} />
              </Link>
            </li>
          ))
        ) : (
          <div className={styles.gallery_empty}>
            <span>🤷‍♂️</span>
            <br />
            There's nothing here yet.
          </div>
        )}
      </ul>
    </div>
  );
};
