import React from "react";
import styles from "./JoinMeet.module.css";

const JoinMeet = () => {
  return (
    <div className={styles.joinOrCancel}>
      <button className={styles.joinbtn}>
        Click here to <span>Join Meet</span>
      </button>
      <p>Your Upcoming Call is appointed with Mr. Saha</p>
      <button className={styles.cancelbtn}>
        Click here to <span>Cancel</span>
      </button>
    </div>
  );
};

export default JoinMeet;
