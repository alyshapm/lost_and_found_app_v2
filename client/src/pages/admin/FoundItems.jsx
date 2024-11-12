import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, deleteItem } from "../../features/item/itemSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";

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

function FoundItems() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.items);
  const { allUsersInfor } = useSelector((state) => state.user);

  const [founder, setFounder] = useState(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  const handleItemClick = (item) => {
    const founderInfo = allUsersInfor.users.find(
      (user) => user._id === item.founded_by
    );
    setSelectedItem(item);
    setFounder(founderInfo);
    setIsItemDialogOpen(true);
  };

  const handleAddItem = () => {
    setIsAddItemDialogOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteItem(itemToDelete._id))
        .then((response) => {
          if (!response.error) {
            console.log("Item deleted successfully");
            refreshItems;
          } else {
            console.error("Error deleting item:", response.error);
          }
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        })
        .finally(() => {
          setIsConfirmDialogOpen(false);
          refreshItems;
          setItemToDelete(null);
        });
    }
  };

  const refreshItems = () => {
    dispatch(fetchItems()); // Refetch items after adding a new one
  };

  const columns = [
    {
      header: "Item",
      field: "name",
      render: (name, item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.item_img}
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
          data={Array.isArray(items.items) ? items.items : []}
          onRowClick={handleItemClick}
          actions={actions}
        />
      </Card>

      <ItemDetailDialog
        isOpen={isItemDialogOpen}
        item={selectedItem}
        founder={founder}
        onClose={() => setIsItemDialogOpen(false)}
      />

      <AddItemDialog
        isOpen={isAddItemDialogOpen}
        onClose={() => setIsAddItemDialogOpen(false)}
        refreshItems={refreshItems}
      />

      <EditItemDialog
        isOpen={isEditDialogOpen}
        item={selectedItem}
        onClose={() => setIsEditDialogOpen(false)}
        refreshItems={refreshItems}
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
