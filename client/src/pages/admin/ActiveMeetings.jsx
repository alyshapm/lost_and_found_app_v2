import React, { useState } from "react";
import {
  Typography,
  Button,
  Chip,
  Card,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import BaseTable from "../../components/admin/BaseTable";
import meetings from "../../data/meetings";

const ActiveMeetings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [meetingData, setMeetingData] = useState(
    meetings.filter(
      (meeting) =>
        meeting.status === "submitted" || meeting.status === "approved"
    )
  );

  const filteredData = meetingData.filter((meeting) => {
    const query = searchQuery.toLowerCase();
    return (
      meeting.meeting_date.toLowerCase().includes(query) ||
      meeting.location.toLowerCase().includes(query)
    );
  });

  const handleApprove = (id) => {
    setMeetingData((prev) =>
      prev.map((meeting) =>
        meeting._id.$oid === id ? { ...meeting, status: "approved" } : meeting
      )
    );
  };

  const handleReject = (id) => {
    setMeetingData((prev) => prev.filter((meeting) => meeting._id.$oid !== id));
  };

  const handleComplete = (id) => {
    setMeetingData((prev) =>
      prev.map((meeting) =>
        meeting._id.$oid === id ? { ...meeting, status: "completed" } : meeting
      )
    );
  };

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
          color={
            status === "submitted"
              ? "amber"
              : status === "approved"
              ? "green"
              : "gray"
          }
          value={status.toUpperCase()}
          className="uppercase font-bold w-max"
        />
      ),
    },
    {
      header: "Actions",
      field: "actions",
      render: (_, meeting) => (
        <div className="gap-2">
          {meeting.status === "submitted" && (
            <>
              <Button
                variant="text"
                color="green"
                onClick={() => handleApprove(meeting._id.$oid)}
                className="text-xs"
              >
                Approve
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={() => handleReject(meeting._id.$oid)}
                className="text-xs"
              >
                Reject
              </Button>
            </>
          )}
          {meeting.status === "approved" && (
            <>
              <Button
                variant="text"
                color="blue"
                onClick={() => handleComplete(meeting._id.$oid)}
                className="text-xs"
              >
                Complete
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={() => handleReject(meeting._id.$oid)}
                className="text-xs"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" color="blue-gray">
          Active Meetings
        </Typography>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-4 bg-white shadow-md"
            icon={<MagnifyingGlassIcon />}
          />
        </div>
      </div>
      <Card>
        <BaseTable columns={columns} data={filteredData} />
      </Card>
    </div>
  );
};

export default ActiveMeetings;
