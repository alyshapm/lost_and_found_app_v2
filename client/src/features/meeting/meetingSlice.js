import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import meetingService from './meetingService';

// Initial state
const initialState = {
  meetings: [],         // Array to store all meetings
  isLoading: false,     // Loading indicator
  error: null,          // Error state
};

// Async thunk to fetch all meetings
export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async (_, thunkAPI) => {
    try {
      return await meetingService.getMeetings();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk to request a new meeting
export const requestMeeting = createAsyncThunk(
  'meetings/requestMeeting',
  async (meetingData, thunkAPI) => {
    try {
      return await meetingService.requestMeeting(meetingData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk to approve a meeting
export const approveMeeting = createAsyncThunk(
  'meetings/approveMeeting',
  async (meetingId, thunkAPI) => {
    try {
      return await meetingService.approveMeeting(meetingId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk to reject a meeting
export const rejectMeeting = createAsyncThunk(
  'meetings/rejectMeeting',
  async (meetingId, thunkAPI) => {
    try {
      return await meetingService.rejectMeeting(meetingId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create the slice
const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetings = action.payload;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetings.push(action.payload);
      })
      .addCase(requestMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(approveMeeting.fulfilled, (state, action) => {
        const updatedMeeting = action.payload;
        state.meetings = state.meetings.map((meeting) =>
          meeting._id === updatedMeeting._id ? updatedMeeting : meeting
        );
      })
      .addCase(rejectMeeting.fulfilled, (state, action) => {
        const updatedMeeting = action.payload;
        state.meetings = state.meetings.map((meeting) =>
          meeting._id === updatedMeeting._id ? updatedMeeting : meeting
        );
      });
  },
});

export default meetingsSlice.reducer;
