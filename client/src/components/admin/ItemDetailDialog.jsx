import React from "react";
import { Dialog } from "@material-tailwind/react";

import { formatDate } from "../../utils/formatDate";

const ItemDetailDialog = ({ isOpen, item, founder, onClose }) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} handler={onClose} size="xl">
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/2 bg-gray-100">
          <img
            src={item.item_img}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">{item.name}</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-semibold text-gray-600">Category</p>
              <p className="text-lg">{item.category}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-semibold text-gray-600">Campus</p>
              <p className="text-lg">{item.campus}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-semibold text-gray-600">Date Reported</p>
              <p className="text-lg">{formatDate(item.date_reported)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-semibold text-gray-600">Found At</p>
              <p className="text-lg">{item.found_at}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-semibold text-gray-600">Storing Location</p>
              <p className="text-lg">{item.storing_location}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
            <p className="text-gray-800">{item.item_desc}</p>
          </div>
          {founder && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Found by</h3>
              <div className="flex items-center gap-4">
                <img
                  src={founder.personal_info.avatar || "/default-avatar.png"}
                  alt={founder.personal_info.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-lg">{founder.personal_info.name}</p>
                  <p className="text-sm text-gray-600">
                    {founder.personal_info.role === 5
                      ? "User"
                      : founder.personal_info.role === 4
                      ? "Staff"
                      : "Admin"}
                  </p>
                  <p className="text-sm text-gray-600">{founder.personal_info.program}</p>
                  <p className="text-sm text-gray-600">{founder.personal_info.status}</p>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => (window.location.href = `mailto:${founder.personal_info.email}`)}
                  >
                    Contact Founder
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemDetailDialog;