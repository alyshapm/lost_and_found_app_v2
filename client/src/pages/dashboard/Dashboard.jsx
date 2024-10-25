import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import ClaimItemDialog from "../../components/dashboard/ClaimitemDialog";

// Sample data for found items
const foundItems = [
  {
    id: 1,
    name: "Blue Backpack",
    location: "Library",
    dateFound: "2023-10-15",
  },
  {
    id: 2,
    name: "iPhone 12",
    location: "Student Center",
    dateFound: "2023-10-16",
  },
  { id: 3, name: "Water Bottle", location: "Gym", dateFound: "2023-10-17" },
  { id: 4, name: "Textbook", location: "Cafeteria", dateFound: "2023-10-18" },
  { id: 5, name: "Umbrella", location: "Parking Lot", dateFound: "2023-10-19" },
  {
    id: 6,
    name: "Laptop Charger",
    location: "Lecture Hall",
    dateFound: "2023-10-20",
  },
];

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = foundItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (locationFilter ? item.location === locationFilter : true) &&
      (dateFilter ? item.dateFound === dateFilter : true)
  );

  const handleClaimClick = (item) => {
    setSelectedItem(item);
    setIsClaimDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />

          <Menu placement="bottom-start">
            <MenuHandler>
              <Button variant="outlined" className="text-gray-900">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => setLocationFilter("")}>
                All Locations
              </MenuItem>
              <MenuItem onClick={() => setLocationFilter("Library")}>
                Library
              </MenuItem>
              <MenuItem onClick={() => setLocationFilter("Student Center")}>
                Student Center
              </MenuItem>
              <MenuItem onClick={() => setLocationFilter("Gym")}>Gym</MenuItem>
              <MenuItem onClick={() => setLocationFilter("Cafeteria")}>
                Cafeteria
              </MenuItem>
              <MenuItem onClick={() => setLocationFilter("Parking Lot")}>
                Parking Lot
              </MenuItem>
              <MenuItem onClick={() => setLocationFilter("Lecture Hall")}>
                Lecture Hall
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu placement="bottom-start">
            <MenuHandler>
              <Button variant="outlined" className="text-gray-900">
                <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => setDateFilter("")}>All Dates</MenuItem>
              <MenuItem onClick={() => setDateFilter("2023-10-15")}>
                2023-10-15
              </MenuItem>
              <MenuItem onClick={() => setDateFilter("2023-10-16")}>
                2023-10-16
              </MenuItem>
              <MenuItem onClick={() => setDateFilter("2023-10-17")}>
                2023-10-17
              </MenuItem>
              <MenuItem onClick={() => setDateFilter("2023-10-18")}>
                2023-10-18
              </MenuItem>
              <MenuItem onClick={() => setDateFilter("2023-10-19")}>
                2023-10-19
              </MenuItem>
              <MenuItem onClick={() => setDateFilter("2023-10-20")}>
                2023-10-20
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="mt-6">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item.name}
                </Typography>
                <Typography>Location: {item.location}</Typography>
                <Typography>Date Found: {item.dateFound}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={() => handleClaimClick(item)}>
                  Claim Item
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Typography className="text-center text-gray-500 mt-8">
            No items found. Try a different search term.
          </Typography>
        )}
      </main>

      <ClaimItemDialog
        isOpen={isClaimDialogOpen}
        onClose={() => setIsClaimDialogOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}

export default Dashboard;
