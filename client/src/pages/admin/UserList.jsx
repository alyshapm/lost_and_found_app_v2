import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllUsersInfor } from "../../features/user/userSlice";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import users from "../../data/users";

function UserList() {
  const dispatch = useDispatch();
  const { allUsersInfor } = useSelector((state) => state.user);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Dispatch action to fetch all users from the backend
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  const personalInfoData = Array.isArray(allUsersInfor?.users)
    ? allUsersInfor.users.map((user) => ({
        ...user.personal_info,
        joinedAt: user.joinedAt,
        _id: user._id,
      }))
    : [];

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const refreshUserList = () => {
    dispatch(getAllUsersInfor());
  };

  const handleSaveUser = (updatedUser) => {
    refreshUserList(); // Trigger refresh after saving
  };

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
      render: (role) => {
        const roleLabels = {
          5: { label: "GENERAL USER", color: "green" },
          4: { label: "STAFF", color: "amber" },
          3: { label: "ROOT ADMIN", color: "blue" },
        };

        // Convert single role integer to an array if necessary
        const rolesArray = Array.isArray(role) ? role : [role];

        return (
          <div className="flex flex-wrap gap-1">
            {rolesArray.map((roleId) => (
              <Chip
                key={roleId}
                size="sm"
                variant="ghost"
                color={roleLabels[roleId]?.color || "gray"}
                value={roleLabels[roleId]?.label || "UNKNOWN"}
                className="uppercase font-bold"
              />
            ))}
          </div>
        );
      },
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
    </div>
  );
}

export default UserList;
