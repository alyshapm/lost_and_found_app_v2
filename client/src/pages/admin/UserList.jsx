import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Typography,
  IconButton,
  Chip,
  Avatar,
  Card,
} from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import TableControls from "../../components/admin/TableControls";
import EditUserDialog from "../../components/admin/EditUserDialog";
import { getAllUsersInfor } from "../../features/user/userSlice";
import { PencilIcon } from "@heroicons/react/24/solid";

function UserList() {
  const dispatch = useDispatch();
  const { allUsersInfor } = useSelector((state) => state.user);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    role: "",
  });

  useEffect(() => {
    if (!isEditDialogOpen) {
      dispatch(getAllUsersInfor());
    }
  }, [isEditDialogOpen, dispatch]);

  console.log("All users:", allUsersInfor);

  const personalInfoData = useMemo(() => {
    return Array.isArray(allUsersInfor?.users)
      ? allUsersInfor.users
          .map((user) => ({
            ...user.personal_info,
            joinedAt: user.joinedAt,
            _id: user._id,
            status: user.personal_info.status, // Adding status to data for filtering
            role: user.personal_info.role, // Adding role to data for filtering
          }))
          .filter((user) => {
            const query = searchQuery.toLowerCase();
            return (
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query)
            );
          })
          .filter((user) =>
            filters.status ? user.personal_info.status === filters.status : true
          )
          .filter((user) =>
            filters.role
              ? user.personal_info.role.includes(parseInt(filters.role))
              : true
          )
      : [];
  }, [allUsersInfor, searchQuery, filters]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSearch = (query) => setSearchQuery(query);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleDownload = () => {
    console.log("Download data:", personalInfoData);
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
          5: { label: "GENERAL USER", color: "purple" },
          4: { label: "STAFF", color: "amber" },
          3: { label: "ROOT ADMIN", color: "blue" },
        };

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
    <div>
      <Typography variant="h4" className="mb-4">
        User List
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
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
          {
            name: "role",
            label: "Role",
            options: [
              { value: "", label: "All" },
              { value: "5", label: "General User" },
              { value: "4", label: "Staff" },
              { value: "3", label: "Root Admin" },
            ],
          },
        ]}
      />

      <Card>
        <BaseTable columns={columns} data={personalInfoData} />
      </Card>

      <EditUserDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        user={selectedUser}
        refreshUserList={() => dispatch(getAllUsersInfor())}
      />
    </div>
  );
}

export default UserList;
