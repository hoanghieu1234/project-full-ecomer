import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../api/user.api";

export const login = createAsyncThunk("login", async (payload) => {
  const res = await userAPI.login(payload);
  localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
  localStorage.setItem("userLogin", JSON.stringify(res.data));
  console.log(res.accessToken);
  console.log(res.data);
  console.log("hello world");
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
