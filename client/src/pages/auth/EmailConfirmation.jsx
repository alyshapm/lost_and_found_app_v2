import React from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
export function EmailConfirmation() {

  const navigate = useNavigate()


  const handleLoginRedirect = () => {
    navigate('/sign-in')
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardBody className="flex flex-col items-center space-y-6">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Email Confirmation
          </Typography>
          <Typography className="text-center">
            Thank you for signing up! Please check your email to confirm your account.
          </Typography>
          <Typography color="blue-gray" className="text-sm text-center">
            If you don't see the email in your inbox, please check your spam folder.
          </Typography>
          <Button
            color="blue"
            size="lg"
            ripple="light"
            onClick={handleLoginRedirect}
            className="mt-4"
          >
            Go to Login Page
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

