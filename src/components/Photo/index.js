import React from "react";

import styles from "./index.module.css";

const Photo = ({ photo, ind }) => {
  return (
    <div
      className={styles[ind % 2 ? "gallery__item--1" : "gallery__item--2"]}
    >
      <p className={styles.gallery__item__title}>Photo title: {photo.title}</p>

      <img
        className={styles.gallery__item__photo}
        src={photo.url}
        alt={`Number ${photo.id}`}
      ></img>

      <p className={styles.gallery__item__info}>
        Album Id: {photo.albumId}; Photo Id: {photo.id}
      </p>
    </div>
  );
};

export default Photo;
