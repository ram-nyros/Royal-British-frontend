import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featues/auth/authSlice";
import { rootApiSlice } from "./rootApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApiSlice.middleware),
});
