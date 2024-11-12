import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const ItemDetailDialog = ({ isOpen, item, founder, onClose }) => {
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
        {founder && (
          <div className="mt-6">
            <Typography variant="h6" className="mb-2">
              Found by:
            </Typography>
            <div className="flex items-center gap-4">
              <Avatar
                src={founder.personal_info.avatar || "/default-avatar.png"}
                alt={founder.personal_info.name}
                size="lg"
                className="border border-blue-500"
              />
              <div>
                <Typography variant="h6" className="font-semibold">
                  {founder.personal_info.name}
                </Typography>
                <Typography className="text-sm text-gray-600">
                  Role:{" "}
                  {founder.personal_info.role === 5
                    ? "User"
                    : founder.personal_info.role === 4
                    ? "Staff"
                    : "Admin"}
                </Typography>
                <Typography className="text-sm text-gray-600">
                  Program: {founder.personal_info.program}
                </Typography>
                <Typography className="text-sm text-gray-600">
                  Status: {founder.personal_info.status}
                </Typography>
                <Button
                  size="sm"
                  variant="text"
                  color="blue"
                  className="mt-2"
                  onClick={() =>
                    (window.location.href = `mailto:${founder.personal_info.email}`)
                  }
                >
                  Contact Founder
                </Button>
              </div>
            </div>
          </div>
        )}
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
