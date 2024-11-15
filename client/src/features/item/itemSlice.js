import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemService from "./itemService";

// Define initial state for the slice
const initialState = {
  items: [],
  filteredItems: [], // Filtered items for UI
  isLoading: false,
  error: null,
};

// Thunk to fetch items (assuming you use async API calls)
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (thunkAPI) => {
    try {
      return await itemService.getItems();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const claimItem = createAsyncThunk(
  "items/claimItem",
  async ({ itemId, claimPayload }, thunkAPI) => {
    try {
      const response = await itemService.claimItem(itemId, claimPayload);
      return response; // Return the claimed item data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk to add a new item
export const addItem = createAsyncThunk(
  "items/addItem",
  async (newItem, thunkAPI) => {
    try {
      const response = await itemService.addItem(newItem);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editItem = createAsyncThunk(
  "items/editItem",
  async ({ itemId, updatedItem }, thunkAPI) => {
    try {
      const response = await itemService.editItem(itemId, updatedItem);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (itemId, thunkAPI) => {
    try {
      const response = await itemService.deleteItem(itemId);
      return { itemId, ...response };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const approveItem = createAsyncThunk(
  "items/approveItem",
  async (itemId, thunkAPI) => {
    try {
      return await itemService.approveItem(itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk for verifying a claim
export const verifyClaim = createAsyncThunk(
  "items/verifyClaim",
  async (itemId, payload, thunkAPI) => {
    try {
      const response = await itemService.claimItem(itemId,payload); // Adjust itemService to include `claimItem`
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create the slice
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    // You can define additional reducers to manipulate state here
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("Fetched items:", action.payload);
        state.items = action.payload; // Save the items to state
        state.filteredItems = action.payload;
        // console.log(state.filteredItems);
        // Set initial filtered items to all items
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(claimItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(claimItem.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("Claimed item:", action.payload);
        state.claimedItem = action.payload;
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.items = updatedItems;
      })
      .addCase(claimItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("Current state.items:", state.items); // Debug log
        // console.log("Action payload:", action.payload); // Debug log
        if (Array.isArray(state.items)) {
          state.items.push(action.payload);
        } else {
          state.items = [action.payload];
        }
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(editItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.items)) {
          state.items = state.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        } else {
          state.items = [action.payload];
        }
        state.filteredItems = state.items;
      })
      .addCase(editItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.items)) {
          state.items = state.items.filter(
            (item) => item._id !== action.payload.itemId
          );
        } else {
          state.items = [action.payload];
        }

        state.filteredItems = state.items;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }).addCase(approveItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = Array.isArray(state.items)
          ? state.items.map((item) =>
              item._id === action.payload._id ? { ...item, status: "approved" } : item
            )
          : [];
        state.filteredItems = state.items;
      })
      .addCase(approveItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }) .addCase(verifyClaim.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyClaim.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the item status to "claimed" in the state
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? { ...item, status: "claimed" } : item
        );
        state.filteredItems = state.items;
      })
      .addCase(verifyClaim.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });;
  },
});

// Export actions
export const { setFilteredItems } = itemSlice.actions;

// Export the reducer to be used in the store
export default itemSlice.reducer;
