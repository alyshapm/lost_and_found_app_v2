import React, { useState, useEffect} from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, signin } from "../../features/auth/authSlice";



export const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, isLoggedOut, message } =
    useSelector((state) => state.auth);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      alert(user.message);
      // dispatch(reset());
      // navigate("/dashboard");

      const userRole = user.selectedRole
      console.log("ROLE: " +user.selectedRole)

      if (userRole === 3 || userRole=== 4) {
        navigate("/admin"); // Redirect to admin page if role is 3 or 4
      } else if (userRole === 5) {
        navigate("/dashboard"); // Redirect to home page if role is 5
      } else {
        navigate("/unauthorized"); // Redirect to unauthorized page if role doesn't match
      }
    

    }
  }, [user, isSuccess, isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData));

    console.log("Form data:", formData);
  };

  const isButtonDisabled = !formData.email || !formData.password;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardBody>
          <Typography variant="h4" className="text-center mb-4">
            Sign In
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              color="blue"
              fullWidth
              disabled={isButtonDisabled}
            >
              Sign In
            </Button>
          </form>

          <Typography variant="small" className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-blue-500">
              Sign Up
            </a>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};
