import React, { useState, useEffect, useCallback } from "react";
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
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";
import { convertFileToBase64 } from "../../utils/convertToBase64";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersInfor } from "../../features/user/userSlice";
import { editItem } from "../../features/item/itemSlice";

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

const EditItemDialog = ({ isOpen, onClose, item, refreshItems }) => {
  const dispatch = useDispatch();
  const { allUsersInfor } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    item_desc: "",
    campus: "",
    found_at: "",
    storing_location: "",
    founded_by: null,
    item_img: null,
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleFileChange = async (file) => {
    const base64Image = await convertFileToBase64(file);
    setFormData({ ...formData, item_img: base64Image });
    setHasChanges(true);
  };

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
    setFormData((prevData) => ({ ...prevData, founded_by: user._id }));
    setSearchEmail(user.personal_info.email);
    setFilteredUsers([]);
    setShowCreateAccount(false);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    dispatch(editItem({ itemId: item._id, updatedItem: formData }))
      .then(() => {
        onClose();
        if (refreshItems) refreshItems();
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="xl">
      <DialogHeader>Edit Item</DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <form className="flex flex-col gap-4">
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              handleInputChange({ target: { name: "category", value: e } })
            }
          >
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Other">Other</Option>
          </Select>
          <Textarea
            label="Description"
            name="item_desc"
            value={formData.item_desc}
            onChange={handleInputChange}
          />
          <Select
            label="Campus"
            name="campus"
            value={formData.campus}
            onChange={(e) =>
              handleInputChange({ target: { name: "campus", value: e } })
            }
          >
            <Option value="FX Sudirman">FX Sudirman</Option>
            <Option value="JWC">JWC</Option>
          </Select>
          <Input
            label="Found At"
            name="found_at"
            value={formData.found_at}
            onChange={handleInputChange}
          />
          <Input
            label="Storing Location"
            name="storing_location"
            value={formData.storing_location}
            onChange={handleInputChange}
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
                variant="text"
                color="blue"
                onClick={() => null /* Handle create account logic */}
                className="mt-2"
              >
                Create New Account
              </Button>
            )}
          </div>

          <ImageUpload onFileChange={handleFileChange} />
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
        <Button
          variant="gradient"
          color="green"
          disabled={!hasChanges}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditItemDialog;
