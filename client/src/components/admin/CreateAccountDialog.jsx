import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Input,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { signup } from "../../features/auth/authSlice";

const CreateAccountDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    binusian_id: "",
    name: "",
    email: "",
    program: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateAccount = () => {
    const newUser = {
      ...formData,
      password: "TemporaryPassword123",
      confirmPassword: "TemporaryPassword123",
    };

    dispatch(signup(newUser))
      .then((response) => {
        if (signup.fulfilled.match(response)) {
          toast.success("User account created successfully!");
          onClose();
        } else {
          toast.error(response.payload || "Failed to create user account.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="md">
      <DialogHeader>Create New Account</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Input
            label="Binusian ID"
            name="binusian_id"
            value={formData.binusian_id}
            onChange={handleInputChange}
            required
            className="mb-4"
          />
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mb-4"
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            type="email"
            className="mb-4"
          />
          <Input
            label="Program"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            required
            className="mb-4"
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="blue" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateAccountDialog;
