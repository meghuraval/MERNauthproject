import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";

const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
