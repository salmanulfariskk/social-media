import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserProfilePage from "../pages/UserProfilePage";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import AddPost from "../pages/AddPost";
import PublicRoute from "./publicRoute";
import ProtectRoute from "./protectRoute";
function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProtectRoute><UserProfilePage /></ProtectRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/add-post" element={<ProtectRoute><AddPost /></ProtectRoute>} />
    </Routes>
  );
}

export default MainRoute;
