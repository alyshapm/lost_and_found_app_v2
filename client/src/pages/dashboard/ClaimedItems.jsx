import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../features/meeting/meetingSlice";
import { fetchItems } from "../../features/item/itemSlice";

function ClaimedItems() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeetings());
    dispatch(fetchItems());
  }, [dispatch]);

  const { meetings } = useSelector((state) => state.meetings);
  const { filteredItems } = useSelector((state) => state.items);
  const { userInfor } = useSelector((state) => state.user);

  // Ensure meetings and filteredItems are defined before accessing them
  const claimedItems =
    filteredItems?.items?.filter((item) =>
      meetings?.meetings?.some(
        (meeting) =>
          meeting.item_id === item._id && meeting.user_id === userInfor?._id
      )
    ) || [];

  // Handle loading state or error
  if (!meetings || !filteredItems) {
    return <div>Loading...</div>;
  }

  const handleVerifyClaim = (itemId) => {
    // Add dispatch or logic for verifying the claim here
    console.log(`Verifying claim for item with ID: ${itemId}`);
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
                  {meeting?.status === "complete" && item.status === "on hold" && (
                    <Button
                      color="green"
                      className="mt-2"
                      onClick={() => handleVerifyClaim(item._id)}
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
    </div>
  );
}

export default ClaimedItems;
