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
import { UserCircleIcon, CameraIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfor } from "../../features/user/userSlice";
import { convertFileToBase64 } from "../../utils/convertToBase64";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { userInfor } = useSelector((state) => state.user);
  const [hasChanges, setHasChanges] = useState(false);

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

  const handleSaveChanges = () => {
    console.log("Saving profile data:", profileData);
    // Implement save logic
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
    </div>
  );
};

export default AdminProfile;
