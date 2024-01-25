import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./userSlice";
const Store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
export { Store };
