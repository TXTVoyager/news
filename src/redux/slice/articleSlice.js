import { createSlice } from "@reduxjs/toolkit";
export const article = createSlice({
  name: "article",
  initialState: {
    articleWordCount: [],
    articleCountTableData: [],
    articleCountTotal: 0,
    allArticleTableTotal: 0,
  },
  reducers: {
    setTextToArticleDataUser: (state, action) => {
      state.articleWordCount = action.payload;
    },
    setAllArticleTableData: (state, action) => {
      state.articleCountTableData = action.payload;
    },
    setAllArticleTableTotal: (state, action) => {
      state.allArticleTableTotal = action.payload;
    },
    setTotalWordsAllTime: (state, action) => {
      state.articleCountTotal = action.payload;
    },
  },
});

export const {
  setTextToArticleDataUser,
  setTotalWordsAllTime,
  setAllArticleTableData,
  setAllArticleTableTotal,
} = article.actions;
export default article.reducer;
