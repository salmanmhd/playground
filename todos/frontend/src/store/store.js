import todoReducer from "./todoSlice";
import categoryReducer from "./categorySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    category: categoryReducer,
  },
});

export default store;
