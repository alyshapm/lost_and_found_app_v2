import { createSlice } from "@reduxjs/toolkit";
import ItemService from "./itemService";

const initialState = {
  allItems: [], // This will hold all items
  filteredItems: [], // Holds items based on search/filter
  isLoading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.allItems = action.payload;
      state.filteredItems = action.payload; // Initially show all items
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    filterItems: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.allItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setItems, setLoading, setError, filterItems } =
  itemsSlice.actions;

export default itemsSlice.reducer;
