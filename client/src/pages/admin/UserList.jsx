import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Chip,
  Avatar,
  Card,
} from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import EditUserDialog from "../../components/admin/EditUserDialog";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import users from "../../data/users";

function UserList() {
  const [personalInfoData, setPersonalInfoData] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    // Logic to update the user data in the backend or state
    console.log("Updated User:", updatedUser);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    // Logic to delete the user, e.g., calling API or updating state
    console.log("Deleting user:", userToDelete);
  };

  useEffect(() => {
    // Extract and flatten data for each user
    const extractedData = users.map((user) => ({
      ...user.personal_info, // Flatten all fields in `personal_info`
      joinedAt: user.joinedAt?.$date, // Flatten `joinedAt` date
      _id: user._id?.$oid, // Flatten `_id`
    }));
    setPersonalInfoData(extractedData);
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
          className="uppercase font-bold w-max"
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
            color="blue"
            onClick={() => handleEditClick(user)}
          >
            <PencilIcon className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="text"
            color="red"
            onClick={() => handleDeleteClick(user)}
          >
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Typography variant="h4" className="mb-4">
        User List
      </Typography>
      <Card>
        <BaseTable columns={columns} data={personalInfoData} />
      </Card>

      <EditUserDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete "${userToDelete?.name}"?`}
      />
    </div>
  );
}

export default UserList;
