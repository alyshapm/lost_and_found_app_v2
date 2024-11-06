import React, { useState } from "react";
import { Typography, Card } from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import ItemDetailDialog from "../../components/admin/ItemDetailDialog";
import items from "../../data/items";

const ClaimedItems = () => {
  const claimedItems = items.filter((item) => item.status === "claimed");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemDialogOpen(true);
  };

  const columns = [
    {
      header: "Item",
      field: "name",
      render: (name, item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <Typography variant="small" color="blue-gray" className="font-normal">
            {name}
          </Typography>
        </div>
      ),
    },
    { header: "Category", field: "category" },
    { header: "Campus", field: "campus" },
    { header: "Found At", field: "foundAt" },
    { header: "Status", field: "status" },
  ];

  return (
    <div>
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Claimed Items
      </Typography>
      <Card className="">
        <BaseTable
          columns={columns}
          data={claimedItems}
          onRowClick={handleItemClick}
        />
      </Card>

      <ItemDetailDialog
        isOpen={isItemDialogOpen}
        item={selectedItem}
        onClose={() => setIsItemDialogOpen(false)}
      />
    </div>
  );
};

export default ClaimedItems;
