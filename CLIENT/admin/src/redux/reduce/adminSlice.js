import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../api/User.Api";

export const loginAdmin = createAsyncThunk("login", async (payload) => {
  const res = await userAPI.login(payload);
  if (res.data.role === "admin") {
    localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
    localStorage.setItem("userLogin", JSON.stringify(res.data));
    return res.data;
  } else {
    console.log(res.data);
    return res.data;
  }
});

const UserSlice = createSlice({
  name: "users",
  initialState: JSON.parse(localStorage.getItem("userLogin")) || {},
  reducers: {},
  extraReducers: {
    [loginAdmin.fulfilled]: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { action, reducer } = UserSlice;

export default reducer;
