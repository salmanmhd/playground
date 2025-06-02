import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: "1", title: "work" },
    { id: "2", title: "personal" },
    { id: "3", title: "health" },
    { id: "4", title: "habits" },
  ],
  tags: [
    { id: "1", title: "code" },
    { id: "2", title: "finance" },
    { id: "3", title: "project" },
  ],
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
