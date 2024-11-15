import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";

import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

function Profile() {
  const [profile, setProfile] = useState({})

  const { userInfor } = useSelector((state) => state.user);
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   phone: "(123) 456-7890",
  //   bio: "I am a student at XYZ University.",
  // });
  console.log(userInfor)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfor) {
      setProfile((prevData) => ({
        ...prevData,
        ...userInfor.personal_info,
      }));
    }
  }, [userInfor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile);
    dispatch(updateUser(profile))
    // .then(() => {
    //   setHasChanges(false);
    // })
    .catch((error) => {
      console.error("Failed to update profile:", error);
    });

    
  };


  // const handleSaveChanges = (e) => {
  //   e.preventDefault();
  //   console.log("Updated profile:", profile);
  //   dispatch(updateUser(profile))
  //     .then(() => {
  //       setHasChanges(false);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to update profile:", error);
  //     });
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        My Profile
      </Typography>
      <Card className="mt-6">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
            />
            <Textarea
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
