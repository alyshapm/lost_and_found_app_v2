import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import AppLogo from "../../assets/app-logo.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar className="max-w-full rounded-none px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <img
            src={AppLogo}
            alt="Logo"
            href="#"
            className="h-10 inline-block mr-2"
          />
          <div className="ml-auto flex gap-1 md:mr-4">
            <Button variant="outlined" size="sm" className="ml-4">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button variant="gradient" size="sm">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </Navbar>

      <Outlet />
    </div>
  );
}
