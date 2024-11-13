import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "./notificationsService";

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
};

export const fetchNotificationsByUser = createAsyncThunk(
  "notifications/fetchByUser",
  async (userId, thunkAPI) => {
    try {
      return await NotificationService.fetchNotificationsByUser(userId);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error fetching notifications";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch all notifications
export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await NotificationService.fetchAllNotifications();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error fetching notifications";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Mark a notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notifId, thunkAPI) => {
    try {
      return await NotificationService.markNotificationAsRead(notifId);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error marking notification as read";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotificationsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updatedNotifId = action.meta.arg;
        state.notifications = state.notifications.map((notif) =>
          notif._id === updatedNotifId ? { ...notif, read: true } : notif
        );
      });
  },
});

export default notificationSlice.reducer;
