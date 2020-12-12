import React from "react";

import Button from "../Button";

import styles from "./index.module.css";

const Heading = ({ page, changePage, photosLengt }) => {
  return (
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
        isDisabled={page === photosLengt / 10}
        // props funcChangePage keep reference to function changePage, and give us opportunity to
        // execute this function in children component.
        funcChangePage={changePage}
        // step is used like argument in the above function, and increase or decrease the page
        step={1}
      >
        Next 10 photos
      </Button>
    </h2>
  );
};

export default Heading;
