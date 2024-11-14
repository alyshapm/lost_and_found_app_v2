import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { convertFileToBase64 } from "../../utils/convertToBase64";
import CreateAccountDialog from "./CreateAccountDialog";

import { addItem } from "../../features/item/itemSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";

const ImageUpload = ({ onFileChange }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
      <Typography color="gray" className="mt-2">
        {isDragActive
          ? "Drop the image here"
          : "Drag and drop an image here, or click to select a file"}
      </Typography>
    </div>
  );
};

const AddItemDialog = ({ isOpen, onClose, refreshItems }) => {
  const dispatch = useDispatch();
  const { allUsersInfor, userInfor } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersInfor());
    // dispatch(getUserInfor());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    item_img: null,
    item_desc: "",
    campus: "",
    found_at: "",
    storing_location: "",
    PIC: null,
    founded_by: null,
  });

  useEffect(() => {
    if (userInfor?._id) {
      setFormData((prevData) => ({ ...prevData, PIC: userInfor._id }));
    }
  }, [userInfor]);

  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isCreateAccountDialogOpen, setIsCreateAccountDialogOpen] =
    useState(false);

  const handleSearchEmail = (email) => {
    setSearchEmail(email);
    if (email && allUsersInfor && allUsersInfor.users) {
      const filtered = allUsersInfor.users.filter((user) =>
        user.personal_info.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowCreateAccount(filtered.length === 0);
    } else {
      setFilteredUsers([]);
      setShowCreateAccount(false);
    }
  };

  const handleEmailSelect = (user) => {
    setFormData({ ...formData, founded_by: user._id });
    setSearchEmail(user.personal_info.email);
    setFilteredUsers([]);
    setShowCreateAccount(false);
  };

  const handleFileChange = async (file) => {
    const base64Image = await convertFileToBase64(file);
    setFormData({ ...formData, item_img: base64Image });
  };

  const handleAddItem = () => {
    console.log(filteredUsers);
    const itemData = {
      name: formData.name,
      category: formData.category,
      item_desc: formData.item_desc,
      campus: formData.campus,
      found_at: formData.found_at,
      storing_location: formData.storing_location,
      founded_by: formData.founded_by,
      item_img: formData.item_img,
      PIC: formData.PIC,
    };

    // console.log(itemData);
    dispatch(addItem(itemData))
      .then(() => {
        toast.success("Item added successfully!");
        if (refreshItems) refreshItems();
        onClose();
      })
      .catch((error) => {
        toast.error("Failed to add item.");
        console.error("Error adding item:", error);
      });
  };

  const handleCreateAccountClick = () => {
    setIsCreateAccountDialogOpen(true);
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="xl">
      <DialogHeader>Add New Item</DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <form className="flex flex-col gap-4">
          <Input
            label="Item Name"
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Select label="Category" name="category">
            <Option
              onClick={() =>
                setFormData({ ...formData, category: "Electronics" })
              }
            >
              Electronics
            </Option>
            <Option
              onClick={() => setFormData({ ...formData, category: "Clothing" })}
            >
              Clothing
            </Option>
            <Option
              onClick={() => setFormData({ ...formData, category: "Books" })}
            >
              Books
            </Option>
            <Option
              onClick={() => setFormData({ ...formData, category: "Other" })}
            >
              Other
            </Option>
          </Select>
          <Textarea
            label="Description"
            name="item_desc"
            onChange={(e) =>
              setFormData({ ...formData, item_desc: e.target.value })
            }
          />
          <Select label="Campus" name="campus">
            <Option
              onClick={() =>
                setFormData({ ...formData, campus: "FX Sudirman" })
              }
            >
              FX Sudirman
            </Option>
            <Option onClick={() => setFormData({ ...formData, campus: "JWC" })}>
              JWC
            </Option>
          </Select>
          <Input
            label="Found At"
            name="found_at"
            onChange={(e) =>
              setFormData({ ...formData, found_at: e.target.value })
            }
          />
          <Input
            label="Storing Location"
            name="storing_location"
            onChange={(e) =>
              setFormData({ ...formData, storing_location: e.target.value })
            }
          />

          <div>
            <Input
              label="Search Founder's Email"
              name="searchEmail"
              value={searchEmail}
              onChange={(e) => handleSearchEmail(e.target.value)}
            />
            {filteredUsers.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto mt-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleEmailSelect(user)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {user.personal_info.email}
                  </div>
                ))}
              </div>
            )}
            {showCreateAccount && (
              <Button
                variant="outlined"
                color="blue"
                onClick={handleCreateAccountClick}
                className="mt-2"
              >
                Create New Account
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Typography variant="small" color="blue-gray">
              Upload Image
            </Typography>
            <ImageUpload onFileChange={handleFileChange} />
          </div>
          {formData.item_img && (
            <div className="mt-2">
              <Typography variant="small" color="blue-gray">
                Image Preview:
              </Typography>
              <img
                src={formData.item_img}
                alt="Selected Item"
                className="w-20 h-20 object-cover mt-2 rounded-lg"
              />
            </div>
          )}
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleAddItem}>
          Add Item
        </Button>
      </DialogFooter>

      <CreateAccountDialog
        isOpen={isCreateAccountDialogOpen}
        onClose={() => setIsCreateAccountDialogOpen(false)}
      />
    </Dialog>
  );
};

export default AddItemDialog;
