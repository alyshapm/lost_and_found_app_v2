import React from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchItems } from "../../features/item/itemSlice";
import { approveItem } from "../../features/item/itemSlice";
import VerifyDialog from "../../components/dashboard/VerifyDialog";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";

// const foundItems = [
//   { id: 1, name: "Textbook", location: "Library", dateFound: "2023-10-18" },
//   { id: 2, name: "Umbrella", location: "Parking Lot", dateFound: "2023-10-19" },
//   {
//     id: 3,
//     name: "Laptop Charger",
//     location: "Lecture Hall",
//     dateFound: "2023-10-20",
//   },
// ];

function FoundItems() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const {  filteredItems } = useSelector((state) => state.items); // Assuming 'items' is stored in Redux
  const { userInfor } = useSelector((state) => state.user); // Assuming 'userInfor' contains the current user's info
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [foundItemsByUser, setFoundItemsByUser] = useState([]);

  useEffect(() => {
    if (filteredItems.items) {
      setFoundItemsByUser(
        filteredItems.items.filter((item) => item.founded_by === userInfor?._id)
      );
    }
  }, [filteredItems, userInfor]);

  
  

  // // Filter the items that were found by the current user
  // const foundItemsByUser = Array.isArray(itemsArray) 
  // ? itemsArray.filter(item => item.founded_by === userInfor?._id)
  // : [];

  

  const handleApproveClick = (itemId) => {
    console.log("ITEM: ", itemId)
    setSelectedItemId(itemId);
    setIsDialogOpen(true); // Open the dialog when the button is clicked
  };


  const handleApprove = () => {
    if (selectedItemId) {
      console.log("SELECTED: ", selectedItemId);
      dispatch(approveItem(selectedItemId)).then((response) => { // Capture response here
        if (!response.error) {
          // Show success toast after successful approval
          toast.success("Item has been approved!", {
            position: "top-center",
            autoClose: 3000, // Auto-close after 3 seconds

      
          });

        setFoundItemsByUser((prevItems) =>
            prevItems.map((item) =>
              item._id === selectedItemId ? { ...item, status: "approved" } : item
            )
        );

        } else {
          // Show error toast if there's an issue
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { foundItemsByUser?.length === 0 ? (
        <Typography>No items found</Typography>
      ) : (foundItemsByUser?.map((item) => (
          <Card key={item._id} className="mt-6">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {item.name}
              </Typography>
              <Typography>Location: {item.found_at}</Typography>
              <Typography>Date Found: {formatDate(item.date_reported)}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              {item.status === "waiting for approval" && (
                  <Button  onClick={() => handleApproveClick(item._id)}>Approve Item</Button>
                )}
            </CardFooter>
          </Card>)
        ))}
      </div>
    
      <VerifyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleApprove}
        message="Are you sure you want to approve this item?"
      />
    </div>
  
  );
}

export default FoundItems;
