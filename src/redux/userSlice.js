import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    setFlightData: (state, action) => {
      state.flightdata = action.payload.data;
      if (action.payload.nextPage) {
        state.nextPage = action.payload.nextPage;
      }
      state.previousPage = action.payload.previousPage;
      console.log("action payload : ", action.payload);
    },
  },
  extraReducer: {},
});
export const { login } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
