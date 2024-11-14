import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Checkbox,
  Typography,
} from "@material-tailwind/react";

const VerifyDialog = ({ isOpen, onClose, onConfirm, message }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = () => setIsAgreed(!isAgreed);

  const handleConfirm = () => {
    if (isAgreed) {
      onConfirm(); // Trigger the confirm action passed from parent
      onClose(); // Close the dialog
      setIsAgreed(false); // Reset the checkbox state
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Verification Agreement</DialogHeader>
      <DialogBody divider>
        <Typography>{message}</Typography>
        <Checkbox
          label="I agree to the terms and conditions"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
      </DialogBody>
      <DialogFooter className="space-x-4">
        <Button color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button color="green" onClick={handleConfirm} disabled={!isAgreed}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default VerifyDialog;
