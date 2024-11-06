import React, { useState, useEffect } from "react";
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
} from "@heroicons/react/24/solid";

function AdminLayout() {
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

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/login");
  };

  const navItems = [
    { icon: PresentationChartBarIcon, label: "Dashboard", path: "/admin" },
    { icon: ShoppingBagIcon, label: "Found Items", path: "/admin/found-items" },
    {
      icon: InboxIcon,
      label: "Claimed Items",
      path: "/admin/claimed-items",
      badge: 14,
    },
    { icon: UsersIcon, label: "User List", path: "/admin/user-list" },
    { icon: ListBulletIcon, label: "Back Log", path: "/admin/back-log" },
    { icon: UserCircleIcon, label: "Profile", path: "/admin/profile" },
  ];

  const Sidebar = () => (
    <div className="h-full bg-white shadow-lg">
      <div className="p-4 border-b">
        <Typography variant="h5" color="blue-gray">
          Admin Dashboard
        </Typography>
      </div>
      <List>
        {navItems.map((item, index) => (
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Persistent Sidebar for larger screens */}
      {!isSmallScreen && (
        <div className="w-64 hidden lg:block">
          <Sidebar />
        </div>
      )}

      {/* Collapsible Sidebar for smaller screens */}
      {isSmallScreen && (
        <Drawer
          open={isSidebarOpen}
          onClose={toggleSidebar}
          className="p-0 fixed left-0 h-screen"
          overlay={true}
        >
          <Sidebar />
        </Drawer>
      )}

      <div className="flex-1 flex flex-col">
        <Navbar className="max-w-full rounded-none px-4 py-3 mx-auto">
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
              <Typography
                as="a"
                href="#"
                className="mr-4 cursor-pointer py-1.5 font-medium"
              >
                Lost and Found Admin
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2">
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="John Doe"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-blue-500 p-0.5"
                />
                <Typography color="blue-gray">John Doe</Typography>
              </div>
            </div>
          </div>
        </Navbar>

        {/* Page Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
