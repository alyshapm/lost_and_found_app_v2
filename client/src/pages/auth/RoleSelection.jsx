import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card } from "@material-tailwind/react";

const RoleSelection = ({ roles }) => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 5) {
      navigate("/dashboard"); // Redirect to user dashboard
    } else if (role === 3 || role === 4) {
      navigate("/admin"); // Redirect to admin dashboard
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <Card className="p-4 space-y-4 w-full max-w-md">
        <Typography variant="h5" color="blue-gray" className="text-center mb-4">
          Select Your Role
        </Typography>
        {roles.includes(5) && (
          <Button fullWidth color="blue" onClick={() => handleRoleSelection(5)}>
            User Dashboard
          </Button>
        )}
        {roles.includes(3) && (
          <Button
            fullWidth
            color="green"
            onClick={() => handleRoleSelection(3)}
          >
            Admin Dashboard (Root Access)
          </Button>
        )}
        {roles.includes(4) && (
          <Button
            fullWidth
            color="amber"
            onClick={() => handleRoleSelection(4)}
          >
            Staff Dashboard
          </Button>
        )}
      </Card>
    </div>
  );
};

export default RoleSelection;
