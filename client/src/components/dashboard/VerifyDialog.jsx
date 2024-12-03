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
import { formatDate } from "../../utils/formatDate";

const VerifyDialog = ({ isOpen, onClose, onConfirm, message, item }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = () => setIsAgreed(!isAgreed);

  const handleConfirm = () => {
    if (isAgreed) {
      onConfirm();
      onClose();
      setIsAgreed(false);
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Verification</DialogHeader>
      <DialogBody divider>
        <Typography>{message}</Typography>
        {item && (
          <div className="mt-4">
            <Typography variant="h6" color="blue-gray">
              Item Details
            </Typography>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                <tbody>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
                      Category
                    </th>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.category || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
                      Item Description
                    </th>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.item_desc || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
                      Campus
                    </th>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.campus || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
                      Found At
                    </th>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.found_at || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
                      Date Reported
                    </th>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDate(item.date_reported) || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <Checkbox
          label="I confirm that the information is accurate"
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
