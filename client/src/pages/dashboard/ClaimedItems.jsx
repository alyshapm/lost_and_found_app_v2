import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../features/meeting/meetingSlice";
import { fetchItems, verifyClaim } from "../../features/item/itemSlice";
import VerifyDialog from "../../components/dashboard/VerifyDialog";
import { toast } from "react-hot-toast";

function ClaimedItems() {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    dispatch(fetchMeetings());
    dispatch(fetchItems());
  }, [dispatch]);

  const { meetings } = useSelector((state) => state.meetings);
  const { filteredItems } = useSelector((state) => state.items);
  const { userInfor } = useSelector((state) => state.user);

  const claimedItems =
    filteredItems?.items?.filter((item) =>
      meetings?.meetings?.some(
        (meeting) =>
          meeting.item_id === item._id && meeting.user_id === userInfor?._id
      )
    ) || [];

  if (!meetings || !filteredItems) {
    return <div>Loading...</div>;
  }

  const openVerifyDialog = (itemId) => {
    setSelectedItemId(itemId);
    setIsDialogOpen(true);
  };

  const handleVerifyConfirm = () => {
    const claimPayload = {
      claimed_by: userInfor._id
    };
    
    console.log("ID", selectedItemId)
    console.log("PAYLOAD", claimPayload)
    dispatch(verifyClaim(selectedItemId, claimPayload )).then(
      (response) => {
        if (!response.error) {
          toast.success("You have verified your claim of this item!", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to approve item.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      }
    );

    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        Claimed Items
      </Typography>
      {claimedItems?.length === 0 ? (
        <Typography>No claimed items</Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {claimedItems.map((item) => {
            const meeting = meetings.meetings.find(
              (m) => m.item_id === item._id && m.user_id === userInfor._id
            );

            return (
              <Card key={item._id} className="mt-6">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item.name}
                  </Typography>
                  <Typography>Location: {item.found_at}</Typography>
                  <Typography>Date Claimed: {item.claim_date}</Typography>
                  <Typography>Status: {item.status}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button>View Details</Button>
                  {meeting?.status === "completed" && item.status === "on hold" && (
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
