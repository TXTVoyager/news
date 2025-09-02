import { createSlice } from "@reduxjs/toolkit";
export const FaqSlice = createSlice({
  name: "image",
  initialState: {
    faqAllData: [],
    Total: {},
  },
  reducers: {
    setFaqData: (state, action) => {
      state.faqAllData = action.payload;
    },
    SetImageTotal: (state, action) => {
      state.Total = action.payload;
    },
  },
});

export const { setFaqData, SetImageTotal } = FaqSlice.actions;
export default FaqSlice.reducer;