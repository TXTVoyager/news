import { createSlice } from "@reduxjs/toolkit";
export const textToAudio = createSlice({
  name: "TextToAudio",
  initialState: {
    audio: [],
    Total: 0,
    textToAudioCountUserDas: [],
  },
  reducers: {
    setTextToAudioList: (state, action) => {
      state.audio = action.payload;
    },

    setTotalTextToAudio: (state, action) => {
      state.Total = action.payload;
    },
    setTextToAudioCountUserDas: (state, action) => {
      state.textToAudioCountUserDas = action.payload;
    },
  },
});

export const {
  setTextToAudioList,
  setTotalTextToAudio,
  setTextToAudioCountUserDas,
} = textToAudio.actions;
export default textToAudio.reducer;
