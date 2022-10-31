import React, { useEffect, useState } from "react";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MentorPov.module.css";
import Search from "../../components/search/Search";
import JoinMeet from "../../components/Join meet/JoinMeet";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UpcomingMeeting from "../../components/UpcomingMeeting/UpcomingMeeting";
import { useSelector } from "react-redux";

const MentorPOV = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const userData = useSelector((state) => state.user.userData);
  console.log(userData.Appointment_request, "userData");

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const meetings = [
    {
      date: "24th September",
      with: "Dr. Simon",
    },
    {
      date: "28th September",
      with: "Dr. Jay",
    },
    {
      date: "30th September",
      with: "Dr. Vinna",
    },
  ];

  return (
    <>
      <PhnSidebar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            {/* <Search />
            <JoinMeet /> */}
            <div className={styles.meetsNCal}>
              <div
                className={styles.meets}
                style={{ backgroundColor: "rgba(246, 246, 246, 0.75)" }}
              >
                <h3>Meetings</h3>
                {userData && userData.Appointment_request.length == 0 ? (
                  <div>
                    <h3 className={styles.no_meetings}>
                      You Have No Upcoming meetings
                    </h3>
                  </div>
                ) : (
                  <div>
                    {userData &&
                      userData.Appointment_request.map((m, index) => (
                        <UpcomingMeeting
                          key={index + Math.random()}
                          date={m.date}
                          email={m.with}
                        />
                      ))}
                  </div>
                )}
              </div>
              <div className={styles.calender}>
                <h1>Calender</h1>
                <Calender
                  className={styles.cal}
                  style={{
                    boder: "none",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                />
                <div className={styles.meetSch}>
                  <h3>Schedule</h3>
                  {userData && userData.meetings.length > 0 ? (
                    <div>
                      {userData &&
                        userData.meetings.map((item, index) => (
                          <p>
                            {item.date} <span>meeting with {item.with}</span>
                          </p>
                        ))}
                    </div>
                  ) : (
                    <p>No Meeting Schedule</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorPOV;
