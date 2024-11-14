import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { UserCircleIcon, CameraIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfor, updateUser } from "../../features/user/userSlice";
import { convertFileToBase64 } from "../../utils/convertToBase64";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfor } = useSelector((state) => state.user);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [navigationPath, setNavigationPath] = useState(null);

  const [profileData, setProfileData] = useState({
    binusian_id: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    program: "",
    address: "",
    role: "",
    avatar: null,
    bio: "",
    youtube: "",
    instagram: "",
    facebook: "",
    twitter: "",
    github: "",
    website: "",
  });

  useEffect(() => {
    dispatch(getUserInfor());
  }, [dispatch]);

  useEffect(() => {
    if (userInfor) {
      setProfileData((prevData) => ({
        ...prevData,
        ...userInfor.personal_info,
      }));
    }
  }, [userInfor]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertFileToBase64(file);
    setProfileData((prevData) => ({ ...prevData, avatar: base64Image }));
    setHasChanges(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(updateUser(profileData))
      .then(() => {
        toast.success("User updated successfully!");
        setHasChanges(false);
      })
      .catch((error) => {
        toast.error("Failed to update user.");
        console.error("Failed to update profile:", error);
      });
  };

  const handleNavigation = (path) => {
    if (hasChanges) {
      setIsDialogOpen(true);
      setNavigationPath(path);
    } else {
      navigate(path);
    }
  };

  const confirmNavigation = () => {
    setIsDialogOpen(false);
    setHasChanges(false); // Discard unsaved changes
    navigate(navigationPath);
  };

  return (
    <div>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Admin Profile
      </Typography>
      <Card className="w-full max-w-4xl mx-auto">
        <CardBody className="flex flex-col gap-6">
          <form onSubmit={handleSaveChanges} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-32 h-32 text-blue-gray-300" />
                )}
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                >
                  <CameraIcon className="w-5 h-5 text-white" />
                </label>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1 w-full">
                <Input
                  label="Binusian ID"
                  name="binusian_id"
                  value={profileData.binusian_id}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
              <Input
                label="New Password"
                name="password"
                type="password"
                value={profileData.password}
                onChange={handleInputChange}
              />
              <Input
                label="Confirm New Password"
                name="confirm_password"
                type="password"
                value={profileData.confirm_password}
                onChange={handleInputChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
              />
              <Select
                label="Program"
                name="program"
                value={profileData.program}
                onChange={(value) =>
                  handleInputChange({ target: { name: "program", value } })
                }
              >
                <Option value="Computer Science">Computer Science</Option>
                <Option value="Business Information Systems">
                  Business Information Systems
                </Option>
                <Option value="Communications">Communications</Option>
                <Option value="Fashion">Fashion</Option>
                <Option value="Graphic Design and New Media">
                  Graphic Design and New Media
                </Option>
                <Option value="Business Management and Marketing">
                  Business Management and Marketing
                </Option>
                <Option value="International Business">
                  International Business
                </Option>
                <Option value="Finance">Finance</Option>
              </Select>
              <Input
                label="Role"
                name="role"
                value={profileData.role}
                disabled
              />
            </div>
            <Textarea
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
            />
            <Button
              variant="gradient"
              color="green"
              onClick={handleSaveChanges}
              disabled={!hasChanges}
              className="mt-6"
            >
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmNavigation}
        message="Are you sure you want to leave this page? Unsaved changes will be lost."
      />
    </div>
  );
};

export default AdminProfile;
