import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../api/user.api";

export const login = createAsyncThunk("login", async (payload) => {
  const res = await userAPI.login(payload);
  if (res.data.isBlocked === true) {
    return res.data;
  } else {
    localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
    localStorage.setItem("userLogin", JSON.stringify(res.data));
    return res.data;
  }
});

export const register = createAsyncThunk("register", async (payload) => {
  const res = await userAPI.register(payload);
  return res;
});

const UserSlice = createSlice({
  name: "users",
  initialState: JSON.parse(localStorage.getItem("userLogin")) || {},
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return (state = action.payload);
    },
    [register.fulfilled]: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { action, reducer } = UserSlice;

export default reducer;
