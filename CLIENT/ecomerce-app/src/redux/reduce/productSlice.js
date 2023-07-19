import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getAllProducts from "../../api/product.api"; // Import your API function

// Thunk action creator
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (param, thunkAPI) => {
    try {
      const response = await getAllProducts(param);
      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

// Reducer slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
