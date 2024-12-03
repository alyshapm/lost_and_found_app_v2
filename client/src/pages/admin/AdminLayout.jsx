import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Avatar,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  UsersIcon,
  ListBulletIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";

import { logout } from "../../features/auth/authSlice";

const ROLE = {
  GENERAL_USER: 5,
  STAFF: 4,
  ROOT_ADMIN: 3,
};

function AdminLayout() {
  const { userInfor } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navItems = [
    { icon: PresentationChartBarIcon, label: "Dashboard", path: "/admin" },
    { icon: ShoppingBagIcon, label: "Found Items", path: "/admin/found-items" },
    {
      icon: InboxIcon,
      label: "Claimed Items",
      path: "/admin/claimed-items",
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      label: "Active Meetings",
      path: "/admin/meetings",
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      label: "Meetings History",
      path: "/admin/meetings-history",
    },
    { icon: UsersIcon, label: "User List", path: "/admin/user-list" },
    { icon: ListBulletIcon, label: "Back Log", path: "/admin/back-log" },
    { icon: UserCircleIcon, label: "Profile", path: "/admin/profile" },
  ];

  const Header = () => (
    <div className="w-full bg-white shadow-md px-4 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          {isSmallScreen && (
            <IconButton
              variant="text"
              color="blue-gray"
              className="mr-2"
              onClick={toggleSidebar}
            >
              <Bars3Icon className="h-6 w-6" />
            </IconButton>
          )}
        </div>
        <div className="flex items-center gap-4">
          {userInfor?.personal_info ? (
            <div className="flex items-center gap-2">
              <Avatar
                size="sm"
                variant="circular"
                alt={userInfor.personal_info.name || "Admin"}
                src={userInfor.personal_info.avatar || "/default-avatar.png"}
                className="border border-blue-500 p-0.5"
              />
              <Typography color="blue-gray">
                {userInfor.personal_info.name || "Admin"}
              </Typography>
            </div>
          ) : (
            <Typography color="blue-gray">Loading...</Typography>
          )}
        </div>
      </div>
    </div>
  );

  const Sidebar = () => {
    const filteredNavItems = navItems.filter((item) => {
      if (
        user.selectedRole === ROLE.STAFF &&
        (item.label === "User List" || item.label === "Back Log")
      ) {
        return false;
      }
      return true;
    });

    return (
      <div className="lg:static min-h-screen bg-white shadow-lg w-64">
        <div className="p-4 border-b">
          <Typography variant="h5" color="blue-gray">
            Lost and Found Dashboard
          </Typography>
        </div>
        <List>
          {filteredNavItems.map((item, index) => (
            <ListItem
              key={index}
              selected={location.pathname === item.path}
              className="mb-1"
            >
              <Link to={item.path} className="flex items-center w-full">
                <ListItemPrefix>
                  <item.icon className="h-5 w-5" />
                </ListItemPrefix>
                {item.label}
                {item.badge && (
                  <ListItemSuffix>
                    <Chip
                      value={item.badge}
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                )}
              </Link>
            </ListItem>
          ))}
          <ListItem onClick={handleLogout} className="mt-auto">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {!isSmallScreen && <Sidebar />}

      {isSmallScreen && (
        <Drawer
          open={isSidebarOpen}
          onClose={toggleSidebar}
          className="p-0 fixed left-0 h-screen w-64"
          overlay={true}
        >
          <Sidebar />
        </Drawer>
      )}

      <div className="flex flex-col flex-grow h-screen">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
