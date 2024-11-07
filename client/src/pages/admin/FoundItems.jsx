import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import ItemDetailDialog from "../../components/admin/ItemDetailDialog";
import AddItemDialog from "../../components/admin/AddItemDialog";
import EditItemDialog from "../../components/admin/EditItemDialog";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import items from "../../data/items";

function FoundItems() {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemDialogOpen(true);
  };

  const handleAddItem = () => {
    setIsAddItemDialogOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedItem) => {
    // Logic to save the edited item, e.g., sending it to the backend or updating state
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    // Logic to delete the item, e.g., calling API or updating state
    console.log("Deleting item:", itemToDelete);
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
    {
      header: "Status",
      field: "status",
      render: (status) => (
        <Chip
          size="sm"
          variant="ghost"
          color={
            status === "claimed"
              ? "green"
              : status === "waiting for approval"
              ? "amber"
              : status === "on hold"
              ? "blue"
              : "gray"
          }
          value={status.toUpperCase()}
          className="uppercase font-bold w-max"
        />
      ),
    },
  ];

  const actions = [
    ({ item }) => (
      <IconButton
        variant="text"
        color="blue"
        onClick={(e) => {
          e.stopPropagation();
          handleEditClick(item);
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
          handleDeleteClick(item);
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

      <EditItemDialog
        isOpen={isEditDialogOpen}
        item={selectedItem}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveEdit}
      />

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
      />
    </>
  );
}

export default FoundItems;
