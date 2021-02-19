import { CheckCircle, CheckCircleOutline, Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styles from "./Picture.module.scss";

export const Picture = ({
  id,
  url,
  pictures,
  addToGallery,
  removeFromGallery,
}: any) => {
  const [addedToGallery, setAddedToGallery] = useState<boolean>();

  useEffect(() => {
    setAddedToGallery(!!pictures.find((picture: any) => picture.id === id));
  }, []);

  const handleAdd = () => {
    setAddedToGallery(true);
    addToGallery();
  };

  const handleRemove = () => {
    setAddedToGallery(false);
    removeFromGallery(id);
  };

  return (
    <div className={styles.picture}>
      <div className={styles.picture_container}>
        <div className={styles.picture_header}>
          <button
            className={[
              styles.picture_action,
              styles.picture_action_add,
              addedToGallery ? styles.picture_action_disabled : "",
            ].join(" ")}
            onClick={handleAdd}
          >
            {addedToGallery
              ? ["Saved", <CheckCircle />]
              : ["Save", <CheckCircleOutline />]}
          </button>
          {addedToGallery && (
            <button
              className={[
                styles.picture_action,
                styles.picture_action_remove,
              ].join(" ")}
              onClick={handleRemove}
            >
              <Delete /> Remove
            </button>
          )}
        </div>
        <img className={styles.picture_img} src={url} />
      </div>
    </div>
  );
};
