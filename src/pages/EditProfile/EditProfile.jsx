import React, { useState } from "react";
import Education from "../../components/Education/Education";
import Navbar from "../../components/Navbar/Navbar";
import ProfessionalDetails from "../../components/ProfessionalDetails/ProfessionalDetails";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [futureGoals, setFutureGoals] = useState("");
  const [vision, setVision] = useState("");
  const [haveStartup, setHaveStartup] = useState("");

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>Let's get your profile done first!!</h1>
        <form className={styles["edit-profile"]}>
          <div style={{ marginBottom: "2rem" }}>
            <label for="profile-input">
              <img
                src="/images/add-photo.png"
                alt="add-profile"
                style={{ WebkitUserDrag: "none", cursor: "pointer" }}
              />
            </label>
            <input
              id="profile-input"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
          </div>
          <div className={styles["input-fields"]}>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gender"
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hometown"
              onChange={(e) => setHometown(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Language"
              style={{ width: "90%" }}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <textarea
              placeholder="Add Bio"
              rows={8}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div style={{ margin: "2rem 0" }}>
            <h2>How you want to meet people</h2>
            <div className={styles.social}>
              <div className={styles["social-urls"]}>
                <img src="/images/instagram.png" alt="instagram" />
                <input
                  type="text"
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className={styles["social-urls"]}>
                <img src="/images/facebook.png" alt="facebook" />
                <input
                  type="text"
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div className={styles["social-urls"]}>
                <img src="/images/twitter.png" alt="twitter" />
                <input
                  type="text"
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className={styles["social-urls"]}>
                <img src="/images/linkedin.png" alt="linkedin" />
                <input
                  type="text"
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>
          </div>
          <br />
          <h1>Let's know about your Education</h1>
          <Education />
          <h1>Now let's get your Professional Profile Done</h1>
          <ProfessionalDetails />
          <div className={styles["input-fields"]}>
            <textarea
              placeholder="Your Future Goals"
              rows={5}
              onChange={(e) => setFutureGoals(e.target.value)}
            />
            <textarea
              placeholder="Your Vision"
              rows={5}
              onChange={(e) => setVision(e.target.value)}
            />
          </div>
          <h1>Do you have a Start-up?</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className={styles["start-up-query"]}
              onClick={(e) => {
                setHaveStartup(true);
              }}
            >
              Yes
            </div>
            <div
              className={styles["start-up-query"]}
              onClick={() => {
                setHaveStartup(false);
              }}
            >
              No
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
