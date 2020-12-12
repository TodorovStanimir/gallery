import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Button from "../../components/Button";

const Gallery = (props) => {
  // Declaring a new state variable, which we'll call "photos"
  const [photos, setPhotos] = useState([]);

  // Declaring a new state variable, which we'll call "page"
  let [page, setPage] = useState(1);

  // Declaring a variable "getPhotos", which is assigned to a asynchronous arrow function.
  // In this function we use fetch to get data from our's backend.
  // Then we use filter method to take the 1-st image of each album with an even ID
  const getPhotos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const loadedPhotos = await response.json();
    const photos = loadedPhotos.filter(
      (photo, index) =>
        // we use percentage division to find each album with an even ID

        photo.albumId % 2 === 0 &&
        // if previous condition is true /albumId is even/, we are going to checking the next condition
        // is the albumId of the current photo different than the albumId of the previous photo /photo is first of album/
        // if these two conditions are true, the filter method will include the current photo in the results Array
        photo.albumId !== loadedPhotos[index - 1].albumId
    );

    // after we get photos, we set the state of the component to them
    // this mean we changing state and rerender the component
    setPhotos(photos);
  };

  // Declaring a variable "changePage", which is assigned to a arrow function.
  // This function receives only one argument digit 1 or -1 and adds this argument to the current page
  // after we change the page, we set the state with the new calculated page and rerender pictures matching the new page
  const changePage = (step) => {
    const newPage = page + step;
    setPage(newPage);
  };

  // In useEffect we execute our function to fetch photos from the backend, and because array of dependencies is empty
  // this happens only once - first time when we preparing a component to render in a dom
  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className={styles.App}>
      <h2 className={styles.heading}>
        <Button
          // props isDisabled is true if page equal to 1, or if we are on the first page
          isDisabled={page === 1}
          // props funcChangePage keep reference to function changePage, and give us opportunity to
          // execute this function in children component.
          funcChangePage={changePage}
          // step is used like argument in the above function, and increase or decrease the page
          step={-1}
        >
          Previous 10 photos
        </Button>

        <span>Gallery Page</span>

        <Button
          // props isDisabled is true if page equal to 5, or if we are on the last page
          isDisabled={page === photos.length / 10}
          // props funcChangePage keep reference to function changePage, and give us opportunity to
          // execute this function in children component.
          funcChangePage={changePage}
          // step is used like argument in the above function, and increase or decrease the page
          step={1}
        >
          Next 10 photos
        </Button>
      </h2>

      <div className={styles.gallery__container}>
        {photos.length
          ? photos
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((photo, ind) => (
                <div
                  className={
                    styles[ind % 2 ? "gallery__item--1" : "gallery__item--2"]
                  }
                  key={photo.url}
                >
                  <p className={styles.gallery__item__title}>
                    Photo title: {photo.title}
                  </p>

                  <img
                    className={styles.gallery__item__photo}
                    src={photo.url}
                    alt={`Number ${photo.id}`}
                  ></img>

                  <p className={styles.gallery__item__info}>
                    Album Id: {photo.albumId}; Photo Id: {photo.id}
                  </p>
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default Gallery;
