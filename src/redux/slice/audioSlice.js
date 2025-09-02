import { createSlice } from "@reduxjs/toolkit";
export const audioSlice = createSlice({
  name: "AudioConvertedFile",
  initialState: {
    AudiAnswer: "",
    AllAudioData: [],
    Total: 0,
    DailyDataCount: [],
    EditAudioData:[],
    EditAudioDataCunt:0,
  },
  reducers: {
    setAudioAnswer: (state, action) => {
      state.AudiAnswer = action.payload;
    },
    setAllAudioText: (state, action) => {
      state.AllAudioData = action.payload;
    },
    setAudioList: (state, action) => {
      state.Total = action.payload;
    },
    setAudiChartData: (state, action) => {
      state.DailyDataCount = action.payload;
    },
    setEditAudioTableList: (state, action) => {
      state.EditAudioData = action.payload;
    },
    setEditAudioTotal: (state, action) => {
      state.EditAudioDataCunt = action.payload;
    },
  },
});

export const {
  setAudioAnswer,
  setAudioList,
  setAudiChartData,
  setAllAudioText,
  setEditAudioTableList,
  setEditAudioTotal
} = audioSlice.actions;
export default audioSlice.reducer;
