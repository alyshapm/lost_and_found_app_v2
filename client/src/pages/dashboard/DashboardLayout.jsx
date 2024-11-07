import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  Button,
} from "@material-tailwind/react";
import {
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import AppLogo from "../../assets/app-logo.png";
import notifications from "../../data/notifications";

function DashboardLayout() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMarkAsRead = (id) => {
    setNotificationList((prevList) =>
      prevList.map((notification) =>
        notification._id.$oid === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getNotificationLink = (type) => {
    if (type === "verification_request") return "/dashboard/found-items";
    if (type === "meeting_completed") return "/dashboard/claimed-items";
    return null;
  };

  const displayedNotifications = notificationList.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar className="max-w-full rounded-none px-4 py-3">
        <div className="flex items-center justify-between gap-y-4 text-blue-gray-900">
          <img src={AppLogo} alt="Logo" className="h-10 mr-2" />
          <div className="ml-auto flex gap-1">
            {/* Notification Icon with Badge */}
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <Badge
                    content={
                      notificationList.filter(
                        (notification) => !notification.read
                      ).length
                    }
                    withBorder
                  >
                    <BellIcon className="h-5 w-5" />
                  </Badge>
                </IconButton>
              </MenuHandler>
              <MenuList className="flex flex-col gap-2 w-80">
                {displayedNotifications.map((notification) => (
                  <Link
                    key={notification._id.$oid}
                    to={getNotificationLink(notification.type)}
                    onClick={() => handleMarkAsRead(notification._id.$oid)}
                    className={`flex flex-col gap-2 p-4 border-b ${
                      notification.read ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-semibold"
                        >
                          {notification.title}
                        </Typography>
                        <Typography className="text-sm text-blue-gray-500">
                          {notification.message}
                        </Typography>
                        {(notification.type === "verification_request" ||
                          notification.type === "meeting_completed") && (
                          <Typography variant="small" color="blue">
                            Click here to verify
                          </Typography>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {notificationList.length > 3 && (
                  <Link
                    to="/dashboard/notifications"
                    className="text-blue-600 text-center py-2"
                  >
                    See All Notifications
                  </Link>
                )}
              </MenuList>
            </Menu>

            {/* Profile Menu */}
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
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2">
                  <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-normal">
                    <Link to="/dashboard/profile">My Profile</Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Link to="/dashboard/claimed-items">Claimed Items</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/dashboard/found-items">Found Items</Link>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem>Sign Out</MenuItem>
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
