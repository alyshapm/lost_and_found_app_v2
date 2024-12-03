import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@material-tailwind/react";

import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../features/item/itemSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";
import { approveItem } from "../../features/item/itemSlice";
import VerifyDialog from "../../components/dashboard/VerifyDialog";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";

import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";

function FoundItems() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  const { allUsersInfor } = useSelector((state) => state.user);
  const { filteredItems } = useSelector((state) => state.items);
  const { userInfor } = useSelector((state) => state.user);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [foundItemsByUser, setFoundItemsByUser] = useState([]);

  useEffect(() => {
    if (filteredItems.items) {
      setFoundItemsByUser(
        filteredItems.items.filter((item) => item.founded_by === userInfor?._id)
      );
    }
  }, [filteredItems, userInfor]);

  const userIdToNameMap = useMemo(() => {
    const map = {};
    if (allUsersInfor?.users && Array.isArray(allUsersInfor.users)) {
      allUsersInfor.users.forEach((user) => {
        map[user._id] = user.personal_info?.name || "Unknown User";
      });
    } else {
      console.warn(
        "Expected allUsersInfor.users to be an array but received:",
        allUsersInfor
      );
    }
    return map;
  }, [allUsersInfor]);

  const handleApproveClick = (item) => {
    console.log("Selected item:", item);
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleApprove = () => {
    if (selectedItem) {
      dispatch(approveItem(selectedItem._id)).then((response) => {
        if (!response.error) {
          toast.success("Item has been approved!", {
            position: "top-center",
            autoClose: 3000,
          });
          setFoundItemsByUser((prevItems) =>
            prevItems.map((item) =>
              item._id === selectedItem._id
                ? { ...item, status: "approved" }
                : item
            )
          );
        } else {
          toast.error("Failed to approve item.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        Found Items
      </Typography>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {foundItemsByUser?.length === 0 ? (
          <Typography>No items found</Typography>
        ) : (
          foundItemsByUser?.map((item) => (
            <Card key={item._id} className="flex flex-col h-full">
              <CardBody className="flex-grow">
                <div className="">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h2>

                    <Chip
                      size="sm"
                      variant="ghost"
                      color={
                        item.status === "claimed"
                          ? "green"
                          : item.status === "waiting for approval"
                          ? "amber"
                          : item.status === "on hold"
                          ? "blue"
                          : "gray"
                      }
                      value={item.status.toUpperCase()}
                      className="uppercase font-bold w-max"
                    />
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Found: {formatDate(item.date_reported)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Location: {item.found_at}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>
                      Received by: {userIdToNameMap[item.PIC] || "Unknown User"}
                    </span>
                  </div>

                  {item.status === "waiting for approval" && (
                    <Button onClick={() => handleApproveClick(item)}>
                      Approve Item
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      <VerifyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleApprove}
        message="Are you sure you want to approve this item?"
        item={selectedItem}
      />
    </div>
  );
}

export default FoundItems;
