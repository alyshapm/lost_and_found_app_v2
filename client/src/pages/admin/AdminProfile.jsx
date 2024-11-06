import React, { useState } from "react";
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

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    binusianId: "2440000000",
    name: "John Doe",
    email: "john.doe@binus.edu",
    password: "",
    confirmPassword: "",
    phoneNumber: "+62 812-3456-7890",
    program: "Computer Science",
    address: "123 Main St, Jakarta",
    role: "Admin",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log("Profile data submitted:", profileData);
    console.log("Profile image:", profileImage);
  };

  return (
    <div>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Admin Profile
      </Typography>
      <Card className="w-full max-w-4xl mx-auto">
        <CardBody className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
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
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1 w-full">
                <Input
                  label="Binusian ID"
                  name="binusianId"
                  value={profileData.binusianId}
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
                name="confirmPassword"
                type="password"
                value={profileData.confirmPassword}
                onChange={handleInputChange}
              />
              <Input
                label="Phone Number"
                name="phoneNumber"
                value={profileData.phoneNumber}
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
            <Button type="submit" className="mt-6">
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminProfile;
