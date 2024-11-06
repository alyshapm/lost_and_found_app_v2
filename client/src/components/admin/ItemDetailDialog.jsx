import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Typography,
} from "@material-tailwind/react";

const ItemDetailDialog = ({ isOpen, item, onClose }) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Item Details</DialogHeader>
      <DialogBody divider>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover mb-4"
        />
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="paragraph">Category: {item.category}</Typography>
        <Typography variant="paragraph">Campus: {item.campus}</Typography>
        <Typography variant="paragraph">Found At: {item.foundAt}</Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ItemDetailDialog;
