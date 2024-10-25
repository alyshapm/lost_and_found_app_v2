import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import {
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import AppLogo from "../../assets/app-logo.png";

function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar className="max-w-full rounded-none px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <img
            src={AppLogo}
            as={Link}
            to="/dashboard"
            alt="Logo"
            href="#"
            className="h-10 inline-block mr-2"
          />
          {/* <Typography
            as={Link}
            to="/dashboard"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            BINUS Lost and Found
          </Typography> */}
          <div className="ml-auto flex gap-1 md:mr-4">
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <Badge content="5" withBorder>
                    <BellIcon className="h-4 w-4" />
                  </Badge>
                </IconButton>
              </MenuHandler>
              <MenuList className="flex flex-col gap-2">
                <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                  <Avatar
                    variant="circular"
                    alt="New item"
                    src="/placeholder.svg?height=48&width=48"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      New item found: Blue Backpack
                    </Typography>
                    <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                      13 minutes ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                  <Avatar
                    variant="circular"
                    alt="Item claimed"
                    src="/placeholder.svg?height=48&width=48"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-semibold"
                    >
                      Your item "Textbook" has been claimed
                    </Typography>
                    <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                      2 hours ago
                    </Typography>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="User"
                    className="border border-blue-500 p-0.5"
                    src="/placeholder.svg?height=32&width=32"
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2">
                  <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-normal">
                    <Link to="/dashboard/profile">My Profile</Link>
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <Typography variant="small" className="font-normal">
                    <Link to="/dashboard/claimed-items">Claimed Items</Link>
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <Typography variant="small" className="font-normal">
                    <Link to="/dashboard/found-items">Found Items</Link>
                  </Typography>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 ">
                  <Typography variant="small" className="font-normal">
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
