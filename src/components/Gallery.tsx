import { Delete } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Picture } from "../types/types";
import { Empty } from "./Empty";
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
      {pictures.length ? (
        <ul className={styles.gallery_items}>
          {pictures?.map((picture: Picture) => (
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
          ))}
        </ul>
      ) : (
        <Empty emoji={"🤷‍♂️"} text={"There's nothing here yet."} />
      )}
    </div>
  );
};
