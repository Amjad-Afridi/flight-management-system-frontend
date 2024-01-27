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
  },
  extraReducer: {},
});
export const { login } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
