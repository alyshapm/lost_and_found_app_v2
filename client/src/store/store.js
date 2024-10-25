import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import itemsReducer from "./item/itemsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});

export default store;
