import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/item/itemSlice";
import { getUserInfor } from "../../features/user/userSlice";
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
  Checkbox,
  Dialog,
} from "@material-tailwind/react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import ClaimItemDialog from "../../components/dashboard/ClaimitemDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// // Sample data
// const foundItems = [
//   {
//     id: 1,
//     name: "Blue Backpack",
//     location: "Library",
//     dateFound: "2023-10-15",
//   },
//   {
//     id: 2,
//     name: "iPhone 12",
//     location: "Student Center",
//     dateFound: "2023-10-16",
//   },
//   { id: 3, name: "Water Bottle", location: "Gym", dateFound: "2023-10-17" },
//   { id: 4, name: "Textbook", location: "Cafeteria", dateFound: "2023-10-18" },
//   { id: 5, name: "Umbrella", location: "Parking Lot", dateFound: "2023-10-19" },
//   {
//     id: 6,
//     name: "Laptop Charger",
//     location: "Lecture Hall",
//     dateFound: "2023-10-20",
//   },
// ];

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [dateFilter, setDateFilter] = useState([null, null]);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const locations = [
    "Library",
    "Student Center",
    "Gym",
    "Cafeteria",
    "Parking Lot",
    "Lecture Hall",
  ];
  const dispatch = useDispatch();
  const { filteredItems, isLoading, error } = useSelector((state) => state.items);
  const {userInfor} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);


  

  const handleLocationFilterChange = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleFilterSubmit = () => {
    setIsFilterDialogOpen(false);
  };

  const filteredItemsSearch = filteredItems.items?.filter(
    (item) =>
      // Safely check for name and location
      // item.founded_by === userInfor.data._id &&
      (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.location?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLocations.length === 0 || selectedLocations.includes(item.location)) &&
      (!dateFilter[0] || new Date(item.dateFound) >= dateFilter[0]) &&
      (!dateFilter[1] || new Date(item.dateFound) <= dateFilter[1])
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

          <Button
            variant="outlined"
            className="text-gray-900 flex items-center"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            <span className="mr-2">Filters</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItemsSearch?.map((item) => (
            <Card key={item.id} className="mt-6">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item.name}
                </Typography>
                <Typography>Location: {item.found_at}</Typography>
                <Typography>Date Found: {new Date(item.date_reported).toLocaleDateString()}</Typography>
                <Typography>Time: {new Date(item.date_reported).toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',})}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={() => handleClaimClick(item)}>
                  Claim Item
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItemsSearch?.length === 0 && (
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

      <Dialog
        open={isFilterDialogOpen}
        handler={setIsFilterDialogOpen}
        size="md"
      >
        <div className="p-6">
          <Typography variant="h5" className="mb-4">
            Filters
          </Typography>

          <div className="mb-4">
            <Typography variant="h6" className="mb-2">
              Filter by Location:
            </Typography>
            {locations.map((location) => (
              <div key={location} className="flex items-center mb-2">
                <Checkbox
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationFilterChange(location)}
                  label={location}
                  color="blue"
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <Typography variant="h6" className="mb-2">
              Filter by Date:
            </Typography>
            <div className="flex space-x-2">
              <DatePicker
                selected={dateFilter[0]}
                onChange={(date) => setDateFilter([date, dateFilter[1]])}
                placeholderText="Start Date"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <DatePicker
                selected={dateFilter[1]}
                onChange={(date) => setDateFilter([dateFilter[0], date])}
                placeholderText="End Date"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="text" onClick={() => setIsFilterDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFilterSubmit}>Apply Filters</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Dashboard;
