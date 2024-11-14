import React, { useState, useEffect, useMemo } from "react";
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
  Avatar,
} from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import TableControls from "../../components/admin/TableControls";

const ActiveMeetings = () => {
  const dispatch = useDispatch();
  const { meetings } = useSelector((state) => state.meetings);
  const { allUsersInfor } = useSelector((state) => state.user);

  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [actionType, setActionType] = useState(""); // Track which action is being confirmed
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [filters, setFilters] = useState({}); // Stores filter selections
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input

  useEffect(() => {
    dispatch(fetchMeetings());
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  // Filter and search meetings based on searchQuery and filters
  const filteredData = useMemo(() => {
    return Array.isArray(meetings?.meetings)
      ? meetings.meetings
          .filter(
            (meeting) =>
              meeting.status === "submitted" || meeting.status === "approved"
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
          .filter((meeting) => {
            const query = searchQuery.toLowerCase();
            return (
              meeting.meeting_date.toLowerCase().includes(query) ||
              meeting.location.toLowerCase().includes(query)
            );
          })
          .filter((meeting) =>
            filters.status ? meeting.status === filters.status : true
          )
      : [];
  }, [meetings, allUsersInfor, searchQuery, filters]);

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
        );
        break;
      case "complete":
        dispatch(completeMeeting(selectedMeetingId)).then(() =>
          dispatch(fetchMeetings())
        );
        break;
      case "reject":
        dispatch(rejectMeeting(selectedMeetingId)).then(() =>
          dispatch(fetchMeetings())
        );
        break;
      default:
        break;
    }

    setIsConfirmDialogOpen(false);
    setSelectedMeetingId(null);
    setActionType("");
  };

  const handleSearch = (query) => setSearchQuery(query);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleDownload = () => {
    console.log("Download data:", filteredData);
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
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Active Meetings
      </Typography>

      <TableControls
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onDownload={handleDownload}
        filters={[
          {
            name: "status",
            label: "Status",
            options: [
              { value: "", label: "All" },
              { value: "submitted", label: "Submitted" },
              { value: "approved", label: "Approved" },
            ],
          },
        ]}
      />

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
