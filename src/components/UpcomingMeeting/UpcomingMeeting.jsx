import React from "react";
import styles from "./UpcomingMeeting.module.css";

function UpcomingMeeting({ date, email }) {
  return (
    <div className={styles.meet}>
      <p>Your next meet on {date}</p>
      <h3>with {email}</h3>
      <div className={styles.btns}>
        <button>Reschedule</button>
        <button>Accept</button>
      </div>
    </div>
  );
}

export default UpcomingMeeting;
