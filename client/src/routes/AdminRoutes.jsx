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

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="found-items" element={<FoundItems />} />
        <Route path="claimed-items" element={<ClaimedItems />} />
        <Route path="user-list" element={<UserList />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="back-log" element={<BackLog />} />
        <Route path="meetings" element={<ActiveMeetings />} />
        <Route path="meetings-history" element={<MeetingsHistory />} />

        {/* Add routes for other pages */}
      </Route>
    </Routes>
  );
};
