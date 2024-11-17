import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "@material-tailwind/react";
import {
  CubeIcon,
  CheckCircleIcon,
  UsersIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const AdminDashboard = () => {
  const { userInfor } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.items);
  const { meetings } = useSelector((state) => state.meetings);

  const totalItems = 0;
  const claimsProcessed = 0;
  const totalMeetings = 0;
  const unapprovedItems = 0;

  return (
    <div className="flex flex-col bg-gray-100 space-y-6">
      <Card className="p-6 shadow">
        <Typography variant="h2" color="blue-gray" className="font-bold">
          Welcome back, {userInfor?.personal_info?.name || "Admin"} 👋
        </Typography>
        <Typography color="gray" className="mt-2">
          Here's what's happening on your dashboard today. See the statistics at
          once.
        </Typography>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Items Panel */}
        <Card className="p-4 shadow flex items-center justify-between">
          <div className="flex items-center">
            <CubeIcon className="h-10 w-10 text-blue-500 bg-blue-100 p-2 rounded-full mr-4" />
            <div>
              <Typography variant="small" color="gray" className="font-medium">
                Total Items
              </Typography>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                {totalItems}
              </Typography>
            </div>
          </div>
        </Card>

        {/* Claims Processed Panel */}
        <Card className="p-4 shadow flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircleIcon className="h-10 w-10 text-green-500 bg-green-100 p-2 rounded-full mr-4" />
            <div>
              <Typography variant="small" color="gray" className="font-medium">
                Claims Processed
              </Typography>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                {claimsProcessed}
              </Typography>
            </div>
          </div>
        </Card>

        {/* Meeting Requests Panel */}
        <Card className="p-4 shadow flex items-center justify-between">
          <div className="flex items-center">
            <UsersIcon className="h-10 w-10 text-orange-500 bg-orange-100 p-2 rounded-full mr-4" />
            <div>
              <Typography variant="small" color="gray" className="font-medium">
                Meeting Requests
              </Typography>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                {totalMeetings}
              </Typography>
            </div>
          </div>
        </Card>

        {/* Unapproved Items Panel */}
        <Card className="p-4 shadow flex items-center justify-between">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-10 w-10 text-red-500 bg-red-100 p-2 rounded-full mr-4" />
            <div>
              <Typography variant="small" color="gray" className="font-medium">
                Unapproved Items
              </Typography>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                {unapprovedItems}
              </Typography>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
