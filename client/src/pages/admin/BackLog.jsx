import React from "react";
import { Typography, Card, Chip } from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import notifications from "../../data/notifications";

const BackLog = () => {
  const notificationTypeColors = {
    claim_initiated: "blue",
    claim_under_review: "amber",
    meeting_approved: "green",
    meeting_rejected: "red",
    item_claimed: "blue-gray",
    verification_request: "teal",
    meeting_completed: "cyan",
  };

  const columns = [
    {
      header: "Message",
      field: "message",
      render: (message) => (
        <Typography variant="small" color="gray" className="font-light">
          {message}
        </Typography>
      ),
    },
    {
      header: "Type",
      field: "type",
      render: (type) => (
        <Chip
          size="sm"
          variant="ghost"
          color={notificationTypeColors[type] || "gray"}
          value={type.replace(/_/g, " ").toUpperCase()}
          className="uppercase font-bold"
        />
      ),
    },
    {
      header: "Created At",
      field: "created_at",
      render: (created_at) => (
        <Typography variant="small" color="gray">
          {new Date(created_at).toLocaleDateString()}{" "}
          {new Date(created_at).toLocaleTimeString()}
        </Typography>
      ),
    },
    {
      header: "Status",
      field: "read",
      render: (read) => (
        <Chip
          size="sm"
          variant="ghost"
          color={read ? "green" : "red"}
          value={read ? "READ" : "UNREAD"}
          className="uppercase font-bold"
        />
      ),
    },
  ];

  return (
    <div className="">
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Notifications Back Log
      </Typography>
      <Card className="">
        <BaseTable columns={columns} data={notifications} />
      </Card>
    </div>
  );
};

export default BackLog;
