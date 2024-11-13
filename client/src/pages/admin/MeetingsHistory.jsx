// MeetingsHistory.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Chip, Card, Avatar } from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import { fetchMeetings } from "../../features/meeting/meetingSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";

const MeetingsHistory = () => {
  const dispatch = useDispatch();
  const { meetings } = useSelector((state) => state.meetings);
  const { allUsersInfor } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMeetings());
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  const filteredData = Array.isArray(meetings?.meetings)
    ? meetings.meetings
        .filter(
          (meeting) =>
            meeting.status === "rejected" || meeting.status === "completed"
        )
        .map((meeting) => {
          const claimer = allUsersInfor?.users?.find(
            (user) => user._id === meeting.user_id
          );
          return {
            ...meeting,
            claimer: claimer || null,
          };
        })
    : [];

  const columns = [
    { header: "Date", field: "meeting_date" },
    { header: "Location", field: "location" },
    {
      header: "Claimer",
      field: "claimer",
      render: (claimer) =>
        claimer ? (
          <div className="flex items-center gap-3">
            <Avatar
              src={claimer.personal_info.avatar || "/default-avatar.png"}
              alt={claimer.personal_info.name || "Unknown"}
              className="h-10 w-10"
            />
            <div>
              <Typography variant="small" className="font-medium">
                {claimer.personal_info.name || "Unknown Name"}
              </Typography>
              <Typography variant="small" color="gray" className="font-light">
                {claimer.personal_info.email || "No Email"}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="small" color="gray" className="font-light">
            No Claimer
          </Typography>
        ),
    },
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
        <BaseTable columns={columns} data={filteredData} />
      </Card>
    </div>
  );
};

export default MeetingsHistory;
