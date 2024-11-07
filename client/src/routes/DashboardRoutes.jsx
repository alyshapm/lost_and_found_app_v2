import React from "react";
import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ClaimedItems from "../pages/dashboard/ClaimedItems";
import FoundItems from "../pages/dashboard/FoundItems";
import Profile from "../pages/dashboard/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import Notifications from "../pages/dashboard/Notifications";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="claimed-items" element={<ClaimedItems />} />
        <Route path="found-items" element={<FoundItems />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};
