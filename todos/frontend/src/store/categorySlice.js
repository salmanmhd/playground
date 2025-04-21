import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: ["Work", "Personal", "Health"],
  tags: ["code", "finance", "project"],
  priority: ["High", "Medium", "Low", "Urgent"],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = action.payload;
      const isAlreadyUsed = state.list.includes(newList);
      if (isAlreadyUsed) return;
      state.list.push(newList);
    },
    deleteList: (state, action) => {
      state.list = state.list.filter((list) => list !== action.payload);
    },
    addTags: (state, action) => {
      const newTag = action.payload;
      const isAlreadyUsed = state.tags.includes(newTag);
      if (isAlreadyUsed) return;
      state.tags.push(action.payload);
    },
    deleteTags: (state, action) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
    },
  },
});

export default categorySlice.reducer;
export const { addList, deleteList, addTags, deleteTags } =
  categorySlice.actions;
