import { createSlice } from "@reduxjs/toolkit";
export const cardSlice = createSlice({
  name: "card",
  initialState: {
    CardData: [],
    Total: 0,
    AllCard: [],
  },
  reducers: {
    SetCardData: (state, action) => {
      state.CardData = action.payload;
    },
    SetAllCardData: (state, action) => {
      state.AllCard = action.payload;
    },
    SetTotal: (state, action) => {
      state.Total = action.payload;
    },
  },
});

export const { SetCardData, SetAllCardData, SetTotal } = cardSlice.actions;
export default cardSlice.reducer;
