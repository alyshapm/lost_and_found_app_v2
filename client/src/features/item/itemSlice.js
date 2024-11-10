import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemService from "./itemService"

// Define initial state for the slice
const initialState = {
  items: [],  
  filteredItems: [],  // Filtered items for UI
  isLoading: false,
  error: null,
};

// Thunk to fetch items (assuming you use async API calls)
export const fetchItems = createAsyncThunk('items/fetchItems', async (thunkAPI) => {
  try {
      return await itemService.getItems()
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
  }
});


export const claimItem = createAsyncThunk(
  'items/claimItem', 
  async ({ itemId, claimPayload }, thunkAPI) => {
    try {
      const response = await itemService.claimItem(itemId, claimPayload);
      return response;  // Return the claimed item data
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// Create the slice
const itemSlice = createSlice({
  name: 'items',
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
        console.log('Fetched items:', action.payload);
        state.items = action.payload; // Save the items to state
        state.filteredItems = action.payload;
        console.log(state.filteredItems)
       // Set initial filtered items to all items
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }).addCase(claimItem.pending, (state) => {
        state.isLoading = true;
      }).addCase(claimItem.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Claimed item:', action.payload);
        // Optionally, update the claimed item in the state
        state.claimedItem = action.payload;  // You can store claimed item here
        // Update the item in the items array as claimed if necessary
        const updatedItems = state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        );
        state.items = updatedItems;
      }).addCase(claimItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });;
  },
});

// Export actions
export const { setFilteredItems } = itemSlice.actions;

// Export the reducer to be used in the store
export default itemSlice.reducer;
