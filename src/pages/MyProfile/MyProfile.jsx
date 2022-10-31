import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Search from "../../components/search/Search";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const MyProfile = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);
  console.log(userData, "mentorData");

  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      <PhnSidebar />
      <div
        id="container"
        className={styles.container}
        onLoad={() => {
          document.getElementById("about-user__heading").style.height =
            document.getElementById("about-user").offsetHeight + "px";

          document.getElementById("bg4").style.top =
            document.getElementById("container").offsetHeight + "px";
        }}
      >
        <Navbar />
        <div className={styles.body}>
          <div id="bg1" className={styles.bg1}></div>
          <div id="bg2" className={styles.bg2}></div>
          <div id="bg3" className={styles.bg3}></div>
          <div id="bg4" className={styles.bg4}></div>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            {/* <Search /> */}
            <div className={styles.profile}>
              <h1>Profile</h1>
              <img
                style={{ width: 200, height: 200 }}
                src={userData?.image}
                alt="profile"
              />
              <div style={{ display: "flex", marginTop: "2rem", width: "80%" }}>
                <div className={styles["details-left"]}>
                  <h3>Name</h3>
                  <h3>Date of Birth</h3>
                  <h3>Gender</h3>
                  <h3>Hometown</h3>
                  <h3>Location</h3>
                  <h3>Language</h3>
                  <h3 id="about-user__heading">About User</h3>
                  <h3>Current Work</h3>
                  <h3>Current Company</h3>
                  <h3>Current Title</h3>
                  <h3>From</h3>
                  <h3 style={{ color: "rgba(32, 32, 32, 0.75)" }}>
                    March 2016
                  </h3>
                </div>
                <div className={styles["details-right"]}>
                  <h3>{userData?.name}</h3>
                  <h3>{userData?.dob}</h3>
                  <h3>{userData?.gender}</h3>
                  <h3>Hometown</h3>
                  <h3>Location</h3>
                  <h3>Language</h3>
                  <h3 id="about-user">{userData?.about}</h3>
                  <h3>Work</h3>
                  <h3>Company</h3>
                  <h3>Title</h3>
                  <h3 style={{ color: "#000" }}>To</h3>
                  <h3 style={{ color: "rgba(32, 32, 32, 0.75)" }}>
                    April 2018
                  </h3>
                </div>
              </div>
              <br />
              <div style={{ width: "80%" }}>
                <h2>Experience</h2>
                <div>
                  {userData && userData.experience.length == 0 ? (
                    <h4> No Experience </h4>
                  ) : (
                    <h4>{userData && userData.experience}</h4>
                  )}
                </div>
                <br />
                <h2>Education</h2>
                <div>
                  {userData && userData.education.length == 0 ? (
                    <h4> No Education</h4>
                  ) : (
                    <h4>{userData && userData.education}</h4>
                  )}
                </div>
                <br />
                <h2>How Can We Meet</h2>
                <div className={styles.social}>
                  <img src="/images/instagram.png" alt="instagram" />
                  <img src="/images/facebook.png" alt="facebook" />
                  <img src="/images/twitter.png" alt="twitter" />
                  <img src="/images/linkedin.png" alt="linkedin" />
                </div>
              </div>
              <button
                className={styles["edit-profile"]}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
