import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
