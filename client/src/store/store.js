import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/item/itemSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});

export default store;
