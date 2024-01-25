import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
  "user/login",
  async (email, password) => {
    const response = await axios.post(`http://localhost:3001/user/login`, {
      email: email,
      password: password,
    });
    console.log("response is: ", response);
    return response.data;
  },
);
