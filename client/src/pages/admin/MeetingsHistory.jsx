// MeetingsHistory.jsx
import React from "react";
import { Typography, Chip, Card } from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import meetings from "../../data/meetings";

const MeetingsHistory = () => {
  const historyData = meetings.filter(
    (meeting) => meeting.status === "rejected" || meeting.status === "completed"
  );

  const columns = [
    { header: "Date", field: "meeting_date" },
    { header: "Location", field: "location" },
    {
      header: "Status",
      field: "status",
      render: (status) => (
        <Chip
          size="sm"
          variant="ghost"
          color={status === "completed" ? "green" : "red"}
          value={status.toUpperCase()}
          className="uppercase font-bold w-max"
        />
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Meetings History
      </Typography>
      <Card>
        <BaseTable columns={columns} data={historyData} />
      </Card>
    </div>
  );
};

export default MeetingsHistory;
