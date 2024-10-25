import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeLayout from "../pages/home/HomeLayout";
import { Home } from "../pages/home/Home";
import { Signin } from "../pages/auth/Signin";
import { Signup } from "../pages/auth/Signup";

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Signin />} />
        <Route path="sign-up" element={<Signup />} />
      </Route>
    </Routes>
  );
};
