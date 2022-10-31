import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  phnSidebarInvisible,
  selectPhnSidebar,
} from "../../features/phnSidebarSlice";
import styles from "./PhnSidebar.module.css";

function Sidebar() {
  const phnSidebar = useSelector(selectPhnSidebar);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <div
      style={{
        display: phnSidebar && width <= 600 ? "flex" : "none",
      }}
      className={`${styles.phnSidebar} animate__animated 
        animate__slideInLeft animate__faster`}
    >
      <div
        onClick={() => {
          dispatch(phnSidebarInvisible());
        }}
        className={styles.phnSidebarOption}
      >
        <XIcon className={styles.xicon} />
      </div>
      <NavLink className={styles.navlink} to="/">
        <div className={styles.phnSidebarOption}>
          <img src="./images/dashboard.svg" alt="" />
          <p>Dashboard</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/tools">
        {" "}
        <div className={styles.phnSidebarOption}>
          <img src="./images/schedule.svg" alt="" />
          <p>Schedule</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/knowledge">
        <div className={styles.phnSidebarOption}>
          <img src="./images/call.svg" alt="" />
          <p>Call</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/transaction">
        <div className={styles.phnSidebarOption}>
          <img src="./images/transaction.svg" alt="" />
          <p>Transaction</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/upgrade">
        <div className={styles.phnSidebarOption}>
          <img src="./images/crown.svg" alt="" />
          <p>Upgrade</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
