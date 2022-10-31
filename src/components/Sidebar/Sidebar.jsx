import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    console.log(window.scrollY);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos > 0 ? false : true);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <div
      style={{
        padding: isHoveringSidebar ? "1rem 10rem 1rem 1rem" : "1rem",
        left: visible ? "auto" : "-100px",
      }}
      className={styles.sidebar}
      onMouseOver={() => setIsHoveringSidebar(true)}
      onMouseOut={() => setIsHoveringSidebar(false)}
    >
      <NavLink className={styles.navlink} to="/">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/"
                ? "/images/dashboard-selected.svg"
                : "/images/dashboard.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Dashboard
          </p>
        </div>
      </NavLink>

      <NavLink className={styles.navlink} to="/schedule">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/schedule"
                ? "/images/schedule-selected.svg"
                : "/images/schedule.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Schedule
          </p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/transaction">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/transaction"
                ? "/images/transaction-selected.svg"
                : "/images/transaction.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Transaction
          </p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/settings">
        <div className={styles.sidebarOption}>
          <img src="/images/setting.png" alt="" />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            settings
          </p>
        </div>
      </NavLink>
      <div
        onClick={() => {
          signOut(auth)
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              // An error happened.
            });
        }}
        className={styles.sidebarOption}
      >
        <img src="/images/logout.png" alt="" />
        <p style={{ display: isHoveringSidebar ? "block" : "none" }}>logout</p>
      </div>
      {/* <NavLink className={styles.navlink} to="/upgrade">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/upgrade"
                ? "/images/dashboard-selected.svg"
                : "/images/crown.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Upgrade
          </p>
        </div>
      </NavLink> */}
    </div>
  );
}

export default Sidebar;
