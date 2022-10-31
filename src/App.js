import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ForgotPasswordRoute from "./routes/ForgotPasswordRoute";
import LoginRoute from "./routes/LoginRoute";

const App = () => {
  return (
    <BrowserRouter>
      <LoginRoute />
      <AppRoutes />
      <ForgotPasswordRoute />
    </BrowserRouter>
  );
};

export default App;
