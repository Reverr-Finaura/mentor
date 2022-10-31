import React, { useState } from "react";
import styles from "./Education.module.css";
import { TrashIcon } from "@heroicons/react/solid";
import { idGen } from "../../utils/idGen";

const Education = () => {
  const [degree, setDegree] = useState("");
  const [college, setCollege] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [isAddEducation, setIsAddEducation] = useState(true);
  const [educationDetails, setEducationDetails] = useState([]);

  console.log(educationDetails);

  const onAddBtnClickHandler = () => {
    setIsAddEducation(false);
    let newId = idGen(10);
    setEducationDetails([
      {
        degree: degree,
        college: college,
        startingDate: startingDate,
        lastDate: lastDate,
        id: newId,
      },
      ...educationDetails,
    ]);
    setDegree("");
    setCollege("");
    setStartingDate("");
    setLastDate("");
  };

  const onDeleteClickHandler = (data) => {
    setEducationDetails(
      educationDetails.filter((filteredData) => filteredData.id !== data.id)
    );
  };

  return (
    <div className={styles.education}>
      {educationDetails.length
        ? educationDetails.map((data) => {
            return (
              <div className={styles["education-details-card"]}>
                <ul
                  style={{
                    margin: 0,
                  }}
                >
                  <li>
                    <strong>Degree: </strong>
                    {data.degree}
                  </li>
                  <li>
                    <strong>College: </strong>
                    {data.college}
                  </li>
                  <li>
                    <strong>Starting Date: </strong>
                    {data.startingDate}
                  </li>
                  <li>
                    <strong>Last Date: </strong>
                    {data.lastDate}
                  </li>
                </ul>

                <TrashIcon
                  width={30}
                  style={{ marginLeft: "2rem", cursor: "pointer" }}
                  onClick={() => onDeleteClickHandler(data)}
                />
              </div>
            );
          })
        : null}
      {isAddEducation ? (
        <form className={styles["form"]}>
          <select
            id="degree"
            name="degree"
            onChange={(e) => setDegree(e.target.value)}
          >
            <option selected disabled>
              Degree
            </option>
            <option>High School</option>
            <option>Intermediate</option>
            <option>Graduation</option>
            <option>Post Graduation</option>
          </select>

          <select
            id="college"
            name="college"
            onChange={(e) => setCollege(e.target.value)}
          >
            <option selected disabled>
              College/School
            </option>
            <option>Option1</option>
            <option>Option2</option>
            <option>Option3</option>
            <option>Option4</option>
          </select>
          <br />
          <label for="starting-date">Starting Date: </label>
          <input
            id="starting-date"
            type="date"
            onChange={(e) => setStartingDate(e.target.value)}
          />
          <br />
          <label for="last-date">Last Date: </label>
          <input
            id="last-date"
            type="date"
            onChange={(e) => setLastDate(e.target.value)}
          />
          <button className={styles["add-btn"]} onClick={onAddBtnClickHandler}>
            Add
          </button>
        </form>
      ) : (
        <img
          src="/images/add.png"
          className={styles.add}
          alt="add"
          onClick={() => setIsAddEducation(true)}
        />
      )}
    </div>
  );
};

export default Education;
