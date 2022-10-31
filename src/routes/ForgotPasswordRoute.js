import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/Forgotpassword/ForgotPassword";
import PasswordRecover from "../pages/PasswordRecover/PasswordReset";

function ForgotPasswordRoute() {
  return (
    <Routes>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/passwordrecover" element={<PasswordRecover />} />
    </Routes>
  );
}

export default ForgotPasswordRoute;
