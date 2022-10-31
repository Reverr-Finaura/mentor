import React from "react";
import styles from "./TransactionBar.module.css";
import { getUserFromDatabase } from "../../firebase/firebase";
import { useEffect } from "react";
import { useState } from "react";

const TransactionBar = (props) => {
  const [name, setName] = useState("");
  const getUser = async () => {
    let user = await getUserFromDatabase(`${props.receivedFrom}`);
    setName(user.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.bar}>
      Payment received from {name} for session on {props.date.split(" ")[0]}
      <img
        src="/images/arrow.svg"
        alt="arrow"
        style={{ WebkitUserDrag: "none" }}
      />
      <span>Rs {props.amount}</span>
    </div>
  );
};

export default TransactionBar;
