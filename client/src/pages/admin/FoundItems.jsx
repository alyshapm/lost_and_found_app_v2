import React, { useState } from "react";
import { Typography, Button, Card, IconButton } from "@material-tailwind/react";
// import ItemTable from "../../components/admin/ItemTable";
import BaseTable from "../../components/admin/BaseTable";
import ItemDetailDialog from "../../components/admin/ItemDetailDialog";
import AddItemDialog from "../../components/admin/AddItemDialog";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import items from "../../data/items";

function FoundItems() {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemDialogOpen(true);
  };

  const handleAddItem = () => {
    setIsAddItemDialogOpen(true);
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

  const actions = [
    ({ item }) => (
      <IconButton
        variant="text"
        color="blue"
        onClick={(e) => {
          e.stopPropagation();
          handleEditClick(item); // Trigger delete confirmation
        }}
      >
        <PencilIcon className="h-4 w-4" />
      </IconButton>
    ),
    ({ item }) => (
      <IconButton
        variant="text"
        color="red"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick(item); // Trigger delete confirmation
        }}
      >
        <TrashIcon className="h-4 w-4" />
      </IconButton>
    ),
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" color="blue-gray">
          Found Items
        </Typography>
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>
      <Card>
        <BaseTable
          columns={columns}
          data={items}
          onRowClick={handleItemClick}
          actions={actions}
        />
      </Card>

      <ItemDetailDialog
        isOpen={isItemDialogOpen}
        item={selectedItem}
        onClose={() => setIsItemDialogOpen(false)}
      />

      <AddItemDialog
        isOpen={isAddItemDialogOpen}
        onClose={() => setIsAddItemDialogOpen(false)}
      />
    </>
  );
}

export default FoundItems;
