import React from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";

const foundItems = [
  { id: 1, name: "Textbook", location: "Library", dateFound: "2023-10-18" },
  { id: 2, name: "Umbrella", location: "Parking Lot", dateFound: "2023-10-19" },
  {
    id: 3,
    name: "Laptop Charger",
    location: "Lecture Hall",
    dateFound: "2023-10-20",
  },
];

function FoundItems() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        Found Items
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundItems.map((item) => (
          <Card key={item.id} className="mt-6">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {item.name}
              </Typography>
              <Typography>Location: {item.location}</Typography>
              <Typography>Date Found: {item.dateFound}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Report as Mine</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FoundItems;
