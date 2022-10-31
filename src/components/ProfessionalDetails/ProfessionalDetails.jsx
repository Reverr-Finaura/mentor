import React, { useState } from "react";
import styles from "./ProfessionalDetails.module.css";
import { idGen } from "../../utils/idGen";
import { TrashIcon } from "@heroicons/react/solid";

const ProfessionalDetails = () => {
  const [previousOrg, setPreviousOrg] = useState("");
  const [designation, setDesignation] = useState("");
  const [duration, setDuration] = useState(0);
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [isAddProfessional, setIsAddProfessional] = useState(true);
  const [professionalDetails, setProfessionalDetails] = useState([]);

  console.log(professionalDetails);

  const onAddBtnClickHandler = () => {
    setIsAddProfessional(false);
    let newId = idGen(10);
    setProfessionalDetails([
      {
        previousOrg: previousOrg,
        designation: designation,
        duration: duration,
        role: role,
        skills: skills,
        id: newId,
      },
      ...professionalDetails,
    ]);
    setPreviousOrg("");
    setDesignation("");
    setDuration(0);
    setRole("");
    setSkills("");
  };

  const onDeleteClickHandler = (data) => {
    setProfessionalDetails(
      professionalDetails.filter((filteredData) => filteredData.id !== data.id)
    );
  };

  return (
    <div className={styles.professional}>
      {professionalDetails.length
        ? professionalDetails.map((data) => {
            return (
              <div className={styles["professional-details-card"]}>
                <ul
                  style={{
                    margin: 0,
                  }}
                >
                  <li>
                    <strong>Previous Organization: </strong>
                    {data.previousOrg}
                  </li>
                  <li>
                    <strong>Designation: </strong>
                    {data.designation}
                  </li>
                  <li>
                    <strong>Duration of years: </strong>
                    {data.duration}
                  </li>
                  <li>
                    <strong>Role: </strong>
                    {data.role}
                  </li>
                  <li>
                    <strong>Skills: </strong>
                    {data.skills}
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
      {isAddProfessional ? (
        <form className={styles["form"]}>
          <input
            placeholder="Previous Organization you worked with"
            onChange={(e) => setPreviousOrg(e.target.value)}
          />
          <input
            placeholder="Designation"
            onChange={(e) => setDesignation(e.target.value)}
          />
          <input
            placeholder="Duration of years you worked"
            type="number"
            min={1}
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            placeholder="Your Role"
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            placeholder="Skills"
            onChange={(e) => setSkills(e.target.value)}
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
          onClick={() => setIsAddProfessional(true)}
        />
      )}
    </div>
  );
};

export default ProfessionalDetails;
