import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Avatar, Card } from "@material-tailwind/react";
import notifications from "../../data/notifications";

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);

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

  return (
    <div className="container mx-auto p-6">
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Notifications
      </Typography>
      <Card className="p-4 space-y-4">
        {notificationList.map((notification) => (
          <Link
            key={notification._id.$oid}
            to={getNotificationLink(notification.type)}
            onClick={() => handleMarkAsRead(notification._id.$oid)}
            className={`flex items-start gap-4 p-4 border-b ${
              notification.read ? "bg-gray-100" : "bg-white"
            }`}
          >
            <Avatar
              variant="circular"
              alt={notification.title}
              src="/placeholder.svg?height=48&width=48"
            />
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
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default Notifications;
