import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../features/meeting/meetingSlice";
import { fetchItems, verifyClaim } from "../../features/item/itemSlice";
import VerifyDialog from "../../components/dashboard/VerifyDialog";
import { toast } from "react-hot-toast";

import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";

function ClaimedItems() {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [claimedItemsByUser, setClaimedItemsByUser] = useState([]);

  const { meetings } = useSelector((state) => state.meetings);
  const { filteredItems } = useSelector((state) => state.items);
  const { userInfor } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMeetings());
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (filteredItems?.items && meetings?.meetings && userInfor?._id) {
      const userClaimedItems = filteredItems.items.filter((item) =>
        meetings.meetings.some(
          (meeting) =>
            meeting.item_id === item._id && meeting.user_id === userInfor._id
        )
      );
      setClaimedItemsByUser(userClaimedItems);
    }
  }, [filteredItems, meetings, userInfor]);

  const openVerifyDialog = (itemId) => {
    setSelectedItemId(itemId);
    setIsDialogOpen(true);
  };

  const handleVerifyConfirm = () => {
    const claimPayload = {
      claimed_by: userInfor._id,
    };

    dispatch(
      verifyClaim({ itemId: selectedItemId, payload: claimPayload })
    ).then((response) => {
      if (!response.error) {
        toast.success("You have verified your claim of this item!", {
          position: "top-center",
          autoClose: 3000,
        });

        setClaimedItemsByUser((prevItems) =>
          prevItems.map((item) =>
            item._id === selectedItemId ? { ...item, status: "verified" } : item
          )
        );
      } else {
        toast.error("Failed to verify item claim.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    });

    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        Claimed Items
      </Typography>
      {claimedItemsByUser.length === 0 ? (
        <Typography>No claimed items</Typography>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {claimedItemsByUser.map((item) => {
            const meeting = meetings.meetings.find(
              (m) => m.item_id === item._id && m.user_id === userInfor._id
            );

            return (
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
                        value={item.status}
                        color={item.status === "claimed" ? "blue-gray" : "gray"}
                      />
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Claimed: {item.claim_date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Location: {item.found_at}</span>
                    </div>
                    <div className="flex ">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {item.status === "Ready for pickup"
                          ? "Schedule Pickup"
                          : "View Details"}
                      </button>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button>View Details</Button>
                  {meeting?.status === "completed" &&
                    item.status === "on hold" && (
                      <Button
                        color="green"
                        className="mt-2"
                        onClick={() => openVerifyDialog(item._id)}
                      >
                        Verify Claim
                      </Button>
                    )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
      <VerifyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleVerifyConfirm}
        message="Please confirm you are the rightful claimant of this item."
      />
    </div>
  );
}

export default ClaimedItems;
