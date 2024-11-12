import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { HomeRoutes } from "./routes/HomeRoutes";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersInfor, getUserInfor } from "./features/user/userSlice";
import { accessToken } from "./features/token/tokenSlice";
import ProtectedUserRoutes from "./common/ProtectedUserRoutes";
import Unauthorized from "./common/Unauthorized";
import RoleSelection from "./pages/auth/RoleSelection";

export default function App() {
  const { user, isLoggedOut } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedOut && user) {
      dispatch(getUserInfor()).then((res) => {
        // console.log(res)
        dispatch(accessToken());
      });
    }
  }, [isLoggedOut, dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedUserRoutes allowedRoles={[3, 4, 5]}>
              <DashboardRoutes />
            </ProtectedUserRoutes>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedUserRoutes allowedRoles={[3, 4]}>
              <AdminRoutes />
            </ProtectedUserRoutes>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/select-role" element = {<RoleSelection/>}/>
      </Routes>
    </Router>
  );
}
