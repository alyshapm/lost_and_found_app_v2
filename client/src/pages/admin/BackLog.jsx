import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, Chip } from "@material-tailwind/react";
import { fetchAllNotifications } from "../../features/notifications/notificationsSlice";
import BaseTable from "../../components/admin/BaseTable";
import TableControls from "../../components/admin/TableControls";

const BackLog = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector(
    (state) => state.notifications
  );

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    read: "",
  });

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [notifications, searchQuery, filters]);

  const notificationTypeColors = {
    claim_initiated: "blue",
    claim_under_review: "amber",
    meeting_approved: "green",
    meeting_rejected: "red",
    item_claimed: "blue-gray",
    verification_request: "teal",
    meeting_completed: "cyan",
  };

  const applyFilters = () => {
    const filteredData = notifications
      .filter((notification) =>
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((notification) =>
        filters.type ? notification.type === filters.type : true
      )
      .filter((notification) =>
        filters.read !== ""
          ? notification.read === (filters.read === "true")
          : true
      );

    setFilteredNotifications(filteredData);
  };

  const handleSearch = (query) => setSearchQuery(query);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleDownload = () => {
    console.log("Download data:", filteredNotifications);
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
          className="uppercase font-bold w-max"
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
          className="uppercase font-bold w-max"
        />
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Notifications Back Log
      </Typography>

      {/* Table Controls */}
      <TableControls
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onDownload={handleDownload}
        filters={[
          {
            name: "type",
            label: "Type",
            options: [
              { value: "", label: "All" },
              { value: "claim_initiated", label: "Claim Initiated" },
              { value: "claim_under_review", label: "Claim Under Review" },
              { value: "meeting_approved", label: "Meeting Approved" },
              { value: "meeting_rejected", label: "Meeting Rejected" },
              { value: "item_claimed", label: "Item Claimed" },
              { value: "verification_request", label: "Verification Request" },
              { value: "meeting_completed", label: "Meeting Completed" },
            ],
          },
          {
            name: "read",
            label: "Status",
            options: [
              { value: "", label: "All" },
              { value: "true", label: "Read" },
              { value: "false", label: "Unread" },
            ],
          },
        ]}
      />

      <Card>
        {isLoading ? (
          <Typography variant="small" color="gray" className="text-center">
            Loading...
          </Typography>
        ) : (
          <BaseTable columns={columns} data={filteredNotifications} />
        )}
      </Card>
    </div>
  );
};

export default BackLog;
