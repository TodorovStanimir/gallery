import React, { useState, useEffect } from "react";

import Heading from "../../components/Heading";
import Photo from "../../components/Photo";

import styles from "./index.module.css";

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

  // Declaring a variable "showingPhotos", which is assigned to a arrow of 10 instances of the "Photo" component.
  const showingPhotos = photos.length
    ? photos
        // on the base of the page number, the code here return new array of 10 pictures from the all pictures
        .slice((page - 1) * 10, (page - 1) * 10 + 10)
        // from this new array we forming 10 instances of the "Photo" component
        .map((photo, ind) => <Photo key={photo.url} photo={photo} ind={ind} />)
    : null;

  return (
    <div className={styles.App}>
      <Heading
        page={page}
        changePage={changePage}
        photosLengt={photos.length}
      />

      <div className={styles.gallery__container}>{showingPhotos}</div>
    </div>
  );
};

export default Gallery;
