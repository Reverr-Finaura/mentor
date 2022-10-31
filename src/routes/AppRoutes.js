import React from "react";
import { Route, Routes } from "react-router-dom";
import Calender from "../pages/Calender/Calender";
import MentorPOV from "../pages/Mentor pov/MentorPOV";
import Transaction from "../pages/Transaction/Transaction";
import Login from "../pages/Login/Login";
import MyProfile from "../pages/MyProfile/MyProfile";
import EditProfile from "../pages/EditProfile/EditProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<MentorPOV />} />
      <Route path="/schedule" element={<Calender />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
};

export default AppRoutes;
