import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    list: [],
    featured:[],
    tournament:[],
    tableData: [],
    total: 0,
    editProductData: {},
    searchProductList: [],
    searchProductTotal: 0,
  },
  reducers: {
    setProductList: (state, action) => {
      state.list = action.payload;
    },

    setProductFeaturedList: (state, action) =>{
      state.featured = action.payload;
    },
    setProductTournamentList: (state, action) =>{
      state.tournament = action.payload;
    },
    setProductListTable: (state, action) => {
      state.tableData = action.payload;
    },
    setTotalProduct: (state, action) => {
      state.total = action.payload;
    },
    setSearchProductList: (state, action) => {
      state.searchProductList = action.payload;
    },
    setSearchProductTotal: (state, action) => {
      state.searchProductTotal = action.payload;
    },
    setEditProductData: (state, action) => {
      state.editProductData = action.payload;
    },
  },
});
export const {
  setProductList,
  setProductListTable,
  setTotalProduct,
  setEditProductData,
  setProductFeaturedList,
  setSearchProductList,
  setSearchProductTotal,
  setProductTournamentList
} = productSlice.actions;
export default productSlice.reducer;
