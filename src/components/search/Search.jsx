import React from "react";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <div className={styles.search}>
      <img src="./images/searchicon.png" alt="search" />
      <input type="text" placeholder="Search here" />
    </div>
  );
};

export default Search;
