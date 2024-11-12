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
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { convertFileToBase64 } from "../../utils/convertToBase64";

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

const AddItemDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { allUsersInfor } = useSelector((state) => state.user);
  const { userInfor } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    item_img: null,
    item_desc: "",
    campus: "",
    found_at: "",
    storing_location: "",
    PIC: userInfor?.id,
    founded_by: null,
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleSearchEmail = (email) => {
    setSearchEmail(email);
    if (email && allUsersInfor && allUsersInfor.users) {
      // Ensure allUsersInfor and users exist
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
    setFormData({ ...formData, founded_by: user._id }); // Set user ID
    setSearchEmail(user.personal_info.email); // Display selected email
    setFilteredUsers([]); // Hide dropdown after selection
    setShowCreateAccount(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (file) => {
    const base64Image = await convertFileToBase64(file);
    setFormData({ ...formData, image: file, imagePreview: base64Image });
  };

  const handleAddItem = () => {
    const itemData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      campus: formData.campus,
      foundAt: formData.foundAt,
      storingLocation: formData.storingLocation,
      founderEmail: formData.founderEmail,
      image: formData.imagePreview, // Assuming the backend accepts base64 strings
    };

    // Dispatch addItem with the itemData
    dispatch(addItem(itemData))
      .then(() => onClose())
      .catch((error) => console.error("Error adding item:", error));
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
          <Select
            label="Category"
            name="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
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
            onChange={(e) =>
              setFormData({ ...formData, item_desc: e.target.value })
            }
          />
          <Select
            label="Campus"
            name="campus"
            onChange={(e) =>
              setFormData({ ...formData, campus: e.target.value })
            }
          >
            <Option value="Main Campus">Main Campus</Option>
            <Option value="North Campus">North Campus</Option>
            <Option value="South Campus">South Campus</Option>
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
              onChange={(e) => handleSearchEmail(e.target.value)} // Call the search function
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
                onClick={() =>
                  /* logic to open create new account dialog */ null
                }
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
          {formData.imagePreview && (
            <div className="mt-2">
              <Typography variant="small" color="blue-gray">
                Image Preview:
              </Typography>
              <img
                src={formData.imagePreview}
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
          onClick={handleAddItem} // Call handleAddItem on click
        >
          Add Item
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddItemDialog;
