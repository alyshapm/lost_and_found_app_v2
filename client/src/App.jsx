import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomeRoutes } from "./routes/HomeRoutes";
import { DashboardRoutes } from "./routes/DashboardRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}
