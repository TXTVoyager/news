import { createSlice } from "@reduxjs/toolkit";
export const pageSlice = createSlice({
  name: "pageSlice",
  initialState: {
    getAllPage:[],
  },
  reducers: {
    setGetAllPageAdmin: (state, action) => {
      state.getAllPage= action.payload;
    },
  },
});
export const {setGetAllPageAdmin } = pageSlice.actions;
export default pageSlice.reducer;