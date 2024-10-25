import React from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";

const claimedItems = [
  {
    id: 1,
    name: "Blue Backpack",
    location: "Library",
    dateClaimed: "2023-10-15",
    status: "Ready for Pickup",
  },
  {
    id: 2,
    name: "iPhone 12",
    location: "Student Center",
    dateClaimed: "2023-10-16",
    status: "Collected",
  },
  {
    id: 3,
    name: "Water Bottle",
    location: "Gym",
    dateClaimed: "2023-10-17",
    status: "Pending",
  },
];

function ClaimedItems() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        Claimed Items
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claimedItems.map((item) => (
          <Card key={item.id} className="mt-6">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {item.name}
              </Typography>
              <Typography>Location: {item.location}</Typography>
              <Typography>Date Claimed: {item.dateClaimed}</Typography>
              <Typography>Status: {item.status}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ClaimedItems;
