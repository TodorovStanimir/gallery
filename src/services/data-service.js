const url = "https://jsonplaceholder.typicode.com/photos";

// Declaring a variable "fetchPhotos", which is assigned to a asynchronous arrow function.
// In this function we use fetch to get data from our's backend.
// Then we use filter method to take the 1-st image of each album with an even ID
export const fetchPhotos = async () => {
  // try_statements: The statements to be executed.
  // catch_statements: Statement that is executed if an exception is thrown in the try-block.
  try {
    const response = await fetch(url);

    // we checking the status of response and if it is different then 200, throw a new Error with response status
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    // we execute this code to get data from the response;
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
    // we returning the photos if We have data from backend
    return photos;
  } catch (error) {
    // we returning the error if We have not data from backend
    return error;
  }
};
