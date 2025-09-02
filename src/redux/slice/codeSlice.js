import { createSlice } from "@reduxjs/toolkit";
export const codeSlice = createSlice({
  name: "textToCode",
  initialState: {
    allCodeData: [],
    total: 0,
    allScratchData:[],
    scratchTotal:0,
  },
  reducers: {
    setAllCodeData: (state, action) => {
      state.allCodeData = action.payload;
    },
    setCodeTotal: (state, action) => {
      state.total = action.payload;
    },
    setAllScratchCodeData: (state, action) => {
      state.allScratchData = action.payload;
    },
    setScratchCodeTotal: (state, action) => {
      state.scratchTotal = action.payload;
    },
  },
});

export const { setAllCodeData, setCodeTotal,setAllScratchCodeData,setScratchCodeTotal } = codeSlice.actions;
export default codeSlice.reducer;
