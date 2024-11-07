import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Checkbox,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";

const EditUserDialog = ({ isOpen, onClose, user, onSave }) => {
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState(user?.status || "active");

  // Store initial values to detect changes
  const [initialRoles, setInitialRoles] = useState([]);
  const [initialStatus, setInitialStatus] = useState(user?.status || "active");

  useEffect(() => {
    if (user) {
      const userRoles = Array.isArray(user.role) ? user.role : [];
      setRoles(userRoles);
      setInitialRoles(userRoles);
      setStatus(user.status || "active");
      setInitialStatus(user.status || "active");
    }
  }, [user]);

  const handleRoleChange = (roleValue) => {
    setRoles((prevRoles) =>
      prevRoles.includes(roleValue)
        ? prevRoles.filter((role) => role !== roleValue)
        : [...prevRoles, roleValue]
    );
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      role: roles,
      status,
    };
    onSave(updatedUser);
    onClose();
  };

  // Check if there are any changes
  const hasChanges =
    status !== initialStatus ||
    JSON.stringify(roles) !== JSON.stringify(initialRoles);

  return (
    <Dialog open={isOpen} handler={onClose} size="md">
      <DialogHeader>Edit User</DialogHeader>
      <DialogBody divider className="flex flex-col gap-4">
        <div>
          <Typography variant="h6" color="blue-gray">
            {user?.name || "User Name"}
          </Typography>
          <Typography color="gray">{user?.email || "No Email"}</Typography>
        </div>
        <div className="mt-4">
          <Typography variant="small" color="blue-gray" className="mb-2">
            Roles
          </Typography>
          <Checkbox
            label="General User"
            checked={roles.includes(5)}
            onChange={() => handleRoleChange(5)}
          />
          <Checkbox
            label="Staff"
            checked={roles.includes(4)}
            onChange={() => handleRoleChange(4)}
          />
          <Checkbox
            label="Root Access Admin"
            checked={roles.includes(3)}
            onChange={() => handleRoleChange(3)}
          />
        </div>
        <div className="mt-4">
          <Typography variant="small" color="blue-gray" className="mb-2">
            Status
          </Typography>
          <Select
            label="User Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSave}
          disabled={!hasChanges} // Disable if no changes
        >
          Save Changes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditUserDialog;
