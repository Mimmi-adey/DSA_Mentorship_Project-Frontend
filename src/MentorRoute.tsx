import React from "react";
import { Navigate } from "react-router-dom";

const MentorRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("role");

  if (role !== "mentor") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default MentorRoute;