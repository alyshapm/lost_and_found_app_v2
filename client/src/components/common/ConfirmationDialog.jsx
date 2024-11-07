import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Typography,
} from "@material-tailwind/react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Dialog open={isOpen} handler={onClose} size="sm">
      <DialogHeader>Confirm Action</DialogHeader>
      <DialogBody divider>
        <Typography>
          {message || "Are you sure you want to proceed?"}
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmationDialog;
