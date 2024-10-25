import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
