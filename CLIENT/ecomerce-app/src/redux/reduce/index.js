import userReducer from "./userSlice";
import productReducer from "./productSlice";
import updateReduce from "./updateSlice";

export const rootReducer = {
  users: userReducer,
  products: productReducer,
  update: updateReduce,
};
