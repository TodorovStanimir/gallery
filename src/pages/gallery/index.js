import React, { useState, useEffect } from "react";

import styles from "./index.module.css";

const Gallery = (props) => {
  // Declaring a new state variable, which we'll call "photos"
  const [photos, setPhotos] = useState([]);
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

  // In useEffect we execute our function to fetch photos from the backend, and because array of dependencies is empty
  // this happens only once - first time when we preparing a component to render in a dom
  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className={styles.App}>
      <h2 className={styles.heading}>Gallery Page</h2>
      <button
        // the button is disabled if page showing the first 10 photos
        disabled={page === 1}
        // when user clicked the button, this code change (set) the value of the page in the component's state to its previous value decreased by 1.
        onClick={() => {
          setPage(() => page--);
        }}
      >
        Previous 10 photos
      </button>
      <button
        // the button is disabled if page showing the last 10 photos
        disabled={page === photos.length / 10}
        // when user clicked the button, this code change (set) the value of the page in the component's state to its previous value incereased by 1.
        onClick={() => {
          setPage(() => page++);
        }}
      >
        Next 10 photos
      </button>
      {photos.length
        ? photos.slice((page - 1) * 10, (page - 1) * 10 + 10).map((photo) => (
            <div key={photo.url}>
              <p>
                Album Id: {photo.albumId}; Photo Id: {photo.id}
              </p>
              <p>Photo title: {photo.title}</p>
              <img src={photo.url} alt={`Number ${photo.id}`}></img>
            </div>
          ))
        : null}
    </div>
  );
};

export default Gallery;
