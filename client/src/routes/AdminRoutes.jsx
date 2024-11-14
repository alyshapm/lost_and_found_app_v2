import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import FoundItems from "../pages/admin/FoundItems";
import ClaimedItems from "../pages/admin/ClaimedItems";
import UserList from "../pages/admin/UserList";
import AdminProfile from "../pages/admin/AdminProfile";
import BackLog from "../pages/admin/BackLog";
import ActiveMeetings from "../pages/admin/ActiveMeetings";
import MeetingsHistory from "../pages/admin/MeetingsHistory";

import ProtectedUserRoutes from "./ProtectedUserRoutes";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="found-items" element={<FoundItems />} />
        <Route path="claimed-items" element={<ClaimedItems />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="meetings" element={<ActiveMeetings />} />
        <Route path="meetings-history" element={<MeetingsHistory />} />

        <Route
          path="back-log"
          element={
            <ProtectedUserRoutes allowedRoles={[3]}>
              <BackLog />
            </ProtectedUserRoutes>
          }
        />
        <Route
          path="user-list"
          element={
            <ProtectedUserRoutes allowedRoles={[3]}>
              <UserList />
            </ProtectedUserRoutes>
          }
        />

        {/* Add routes for other pages */}
      </Route>
    </Routes>
  );
};
