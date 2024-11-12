import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/item/itemSlice";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";
import tokenReducer from "../features/token/tokenSlice";
import meetingReducer from "../features/meeting/meetingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    auth: authReducer,
    token: tokenReducer,
    meetings: meetingReducer,
  },
});

export default store;
