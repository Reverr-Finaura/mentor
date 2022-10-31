import React, { useCallback, useEffect, useState } from "react";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/search/Search";
import styles from "./Calender.module.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, getMentorFromDatabase } from "../../firebase/firebase";
import { updateUserInDatabse } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";
import { setUserData } from "../../features/userSlice";

const Calender = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [fetchedMentor, setFetchedMentor] = useState("");
  const userData = useSelector((state) => state.user.userData);
  const [weekDays, setWeekDays] = useState([]);
  const dispatch = useDispatch();
  // console.log(userData, "userData");
  // console.log(userData.availability, "availabilityArray");
  // ["0", "0", "0", "0", "0", "0", "0"];
  // const [availabilityTime, setAvailabilityTime] = useState({
  //   availableFrom: "09:00",
  //   availableTill: "17:00",
  // });

  // const selectStartTime = (e) => {
  //   setAvailabilityTime((prevState) => {
  //     return { ...prevState, availableFrom: e.target.value };
  //   });
  //   console.log(availabilityTime);
  // };

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const modifyAvaiblity = async (index, status) => {
    let availabilityArray = [...userData?.availability];
    for (let i = 0; i < availabilityArray.length; i++) {
      availabilityArray[index] = status === "0" ? "1" : "0";
    }
    console.log(availabilityArray, "availabilityArray");
    const docRef = doc(db, "Users", userData?.email);
    await updateDoc(docRef, {
      availability: availabilityArray,
    });
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setUserData(docSnap.data()));
    }
  };

  return (
    <>
      <PhnSidebar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            {/* <Search /> */}
            <div className={styles.schedule_container}>
              <h1>Set your availability</h1>
              <p>
                Let us know when you’re typically available to accept meetings.
              </p>
              <hr className={styles.hr} />
              <h3 className={styles.text}>Available Hours</h3>
              <div className={styles.hours}>
                <select name="hours" id="" className={styles.starthr}>
                  <option value="">09:00</option>
                  <option value="">10:00</option>
                  <option value="">12:00</option>
                  <option value="">13:00</option>
                  <option value="">14:00</option>
                  <option value="">15:00</option>
                  <option value="">16:00</option>
                </select>
                <select name="hours" id="" className={styles.endhr}>
                  <option value="">10:00</option>
                  <option value="">12:00</option>
                  <option value="">13:00</option>
                  <option value="">14:00</option>
                  <option value="">15:00</option>
                  <option value="">16:00</option>
                  <option value="">17:00</option>
                  <option value="">18:00</option>
                  <option value="">19:00</option>
                </select>
              </div>
              <h3 className={styles.text}>Available days</h3>
              <div className={styles.days}>
                {userData?.availability?.length > 0 &&
                  userData.availability.map((item, index) => (
                    <div className={styles.days}>
                      {index === 0 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(0, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Sunday
                        </button>
                      )}
                      {index === 1 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(1, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Monday
                        </button>
                      )}
                      {index === 2 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(2, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Tuesday
                        </button>
                      )}
                      {index === 3 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(3, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Wednesday
                        </button>
                      )}
                      {index === 4 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(4, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Thursday
                        </button>
                      )}
                      {index === 5 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(5, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Friday
                        </button>
                      )}
                      {index === 6 && (
                        <button
                          onClick={() => {
                            modifyAvaiblity(6, item);
                          }}
                          style={{
                            backgroundColor: item !== "0" && "#2a72de",
                            color: item !== "0" && "white",
                          }}
                        >
                          Saturday
                        </button>
                      )}
                    </div>
                  ))}
              </div>
              <button
                // onClick={updateAvailability}
                className={styles.confirmBtn}
              >
                Confirm
              </button>
              <p className={styles.info}>
                Don’t worry! You’ll be able to further customize your
                availability later on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
