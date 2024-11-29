import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Avatar, Card } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../features/notifications/notificationsSlice";
import { formatDateTime } from "../../utils/formatDate";

const Notifications = () => {
  const [notificationList, setNotificationList] = useState([]);
  const { notifications } = useSelector((state) => state.notifications);
  const { userInfor } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications && userInfor) {
      const filteredNotifications = notifications.filter(
        (notification) => notification.user_id === userInfor._id
      );

      // Sort notifications by 'created_at' in descending order
      const sortedNotifications = filteredNotifications.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setNotificationList(sortedNotifications);
    }
  }, [notifications, userInfor]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead());
    setNotificationList((prevList) =>
      prevList.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
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
            key={notification._id}
            to={getNotificationLink(notification.type)}
            onClick={() => handleMarkAsRead(notification._id)}
            className={`flex items-start gap-4 p-4 border-b ${
              notification.read ? "bg-gray-100" : "bg-white"
            }`}
          >
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
              {/* Add the formatted date and time below */}
              <Typography
                variant="caption"
                color="gray"
                className="text-xs mt-1"
              >
                {formatDateTime(notification.created_at)}
              </Typography>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default Notifications;
