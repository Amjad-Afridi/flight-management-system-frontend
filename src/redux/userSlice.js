import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducer: {},
});
export const { login, logout } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
