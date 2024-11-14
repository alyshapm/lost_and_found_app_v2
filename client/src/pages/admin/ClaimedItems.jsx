import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, Chip } from "@material-tailwind/react";
import BaseTable from "../../components/admin/BaseTable";
import ItemDetailDialog from "../../components/admin/ItemDetailDialog";
import { fetchItems } from "../../features/item/itemSlice";
import { getAllUsersInfor } from "../../features/user/userSlice";
import TableControls from "../../components/admin/TableControls";

const ClaimedItems = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.items);
  const { allUsersInfor } = useSelector((state) => state.user);
  const [founder, setFounder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    campus: "",
    category: "",
  });

  // Fetch items and users once on initial mount
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(getAllUsersInfor());
  }, [dispatch]);

  // Filter items to only include claimed items
  const claimedItems = useMemo(
    () =>
      Array.isArray(items.items)
        ? items.items.filter((item) => item.status === "claimed")
        : [],
    [items]
  );

  // Apply filtering to the claimed items based on search query and filters
  const filteredItems = useMemo(() => {
    return claimedItems
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((item) =>
        filters.campus ? item.campus === filters.campus : true
      )
      .filter((item) =>
        filters.category ? item.category === filters.category : true
      );
  }, [claimedItems, searchQuery, filters]);

  const handleSearch = (query) => setSearchQuery(query);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleDownload = () => {
    console.log("Download data:", filteredItems);
  };

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
          color={status === "claimed" ? "green" : "gray"}
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

      {/* Table Controls for search, filters, and download */}
      <TableControls
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onDownload={handleDownload}
        filters={[
          {
            name: "campus",
            label: "Campus",
            options: [
              { value: "", label: "All" },
              { value: "FX Sudirman", label: "FX Sudirman" },
              { value: "JWC", label: "JWC" },
              // Add more campus options as needed
            ],
          },
          {
            name: "category",
            label: "Category",
            options: [
              { value: "", label: "All" },
              { value: "Electronics", label: "Electronics" },
              { value: "Clothing", label: "Clothing" },
              { value: "Stationery", label: "Stationery" },
              // Add more category options as needed
            ],
          },
        ]}
      />

      <Card>
        <BaseTable
          columns={columns}
          data={filteredItems}
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
