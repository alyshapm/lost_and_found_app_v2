import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Chip,
  Avatar,
  Card,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import BaseTable from "../../components/admin/BaseTable";
import users from "../../data/users";

function UserList() {
  const [personalInfoData, setPersonalInfoData] = useState([]);

  useEffect(() => {
    // Extract and flatten data for each user
    const extractedData = users.map((user) => ({
      ...user.personal_info, // Flatten all fields in `personal_info`
      joinedAt: user.joinedAt?.$date, // Flatten `joinedAt` date
      _id: user._id?.$oid, // Flatten `_id`
    }));
    setPersonalInfoData(extractedData);
    console.log("Before useEffect: ", extractedData);
  }, []);

  const columns = [
    {
      header: "Member",
      field: "name",
      render: (name, user) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatar || "/default-avatar.png"}
            alt={name || "Unknown"}
            className="h-10 w-10"
          />
          <div>
            <Typography variant="small" className="font-medium">
              {name || "Unknown Name"}
            </Typography>
            <Typography variant="small" color="gray" className="font-light">
              {user.email || "No Email"}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      header: "Program",
      field: "program",
      render: (program, user) => (
        <div>
          <Typography variant="small">
            {program || "Unknown Program"}
          </Typography>
          <Typography variant="small" color="gray">
            {user.address || "No Address"}
          </Typography>
        </div>
      ),
    },
    {
      header: "Role",
      field: "role",
      render: (role) => (
        <Chip
          size="sm"
          variant="ghost"
          color={role === 1 ? "green" : role === 2 ? "blue" : "amber"}
          value={role === 1 ? "ADMIN" : role === 2 ? "USER" : "STAFF"}
          className="uppercase font-bold"
        />
      ),
    },
    {
      header: "Status",
      field: "status",
      render: (status) => (
        <Chip
          size="sm"
          variant="ghost"
          color={status === "active" ? "green" : "gray"}
          value={status === "active" ? "ACTIVE" : "INACTIVE"}
          className="uppercase font-bold"
        />
      ),
    },
    {
      header: "Joined At",
      field: "joinedAt",
      render: (joinedAt) => (
        <Typography variant="small">
          {joinedAt ? new Date(joinedAt).toLocaleDateString() : "Unknown Date"}
        </Typography>
      ),
    },
    {
      header: "Actions",
      field: "actions",
      render: (_, user) => (
        <div className="flex space-x-2">
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => handleEdit(user)}
          >
            <PencilIcon className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="text"
            color="red"
            onClick={() => handleDelete(user)}
          >
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEdit = (user) => {
    // Edit user logic here
  };

  const handleDelete = (user) => {
    // Delete user logic here
  };

  return (
    <div className="">
      <Typography variant="h4" className="mb-4">
        User List
      </Typography>
      <Card>
        <BaseTable columns={columns} data={personalInfoData} />
      </Card>
    </div>
  );
}

export default UserList;
