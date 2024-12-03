import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { useDispatch } from "react-redux";
import { signup } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    binusian_id: "",
    email: "",
    program: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, program: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds

  
      });
      return;
    }

    // Handle sign-up logic
    console.log("Form data:", formData);

    try {
      await dispatch(signup(formData)).unwrap();
      toast.success("Confirmation email sent! ")
      navigate('/email-confirmation');
    } catch (error) {
      toast.error('Signup failed', {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds
      });
    }
  };

  const isButtonDisabled =
    !formData.name ||
    !formData.binusian_id ||
    !formData.email ||
    !formData.program ||
    !formData.password ||
    !formData.confirmPassword;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg">
        <CardBody>
          <Typography variant="h4" className="text-center mb-4">
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Binusian ID Input */}
            <Input
              label="Binusian ID"
              name="binusian_id"
              value={formData.binusian_id}
              onChange={handleChange}
              required
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Program Select */}
            <Select
              label="Program"
              value={formData.program}
              onChange={handleSelectChange}
              required
            >
              <Option value="fashion">Fashion</Option>
              <Option value="GDNM">GDNM</Option>
              <Option value="computer science">Computer Science</Option>
              <Option value="business information systems">
                Business Information Systems
              </Option>
              <Option value="communication">Communication</Option>
              <Option value="business management marketing">
                Business Management Marketing
              </Option>
              <Option value="international business">
                International Business
              </Option>
              <Option value="finance">Finance</Option>
            </Select>

            {/* Password Input */}
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              color="blue"
              fullWidth
              disabled={isButtonDisabled}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="small" className="text-center mt-4">
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-500">
              Sign In
            </a>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};
