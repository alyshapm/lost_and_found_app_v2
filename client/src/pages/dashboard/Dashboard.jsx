import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../features/item/itemSlice";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  Chip,
  Option,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  TagIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import ClaimItemDialog from "../../components/dashboard/ClaimitemDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");

  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const { filteredItems, isLoading, error } = useSelector(
    (state) => state.items
  );
  const { userInfor } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItemsSearch = filteredItems.items?.filter(
    (item) =>
      ((item.founded_by !== userInfor._id && item.status === "active") ||
        item.status === "claimed") &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (campusFilter === "all" || item.campus === campusFilter)
  );

  const handleClaimClick = (item) => {
    setSelectedItem(item);
    setIsClaimDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="w-80">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            icon={
              <MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />
            }
          />
        </div>
        <div className="flex space-x-4 ml-auto">
          <Select
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value || "all")}
            label="Filter by category"
            className="bg-white"
          >
            <Option value="all">All Categories</Option>
            <Option value="Bags">Clothing</Option>
            <Option value="Accessories">Accessories</Option>
            <Option value="Books">Electrnics</Option>
            <Option value="Books">Other</Option>
          </Select>
          <Select
            value={campusFilter}
            onChange={(value) => setCampusFilter(value || "all")}
            label="Filter by campus"
            className="bg-white"
          >
            <Option value="all">All Campuses</Option>
            <Option value="Main Campus">JWC</Option>
            <Option value="West Campus">FX Sudirman</Option>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {filteredItemsSearch?.map((item) => (
          <Card key={item._id} className="flex flex-col h-full">
            <CardBody className="flex-grow">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" color="blue-gray">
                  {item.name}
                </Typography>
                <Chip
                  size="sm"
                  variant="ghost"
                  value={item.status}
                  color={item.status === "active" ? "green" : "blue-gray"}
                />
              </div>

              <p className="mb-4">{item.item_desc}</p>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {item.found_at}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {new Date(item.date_reported).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {item.category}
                </div>
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2 text-blue-500" />

                  {item.campus}
                </div>
              </div>
            </CardBody>
            <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-lg">
              <Button
                fullWidth
                color={item.status === "active" ? "blue" : "gray"}
                className={`${
                  item.status === "active"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-300 text-gray"
                }`}
                disabled={item.status === "claimed"}
                onClick={() => handleClaimClick(item)}
              >
                {item.status === "active" ? (
                  <div>
                    <CheckCircleIcon className="h-5 w-5 mr-2 inline" />
                    Claim Item
                  </div>
                ) : (
                  <div>
                    <XCircleIcon className="h-5 w-5 mr-2 inline" />
                    Claimed
                  </div>
                )}
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

      <ClaimItemDialog
        isOpen={isClaimDialogOpen}
        onClose={() => setIsClaimDialogOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}

export default Dashboard;
