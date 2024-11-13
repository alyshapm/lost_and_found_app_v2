import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMeetings,
  approveMeeting,
  completeMeeting,
  rejectMeeting,
} from "../../features/meeting/meetingSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";
import {
  Typography,
  Button,
  Chip,
  Card,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import BaseTable from "../../components/admin/BaseTable";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

const ActiveMeetings = () => {
  const dispatch = useDispatch();
  const { meetings } = useSelector((state) => state.meetings);
  const { allUsersInfor } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [actionType, setActionType] = useState(""); // Track which action is being confirmed
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMeetings());
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  const filteredData = Array.isArray(meetings?.meetings)
    ? meetings.meetings
        .filter(
          (meeting) =>
            meeting.status === "submitted" || meeting.status === "approved"
        )
        .map((meeting) => {
          // Find claimer info based on user_id in each meeting
          const claimer = allUsersInfor?.users?.find(
            (user) => user._id === meeting.user_id
          );
          return {
            ...meeting,
            claimer: claimer || null, // Add claimer info to each meeting
          };
        })
        .filter((meeting) => {
          const query = searchQuery.toLowerCase();
          return (
            meeting.meeting_date.toLowerCase().includes(query) ||
            meeting.location.toLowerCase().includes(query)
          );
        })
    : [];

  // const handleApprove = (id) => {
  //   dispatch(approveMeeting(id));
  // };

  // const handleReject = (id) => {
  //   dispatch(rejectMeeting(id));
  // };

  // const handleComplete = (id) => {
  //   dispatch(completeMeeting(id));
  // };

  const openConfirmationDialog = (meetingId, action) => {
    setSelectedMeetingId(meetingId);
    setActionType(action);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedMeetingId) return;

    switch (actionType) {
      case "approve":
        dispatch(approveMeeting(selectedMeetingId)).then(() =>
          dispatch(fetchMeetings())
        ); // Refresh table after action
        break;
      case "complete":
        dispatch(completeMeeting(selectedMeetingId)).then(() =>
          dispatch(fetchMeetings())
        ); // Refresh table after action
        break;
      case "reject":
        dispatch(rejectMeeting(selectedMeetingId)).then(() =>
          dispatch(fetchMeetings())
        ); // Refresh table after action
        break;
      default:
        break;
    }

    setIsConfirmDialogOpen(false);
    setSelectedMeetingId(null);
    setActionType("");
  };

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
                onClick={() => openConfirmationDialog(meeting._id, "approve")}
                className="text-xs"
              >
                Approve
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={() => openConfirmationDialog(meeting._id, "reject")}
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
                onClick={() => openConfirmationDialog(meeting._id, "complete")}
                className="text-xs"
              >
                Complete
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={() => openConfirmationDialog(meeting._id, "reject")}
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

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmAction}
        message={`Are you sure you want to ${actionType} this meeting?`}
      />
    </div>
  );
};

export default ActiveMeetings;
