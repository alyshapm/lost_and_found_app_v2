import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Select,
  Option,
  Alert,
  Input,
} from "@material-tailwind/react";

function ClaimItemDialog({ isOpen, onClose, item }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedDate("");
      setSelectedTime("");
      setDateError("");
    }
  }, [isOpen]);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setDateError("Please select a future date");
    } else {
      setDateError("");
    }
    setSelectedDate(e.target.value);
  };

  const handleClaimSubmit = () => {
    onClose();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
  };

  const isFormValid = selectedDate && selectedTime && !dateError;

  return (
    <>
      <Dialog open={isOpen} handler={onClose}>
        <DialogHeader>Claim {item?.name}</DialogHeader>
        <DialogBody>
          <Typography className="mb-4">
            Please select a date and time to meet with the finder:
          </Typography>
          <div className="mb-4">
            <Input
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              error={!!dateError}
            />
            {dateError && (
              <Typography color="red" className="mt-2 text-sm">
                {dateError}
              </Typography>
            )}
          </div>
          <Select
            label="Select Time"
            value={selectedTime}
            onChange={(value) => setSelectedTime(value)}
          >
            <Option value="10:00 AM">10:00 AM</Option>
            <Option value="12:00 PM">12:00 PM</Option>
            <Option value="3:00 PM">3:00 PM</Option>
            <Option value="5:00 PM">5:00 PM</Option>
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleClaimSubmit}
            disabled={!isFormValid}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {showSuccess && (
        <Alert
          color="green"
          className="fixed bottom-4 right-4 w-auto max-w-screen-sm"
          dismissible={{
            onClose: () => setShowSuccess(false),
          }}
        >
          Your request has been sent. Please check your notifications.
        </Alert>
      )}
    </>
  );
}

export default ClaimItemDialog;
