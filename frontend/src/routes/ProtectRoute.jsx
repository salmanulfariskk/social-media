import React from "react";
import { Navigate } from "react-router-dom";

function ProtectRoute(props) {
  if (localStorage.getItem('user')) {
    return props.children;
  }
  return <Navigate to={"/login"} />;
}

export default ProtectRoute;
