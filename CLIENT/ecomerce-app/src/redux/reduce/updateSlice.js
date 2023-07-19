import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu
const updateSlice = createSlice({
  name: "updateSlice",
  initialState: true,
  reducers: {
    updateState: (state) => (state = !state),
  },
});

const { actions, reducer } = updateSlice;
export const { updateState } = actions;
export default reducer;
