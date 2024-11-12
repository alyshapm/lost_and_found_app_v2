import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, Chip } from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import ItemDetailDialog from "../../components/admin/ItemDetailDialog";
import { fetchItems } from "../../features/item/itemSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";

const ClaimedItems = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.items);
  const { allUsersInfor } = useSelector((state) => state.user);
  const [founder, setFounder] = useState(null);
  const claimedItems = Array.isArray(items.items)
    ? items.items.filter((item) => item.status === "claimed")
    : [];
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

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
    { header: "Found At", field: "found_at" },
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
        founder={founder}
        onClose={() => setIsItemDialogOpen(false)}
      />
    </div>
  );
};

export default ClaimedItems;
